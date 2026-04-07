import * as dotenv from 'dotenv';
dotenv.config();

import { AppDataSource } from './src/shared/db/pg.data-source';

async function seed() {
    await AppDataSource.initialize();
    console.log('DB Initialized. Seeding data...');
    
    await AppDataSource.query(`
        INSERT INTO "Product" (product_id, title, description, price, rating, stock, brand, category, thumbnail)
        VALUES 
        ('d14e0225-b472-466c-94cd-739cd7bb0c12', 'Essence Mascara Lash Princess', 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve false lash-like results with this affordable and cruelty-free mascara.', 9.99, 4.94, 5, 'Essence', 'beauty', 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png'),
        ('e20b3310-b99b-4cd3-b183-1c3db7cc330f', 'Eyeshadow Palette with Mirror', 'The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, its convenient for on-the-go makeup application.', 19.99, 3.28, 44, 'Glamour Beauty', 'beauty', 'https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png'),
        ('29b55238-d6eb-460d-862d-a2f0739f7bc0', 'Apple iPhone 15 Pro', 'The latest iPhone 15 Pro features a titanium design, A17 Pro chip, customizable Action button, and an even more powerful camera system.', 999.00, 4.8, 12, 'Apple', 'smartphones', 'https://cdn.dummyjson.com/products/images/smartphones/iPhone%2013%20Pro/thumbnail.png')
        ON CONFLICT (product_id) DO NOTHING;
    `);

    console.log('Seed successful!');
    process.exit(0);
}

seed().catch(console.error);
