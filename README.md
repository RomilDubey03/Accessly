
-----

# Accessly – Your Smart Web Accessibility Auditor

### *An automated, AI-powered tool to help you build a more inclusive web.*

-----

##  What is Accessly?

Making the web accessible to everyone isn't just a good idea—it's essential. But it can be tricky to know where to start. That's where **Accessly** comes in. It's a full-stack web application built to help you quickly and accurately audit your websites for accessibility.

Accessly uses powerful tools like **Puppeteer** and **Axe-core** to crawl any URL and find issues that violate the **Web Content Accessibility Guidelines (WCAG)**.

But we don't just leave you with a list of problems. We've integrated the **Gemini API** to provide something truly valuable: for every accessibility issue we find, we give you a clear, easy-to-understand explanation of what went wrong and smart suggestions on how to fix it. When you're done, you can even generate a comprehensive PDF audit report to share with your team or keep for your records.

-----

##  Key Features

  * **Automated Auditing:** Just enter a public URL, and Accessly gets to work, checking for WCAG compliance issues.
  * **AI-Powered Explanations:** Thanks to the Gemini API, you'll get straightforward explanations of why an issue is a problem, not just technical jargon.
  * **Smart Fix Suggestions:** Get intelligent, actionable recommendations on how to resolve accessibility issues, making the fixing process much faster.
  * **Comprehensive Reports:** Generate and download a detailed PDF report that you can easily share and use to track your progress.
  * **Modern Architecture:** Built with a clean, modern tech stack (React and Node.js) for a smooth and responsive user experience.

-----

##  Tech Stack

### Frontend

  * **React:** A top-tier JavaScript library for building dynamic and responsive user interfaces.
  * **Tailwind CSS:** A utility-first CSS framework that makes building beautiful UIs incredibly fast.

### Backend

  * **Node.js & Express:** The foundation of our server-side application, providing a fast and efficient environment.
  * **Puppeteer:** A Node.js library that allows us to control a web browser, enabling the automated crawling and auditing process.
  * **Axe-core:** The most trusted and widely used accessibility rule engine in the world, powering our core auditing functionality.

### AI Integration

  * **Gemini API:** The intelligence behind our helpful explanations and fix suggestions.

-----

##  Get Started

### Prerequisites

Before you begin, make sure you have:

  * Node.js (v18 or higher)
  * npm (v9 or higher)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/RomilDubey03/accessly.git
    cd accessly
    ```
2.  **Install dependencies:**
    ```bash
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install
    ```
3.  **Set up your environment:**
    Create a `.env` file in the `backend` directory and add your Gemini API key:
    ```
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

### Running the Application

1.  **Start the backend server:**
    ```bash
    # From the backend directory
    npm start
    ```
2.  **Start the frontend server:**
    ```bash
    # From the frontend directory
    npm start
    ```

Your new accessibility auditor should now be running locally at `http://localhost:3000`.

-----

##  Want to Contribute?

We'd love your help\! If you have ideas for new features, find a bug, or just want to improve the tool, please feel free to open an issue or submit a pull request.

-----

##  License

This project is licensed under the MIT License.