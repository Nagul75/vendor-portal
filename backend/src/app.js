import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import poRoutes from "./routes/poRoutes.js";
import grRoutes from "./routes/grRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import memoRoutes from "./routes/memoRoutes.js";
import rfqRoutes from "./routes/rfqRoutes.js";
import errorHandler from "./utils/errorHandler.js";

const app = express();
app.disable('etag');

const allowedOrigins = [
  'http://localhost:4200',
  'http://127.0.0.1:4200',
  'http://localhost:3000',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin not allowed by CORS: ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Cache-Control'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return cors(corsOptions)(req, res, next);
  }
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});
app.use(express.json());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.json({ success: true, message: "Vendor Portal backend is running." });
});

app.use("/api/auth", authRoutes);
app.use("/api/vendor/profile", profileRoutes);
app.use("/api/vendor/po", poRoutes);
app.use("/api/vendor/gr", grRoutes);
app.use("/api/vendor/rfq", rfqRoutes);
app.use("/api/vendor/invoice", invoiceRoutes);
app.use("/api/vendor/payment-aging", paymentRoutes);
app.use("/api/vendor/memo", memoRoutes);

app.use(errorHandler);

export default app;