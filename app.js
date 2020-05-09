const express = require('express');
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');

const app = express();

const body_parser = require('body-parser');

const parameter_controller = require('./parameter_controller');

// machining-parameter-set

// npm init
// npm install express
// npm install mongoose
// npm install nodemon --save-dev
// npm run start-dev

app.use(body_parser.json()); //req.body.name
app.use(body_parser.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
    console.log(req.method, ' ', req.path);
    next();
}); // GET

// GET /index.html -> /puplic/index.html
app.use("/", express.static("public"));

// RESTful API
// CRUD OPERATIONS

//CREATE
app.post("/machining-parameter-set", parameter_controller.api_post_parameter);

//READ ONE
app.get("/machining-parameter-set/:id", parameter_controller.api_get_parameter);
//api.domain.com/materials

// READ ALL
app.get("/machining-parameter-sets", parameter_controller.api_get_parameters);
//api.domain.com/materials

// UPDATE
// app.patch korvaa vain tietyt kentät
// app.put korvaa koko tiedon
app.put("/machining-parameter-set/:id", parameter_controller.api_put_parameter);

// DELETE
app.delete("/machining-parameter-set/:id", parameter_controller.api_delete_parameter);

// password: fV3gOKjU9AbGf60q
const REST_uri = "mongodb+srv://server:fV3gOKjU9AbGf60q@cluster0-abago.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(REST_uri, {
    useCreateIndex: true, 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log('REST connected');
    app.listen(port)
}).catch(err => {
    console.log(err);
});