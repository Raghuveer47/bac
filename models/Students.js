const mongoose = require('mongoose')


const studentSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        class:{
            type: String,
            required: true,
        },
        age:{
            type: Number,
            required: true,
        },
        gmail:{
            type: String,
            required: true
        }
    }
)

const Students = mongoose.model('Students',studentSchema)
module.exports = Students;