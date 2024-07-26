import React from 'react';
import './Welcome.css'; // Import your CSS file

export const Welcome = () => {
  return (
    <header className="header mb-5">
        <div className="text-box">
            <h1 className="heading-primary">
                <span className="heading-primary-main"><b>Science Society of Oluvil</b></span>
                <span className="heading-primary-sub">Take our Society to the next level is our aim</span>
            </h1>

            <a href="#" className="btn btn-outline-light btn-animated">
            Explore S2O Academy
            </a>
        </div>
        
       </header> 
  );
}
