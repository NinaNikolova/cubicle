const express = require('express');
const handlebars = require('express-handlebars')
const app = express();
const PORT = 5000;

// Handlebars config
// refister the engine
app.engine('hbs', handlebars.engine({
    extname:'hbs'
    
}))
// set engine
app.set('view engine', 'hbs')
// set view directory becouse by default it is in nmain directory
app.set('views', 'src/views')


// Routes
app.get('/', (req,res)=>{
    res.render('index');
})

app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}...`));