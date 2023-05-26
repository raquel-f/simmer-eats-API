import mongoose from 'mongoose';
import { ROLES } from '../constants/index.js';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    role: { type: [String], default: [ROLES.Member], enum: [ROLES.Member, ROLES.Business, ROLES.Admin] },
    created: { type: Date, default: Date.now() },

    // business users only
    business: { type: mongoose.Types.ObjectId, ref: 'Business', required: false }
});

// hide password from API responses
userSchema.methods.toJSON = function () {
    var u = this.toObject();
    delete u.password;
    return u;
}

const User = mongoose.model('User', userSchema);
export default User;