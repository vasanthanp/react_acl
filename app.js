const express = require('express');
const app = express();
const { connect } = require('mongoose');
const { PORT, DB } = require('./config/index');

app.use(require('cors')())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./router/routes'))

const startApp = () => {
    try {
        connect(DB)
        console.log(`DB connected successfully`)
        app.listen(PORT, () => {
            console.log(`ACL server liste at ${PORT}`)
        })
    } catch (err) {
        console.log('Error in connecting DB', err)
        startApp()
    }
}
startApp()