package com.srent.user;
import org.springframework.data.domain.*; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface UserRepository extends JpaRepository<User,UUID> { Optional<User> findByEmailIgnoreCase(String email); boolean existsByEmailIgnoreCase(String email); Page<User> findAllByRole(User.Role role, Pageable pageable); long countByRole(User.Role role); }
