// src/components/Content.tsx
import React from 'react';
import ArticleModal from '../../Model/ArticleModal';
import './Content.css';



const Content: React.FC<ArticleModal> = ({ title, author, authorQualification, date, content, img,img1,img2 }) => {
  return (
    <div className='container-article content mt-5 mb-5'>
      <h1 className='title'>{title}</h1>
      <h3 className='author'>{author}</h3>
      <p className='author'>{authorQualification}</p>
      <p className='publishedDate'>{new Date(date).toDateString()}</p>
      <div className='paragraph '>{content.split('\n').map((line, index) => <p className='cont' key={index}>{line}</p>)}</div>
      <div className='d-flex justify-content-center'>
      <img className='image' src={img}/>
      <img className='image' src={img1}/>
      <img className='image' src={img2}/>
      </div>
      
    </div>
  );
};

export default Content;
