import React from 'react';
import backgroundImage from '../images/2.jpeg';

function Home() {
  return (
    <div className="home-container">
      <div className="background-image " style={{ backgroundImage: `url(${backgroundImage})` }}>
        <h1 className="text-primary text-center"> MY ECOMMERCE</h1>
      </div>
    </div>
  );
}

export default Home;
