import React, { useState, useEffect } from "react";
import { content } from './contents';

import "./chat.css";

const images = [
   
  "https://assets.website-files.com/608b181f1509b6005f6532fb/64493786c652fabcbfa34d6c_Path.jpg",
  "https://wallpaperaccess.com/full/3726926.jpg",
  "https://cdn.pixabay.com/photo/2024/02/08/14/52/ai-generated-8561243_1280.jpg",
   "https://e0.pxfuel.com/wallpapers/211/927/desktop-wallpaper-lord-lakshmi-devi.jpg",
  "https://i.pinimg.com/originals/c6/7d/70/c67d70ed7dc542dfb25d2f1aa8013d14.jpg",
  "https://wallpapercave.com/wp/wp7582598.jpg",
  "https://wallpapercave.com/wp/wp4770518.jpg",
  "https://c8.alamy.com/comp/J40GJ4/lalita-sm-J40GJ4.jpg",
  "https://tse2.mm.bing.net/th/id/OIP.8HylLjskYIQwl-19xE-pbQHaEJ?pid=Api&P=0&h=180",
  "https://i.pinimg.com/originals/78/3c/c1/783cc1eea2f3c370935acf2a086534f9.jpg",
  "https://i.pinimg.com/originals/38/5a/ce/385ace6fcb8b0f23284b20113c007165.jpg"
];

const IMAGES_PER_PAGE = 3;

const Chat = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [zoomedImg, setZoomedImg] = useState(null);
  const [animateOut, setAnimateOut] = useState(false);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      showNext();
    }, 3000);
    return () => clearInterval(timer);
  }, [currentIdx]);

  const showPrev = () => {
    setCurrentIdx((prev) =>
      prev === 0 ? images.length - IMAGES_PER_PAGE : prev - 1
    );
  };

  const showNext = () => {
    setCurrentIdx((prev) =>
      prev >= images.length - IMAGES_PER_PAGE ? 0 : prev + 1
    );
  };

  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setZoomedImg(null);
      setAnimateOut(false);
    }, 300);
  };

  // Get the 3 images for the current "page"
  const visibleImages = images.slice(currentIdx, currentIdx + IMAGES_PER_PAGE);

  // If at the end, wrap around to the start
  while (visibleImages.length < IMAGES_PER_PAGE) {
    visibleImages.push(
      ...images.slice(0, IMAGES_PER_PAGE - visibleImages.length)
    );
  }

  return (
    <div style={{backgroundImage: `url(https://marathiinvite.in/images/img/Category_BG.webp)`, backgroundSize: 'cover', padding: '20px', color: 'white',height:'100cm'}}>
      <h1 style={{color: 'Black'}}><center>Spiritual Knowledge</center></h1>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "15px" }}>
        <button onClick={showPrev} className="arrow-btn prev"></button>
        {visibleImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Slider ${idx}`}
            style={{
              border: "2px solid black",
              borderRadius: "10px",
              boxShadow: "2px 2px 5px gray",
              cursor: "pointer",
              width: "200px",
              height: "200px",
              objectFit: "cover"
            }}
            onClick={() => setZoomedImg(img)}
          />
        ))}
        <button onClick={showNext} className="arrow-btn"></button>
      </div>
      {zoomedImg && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(96, 78, 78, 0.47)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
          onClick={handleClose}
        >
          <img
            src={zoomedImg}
            alt="Zoomed"
            className={`zoomed-img${animateOut ? " out" : ""}`}
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "contain",
              border: "4px solid white",
              borderRadius: "20px"
            }}
          />
        </div>
      )}
      <div style={{ maxWidth: "700px", margin: "30px auto", textAlign: "center", fontSize: "1.1rem", color: "#444" }}>
        <p>
            {content.swarupa}{content.swarupa2}  
            {content.OM_PARAGRAPH}
        </p>
      </div>
    </div>
  );
};

export default Chat;

/* homepage: "https://yourusername.github.io/your-repo-name",
  scripts: {
    predeploy: "npm run build",
    deploy: "gh-pages -d build"
  } */