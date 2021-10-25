const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const routes = require('./routes/index')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(routes)
app.listen(3000, () => {
  console.log('app runs in http://localhost:3000/')
})
