package com.srent.room;
import com.srent.common.BaseEntity; import com.srent.property.Property; import jakarta.persistence.*; import lombok.*; import java.math.BigDecimal;
@Entity @Table(name="rooms") @Getter @Setter @NoArgsConstructor
public class Room extends BaseEntity { public enum Status{AVAILABLE,RESERVED,RENTED,HIDDEN} public enum ApprovalStatus{DRAFT,PENDING,APPROVED,REJECTED}
    @ManyToOne(fetch=FetchType.LAZY,optional=false) @JoinColumn(name="property_id") private Property property;
    @Column(nullable=false) private String title; private String description; @Column(name="monthly_price",nullable=false) private BigDecimal monthlyPrice; @Column(name="area_sqm",nullable=false) private BigDecimal areaSqm; @Column(nullable=false) private String amenities=""; @Column(name="max_occupants",nullable=false) private int maxOccupants=1;
    @Enumerated(EnumType.STRING) @Column(nullable=false) private Status status=Status.AVAILABLE; @Enumerated(EnumType.STRING) @Column(name="approval_status",nullable=false) private ApprovalStatus approvalStatus=ApprovalStatus.DRAFT; @Column(name="rejection_reason") private String rejectionReason; @Version private long version;
}
