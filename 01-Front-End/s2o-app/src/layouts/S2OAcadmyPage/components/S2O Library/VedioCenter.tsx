import React from 'react';
import VideoList from './VedioList';


const VideoCenter: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 p-4 text-white text-center">
        <h1 className="text-3xl">S2O Educational Video Center</h1>
      </header>
      <VideoList />
    </div>
  );
}

export default VideoCenter;