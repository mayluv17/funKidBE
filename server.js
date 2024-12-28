require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;

const connectDb = require('./config/dbConn');

//connect to mongo
connectDb();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use(express.static('public'));

// routes
app.use('/', require('./routes/roots'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/category', require('./routes/api/tasks'));
app.use('/alltask', require('./routes/api/tasks'));
app.use('/singleTask', require('./routes/api/singleTask'));
app.use('/singleTaskContent', require('./routes/api/taskData'));
app.use('/image', require('./routes/api/imageUpload'));
app.use('/completedTask', require('./routes/api/setTaskCompleted'));
app.use('/authorizeUser', require('./routes/api/access'));

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('connected to mongoDb...yahh!');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
