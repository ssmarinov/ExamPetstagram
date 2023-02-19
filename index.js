const express = require('express');
const config = require('./config/config')
const handlebars = require('express-handlebars');
const initDatabase= require('./config/databaseInit');       //const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const { authentication } = require('./middlewares/authMiddleware');

const app = express();

//TODO  change extname ont html files
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');

app.use('/static', express.static('public'));       //for CSS and images            --->   TODO  change with new
app.use(express.urlencoded({extended: false}));     //body parser
app.use(cookieParser());
app.use(authentication);
app.use(routes);




//TODO  change with new PORT and DB_URI
initDatabase()
    .then(() => app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`)))
    .catch((err) => console.log(err.message));
