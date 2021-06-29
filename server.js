const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');

const app = express();

app.use(
	session({
	  secret: 'toaster struddle',
	  resave: true,
	  saveUninitialized: true
	})
 );

const routes = require('./controllers');
const sequelize = require('./config/connection');

// use PORT env variable on heroku or 3001 local
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

app.engine('hbs', exphbs({
	extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
