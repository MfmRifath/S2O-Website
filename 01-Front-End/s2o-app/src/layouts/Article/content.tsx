import React from "react";

interface ContentProps {
  articleId: string;
  title: string;
  author: string;
  authorQualification: string;
  date: string;
  content: string;
  img?: { url: string }[]; // Optional if img can be undefined
}

import "./Content.css";

const Content: React.FC<ContentProps> = ({
  title,
  author,
  authorQualification,
  date,
  content,
  img,
}) => {
  return (
    <div className="article-container mt-5 mb-5">
      <header className="article-header">
        <h1 className="article-title">{title}</h1>
        <div className="article-author-info">
          <h3 className="author">{author}</h3>
          <p className="author-qualification">{authorQualification}</p>
          <p className="published-date">{new Date(date).toDateString()}</p>
        </div>
      </header>

      <hr className="section-divider" />

      <section className="article-content">
        {content.split("\n").map((line, index) => (
          <p className="content-line bamini-font" key={index}>
            {line}
          </p>
        ))}
      </section>

      <div className="article-gallery">
        {img &&
          img.map((image, index) => (
            <img
              key={index}
              className="gallery-image"
              src={image.url}
              alt={`Gallery image ${index + 1}`}
            />
          ))}
      </div>
    </div>
  );
};

export default Content;
