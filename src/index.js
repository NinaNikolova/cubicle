const express = require('express');
const handlebars = require('express-handlebars')
const app = express();
const path = require('path')

const PORT = 5000;

// express config -use - middleware express.static -access to css and img
app.use(express.static(path.resolve(__dirname, 'public')));

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