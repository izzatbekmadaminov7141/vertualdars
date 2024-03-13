const express = require("express");
const router = express.Router();
const { Category, validate } = require("../models/cotegory");
// Get
router.get("/", async (req, res) => {
  const categories = await Category.find().sort("name");
  res.send(categories);
});
// Post
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let category = new Category({
    name: req.body.name,
  });
  category = await category.save();
  res.status(201).send(category);
});
// get Id
router.get("/:id", async (req, res) => {
  let category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).send("Berilgan ID teng bo'lgan toifa topilmadi");
  }
  res.send(category);
});
// Put It
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let categoey = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );
  if (!categoey) {
    return res.status(404).send("Berilgan Id bo'yicha kitob topilmadi");
  }
  res.send(categoey);
});
// Delete
router.delete("/:id", async (req, res) => {
  let category = await Category.findByIdAndRemove(req.params.id);
  if (!category) {
    return res.status(404).send("Berilgan Idga teng bo'lmagan toifa topilmadi");
  }
  res.send(category);
});

module.exports = router;
