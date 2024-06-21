const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config();


const image_gen = async(prompt,style,no_of_images,dimensions) => {
    try {
        const [width,height] = dimensions.split("x").map(e=>Number(e))
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
              height: height,
              width: width,
              steps: 30,
              samples: no_of_images,
              style_preset: style,
            }),
          }
        );
        const data = await response.json();
        const byteArrayBufferArr = data.artifacts.map((e,i)=>{return `data:image/png;base64,${e.base64}`});
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
          secure: true,
        });
        const uploadResultArr = byteArrayBufferArr.map((e,i)=>{
            return new Promise((resolve, reject) => {
                  cloudinary.v2.uploader
                    .upload_stream({ folder: "Images" }, (error, result) => {
                      if (error) {
                        reject(error);
                      } else {
                        resolve(result);
                      }
                    })
                    .end(e);
                });
        })
        const uploadResult = await Promise.all(uploadResultArr)
        const res = uploadResult.map(e=>{
            return e.secure_url
        })
        return res;
      } catch (error) {
        if (error) {
          return error
        }
      }
}

const delete_image = async(images)=>{
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    let deleteImagePromises = []
    images.forEach(e=>{
      const imageArr = e.split("/");
      const image = imageArr[imageArr.length - 1].split(".");
      const imageName = imageArr[imageArr.length - 2] + "/" + image[0];

      deleteImagePromises.push(
        new Promise((resolve, reject) => {
          cloudinary.v2.uploader.destroy(imageName, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        })
      )
    })

    const res = await Promise.all(deleteImagePromises);
    if(res.filter(e=>e.result === "not found").length == 0){
      return "Delete Successfull"
    }else{
      return "Delete Unsuccessfull(Might be deleted already)"
    }
  } catch (error) {
    console.log(error);
    return "Internal Error"
  }
}


module.exports = {image_gen,delete_image}