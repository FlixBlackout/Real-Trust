package com.realtrust.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "newsletter_subscriptions")
public class Newsletter {
    
    @Id
    private String id;
    
    @NotBlank(message = "Email address is required")
    @Email(message = "Invalid email address")
    private String email;
    
    private LocalDateTime subscribedAt;
}
