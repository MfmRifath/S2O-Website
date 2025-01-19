package com.S2O.webapp.Entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class BestResult {
    @Id
    private Long id;

    @Column(nullable = false)
    private String studentName;

    private String studentStream;

    private String examTakenYear;

    @OneToOne(mappedBy = "bestResult", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Image image;
}
