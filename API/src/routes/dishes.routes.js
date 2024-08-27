const { Router } = require("express")

const DishesController = require("../controllers/dishesController")
const dishesController = new DishesController()

const isAdmin = require("../middlewares/isAdmin") 

const dishesRouter = Router()

dishesRouter.get("/", dishesController.index)
dishesRouter.get("/:id", dishesController.show)
dishesRouter.post("/", isAdmin, dishesController.create)
dishesRouter.put("/:id", isAdmin, dishesController.update)
dishesRouter.delete("/:id", isAdmin, dishesController.delete)

module.exports = dishesRouter