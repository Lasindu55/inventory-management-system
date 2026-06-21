package com.inventory.controller;

import com.inventory.model.Product;
import com.inventory.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stock")
@CrossOrigin("*")
public class StockController {

    @Autowired
    private StockService stockService;

    // ➕ ADD STOCK
    @PutMapping("/add/{id}/{qty}")
    public Product addStock(
            @PathVariable Long id,
            @PathVariable int qty
    ) {
        return stockService.addStock(id, qty);
    }

    // ➖ REDUCE STOCK
    @PutMapping("/reduce/{id}/{qty}")
    public Product reduceStock(
            @PathVariable Long id,
            @PathVariable int qty
    ) {
        return stockService.reduceStock(id, qty);
    }
}