package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Year;
import com.S2O.webapp.dao.YearRepository;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class YearService {
    private final YearRepository yearRepository;

    public YearService(YearRepository yearRepository) {
        this.yearRepository = yearRepository;
    }

    public List<Year> getAllYears() {
        return yearRepository.findAll();
    }

    public Year getYearById(int id) {
        return yearRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Year not found"));
    }

    public Year createYear(Year year) {
        return yearRepository.save(year);
    }

    public Year updateYear(int id, Year yearDetails) {
        Year year = yearRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Year not found"));
        year.setYearValue(yearDetails.getYearValue());
        return yearRepository.save(year);
    }

    public void deleteYear(int id) {
        Year year = yearRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Year not found"));
        yearRepository.delete(year);
    }
}
