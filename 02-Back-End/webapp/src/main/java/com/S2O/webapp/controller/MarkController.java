package com.S2O.webapp.controller;

import com.S2O.webapp.RequesModal.LeaderBoardDTO;
import com.S2O.webapp.RequesModal.MarkDTO;
import com.S2O.webapp.RequesModal.PerformanceDTO;
import com.S2O.webapp.RequesModal.SubjectPerformanceDTO;
import com.S2O.webapp.error.EntityNotFoundException;
import com.S2O.webapp.services.MarkService;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.amazonaws.services.s3.model.PutObjectRequest;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/marks")
public class MarkController {

    @Autowired
    private MarkService markService;
    @Autowired
    private AmazonS3 amazonS3;

    private final String bucketName = "s2ooluvilimages";
    /**
     * Get all marks.
     */
    @GetMapping
    public ResponseEntity<List<MarkDTO>> getAllMarks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<MarkDTO> markPage = markService.getAllMarks(pageable);
        return ResponseEntity.ok(markPage.getContent());
    }

    /**
     * Get a specific mark by ID.
     * @param id Mark ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<MarkDTO> getMarkById(@PathVariable Long id) {
        MarkDTO mark = markService.getMarkById(id);
        return mark != null ? ResponseEntity.ok(mark) : ResponseEntity.notFound().build();
    }

    /**
     * Create a new mark.
     * @param markDTO Mark data transfer object
     */
    @PostMapping
    public ResponseEntity<MarkDTO> createMark(@RequestBody MarkDTO markDTO) {
        MarkDTO savedMark = markService.saveMark(markDTO);
        return ResponseEntity.status(201).body(savedMark);
    }

    /**
     * Update an existing mark by ID.
     * @param id Mark ID
     * @param markDTO Updated mark data
     */
    @PutMapping("/{id}")
    public ResponseEntity<MarkDTO> updateMark(@PathVariable Long id, @RequestBody MarkDTO markDTO) {
        MarkDTO existingMark = markService.getMarkById(id);
        if (existingMark == null) {
            return ResponseEntity.notFound().build();
        }
        markDTO.setId(id); // Ensure the ID matches
        MarkDTO updatedMark = markService.saveMark(markDTO);
        return ResponseEntity.ok(updatedMark);
    }

    /**
     * Delete a mark by ID.
     * @param id Mark ID
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMark(@PathVariable Long id) {
        MarkDTO existingMark = markService.getMarkById(id);
        if (existingMark == null) {
            return ResponseEntity.notFound().build();
        }
        markService.deleteMark(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Get performance of all students.
     */
    @GetMapping("/performance")
    public ResponseEntity<List<PerformanceDTO>> getPerformance() {
        List<PerformanceDTO> performanceList = markService.calculatePerformance();
        return ResponseEntity.ok(performanceList);
    }

    /**
     * Get performance grouped by stream.
     */
    /**
     * Get overall performance by subject.
     */
    @GetMapping("/performance/subject")
    public ResponseEntity<List<SubjectPerformanceDTO>> getOverallPerformanceBySubject() {
        List<SubjectPerformanceDTO> performanceBySubject = markService.calculateOverallPerformanceBySubject();
        return ResponseEntity.ok(performanceBySubject);
    }
    @PostMapping("/bulk-save")
    public ResponseEntity<String> saveBulkMarks(@RequestBody List<MarkDTO> marks) {
        marks.forEach(mark -> System.out.println(mark));
        markService.saveBulkMarks(marks);
        return ResponseEntity.ok("Marks uploaded successfully");
    }

    @PostMapping("/bulk-upload")
    public ResponseEntity<String> uploadMarks(@RequestParam("file") MultipartFile file) {
        try {
            // Read file content for reuse
            byte[] fileContent = file.getBytes();
            InputStream inputStream = new ByteArrayInputStream(fileContent);

            // Prepare S3 upload details
            String keyName = "uploads/" + file.getOriginalFilename();

            // Prepare metadata
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(fileContent.length);
            metadata.setContentType(file.getContentType());

            // Create PutObjectRequest
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, keyName, inputStream, metadata);

            // Upload to S3
            amazonS3.putObject(putObjectRequest);

            // Process the file for marks
            List<MarkDTO> marks = markService.processMarksFile(new ByteArrayInputStream(fileContent));
            markService.saveBulkMarks(marks);

            return ResponseEntity.ok("Marks uploaded and processed successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to upload and process marks: " + e.getMessage());
        }
    }
    /**
     * Get marks distribution by subject and exam.
     */
    @GetMapping("/distribution")
    public ResponseEntity<List<Map<String, Object>>> getMarksDistribution() {
        List<Map<String, Object>> distributions = markService.getMarksDistributionBySubjectExamAndYear();
        return ResponseEntity.ok(distributions);
    }
    @GetMapping("/leaderboard/subject-year")
    public ResponseEntity<Map<String, Map<String, Map<String, List<LeaderBoardDTO>>>>> getSubjectYearWiseLeaderBoard() {
        Map<String, Map<String, Map<String, List<LeaderBoardDTO>>>> leaderBoard = markService.getYearExamSubjectWiseLeaderBoard();
        return ResponseEntity.ok(leaderBoard);
    }
    @GetMapping("/leaderboard/total-marks-zscore")
    public ResponseEntity<Map<String, Map<String, List<LeaderBoardDTO>>>> getTotalMarksLeaderBoardByZScore() {
        Map<String, Map<String, List<LeaderBoardDTO>>> leaderboard = markService.getTotalMarksLeaderBoardByZScore();
        return ResponseEntity.ok(leaderboard);
    }

    @GetMapping("/performance/stream")
    public ResponseEntity<Map<String, List<PerformanceDTO>>> getPerformanceByStream() {
        Map<String, List<PerformanceDTO>> performanceByStream = markService.getPerformanceByStream();
        return ResponseEntity.ok(performanceByStream);
    }

    @GetMapping("/result")
    public ResponseEntity<List<MarkDTO>> getExamMarks(
            @RequestParam String nic,
            @RequestParam Long examId) {
        try {
            List<MarkDTO> examMarks = markService.getExamMarksOfStudent(nic, examId);
            return ResponseEntity.ok(examMarks);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}