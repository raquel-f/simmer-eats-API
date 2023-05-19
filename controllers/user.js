import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import mongoose from 'mongoose';

// ----- handlers for user routes -----

// ----- GET

// get logged user
export const getLoggedUser = async (req, res) => {
    const id = req.userId;

    try {
        const user = await User.findById(id);

        // no error, send response
        res.status(200).json(user);

    } catch (error) {
        // send error
        res.status(404).json({ message: error.message });
    }
}

// get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        // no error, send response
        res.status(200).json(users);

    } catch (error) {
        // send error
        res.status(404).json({ message: error.message });
    }
}

// get user by ID
export const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        // no error, send response
        res.status(200).json(user);

    } catch (error) {
        // send error
        res.status(404).json({ message: error.message });
    }
}

// ----- POST

// provide session token to user
export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        // if unregistered, send error
        if (!existingUser) return res.status(404).json({ message: 'User does not exist.' });

        // if incorrect password, send error
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials.' });

        // if user is registered and submits correct credentials
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id, role: existingUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ user: existingUser, token });

    } catch (error) {
        // send error
        res.status(500).json({ message: error.message });
    }
};

// create user account
export const signUp = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        // if email already registered, send error
        if (existingUser) return res.status(400).json({ message: 'User already exists.' });

        // if password and password confirmation do not match, send error
        if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match.' });

        // hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // create user
        const newUser = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        const token = jwt.sign({ email: newUser.email, id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ user: newUser, token });

    } catch (error) {
        // send error
        res.status(500).json({ message: error.message });
    }
};

// ----- PATCH

// update logged user
export const updateLoggedUser = async (req, res) => {
    // get information from request
    const id = req.userId;
    const { name, email, password, confirmPassword, avatar, role, business } = req.body;

    // if invalid id, send error
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No user with id: ${id}` });

    // update user
    const updatedInfo = { name, email, password, confirmPassword, avatar, role, business, _id: id };
    const updatedUser = await User.findByIdAndUpdate(id, updatedInfo, { new: true });
    
    // provide response
    if(updatedUser) res.status(200).json(updatedUser);
    else return res.status(404).json({ message: `No user with id: ${id}` });
}

// update one user
export const updateUser = async (req, res) => {
    // get information from request
    const { id } = req.params;
    const { name, email, password, confirmPassword, avatar, role, business } = req.body;

    // if invalid id, send error
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No user with id: ${id}` });

    // update user
    const updatedInfo = { name, email, password, confirmPassword, avatar, role, business, _id: id };
    const updatedUser = await User.findByIdAndUpdate(id, updatedInfo, { new: true });

    // provide response
    if(updatedUser) res.status(200).json(updatedUser);
    else return res.status(404).json({ message: `No user with id: ${id}` });
    
};

// ----- DELETE

// delete logged user
export const deleteLoggedUser = async (req, res) => {
    const id = req.userId;

    // if invalid id, send error
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No user with id: ${id}` });

    // delete user
    const deleted = await User.findByIdAndDelete(id);

    // provide response
    if(deleted) res.status(200).json({ message: 'User deleted successfully.' });
    else return res.status(404).json({ message: `No user with id: ${id}` }); 
}

// delete all users
export const deleteAllUsers = async (req, res) => {
    try {
        await User.deleteMany();

        // no error, send response
        res.status(200).json({ message: 'All users deleted successfully.' });

    } catch (error) {
        // send error
        res.status(500).json({ message: error.message });
    }
}

// delete one user
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    // if invalid id, send error
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `No user with id: ${id}` });

    // delete user
    const deleted = await User.findByIdAndDelete(id);
    
    // provide response
    if(deleted) res.status(200).json({ message: 'User deleted successfully.' });
    else return res.status(404).json({ message: `No user with id: ${id}` }); 
}