package com.srent.common;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;
import java.time.Instant;
import java.util.UUID;

@MappedSuperclass @Getter @Setter
public abstract class BaseEntity {
    @Id @UuidGenerator private UUID id;
    @Column(name="created_at", nullable=false, updatable=false) private Instant createdAt;
    @Column(name="updated_at", nullable=false) private Instant updatedAt;
    @PrePersist void create() { var now=Instant.now(); createdAt=now; updatedAt=now; }
    @PreUpdate void update() { updatedAt=Instant.now(); }
}
