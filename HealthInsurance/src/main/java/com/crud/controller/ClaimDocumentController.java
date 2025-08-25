package com.crud.controller;


import com.crud.entity.ClaimDocument;
import com.crud.service.ClaimDocumentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/claims")
public class ClaimDocumentController {

    private final ClaimDocumentService claimDocumentService;

    public ClaimDocumentController(ClaimDocumentService claimDocumentService) {
        this.claimDocumentService = claimDocumentService;
    }

    @PostMapping("/{claimId}/documents")
    public ResponseEntity<ClaimDocument> uploadDocument(
            @PathVariable Long claimId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("documentType") String documentType
    ) throws IOException {
        System.out.println("Upload endpoint hit!");
        System.out.println("Received file: " + file.getOriginalFilename());
        System.out.println("Document type: " + documentType);
        ClaimDocument doc = claimDocumentService.uploadClaimDocument(claimId, file, documentType);
        return ResponseEntity.ok(doc);
    }

    @GetMapping("/{claimId}/documents")
    public ResponseEntity<List<ClaimDocument>> getClaimDocuments(@PathVariable Long claimId) {
        return ResponseEntity.ok(claimDocumentService.getClaimDocuments(claimId));
    }
}
