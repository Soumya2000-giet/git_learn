const db = require('../utils/connection')

 const uuid = require('uuid');

const { v4: uuidv4 } = require('uuid');


const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

 const dotenv = require('dotenv')



 const message_mod = require('../models/message_model')

 const user_mod = require('../models/user_model')


const sendmessage = async (req, res) =>{

    try {
        const { message } = req.body;

        const newMessage = await message_mod.create({
            message: message,
            userId: req.user.id   // from auth middleware
        });
          const messageData = {
            id: newMessage.id,
            message: newMessage.message,
            userId: newMessage.userId,
            user: {
                username: req.user.username
            }
        };

        // const clients = req.app.get("clients");

        // clients.forEach(client => {
        //     if (client.readyState === 1) {
        //         client.send(JSON.stringify(messageData));
        //     }
        // });

        const io = req.app.get("io");

        io.emit("receive_message", messageData);

        res.status(201).json({
            success: true,
            data: messageData
        });

        // res.status(201).json({ success: true, data: messageData });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to send message" });
    }
}

    const getmessage = async(req, res) =>{
    try{
        const extracted_message = await message_mod.findAll({
            attributes : ['message','userId'],

            include: [
                {
                    model: user_mod,
                    attributes: ['username'] 
                }
            ],

            order: [['createdAt', 'ASC']]
           
        })
        res.status(200).json(extracted_message);
    }

    catch(err){
         console.error(err);
        res.status(500).json({ success: false, message: "Failed to receive message" });
    }
}

module. exports = {

    sendmessage,
    getmessage
}