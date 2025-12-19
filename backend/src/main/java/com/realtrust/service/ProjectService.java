package com.realtrust.service;

import com.realtrust.model.Project;
import com.realtrust.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private FileStorageService fileStorageService;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Optional<Project> getProjectById(String id) {
        return projectRepository.findById(id);
    }

    public Project createProject(String name, String description, MultipartFile image) throws IOException {
        String imageFilename = fileStorageService.storeFile(image);
        
        Project project = new Project();
        project.setName(name);
        project.setDescription(description);
        project.setImage(imageFilename);
        project.setCreatedAt(LocalDateTime.now());
        project.setUpdatedAt(LocalDateTime.now());
        
        return projectRepository.save(project);
    }

    public Project updateProject(String id, String name, String description, MultipartFile image) throws IOException {
        Optional<Project> optionalProject = projectRepository.findById(id);
        if (optionalProject.isEmpty()) {
            throw new RuntimeException("Project not found");
        }

        Project project = optionalProject.get();
        project.setName(name);
        project.setDescription(description);
        
        if (image != null && !image.isEmpty()) {
            // Delete old image
            fileStorageService.deleteFile(project.getImage());
            // Upload new image
            String imageFilename = fileStorageService.storeFile(image);
            project.setImage(imageFilename);
        }
        
        project.setUpdatedAt(LocalDateTime.now());
        return projectRepository.save(project);
    }

    public void deleteProject(String id) throws IOException {
        Optional<Project> optionalProject = projectRepository.findById(id);
        if (optionalProject.isPresent()) {
            Project project = optionalProject.get();
            fileStorageService.deleteFile(project.getImage());
            projectRepository.deleteById(id);
        }
    }
}
