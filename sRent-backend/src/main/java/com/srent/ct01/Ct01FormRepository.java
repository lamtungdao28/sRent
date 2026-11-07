package com.srent.ct01; import org.springframework.data.domain.*; import org.springframework.data.jpa.repository.JpaRepository; import java.util.UUID;
public interface Ct01FormRepository extends JpaRepository<Ct01Form,UUID>{Page<Ct01Form> findAllByStudentId(UUID id,Pageable p);}
