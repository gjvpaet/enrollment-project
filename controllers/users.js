const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { encrypt } = require('../utils');

const User = require('../models/user');

exports.signup = async (req, res) => {
    let { Email, Password, FirstName, LastName } = req.body;

    try {
        let existingUser = await User.find({ email: Email }).exec();

        if (existingUser.length) {
            return res.status(409).json({ message: 'Email already exist.' });
        } else {
            bcrypt.hash(Password, 10, async (err, hash) => {
                if (err) {
                    return res.status(500).json({ error: err });
                } else {
                    try {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: Email,
                            password: hash,
                            lastName: LastName,
                            firstName: FirstName
                        });

                        await user.save();

                        return res
                            .status(201)
                            .json({ message: 'Successfully signed up.' });
                    } catch (error) {
                        console.log('error: ', error);
                        return res.status(500).json({ error });
                    }
                }
            });
        }
    } catch (error) {
        console.log('error: ', error);
        return res.status(500).json({ error });
    }
};

exports.login = async (req, res, next) => {
    let { Email, Password } = req.body;

    try {
        let user = await User.findOne({ email: Email }).exec();

        if (!user) {
            return res.status(401).json({ message: 'Log in failed.' });
        }

        bcrypt.compare(Password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({ message: 'Log in failed.' });
            }

            if (result) {
                let token = jwt.sign(
                    { data: encrypt(JSON.stringify(user)) },
                    process.env.JWT_KEY,
                    { expiresIn: '1h' }
                );

                return res.status(200).json({
                    token,
                    user: {
                        Id: user._id,
                        Email: user.email,
                        FirstName: user.firstName,
                        LastName: user.lastName
                    },
                    message: 'Logged in successfully.'
                });
            }

            return res.json(401).json({ message: 'Log in failed.' });
        });
    } catch (error) {
        console.log('error: ', error);
        return res.status(500).json({ error });
    }
};
