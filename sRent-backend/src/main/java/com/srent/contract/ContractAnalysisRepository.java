package com.srent.contract; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface ContractAnalysisRepository extends JpaRepository<ContractAnalysis,UUID>{Optional<ContractAnalysis> findByContractId(UUID id);long countByReviewStatus(ContractAnalysis.ReviewStatus s);}
