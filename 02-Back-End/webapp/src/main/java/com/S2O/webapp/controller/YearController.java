package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Term;
import com.S2O.webapp.Entity.Year;
import com.S2O.webapp.dto.YearDTO;
import com.S2O.webapp.services.TermService;
import com.S2O.webapp.services.YearService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/years")
public class YearController {

    @Autowired
    private YearService yearService;

    @Autowired
    private TermService termService;

    @GetMapping
    public ResponseEntity<?> getAllYears() {
        try {
            List<YearDTO> years = yearService.getAllYearsWithTermsAndSubjects(); // Using YearDTO
            if (years.isEmpty()) {
                return ResponseEntity.ok(Collections.emptyList()); // Returns an empty list if no data
            }
            return ResponseEntity.ok(years);
        } catch (Exception e) {
            // Log the exception with a stack trace
            e.printStackTrace();
            System.err.println("Error fetching years: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching years: " + e.getMessage());
        }
    }



    @GetMapping("/{id}")
    public ResponseEntity<Year> getYearById(@PathVariable Long id) {
        return yearService.getYearById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Year> createYear(@RequestBody Year year) {
        Year savedYear = yearService.saveYear(year);
        return new ResponseEntity<>(savedYear, HttpStatus.CREATED);
    }

    @GetMapping("/{yearId}/terms")
    public ResponseEntity<List<Term>> getTermsByYearId(@PathVariable Long yearId) {
        List<Term> terms = termService.getTermsByYearId(yearId);
        return ResponseEntity.ok(terms);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Year> updateYear(@PathVariable Long id, @RequestBody Year yearDetails) {
        Year updatedYear = yearService.updateYear(id, yearDetails);
        return ResponseEntity.ok(updatedYear);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteYear(@PathVariable Long id) {
        yearService.deleteYear(id);
        return ResponseEntity.noContent().build();
    }
}
