package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Exam;
import com.S2O.webapp.Entity.Mark;
import com.S2O.webapp.Entity.Student;
import com.S2O.webapp.Entity.Subject;
import com.S2O.webapp.RequesModal.*;
import com.S2O.webapp.dao.ExamRepository;
import com.S2O.webapp.dao.MarkRepository;
import com.S2O.webapp.dao.StudentRepository;
import com.S2O.webapp.dao.SubjectRepository;
import com.S2O.webapp.error.EntityNotFoundException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MarkService {

    private static final Logger logger = LoggerFactory.getLogger(MarkService.class);

    @Autowired
    private MarkRepository markRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private ExamRepository examRepository;

    // Get all marks with pagination
    public Page<MarkDTO> getAllMarks(Pageable pageable) {
        logger.info("Fetching all marks with pagination");
        return markRepository.findAll(pageable)
                .map(this::convertToDTO);
    }

    // Get mark by ID
    public MarkDTO getMarkById(Long id) {
        logger.info("Fetching mark by ID: {}", id);
        return markRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new EntityNotFoundException("Mark not found with ID: " + id));
    }

    // Save a single mark
    public MarkDTO saveMark(MarkDTO markDTO) {
        logger.info("Saving mark for student ID: {}", markDTO.getStudentDTO().getId());
        validateMarkDTO(markDTO);

        Mark mark = new Mark();
        mark.setMarks(markDTO.getMarks());
        mark.setMaxMarks(markDTO.getMaxMarks());
        mark.setStudent(studentRepository.findById(markDTO.getStudentDTO().getId())
                .orElseThrow(() -> new EntityNotFoundException("Student not found")));
        mark.setSubject(subjectRepository.findById(markDTO.getSubjectDTO().getId())
                .orElseThrow(() -> new EntityNotFoundException("Subject not found")));
        mark.setExam(examRepository.findById(markDTO.getExamDTO().getId())
                .orElseThrow(() -> new EntityNotFoundException("Exam not found")));

        Mark saved = markRepository.save(mark);
        logger.info("Mark saved successfully with ID: {}", saved.getId());
        return convertToDTO(saved);
    }
    public String saveBulkMarks(MultipartFile file) throws Exception {
        // Validate file
        if (file.isEmpty() || !file.getOriginalFilename().endsWith(".xlsx")) {
            throw new IllegalArgumentException("Invalid file. Please upload a valid Excel file.");
        }

        try (InputStream inputStream = file.getInputStream()) {
            // Process the Excel file to create a list of MarkDTO
            List<MarkDTO> marks = processMarksFile(inputStream);

            // Save all marks to the database
            for (MarkDTO markDTO : marks) {
                saveMark(markDTO);
            }

            return "Bulk marks uploaded and saved successfully.";
        } catch (Exception e) {
            throw new RuntimeException("Failed to process and save marks: " + e.getMessage(), e);
        }
    }

    // Delete a mark
    public void deleteMark(Long id) {
        logger.info("Deleting mark with ID: {}", id);
        if (!markRepository.existsById(id)) {
            throw new EntityNotFoundException("Mark not found with ID: " + id);
        }
        markRepository.deleteById(id);
        logger.info("Mark deleted successfully");
    }

    public List<MarkDTO> processMarksFile(InputStream inputStream) throws Exception {
        List<MarkDTO> marks = new ArrayList<>();

        try (Workbook workbook = new XSSFWorkbook(inputStream)) {
            Sheet sheet = workbook.getSheetAt(0); // Assuming data is in the first sheet

            for (int i = 1; i <= sheet.getLastRowNum(); i++) { // Skip header row
                Row row = sheet.getRow(i);
                if (row == null) continue; // Skip empty rows

                // Dynamically handle cell types
                String studentName = getCellStringValue(row.getCell(0));
                String streamName = getCellStringValue(row.getCell(1));
                String year = getCellStringValue(row.getCell(2));
                String subjectName = getCellStringValue(row.getCell(3));
                int markValue = (int) getCellNumericValue(row.getCell(4));
                String examName = getCellStringValue(row.getCell(5));

                // Find or create Student
                Student student = studentRepository.findByNameAndStream(studentName, streamName)
                        .orElseGet(() -> createStudent(studentName, streamName, year));

                // Find or create Exam
                Exam exam = examRepository.findByName(examName)
                        .orElseGet(() -> createExam(examName));

                // Find or create Subject
                Subject subject = subjectRepository.findByName(subjectName)
                        .orElseGet(() -> createSubject(subjectName, streamName));

                // Create MarkDTO
                MarkDTO markDTO = new MarkDTO();
                markDTO.setStudentDTO(new StudentDTO(student.getId(), student.getName(), student.getStream(), student.getYear(), null));
                markDTO.setSubjectDTO(new SubjectDTO(subject.getId(), subject.getName(), null));
                markDTO.setExamDTO(new ExamDTO(exam.getId(), exam.getName(), null));
                markDTO.setMarks(markValue);
                markDTO.setMaxMarks(100);

                marks.add(markDTO);
            }
        }

        return marks;
    }

    // Utility methods for dynamic cell value handling
    private String getCellStringValue(Cell cell) {
        if (cell == null) return "";
        return switch (cell.getCellType()) {
            case STRING -> cell.getStringCellValue();
            case NUMERIC -> String.valueOf((int) cell.getNumericCellValue());
            default -> "";
        };
    }

    private double getCellNumericValue(Cell cell) {
        if (cell == null) return 0;
        return switch (cell.getCellType()) {
            case NUMERIC -> cell.getNumericCellValue();
            case STRING -> Double.parseDouble(cell.getStringCellValue());
            default -> 0;
        };
    }

    private Student createStudent(String name, String stream, String year) {
        Student student = new Student();
        student.setName(name);
        student.setStream(stream);
        student.setYear(year);
        return studentRepository.save(student);
    }

    private Exam createExam(String name) {
        Exam exam = new Exam();
        exam.setName(name);
        return examRepository.save(exam);
    }
    private Subject createSubject(String name, String stream) {
        Subject subject = new Subject();
        subject.setName(name);
        subject.setStream(stream);
        return subjectRepository.save(subject);
    }
    // Save bulk marks
    public void saveBulkMarks(List<MarkDTO> marks) {
        marks.forEach(this::saveMark);
    }

    // Calculate overall performance
    public List<PerformanceDTO> calculatePerformance() {
        logger.info("Calculating performance for all marks");
        return markRepository.findAll().stream()
                .map(this::mapToPerformanceDTO)
                .collect(Collectors.toList());
    }

    // Calculate performance grouped by stream
    public Map<String, List<PerformanceDTO>> calculatePerformanceByStream() {
        logger.info("Calculating performance by stream");
        return markRepository.findAll().stream()
                .map(this::mapToPerformanceDTO)
                .collect(Collectors.groupingBy(PerformanceDTO::getStream));
    }

    // Calculate overall performance by subject
    public List<SubjectPerformanceDTO> calculateOverallPerformanceBySubject() {
        logger.info("Calculating overall performance by subject");
        List<Mark> marks = markRepository.findAll();

        Map<Long, List<Mark>> marksBySubject = marks.stream()
                .collect(Collectors.groupingBy(mark -> mark.getSubject().getId()));

        return marksBySubject.entrySet().stream()
                .map(entry -> {
                    Long subjectId = entry.getKey();
                    List<Mark> subjectMarks = entry.getValue();

                    double totalMarksObtained = subjectMarks.stream().mapToDouble(Mark::getMarks).sum();
                    double totalMaxMarks = subjectMarks.stream().mapToDouble(Mark::getMaxMarks).sum();
                    double averagePercentage = (totalMarksObtained / totalMaxMarks) * 100;

                    SubjectPerformanceDTO performance = new SubjectPerformanceDTO();
                    performance.setSubjectId(subjectId);
                    performance.setSubjectName(subjectMarks.isEmpty() ? "Unknown" : subjectMarks.get(0).getSubject().getName());
                    performance.setTotalMarksObtained(totalMarksObtained);
                    performance.setTotalMaxMarks(totalMaxMarks);
                    performance.setAveragePercentage(averagePercentage);

                    return performance;
                }).collect(Collectors.toList());
    }
    private Mark convertToEntity(MarkDTO markDTO) {
        Mark mark = new Mark();
        mark.setMarks(markDTO.getMarks());
        mark.setMaxMarks(markDTO.getMaxMarks());

        // Link Student
        mark.setStudent(
                studentRepository.findById(markDTO.getStudentDTO().getId())
                        .orElseThrow(() -> new EntityNotFoundException("Student not found with ID: " + markDTO.getStudentDTO().getId()))
        );

        // Link Subject
        mark.setSubject(
                subjectRepository.findById(markDTO.getSubjectDTO().getId())
                        .orElseThrow(() -> new EntityNotFoundException("Subject not found with ID: " + markDTO.getSubjectDTO().getId()))
        );

        // Link Exam
        mark.setExam(
                examRepository.findById(markDTO.getExamDTO().getId())
                        .orElseThrow(() -> new EntityNotFoundException("Exam not found with ID: " + markDTO.getExamDTO().getId()))
        );

        return mark;
    }
    // Convert Mark entity to DTO
    private MarkDTO convertToDTO(Mark mark) {
        MarkDTO dto = new MarkDTO();
        dto.setId(mark.getId());
        dto.setMarks(mark.getMarks());
        dto.setMaxMarks(mark.getMaxMarks());

        if (mark.getStudent() != null) {
            StudentDTO studentDTO = new StudentDTO();
            studentDTO.setId(mark.getStudent().getId());
            studentDTO.setName(mark.getStudent().getName());
            studentDTO.setStream(mark.getStudent().getStream());
            studentDTO.setYear(mark.getStudent().getYear());
            dto.setStudentDTO(studentDTO);
        }

        if (mark.getSubject() != null) {
            SubjectDTO subjectDTO = new SubjectDTO();
            subjectDTO.setId(mark.getSubject().getId());
            subjectDTO.setName(mark.getSubject().getName());
            dto.setSubjectDTO(subjectDTO);
        }

        if (mark.getExam() != null) {
            ExamDTO examDTO = new ExamDTO();
            examDTO.setId(mark.getExam().getId());
            examDTO.setName(mark.getExam().getName());
            dto.setExamDTO(examDTO);
        }

        return dto;
    }

    // Map Mark entity to PerformanceDTO
    private PerformanceDTO mapToPerformanceDTO(Mark mark) {
        PerformanceDTO performance = new PerformanceDTO();
        performance.setStudentId(mark.getStudent().getId());
        performance.setStudentName(mark.getStudent().getName());
        performance.setStream(mark.getStudent().getStream());
        performance.setSubjectId(mark.getSubject().getId());
        performance.setSubjectName(mark.getSubject().getName());
        performance.setExamId(mark.getExam().getId());
        performance.setExamName(mark.getExam().getName());
        performance.setMarks(mark.getMarks());
        performance.setMaxMarks(mark.getMaxMarks());
        performance.setPercentage(((double) mark.getMarks() / mark.getMaxMarks()) * 100);
        return performance;
    }

    // Validate MarkDTO
    private void validateMarkDTO(MarkDTO markDTO) {
        if (markDTO.getMarks() < 0 || markDTO.getMaxMarks() <= 0 || markDTO.getMarks() > markDTO.getMaxMarks()) {
            throw new IllegalArgumentException("Invalid marks or maximum marks values");
        }
    }
    // Get all distinct years as String
    public List<String> findAllDistinctYears() {
        return markRepository.findAllDistinctYears();
    }

    // Get all distinct subjects
    public List<String> findAllDistinctSubjects() {
        return markRepository.findAllDistinctSubjects();
    }

    // Get all exams for a specific subject
    public List<String> findAllExamsForSubject(String subjectName) {
        return markRepository.findAllExamsForSubject(subjectName);
    }

    public List<Map<String, Object>> getMarksDistributionBySubjectExamAndYear() {
        List<String> subjects = findAllDistinctSubjects();
        logger.debug("Subjects: {}", subjects);

        return subjects.stream().flatMap(subject -> {
            List<String> exams = findAllExamsForSubject(subject);
            logger.debug("Exams for Subject {}: {}", subject, exams);

            return exams.stream().flatMap(exam -> {
                List<String> years = findAllDistinctYears();
                logger.debug("Years for Exam {} and Subject {}: {}", exam, subject, years);

                return years.stream().map(year -> {
                    List<Integer> distribution = getMarksDistributionByYear(subject, exam, year);
                    logger.debug("Distribution for Subject {}, Exam {}, Year {}: {}", subject, exam, year, distribution);

                    return Map.of(
                            "subject", subject,
                            "exam", exam,
                            "year", year,
                            "distribution", distribution != null ? distribution : List.of(0, 0, 0, 0, 0)
                    );
                });
            });
        }).collect(Collectors.toList());
    }
    // Get marks distribution by year
    public List<Integer> getMarksDistributionByYear(String subjectName, String examName, String year) {
        // Fetch marks from the database
        List<Mark> marks = markRepository.findBySubject_NameAndExam_NameAndStudent_Year(subjectName, examName, year);

        // Initialize distribution counts
        int range0_20 = 0;
        int range21_40 = 0;
        int range41_60 = 0;
        int range61_80 = 0;
        int range81_100 = 0;

        // Calculate distribution
        for (Mark mark : marks) {
            if (mark.getMarks() >= 0 && mark.getMarks() <= 20) {
                range0_20++;
            } else if (mark.getMarks() >= 21 && mark.getMarks() <= 40) {
                range21_40++;
            } else if (mark.getMarks() >= 41 && mark.getMarks() <= 60) {
                range41_60++;
            } else if (mark.getMarks() >= 61 && mark.getMarks() <= 80) {
                range61_80++;
            } else if (mark.getMarks() >= 81 && mark.getMarks() <= 100) {
                range81_100++;
            }
        }

        // Return distribution as a list
        return List.of(range0_20, range21_40, range41_60, range61_80, range81_100);
    }
}