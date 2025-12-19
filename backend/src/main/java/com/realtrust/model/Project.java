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
@Document(collection = "projects")
public class Project {
    
    @Id
    private String id;
    
    @NotBlank(message = "Project name is required")
    private String name;
    
    @NotBlank(message = "Project description is required")
    private String description;
    
    @NotBlank(message = "Project image is required")
    private String image;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}
