const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const routes = require('./controllers');
const sequelize = require('./config/connection');

// use PORT env variable on heroku or 3000 local
const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: true }).then(() => {
	app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
