FROM maven:3.9.11-eclipse-temurin-21 AS build
WORKDIR /workspace
COPY pom.xml .
COPY src ./src
RUN --mount=type=cache,target=/root/.m2 mvn -B -DskipTests package
FROM eclipse-temurin:21-jre-noble
RUN apt-get update && apt-get install -y --no-install-recommends fonts-dejavu-core wget && rm -rf /var/lib/apt/lists/*
WORKDIR /app
RUN groupadd --system srent && useradd --system --gid srent srent
COPY --from=build /workspace/target/*.jar app.jar
USER srent
EXPOSE 3001
ENTRYPOINT ["java","-XX:MaxRAMPercentage=75.0","-jar","/app/app.jar"]
