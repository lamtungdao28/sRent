package com.srent.security;
import com.srent.config.AppProperties; import io.jsonwebtoken.*; import io.jsonwebtoken.security.Keys; import org.springframework.stereotype.Service; import javax.crypto.SecretKey; import java.nio.charset.StandardCharsets; import java.time.Instant; import java.util.Date;
@Service
public class JwtService {
    private final AppProperties p; private final SecretKey key;
    public JwtService(AppProperties p){this.p=p; this.key=Keys.hmacShaKeyFor(p.getJwt().getSecret().getBytes(StandardCharsets.UTF_8));}
    public String issue(UserPrincipal u){Instant now=Instant.now(); return Jwts.builder().subject(u.id().toString()).claim("email",u.email()).claim("role",u.role().name()).issuedAt(Date.from(now)).expiration(Date.from(now.plus(p.getJwt().getExpiration()))).signWith(key).compact();}
    public String subject(String token){return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload().getSubject();}
}
