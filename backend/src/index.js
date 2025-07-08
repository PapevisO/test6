const express = require('express');
const path = require('path');
const itemsRouter = require('./routes/items');
const statsRouter = require('./routes/stats');
const cors = require('cors');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const morgan = require('morgan');
morgan.token('errMsg', (req, res) => res.locals.errorMessage || '-');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:3000' }));
// Basic middleware
app.use(express.json());

// Log formatting, skip success logging
app.use(morgan(':method :url :status :response-time ms - :res[content-length] - msg: :errMsg', {
  skip: (req, res) => res.statusCode < 400
}));

// Routes
app.use('/api/items', itemsRouter);
app.use('/api/stats', statsRouter);

// Not Found
app.use('*', notFound);
app.use(errorHandler);

app.listen(port, () => console.log('Backend running on http://localhost:' + port));
