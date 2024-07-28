
const express = require("express");
const { isAuthenticatedUser } = require('../middleware/auth');
const router = express.Router();
const { createAlert,deleteAlert,getAllAlerts} = require('../controller/alertscontroller');


router.route("/alerts/create").post(isAuthenticatedUser,createAlert) ;
router.route("/alerts/delete/:id").delete(isAuthenticatedUser,deleteAlert) ;
router.route("/alerts").post(isAuthenticatedUser,getAllAlerts) ;
module.exports = router ;