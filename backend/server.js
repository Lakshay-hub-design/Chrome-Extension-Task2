require("dotenv").config()
const express = require("express")
const cors = require("cors")
const sequelize = require('./config/db')

const scrapeRoute = require("./routes/scrape")

const app = express()

app.use(cors())
app.use(express.json({ limit: "20mb" }))

app.use('/scrape-profile', scrapeRoute)

sequelize.sync()
.then(() => console.log("Database Connected"))
.catch(err => console.error(err))

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log("Backend is running on port 4000")
})