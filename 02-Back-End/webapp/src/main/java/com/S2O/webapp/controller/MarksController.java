package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Marks;
import com.S2O.webapp.dto.MarksDto;
import com.S2O.webapp.services.MarksService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/marks")
public class MarksController {

    private final MarksService marksService;

    public MarksController(MarksService marksService) {
        this.marksService = marksService;
    }

    @PostMapping
    public ResponseEntity<MarksDto> addMarks(@RequestBody MarksDto marksDto) {
        Marks marks = marksService.saveMarks(marksDto.getStudentId(), convertToEntity(marksDto));
        return ResponseEntity.ok(convertToDto(marks));
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<List<MarksDto>> getMarksByStudent(@PathVariable UUID studentId) {
        List<MarksDto> marks = marksService.getMarksByStudent(studentId)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(marks);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MarksDto> updateMarks(@PathVariable UUID id, @RequestBody MarksDto marksDto) {
        Marks updatedMarks = marksService.updateMarks(id, convertToEntity(marksDto));
        return ResponseEntity.ok(convertToDto(updatedMarks));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMarks(@PathVariable UUID id) {
        marksService.deleteMarks(id);
        return ResponseEntity.noContent().build();
    }

    // Convert DTO to Entity
    private Marks convertToEntity(MarksDto dto) {
        Marks marks = new Marks();
        marks.setId(dto.getId());
        marks.setExamType(dto.getExamType());
        marks.setMarks(dto.getMarks());
        marks.setSubject(dto.getSubject());
        return marks;
    }

    // Convert Entity to DTO
    private MarksDto convertToDto(Marks marks) {
        MarksDto dto = new MarksDto();
        dto.setId(marks.getId());
        dto.setExamType(marks.getExamType());
        dto.setMarks(marks.getMarks());
        dto.setSubject(marks.getSubject());
        dto.setStudentId(marks.getStudent().getId());
        return dto;
    }
}