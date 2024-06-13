const express = require('express')

const app = express()
const port = 9000;

app.get('/', (req, res) => {
 res.send('Welcome my new project')
});

app.listen(port, () => {
 console.log(`localhost:${port}`);
});