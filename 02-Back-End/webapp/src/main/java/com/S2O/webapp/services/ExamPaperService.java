package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Book;
import com.S2O.webapp.Entity.ExamPaper;
import com.S2O.webapp.dao.ExamPaperRepository;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ExamPaperService {

    @Autowired
    private ExamPaperRepository examPaperRepository;

    public List<ExamPaper> getAllExamPaper() {
        return examPaperRepository.findAll();
    }

    public ExamPaper saveExamPaper(ExamPaper examPaper, MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            examPaper.setPdfFile(file.getBytes());
        } else {
            throw new IllegalArgumentException("PDF file is required");
        }
        return examPaperRepository.save(examPaper);
    }

    public Optional<ExamPaper> getExamPaperById(Long id) {
        return examPaperRepository.findById(id);
    }

    public void deleteExamPaperById(Long id) {
        examPaperRepository.deleteById(id);
    }

    public byte[] getFirstPageAsImage(byte[] pdfData) throws IOException {
        try (PDDocument document = PDDocument.load(pdfData)) {
            PDFRenderer renderer = new PDFRenderer(document);
            BufferedImage image = renderer.renderImageWithDPI(0, 150, ImageType.RGB); // Render first page
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ImageIO.write(image, "png", outputStream);
            return outputStream.toByteArray();
        }
    }
}
