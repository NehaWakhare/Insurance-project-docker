package com.crud.serviceimpl;


import com.crud.entity.Claim;
import com.crud.entity.ClaimDocument;
import com.crud.repository.ClaimDocumentRepository;
import com.crud.repository.ClaimRepository;
import com.crud.service.ClaimDocumentService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class ClaimDocumentImpl implements ClaimDocumentService {

    private final ClaimRepository claimRepository;
    private final ClaimDocumentRepository claimDocumentRepository;

    public ClaimDocumentImpl(ClaimRepository claimRepository, ClaimDocumentRepository claimDocumentRepository) {
        this.claimRepository = claimRepository;
        this.claimDocumentRepository = claimDocumentRepository;
    }

    @Override
    public ClaimDocument uploadClaimDocument(Long claimId, MultipartFile file, String documentType) throws IOException {
        Claim claim = claimRepository.findById(claimId)
                .orElseThrow(() -> new RuntimeException("Claim not found"));

        String uploadDir = "uploads/";
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path path = Paths.get(uploadDir + fileName);
        Files.createDirectories(path.getParent());
        Files.write(path, file.getBytes());

        ClaimDocument doc = new ClaimDocument();
        doc.setDocumentName(file.getOriginalFilename());
        doc.setDocumentType(documentType);
        doc.setFilePath(path.toString());
        doc.setUploadedDate(LocalDate.now());
        doc.setClaim(claim);

        return  claimDocumentRepository.save(doc);
    }

    @Override
    public List<ClaimDocument> getClaimDocuments(Long claimId) {
        return claimDocumentRepository.findByClaim_ClaimId(claimId);
    }

}
