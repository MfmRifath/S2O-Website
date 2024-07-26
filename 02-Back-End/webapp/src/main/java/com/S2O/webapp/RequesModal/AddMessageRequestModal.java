package com.S2O.webapp.RequesModal;

import lombok.Data;

@Data
public class AddMessageRequestModal {
    private Long id;

    private String sender;
    private String reciver;
     private String content;
}
