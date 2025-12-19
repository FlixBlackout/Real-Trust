package com.realtrust.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "clients")
public class Client {
    
    @Id
    private String id;
    
    @NotBlank(message = "Client name is required")
    private String name;
    
    @NotBlank(message = "Client description is required")
    private String description;
    
    @NotBlank(message = "Client designation is required")
    private String designation;
    
    @NotBlank(message = "Client image is required")
    private String image;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}
