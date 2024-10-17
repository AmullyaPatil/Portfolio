package com.example.demo; // Make sure this matches your package structure

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/v1/contacts/**")  // Allow requests to your contact API
                .allowedOrigins("*")                // Change "*" to a specific origin if needed
                .allowedMethods("GET", "POST");     // Specify allowed methods
    }
}
