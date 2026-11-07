package com.srent.ekyc;
import com.srent.common.BaseEntity; import jakarta.persistence.*; import lombok.*;
@Entity @Table(name="verification_documents") @Getter @Setter @NoArgsConstructor
public class VerificationDocument extends BaseEntity { @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="verification_id",nullable=false) private LandlordVerification verification; @Column(name="document_type",nullable=false) private String documentType; @Column(name="object_key",nullable=false,unique=true) private String objectKey; @Column(name="content_type",nullable=false) private String contentType; }
