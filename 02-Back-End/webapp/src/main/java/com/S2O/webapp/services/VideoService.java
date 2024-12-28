package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Video;
import com.S2O.webapp.dao.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    // Get all videos
    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    // Get a video by ID
    public Video getVideoById(Long id) {
        return videoRepository.findById(id).orElse(null);
    }

    // Create a new video
    public Video createVideo(Video video) {
        return videoRepository.save(video);
    }

    // Update an existing video
    public Video updateVideo(Long id, Video videoDetails) {
        Video video = videoRepository.findById(id).orElse(null);
        if (video != null) {
            video.setTitle(videoDetails.getTitle());
            video.setDescription(videoDetails.getDescription());
            video.setYoutubeUrl(videoDetails.getYoutubeUrl());
            return videoRepository.save(video);
        }
        return null;
    }

    // Delete a video
    public void deleteVideo(Long id) {
        videoRepository.deleteById(id);
    }
    public List<Video> searchVideos(String query) {
        return videoRepository.findByTitleContaining(query);
    }
}