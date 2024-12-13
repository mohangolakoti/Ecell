import React, { useState } from "react";
import "../styles/style.css";
const Team = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="team-container">
      <h1 className="text-center text-4xl font-bold mb-10">Our Team</h1>
      <div className="flex justify-center gap-8">
        {/* Team Member 1 */}
        <article
          className="card__article"
          onMouseOver={() => setHovered(true)}
          onMouseOut={() => setHovered(false)}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/800px-Gmail_icon_%282020%29.svg.png"
            alt="Team Member"
            className={`card__img ${hovered ? "hovered" : ""}`}
          />
          <div className={`card__data ${hovered ? "show" : ""}`}>
            <h3 className="card__title">John Doe</h3>
            <p className="card__description">CEO & Founder</p>
            <a href="#" className="card__button">
              Read More
            </a>
          </div>
        </article>
        {/* Team Member 2 */}
        <article
          className="card__article"
          onMouseOver={() => setHovered(true)}
          onMouseOut={() => setHovered(false)}
        >
          <img
            src="https://tse4.mm.bing.net/th?id=OIP.P_z8uTsVJ8tmPn2prJwOpQHaHa&pid=Api&P=0&h=180"
            alt="Team Member"
            className={`card__img ${hovered ? "hovered" : ""}`}
          />
          <div className={`card__data ${hovered ? "show" : ""}`}>
            <h3 className="card__title">Jane Smith</h3>
            <p className="card__description">CTO</p>
            <a href="#" className="card__button">
              Read More
            </a>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Team;
