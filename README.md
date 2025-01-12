# LicenseChecker

LicenseChecker is a simple tool for managing and checking license keys. It generates unique keys, keeps track of when they were created, and calculates when they expire based on the type of license. For example, a "monthly" license expires one month after it’s created.

## Features

- Generate unique license keys automatically.
- View license details, including type, creation date, and expiration date.
- Built with HTML, CSS, and JavaScript for the frontend.
- Uses Node.js and SQL for the backend.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/NCD0/LicenseChecker.git
   ```
2. Navigate to the project folder:
   ```bash
   cd LicenseChecker
   ```
3. Install the required packages:
   ```bash
   npm install express cors mysql2
   ```
4. Example adding license types to the database:
   ```sql
   INSERT INTO licenses (license_type) 
   VALUES 
       ('monthly'),
       ('yearly'),
       ('weekly');
   ```
   - Update your database connection settings in `backend.js`.
5. Start the server:
   ```bash
   node backend.js
   ```
6. Open `index.html` in your browser to start using the app.

## Example License Key:
```json
{
 license_key = "123e4567-e89b-12d3-a456-426614174000",
 license_type = "monthly",
 creation_date = "2021-01-01 00:00:00",
 expiry_date = "2021-01-31 00:00:00"
}
```

## License

This project is licensed under the [MIT License](LICENSE).

