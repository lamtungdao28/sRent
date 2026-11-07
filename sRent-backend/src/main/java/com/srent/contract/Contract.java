package com.srent.contract;
import com.srent.booking.Booking; import com.srent.common.BaseEntity; import jakarta.persistence.*; import lombok.*;
@Entity @Table(name="contracts") @Getter @Setter @NoArgsConstructor
public class Contract extends BaseEntity { public enum Status{DRAFT,UPLOADED,ANALYZED,PUBLISHED,REJECTED} @OneToOne(fetch=FetchType.LAZY) @JoinColumn(name="booking_id",nullable=false,unique=true) private Booking booking; @Column(nullable=false) private String title; @Column(name="object_key") private String objectKey; @Column(name="content_type") private String contentType; @Enumerated(EnumType.STRING) @Column(nullable=false) private Status status=Status.DRAFT; }
