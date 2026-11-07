package com.srent.chat; import org.springframework.data.domain.*; import org.springframework.data.jpa.repository.JpaRepository; import java.util.UUID;
public interface MessageRepository extends JpaRepository<Message,UUID>{Page<Message> findAllByConversationIdOrderByCreatedAtAsc(UUID id,Pageable p);}
