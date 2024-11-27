package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Image;
import com.S2O.webapp.dao.ImageRepository;
import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.util.Date;
import java.util.UUID;

@Service
public class ImageService {

    private final AwsService awsService;
    private final AmazonS3 s3Client;
    private final String bucketName = "s2ooluvilimages";
    private final ImageRepository imageRepository;

    @Autowired
    public ImageService(AwsService awsService, AmazonS3 s3Client, ImageRepository imageRepository) {
        this.awsService = awsService;
        this.s3Client = s3Client;
        this.imageRepository = imageRepository;
    }

    public Image saveImage(Image image) {
        return imageRepository.save(image);
    }

    public String uploadImage(MultipartFile file) throws IOException {
        String keyName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        long contentLength = file.getSize();
        String contentType = file.getContentType();

        try (var inputStream = file.getInputStream()) {
            awsService.uploadFile(bucketName, keyName, contentLength, contentType, inputStream);
        } catch (Exception e) {
            throw new IOException("Failed to upload image to S3", e);
        }

        return keyName; // Return key name to store in database as image reference
    }

    // Method to generate a pre-signed URL for viewing images
    public String getPresignedUrl(String keyName) {
        Date expiration = new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24); // 24-hour expiration
        GeneratePresignedUrlRequest generatePresignedUrlRequest = new GeneratePresignedUrlRequest(bucketName, keyName)
                .withMethod(HttpMethod.GET)
                .withExpiration(expiration);

        URL url = s3Client.generatePresignedUrl(generatePresignedUrlRequest);
        return url.toString();
    }
    public void deleteImage(String keyName) {
        try {
            // Delete the image from the S3 bucket
            s3Client.deleteObject(bucketName, keyName);
            System.out.println("Image with key " + keyName + " deleted from S3.");

            // Delete the image record from the database
            Image image = imageRepository.findByKeyName(keyName)
                    .orElseThrow(() -> new RuntimeException("Image not found in the database with key: " + keyName));
            imageRepository.delete(image);
            System.out.println("Image record with key " + keyName + " deleted from the database.");
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete image with key: " + keyName, e);
        }
    }
}
