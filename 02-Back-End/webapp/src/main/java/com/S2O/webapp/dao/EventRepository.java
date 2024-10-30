package com.S2O.webapp.dao;

import com.S2O.webapp.Entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}