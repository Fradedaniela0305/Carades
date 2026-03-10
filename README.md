# Carades

Carades is a real-time multiplayer coding game where one player acts as the **coder** and writes code-based hints while the other players try to guess the hidden concept.

Built for **CMD-F Hackathon**, where Carades won **1st Place**.

## Live Demo

[Play Carades](https://carades.vercel.app/)

## Features

- Real-time multiplayer rooms
- Shared live code editor using Monaco Editor
- Role-based gameplay:
  - **Coder** writes code hints
  - **Guessers** watch and submit answers
- Synchronized round timer
- Progressive hint reveals
- Dynamic leaderboard and score tracking
- Room-based game state with live updates

## How It Works

Each game takes place inside a shared room.

- One player is assigned as the **coder**
- The coder sees the target word and writes code hints in the editor
- Other players watch the shared editor in real time and try to guess the concept
- As the round progresses, category and letter hints are revealed
- Players earn points for correct guesses, and the coder also earns points when others guess successfully

## Tech Stack

- **React**
- **Firebase Realtime Database**
- **Monaco Editor**
- **React Router**
- **Vercel**

## Multiplayer Architecture

Carades uses **Firebase Realtime Database** as the shared real-time backend.

Each room stores live game state, including:

- players
- scores
- current coder
- round status
- round start time
- concept
- category
- hints
- selected language
- shared code editor contents

All players connected to a room subscribe to the same shared state using Firebase real-time listeners. When the coder updates the editor or the game state changes, all connected clients receive the update immediately.

## Project Structure
src/
  components/
    AnswerBox.jsx
    AnswerPopUp.jsx
    CodeEditor.jsx
    LeaderBoard.jsx
    ToggleTheme.jsx
  context/
    ThemeContext.jsx
  data/
    words.js
  lib/
    firebase.js
  pages/
    CreateGroup.jsx
    Game.jsx
    Home.jsx
    JoinGroup.jsx
    Login.jsx
    PopUp.jsx
  App.jsx

## Future improvements:

- Debouncing editor updates to reduce database writes
- Adding player chat or reactions
- Persistent player accounts
- Custom word packs
- Difficulty modes
- Mobile layout improvements
- Stronger validation for multiplayer events


