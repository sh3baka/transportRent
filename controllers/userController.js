const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send();
    }
};

exports.getProfile = async (req, res) => {
    res.send(req.user);
};

exports.logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
};

exports.checkToken = async (req, res) => {
    try {
        const tokenFound = req.user.tokens.some((token) => {
            return token.token === req.token;
        });

        if (tokenFound) {
            res.status(200).json({ message: 'Token is valid' });
        } else {
            res.status(401).json({ message: 'Token is not valid' });
        }
    } catch (error) {
        res.status(500).send();
    }
};
