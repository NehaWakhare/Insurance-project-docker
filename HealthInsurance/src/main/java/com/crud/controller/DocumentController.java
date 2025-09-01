package com.crud.controller;

import com.crud.entity.Document;
import com.crud.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    // ----------------- Upload Document -----------------
    @PostMapping("/upload")
    public ResponseEntity<?> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") Long userId,
            @RequestParam("documentName") String documentName
    ) {
        try {
            Document saved = documentService.storeFile(file, userId, documentName);
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to upload document: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ----------------- Get All Documents -----------------
    @GetMapping
    public ResponseEntity<List<Document>> getAllDocuments() {
        List<Document> documents = documentService.getAllDocuments();
        return ResponseEntity.ok(documents);
    }

    // ----------------- Get Document By Id -----------------
    @GetMapping("/{id}")
    public ResponseEntity<?> getDocumentById(@PathVariable Long id) {
        try {
            Document document = documentService.getDocumentById(id);
            return ResponseEntity.ok(document);
        } catch (Exception e) {
            return new ResponseEntity<>("Document not found", HttpStatus.NOT_FOUND);
        }
    }

    // ----------------- Update Document -----------------
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDocument(
            @PathVariable Long id,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "documentName", required = false) String documentName
    ) {
        try {
            Document updated = documentService.updateDocument(id, file, documentName);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update document: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ----------------- Delete Document -----------------
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDocument(@PathVariable Long id) {
        try {
            documentService.deleteDocument(id);
            return ResponseEntity.ok("Document deleted successfully");
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete document: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
