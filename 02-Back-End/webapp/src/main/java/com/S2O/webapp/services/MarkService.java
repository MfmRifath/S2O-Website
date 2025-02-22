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
import java.util.*;
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
                String nic = getCellStringValue(row.getCell(1));
                String streamName = getCellStringValue(row.getCell(2));
                String year = getCellStringValue(row.getCell(3));
                String subjectName = getCellStringValue(row.getCell(4));
                int markValue = (int) getCellNumericValue(row.getCell(5));
                String examName = getCellStringValue(row.getCell(6));

                // Find or create Student
                Student student = studentRepository.findByNameAndStream(studentName, streamName)
                        .orElseGet(() -> createStudent(studentName, streamName, year, nic));

                // Find or create Exam
                Exam exam = examRepository.findByName(examName)
                        .orElseGet(() -> createExam(examName));

                // Find or create Subject
                Subject subject = subjectRepository.findByName(subjectName)
                        .orElseGet(() -> createSubject(subjectName, streamName));

                // Create MarkDTO
                MarkDTO markDTO = new MarkDTO();
                markDTO.setStudentDTO(new StudentDTO(student.getId(), student.getName(), student.getStream(), student.getYear(), null,student.getNic()));
                markDTO.setSubjectDTO(new SubjectDTO(subject.getId(), subject.getName(), null));
                markDTO.setExamDTO(new ExamDTO(exam.getId(), exam.getName(), null) );
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

    private Student createStudent(String name, String stream, String year, String nic)  {
        Student student = new Student();
        student.setName(name);
        student.setNic(nic);
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
    // Inside MarkService
    // In your MarkService class

    public Map<String, Map<String, Map<String, List<LeaderBoardDTO>>>> getYearExamSubjectWiseLeaderBoard() {
        // Retrieve all Mark entities and convert them to MarkDTO objects.
        List<Mark> markEntities = markRepository.findAll();
        List<MarkDTO> allMarks = markEntities.stream()
                .map(this::convertToMarkDTO)
                .collect(Collectors.toList());

        // Group marks by Year (from StudentDTO)
        Map<String, List<MarkDTO>> marksByYear = allMarks.stream()
                .collect(Collectors.groupingBy(
                        mark -> Optional.ofNullable(mark.getStudentDTO().getYear()).orElse("Unknown Year")
                ));

        // Final structure: Year -> Exam -> Subject -> List<LeaderBoardDTO>
        Map<String, Map<String, Map<String, List<LeaderBoardDTO>>>> leaderBoard = new HashMap<>();

        marksByYear.forEach((year, marksForYear) -> {
            // Group marks by Exam (from ExamDTO)
            Map<String, List<MarkDTO>> marksByExam = marksForYear.stream()
                    .collect(Collectors.groupingBy(
                            mark -> Optional.ofNullable(mark.getExamDTO().getName()).orElse("Unknown Exam")
                    ));
            Map<String, Map<String, List<LeaderBoardDTO>>> examMap = new HashMap<>();

            marksByExam.forEach((exam, marksForExam) -> {
                // Group marks by Subject (from SubjectDTO)
                Map<String, List<MarkDTO>> marksBySubject = marksForExam.stream()
                        .collect(Collectors.groupingBy(
                                mark -> Optional.ofNullable(mark.getSubjectDTO().getName()).orElse("Unknown Subject")
                        ));
                Map<String, List<LeaderBoardDTO>> subjectMap = new HashMap<>();

                marksBySubject.forEach((subject, marksForSubject) -> {
                    // Aggregate total marks per student for this subject, exam, and year
                    Map<Long, Double> studentTotalMarks = marksForSubject.stream()
                            .collect(Collectors.groupingBy(
                                    mark -> mark.getStudentDTO().getId(),
                                    Collectors.summingDouble(MarkDTO::getMarks)
                            ));

                    // Build the leaderboard list for this group
                    List<LeaderBoardDTO> leaderboardList = studentTotalMarks.entrySet().stream()
                            .map(entry -> {
                                LeaderBoardDTO dto = new LeaderBoardDTO();
                                dto.setStudentId(entry.getKey());
                                // Retrieve the student name from one mark in this group
                                String studentName = marksForSubject.stream()
                                        .filter(mark -> mark.getStudentDTO().getId().equals(entry.getKey()))
                                        .findFirst()
                                        .map(mark -> mark.getStudentDTO().getName())
                                        .orElse("Unknown");
                                dto.setStudentName(studentName);
                                dto.setTotalMarks(entry.getValue());
                                return dto;
                            })
                            .sorted(Comparator.comparingDouble(LeaderBoardDTO::getTotalMarks).reversed())
                            .collect(Collectors.toList());

                    // Assign ranking numbers for this subject group
                    int rank = 1;
                    for (LeaderBoardDTO dto : leaderboardList) {
                        dto.setRank(rank++);
                    }
                    subjectMap.put(subject, leaderboardList);
                });
                examMap.put(exam, subjectMap);
            });
            leaderBoard.put(year, examMap);
        });

        return leaderBoard;
    }
    /**
     * Converts a Mark entity to a MarkDTO.
     */
    private MarkDTO convertToMarkDTO(Mark mark) {
        MarkDTO dto = new MarkDTO();
        dto.setId(mark.getId());
        dto.setMarks(mark.getMarks());
        dto.setMaxMarks(mark.getMaxMarks());

        // Ensure Student is not null and its fields are properly loaded
        if (mark.getStudent() != null) {
            StudentDTO studentDTO = new StudentDTO();
            studentDTO.setId(mark.getStudent().getId());
            studentDTO.setName(mark.getStudent().getName());
            studentDTO.setNic(mark.getStudent().getNic());
            studentDTO.setStream(mark.getStudent().getStream());
            studentDTO.setYear(mark.getStudent().getYear());
            dto.setStudentDTO(studentDTO);
        } else {
            // Log or handle the case where student data is missing
            // e.g., dto.setStudentDTO(new StudentDTO());
        }

        // Similarly convert Subject and Exam details...
        SubjectDTO subjectDTO = new SubjectDTO();
        subjectDTO.setId(mark.getSubject().getId());
        subjectDTO.setName(mark.getSubject().getName());
        dto.setSubjectDTO(subjectDTO);

        ExamDTO examDTO = new ExamDTO();
        examDTO.setId(mark.getExam().getId());
        examDTO.setName(mark.getExam().getName());
        examDTO.setDate(mark.getExam().getDate());
        dto.setExamDTO(examDTO);

        return dto;
    }
    public Map<String, Map<String, List<LeaderBoardDTO>>> getTotalMarksLeaderBoardByZScore() {
        // Retrieve all Mark entities and convert them to MarkDTO objects.
        List<Mark> markEntities = markRepository.findAll();
        List<MarkDTO> allMarks = markEntities.stream()
                .map(this::convertToMarkDTO)
                .collect(Collectors.toList());

        // Group marks by Year (from StudentDTO) and then by Exam (from ExamDTO).
        Map<String, Map<String, List<MarkDTO>>> groupedData = allMarks.stream()
                .collect(Collectors.groupingBy(
                        mark -> Optional.ofNullable(mark.getStudentDTO().getYear()).orElse("Unknown Year"),
                        Collectors.groupingBy(
                                mark -> Optional.ofNullable(mark.getExamDTO().getName()).orElse("Unknown Exam")
                        )
                ));

        // Final structure: Year -> Exam -> List<LeaderBoardDTO>
        Map<String, Map<String, List<LeaderBoardDTO>>> leaderboard = new HashMap<>();

        // Process each (year, exam) group.
        groupedData.forEach((year, examMap) -> {
            Map<String, List<LeaderBoardDTO>> examLeaderboards = new HashMap<>();

            examMap.forEach((exam, marksList) -> {
                // Aggregate total marks per student for the given (year, exam) group.
                Map<Long, Double> studentTotalMarks = marksList.stream()
                        .collect(Collectors.groupingBy(
                                mark -> mark.getStudentDTO().getId(),
                                Collectors.summingDouble(MarkDTO::getMarks)
                        ));

                // Map to store student names (assuming at least one mark exists per student).
                Map<Long, String> studentNames = marksList.stream()
                        .collect(Collectors.toMap(
                                mark -> mark.getStudentDTO().getId(),
                                mark -> mark.getStudentDTO().getName(),
                                (n1, n2) -> n1
                        ));

                // Collect all total marks into a list for computing the mean and standard deviation.
                List<Double> totals = new ArrayList<>(studentTotalMarks.values());
                double mean = totals.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);

                // Compute variance, then standard deviation.
                double variance = totals.stream()
                        .mapToDouble(total -> Math.pow(total - mean, 2))
                        .average().orElse(0.0);
                double stdDev = Math.sqrt(variance);

                // Build the leaderboard list by computing the Z‑score for each student.
                List<LeaderBoardDTO> lbList = studentTotalMarks.entrySet().stream()
                        .map(entry -> {
                            LeaderBoardDTO dto = new LeaderBoardDTO();
                            dto.setStudentId(entry.getKey());
                            dto.setStudentName(studentNames.get(entry.getKey()));
                            dto.setTotalMarks(entry.getValue());
                            // Compute Z‑score. If stdDev is zero, avoid division by zero.
                            double zScore = stdDev == 0 ? 0 : (entry.getValue() - mean) / stdDev;
                            dto.setZScore(zScore);
                            return dto;
                        })
                        .sorted(Comparator.comparingDouble(LeaderBoardDTO::getZScore).reversed())
                        .collect(Collectors.toList());

                // Assign ranking numbers based on the sorted order.
                int rank = 1;
                for (LeaderBoardDTO dto : lbList) {
                    dto.setRank(rank++);
                }

                examLeaderboards.put(exam, lbList);
            });

            leaderboard.put(year, examLeaderboards);
        });

        return leaderboard;
    }
    // A conversion method to convert Mark entities to PerformanceDTO
    private PerformanceDTO convertToPerformanceDTO(Mark mark) {
        PerformanceDTO dto = new PerformanceDTO();
        dto.setStudentName(mark.getStudent().getName());
        dto.setSubjectName(mark.getSubject().getName());
        dto.setExamName(mark.getExam().getName());
        dto.setPercentage(calculatePercentage(mark)); // Implement calculatePercentage as needed.
        // Set additional fields, including stream and year if desired.
        dto.setStream(mark.getStudent().getStream());
        dto.setYear(mark.getStudent().getYear());
        return dto;
    }

    // Example method to compute a percentage (replace with your actual logic)
    private double calculatePercentage(Mark mark) {
        // For example: (marks obtained / max marks) * 100
        return (mark.getMarks() / mark.getMaxMarks()) * 100;
    }

    // Implement getPerformanceByStream method
    public Map<String, List<PerformanceDTO>> getPerformanceByStream() {
        // Retrieve all marks from the repository
        List<Mark> marks = markRepository.findAll();
        // Convert to DTOs
        List<PerformanceDTO> dtos = marks.stream()
                .map(this::convertToPerformanceDTO)
                .collect(Collectors.toList());
        // Group by stream (assuming PerformanceDTO has a getStream() method)
        return dtos.stream()
                .collect(Collectors.groupingBy(PerformanceDTO::getStream));
    }
    public List<MarkDTO> getExamMarksOfStudent(String nic, Long examId) {
        // Find the student by NIC.
        Student student = studentRepository.findByNic(nic)
                .orElseThrow(() -> new EntityNotFoundException("Student not found with NIC: " + nic));

        // Retrieve marks for this student for the given exam.
        List<Mark> marks = markRepository.findByStudent_IdAndExam_Id(student.getId(), examId);
        if (marks.isEmpty()) {
            throw new EntityNotFoundException("No marks found for NIC: " + nic + " and exam ID: " + examId);
        }

        // Compute total marks for this student.
        double studentTotal = marks.stream()
                .mapToDouble(Mark::getMarks)
                .sum();

        // Retrieve all marks for this exam (across all students).
        List<Mark> allMarksForExam = markRepository.findByExam_Id(examId);
        if (allMarksForExam.isEmpty()) {
            throw new EntityNotFoundException("No marks found for exam ID: " + examId);
        }

        // Group marks by student ID and compute the total marks per student.
        Map<Long, Double> totalsByStudent = allMarksForExam.stream()
                .collect(Collectors.groupingBy(
                        mark -> mark.getStudent().getId(),
                        Collectors.summingDouble(Mark::getMarks)
                ));

        // Determine the rank by sorting totals in descending order.
        List<Double> sortedTotals = totalsByStudent.values().stream()
                .sorted(Comparator.reverseOrder())
                .collect(Collectors.toList());
        int rank = sortedTotals.indexOf(studentTotal) + 1;

        // Compute mean and standard deviation for totals.
        double mean = totalsByStudent.values().stream()
                .mapToDouble(Double::doubleValue)
                .average().orElse(0.0);
        double variance = totalsByStudent.values().stream()
                .mapToDouble(total -> Math.pow(total - mean, 2))
                .average().orElse(0.0);
        double stdDev = Math.sqrt(variance);
        double zScore = stdDev == 0 ? 0 : (studentTotal - mean) / stdDev;

        // Convert each Mark to its DTO and set rank and zScore.
        List<MarkDTO> markDTOs = marks.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        // Set the computed rank and zScore in each DTO.
        markDTOs.forEach(dto -> {
            dto.setRank(rank);
            dto.setZScore(zScore);
        });

        return markDTOs;
    }

    private MarkDTO convertToDTO(Mark mark) {
        MarkDTO dto = new MarkDTO();
        dto.setId(mark.getId());
        dto.setMarks(mark.getMarks());
        dto.setMaxMarks(mark.getMaxMarks());

        // Convert Student details using the provided StudentDTO constructor.
        if (mark.getStudent() != null) {
            dto.setStudentDTO(new StudentDTO(
                    mark.getStudent().getId(),
                    mark.getStudent().getName(),
                    mark.getStudent().getStream(),
                    mark.getStudent().getYear(),
                    new ArrayList<>(),  // Pass an empty list for marks (or adjust as needed)
                    mark.getStudent().getNic()
            ));
        }

        // Convert Subject details.
        if (mark.getSubject() != null) {
            dto.setSubjectDTO(new SubjectDTO(
                    mark.getSubject().getId(),
                    mark.getSubject().getName(),
                    mark.getSubject().getStream()
            ));
        }

        // Convert Exam details.
        if (mark.getExam() != null) {
            dto.setExamDTO(new ExamDTO(
                    mark.getExam().getId(),
                    mark.getExam().getName(),
                    mark.getExam().getDate()
            ));
        }

        return dto;
    }
}