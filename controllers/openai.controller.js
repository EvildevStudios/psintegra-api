const { config } = require("../config/gpt.config");
const { auth, db } = require('../config/firebase.config');
const { collection, doc, setDoc, getDoc, getDocs } = require('firebase/firestore');

/**
 * Retrieves all the available OpenAI engines
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 */

const getEngines = async (req, res) => {
    const openai = await config();
    const engines = await openai.listEngines();

    res.status(200).json({
        engines: engines.data,
    })
};

/**
 * Generates a response from the OpenAI API based on a given model and a set of messages
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 */
const postChatRequest = async (req, res) => {
    const openai = await config();
    const { messages, userId } = req.body;

    // Find chat in firebase
    const chatRef = collection(db, 'userChats');
    const querySnapshot = await getDocs(chatRef);

    const chats = [];
    querySnapshot.forEach((doc) => {
        chats.push({ id: doc.id, ...doc.data() });
    });

    // Hacer que coincida el nombre del documento con el id del usuario
    const chat = chats.find((chat) => chat.id === userId);

    // Create an array to hold the chat messages
    let chatMessages = [];

    // Retrieve existing messages from the chat or initialize an empty array
    if (chat && chat.messages) {
        chatMessages = chat.messages;
    }

    // Loop through each message in the request body
    for (const message of messages) {
        // Get the content and role of the message
        const chatContent = message.content;
        const chatRole = message.role;

        // Add the message to the chat messages array
        chatMessages.push({ role: chatRole, content: chatContent });
    }

    // Create the chat request object
    const chatRequest = {
        model: "gpt-3.5-turbo",
        messages: chatMessages,
    };

    // Send the chat request to OpenAI
    const openaiResponse = await openai.createChatCompletion(chatRequest);
    const chatResponse = openaiResponse.data.choices[0].message;
    const chatRole = openaiResponse.data.choices[0].role;

    // Add the chat response to the chat messages array
    chatMessages.push({ role: "assistant", content: chatResponse.content });

    // Update the chat in Firebase
    if (chat) {
        await setDoc(doc(db, 'userChats', userId), {
            messages: chatMessages,
        });
    } else {
        await setDoc(doc(db, 'userChats', userId), {
            messages: chatMessages,
        });
    }

    // Return the chat response to the client
    res.status(200).json({
        message: chatResponse,
        role: chatRole
    });
};

module.exports = { getEngines, postChatRequest };
