# 👾 Accessly – AI-Powered Web Accessibility Auditor

### *An automated tool for auditing website accessibility, powered by AI.*

-----

## 🧐 What is Accessly?

Accessly is a full-stack web application designed to help developers and businesses quickly and accurately audit their websites for accessibility compliance. By leveraging powerful libraries like **Puppeteer** and **Axe-core**, it can crawl any given URL and identify violations of the **Web Content Accessibility Guidelines (WCAG)**.

But we didn't stop there. Accessly goes a step further by integrating the **Gemini API** to provide more than just a list of errors. For each accessibility issue detected, it automatically generates a clear, human-readable explanation and suggests practical fixes. You can also generate and download a comprehensive PDF audit report, making it easy to share with your team and track your progress.

-----

## ✨ Features

  - **Automated Auditing:** Crawl any public-facing URL to detect WCAG compliance issues.
  - **AI-Powered Explanations:** Get easy-to-understand explanations of why an issue is a problem, thanks to the Gemini API.
  - **Smart Fix Suggestions:** Receive intelligent recommendations on how to resolve accessibility issues.
  - **Comprehensive PDF Reports:** Generate and download a detailed audit report for easy sharing and record-keeping.
  - **Full-Stack Architecture:** Built with a modern tech stack (React and Node.js) for a smooth and responsive experience.

-----

## 🛠️ Tech Stack

**Frontend:**

  - **React:** A powerful JavaScript library for building user interfaces.
  - **Tailwind CSS:** A utility-first CSS framework for rapid UI development.

**Backend:**

  - **Node.js:** A JavaScript runtime environment for building the server-side application.
  - **Express:** A fast, minimalist web framework for Node.js.
  - **Puppeteer:** A Node.js library that provides a high-level API to control headless Chrome or Chromium.
  - **Axe-core:** The world's most trusted accessibility rule engine, which powers the core auditing functionality.

**AI Integration:**

  - **Gemini API:** Used to generate helpful explanations and fix suggestions for accessibility issues.

-----

## 🚀 Getting Started

**Prerequisites**

  - Node.js (v18 or higher)
  - npm (v9 or higher)

**Installation**

1.  Clone the repository:

    ```bash
    git clone https://github.com/RomilDubey03/accessly.git
    cd accessly
    ```

2.  Install dependencies for both the frontend and backend:

    ```bash
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install
    ```

3.  Configure your environment variables:
    Create a `.env` file in the `backend` directory and add your Gemini API key:

    ```
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

**Running the Application**

1.  Start the backend server:

    ```bash
    # From the backend directory
    npm start
    ```

2.  Start the frontend development server:

    ```bash
    # From the frontend directory
    npm start
    ```

The application should now be running at `http://localhost:3000`.

-----

## 🤝 Contributing

We welcome contributions\! If you have suggestions for new features or bug fixes, please open an issue or submit a pull request.

-----

## 📄 License

This project is licensed under the MIT License.