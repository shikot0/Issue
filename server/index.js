const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileuploader = require('express-fileupload');
const userRoutes = require('./Routes/userRoutes');
const issueRoutes = require('./Routes/issueRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileuploader());
app.use(cookieParser('test-12243i4-3i7432-8'));
app.use('/api/user', userRoutes);
app.use('/api/issue', issueRoutes); 

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`Database is running at ${process.env.MONGO_URL}`)
}).catch(err => {
    console.log(`There was an error, details: ${err}`)
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
 