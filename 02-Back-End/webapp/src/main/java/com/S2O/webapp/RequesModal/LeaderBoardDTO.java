package com.S2O.webapp.RequesModal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaderBoardDTO {
    private Long studentId;
    private String studentName;
    private double totalMarks;
    private int rank;
    private double zScore;   // New field for Z-score
}