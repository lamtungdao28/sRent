package com.srent.property;
import com.srent.common.BaseEntity; import com.srent.user.User; import jakarta.persistence.*; import lombok.*; import java.math.BigDecimal;
@Entity @Table(name="properties") @Getter @Setter @NoArgsConstructor
public class Property extends BaseEntity { @ManyToOne(fetch=FetchType.LAZY,optional=false) @JoinColumn(name="owner_id") private User owner; @Column(nullable=false) private String name; private String description; @Column(name="address_line",nullable=false) private String addressLine; private String ward; @Column(nullable=false) private String district; @Column(nullable=false) private String city; @Column(nullable=false,precision=9,scale=6) private BigDecimal latitude; @Column(nullable=false,precision=9,scale=6) private BigDecimal longitude; }
