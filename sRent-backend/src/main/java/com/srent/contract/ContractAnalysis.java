package com.srent.contract;
import com.srent.common.BaseEntity; import jakarta.persistence.*; import lombok.*;
@Entity @Table(name="contract_analyses") @Getter @Setter @NoArgsConstructor
public class ContractAnalysis extends BaseEntity { public enum ReviewStatus{PENDING,PUBLISHED,REJECTED} @OneToOne(fetch=FetchType.LAZY) @JoinColumn(name="contract_id",nullable=false,unique=true) private Contract contract; @Column(nullable=false) private String provider; @Column(nullable=false) private boolean simulated; @Column(nullable=false) private String disclaimer; @Enumerated(EnumType.STRING) @Column(name="review_status",nullable=false) private ReviewStatus reviewStatus=ReviewStatus.PENDING; @Column(name="admin_note") private String adminNote; }
