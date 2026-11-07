package com.srent.config;

import io.swagger.v3.oas.models.*; import io.swagger.v3.oas.models.info.*; import io.swagger.v3.oas.models.security.*;
import org.springframework.context.annotation.*;

@Configuration
public class OpenApiConfig {
    @Bean OpenAPI api(){ return new OpenAPI().info(new Info().title("S-Rent API").version("v1").description("REST API cho nền tảng thuê phòng sinh viên. Các provider eKYC/thanh toán/phân tích hợp đồng mặc định là MOCK."))
        .addSecurityItem(new SecurityRequirement().addList("bearerAuth")).components(new Components().addSecuritySchemes("bearerAuth",new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT"))); }
}
