import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoForm from './VideoForm';
import VideoPlayer from '../../S2OAcadmyPage/components/S2O Library/VideoPlayer';

interface Video {
  id: number;
  title: string;
  description: string;
  youtubeUrl: string;
}

const ManageVideoList: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);

  // Define the base URL for the backend (port 8080)
  const BASE_URL = 'http://localhost:8080/api/videos';

  // Fetch videos when the component is mounted
  useEffect(() => {
    axios
      .get(BASE_URL)
      .then((response) => setVideos(response.data))
      .catch((error) => console.error('Error fetching videos:', error));
  }, []);

  // Handle adding a new video
  const handleAddVideo = (video: { title: string; description: string; youtubeUrl: string }) => {
    axios
      .post(BASE_URL, video)
      .then((response) => setVideos([...videos, response.data]))
      .catch((error) => console.error('Error adding video:', error));
  };

  // Handle updating an existing video
  const handleUpdateVideo = (video: { title: string; description: string; youtubeUrl: string }) => {
    if (editingVideo) {
      axios
        .put(`${BASE_URL}/${editingVideo.id}`, video)
        .then((response) => {
          setVideos(
            videos.map((v) => (v.id === response.data.id ? response.data : v))
          );
          setEditingVideo(null);
        })
        .catch((error) => console.error('Error updating video:', error));
    }
  };

  // Handle deleting a video
  const handleDeleteVideo = (id: number) => {
    axios
      .delete(`${BASE_URL}/${id}`)
      .then(() => {
        setVideos(videos.filter((video) => video.id !== id));
      })
      .catch((error) => console.error('Error deleting video:', error));
  };

  return (
    <div className="p-4">
      {editingVideo ? (
        <VideoForm video={editingVideo} onSubmit={handleUpdateVideo} />
      ) : (
        <VideoForm onSubmit={handleAddVideo} />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {videos.map((video) => (
          <div key={video.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{video.title}</h2>
            <p>{video.description}</p>
            <VideoPlayer youtubeUrl={video.youtubeUrl} />
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => setEditingVideo(video)}
                className="bg-yellow-500 text-white p-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteVideo(video.id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageVideoList;