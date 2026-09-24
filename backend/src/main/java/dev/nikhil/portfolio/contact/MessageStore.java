package dev.nikhil.portfolio.contact;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.Instant;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.util.UUID;

/** Contact-form messages, persisted to {data-dir}/messages.json. */
@Component
public class MessageStore {

    public record Message(String id, String name, String email, String message, Instant receivedAt) {
    }

    private static final int MAX_PER_HOUR = 20;

    private final ObjectMapper mapper;
    private final Path file;
    private final List<Message> messages = new ArrayList<>();
    private final Deque<Instant> recent = new ArrayDeque<>();

    public MessageStore(ObjectMapper mapper, @Value("${portfolio.data-dir}") String dataDir) {
        this.mapper = mapper;
        this.file = Path.of(dataDir).toAbsolutePath().resolve("messages.json");
    }

    @PostConstruct
    void load() throws IOException {
        if (Files.exists(file)) {
            messages.addAll(mapper.readValue(file.toFile(), new TypeReference<List<Message>>() {}));
        }
    }

    /** Global cap so a bot can't fill the disk; this is a personal site, not a busy inbox. */
    public synchronized boolean withinRateLimit() {
        Instant cutoff = Instant.now().minusSeconds(3600);
        while (!recent.isEmpty() && recent.peekFirst().isBefore(cutoff)) {
            recent.pollFirst();
        }
        return recent.size() < MAX_PER_HOUR;
    }

    public synchronized void add(String name, String email, String message) throws IOException {
        recent.addLast(Instant.now());
        messages.add(0, new Message(UUID.randomUUID().toString(), name, email, message, Instant.now()));
        save();
    }

    public synchronized List<Message> all() {
        return List.copyOf(messages);
    }

    public synchronized void delete(String id) throws IOException {
        if (messages.removeIf(m -> m.id().equals(id))) {
            save();
        }
    }

    private void save() throws IOException {
        Files.createDirectories(file.getParent());
        Path tmp = file.resolveSibling("messages.json.tmp");
        mapper.writerWithDefaultPrettyPrinter().writeValue(tmp.toFile(), messages);
        Files.move(tmp, file, StandardCopyOption.REPLACE_EXISTING, StandardCopyOption.ATOMIC_MOVE);
    }
}
