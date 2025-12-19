package com.realtrust.controller;

import com.realtrust.model.Newsletter;
import com.realtrust.service.NewsletterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/newsletter")
@CrossOrigin(origins = "*")
public class NewsletterController {

    @Autowired
    private NewsletterService newsletterService;

    @GetMapping
    public ResponseEntity<List<Newsletter>> getAllSubscriptions() {
        List<Newsletter> subscriptions = newsletterService.getAllSubscriptions();
        return ResponseEntity.ok(subscriptions);
    }

    @PostMapping("/subscribe")
    public ResponseEntity<?> subscribe(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            if (email == null || email.isEmpty()) {
                return ResponseEntity.badRequest().body("Email is required");
            }
            Newsletter newsletter = newsletterService.subscribe(email);
            return ResponseEntity.status(HttpStatus.CREATED).body(newsletter);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error subscribing: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSubscription(@PathVariable String id) {
        newsletterService.deleteSubscription(id);
        return ResponseEntity.ok().body("Subscription deleted successfully");
    }
}
