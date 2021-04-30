const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//parse incoming string or array data
app.use(express.urlencoded({extended:true}));
//parse incoming JSON data
app.use(express.json());
//serves static assets from the public directory
app.use(express.static('public'));

//tells our server to use api routes if /api is included in the route
app.use('/api', apiRoutes);
//tells our server to serve html routes if only / is included in the route
app.use('/', htmlRoutes);

app.listen(PORT, () =>{
    console.log(`API server now on port ${PORT}!`);
});

