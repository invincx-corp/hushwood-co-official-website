-- Fix numeric field overflow by specifying precision for total_amount
ALTER TABLE orders 
ALTER COLUMN total_amount TYPE numeric(12, 2);