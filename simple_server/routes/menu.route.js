const express = require("express");
const app = express();
const menuRoutes = express.Router();

let Menu = require("../model/Menu");

// api to add menu
menuRoutes.route("/add").post(function (req, res) {
  let menu = new Menu(req.body);
  menu
    .save()
    .then((menu) => {
      res
        .status(200)
        .json({ status: "success", mssg: "menu added successfully" });
    })
    .catch((err) => {
      res
        .status(409)
        .send({ status: "failure", mssg: "unable to save to database" });
    });
});

// api to get menus
menuRoutes.route("/").get(function (req, res) {
  Menu.find(function (err, menus) {
    if (err) {
      res.status(400).send({ status: "failure", mssg: "Something went wrong" });
    } else {
      res.status(200).json({ status: "success", menus: menus });
    }
  });
});

// api to get menu
menuRoutes.route("/menu/:id").get(function (req, res) {
  let id = req.params.id;
  Menu.findById(id, function (err, menu) {
    if (err) {
      res.status(400).send({ status: "failure", mssg: "Something went wrong" });
    } else {
      res.status(200).json({ status: "success", menu: menu });
    }
  });
});

// api to update route
menuRoutes.route("/update/:id").put(function (req, res) {
  Menu.findById(req.params.id, function (err, menu) {
    if (!menu) {
      res.status(400).send({ status: "failure", mssg: "Unable to find data" });
    } else {
      menu.description = req.body.description;
      menu.name = req.body.name;
      menu.preco = req.body.preco;

      menu.save().then((business) => {
        res.status(200).json({ status: "success", mssg: "Update complete" });
      });
    }
  });
});

// api for delete
menuRoutes.route("/delete/:id").delete(function (req, res) {
  Menu.findByIdAndRemove({ _id: req.params.id }, function (err) {
    if (err) {
      res.status(400).send({ status: "failure", mssg: "Something went wrong" });
    } else {
      res.status(200).json({ status: "success", mssg: "Delete successfully" });
    }
  });
});

module.exports = menuRoutes;
