const http =  require('http');
const path = require('path');
const express = require('express');

const app = express();
const router = express.Router();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../dist/BlogAnIdea-MEAN')))

const renderBlogAnIdea = (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/BlogAnIdea-MEAN/index.html'));
}

// Catch all other routes request and return it to the index
router.get('*', renderBlogAnIdea);

app.set('port',port);
const server = http.createServer(app);


server.listen(port, () => console.log('running on http://localhost:3000'));
