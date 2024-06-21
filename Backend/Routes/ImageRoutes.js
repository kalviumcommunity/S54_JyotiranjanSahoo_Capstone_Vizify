const express = require("express")
const { getAllImages, getImageById, getImagesByUserId, createImage, updateImage, deleteImage } = require("../Controllers/ImageController")

const ImageRoutes = express.Router()

ImageRoutes.get("/",getAllImages)
ImageRoutes.get("/:id",getImageById)
ImageRoutes.get("/byuser/:id",getImagesByUserId)
ImageRoutes.post("/",createImage)
ImageRoutes.patch("/:id",updateImage)
ImageRoutes.delete("/:id",deleteImage)


module.exports = ImageRoutes