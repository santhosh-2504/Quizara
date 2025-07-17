# ⚡ Quizara – Instant AI-Powered Quiz Generator

**Quizara** is an AI-powered mobile app that lets users create quizzes instantly from **any topic**—just by entering a topic name or uploading an image (like notes or textbooks). No more wasting time searching or preparing questions—get meaningful MCQs generated on-the-fly using AI.

> Think of it as ChatGPT + MCQ Generator + OCR, wrapped into a single, fun quiz app.

---

## 🚀 Features

### ✅ Core Functionality
- **🧠 Topic-to-Quiz**: Enter any topic name (e.g., "World War II", "JavaScript Closures", "Photosynthesis") and generate a fresh quiz instantly.
- **🖼️ Image-to-Quiz**: Upload an image (handwritten notes, textbook page, slides) and Quizara will scan and convert it into a quiz using OCR + AI.
- **🛠️ Custom Quiz Creation**: Create and save your own MCQs manually.
- **📈 Performance Tracking**: Get detailed feedback on every quiz: accuracy, time taken, and topic-wise progress.
- **🗂️ Public Quiz Library**: Search and attempt quizzes created by others.

---

## 🔧 Tech Stack

- **Frontend**: React Native (with Expo)
- **Backend**: Node.js + Express + MongoDB (hosted separately)
- **AI**: OpenRouter API (acts as a wrapper over models like GPT-4)
- **State Management**: Redux

---

## 🧪 Demo Login Credentials

You can log in and test the app instantly using:

```txt
📧 Email: dummymail@gmail.com
🔑 Password: 12345678
```

Or register on your own with a valid email and password.

---

## ⚠️ Known Issues

- **❗Login Bug**: Incorrect login attempts currently redirect to the home screen *before* showing the error. Re-visiting the login page shows the proper error message.

Intentionally left as a future fix (my personal worst to-do list 😅). Will tackle it when it annoys me enough to fix it.

---

## 🛠️ Getting Started Locally

Ensure you have Node.js and Expo CLI installed.

```bash
git clone https://github.com/santhosh-2504/quizara.git
cd quizara
npm install
npx expo start -c
```

The `-c` flag clears the cache in case of loading issues.

---

## 📌 Why Quizara?

Traditional quiz apps are:
- ❌ Not customizable
- ❌ Require manual question creation
- ❌ Don't adapt to personal study material

**Quizara** is:
- ⚡ Fast: Instant quiz generation via AI
- 🤖 Smart: Understands concepts from both text and image
- 📱 Minimal & Mobile-first: Built with students and self-learners in mind

---

## 📷 Screenshots (Coming Soon)

Working on UI polishing — stay tuned!

---

## 🧠 Use Cases

- Student wants to test themselves on a chapter they just read
- Teacher needs quick MCQs from a PDF or whiteboard photo
- Self-learner preparing for interviews or competitive exams
- Anyone who wants to reinforce learning through self-testing

---

## 📬 Contact

Feel free to drop issues, feedback, or ideas via GitHub Issues or connect with me on LinkedIn.

---

## 🛤️ Roadmap

- Fix login bug and auth error display
- Add dark mode support
- Public quiz sharing via link
- Offline quiz saving
- Leaderboards and profile insights

---

## 🧪 Status

**MVP Functional and Testable** 💡 Buggy in a few places but fully usable. Feedback welcome!

---

## 📄 License

MIT License © 2025 Santhosh Anantha