package com.srent.media; import org.junit.jupiter.api.Test; import static org.assertj.core.api.Assertions.*;
class GeoDistanceTest { @Test void calculatesMeters(){double d=GeoDistance.haversineMeters(21.028511,105.804817,21.028700,105.804817);assertThat(d).isBetween(20d,22d);} }
