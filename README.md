# United Hacks V5

## See what makes your stream Boom! and what makes it bust.

## Table of Contents
- [Overview](#overview)
- [Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)

## Overview
**Boom!** is a web application designed to analyze Twitch VODs (Videos on Demand) for the most (and least) exciting moments.
This tool not only helps editors and content creators find highlights and clip-worthy moments quickly but also allows more inexperienced streamers discover what engages the audience, improving the accessiblity of streaming as a career.

## Key Features
### AI Powered VOD Analysis
- **Boom/Excitement Score:** A score from 0-100 quantifying the engagement of the chat considering factors such as Message Velocity, Emoji and Capitalization and Sentiment of Language.
- **Brief Vibe Description:** A 1-3 word description of the overall sentiment of the chat (Technical, Disappointed, Curious).
- **Chat Summary:** A 1 sentence description of the contents of the chat.
### Variable Analysis Interval
- The analysis will be broken down into a user-inputted range from 60 to 3600 seconds, allowing for more specific or more broad scores.
### Excitement Graph
- Each interval's excitement score is graphed so peaks and patterns can be easily found.

## Tech Stack
### Backend:
- Python
- FastAPI
- google-genai

### Frontend:
- React

## Getting Started
### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. (Recommended) Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the backend server:
   ```bash
   python main.py
   ```
### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run start
   ```
