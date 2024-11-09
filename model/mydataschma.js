const mongoose = require("mongoose")
//define the schema (the structur of the article)
const fillableSchema = new mongoose.Schema({
    title: String,
    summary: String,
    body: String,
})
const Fillable = mongoose.model("article",fillableSchema)
module.exports = Fillable