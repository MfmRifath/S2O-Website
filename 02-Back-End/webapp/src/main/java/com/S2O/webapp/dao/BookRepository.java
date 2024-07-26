package com.S2O.webapp.dao;

import com.S2O.webapp.Entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book,Long> {
}
