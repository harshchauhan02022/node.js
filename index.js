const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();


app.use(cors({
 origin: 'http://localhost:3000', // Update with your frontend URL
 methods: 'GET,POST,PUT,DELETE',
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/users', userRoutes);

app.listen(9000, () => {
 console.log('Server running at http://localhost:9000');
});
