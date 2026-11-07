package com.srent.dispute; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface DisputeEvidenceRepository extends JpaRepository<DisputeEvidence,UUID>{List<DisputeEvidence> findAllByDisputeId(UUID id);}
