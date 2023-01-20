const { app, server } = require('./src/sockets/index.js')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { routes } = require('./src/routes')
const cors = require('cors')
require('dotenv').config();

// const corsOptions = {
//     // origin: new RegExp(`(https://)?localhost:8080/*?`), неправильно работает
//     origin: `http://localhost:8080`,
//     optionsSuccessStatus: 200,
// }

console.log('test env', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
})

app.options('*', cors())
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

routes.forEach(item => {
    app.use(`/api/v1/${item}`, require(`./src/routes/${item}`))
})


// server.listen(process.env.BACKEND_PORT || 8081, () => {
//     console.log(`Server running at ${process.env.BACKEND_PORT}`)
// })

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

// app.get('/', function(request, response) {
//     var result = 'App is running'
//     response.send(result);
// }).listen(process.env.BACKEND_PORT || 8081, function() {
//     console.log('App is running, server is listening on port ', process.env.BACKEND_PORT);
// });
