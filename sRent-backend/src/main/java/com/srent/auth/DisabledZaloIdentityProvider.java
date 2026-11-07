package com.srent.auth;
import org.springframework.stereotype.Component;
@Component
public class DisabledZaloIdentityProvider implements ZaloIdentityProvider { public VerificationResult verify(String token){return new VerificationResult(false,null,"Zalo Identity chưa được cấu hình; token không được coi là đã xác minh");} }
