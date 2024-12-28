import React from 'react';

interface VideoPlayerProps {
  youtubeUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ youtubeUrl }) => {
  const videoId = youtubeUrl.split('v=')[1].split('&')[0]; // Extract the video ID from the URL

  return (
    <div className="flex justify-center p-4">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-xl shadow-lg"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;