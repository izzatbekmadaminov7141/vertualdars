const mongoose = require("mongoose");
const Joi = require("joi");
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  isVip: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Customers = mongoose.model("Customers", customerSchema);

function validateCustomers(customers) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    isVip: Joi.boolean().required(),
    phone: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(customers);
}

exports.Customers = Customers;
exports.validate = validateCustomers;
