package com.inventory.service;

import com.inventory.model.Product;
import com.inventory.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repo;

    private final String uploadDir = System.getProperty("user.dir") + "/uploads/";

    // =========================
    // CREATE PRODUCT
    // =========================
    public Product addProduct(String name,
                              String description,
                              double price,
                              int quantity,
                              MultipartFile image) {

        Product p = new Product();
        p.setName(name);
        p.setDescription(description);
        p.setPrice(price);
        p.setQuantity(quantity);

        handleImageUpload(image, p);

        return repo.save(p);
    }

    // =========================
    // GET ALL
    // =========================
    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    // =========================
    // UPDATE PRODUCT
    // =========================
    public Product updateProduct(Long id,
                                 String name,
                                 String description,
                                 double price,
                                 int quantity,
                                 MultipartFile image) {

        Product p = repo.findById(id).orElseThrow();

        p.setName(name);
        p.setDescription(description);
        p.setPrice(price);
        p.setQuantity(quantity);

        handleImageUpload(image, p);

        return repo.save(p);
    }

    // =========================
    // DELETE
    // =========================
    public void deleteProduct(Long id) {
        repo.deleteById(id);
    }

    // =========================
    // IMAGE HANDLER (REUSABLE)
    // =========================
    private void handleImageUpload(MultipartFile image, Product p) {

        if (image != null && !image.isEmpty()) {

            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();

            try {
                File dir = new File(uploadDir);
                if (!dir.exists()) {
                    dir.mkdirs();
                }

                image.transferTo(new File(uploadDir + fileName));

                // 🔥 IMPORTANT FIX HERE
                p.setImageUrl("/uploads/" + fileName);

            } catch (IOException e) {
                throw new RuntimeException("Image upload failed");
            }
        }
    }
}