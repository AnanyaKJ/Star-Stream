import React from "react";
import Hero from "../Home/Hero";
import Trending from "../Home/Trending";
import NIE from "../Home/NIE";
import Creator from "../Home/Creator";

function Home() {
  return (
    <div 
      className="bg-cover bg-center min-h-screen -mt-12" 
      style={{ backgroundImage: "url('/starnightbg.jpg')" }}
    >
      <Hero />
      <Trending />
      <NIE />
      <Creator />
    </div>
  );
}

export default Home;
