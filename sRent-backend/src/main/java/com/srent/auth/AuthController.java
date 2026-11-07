package com.srent.auth;
import org.springframework.security.core.AuthenticationException;
import com.srent.common.ApiException; import com.srent.security.*; import com.srent.user.*; import jakarta.validation.Valid; import jakarta.validation.constraints.*; import lombok.RequiredArgsConstructor; import org.springframework.http.*; import org.springframework.security.authentication.*; import org.springframework.security.crypto.password.PasswordEncoder; import org.springframework.transaction.annotation.Transactional; import org.springframework.web.bind.annotation.*; import java.util.UUID;
@RestController @RequestMapping("/api/v1/auth") @RequiredArgsConstructor
public class AuthController {
    private final UserRepository users; private final PasswordEncoder encoder; private final AuthenticationManager auth; private final JwtService jwt;
    public record RegisterRequest(@Email @NotBlank String email,@Size(min=8,max=72) String password,@NotBlank @Size(max=150) String fullName,@NotNull User.Role role){}
    public record LoginRequest(@Email @NotBlank String email,@NotBlank String password){}
    public record AuthResponse(String accessToken,String tokenType,UUID userId,String email,User.Role role){}
    @PostMapping("/register") @ResponseStatus(HttpStatus.CREATED) @Transactional
    public AuthResponse register(@Valid @RequestBody RegisterRequest r){if(r.role()==User.Role.ADMIN)throw ApiException.forbidden("Không thể tự đăng ký ADMIN");if(users.existsByEmailIgnoreCase(r.email()))throw ApiException.conflict("EMAIL_EXISTS","Email đã được sử dụng");var u=new User();u.setEmail(r.email().trim().toLowerCase());u.setPasswordHash(encoder.encode(r.password()));u.setFullName(r.fullName().trim());u.setRole(r.role());u=users.save(u);var p=UserPrincipal.from(u);return new AuthResponse(jwt.issue(p),"Bearer",u.getId(),u.getEmail(),u.getRole());}
    @PostMapping("/login") public AuthResponse login(@Valid @RequestBody LoginRequest r){try{var a=auth.authenticate(new UsernamePasswordAuthenticationToken(r.email(),r.password()));var p=(UserPrincipal)a.getPrincipal();return new AuthResponse(jwt.issue(p),"Bearer",p.id(),p.email(),p.role());}catch(AuthenticationException e){throw new ApiException(HttpStatus.UNAUTHORIZED,"INVALID_CREDENTIALS","Email hoặc mật khẩu không đúng, hoặc tài khoản đã bị khóa");}}
}
