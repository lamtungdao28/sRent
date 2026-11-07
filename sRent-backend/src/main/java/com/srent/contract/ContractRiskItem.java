package com.srent.contract;
import com.srent.common.BaseEntity; import jakarta.persistence.*; import lombok.*;
@Entity @Table(name="contract_risk_items") @Getter @Setter @NoArgsConstructor
public class ContractRiskItem extends BaseEntity { @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="analysis_id",nullable=false) private ContractAnalysis analysis; @Column(nullable=false) private String category; @Column(nullable=false) private String severity; @Column(nullable=false) private String explanation; private String excerpt; @Column(name="suggested_question",nullable=false) private String suggestedQuestion; }
