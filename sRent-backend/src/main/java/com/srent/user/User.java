package com.srent.user;

import com.srent.common.BaseEntity; import jakarta.persistence.*; import lombok.*;
import java.time.LocalDate;

@Entity @Table(name="users") @Getter @Setter @NoArgsConstructor
public class User extends BaseEntity {
    public enum Role { STUDENT, LANDLORD, ADMIN } public enum Status { ACTIVE, LOCKED }
    @Column(nullable=false,unique=true) private String email;
    @Column(name="password_hash",nullable=false) private String passwordHash;
    @Column(name="full_name",nullable=false) private String fullName;
    private String phone; @Column(name="date_of_birth") private LocalDate dateOfBirth;
    @Column(name="student_id") private String studentId; private String hometown;
    @Enumerated(EnumType.STRING) @Column(nullable=false) private Role role;
    @Enumerated(EnumType.STRING) @Column(nullable=false) private Status status=Status.ACTIVE;
}
