package com.example.demo.controller;

import com.example.demo.model.Contact;
import com.example.demo.service.ContactService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/contacts")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @Autowired
    private ObjectMapper objectMapper;  // Inject ObjectMapper

    @PostMapping("/submit")
    public ResponseEntity<String> submitContact(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String message) throws Exception {
        // Create a new Contact object using the request parameters
        Contact contact = new Contact(name, email, message);

        // Save the contact
        Contact savedContact = contactService.saveContact(contact);

        // Enable pretty-print for this response
        objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
        String prettyPrintedResponse = objectMapper.writeValueAsString(savedContact);

        // Return the pretty-printed JSON as a ResponseEntity
        return ResponseEntity.ok(prettyPrintedResponse);
    }

    @GetMapping("/all")
    public List<Contact> getAllContacts() {
        return contactService.getAllContacts();
    }
}
