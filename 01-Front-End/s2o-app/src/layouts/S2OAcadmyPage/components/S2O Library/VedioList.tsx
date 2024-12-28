import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoPlayer from './VideoPlayer';
import { debounce } from 'lodash';

interface Video {
  id: number;
  title: string;
  description: string;
  youtubeUrl: string;
}

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Base URL for backend API
  const BASE_URL = 'http://localhost:8080/api/videos';

  // Fetch all videos initially
  useEffect(() => {
    axios
      .get(BASE_URL)
      .then((response) => setVideos(response.data))
      .catch((error) => console.error('Error fetching videos:', error));
  }, []);

  // Handle search query and debounce API call
  const handleSearch = debounce((query: string) => {
    axios
      .get(`${BASE_URL}/search?query=${query}`)
      .then((response) => setVideos(response.data))
      .catch((error) => console.error('Error searching videos:', error));
  }, 500); // 500ms debounce delay

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search videos"
        value={searchQuery}
        onChange={onSearchChange}
        className="p-2 border border-gray-300 rounded-md w-full mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{video.title}</h2>
            <p>{video.description}</p>
            <VideoPlayer youtubeUrl={video.youtubeUrl} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;