const express = require("express");
const router = express.Router();
const { Customers, validate } = require("../models/customer");
// Get
router.get("/", async (req, res) => {
  const customers = await Customers.find().sort("name");
  res.send(customers);
});
// Post
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let customers = new Customers({
    name: req.body.name,
    isVip: req.body.isVip,
    phone: req.body.phone,
  });
  customers = await customers.save();
  res.status(201).send(customers);
});
// Get Id
router.get("/:id", async (req, res) => {
  const customers = await Customers.findById(req.params.id);
  if (!customers) {
    return res.status(404).send("Berilgan ID bo'yicha malumot topilmadi.");
  }
  res.send(customers);
});
// Put ID
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let customers = await Customers.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isVip: req.body.isVip,
      phone: req.body.phone,
    },
    { new: true }
  );
  if (!customers) {
    return res.status(404).send("Berilgan ID bo'yicha malumot topilmadi");
  }
  res.send(customers);
});
// Delete ID
router.delete("/:id", async (req, res) => {
  const customers = await Customers.findByIdAndDelete(req.params.id);
  if (!customers) {
    return res.status(404).send("berilgan Id bo'yicha malumot topilmadi");
  }
  res.send(customers);
});

module.exports = router;
