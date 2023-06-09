require("dotenv").config();
var jwt = require("jsonwebtoken");

const AdminModel = require("../models/AdminModel");

// this is the getAdmins for get request
module.exports.getAdmins = async (req, res) => {
  const _data = await AdminModel.find({});
  if (_data) {
    return res.send({ code: 200, message: "success", data: _data });
  } else {
    return res.send({ code: 500, message: "Backend Server Error" });
  }
};

module.exports.addAdmins = async (req, res) => {
  const { userName, password, type, status, date } = req.body;

  const _adminresult = await AdminModel.create({
    userName,
    password,
    type,
    status,
    date,
  });
  if (_adminresult) {
    return res.send({ code: 200, message: "success", data: _adminresult });
  } else {
    return res.send({ code: 500, message: "Backend Server Error" });
  }
};

module.exports.loginAdmin = async (req, res) => {
  const { userName, password } = req.body;

  const userExists = await AdminModel.findOne({ userName: userName });

  if (userExists) {
    if (userExists.password !== password) {
      return res.send({
        code: 400,
        message: "Username or Password does not exist",
      });
    }

    const _token = jwt.sign(
      { ...userExists, expAfter: Math.floor(Date.now() / 1000) + 60 * 60 },
      process.env.JWT_SECRET
    );
    // console.log("admin token getting success", _token, 61);

    // console.log(userExists, 61);

    return res.send({
      code: 200,
      message: "Backend Server LoginAdmin found success",
      token: _token,
      type: userExists.type,
      userId: userExists._id,
    });
  } else {
    return res.send({
      code: 500,
      message: "Backend Server LoginAdmin found Error",
    });
  }
};

module.exports.addToCart = async (req, res) => {
  console.log(req.body, 66);
  const isUpdate = await AdminModel.updateOne(
    { _id: req.body.userId },
    { $addToSet: { cart: req.body.productId } }
  );

  console.log("isUpdate", isUpdate, 72);

  if (isUpdate) {
    return res.send({
      code: 200,
      message: "Add to cart success from backend",
    });
  } else {
    return res.send({ code: 500, message: "Backend cart getting error" });
  }
};

module.exports.getToCart = async (req, res) => {
  console.log("body data is", req.body, 85);
  const userId = req.body.userId;
  const getCartData = await AdminModel.findOne({ _id: userId }).populate(
    "cart"
  );

  console.log("getCartData is", getCartData, 91);

  if (getCartData) {
    return res.send({
      code: 200,
      message: "getting Add to cart success from backend",
      data: getCartData,
    });
  } else {
    return res.send({
      code: 500,
      message: "getting cart data error from server",
    });
  }
};
