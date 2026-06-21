package com.inventory.service;

import com.inventory.model.*;
import com.inventory.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaleService {

    @Autowired
    private SaleRepository saleRepo;

    @Autowired
    private ProductRepository productRepo;

    public Sale createSale(List<SaleItem> items) {

        double total = 0;

        // 🔥 reduce stock + calculate total
        for (SaleItem item : items) {

            Product p = productRepo.findById(item.getProductId())
                    .orElseThrow();

            if (p.getQuantity() < item.getQuantity()) {
                throw new RuntimeException("Not enough stock for " + p.getName());
            }

            // reduce stock
            p.setQuantity(p.getQuantity() - item.getQuantity());
            productRepo.save(p);

            // calculate price
            item.setProductName(p.getName());
            item.setPrice(p.getPrice() * item.getQuantity());

            total += item.getPrice();
        }

        Sale sale = new Sale();
        sale.setItems(items);
        sale.setTotal(total);

        return saleRepo.save(sale);
    }

    public List<Sale> getAllSales() {
        return saleRepo.findAll();
    }
}