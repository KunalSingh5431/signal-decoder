<div align="center">

# 🎮 Signal Decoder  
### _A Pattern Recognition Puzzle Game Built with React + TypeScript_

🧠 Test your logic | 👀 Observe patterns | 🎯 Decode signals | 🏆 Level up

---

### 🚀 Tech Stack & Tools

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js)

</div>

---

## 💡 About the Game

**Signal Decoder** is a puzzle game where a 5×5 grid flashes squares in a hidden pattern.  
Your task: observe, identify the rule, and select the correct squares.

Each level introduces a new logic challenge — from simple parity checks to spatial patterns.

---

## 🎯 Gameplay Steps

1. Watch the flashing pattern (about 10 seconds)
2. Identify the underlying rule
3. Select squares that you believe flashed
4. Get feedback ✅/❌
5. Advance to next level!

---

## 🧩 Levels & Logic Rules

| Level | Logic | Description |
|------:|------|-------------|
| 1 | Even Indices | `index % 2 === 0` |
| 2 | Diagonals | `(row === col)` OR `(row + col === 4)` |
| 3 | Prime Numbers | Flash prime index positions |
| 4 | Center Cluster | Center + 4 neighbors |
| 5 | `(row + col) % 3 === 0` | Mathematical pattern selection |

---

## ✨ Features

- 🔥 Real-time flashing animation
- 👆 Interactive grid selection
- 🧠 Logical rule deductions
- 🏆 Level progression system
- ✅ Clean & modular code
- 📱 Fully responsive UI

---

## 🌟 Bonus Enhancements (Future)

- ⏱️ Timer & scoring system  
- 🎶 Sound effects  
- 🌗 Light/Dark theme toggle  
- 🚀 More advanced logic levels  
- 🧪 Unit tests support  

---

## 📷 Preview

> *(Add GIF/screenshots here later)*

---

## 📁 Project Structure
src/
├── components/
│ ├── Grid.tsx
│ ├── Cell.tsx
│ └── LevelIndicator.tsx
├── hooks/
│ └── useFlashLogic.ts
├── utils/
│ └── rules.ts
├── App.tsx
└── main.tsx

---

## 🛠 Installation

```bash
git clone https://github.com/YOUR-USERNAME/signal-decoder.git
cd signal-decoder
npm install
npm run dev
```

---

## 🌐 Live Demo

[signal-decoder-flax.vercel.app
](https://signal-decoder-flax.vercel.app/)


## 🤝 Contributing

Pull requests and suggestions are welcome!
If you like this project, ⭐ star this repository!


