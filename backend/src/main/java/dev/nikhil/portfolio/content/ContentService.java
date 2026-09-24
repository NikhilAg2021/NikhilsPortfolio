package dev.nikhil.portfolio.content;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

/**
 * Stores all portfolio content in a single JSON file ({data-dir}/portfolio.json).
 * On first run the file is seeded from classpath:seed/portfolio.json.
 * Content is kept schema-free so new fields can be added from the admin editor
 * without touching Java code.
 */
@Service
public class ContentService {

    private static final Logger log = LoggerFactory.getLogger(ContentService.class);

    private final ObjectMapper mapper;
    private final Path file;
    private final Path backup;
    private volatile JsonNode content;

    public ContentService(ObjectMapper mapper, @Value("${portfolio.data-dir}") String dataDir) {
        this.mapper = mapper;
        this.file = Path.of(dataDir).toAbsolutePath().resolve("portfolio.json");
        this.backup = file.resolveSibling("portfolio.backup.json");
    }

    @PostConstruct
    void load() throws IOException {
        Files.createDirectories(file.getParent());
        if (Files.notExists(file)) {
            try (InputStream seed = new ClassPathResource("seed/portfolio.json").getInputStream()) {
                Files.copy(seed, file);
            }
            log.info("Seeded portfolio content at {}", file);
        }
        content = mapper.readTree(file.toFile());
        log.info("Loaded portfolio content from {}", file);
    }

    public JsonNode get() {
        return content;
    }

    public synchronized JsonNode replace(JsonNode updated) throws IOException {
        if (!(updated instanceof ObjectNode)) {
            throw new IllegalArgumentException("Portfolio content must be a JSON object");
        }
        if (Files.exists(file)) {
            Files.copy(file, backup, StandardCopyOption.REPLACE_EXISTING);
        }
        Path tmp = file.resolveSibling("portfolio.json.tmp");
        mapper.writerWithDefaultPrettyPrinter().writeValue(tmp.toFile(), updated);
        Files.move(tmp, file, StandardCopyOption.REPLACE_EXISTING, StandardCopyOption.ATOMIC_MOVE);
        content = updated;
        return content;
    }
}
