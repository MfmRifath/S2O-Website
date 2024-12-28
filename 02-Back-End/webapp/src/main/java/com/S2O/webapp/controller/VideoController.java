package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Video;
import com.S2O.webapp.services.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/videos")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @GetMapping
    public List<Video> getAllVideos() {
        return videoService.getAllVideos();
    }

    @GetMapping("/{id}")
    public Video getVideoById(@PathVariable Long id) {
        return videoService.getVideoById(id);
    }

    @PostMapping
    public Video createVideo(@RequestBody Video video) {
        return videoService.createVideo(video);
    }

    @PutMapping("/{id}")
    public Video updateVideo(@PathVariable Long id, @RequestBody Video videoDetails) {
        return videoService.updateVideo(id, videoDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVideo(@PathVariable Long id) {
        videoService.deleteVideo(id);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/search")
    public List<Video> searchVideos(@RequestParam String query) {
        return videoService.searchVideos(query);
    }
}