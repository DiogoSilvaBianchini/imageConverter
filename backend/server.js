require("dotenv/config")
const express = require("express")

const PORT = process.env.PORT || 8082
const app = express()
const routes = require("./src/routes/route.js")

app.use(routes)

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))