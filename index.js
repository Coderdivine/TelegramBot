require("dotenv").config();
const path = require('path');
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');


const app = express();
const port = process.env.PORT || 4000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(path.join(__dirname, 'public')));

// Fallback route for SPA (Single Page Application) handling
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const token = process.env.BOT_API_KEY;
const bot = new TelegramBot(token, { polling: true });
const webAppUrl = process.env.GAME_URL;

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Welcome to the game! Click the button below to start playing.', {
        reply_markup: {
            inline_keyboard: [[{
                text: 'Play Game',
                web_app: {url: webAppUrl}
            }]]
        }
    });
});

app.listen(port, () => {
    console.log(`Server Created, running on port ${port}`);
});
