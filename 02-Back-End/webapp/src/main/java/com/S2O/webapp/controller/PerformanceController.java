package com.S2O.webapp.controller;


import com.S2O.webapp.Entity.Performance;
import com.S2O.webapp.services.PerformanceService;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/performance")
public class PerformanceController {

    private final PerformanceService performanceService;

    public PerformanceController(PerformanceService performanceService) {
        this.performanceService = performanceService;
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<Performance> getPerformanceByStudent(@PathVariable UUID studentId) {
        Optional<Performance> performance = performanceService.getPerformanceByStudent(studentId);
        return performance.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}