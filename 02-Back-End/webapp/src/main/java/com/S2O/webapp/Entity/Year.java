package com.S2O.webapp.Entity;

import lombok.Data;
import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class Year {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "year_id")
    private int yearId;

    @Column(name = "year_value")
    private int yearValue;

    @OneToMany(mappedBy = "year", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Term> terms;
}
