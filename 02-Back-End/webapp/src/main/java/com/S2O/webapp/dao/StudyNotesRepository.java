package com.S2O.webapp.dao;

import com.S2O.webapp.Entity.Book;
import com.S2O.webapp.Entity.StudyNotes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyNotesRepository extends JpaRepository<StudyNotes,Long> {
}
