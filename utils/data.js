import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Josh',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Pink Flower',
      slug: 'pink-flower',
      category: 'Colourful Flowers',
      image: '/images/rach-flower-images/pink-flower/pink-flower.jpg',
      price: 10.99,
      rating: 4.8,
      numReviews: 8,
      countInStock: 20,
      description: 'Perfect for every occasion',
    },
    {
      name: 'Sunflower',
      slug: 'sun-flower',
      category: 'Seasonal',
      image: '/images/rach-flower-images/sunflower/sunflower.jpg',
      price: 9.99,
      rating: 4.6,
      numReviews: 8,
      countInStock: 15,
      description: 'Plant me and watch how tall I grow!',
    },
    {
      name: 'Daisy Flower',
      slug: 'daisy-flower',
      category: 'Seasonal',
      image: '/images/rach-flower-images/daisy-flower/daisy-flower.jpg',
      price: 8.99,
      rating: 4.5,
      numReviews: 7,
      countInStock: 16,
      description: 'Make me into a chain!',
    },
    // fix bug
    {
      name: 'Mixed Autumn Flowers',
      slug: 'mixed-autumn-flower',
      category: 'Autumn',
      image: '/images/rach-flower-images/mixed-autum/mixed-autum-flower.jpg',
      price: 8.99,
      rating: 4.5,
      numReviews: 7,
      countInStock: 16,
      description: 'I look great next to a pumpkin!',
    },
    {
      name: 'Autumn Flowers',
      slug: 'autumn-flower',
      category: 'Autumn',
      image: '/images/rach-flower-images/autumn-flower/autumn-flower.jpg',
      price: 7.99,
      rating: 4.6,
      numReviews: 7,
      countInStock: 12,
      description: 'I look great on the porch!',
    },
    {
      name: 'Purple Rose',
      slug: 'purple-rose',
      category: 'Colourful Flowers',
      image: '/images/rach-flower-images/purple-rose/purple-rose.jpg',
      price: 12.99,
      rating: 4.8,
      numReviews: 7,
      countInStock: 20,
      description: 'Perfect gift for your loved one.',
    },
  ],
};

export default data;
