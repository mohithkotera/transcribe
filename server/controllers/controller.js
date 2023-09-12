const User = require("../models/userschema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Studentreg = require("../models/studentreg");

const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(401).json({ msg: "Please fill all the fields" });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const userExist = await User.findOne({ email });

      if (!userExist) {
        const user = await new User({
          username,
          email,
          password: hashPassword,
        });
        await user.save();
        res.status(201).json({ message: "User Registerd Successfully" });
      } else {
        return res.status(409).json({ message: "User already exist" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "User Not Registerd" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({ error: "Please fill all the fields" });
    }
    const userDetails = await User.findOne({ email });

    if (userDetails) {
      const matchPassword = await bcrypt.compare(
        password,
        userDetails.password
      );
      if (matchPassword) {
        const token = jwt.sign(
          { _id: userDetails._id },
          process.env.JWT_SECRET
        );
        ////to delete the password while sending data to front end ///
        //delete userDetails.password;
        res.cookie("token", token, {
          httpOnly: true,
        });
        res
          .status(201)
          .json({ message: "User logged in successfully", success: true });
      } else {
        res.status(500).json({ error: "Invalid Credientials" });
      }
    } else {
      res.status(500).json({ error: "User Not Found" });
    }
  } catch (error) {
    res.status(404).json({ error: "Not Logged In" });
  }
};

const userData = async (req, res) => {
  const UserId = req._id;
  try {
    const details = await User.findById(UserId, "-password");
    if (!details) {
      res.status(404).json({ message: "Not user details found" });
    } else {
      res.status(200).json(details);
    }
  } catch (err) {
    return new Error(err);
  }
};

const studentReg = async (req, res) => {
  try {
    const { name, usn, phoneno, email, address, branch } = req.body;
    const studentDetails = await new Studentreg({
      name,
      usn,
      phoneno,
      email,
      address,
      branch,
    });
    await studentDetails.save();
    res.status(201).json({ message: "Student Registerd Successfully" });
  } catch (err) {
    res.status(500).json({ err: "Student Not Registerd" });
  }
};

const studentDetails = async (req, res) => {
  try {
    const StudentDetails = await Studentreg.find();
    if (StudentDetails) {
      return res.status(201).json(StudentDetails);
    }
  } catch (err) {
    return res.status(500).json({ err: "No details found" });
  }
};

const deleteDetails = async (req, res) => {
  const { _id } = req.body;
  try {
    const deletedData = await Studentreg.deleteOne({ _id });
    return res.status(201).json(deletedData);
  } catch (err) {
    return res.status(500).json({ err: "No details found to delete" });
  }
};

const getDetailsByid = async (req, res) => {
  const { _id } = req.body;
  try {
    const getdetailsByid = await Studentreg.findOne({ _id });
    return res.json(getdetailsByid);
  } catch (err) {
    return res.status(500).json({ err: "No details found " });
  }
};

const updateDetails = async (req, res) => {
  try {
    const { _id, name, usn, phoneno, email, address, branch } = req.body;

    const updateData = await Studentreg.updateOne(
      { _id },
      {
        $set: {
          name,
          usn,
          phoneno,
          email,
          address,
          branch,
        },
      }
    );
    return res.json(updateData);
  } catch (err) {
    return res.status(500).json({ err: "details not updated " });
  }
};
module.exports = {
  userRegister,
  userLogin,
  userData,
  studentReg,
  studentDetails,
  deleteDetails,
  getDetailsByid,
  updateDetails,
};
