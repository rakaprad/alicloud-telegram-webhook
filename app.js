const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

const handleSendMessage = async (formData, botToken, chatId, messageThreadId) => {
    const telegramMessage = formData

    try {
        axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            chat_id: chatId,
            text: telegramMessage,
            message_thread_id: messageThreadId
        })
        console.log('Telegram API response:', response.data);
    } catch (error) {
        console.error('Error sending message to Telegram:', error.message);
    }
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post(`/alicloud`, (req, res) => {

    //telegram chat env
    const botToken = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;
    const messageThreadId = process.env.MESSAGE_THREAD_ID;

    //handle message dari source disini
    const formData = req.body;
    const formatedMessage = `
----- Alerts -----
Alert Name: ${formData.alertName}
Instance Name: ${formData.instanceName}
Region: ${formData.regionName}
Current Value: ${formData.curValue}%
Trigger Level: ${formData.triggerLevel}
`
    handleSendMessage(formatedMessage, botToken, chatId, messageThreadId)

    res.sendStatus(200); // Respond to Telegram's request with a 200 OK
    console.log('Received form data:', formData);
});

app.post(`/alicloud2`, (req, res) => {

    //telegram chat env
    const botToken = process.env.BOT_TOKEN_2;
    const chatId = process.env.CHAT_ID_2;
    const messageThreadId = process.env.MESSAGE_THREAD_ID_2;

    //handle message dari source disini
    const formData = req.body;
    const formatedMessage = `
----- Alerts -----
Alert Name: ${formData.alertName}
Instance Name: ${formData.instanceName}
Region: ${formData.regionName}
Current Value: ${formData.curValue}%
Trigger Level: ${formData.triggerLevel}
`
    handleSendMessage(formatedMessage, botToken, chatId, messageThreadId)

    res.sendStatus(200); // Respond to Telegram's request with a 200 OK
    console.log('Received form data:', formData);
});

// app.get('/health', (req, res) => {
//     const BOT_TOKEN = process.env.BOT_TOKEN;
//     const CHAT_ID = process.env.CHAT_ID;

//     res.status(200).json({ status: 'ok' });
//     console.log(`BOT_TOKEN: ${BOT_TOKEN}`)
// });