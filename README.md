<img width="1892" height="891" alt="ai readme" src="https://github.com/user-attachments/assets/d05594e8-acb2-4796-9c41-0c0ebc6255b0" />
AI Workflow Assistant (Chrome Extension)

A Chrome Extension built with React and TypeScript that integrates
Google Gemini (free tier) to provide real-time AI responses inside a
Chrome Side Panel.

The goal of this project was to understand Chrome Extension (Manifest
V3) architecture, streaming AI responses, and secure backend
integration.

------------------------------------------------------------------------

What This Project Does

-   Opens as a Chrome Side Panel
-   Accepts user prompts
-   Sends prompts to a backend server
-   Streams Gemini responses in real time (token-by-token)
-   Stores chat history using chrome.storage
-   Protects API key using a backend proxy

------------------------------------------------------------------------

Why I Built This

I wanted to:

-   Understand how Manifest V3 extensions work
-   Learn how to stream AI responses instead of waiting for full output
-   Implement secure API handling (no API key in frontend)
-   Build something closer to a real product than a simple chatbot

------------------------------------------------------------------------

Tech Stack

Frontend (Chrome Extension) - React - TypeScript - Vite - TailwindCSS -
Zustand (state management) - Chrome Extension APIs (Manifest V3)

Backend - Node.js - Express - Google Gemini API - Streaming via
generateContentStream

------------------------------------------------------------------------

Architecture

User → Chrome Side Panel (React UI) → Backend (Express server) → Google
Gemini API → Streaming response back to UI

Why this setup: - API key is never exposed in frontend - Backend handles
streaming - Extension stays lightweight - Clear separation between UI
and AI logic

------------------------------------------------------------------------

Features Implemented

-   Real-time streaming responses
-   Side panel integration (Manifest V3)
-   Background service worker to open panel
-   Persistent chat using chrome.storage.local
-   Client-side rate limiting
-   Structured AI responses with formatting rules
-   Strict TypeScript configuration with Chrome types

------------------------------------------------------------------------

Project Structure

frontend/ src/ background/ sidepanel/ components/ hooks/ store/ public/
dist/

backend/ server.js .env

------------------------------------------------------------------------

Running Locally

1.  Install frontend

cd frontend npm install npm run build

2.  Load extension

-   Go to chrome://extensions
-   Enable Developer Mode
-   Click “Load Unpacked”
-   Select the dist folder

3.  Setup backend

cd backend npm install

Create .env file:

GEMINI_API_KEY=your_key_here

Start server:

npm start

------------------------------------------------------------------------

What I Learned

-   How Chrome extensions differ from normal web apps
-   How to configure Manifest V3 correctly
-   How streaming APIs improve UX
-   How to safely structure frontend-backend AI integration
-   How TypeScript strict mode affects extension development

------------------------------------------------------------------------

Possible Improvements

-   Multi-turn conversation memory
-   Context extraction from active webpage
-   UI refinements
-   Keyboard shortcuts
-   Chrome Web Store publishing
-   Proper markdown rendering in UI

------------------------------------------------------------------------
