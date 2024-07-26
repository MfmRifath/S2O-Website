package com.S2O.webapp.Entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "chat")
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "sender")
    private String sender;

    @Column(name = "reciver")
    private String reciver;
    @Column(name = "content")
    private String content;
}
