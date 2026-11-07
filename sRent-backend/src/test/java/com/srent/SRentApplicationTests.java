package com.srent;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = "spring.main.lazy-initialization=true")
class SRentApplicationTests { @Test void contextLoads() {} }
