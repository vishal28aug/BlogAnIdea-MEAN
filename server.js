const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');
const errorHandler = require('./backend/middleware/error');

//Load .env varialbes
dotenv.config({ path: './config/config.env' });

//Connect to DB
connectDB();

//Route files
const auth = require('./backend/routes/auth');
const users = require('./backend/routes/user');
const upload = require('./backend/routes/uploads');

const app = express();
const router = express.Router();

//Body parser
app.use(express.json());

//Cookie Parse
app.use(cookieParser());

//Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Prevent XSS attack
app.use(xss());

//Rate limitng
const limiter = rateLimit({
    windowMs:10 * 60 * 1000, //10 mins
    max: 100
});
app.use(limiter);

//Prevent http param pollution
app.use(hpp());

//Enable CORS
app.use(cors());

// Parsers for POST data
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

//connected Angular with node
app.use(express.static(path.join(__dirname, './dist/BlogAnIdea-MEAN')))

const renderBlogAnIdea = (req, res) => {
    res.sendFile(path.join(__dirname, './dist/BlogAnIdea-MEAN/index.html'));
}

// Catch all other routes request and return it to the index
router.get('/', renderBlogAnIdea);
router.get('/login', renderBlogAnIdea);
router.get('/register', renderBlogAnIdea);
router.get('/blogs', renderBlogAnIdea);
router.get('/create', renderBlogAnIdea);
router.get('/myblogs', renderBlogAnIdea);

//images
app.use("/images", express.static(path.join("backend/images")));
app.use("/uploads", express.static(path.join("backend/uploads")));

//Mount routers
app.use('/api/v1/auth',auth);
app.use('/api/v1/auth/users',users);
app.use('/api/v1/upload/file',upload);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server runing in ${process.env.NODE_ENV} running on http://localhost:${PORT}`));

//Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Erro: ${err.message}`);
    //Close server & exit process
    server.close(() => process.exit(1));
});