package com.S2O.webapp.controller;

import com.S2O.webapp.RequesModal.MarkDTO;
import com.S2O.webapp.RequesModal.PerformanceDTO;
import com.S2O.webapp.RequesModal.SubjectPerformanceDTO;
import com.S2O.webapp.services.MarkServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/marks")
public class MarkController {

    @Autowired
    private MarkServiceImpl markService;

    /**
     * Get all marks.
     */
    @GetMapping
    public ResponseEntity<List<MarkDTO>> getAllMarks() {
        List<MarkDTO> marks = markService.getAllMarks();
        return ResponseEntity.ok(marks);
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
        return ResponseEntity.ok(savedMark);
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
        markService.deleteMark(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/performance")
    public ResponseEntity<List<PerformanceDTO>> getPerformance() {
        List<PerformanceDTO> performanceList = markService.calculatePerformance();
        return ResponseEntity.ok(performanceList);
    }
    @GetMapping("/performance/stream")
    public ResponseEntity<Map<String, List<PerformanceDTO>>> getPerformanceByStream() {
        Map<String, List<PerformanceDTO>> performanceByStream = markService.calculatePerformanceByStream();
        return ResponseEntity.ok(performanceByStream);
    }
    @GetMapping("/performance/subject")
    public ResponseEntity<List<SubjectPerformanceDTO>> getOverallPerformanceBySubject() {
        List<SubjectPerformanceDTO> performanceBySubject = markService.calculateOverallPerformanceBySubject();
        return ResponseEntity.ok(performanceBySubject);
    }
}