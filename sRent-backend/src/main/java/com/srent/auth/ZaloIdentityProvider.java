package com.srent.auth;
public interface ZaloIdentityProvider { VerificationResult verify(String accessToken); record VerificationResult(boolean verified,String externalUserId,String reason){} }
