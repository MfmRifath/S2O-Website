package com.S2O.webapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.util.unit.DataSize;

import javax.servlet.MultipartConfigElement;

@Configuration
public class FileUploadConfig {

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        // Set the maximum file size
        factory.setMaxFileSize(DataSize.ofMegabytes(100)); // 10 MB
        // Set the maximum request size
        factory.setMaxRequestSize(DataSize.ofMegabytes(100)); // 10 MB
        return factory.createMultipartConfig();
    }
}
