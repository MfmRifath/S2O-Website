package com.S2O.webapp.services;

import com.amazonaws.AmazonClientException;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

// Interface for AWS service operations
public interface AwsService {

    // Method to upload a file to an S3 bucket
    String uploadFile(
            final String bucketName,
            final String keyName,
            final Long contentLength,
            final String contentType,
            final InputStream value
    ) throws AmazonClientException;

    // Method to download a file from an S3 bucket
    ByteArrayOutputStream downloadFile(
            final String bucketName,
            final String keyName
    ) throws IOException, AmazonClientException;

    // Method to list files in an S3 bucket
    List<String> listFiles(final String bucketName) throws AmazonClientException;

    // Method to delete a file from an S3 bucket
    void deleteFile(
            final String bucketName,
            final String keyName
    ) throws AmazonClientException;
}
