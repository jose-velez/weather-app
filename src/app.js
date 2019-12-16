const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

console.log(__dirname);

console.log(path.join(__dirname, '../public'));

const app = express();

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve.
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jose Velez'
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jose Velez'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Jose Velez'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address."
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send([{
                location: location,
                forecast: forecastData,
                address: req.query.address
            }])
        })
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
    console.log(req.query.search);
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help Article not found',
        name: 'Jose Velez'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        message: 'Page not found',
        name: 'Jose Velez'
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})