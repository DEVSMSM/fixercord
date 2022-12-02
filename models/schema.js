const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  
  guildid: { type: String },
  msgid: { type: String},
  error: { type: String},
  content: { type: String },
  count: {type:  String }
});

module.exports = mongoose.model('reaction', reactionSchema);