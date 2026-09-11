# The Dead Man's Cipher

> "Secure the message. Hide the secret."

The Dead Man's Cipher is a cybersecurity cryptography and steganography workbench built with Next.js, Web Crypto API, Node.js/Express, and MongoDB.

## Architecture & Security Philosophy

- **Zero Plaintext Transmission**: All cryptographic encryption and decryption operations occur strictly client-side using the browser-native Web Crypto API.
- **Payload Storage**: The backend API and MongoDB database only receive and store encrypted payloads, zero-knowledge metadata, and integrity hashes.

## Project Structure

- `src/`: Next.js Frontend (React, TypeScript, Tailwind CSS, Framer Motion, Web Crypto API)
- `backend/`: Node.js / Express backend REST API (TypeScript, MongoDB, Mongoose, JWT)
- `public/`: Static assets (images, icons, fonts)

## Getting Started

### Frontend Setup

```bash
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```
