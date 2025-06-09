# Online Saree Store

A modern e-commerce platform for selling traditional, designer, and festive sarees online.

## Features

- Responsive and modern UI with ethnic design theme
- Product categories with advanced filtering
- Secure user authentication with JWT
- Integrated Razorpay payment gateway
- Multilingual support (English, Hindi, Telugu)
- Comprehensive admin dashboard
- Integrated chatbot for customer support
- Mobile-friendly design

## Tech Stack

- Frontend: HTML5, CSS3, JavaScript
- Backend: PHP
- Database: MySQL
- Authentication: JWT
- Payment: Razorpay
- Hosting: Serverbyt Cloud Hosting

## Prerequisites

- PHP >= 7.4
- MySQL >= 5.7
- Composer
- Node.js >= 14.x
- npm >= 6.x

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/online-saree-store.git
cd online-saree-store
```

2. Install PHP dependencies:
```bash
composer install
```

3. Install frontend dependencies:
```bash
npm install
```

4. Configure environment variables:
```bash
cp .env.example .env
```
Update the `.env` file with your database and Razorpay credentials.

5. Set up the database:
```bash
php artisan migrate
php artisan db:seed
```

6. Start the development server:
```bash
php artisan serve
```

7. Build frontend assets:
```bash
npm run dev
```

## Project Structure

```
online-saree-store/
├── admin/           # Admin dashboard
├── api/            # Backend API
├── assets/         # Static assets
├── config/         # Configuration files
├── database/       # Database migrations and seeds
├── public/         # Public assets
├── src/            # Frontend source code
└── vendor/         # Dependencies
```

## Security

- HTTPS enabled
- Password hashing
- JWT authentication
- Input validation
- SQL injection prevention
- Role-based access control

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 