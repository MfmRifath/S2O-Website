import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faFileAlt, faStickyNote, faVideo } from '@fortawesome/free-solid-svg-icons';
import './LibraryContent.css';
import { Link } from 'react-router-dom';

const LibraryContent: React.FC = () => {
  return (
    <div className="library-page">
      <div className="library-sections">
        <div className="library-item book">
          <h2><FontAwesomeIcon icon={faBook} /> Books</h2>
          <p><Link to='/bookShelf'>Browse our collection</Link>: Discover a wide range of books across various subjects and genres.</p>
        </div>
        
        <div className="library-item exam">
          <h2><FontAwesomeIcon icon={faFileAlt} /> Exam Papers</h2>
          <p><a href="/examPapers">Exam Papers</a>: Access previous years' exam papers to help you prepare and practice.</p>
        </div>
        
        <div className="library-item resource">
          <h2><FontAwesomeIcon icon={faStickyNote} /> Resource Notes</h2>
          <p><a href="#">Study Notes</a>: Find comprehensive resource notes and study guides on various topics.</p>
        </div>
        
        <div className="library-item">
          <h2><FontAwesomeIcon icon={faVideo} /> Video Resources</h2>
          <p><a href="/video">Educational Videos</a>: Watch instructional and educational videos to enhance your understanding.</p>
        </div>
      </div>
    </div>
  );
};

export default LibraryContent;
