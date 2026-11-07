package com.srent.security;
import com.srent.user.*; import jakarta.servlet.*; import jakarta.servlet.http.*; import lombok.RequiredArgsConstructor; import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; import org.springframework.security.core.context.SecurityContextHolder; import org.springframework.stereotype.Component; import org.springframework.web.filter.OncePerRequestFilter; import java.io.IOException; import java.util.UUID;
@Component @RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwt; private final UserRepository users;
    protected void doFilterInternal(HttpServletRequest req,HttpServletResponse res,FilterChain chain)throws ServletException,IOException{
        String h=req.getHeader("Authorization");
        if(h!=null&&h.startsWith("Bearer ")&&SecurityContextHolder.getContext().getAuthentication()==null){try{users.findById(UUID.fromString(jwt.subject(h.substring(7)))).filter(u->u.getStatus()==User.Status.ACTIVE).ifPresent(u->{var p=UserPrincipal.from(u);SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(p,null,p.getAuthorities()));});}catch(Exception ignored){}}
        chain.doFilter(req,res);
    }
}
