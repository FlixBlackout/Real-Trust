package com.realtrust.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

@Service
public class FileStorageService {

    /**
     * Store file as Base64 string (for MongoDB storage)
     * This ensures images persist across deployments
     */
    public String storeFile(MultipartFile file) throws IOException {
        // Convert image to Base64
        byte[] fileBytes = file.getBytes();
        String base64Image = Base64.getEncoder().encodeToString(fileBytes);
        
        // Get content type
        String contentType = file.getContentType();
        if (contentType == null) {
            contentType = "image/jpeg";
        }
        
        // Return data URI format
        return "data:" + contentType + ";base64," + base64Image;
    }

    /**
     * Delete file - no-op for Base64 storage
     */
    public void deleteFile(String imageData) {
        // No action needed for Base64 stored images
        // Images are stored directly in MongoDB
    }
}
