# 🛒 Express.js Product API

A simple RESTful API built with Express.js using dummy JSON data. It supports CRUD operations, search, and statistics.

---

## 🚀 Getting Started

### 🔧 Prerequisites
- Node.js (v14+)
- npm

### 📦 Install Dependencies

```bash
npm install
```

### 🔧 Run the server
```bash
npm run dev
```
The server will be available at `http://localhost:3000`.

## API Documentation
### 📝 Endpoints
1. **GET /api/products**: Retrieves a list of all products.
2. **GET /api/products/:id**: Retrieves a product by its ID.
  - Example: /api/products/2
    {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  }
3. **GET /api/products/search?name=Smartphone**: Searches for products by name.
  - Example: /api/products/search?name=Smartphone
  {
    "total": 1,
    "results": [
      {
        id: '2',
        name: 'Smartphone',
        description: 'Latest model with 128GB storage',
        price: 800,
        category: 'electronics',
        inStock: true
      }
    ]
  }
4. **POST /api/products**: Creates a new product.
5. **PUT /api/products/:id**: Updates an existing product.
 - Example: /api/products/2
 {
  "name": "Tecno Smartphone",
  "price": 600
 }
 - Response:
  {
  "message": "Product updated successfully",
  "product": {
    "id": "2",
    "name": "Tecno Smartphone",
    "description": "Latest model with 128GB storage",
    "price": 600,
    "category": "electronics",
    "inStock": true
  }
}
6. **DELETE /api/products/:id**: deletes a product based on its id
7. **GET /api/products/stats**: Retrieves product statistics.
