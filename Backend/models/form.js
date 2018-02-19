const mongoose = require('mongoose');
const formSchema = new mongoose.Schema({
    formName: String,
    formDescription: String,
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    markup:Object,
    responses: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        response: Object,
    }]
});
module.exports = mongoose.model('form', formSchema);
