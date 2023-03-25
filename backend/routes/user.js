const router = require("express").Router();

const userController = require("../controllers/userController");

router.route("/user").post((req, res) => userController.create(req, res));
router.route("/user/getAll").get((req, res) => userController.getAll(req, res));
router.route("/user/getById/:id").get((req, res) => userController.getById(req, res));
router.route("/user/:id").delete((req, res) => userController.delete(req, res));

module.exports = router;