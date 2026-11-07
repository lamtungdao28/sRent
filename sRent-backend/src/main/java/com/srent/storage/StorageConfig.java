package com.srent.storage;
import com.srent.config.AppProperties; import io.minio.MinioClient; import org.springframework.context.annotation.*;
@Configuration
public class StorageConfig {
    @Bean @Primary MinioClient minio(AppProperties p){var s=p.getStorage();return client(s.getEndpoint(),s);}
    @Bean("minioPresigner") MinioClient minioPresigner(AppProperties p){var s=p.getStorage();return client(s.getPublicEndpoint(),s);}
    private MinioClient client(String endpoint,AppProperties.Storage s){return MinioClient.builder().endpoint(endpoint).credentials(s.getAccessKey(),s.getSecretKey()).region("us-east-1").build();}
}
