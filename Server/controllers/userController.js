const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require('jsonwebtoken');

// Get User Controller
const getUserController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.id });

        // Validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        // Hide sensitive fields (e.g., password)
        user.Password = undefined;
        user.ConfirmPassword = undefined;

        res.status(200).send({
            success: true,
            message: 'User fetched successfully',
            user,
        });
    } catch (error) {
        console.error('Error in getUserController:', error);
        res.status(500).send({
            success: false,
            message: 'Error in getting user',
        });
    }
};

// Update User Controller
const updateUserController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.id });

        // Validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        // Only update the fields that are provided in the request body
        const { Name, Email, Password, ConfirmPassword } = req.body;

        if (Name) user.Name = Name;
        if (Email) user.Email = Email;

        // Only update password if it matches confirmPassword
        if (Password && ConfirmPassword) {
            if (Password !== ConfirmPassword) {
                return res.status(400).send({
                    success: false,
                    message: 'Passwords do not match',
                });
            }
            const salt = bcrypt.genSaltSync(10);
            user.Password = await bcrypt.hash(Password, salt); // Set the hashed password
        }

        // Save updated user
        await user.save();

        res.status(200).send({
            success: true,
            message: 'User updated successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in updating user',
        });
    }
};

module.exports = { getUserController, updateUserController };
