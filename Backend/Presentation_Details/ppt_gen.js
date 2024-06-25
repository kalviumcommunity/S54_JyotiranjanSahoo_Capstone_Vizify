const { ChatOpenAI } = require("@langchain/openai");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const {
  JsonOutputFunctionsParser,
  StructuredOutputParser,
} = require("langchain/output_parsers");
const {
  backgroundSchema,
  imageElementSchema,
  textElementSchema,
} = require("./ppt");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const { zodToJsonSchema } = require("zod-to-json-schema");
const { z } = require("zod");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const fs = require("fs");
dotenv.config();
const samplePPT = require("./ppt.json");

const getPresentationTitle = async (description) => {
  try {
    const openaiModel = new ChatOpenAI({
      modelName: "gpt-3.5-turbo-0125",
      temperature: 0.7,
    });
    const title_prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are a creative Presentation content maker, Give a beautiful title for the description about the Presenatation provided by user`,
      ],
      ["human", `{description}`],
    ]);

    const title_chain = title_prompt
      .pipe(openaiModel)
      .pipe(new StringOutputParser());

    const title = await title_chain.invoke({
      description,
    });

    return title;
  } catch (error) {}
};
// It will call the get_ppt_initial_details function and call getSlideData function for each subTopic and add it to the slides in ppt object and return the same object.
const getPresentationData = async (
  no_of_slides,
  description,
  style,
  color_scheme,
  color_tone
) => {
  try {
    const initial_data = await get_ppt_initial_details(
      no_of_slides,
      description,
      style,
      color_scheme,
      color_tone
    );

    const ppt = { background: initial_data.background, slides: [] };

    const slidePromises = initial_data.sub_topics.map((e) => getSlideData(e));
    const slides = await Promise.all(slidePromises);

    slides.forEach((slide) => ppt.slides.push(slide));
    return ppt;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//It will get the Initail Data of the Presentation. This will return a object containing the background object with color and transparency, and a sub_topics array with topic for each slide.
// ex:= {background: { color: 'F5F5F5', transparency: 100 }, sub_topics: ["CryptoCurrency","Blockchain"]
const get_ppt_initial_details = async (
  no_of_slides,
  description,
  type,
  color_scheme,
  color_tone
) => {
  try {
    const openaiModel = new ChatOpenAI({
      modelName: "gpt-3.5-turbo-0125",
      temperature: 0.7,
    });

    //  Declaring Prompt to get BackGround and Sub Topics
    const detail_prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are a creative Presentation content maker, Give beautiful background details(Image or Color) for {type} type and {color_tone} accent, and also give {no_of_slides} sub-topics names for the description about the Presenatation provided by user. Give the response in {output_format}`,
      ],
      ["human", `{description}`],
    ]);

    const detail_parser = StructuredOutputParser.fromZodSchema(
      z.object({
        background: backgroundSchema,
        sub_topics: z
          .array(z.string().describe("Give a subTopic"))
          .describe("Give array of subTopics."),
      })
    );

    const topicChain = detail_prompt.pipe(openaiModel).pipe(detail_parser);
    const invokeWithRetries = async (input, maxRetries = 3) => {
      let retries = 0;
      while (retries < maxRetries) {
        try {
          const res = await topicChain.invoke(input);
          return res;
        } catch (err) {
          if (err) {
            retries++;
            if (retries >= maxRetries) {
              throw new Error(
                "Max retries reached. Failed to invoke topicChain."
              );
            }
            console.log(
              `topicChain invoke attempt ${retries} failed: ${err.message}`
            );
          }
        }
      }
    };

    const res = await invokeWithRetries({
      no_of_slides,
      description,
      type,
      color_scheme,
      color_tone,
      output_format: detail_parser.getFormatInstructions(),
    });

    console.log(res);

    const getImageURLWithRetries = async (image, style, maxRetries = 3) => {
      let retries = 0;
      while (retries < maxRetries) {
        try {
          const imageUrl = await getImageURL(image, style);
          return imageUrl;
        } catch (err) {
          if (err) {
            retries++;
            if (retries >= maxRetries) {
              throw new Error("Max retries reached. Failed to get image URL.");
            }
            console.log(
              `getImageURL attempt ${retries} failed: ${err.message}`
            );
          }
        }
      }
    };
    if (res.background.image && res.background.style) {
      const image_element = await getImageURLWithRetries(
        res.background.image,
        res.background.style
      );
      res.background.image = image_element;
    }

    return res;
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
};

const getSlideElementsCount = () => {
  const noOfElements = Math.floor(Math.random() * (8 - 4)) + 4;
  const image = 1;
  const text = noOfElements - image;
  const count = {
    noOfElements,
    image,
    text,
  };
  return count;
};

const getSlideData = async (topic) => {
  const { text } = getSlideElementsCount();
  const openaiModel = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.7,
  });
  let text_elements;
  let textRetryCount = 0;
  const textMaxRetries = 3; // You can set the number of retries

  while (textRetryCount < textMaxRetries) {
    try {
      const result = await getTextElements(topic, openaiModel, text);
      text_elements = result.text_elements;
      break; // If the function succeeds, exit the loop
    } catch (error) {
      if (error) {
        console.error(
          `Text Elements Attempt ${textRetryCount + 1} failed: ${error.message}`
        );
        textRetryCount++;
        if (textRetryCount >= textMaxRetries) {
          throw new Error("Max retries reached. Failed to get text elements.");
        }
      }
    }
  }
  const pos_size = {
    w: text_elements.map((e) => {
      return e.pos_size.w;
    }),
    h: text_elements.map((e) => {
      return e.pos_size.h;
    }),
    x: text_elements.map((e) => {
      return e.pos_size.x;
    }),
    y: text_elements.map((e) => {
      return e.pos_size.w;
    }),
  };

  let image_element;
  let imageRetryCount = 0;
  const imageMaxRetries = 3; // You can set the number of retries

  while (imageRetryCount < imageMaxRetries) {
    try {
      image_element = await getImageElement(topic, openaiModel, pos_size);
      break; // If the function succeeds, exit the loop
    } catch (error) {
      if (error) {
        console.error(
          `Attempt ${imageRetryCount + 1} failed: ${error.message}`
        );
        imageRetryCount++;
        if (imageRetryCount >= imageMaxRetries) {
          throw new Error("Max retries reached. Failed to get image element.");
        }
      }
    }
  }
  console.log(image_element);
  console.log(text_elements);
  const slide = {
    elements: [...text_elements, image_element],
  };
  return slide;
};

const getImageURL = async (prompt, style) => {
  try {
    const response = await fetch(
      `https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.STABILITY_AI_API_KEY}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: prompt,
            },
          ],
          cfg_scale: 7,
          height: 768,
          width: 1344,
          steps: 30,
          samples: 1,
          style_preset: style,
        }),
      }
    );
    const data = await response.json();
    const byteArrayBuffer = `data:image/png;base64,${data.artifacts[0].base64}`;
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream({ folder: "Presentation_Images" }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(byteArrayBuffer);
    });
    console.log(
      `Buffer upload_stream with promise success - ${uploadResult.url}`
    );
    return uploadResult.url;
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
};

// getShapeElements function that can be used to upgrade it later.

// const getShapeElements = async (topic,text_elements,image_element, model, no_of_shapes) => {
//   const shape_prompt = ChatPromptTemplate.fromMessages([
//     [
//       "system",
//       `You are a creative Presentation content maker. Give array containing {no_of_shapes} objects with shape, position and size of the shape element to be used in presentation, Give shape that will suit for {text_elements} and {image_element}. Give the response in {shape_format}`,
//     ],
//     ["human", `{topic}`],
//   ]);

//   const shape_parser = StructuredOutputParser.fromZodSchema(
//     z
//       .array(shapeElementSchema)
//       .describe("Give array of objects for shape element in a presentaion")
//   );
//   const shape_chain = shape_prompt.pipe(model).pipe(new StringOutputParser());

//   const shape_elements = await shape_chain.invoke({
//     no_of_shapes,
//     text_elements,
//     image_element,
//     shape_format: shape_parser.getFormatInstructions(),
//     topic
//   });
//   const res = await getStructured_data(
//     shape_elements,
//     z.object({
//       shape_elements: z
//         .array(shapeElementSchema)
//         .describe("Give array of objects for text element in a presentaion"),
//     })
//   );
//   return res;
// };

const getTextElements = async (topic, model, no_of_texts) => {
  try {
    const text_prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are a creative Presentation content maker. Give array containing {no_of_texts} objects with text, position and size of the text element to be used in presentation, and the topic will be given by the user,Give color property for a funky background, give pos_size such that it will not overlap with any other element or dont go outside the size of presentation. and keep the elements at left of the presentation. Give the response in {text_format}`,
      ],
      ["human", `{topic}`],
    ]);

    const text_parser = StructuredOutputParser.fromZodSchema(
      z
        .array(textElementSchema)
        .describe("Give array of objects for text element in a presentaion")
    );
    const text_chain = text_prompt.pipe(model).pipe(new StringOutputParser());

    const text_elements = await text_chain.invoke({
      no_of_texts,
      text_format: text_parser.getFormatInstructions(),
      topic,
    });
    const res = await getStructured_data(
      text_elements,
      z.object({
        text_elements: z
          .array(textElementSchema)
          .describe("Give array of objects for text element in a presentaion"),
      })
    );
    return res;
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
};

const getImageElement = async (topic, model, pos_size) => {
  try {
    const image_prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are a creative Presentation content maker. Give a objects with image details, position and size of the image element to be used in presentation, and the topic will be given by the user. Givee values in pos_size that will look good and not overlap with text elements at {pos_size}, keep keep the element at right of the presentation .Give the response in {image_format}`,
      ],
      ["human", `{topic}`],
    ]);

    const image_parser = StructuredOutputParser.fromZodSchema(
      imageElementSchema.describe(
        "Give a object for image element in a presentaion"
      )
    );
    const image_chain = image_prompt.pipe(model).pipe(new StringOutputParser());

    const image_element = await image_chain.invoke({
      image_format: image_parser.getFormatInstructions(),
      pos_size,
      topic,
    });
    let res = await getStructured_data(image_element, imageElementSchema);

    const imageUrl = await getImageURL(res.element.altText, res.element.style);
    res.element.path = imageUrl;
    return res;
  } catch (err) {
    if (err) {
      console.log(err);
      getImageElement(topic, model, pos_size);
    }
  }
};

// It will take a string of the data data and refine the structure and return it as a JSON object according to the schema.
const getStructured_data = async (data, schema) => {
  try {
    const modelParams = {
      functions: [
        {
          name: "JSON_Converter",
          description: "Converts the data to JSON format",
          parameters: zodToJsonSchema(schema),
        },
      ],
      function_call: { name: "JSON_Converter" },
    };

    const openaiModel = new ChatOpenAI({
      modelName: "gpt-3.5-turbo-0125",
      temperature: 0.7,
    }).bind(modelParams);

    const prompt = ChatPromptTemplate.fromTemplate(`{data}`);

    const chain = prompt
      .pipe(openaiModel)
      .pipe(new JsonOutputFunctionsParser());

    const res = await chain.invoke({
      data: data,
    });
    return res;
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
};

const deleteImagesFromPPT = async (ppt) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    let deleteimagePromises = [];
    ppt.slides.forEach((e) => {
      e.elements.forEach((ele) => {
        if (ele.type == "image") {
          // image.push(ele.element.path);
          const imageArr = ele.element.path.split("/");
          const image = imageArr[imageArr.length - 1].split(".");
          const imageName = imageArr[imageArr.length - 2] + "/" + image[0];
          deleteimagePromises.push(
            new Promise((resolve, reject) => {
              cloudinary.v2.uploader.destroy(imageName, (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              });
            })
          );
        }
      });
    });
    if (ppt.background.image) {
      // image.push(ppt.background.image);
      const imageArr = ppt.background.image.split("/");
      const image = imageArr[imageArr.length - 1].split(".");
      const imageName = imageArr[imageArr.length - 2] + "/" + image[0];
      deleteimagePromises.push(
        new Promise((resolve, reject) => {
          cloudinary.v2.uploader.destroy(imageName, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        })
      );
    }
    const res = await Promise.all(deleteimagePromises);
    if(res.filter(e=>e.result === "not found").length == 0){
      return "Delete Successfull"
    }else{
      return "Delete Unsuccessfull(Might be deleted already)"
    }
  } catch (error) {
    console.log(error);
    return "Internal Error"
  }
};
// getPresentationData(3, "Top 3 SuperCars", "aesthetic", "green", "cool");
// getImageURL("Image of a McLaren P1 supercar", "photographic");
// console.log(zodToJsonSchema(slideSchema));
// console.log(backgroundSchema);

module.exports = {
  getPresentationData,
  getPresentationTitle,
  deleteImagesFromPPT,
};
