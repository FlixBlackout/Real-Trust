package com.realtrust.service;

import com.realtrust.model.Client;
import com.realtrust.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private FileStorageService fileStorageService;

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Optional<Client> getClientById(String id) {
        return clientRepository.findById(id);
    }

    public Client createClient(String name, String description, String designation, MultipartFile image) throws IOException {
        String imageFilename = fileStorageService.storeFile(image);
        
        Client client = new Client();
        client.setName(name);
        client.setDescription(description);
        client.setDesignation(designation);
        client.setImage(imageFilename);
        client.setCreatedAt(LocalDateTime.now());
        client.setUpdatedAt(LocalDateTime.now());
        
        return clientRepository.save(client);
    }

    public Client updateClient(String id, String name, String description, String designation, MultipartFile image) throws IOException {
        Optional<Client> optionalClient = clientRepository.findById(id);
        if (optionalClient.isEmpty()) {
            throw new RuntimeException("Client not found");
        }

        Client client = optionalClient.get();
        client.setName(name);
        client.setDescription(description);
        client.setDesignation(designation);
        
        if (image != null && !image.isEmpty()) {
            // Delete old image
            fileStorageService.deleteFile(client.getImage());
            // Upload new image
            String imageFilename = fileStorageService.storeFile(image);
            client.setImage(imageFilename);
        }
        
        client.setUpdatedAt(LocalDateTime.now());
        return clientRepository.save(client);
    }

    public void deleteClient(String id) throws IOException {
        Optional<Client> optionalClient = clientRepository.findById(id);
        if (optionalClient.isPresent()) {
            Client client = optionalClient.get();
            fileStorageService.deleteFile(client.getImage());
            clientRepository.deleteById(id);
        }
    }
}
