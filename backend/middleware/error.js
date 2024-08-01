const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    res.status(err.status || 500).json({
      message: err.message || 'Sunucu hatası',
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
  };
  
  module.exports = errorHandler;