const { Router } = require("express")

const IngredientsController = require("../controllers/ingredientsController")
const ingredientsController = new IngredientsController()

const isAdmin = require("../middlewares/isAdmin") 

const ingredientsRoutes = Router()

ingredientsRoutes.get("/", ingredientsController.index)
ingredientsRoutes.get("/:id", ingredientsController.show)
ingredientsRoutes.post("/", isAdmin, ingredientsController.create)
ingredientsRoutes.put("/:id", isAdmin, ingredientsController.update)
ingredientsRoutes.delete("/:id", isAdmin, ingredientsController.delete)

module.exports = ingredientsRoutes