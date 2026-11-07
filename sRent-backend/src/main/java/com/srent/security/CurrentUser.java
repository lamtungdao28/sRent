package com.srent.security;
import com.srent.common.ApiException; import org.springframework.http.HttpStatus; import org.springframework.security.core.context.SecurityContextHolder; import java.util.UUID;
public final class CurrentUser { private CurrentUser(){} public static UserPrincipal principal(){var a=SecurityContextHolder.getContext().getAuthentication();if(a==null||!(a.getPrincipal() instanceof UserPrincipal p))throw new ApiException(HttpStatus.UNAUTHORIZED,"UNAUTHORIZED","Cần đăng nhập");return p;} public static UUID id(){return principal().id();} }
