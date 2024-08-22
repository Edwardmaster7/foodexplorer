const { Router } = require("express")

const multer = require("multer")
const uploadConfig = require("../configs/upload")

const UsersController = require("../controllers/usersController.js")
// const UserAvatarController = require("../controllers/userAvatarController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const usersRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const usersController = new UsersController()
// const userAvatarController = new UserAvatarController()

usersRoutes.get("/:id", usersController.show)
usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuthenticated, usersController.update)
// usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), usersController.updateAvatar)

module.exports = usersRoutes