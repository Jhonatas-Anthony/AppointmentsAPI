const mongoose = require('mongoose');
const { Schema } = mongoose;

const timeTableSchema = new Schema({
    time:{
        type: String,
        required: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },
    date: {
        type: String,
        required: true,
    }
});

timeTableSchema.index({time: 1, date: 1}, {unique: true})

const User = mongoose.model('timeTable', timeTableSchema);

module.exports = User;