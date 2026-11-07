package com.srent.security;
import com.srent.user.User; import org.springframework.security.core.*; import org.springframework.security.core.authority.SimpleGrantedAuthority; import org.springframework.security.core.userdetails.UserDetails; import java.util.*;
public record UserPrincipal(UUID id,String email,String password,User.Status status,User.Role role) implements UserDetails {
    public static UserPrincipal from(User u){return new UserPrincipal(u.getId(),u.getEmail(),u.getPasswordHash(),u.getStatus(),u.getRole());}
    public Collection<? extends GrantedAuthority> getAuthorities(){return List.of(new SimpleGrantedAuthority("ROLE_"+role.name()));}
    public String getUsername(){return email;} public String getPassword(){return password;} public boolean isAccountNonLocked(){return status==User.Status.ACTIVE;} public boolean isEnabled(){return status==User.Status.ACTIVE;}
}
