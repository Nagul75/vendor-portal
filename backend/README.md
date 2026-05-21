# SAP Vendor Portal Backend

This repository contains a production-style Node.js + Express backend for an SAP Vendor Portal. The backend acts as a middleware layer between an Angular frontend and SAP OData services.

## Tech Stack

- Node.js
- Express.js
- Axios
- dotenv
- cors
- morgan

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file:

```bash
copy .env.example .env
```

3. Update `.env` with your SAP credentials:

```env
PORT=3000
SAP_BASE_URL=http://AZKTLDS5CP.kcloud.com:8000/sap/opu/odata/sap/ZGW_VENDOR_PORTAL_902109_SRV/
SAP_USERNAME=YOUR_SAP_USERNAME
SAP_PASSWORD=YOUR_SAP_PASSWORD
```

4. Start the server:

```bash
npm start
```

## API Endpoints

All endpoints return the following success format:

```json
{
  "success": true,
  "data": [...]
}
```

Error responses use:

```json
{
  "success": false,
  "message": "Error message"
}
```

### Authentication

- `POST /api/auth/login`
  - Body:
    ```json
    {
      "vendorId": "100000",
      "password": "ADMIN123"
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "data": {
        "vendorId": "100000"
      }
    }
    ```

### Vendor Endpoints

- `GET /api/vendor/profile/:vendorId`
- `GET /api/vendor/rfq/:vendorId`
- `GET /api/vendor/po/:vendorId`
- `GET /api/vendor/gr/:vendorId`
- `GET /api/vendor/invoice/:vendorId`
- `GET /api/vendor/payment-aging/:vendorId`
- `GET /api/vendor/memo/:vendorId`
- `GET /api/vendor/invoice/pdf/:invoiceDoc`

### Invoice PDF Download

- `GET /api/vendor/invoice/pdf/:invoiceDoc`
  - Streams a PDF
  - Headers:
    - `Content-Type: application/pdf`
    - `Content-Disposition: inline; filename=invoice.pdf`

## Project Structure

```text
backend/
├── src/
│   ├── config/
│   │   └── sapConfig.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── profileController.js
│   │   ├── poController.js
│   │   ├── grController.js
│   │   ├── invoiceController.js
│   │   ├── paymentController.js
│   │   └── memoController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── profileRoutes.js
│   │   ├── poRoutes.js
│   │   ├── grRoutes.js
│   │   ├── invoiceRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── memoRoutes.js
│   ├── services/
│   │   └── sapService.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── utils/
│   │   └── errorHandler.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Postman / cURL Examples

### Login

```bash
curl --request POST "http://localhost:3000/api/auth/login" \
  --header "Content-Type: application/json" \
  --data '{"vendorId":"100000","password":"ADMIN123"}'
```

### Fetch vendor profile

```bash
curl "http://localhost:3000/api/vendor/profile/100000"
```

### Download invoice PDF

```bash
curl "http://localhost:3000/api/vendor/invoice/pdf/5105600751" --output invoice.pdf
```

## Notes

- All SAP credentials are stored in `.env`.
- The backend uses a reusable SAP Axios instance with Basic Authentication.
- SAP OData responses are normalized to return clean JSON objects or arrays.
- PDF downloads are streamed directly without JSON conversion.
