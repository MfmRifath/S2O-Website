package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Year;
import com.S2O.webapp.services.YearService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/years")
public class YearController {
    private final YearService yearService;

    public YearController(YearService yearService) {
        this.yearService = yearService;
    }

    @GetMapping
    public List<Year> getAllYears() {
        return yearService.getAllYears();
    }

    @GetMapping("/{id}")
    public Year getYearById(@PathVariable int id) {
        return yearService.getYearById(id);
    }

    @PostMapping
    public Year createYear(@RequestBody Year year) {
        return yearService.createYear(year);
    }

    @PutMapping("/{id}")
    public Year updateYear(@PathVariable int id, @RequestBody Year yearDetails) {
        return yearService.updateYear(id, yearDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteYear(@PathVariable int id) {
        yearService.deleteYear(id);
    }
}
