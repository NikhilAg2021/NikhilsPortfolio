# Stage 1: build the React app
FROM node:22-alpine AS web
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
# vite.config.js writes into ../backend/src/main/resources/static
RUN mkdir -p ../backend/src/main/resources && npm run build

# Stage 2: build the Spring Boot jar (with the React build baked in)
FROM maven:3.9-eclipse-temurin-21 AS api
WORKDIR /app/backend
COPY backend/pom.xml ./
RUN mvn -q dependency:go-offline
COPY backend/src ./src
COPY --from=web /app/backend/src/main/resources/static ./src/main/resources/static
RUN mvn -q -DskipTests package

# Stage 3: run
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=api /app/backend/target/portfolio-1.0.0.jar app.jar
# Mount a persistent volume here so edits and messages survive redeploys
ENV PORTFOLIO_DATA_DIR=/data
VOLUME /data
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
