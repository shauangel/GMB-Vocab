import React, { useState, useEffect } from "react";
import catImage from './meow_hackpsu.jpg';

function HomeView() {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "1rem" }}>
          Welcome to GMB-Vocabs
        </h2>
        <img
          src={catImage}
          alt="HackPSU Cat"
          style={{
            width: "300px",
            height: "auto",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            marginBottom: "1rem"
          }}
        />
      </div>
    );
}

export default HomeView;