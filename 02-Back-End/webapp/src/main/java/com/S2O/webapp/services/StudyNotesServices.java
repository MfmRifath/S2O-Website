package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Book;
import com.S2O.webapp.Entity.StudyNotes;
import com.S2O.webapp.dao.BookRepository;
import com.S2O.webapp.dao.StudyNotesRepository;
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
public class StudyNotesServices {
    @Autowired
    private StudyNotesRepository studyNotesRepository;

    public List<StudyNotes> getAllNotes() {
        return studyNotesRepository.findAll();
    }

    public StudyNotes saveNootes(StudyNotes studyNotes, MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            studyNotes.setPdfFile(file.getBytes());
        } else {
            throw new IllegalArgumentException("PDF file is required");
        }
        return studyNotesRepository.save(studyNotes);
    }

    public Optional<StudyNotes> getNotesById(Long id) {
        return studyNotesRepository.findById(id);
    }

    public void deleteNotesById(Long id) {
        studyNotesRepository.deleteById(id);
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
