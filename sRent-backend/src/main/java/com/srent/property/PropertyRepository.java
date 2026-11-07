package com.srent.property; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface PropertyRepository extends JpaRepository<Property,UUID>{ List<Property> findAllByOwnerIdOrderByCreatedAtDesc(UUID ownerId); long countByOwnerId(UUID ownerId); }
