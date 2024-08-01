require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/error');
const logger = require('./middleware/logger');
const rateLimit = require('./middleware/rateLimit');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET; // Şu an kullanılmıyor, ama ileride kullanabilirsiniz

// Database connection
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(rateLimit);

// Routes
const kullaniciRoutes = require('./routes/kullaniciRoutes');
const urunRoutes = require('./routes/urunRoutes');
const musteriRoutes = require('./routes/musteriRoutes');
const siparisRoutes = require('./routes/siparisRoutes');
const uretimRoutes = require('./routes/uretimRoutes');
const calisanRoutes = require('./routes/calisanRoutes');
const projeRoutes = require('./routes/projeRoutes');
const belgeRoutes = require('./routes/belgeRoutes');
const isAkisiRoutes = require('./routes/isAkisiRoutes');
const raporRoutes = require('./routes/raporRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Route kullanımları
app.use('/api', kullaniciRoutes);
app.use('/api/urun', urunRoutes);
app.use('/api/musteri', musteriRoutes);
app.use('/api/siparis', siparisRoutes);
app.use('/api/uretim', uretimRoutes);
app.use('/api/calisan', calisanRoutes);
app.use('/api/proje', projeRoutes);
app.use('/api/belge', belgeRoutes);
app.use('/api/is-akisi', isAkisiRoutes);
app.use('/api/rapor', raporRoutes);
app.use('/api/admin', adminRoutes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.url} not found`,
    availableRoutes: app._router.stack
      .filter(r => r.route)
      .map(r => `${Object.keys(r.route.methods)[0].toUpperCase()} ${r.route.path}`)
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});

module.exports = app;
