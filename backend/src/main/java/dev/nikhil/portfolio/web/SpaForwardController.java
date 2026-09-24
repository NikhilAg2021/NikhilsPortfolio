package dev.nikhil.portfolio.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/** Lets the React app handle client-side routes like /admin when served from the jar. */
@Controller
public class SpaForwardController {

    @GetMapping({"/admin", "/admin/"})
    public String admin() {
        return "forward:/index.html";
    }
}
