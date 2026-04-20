const db = require('../utils/connection')

 const uuid = require('uuid');

const { v4: uuidv4 } = require('uuid');


const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

 const dotenv = require('dotenv')



 const message_mod = require('../models/message_model')


const sendmessage = async (req, res) =>{

    try {
        const { message } = req.body;

        const newMessage = await message_mod.create({
            message: message,
            userId: req.user.id   // from auth middleware
        });

        res.status(201).json({ success: true, data: newMessage });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to send message" });
    }
}

module. exports = {

    sendmessage
}