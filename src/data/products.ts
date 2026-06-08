import { Product } from '../models/product';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Wireless Headphones',
    description:
      'Premium noise-cancelling wireless headphones with crystal clear sound and thirty hours of battery life for all-day listening comfort and focus.',
    price: 149.99,
    stock: 25,
    thumbnail: 'https://picsum.photos/seed/headphones/400/260',
    category: 'electronics',
  },
  {
    id: 2,
    title: 'Smart Watch Pro',
    description:
      'Advanced fitness tracking with heart rate monitor and GPS in a sleek water resistant design tailored for active modern lifestyles.',
    price: 299.99,
    stock: 0,
    thumbnail: 'https://picsum.photos/seed/watch/400/260',
    category: 'electronics',
  },
  {
    id: 3,
    title: 'Ceramic Coffee Mug',
    description:
      'Hand-glazed stoneware mug that keeps coffee hotter for longer with a comfortable handle and minimalist modern kitchen aesthetic.',
    price: 14.5,
    stock: 120,
    thumbnail: 'https://picsum.photos/seed/mug/400/260',
    category: 'home',
  },
  {
    id: 4,
    title: 'Mechanical Keyboard',
    description:
      'Hot-swappable RGB mechanical keyboard with tactile switches, durable aluminum frame and fully programmable keys for serious typists.',
    price: 189.0,
    stock: 8,
    thumbnail: 'https://picsum.photos/seed/keyboard/400/260',
    category: 'electronics',
  },
  {
    id: 5,
    title: 'Leather Backpack',
    description:
      'Full grain leather backpack with padded laptop sleeve, multiple organized compartments and timeless styling built to last decades.',
    price: 219.0,
    stock: 0,
    thumbnail: 'https://picsum.photos/seed/backpack/400/260',
    category: 'fashion',
  },
  {
    id: 6,
    title: 'Stainless Water Bottle',
    description:
      'Double-wall insulated stainless steel water bottle that keeps drinks cold for twenty four hours or hot for twelve.',
    price: 29.99,
    stock: 75,
    thumbnail: 'https://picsum.photos/seed/bottle/400/260',
    category: 'home',
  },
  {
    id: 7,
    title: 'Desk Plant Bundle',
    description:
      'Three low-maintenance indoor plants in matching ceramic pots, perfect for brightening up any home office or workspace corner.',
    price: 45.0,
    stock: 14,
    thumbnail: 'https://picsum.photos/seed/plant/400/260',
    category: 'home',
  },
  {
    id: 8,
    title: 'Bluetooth Speaker',
    description:
      'Portable waterproof bluetooth speaker with deep bass, twelve hour battery and a rugged rubber exterior ready for any adventure.',
    price: 79.99,
    stock: 32,
    thumbnail: 'https://picsum.photos/seed/speaker/400/260',
    category: 'electronics',
  },
];
