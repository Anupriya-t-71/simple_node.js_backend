# 🚀 Microservices Test Project: Node.js & MongoDB (Auth and Products)

This repository hosts a straightforward, two-service microservices architecture built using **Node.js (Express)** and **MongoDB (Mongoose)**. It serves as an excellent starting point for developers looking to understand and implement service-to-service communication, independent deployment, and JWT-based authentication in a distributed environment.

**Project maintained by:** **dmmuralitharan**

-----

## 🎯 Project Goal: Learning Microservices

The primary purpose of this repository is to demonstrate a **scalable microservices architecture** pattern.

  * **Structure:** Shows how to break a monolithic application into small, independent services.
  * **Decoupling:** Illustrates that each service (Auth and Products) owns its own database.
  * **Security:** Demonstrates secure service-to-service communication using **JSON Web Tokens (JWT)** for authentication and authorization.

-----

## 🛠️ Technology Stack

| Category | Tool / Library | Purpose |
| :--- | :--- | :--- |
| **Backend Runtime** | Node.js | JavaScript runtime environment. |
| **Web Framework** | Express | Fast, unopinionated web framework for Node.js. |
| **Database** | MongoDB | NoSQL document database. |
| **ORM** | Mongoose | Elegant MongoDB object modeling for Node.js. |
| **Security** | JSON Web Tokens (JWT) | Stateless authentication mechanism. |
| **Middleware** | `helmet`, `cors` | Essential security and cross-origin handling. |

-----

## 📂 Repository Structure

The project is divided into two independently deployable microservices:

```
simple-node-express-microservices/
├── auth-service/           # Handles user registration and login, issues JWTs.
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
└── product-service/        # Manages the product catalog, validates JWTs.
    ├── config/
    ├── controllers/
    ├── middleware/         # Contains the crucial JWT validation middleware.
    ├── models/
    ├── routes/
    └── server.js
```

-----

## 🔌 Installation and Setup Instructions

Follow these steps to get both microservices running locally.

### Prerequisites

1.  **Node.js** (v18 or higher recommended)
2.  **MongoDB** (running locally or accessible via a cloud URI)

### Step 1: Clone the Repository

```bash
git clone [YOUR_REPO_URL]
cd simple-node-express-microservices
```

### Step 2: Configure Environment Variables

Create a **`.env`** file inside *both* the `auth-service/` and `product-service/` directories.

**Crucially, the `JWT_SECRET` must be identical in both files.**

#### `auth-service/.env`

```env
PORT=3001
MONGO_URI=mongodb://127.0.0.1:27017/YOUR_DB_NAME_HERE
JWT_SECRET=YOUR_SECRET_KEY_HERE
JWT_EXPIRY=1h
```

#### `product-service/.env`

```env
PORT=3002
MONGO_URI=mongodb://127.0.0.1:27017/YOUR_DB_NAME_HERE
JWT_SECRET=YOUR_SECRET_KEY_HERE
```

### Step 3: Install Dependencies and Run Services

You must start each service in a separate terminal window.

#### A. Run the Auth Service

```bash
cd auth-service
npm install
npm start
```

(Should run on `http://localhost:3001`)

#### B. Run the Product Service

```bash
cd product-service
npm install
npm start
```

(Should run on `http://localhost:3002`)

-----

## 🧪 Testing the Microservices (Postman Workflow)

Follow these steps using a tool like Postman to verify the JWT authentication flow.

1.  **Register/Login:**

      * **Method:** `POST`
      * **URL:** `http://localhost:3001/api/auth/login`
      * **Action:** Copy the resulting **JWT** from the response body.

2.  **Access Protected Route (Create Product):**

      * **Method:** `POST`
      * **URL:** `http://localhost:3002/api/products`
      * **Authorization:** Set the header `Authorization` to `Bearer <YOUR_JWT_TOKEN>`.
      * **Action:** If the token is valid, the product will be created (`201 Created`). If the token is invalid, you will receive a `401 Unauthorized` or `403 Forbidden` from the **Product Service**, demonstrating the independent security validation.

-----

## 📈 Next Steps and Expansion

This architecture is designed for easy scaling and expansion. Future services can be added simply by creating a new folder and configuring its environment variables.

### Potential Future Services:

  * **Order Service:** Handles the shopping cart and order processing logic.
  * **Payment Service:** Integrates with third-party payment gateways.
  * **Inventory Service:** Tracks stock levels and handles reservations.
  * **API Gateway:** A single entry point (e.g., using Express or a tool like Kong) to manage routing and initial authentication for all services.

Feel free to contribute or suggest improvements\! You can reach me via my GitHub profile: **dmmuralitharan**.

---