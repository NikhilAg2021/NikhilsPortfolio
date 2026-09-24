package dev.nikhil.portfolio.admin;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

/**
 * Minimal single-user protection for write endpoints: the caller must send
 * the configured token in the X-Admin-Token header. Editing is disabled
 * entirely when no token is configured.
 */
@Component
public class AdminGuard {

    public static final String HEADER = "X-Admin-Token";

    private final byte[] token;

    public AdminGuard(@Value("${portfolio.admin-token:}") String token) {
        this.token = token.getBytes(StandardCharsets.UTF_8);
    }

    public void check(String provided) {
        if (token.length == 0) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Editing is disabled: set the PORTFOLIO_ADMIN_TOKEN environment variable");
        }
        byte[] given = provided == null ? new byte[0] : provided.getBytes(StandardCharsets.UTF_8);
        if (!MessageDigest.isEqual(token, given)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid admin token");
        }
    }
}
