package com.S2O.webapp.dao;

import com.S2O.webapp.Entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<ChatMessage ,Long> {
}
