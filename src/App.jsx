import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { FaHeart, FaMoon, FaSun } from "react-icons/fa";
import "./App.css";

function App() {
  const [forgiven, setForgiven] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [text, setText] = useState("");
  const [openLetter, setOpenLetter] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  const message =
    "Tum meri woh khaas hard drive ho 💾❤️, jismein main apni zindagi ke har romantic lamhe ko sirf save hi nahi, balki hamesha ke liye lock karke rakhna chahta hoon 🔐✨ — taake waqt chahe kitna bhi guzar jaaye, hamari mohabbat ki har muskurahat, har baat, har ehsaas kabhi delete na ho 💕🌹।";

  // Typing Effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(message.slice(0, i));
      i++;
      if (i > message.length) clearInterval(interval);
    }, 35);

    return () => clearInterval(interval);
  }, []);

  // Runaway Button
  const handleNo = () => {
  const button = document.querySelector(".no");

  const maxX = window.innerWidth - 150;
  const maxY = window.innerHeight - 100;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  button.style.position = "absolute";
  button.style.left = randomX + "px";
  button.style.top = randomY + "px";
};


  // Music Toggle
  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className={darkMode ? "container dark" : "container"}>
      {forgiven && <Confetti />}

      {/* Audio */}
      <audio ref={audioRef} src="/romantic-song.mp3.webm" loop />

      {/* Theme Toggle */}
      <div className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </div>

      {/* Floating Hearts */}
      <div className="hearts">
        {[...Array(25)].map((_, i) => (
          <FaHeart key={i} className="heart" />
        ))}
      </div>

      {/* Sparkles */}
      <div className="sparkles">
        {[...Array(20)].map((_, i) => (
          <span key={i} className="sparkle">✨</span>
        ))}
      </div>

      {/* Animated Title */}
      <motion.h1
        className="title"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        Oii Sorry 🥺
      </motion.h1>

      {/* Animated Typing Text */}
      <motion.p
        className="typing"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {text}
      </motion.p>

      {/* Music Button */}
      <button className="music-btn" onClick={toggleMusic}>
        {isPlaying ? "⏸ Pause Music" : "🎵 Tomar Jonno"}
      </button>

      {/* Buttons */}
      <div className="buttons">
        <button className="yes romantic-btn" onClick={() => setForgiven(true)}>
          Yes, I Forgive You 💕
        </button>

        <button className="no" onMouseEnter={handleNo}>
          No 😝
        </button>
      </div>

      {/* Love Letter */}
      <button className="letter-btn" onClick={() => setOpenLetter(true)}>
        💌 Open My Heart
      </button>

      <AnimatePresence>
        {openLetter && (
          <motion.div
            className="letter-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="letter-card"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <h2>Madam Ji ❤️</h2>
              <p>
                Ami sottei tomai anek tai bhalobashi go...
                jani na ki kore tomai bar bar kasto diye feli 🥺
                ki kore bhalobashte hoi jani na...
                but ei tukui bolbo — BHALOBASHI 😣
                I promise I will never hurt you again 💖
              </p>
              <button onClick={() => setOpenLetter(false)}>
                Close 💕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {forgiven && (
        <motion.h2
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
        >
          I Love You Forever.. Barsha ❤️✨
        </motion.h2>
      )}
    </div>
  );
}

export default App;
