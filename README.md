# 🎓 Converso - AI Learning Platform

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-2-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)

[![Live Demo](https://img.shields.io/badge/Live_Demo-FF5722?style=for-the-badge&logo=vercel)](https://converso-livid.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-aashusoni22-181717?style=for-the-badge&logo=github)](https://github.com/aashusoni22)

</div>

## ✨ Overview

A modern, interactive learning platform that provides AI-powered educational companions for personalized learning experiences. Transform your learning journey with intelligent companions that adapt to your style and pace.

## 🌟 Features

### 🧠 AI Companions

Interactive AI-powered learning companions for various subjects, providing personalized learning experiences through natural conversations.

### 🎤 Voice Interaction

Experience natural conversations with AI companions using advanced voice recognition and synthesis technology.

### 📚 Session History

Track your learning progress and review past sessions to monitor your growth and improvement.

### 🔖 Smart Bookmarking

Save and organize your favorite learning companions for quick access to your preferred learning resources.

### 📱 Responsive Design

Enjoy a seamless learning experience across all devices, from desktop to mobile.

### 🎨 Modern UI/UX

Experience a clean, intuitive interface designed for optimal learning engagement.

## 🛠️ Tech Stack

- 🚀 **Framework:** Next.js 14
- 💻 **Language:** TypeScript
- 🎨 **Styling:** Tailwind CSS
- 🗄️ **Database:** Supabase
- 🔐 **Auth:** Supabase Auth
- 🎤 **Voice:** Vapi SDK
- ✨ **Animation:** Lottie
- 🐛 **Error Tracking:** Sentry

## 📋 Prerequisites

- ⚡ Node.js (v18 or higher)
- 📦 npm or yarn
- 🔧 Git

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/aashusoni22/jsm_saas_app.git
cd jsm_saas_app
```

### 2️⃣ Install dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Environment Setup

Create a `.env.local` file in the root directory:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Clerk - Custom Auth
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Vapi
NEXT_PUBLIC_VAPI_WEB_TOKEN=

# Sentry
SENTRY_AUTH_TOKEN=
```

### 4️⃣ Run the development server

```bash
npm run dev
# or
yarn dev
```

### 5️⃣ Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
jsm_saas_app/
├── 📁 app/                 # Next.js app directory
├── 📁 components/          # Reusable React components
├── 📁 lib/                 # Utility functions and configurations
├── 📁 public/             # Static assets
├── 📁 constants/          # Application constants
├── 📁 types/              # TypeScript type definitions
└── ...
```

## 🤝 Contributing

We welcome contributions! Whether it's:

- 🐛 Reporting a bug
- 💡 Suggesting a feature
- 🔧 Submitting a fix
- 📝 Improving documentation

### Steps to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

- [@aashusoni22](https://github.com/aashusoni22) - Initial work

## 🙏 Acknowledgments

- 🚀 Next.js team for the amazing framework
- 🗄️ Supabase for the backend infrastructure
- 🎤 Vapi for voice integration capabilities
- 👥 All contributors who have helped shape this project

---

<div align="center">
Made with ❤️ by [@aashusoni22](https://github.com/aashusoni22)
</div>
