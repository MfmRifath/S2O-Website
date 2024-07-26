package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.ChatMessage;
import com.S2O.webapp.RequesModal.AddMessageRequestModal;
import com.S2O.webapp.services.ChatMessageServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/chatMessages")
public class ChatController {
    @Autowired
    private ChatMessageServices chatMessageServices;

    public ChatController(ChatMessageServices chatMessageServices){
        this.chatMessageServices=chatMessageServices;
    }


    @PostMapping("/add/message")
    public ResponseEntity<String> addChat(@RequestBody AddMessageRequestModal addMessageRequestModal) {
        try {
            if (addMessageRequestModal == null) {
                throw new IllegalArgumentException("Request body cannot be null");
            }
            if (addMessageRequestModal .getSender()== null || addMessageRequestModal.getSender().isEmpty()) {
                throw new IllegalArgumentException("Author is required");
            }
            if (addMessageRequestModal .getContent() == null || addMessageRequestModal.getContent().isEmpty()) {
                throw new IllegalArgumentException("Author is required");
            }


            chatMessageServices.createChat(addMessageRequestModal);

            return new ResponseEntity<>("Chat added successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Invalid input: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to add Chat: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/messages")
    public ResponseEntity<List<ChatMessage>> getAllChats(){
        try {
            List<ChatMessage> chatMessages =chatMessageServices.getallchats();
            return new ResponseEntity<>(chatMessages, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/edit/chats/{id}")
    public ResponseEntity<String> editChats(@PathVariable Long id, @RequestBody AddMessageRequestModal addMessageRequestModal) {
        try {
            if (addMessageRequestModal == null) {
                throw new IllegalArgumentException("Request body cannot be null");
            }
            if (addMessageRequestModal.getSender() == null || addMessageRequestModal.getSender().isEmpty()) {
                throw new IllegalArgumentException("Author is required");
            }
            if (addMessageRequestModal.getContent() == null || addMessageRequestModal.getContent().isEmpty()) {
                throw new IllegalArgumentException("Author is required");
            }


            chatMessageServices.updateChat(id,addMessageRequestModal);

            return new ResponseEntity<>("Article updated successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Invalid input: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to update Admin: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/chats/{id}")
    public ResponseEntity<String> deleteChat(@PathVariable Long id) {
        try {
            chatMessageServices.deleteChatId(id);
            return new ResponseEntity<>("Chat deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to delete article: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
