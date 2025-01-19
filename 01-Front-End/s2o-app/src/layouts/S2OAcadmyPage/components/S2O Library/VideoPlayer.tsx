import React from 'react';

interface VideoPlayerProps {
  youtubeUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ youtubeUrl }) => {
  // Check if the youtubeUrl contains the 'v=' parameter or if it's an embed URL
  let videoId = '';
  const urlPattern =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|(?:v|e(?:mbed)?)\/))([a-zA-Z0-9_-]{11})/;

  // Try to extract the video ID from the URL using regex
  const match = youtubeUrl.match(urlPattern);
  if (match && match[1]) {
    videoId = match[1];
  }

  // If no valid video ID is found, return a fallback UI
  if (!videoId) {
    return <div>No valid video URL provided</div>;
  }

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