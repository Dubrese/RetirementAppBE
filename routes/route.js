const express = require('express');
const Controller = require("../controllers/controller");

const router = express.Router();

router.route("/audit")
    .post(Controller.registerAudit);

module.exports = router;