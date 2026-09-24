package dev.nikhil.portfolio.content;

import com.fasterxml.jackson.databind.JsonNode;
import dev.nikhil.portfolio.admin.AdminGuard;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class PortfolioController {

    private final ContentService content;
    private final AdminGuard guard;

    public PortfolioController(ContentService content, AdminGuard guard) {
        this.content = content;
        this.guard = guard;
    }

    @GetMapping("/portfolio")
    public JsonNode get() {
        return content.get();
    }

    @PutMapping("/admin/portfolio")
    public JsonNode update(@RequestHeader(value = AdminGuard.HEADER, required = false) String token,
                           @RequestBody JsonNode body) throws IOException {
        guard.check(token);
        try {
            return content.replace(body);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PostMapping("/admin/login")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void login(@RequestHeader(value = AdminGuard.HEADER, required = false) String token) {
        guard.check(token);
    }
}
