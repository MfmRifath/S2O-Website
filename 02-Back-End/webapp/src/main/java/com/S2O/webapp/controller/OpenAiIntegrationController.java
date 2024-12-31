package com.S2O.webapp.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api")
public class OpenAiIntegrationController {

    // URL of your Flask server exposed via ngrok or localhost
    private final String AI_URL = "http://localhost:5001/process-prompt";

    @PostMapping("/openai")
    public ResponseEntity<Map<String, String>> processOpenAiResponse(@RequestBody Map<String, String> request) {
        // Retrieve the prompt from the request
        String userInput = request.get("query");

        // Ensure that the input is valid
        if (userInput == null || userInput.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Query parameter is missing or empty"));
        }

        // Send the prompt to Flask (Colab)
        String openAiResponse = sendPromptToColab(userInput);

        // Prepare the response to send back to the frontend
        if (openAiResponse == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Error occurred while contacting Flask server"));
        }

        return ResponseEntity.ok(Map.of("response", openAiResponse));
    }

    private String sendPromptToColab(String prompt) {
        try {
            // Use RestTemplate to send the request to Flask
            RestTemplate restTemplate = new RestTemplate();

            // Create a JSON payload in the form of a Map
            Map<String, String> requestPayload = Map.of("query", prompt);

            // Create an HttpEntity with headers
            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestPayload, headers);

            // Log request details
            System.out.println("Sending request to Flask: " + requestPayload);

            // Send POST request to Flask and get the response
            ResponseEntity<String> response = restTemplate.exchange(AI_URL, HttpMethod.POST, entity, String.class);

            // Log response details
            System.out.println("Received response from Flask: " + response.getBody());

            if (response.getBody() == null) {
                return "No response from Flask server";
            }

            return response.getBody();  // Return the response received from Flask (OpenAI response)
        } catch (Exception e) {
            e.printStackTrace();
            return "Error occurred while contacting Flask server";
        }
    }
}