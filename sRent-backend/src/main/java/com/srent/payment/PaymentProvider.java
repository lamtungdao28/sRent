package com.srent.payment; import java.math.BigDecimal; import java.util.UUID;
public interface PaymentProvider { Result create(UUID paymentId,BigDecimal amount);Result confirm(String reference);String name();record Result(boolean success,String reference,String message,boolean simulated){} }
