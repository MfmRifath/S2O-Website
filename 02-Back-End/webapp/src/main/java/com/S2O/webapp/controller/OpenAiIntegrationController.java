package com.S2O.webapp.controller;

import com.S2O.webapp.services.OpenAiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class OpenAiIntegrationController {

    @PostMapping("/openai")
    public ResponseEntity<Map<String, String>> processOpenAiResponse(@RequestBody Map<String, String> request) {
        String userInput = request.get("query");
        String openAiResponse = "Received: " + userInput; // Placeholder for debugging
        Map<String, String> response = Map.of("response", openAiResponse);
        return ResponseEntity.ok(response);
    }
}