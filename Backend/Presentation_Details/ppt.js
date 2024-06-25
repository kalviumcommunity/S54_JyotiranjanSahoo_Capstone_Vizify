const { z } = require("zod");

const textSchema = z.object({
  text: z
    .string()
    .describe("give a good details about the provided topic")
    .max(300),
  options: z.object({
    color: z
      .string()
      .regex(/^[0-9A-Fa-f]{6}$/)
      .default("000000")
      .describe(
        "give a appropriate font color for the text, Keep it between black and white most of the time. Give it in valid hex code without #"
      ),
    align: z.enum(["left", "center", "right"]).default("left"),
    bold: z
      .boolean()
      .default(false)
      .describe(
        "choose according to the importance of the text as per the topic."
      ),
    italic: z
      .boolean()
      .default(false)
      .describe(
        "choose true if the text is a hyperlink or a tagline or a quote or a alt text."
      ),
    underline: z
      .boolean()
      .default(false)
      .describe("choose true if it is a important part of the topic."),
    bullet: z
      .boolean()
      .default(false)
      .describe("choose true if the text is to be written pointwise."),
    fill: z
      .string()
      .regex(/^[0-9A-Fa-f]{6}$/)
      .describe(
        "give the color for the background of the text in valid hex code"
      )
      .optional(),
    fontSize: z
      .number()
      .int()
      .gte(1)
      .lte(256)
      .describe("Give value between 1 and 256")
      .default(11),
    charSpacing: z
      .number()
      .int()
      .gte(1)
      .lte(256)
      .describe("Give value between 1 and 256")
      .optional(),
    lineSpacing: z
      .number()
      .int()
      .gte(15)
      .lte(256)
      .describe(
        "Give value between 15 and 256 and has to be a integer,dont give in decimal. The value will be considered as 'pt' measurement"
      )
      .optional(),
    breakLine: z
      .boolean()
      .describe("choose appropriately, as per the text.")
      .default(false),
    hyperlink: z
      .union([
        z.object({
          url: z
            .string()
            .url()
            .describe("give a url to a website related to the text"),
        }),
        z.object({
          slide: z
            .number()
            .describe(
              "give a slide number to refer to for better understanding"
            ),
        }),
      ])
      .describe("give url or slide number to refer")
      .optional(),
    shadow: z
      .object({
        type: z.enum(["outer", "inner"]),
        angle: z
          .number()
          // .int()
          .gte(0)
          .lte(359)
          .describe("Give value between 0 to 359 only. Dont give value greater than 359"),
        blur: z
          .number()
          // .int()
          .gte(1)
          .lte(256)
          .describe("Give value between 1 to 256 only. Dont give value greater than 256"),
        color: z
          .string()
          .regex(/^[0-9A-Fa-f]{6}$/)
          .default("000000")
          .describe(
            "give a appropriate shadow color for the text, Keep it between black and white most of the time. Give it in valid hex code without #"
          ),
        offset: z
          .number()
          .int()
          .gte(1)
          .lte(256)
          .describe("Give value between 1 to 256 only. Dont give value greater than 256"),
        opacity: z
          .number()
          .gte(0.0)
          .lte(1.0)
          .describe("Give value between 0 to 1 in decimal only. Dont give value greater than 1"),
      })
      .describe("set shadow properties that will be added to the text.")
      .optional(),
    glow: z
      .object({
        size: z
          .number()
          .gte(1)
          .lte(256)
          .describe("Give value between 1 and 256"),
        opacity: z
          .number()
          .gte(0.0)
          .lte(1.0)
          .describe("Give value between 0 and 1 in decimal only"),
        color: z
          .string()
          .regex(/^[0-9A-Fa-f]{6}$/)
          .default("000000")
          .describe(
            "give a appropriate glow color for the text. Give it in valid hex code without #"
          ),
      })
      .describe("set glow properties that will be added to the text.")
      .optional(),
    line: z
      .object({
        width: z
          .number()
          .gte(1)
          .lte(256)
          .describe("Give value between 1 and 256"),
        color: z
          .string()
          .regex(/^[0-9A-Fa-f]{6}$/)
          .default("000000")
          .describe(
            "give a appropriate border color for the text. Give it in valid hex code without #"
          ),
      })
      .optional(),
    outline: z
      .object({
        size: z
          .number()
          .gte(1)
          .lte(256)
          .describe("Give value between 1 and 256"),
        color: z
          .string()
          .regex(/^[0-9A-Fa-f]{6}$/)
          .default("000000")
          .describe(
            "give a appropriate outline color for the text. Give it in valid hex code without #"
          ),
      })
      .optional(),
  }),
});

const shapeSchema = z.object({
  shapeType: z.enum([
    "accentBorderCallout1",
    "accentBorderCallout2",
    "accentBorderCallout3",
    "accentCallout1",
    "accentCallout2",
    "accentCallout3",
    "actionButtonBackPrevious",
    "actionButtonBeginning",
    "actionButtonBlank",
    "actionButtonDocument",
    "actionButtonEnd",
    "actionButtonForwardNext",
    "actionButtonHelp",
    "actionButtonHome",
    "actionButtonInformation",
    "actionButtonMovie",
    "actionButtonReturn",
    "actionButtonSound",
    "arc",
    "bentArrow",
    "bentUpArrow",
    "bevel",
    "blockArc",
    "borderCallout1",
    "borderCallout2",
    "borderCallout3",
    "bracePair",
    "bracketPair",
    "callout1",
    "callout2",
    "callout3",
    "can",
    "chartPlus",
    "chartStar",
    "chartX",
    "chevron",
    "chord",
    "circularArrow",
    "cloud",
    "cloudCallout",
    "corner",
    "cornerTabs",
    "cube",
    "curvedDownArrow",
    "curvedLeftArrow",
    "curvedRightArrow",
    "curvedUpArrow",
    "decagon",
    "diagStripe",
    "diamond",
    "dodecagon",
    "donut",
    "doubleWave",
    "downArrow",
    "downArrowCallout",
    "ellipse",
    "ellipseRibbon",
    "ellipseRibbon2",
    "flowChartAlternateProcess",
    "flowChartCollate",
    "flowChartConnector",
    "flowChartDecision",
    "flowChartDelay",
    "flowChartDisplay",
    "flowChartDocument",
    "flowChartExtract",
    "flowChartInputOutput",
    "flowChartInternalStorage",
    "flowChartMagneticDisk",
    "flowChartMagneticDrum",
    "flowChartMagneticTape",
    "flowChartManualInput",
    "flowChartManualOperation",
    "flowChartMerge",
    "flowChartMultidocument",
    "flowChartOfflineStorage",
    "flowChartOffpageConnector",
    "flowChartOnlineStorage",
    "flowChartOr",
    "flowChartPredefinedProcess",
    "flowChartPreparation",
    "flowChartProcess",
    "flowChartPunchedCard",
    "flowChartPunchedTape",
    "flowChartSort",
    "flowChartSummingJunction",
    "flowChartTerminator",
    "folderCorner",
    "frame",
    "funnel",
    "gear6",
    "gear9",
    "halfFrame",
    "heart",
    "heptagon",
    "hexagon",
    "homePlate",
    "horizontalScroll",
    "irregularSeal1",
    "irregularSeal2",
    "leftArrow",
    "leftArrowCallout",
    "leftBrace",
    "leftBracket",
    "leftCircularArrow",
    "leftRightArrow",
    "leftRightArrowCallout",
    "leftRightCircularArrow",
    "leftRightRibbon",
    "leftRightUpArrow",
    "leftUpArrow",
    "lightningBolt",
    "line",
    "lineInv",
    "mathDivide",
    "mathEqual",
    "mathMinus",
    "mathMultiply",
    "mathNotEqual",
    "mathPlus",
    "moon",
    "nonIsoscelesTrapezoid",
    "noSmoking",
    "notchedRightArrow",
    "octagon",
    "parallelogram",
    "pentagon",
    "pie",
    "pieWedge",
    "plaque",
    "plaqueTabs",
    "plus",
    "quadArrow",
    "quadArrowCallout",
    "rect",
    "ribbon",
    "ribbon2",
    "rightArrow",
    "rightArrowCallout",
    "rightBrace",
    "rightBracket",
    "round1Rect",
    "round2DiagRect",
    "round2SameRect",
    "roundRect",
    "rtTriangle",
    "smileyFace",
    "snip1Rect",
    "snip2DiagRect",
    "snip2SameRect",
    "snipRoundRect",
    "squareTabs",
    "star10",
    "star12",
    "star16",
    "star24",
    "star32",
    "star4",
    "star5",
    "star6",
    "star7",
    "star8",
    "stripedRightArrow",
    "sun",
    "swooshArrow",
    "teardrop",
    "trapezoid",
    "triangle",
    "upArrow",
    "upArrowCallout",
    "upDownArrow",
    "upDownArrowCallout",
    "uturnArrow",
    "verticalScroll",
    "wave",
    "wedgeEllipseCallout",
    "wedgeRectCallout",
    "wedgeRoundRectCallout",
  ]),
  options: z.object({
    align: z.enum(["left", "center", "right"]).default("left"),
    flipH: z
      .boolean()
      .default(false)
      .describe("choose from true or false if necessary"),
    flipV: z
      .boolean()
      .default(false)
      .describe("choose from true or false if necessary"),
    fill: z.object({
      color: z
        .string()
        .regex(/^[0-9A-Fa-f]{6}$/)
        .default("000000")
        .describe(
          "give a appropriate fill color for the shape. Give it in valid hex code without #"
        ),
      transparency: z
        .number()
        // .int()
        .gte(0)
        .lte(100),
    }),
    hyperlink: z
      .union([
        z.object({
          url: z
            .string()
            .url()
            .describe("give a url to a website related to the slide."),
        }),
        z.object({
          slide: z
            .number()
            .describe(
              "give a slide number to refer to for better understanding"
            ),
        }),
      ])
      .optional(),

    rotate: z
      .number()
      // .int()
      .gte(-360)
      .lte(360)
      .optional(),
    shadow: z
      .object({
        type: z.enum(["outer", "inner"]),
        angle: z
          .number()
          // .int()
          .gte(0)
          .lte(359),
        blur: z
          .number()
          // .int()
          .gte(1)
          .lte(256),
        color: z
          .string()
          .regex(/^[0-9A-Fa-f]{6}$/)
          .default("000000")
          .describe(
            "give a appropriate shadow color for the shape. Give it in valid hex code without #"
          ),
        offset: z
          .number()
          // .int()
          .gte(1)
          .lte(256),
        opacity: z.number().gte(0.0).lte(1.0),
      })
      .describe("set shadow properties that will be added to the shape.")
      .optional(),

    rectRadius: z.number().gte(0.0).lte(1.0).optional(),
  }),
});
const imageSchema = z.object({
  path: z
    .string()
    .describe(
      "Give description of the image, so that it can be passed to a text-to-image LLM to generate the iamge"
    ),
  altText: z.string().describe("Give a altText for the above image"),
  style: z
    .enum([
      "3d-model",
      "analog-film",
      "anime",
      "cinematic",
      "comic-book",
      "digital-art",
      "enhance",
      "fantasy-art",
      "isometric",
      "line-art",
      "low-poly",
      "modeling-compound",
      "neon-punk",
      "origami",
      "photographic",
      "pixel-art",
      "tile-texture",
    ])
    .describe("Give appropriate option according to the path"),
  flipH: z.boolean().default(false),
  flipV: z.boolean().default(false),
  rotate: z.number().gte(0).lte(359).describe("Give Values between 0 and 359"),
  rounding: z.boolean().default(false),
  transparency: z
    .number()
    .gte(0)
    .lte(100)
    .describe("Give Values between 0 and 100"),
  // sizing: z
  //   .object({
  //     type: z.string(),
  //     w: z.number(),
  //     h: z.number(),
  //     x: z.number(),
  //     y: z.number(),
  //   })
  //   .describe("give sizing of the image"),
  shadow: z
    .object({
      type: z.enum(["outer", "inner"]),
      angle: z
        .number()
        // .int()
        .gte(0)
        .lte(359)
        .describe("Give Values between 0 and 359. Dont give value greater than 359"),
      blur: z
        .number()
        // .int()
        .gte(1)
        .lte(256)
        .describe("Give Values between 1 and 256. Dont give value greater than 256"),
      color: z
        .string()
        .regex(/^[0-9A-Fa-f]{6}$/)
        .default("000000")
        .describe(
          "give a appropriate shadow color for the shape. Give it in valid hex code without #"
        ),
      offset: z
        .number()
        // .int()
        .gte(1)
        .lte(256)
        .describe("Give Values between 1 and 256. Dont give value greater than 256"),
      opacity: z
        .number()
        .gte(0.0)
        .lte(1.0)
        .describe("Give Values between 0 and 1 in decimal only. Dont give value greater than 1"),
    })
    .describe("set shadow properties that will be added to the shape.")
    .optional(),
});
const percentPattern = /^([0-9]{1,2}|100)%$/;
const imageElementSchema = z.object({
  type: z.enum(["image"]),
  element: imageSchema.describe("give output according to the imageScehma."),

  pos_size: z
    .object({
      w: z
        .string()
        .describe(
          "give width of the element in percentage. Accepts values between '0%' to '100%'. Give so that it will be scaled according to '1344x768'"
        )
        .refine((value) => percentPattern.test(value), {
          message: "Value must be a percentage between '0%' and '100%'.",
        })
        .default("1%"),
      h: z
        .string()
        .describe(
          "give height of the element in percentage. Accepts values between '0%' to '100%'. Give so that it will be scaled according to '1344x768'"
        )
        .refine((value) => percentPattern.test(value), {
          message: "Value must be a percentage between '0%' and '100%'",
        })
        .default("1%"),
      x: z
        .string()
        .describe(
          "give horizontal location of the element in percentage. Accepts values between '0%' to '100%'. Give such that it will not overlap any other element"
        )
        .refine((value) => percentPattern.test(value), {
          message: "Value must be a percentage between '0%' and '100%'",
        })
        .default("1%"),

      y: z
        .string()
        .describe(
          "give vertical location of the element in percentage. Accepts values between '0%' to '100%'. Give such that it will not overlap any other element"
        )
        .refine((value) => percentPattern.test(value), {
          message: "Value must be a percentage between '0%' and '100%'",
        })
        .default("1%"),
    })
    .describe(
      "It is mandatory for each element. Give pos_size such that it will not overlap any other elements"
    )
    .required(),
});

const textElementSchema = z.object({
  type: z.enum(["text"]),
  element: textSchema.describe("give output according to the textScehma."),

  pos_size: z
    .object({
      w: z
        .string()
        .describe(
          "give width of the element in percentage. Accepts values between '0%' to '100%'"
        )
        .refine((value) => percentPattern.test(value), {
          message: "Value must be a percentage between '0%' and '100%'",
        })
        .default("1%"),
      h: z
        .string()
        .describe(
          "give height of the element in percentage. Accepts values between '0%' to '100%'"
        )
        .refine((value) => percentPattern.test(value), {
          message: "Value must be a percentage between '0%' and '100%'",
        })
        .default("1%"),
      x: z
        .string()
        .describe(
          "give horizontal location of the element in percentage. Accepts values between '0%' to '100%'"
        )
        .refine((value) => percentPattern.test(value), {
          message: "Value must be a percentage between '0%' and '100%'",
        })
        .default("1%"),

      y: z
        .string()
        .describe(
          "give vertical location of the element in percentage. Accepts values between '0%' to '100%'"
        )
        .refine((value) => percentPattern.test(value), {
          message: "Value must be a percentage between '0%' and '100%'",
        })
        .default("1%"),
    })
    .describe(
      "It is mandatory for each element. give such that it will take only half of the space in presentation and give space for image to place"
    )
    .required(),
});

// Maybe added in Future
const shapeElementSchema = z.object({
  type: z.enum(["shape"]),
  element: shapeSchema.describe("give output according to the shapeScehma"),

  pos_size: z
    .object({
      w: z
        .string()
        .describe(
          "give width of the element in percentage. Accepts values between '0%' to '100%'"
        )
        .refine((value) => percentPattern.test(value), {
          message: "Value must be a percentage between '0%' and '100%'",
        })
        .default("1%"),
      h: z
        .string()
        .describe(
          "give height of the element in percentage. Accepts values between '0%' to '100%'"
        )
        .refine((value) => percentPattern.test(value), {
          message: "Value must be a percentage between '0%' and '100%'",
        })
        .default("1%"),
      x: z
        .string()
        .describe(
          "give horizontal location of the element in percentage. Accepts values between '0%' to '100%'"
        )
        .refine((value) => percentPattern.test(value), {
          message: "Value must be a percentage between '0%' and '100%'",
        })
        .default("1%"),

      y: z
        .string()
        .describe(
          "give vertical location of the element in percentage. Accepts values between '0%' to '100%'"
        )
        .refine((value) => percentPattern.test(value), {
          message: "Value must be a percentage between '0%' and '100%'",
        })
        .default("1%"),
    })
    .describe("It is mandatory for each element")
    .required(),
});

const slideElementSchema = z.object({
  type: z.enum(["text", "image"]),
  element: z
    .union([textSchema, imageSchema])
    .describe("give output according to the type field"),

  pos_size: z
    .object({
      w: z
        .number()
        .describe("give width of the element in inches. Give an integer")
        .default(1.0),
      h: z
        .number()
        .describe("give height of the element in inches. Give an integer")
        .default(1.0),
      x: z
        .number()
        .describe(
          "give horizontal location of the element in inches. Give an integer"
        )
        .default(1.0),
      y: z
        .number()
        .describe(
          "give vertical location of the element in inches. Give an integer"
        )
        .default(1.0),
    })
    .describe("It is mandatory for each element")
    .required(),
});

const slideSchema = z.object({
  elements: z
    .array(slideElementSchema)
    .describe(
      "Give minimum of 5 elements and maximum of 7 elements, and have exactly one image element and one or more shape element"
    ),
});

const backgroundSchema = z
  .union([
    z
      .object({
        color: z
          .string()
          .regex(/^[0-9A-Fa-f]{6}$/)
          .describe(
            "give a good color for the background of the slide in valid hex code without #."
          ),
        transparency: z.number().gte(0).lte(100),
      })
      .describe("define the background color"),
    z
      .object({
        image: z
          .string()
          .describe(
            "give a good description to use it as a prompt to generate image for the background of the slide."
          ),
        style: z
          .enum([
            "3d-model",
            "analog-film",
            "anime",
            "cinematic",
            "comic-book",
            "digital-art",
            "enhance",
            "fantasy-art",
            "isometric",
            "line-art",
            "low-poly",
            "modeling-compound",
            "neon-punk",
            "origami",
            "photographic",
            "pixel-art",
            "tile-texture",
          ])
          .describe("Give appropriate option according to the image"),
      })
      .describe("define the background image as prompt."),
  ])
  .describe("give a suitable background.");

const PresentationSchema = z.object({
  background: backgroundSchema,
  slides: z
    .array(slideSchema)
    .describe("slides with appropriate style and details for the presentation"),
});

module.exports = {
  slideSchema,
  backgroundSchema,
  imageElementSchema,
  textElementSchema,
};
