require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

const userRouter = require('./routes/user');

app.use('/api', userRouter);

app.listen(PORT,  () => {
    console.log(`Server is running on port ${PORT}`);
})