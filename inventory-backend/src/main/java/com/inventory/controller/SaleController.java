package com.inventory.controller;

import com.inventory.model.*;
import com.inventory.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin("*")
public class SaleController {

    @Autowired
    private SaleService service;

    // ➕ CREATE SALE
    @PostMapping
    public Sale createSale(@RequestBody List<SaleItem> items) {
        return service.createSale(items);
    }

    // 📄 GET ALL SALES
    @GetMapping
    public List<Sale> getAll() {
        return service.getAllSales();
    }
}