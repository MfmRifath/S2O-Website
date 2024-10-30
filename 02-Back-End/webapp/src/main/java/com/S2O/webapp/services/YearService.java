package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Year;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class YearService {

    @Autowired
    private com.S2O.webapp.dao.YearRepository yearRepository;

    public List<Year> getAllYears() {
        return yearRepository.findAll();
    }

    public Optional<Year> getYearById(int yearId) {
        return yearRepository.findById(yearId);
    }

    public Year saveYear(Year year) {
        return yearRepository.save(year);
    }

    public Year updateYear(int yearId, Year yearDetails) {
        return yearRepository.findById(yearId)
                .map(year -> {
                    year.setYearValue(yearDetails.getYearValue());
                    year.setTerms(yearDetails.getTerms());
                    return yearRepository.save(year);
                })
                .orElseGet(() -> yearRepository.save(yearDetails));
    }

    public void deleteYear(int yearId) {
        yearRepository.deleteById(yearId);
    }
}
