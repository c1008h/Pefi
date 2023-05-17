const express = require('express')
const path = require('path')
const session = require('express-session')

const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')

const app = express()
const PORT = process.env.PORT || 3001;

const sess = {
    secret: process.env.SESSION_SECRET || "super secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

app.use(session(sess))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`))
})