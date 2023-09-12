const express = require("express");
const verifyUserToken = require("../middleware/verifytoken");
const {
  userRegister,
  userLogin,
  userData,
  studentReg,
  studentDetails,
  deleteDetails,
  getDetailsByid,
  updateDetails,
} = require("../controllers/controller");

const router = express.Router();

router.post("/signup", userRegister);

router.post("/signin", userLogin);

router.get("/getdetails", verifyUserToken, userData);

router.post("/studentreg", studentReg);

router.get("/studentdetails", studentDetails);

router.post("/delete", deleteDetails);

router.post("/detailsByid", getDetailsByid);

router.post("/updateByid", updateDetails);

router.post("/logout", (req, res) => {
  res.clearCookie("token").send({ message: "token cleared" });
});

module.exports = router;
