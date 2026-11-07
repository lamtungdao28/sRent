package com.srent;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class SRentApplication {
    public static void main(String[] args) { SpringApplication.run(SRentApplication.class, args); }
}
