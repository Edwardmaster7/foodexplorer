const { Router } = require("express")

const DishesController = require("../controllers/dishesController")
const dishesController = new DishesController()

const isAdmin = require("../middlewares/isAdmin") 

const dishesRoutes = Router()

dishesRoutes.get("/", dishesController.index)
dishesRoutes.get("/:id", dishesController.show)
dishesRoutes.post("/", isAdmin, dishesController.create)
dishesRoutes.put("/:id", isAdmin, dishesController.update)
dishesRoutes.delete("/:id", isAdmin, dishesController.delete)

module.exports = dishesRoutes