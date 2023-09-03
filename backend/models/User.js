const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['service-center', 'warehouse', 'customer-support', 'user', 'admin'], default: 'user' },
    fullName: { type: String },
    address: { type: String },
    profilePicture: {
        type: String,
        default: "https://img.freepik.com/premium-vector/businessman-avatar-cartoon-character-profile_18591-50583.jpg?w=740"
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.generateAuthToken = async function () {
    try {
        if (this.tokens.length > 1) this.tokens.splice(0, 1);
        const token = jwt.sign({ email: this.email }, process.env.JWT_SECRET_KEY);
        this.tokens.push({ token: token });
        return token;
    } catch (e) {
        return e;
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
