# EmpowerHer - Women's Safety & Empowerment Platform

EmpowerHer is a comprehensive safety and empowerment platform designed to provide women with immediate emergency assistance, AI-driven threat detection, educational resources, and a supportive community. 

Built with modern technologies, it integrates real-time emergency alerts via Twilio, community support, legal awareness, and mentorship programs.

---

## 🚀 Key Features

### 🚨 Emergency Response System
*   **One-Tap SOS Button**: Instant emergency alert with a 3-second countdown to prevent accidental triggers.
*   **Twilio Integration**: Automatically sends SMS alerts and makes automated voice calls to trusted contacts.
*   **Live Location Sharing**: Sends precise GPS coordinates and maintains continuous location tracking during an emergency.
*   **Trusted Contacts Management**: Easily add, edit, and manage your emergency contact list.

### 🤖 AI-Powered Safety
*   **AI Threat Detection**: Advanced algorithms to help identify potentially dangerous situations.
*   **Voice Detection**: Hands-free emergency activation via voice commands.
*   **AIAssistant**: A dedicated AI companion for safety guidance and general support.

### 📚 Education & Awareness
*   **Safety Laws**: Comprehensive database of laws protecting women's rights.
*   **Self-Defense**: Curated video tutorials and techniques for physical safety.
*   **Women Schemes**: Information on government and private empowerment initiatives.
*   **Safety Tips**: Actionable advice for travel and online safety.

### 🤝 Community & Support
*   **Mentorship**: Connect with mentors for career and personal growth.
*   **Community Hub**: A safe space to share experiences and find support.
*   **Resources**: Quick access to nearby help, hostels, and accommodations.

---

## 🛠 Tech Stack

- **Frontend**: [React](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Backend**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- **Services**: [Twilio](https://www.twilio.com/) (SMS/Voice), [Firebase](https://firebase.google.com/) (Authentication/Storage)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)

---

## 🏃 Getting Started

### Prerequisites
- **Node.js** (v18 or later)
- **npm** or **bun**
- **Twilio Account** (for emergency features)
- **MongoDB** (local or Atlas)

### 1. Installation

Clone the repository and install dependencies for both frontend and backend:

```bash
# Clone the repository
git clone <your-repo-url>
cd empowerher-app-main

# Install Frontend dependencies
npm install

# Install Backend dependencies
cd backend
npm install
cd ..
```

### 2. Configuration

Create `.env` files in both the root and `backend` directories. Use the provided examples:

**Root `.env` (Frontend):**
```env
VITE_TWILIO_ACCOUNT_SID=your_sid
VITE_TWILIO_AUTH_TOKEN=your_token
VITE_TWILIO_PHONE_NUMBER=your_twilio_number
VITE_BACKEND_URL=http://localhost:5000
```

**`backend/.env`:**
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

### 3. Running the Project

You need to run both the frontend and backend simultaneously.

**Terminal 1 (Frontend):**
```bash
npm run dev
# App will run at http://localhost:8080 (or 5173)
```

**Terminal 2 (Backend):**
```bash
cd backend
npm run dev
# Server will run at http://localhost:5000
```

---

## 📖 Documentation Index

For detailed guides, please refer to the following:

- [🚀 Start Here](START_HERE.md) - Quick implementation summary.
- [📞 Twilio Quick Start](TWILIO_QUICK_START.md) - 5-minute setup for emergency features.
- [🛠 Setup Guide](TWILIO_SETUP_GUIDE.md) - Complete step-by-step configuration.
- [📜 API Documentation](TWILIO_API_DOCS.md) - Backend API endpoints and usage.
- [📋 Implementation Checklist](IMPLEMENTATION_CHECKLIST.md) - Phase-by-phase development tracker.

---

## 🔐 Security & Best Practices

- **Credentials**: Never commit `.env` files.
- **HTTPS**: Production deployment requires HTTPS for Geolocation features.
- **Permissions**: The app requires Location and Microphone access for safety features to function correctly.

---

## 📄 License

This project is private. Please contact the project owner for licensing information.

---

*EmpowerHer - Building a safer world for women through technology.*

Developed by **Bhagyashree Reddy**
