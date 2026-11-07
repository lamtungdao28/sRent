package com.srent.ekyc; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface VerificationDocumentRepository extends JpaRepository<VerificationDocument,UUID>{List<VerificationDocument> findAllByVerificationId(UUID id);}
