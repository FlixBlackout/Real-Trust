package com.realtrust.controller;

import com.realtrust.model.ContactForm;
import com.realtrust.service.ContactFormService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactFormController {

    @Autowired
    private ContactFormService contactFormService;

    @GetMapping
    public ResponseEntity<List<ContactForm>> getAllContactForms() {
        List<ContactForm> contactForms = contactFormService.getAllContactForms();
        return ResponseEntity.ok(contactForms);
    }

    @PostMapping
    public ResponseEntity<?> submitContactForm(@Valid @RequestBody ContactForm contactForm) {
        try {
            ContactForm savedForm = contactFormService.saveContactForm(contactForm);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedForm);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error submitting form: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContactForm(@PathVariable String id) {
        contactFormService.deleteContactForm(id);
        return ResponseEntity.ok().body("Contact form deleted successfully");
    }
}
