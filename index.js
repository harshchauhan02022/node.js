const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.json());


app.use('/api/users', userRoutes);

app.listen(9000, () => {
 console.log('Server running at http://localhost:9000');
});
