package com.srent.contract; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface ContractRepository extends JpaRepository<Contract,UUID>{boolean existsByBookingId(UUID id);}
