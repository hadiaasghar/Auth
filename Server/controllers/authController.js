const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require('jsonwebtoken');

// Register Controller
// const registerController = async (req, res) => {
//     try {
//         const { Name, Password, ConfirmPassword, Email } = req.body;

//         console.log(req.body); // Log the request body

//         // Validation
//         if (!Name || !Email || !Password || !ConfirmPassword) {
//             return res.send({
//                 message: "Please enter all fields",
//                 success: false,
//             });
//         }

//         // Check if user exists
//         const existing = await userModel.findOne({ Email });
//         if (existing) {
//             return res.send({
//                 message: "An account with this email already exists",
//                 success: false,
//             });
//         }

//         // Hash the password
//         const salt = bcrypt.genSaltSync(10);
//         const hashedPassword = await bcrypt.hash(Password, salt);

//         // Create a new user
//         const user = await userModel.create({
//             Name,
//             Password: hashedPassword,
//             ConfirmPassword,
//             Email
//         });

//         res.send({
//             message: "Successfully registered",
//             success: true,
//         });

//     } catch (error) {
//         console.log(error);
//         res.send({
//             message: 'Error in registration',
//             success: false,
//         });
//     }
// };

// Register Controller
const registerController = async (req, res) => {
    try {
        const { Name, Password, ConfirmPassword, Email } = req.body;

        console.log(req.body); // Log the request body

        // Validation: Check if all required fields are provided
        if (!Name || !Email || !Password || !ConfirmPassword) {
            return res.send({
                message: "Please enter all fields",
                success: false,
            });
        }

        // Validation: Check if the password and confirm password match
        if (Password !== ConfirmPassword) {
            return res.send({
                message: "Passwords do not match",
                success: false,
            });
        }

        // Check if the user already exists
        const existing = await userModel.findOne({ Email });
        if (existing) {
            return res.send({
                message: "An account with this email already exists",
                success: false,
            });
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        // Create a new user
        const user = await userModel.create({
            Name,
            Password: hashedPassword,
            ConfirmPassword,
            Email
        });

        res.send({
            message: "Successfully registered",
            success: true,
        });

    } catch (error) {
        console.log(error);
        res.send({
            message: 'Error in registration',
            success: false,
        });
    }
};


// Login Controller
const loginController = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        // Validation
        if (!Email || !Password) {
            return res.status(500).send({
                success: false,
                message: 'Please provide email and password',
            });
        }

        // Check if user exists
        const user = await userModel.findOne({ Email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: 'Invalid credentials',
            });
        }

        // Check if JWT_SECRET is set
        // if (!process.env.JWT_SECRET) {
        //     return res.status(500).send({
        //         success: false,
        //         message: 'JWT_SECRET is missing in environment variables',
        //     });
        // }

        // // Generate JWT Token
        // const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
        //     expiresIn: '7d',
        // });

        if (!process.env.JWT_SECRET) {
            return res.status(500).send({
                success: false,
                message: 'JWT_SECRET is missing in environment variables',
            });
        }
        
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        user.Password = undefined; // Hide password before sending the response

        res.send({
            success: true,
            message: 'Login successfully',
            token,
            user,
        });

    } catch (error) {
        console.log('Error in login:', error);
        res.status(500).send({
            success: false,
            message: 'Error in login API',
        });
    }
};

module.exports = { registerController, loginController };








