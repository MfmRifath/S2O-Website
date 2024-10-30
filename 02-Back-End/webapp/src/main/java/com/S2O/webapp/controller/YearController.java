package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Year;
import com.S2O.webapp.services.YearService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/years")
public class YearController {

    @Autowired
    private YearService yearService;

    @GetMapping
    public List<Year> getAllYears() {
        return yearService.getAllYears();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Year> getYearById(@PathVariable int id) {
        return yearService.getYearById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Year createYear(@RequestBody Year year) {
        return yearService.saveYear(year);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Year> updateYear(@PathVariable int id, @RequestBody Year yearDetails) {
        Year updatedYear = yearService.updateYear(id, yearDetails);
        return ResponseEntity.ok(updatedYear);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteYear(@PathVariable int id) {
        yearService.deleteYear(id);
        return ResponseEntity.noContent().build();
    }
}
