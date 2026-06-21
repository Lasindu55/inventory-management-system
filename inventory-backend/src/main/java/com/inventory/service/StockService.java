package com.inventory.service;

import com.inventory.model.Product;
import com.inventory.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StockService {

    @Autowired
    private ProductRepository productRepository;

    // ➕ ADD STOCK
    public Product addStock(Long productId, int qty) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setQuantity(product.getQuantity() + qty);

        return productRepository.save(product);
    }

    // ➖ REDUCE STOCK
    public Product reduceStock(Long productId, int qty) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getQuantity() < qty) {
            throw new RuntimeException("Not enough stock");
        }

        product.setQuantity(product.getQuantity() - qty);

        return productRepository.save(product);
    }
}