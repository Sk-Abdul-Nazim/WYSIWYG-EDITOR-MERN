const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EditorModelSchema = new Schema({
    // title:{
    //     type: String,
    //     required: true
    // },
    description: {
        type: Object,
        required: true
    }
},  { minimize: false })

// @ts-ignore
module.exports = Post = mongoose.model('EditorModel', EditorModelSchema)