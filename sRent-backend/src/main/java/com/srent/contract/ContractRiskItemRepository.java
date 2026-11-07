package com.srent.contract; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface ContractRiskItemRepository extends JpaRepository<ContractRiskItem,UUID>{List<ContractRiskItem> findAllByAnalysisId(UUID id);void deleteAllByAnalysisId(UUID id);}
