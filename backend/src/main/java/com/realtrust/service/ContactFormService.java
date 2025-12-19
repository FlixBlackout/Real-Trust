package com.realtrust.service;

import com.realtrust.model.ContactForm;
import com.realtrust.repository.ContactFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ContactFormService {

    @Autowired
    private ContactFormRepository contactFormRepository;

    public List<ContactForm> getAllContactForms() {
        return contactFormRepository.findAll();
    }

    public ContactForm saveContactForm(ContactForm contactForm) {
        contactForm.setSubmittedAt(LocalDateTime.now());
        return contactFormRepository.save(contactForm);
    }

    public void deleteContactForm(String id) {
        contactFormRepository.deleteById(id);
    }
}
