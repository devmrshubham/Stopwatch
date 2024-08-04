const mongoose = require('mongoose');
const bcryptjs = require("bcryptjs")

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        Default: 0
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcryptjs.hash(this.password, 10);
    next()
})


const User = mongoose.model('User', userSchema);
module.exports = User