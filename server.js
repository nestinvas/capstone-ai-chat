const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4o', // Change from 'gpt-4' to 'gpt-4o'
      messages: [
        { role: 'system', content: "You are Hamad 1.0, Capstone Real Estate's expert AI for UAE property advice. Always act professional and concise." },
        { role: 'user', content: userMessage }
      ]
    });
    res.json({ reply: chatCompletion.choices[0].message.content });

  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
