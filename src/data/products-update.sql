-- Script to update all product images at once
UPDATE products SET images = getProductImages('stat-005') WHERE id = 'stat-005';
UPDATE products SET images = getProductImages('gift-001') WHERE id = 'gift-001';
UPDATE products SET images = getProductImages('gift-002') WHERE id = 'gift-002';
UPDATE products SET images = getProductImages('gift-003') WHERE id = 'gift-003';
UPDATE products SET images = getProductImages('gift-004') WHERE id = 'gift-004';
UPDATE products SET images = getProductImages('gift-005') WHERE id = 'gift-005';
UPDATE products SET images = getProductImages('deco-001') WHERE id = 'deco-001';
UPDATE products SET images = getProductImages('deco-002') WHERE id = 'deco-002';
UPDATE products SET images = getProductImages('deco-003') WHERE id = 'deco-003';
UPDATE products SET images = getProductImages('deco-004') WHERE id = 'deco-004';
UPDATE products SET images = getProductImages('deco-005') WHERE id = 'deco-005';
UPDATE products SET images = getProductImages('corp-001') WHERE id = 'corp-001';
UPDATE products SET images = getProductImages('corp-002') WHERE id = 'corp-002';
UPDATE products SET images = getProductImages('corp-003') WHERE id = 'corp-003';
UPDATE products SET images = getProductImages('corp-004') WHERE id = 'corp-004';
UPDATE products SET images = getProductImages('corp-005') WHERE id = 'corp-005';