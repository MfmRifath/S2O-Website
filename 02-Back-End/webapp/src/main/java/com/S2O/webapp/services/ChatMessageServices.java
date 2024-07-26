package com.S2O.webapp.services;

import com.S2O.webapp.Entity.ChatMessage;
import com.S2O.webapp.RequesModal.AddMessageRequestModal;
import com.S2O.webapp.dao.ChatRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatMessageServices {
    private ChatRepository chatReposit;

    public ChatMessageServices(ChatRepository chatRepository){
        this.chatRepository=chatRepository;
    }
    public List<ChatMessage> getallchats(){
        return chatRepository.findAll();
    }

    public void createChat(AddMessageRequestModal addMessageRequestModal){

        ChatMessage chatMessage =new ChatMessage();

        chatMessage.setId(addMessageRequestModal.getId());
        chatMessage.setSender(addMessageRequestModal.getSender());
        chatMessage.setReciver(addMessageRequestModal.getReciver());
        chatMessage.setContent(addMessageRequestModal.getContent());

        chatRepository.save(chatMessage);

    }

    public ChatMessage updateChat(Long id, AddMessageRequestModal addMessageRequestModal){
        if(chatRepository.existsById(id)){
            ChatMessage chatMessage= chatRepository.findById(id).orElseThrow(()-> new RuntimeException("Message is not found with Id"+id));

            chatMessage.setId(addMessageRequestModal.getId());
            chatMessage.setSender(addMessageRequestModal.getSender());
            chatMessage.setReciver(addMessageRequestModal.getReciver());
            chatMessage.setContent(addMessageRequestModal.getContent());

            return chatRepository.save(chatMessage);
        }
        else {
            throw new RuntimeException("Article is not Found in this Id " + id);
        }
    }

    public void deleteChatId(Long id){
        if(chatRepository.existsById(id)){
            chatRepository.deleteById(id);
        }
        else {
            throw new RuntimeException("Chat is not found for this Id"+id);
        }
    }

}
