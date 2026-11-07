package com.srent.user;
import com.srent.common.ApiException; import com.srent.security.CurrentUser; import jakarta.validation.Valid; import jakarta.validation.constraints.*; import lombok.RequiredArgsConstructor; import org.springframework.transaction.annotation.Transactional; import org.springframework.web.bind.annotation.*; import java.time.*; import java.util.UUID;
@RestController @RequestMapping("/api/v1/users") @RequiredArgsConstructor
public class UserController {
    private final UserRepository users;
    public record UserResponse(UUID id,String email,String fullName,String phone,LocalDate dateOfBirth,String studentId,String hometown,User.Role role,User.Status status,Instant createdAt){static UserResponse from(User u){return new UserResponse(u.getId(),u.getEmail(),u.getFullName(),u.getPhone(),u.getDateOfBirth(),u.getStudentId(),u.getHometown(),u.getRole(),u.getStatus(),u.getCreatedAt());}}
    public record UpdateProfileRequest(@NotBlank @Size(max=150) String fullName,@Size(max=30) String phone,LocalDate dateOfBirth,@Size(max=50) String studentId,@Size(max=255) String hometown){}
    @GetMapping("/me") public UserResponse me(){return UserResponse.from(users.findById(CurrentUser.id()).orElseThrow(()->ApiException.notFound("Người dùng")));}
    @PutMapping("/me") @Transactional public UserResponse update(@Valid @RequestBody UpdateProfileRequest r){var u=users.findById(CurrentUser.id()).orElseThrow();u.setFullName(r.fullName().trim());u.setPhone(r.phone());u.setDateOfBirth(r.dateOfBirth());u.setStudentId(r.studentId());u.setHometown(r.hometown());return UserResponse.from(u);}
}
