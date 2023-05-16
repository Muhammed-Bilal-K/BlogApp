const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const Article = require('./models/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))


app.get('/', async (req, res) => {
     const ars = await Article.find().sort({
         createdAt : 'desc' 
     })
    res.render('articles/index', { arts: ars }) //objects passing example is articles any value in avaliable in index.ejs //res.render('index' , {articles : articles})
})

app.use('/articles', articleRouter)

app.listen(5000)