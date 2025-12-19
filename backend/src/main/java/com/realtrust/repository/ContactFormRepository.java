package com.realtrust.repository;

import com.realtrust.model.ContactForm;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactFormRepository extends MongoRepository<ContactForm, String> {
}
