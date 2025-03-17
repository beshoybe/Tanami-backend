# Tanami Backend

## Overview

Tanami Backend is a scalable and secure backend system built with **Node.js**, **Express**, and **TypeScript**. It follows a **modular architecture** with **dependency injection (DI)** using `tsyringe` and supports **multi-language localization**.

## Features

- 🛡 **Strong Authentication System**

  - JWT-based authentication
  - Password hashing with `bcryptjs`
  - Secure email verification and password reset with `nodemailer`

- 🌍 **Multi-Language Support**

  - Localization with `i18next`
  - Uses `i18next-fs-backend` for file-based translations
  - Middleware for handling language selection

- 🏦 **Financial Transactions & Investments**

  - Multi-currency support (USD, EUR, GBP)
  - ROI calculation

- 🗃 **Modular Architecture**

  - Service-Repository-Controller pattern
  - Uses `sequelize` as the ORM
  - Dependency Injection with `tsyringe`

- ✅ **Data Validation & Security**
  - DTO-based validation using `class-validator`
  - Secure request sanitization
  - Soft delete implementation for safe data removal

## Tech Stack

- **Node.js** + **Express.js**
- **TypeScript**
- **Sequelize ORM** (supports MySQL and SQLite for testing)
- **JWT Authentication**
- **Dependency Injection** (`tsyringe`)
- **i18next** for multi-language support

## Installation & Setup

### 1. Clone the repository:

```sh
git clone https://github.com/yourusername/tanami-backend.git
cd tanami-backend
```

### 2. Install dependencies:

```sh
npm install
```

### 3. Set up environment variables:

Create a `.env` file in the root directory:

```
PORT=5000
DB_NAME=tanami_investment
DB_USER=tanami
DB_PASSWORD=tanamipassword
DB_HOST=localhost
JWT_SECRET=t1NP63m4wnBg6nyHYKfmc2TpCOGI4nss
EMAIL_USERNAME=tyardhub@gmail.com
EMAIL_PASSWORD=cfyvexixudwksfjy
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
```

### 4. Run migrations:

```sh
npx sequelize-cli db:migrate
```

### 5. Start the development server:

```sh
npm run dev
```

## API Documentation

API documentation will be available via https://www.postman.com/lunar-station-37576/workspace/tanami-backend
