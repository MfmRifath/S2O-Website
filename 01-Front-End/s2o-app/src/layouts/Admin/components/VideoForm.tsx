import React, { useState, useEffect } from 'react';

interface VideoFormProps {
  video?: { id: number; title: string; description: string; youtubeUrl: string };
  onSubmit: (video: { title: string; description: string; youtubeUrl: string }) => void;
}

const VideoForm: React.FC<VideoFormProps> = ({ video, onSubmit }) => {
  const [title, setTitle] = useState(video ? video.title : '');
  const [description, setDescription] = useState(video ? video.description : '');
  const [youtubeUrl, setYoutubeUrl] = useState(video ? video.youtubeUrl : '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, youtubeUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">YouTube URL</label>
        <input
          type="text"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        {video ? 'Update Video' : 'Add Video'}
      </button>
    </form>
  );
};

export default VideoForm;