const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  password: { type: String, required: true, min: 8, max: 40 },
  birthDate: { type: Date, required: true},
  todoList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true }]
});

module.exports = mongoose.model('User', UserSchema);