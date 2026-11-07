package com.srent.config;

import lombok.Getter; import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import java.time.Duration;

@Getter @Setter @ConfigurationProperties("app")
public class AppProperties {
    private String corsAllowedOrigins="http://localhost:5173"; private boolean seedEnabled; private String ct01FontPath;
    private Jwt jwt=new Jwt(); private Storage storage=new Storage(); private Media media=new Media(); private Providers providers=new Providers();
    @Getter @Setter public static class Jwt { private String secret; private Duration expiration=Duration.ofHours(8); }
    @Getter @Setter public static class Storage { private String endpoint,publicEndpoint,accessKey,secretKey,publicBucket,privateBucket; private Duration presignExpiry=Duration.ofMinutes(15); private boolean initialize=true; }
    @Getter @Setter public static class Media { private double gpsRadiusMeters=50,maxGpsAccuracyMeters=30; private Duration maxLocationAge=Duration.ofMinutes(5); private long maxVideoSizeBytes=104857600; }
    @Getter @Setter public static class Providers { private String ekycMode="mock",contractMode="mock",ekycEndpoint,ekycApiKey,contractEndpoint,contractApiKey; }
}
