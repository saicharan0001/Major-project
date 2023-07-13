const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    from_user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    to_user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Friends = mongoose.model('Friends', friendshipSchema);
module.exports = Friends;