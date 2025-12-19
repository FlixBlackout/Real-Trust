package com.realtrust.repository;

import com.realtrust.model.Newsletter;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NewsletterRepository extends MongoRepository<Newsletter, String> {
    Optional<Newsletter> findByEmail(String email);
    boolean existsByEmail(String email);
}
