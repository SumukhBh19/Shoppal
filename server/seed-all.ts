import { AppDataSource } from './src/shared/db/pg.data-source';
import { Product } from './src/shared/models/entities';

async function seed() {
    try {
        await AppDataSource.initialize();
        console.log('Database connected.');

        // Truncate products and cascade to related tables (Cart, Order details etc)
        await AppDataSource.query('TRUNCATE TABLE "Product" CASCADE');
        console.log('Cleared existing products.');

        // Fetch dummy products from external API
        console.log('Fetching products from dummyjson.com...');
        // Limit 200 ensures we grab plenty of products across many categories
        const res = await fetch('https://dummyjson.com/products?limit=150');
        const data = await res.json();
        const dummyProducts = data.products;

        const productRepo = AppDataSource.getRepository(Product);
        const productsToSave: Product[] = [];

        // Loop through and map external dummyjson products to our Product entity shape
        for (const dp of dummyProducts) {
            const newProduct = new Product();
            newProduct.title = dp.title;
            newProduct.description = dp.description;
            // Dummy JSON categories align mostly with our enum. If not, fallback to 'smartphones'
            newProduct.category = (dp.category as any) || 'smartphones'; 
            
            // Convert foreign dummy currency to INR (multiplier 80 roughly)
            newProduct.price = dp.price * 80;
            
            newProduct.rating = dp.rating;
            newProduct.stock = dp.stock;
            newProduct.images = dp.images;
            newProduct.thumbnail = dp.thumbnail;
            newProduct.brand = dp.brand || 'Generic';
            newProduct.return_policy = dp.returnPolicy;
            newProduct.shipping_info = dp.shippingInformation;
            newProduct.warranty_info = dp.warrantyInformation;

            if (dp.dimensions) {
                newProduct.dimension = {
                    width: dp.dimensions.width,
                    height: dp.dimensions.height,
                    depth: dp.dimensions.depth,
                    weight: dp.weight || null
                };
            }

            productsToSave.push(newProduct);
        }

        // Save in batches or all at once
        await productRepo.save(productsToSave);
        console.log(`Successfully seeded ${productsToSave.length} products!`);

    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    }
}

seed();
