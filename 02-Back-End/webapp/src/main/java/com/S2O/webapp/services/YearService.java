package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Year;
import com.S2O.webapp.dao.StudentRepository;
import com.S2O.webapp.dao.YearRepository;
import com.S2O.webapp.dto.TermDTO;
import com.S2O.webapp.dto.YearDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class YearService {

    private static final Logger logger = LoggerFactory.getLogger(YearService.class);

    private final YearRepository yearRepository;
    private final StudentRepository studentRepository;

    @Autowired
    public YearService(YearRepository yearRepository, StudentRepository studentRepository) {
        this.yearRepository = yearRepository;
        this.studentRepository = studentRepository;
    }

    @Cacheable("years")
    @Transactional(readOnly = true)
    public List<YearDTO> getAllYearsWithTermsAndSubjects() {
        logger.info("Fetching all years with terms and subjects");

        return yearRepository.findAll().stream()
                .map(year -> new YearDTO(
                        year.getYearId(),
                        year.getYearValue(),
                        year.getTerms().stream()
                                .map(term -> new TermDTO(term.getTermId(), term.getTermName(), null))
                                .collect(Collectors.toList())
                )).collect(Collectors.toList());
    }





    public Optional<Year> getYearById(Long yearId) {
        logger.info("Fetching year by ID: {}", yearId);
        return yearRepository.findById(yearId);
    }

    public Year saveYear(Year year) {
        logger.info("Saving new year with value: {}", year.getYearValue());
        return yearRepository.save(year);
    }

    public Year updateYear(Long yearId, Year yearDetails) {
        logger.info("Updating year with ID: {}", yearId);
        return yearRepository.findById(yearId)
                .map(year -> {
                    year.setYearValue(yearDetails.getYearValue());
                    return yearRepository.save(year);
                })
                .orElseGet(() -> {
                    logger.warn("Year with ID {} not found, saving as new entry", yearId);
                    return yearRepository.save(yearDetails);
                });
    }

    public void deleteYear(Long yearId) {
        logger.info("Deleting year with ID: {}", yearId);
        yearRepository.deleteById(yearId);
    }
}
