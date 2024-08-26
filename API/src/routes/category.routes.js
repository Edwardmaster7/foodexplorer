const { Router } = require("express")

const CategoryController = require("../controllers/categoryController")
const categoryController = new CategoryController()

const isAdmin = require("../middlewares/isAdmin") 

const categoryRoutes = Router()

categoryRoutes.get("/", categoryController.index)
categoryRoutes.get("/:id", categoryController.show)
categoryRoutes.post("/", isAdmin, categoryController.create)
categoryRoutes.put("/:id", isAdmin, categoryController.update)
categoryRoutes.delete("/:id", isAdmin, categoryController.delete)

module.exports = categoryRoutes