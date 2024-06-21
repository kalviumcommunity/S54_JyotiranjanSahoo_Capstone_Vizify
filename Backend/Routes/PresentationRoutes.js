const express = require("express")
const { createPresentation,getPresentationsById,getAllPresentations,getPresentationByUserId,updatePresentation,deletePresentation } = require("../Controllers/PresentationController")



const PresentationRoutes = express.Router()

PresentationRoutes.post("/",createPresentation)
PresentationRoutes.get("/",getAllPresentations)
PresentationRoutes.get("/:id",getPresentationsById)
PresentationRoutes.get("/byuser/:id",getPresentationByUserId)
PresentationRoutes.patch("/:id",updatePresentation)
PresentationRoutes.delete("/:id",deletePresentation)




module.exports = PresentationRoutes