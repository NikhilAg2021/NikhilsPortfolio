package dev.nikhil.portfolio.contact;

import dev.nikhil.portfolio.admin.AdminGuard;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ContactController {

    public record ContactRequest(
            @NotBlank @Size(max = 100) String name,
            @NotBlank @Email @Size(max = 200) String email,
            @NotBlank @Size(max = 5000) String message,
            // Honeypot: hidden in the form, so only bots fill it in.
            String website) {
    }

    private final MessageStore store;
    private final AdminGuard guard;

    public ContactController(MessageStore store, AdminGuard guard) {
        this.store = store;
        this.guard = guard;
    }

    @PostMapping("/contact")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void contact(@Valid @RequestBody ContactRequest req) throws IOException {
        if (req.website() != null && !req.website().isBlank()) {
            return;
        }
        if (!store.withinRateLimit()) {
            throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS, "Too many messages, try again later");
        }
        store.add(req.name().trim(), req.email().trim(), req.message().trim());
    }

    @GetMapping("/admin/messages")
    public List<MessageStore.Message> messages(
            @RequestHeader(value = AdminGuard.HEADER, required = false) String token) {
        guard.check(token);
        return store.all();
    }

    @DeleteMapping("/admin/messages/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@RequestHeader(value = AdminGuard.HEADER, required = false) String token,
                       @PathVariable String id) throws IOException {
        guard.check(token);
        store.delete(id);
    }
}
