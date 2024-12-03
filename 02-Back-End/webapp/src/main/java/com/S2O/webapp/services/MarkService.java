package com.S2O.webapp.services;

import com.S2O.webapp.RequesModal.MarkDTO;
import com.S2O.webapp.RequesModal.PerformanceDTO;
import com.S2O.webapp.RequesModal.SubjectPerformanceDTO;

import java.util.List;
import java.util.Map;

interface MarkService {
    List<MarkDTO> getAllMarks();
    MarkDTO getMarkById(Long id);
    MarkDTO saveMark(MarkDTO markDTO);
    void deleteMark(Long id);
    List<PerformanceDTO> calculatePerformance();

    Map<String, List<PerformanceDTO>> calculatePerformanceByStream();
    List<SubjectPerformanceDTO> calculateOverallPerformanceBySubject();
}