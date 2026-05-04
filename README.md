# node56

A production-ready Node.js web application built with Express and PostgreSQL, deployable to AWS EC2 via GitHub Actions CI/CD.

---

## Purpose

`node56` is a bootstrap web application that provides:
- A structured, scalable Express.js application layout
- PostgreSQL integration via Sequelize ORM
- Health and info endpoints for monitoring
- Multi-stage Docker build for lean production images
- A complete CI/CD pipeline using GitHub Actions targeting AWS EC2

---

## Tech Stack

| Layer      | Technology                   |
|------------|------------------------------|
| Runtime    | Node.js 20 (LTS)             |
| Framework  | Express 4                    |
| ORM        | Sequelize 6                  |
| Database   | PostgreSQL 15                |
| Container  | Docker (multi-stage)         |
| CI/CD      | GitHub Actions               |
| Deployment | AWS EC2                      |

---

## Project Structure

```
node56/
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD pipeline
├── src/
│   ├── controllers/
│   │   └── infoController.js # /api/info handler
│   ├── middleware/
│   │   ├── errorHandler.js   # Global error handler
│   │   └── notFound.js       # 404 handler
│   ├── models/
│   │   └── db.js             # Sequelize/PostgreSQL setup
│   ├── routes/
│   │   ├── api.js            # /api routes
│   │   └── health.js         # /health route
│   ├── utils/
│   │   └── logger.js         # Winston logger
│   ├── app.js                # Express app setup
│   └── server.js             # Server entry point
├── tests/
│   ├── api.test.js           # API endpoint tests
│   └── health.test.js        # Health endpoint tests
├── .env.example              # Environment variable template
├── .eslintrc.js              # ESLint configuration
├── .gitignore
├── docker-compose.yml        # Local Docker Compose setup
├── Dockerfile                # Multi-stage Docker build
├── package.json
└── README.md
```

---

## API Endpoints

### `GET /health`
Returns the application health status.

**Response:**
```json
{
  "status": "ok"
}
```

---

### `GET /api/info`
Returns application metadata and database connection status.

**Response:**
```json
{
  "name": "node56",
  "version": "1.0.0",
  "db": {
    "status": "connected"
  }
}
```

---

## Local Development

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [Docker & Docker Compose](https://docs.docker.com/get-docker/)
- [PostgreSQL 15](https://www.postgresql.org/) (or use Docker Compose)

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/node56.git
cd node56
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your values
```

### 3a. Run with Docker Compose (recommended)

```bash
docker-compose up --build
```

This starts both the app and a PostgreSQL container. The app will be available at [http://localhost:3000](http://localhost:3000).

### 3b. Run Locally (without Docker)

Ensure PostgreSQL is running and your `.env` is configured, then:

```bash
npm install
npm run dev
```

### 4. Verify

```bash
curl http://localhost:3000/health
# {"status":"ok"}

curl http://localhost:3000/api/info
# {"name":"node56","version":"1.0.0","db":{"status":"connected"}}
```

---

## Available Scripts

| Script         | Description                          |
|----------------|--------------------------------------|
| `npm start`    | Start the application (production)   |
| `