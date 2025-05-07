const { Schema, model } = require('mongoose')

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: String,
  errandsTaken: [{ type: Schema.Types.ObjectId, ref: "Errands" }]
}, { collection: "runners" })

module.exports = model('Runners', schema)