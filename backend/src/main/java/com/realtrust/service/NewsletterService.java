package com.realtrust.service;

import com.realtrust.model.Newsletter;
import com.realtrust.repository.NewsletterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NewsletterService {

    @Autowired
    private NewsletterRepository newsletterRepository;

    public List<Newsletter> getAllSubscriptions() {
        return newsletterRepository.findAll();
    }

    public Newsletter subscribe(String email) {
        // Check if email already exists
        if (newsletterRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already subscribed");
        }

        Newsletter newsletter = new Newsletter();
        newsletter.setEmail(email);
        newsletter.setSubscribedAt(LocalDateTime.now());
        
        return newsletterRepository.save(newsletter);
    }

    public void deleteSubscription(String id) {
        newsletterRepository.deleteById(id);
    }
}
