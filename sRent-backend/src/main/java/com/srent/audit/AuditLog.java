package com.srent.audit;
import jakarta.persistence.*; import lombok.*; import org.hibernate.annotations.UuidGenerator; import java.time.Instant; import java.util.UUID;
@Entity @Table(name="audit_logs") @Getter @Setter @NoArgsConstructor
public class AuditLog { @Id @UuidGenerator private UUID id; @Column(name="actor_id") private UUID actorId; @Column(nullable=false) private String action; @Column(name="resource_type",nullable=false) private String resourceType; @Column(name="resource_id") private UUID resourceId; private String details; @Column(name="ip_address") private String ipAddress; @Column(name="created_at",nullable=false) private Instant createdAt; @PrePersist void pre(){createdAt=Instant.now();} }
