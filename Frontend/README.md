
# Frontend Setup Guide

This guide explains how team members can set up and run the project on their local machines.

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or above is recommended)
- [npm](https://www.npmjs.com/) (comes bundled with Node.js)

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/M-D-Nadeem/Lumen-Hackathon-Project.git
cd Lumen-Hackathon-Project/Frontend
```

### 2. Install dependencies

```bash
npm install
```

This will install all required packages, including `react`, `react-dom`, and `react-router-dom`.

### 3. Run the development server

```bash
npm run dev
```

The app will start and be available on your local machine at `http://localhost:3000` (or the port specified in the terminal).

---

## 📁 Project Structure

```bash
frontend/
├── public/              # Static files
├── src/                 # Source code
│   ├── App.js           # Main component with routing setup
│   ├── index.js         # Entry point, renders the app with routing
│   ├── pages/           # Page components like Home, About, etc.
├── package.json         # Project dependencies and metadata
├── README.md            # This guide
```

---

## 🔀 Working with Git Branches

### 1. Pull the latest code from `main` before starting:

```bash
git pull origin main
```

### 2. Create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
```

### 3. Make changes and commit them:

```bash
git add .
git commit -m "Add feature X"
```

### 4. Push your branch to GitHub:

```bash
git push origin feature/your-feature-name
```

### 5. Create a Pull Request to merge your branch into `main` once your work is complete.

---

## 📌 Notes

- Always pull the latest `main` branch before starting work.
- Work on separate feature branches to avoid conflicts.
- Test your changes thoroughly before pushing.
- Write clear and descriptive commit messages.
- Follow the existing routing structure and add new pages accordingly.

---


