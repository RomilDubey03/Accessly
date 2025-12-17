import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "tailwindcss"
import Home from './pages/Home'

const App = () => {
      return (
            <main className="min-h-screen w-full flex flex-col items-center justify-center p-4">
                  <Home />
            </main>
      );
};

export default App
