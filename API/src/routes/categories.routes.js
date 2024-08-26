const { Router } = require("express")

const CategoriesController = require("../controllers/categoriesController")
const categoriesController = new CategoriesController()

const isAdmin = require("../middlewares/isAdmin") 

const categoriesRoutes = Router()

categoriesRoutes.get("/", categoriesController.index)
categoriesRoutes.get("/:id", categoriesController.show)
categoriesRoutes.post("/", isAdmin, categoriesController.create)
categoriesRoutes.put("/:id", isAdmin, categoriesController.update)
categoriesRoutes.delete("/:id", isAdmin, categoriesController.delete)

module.exports = categoriesRoutes