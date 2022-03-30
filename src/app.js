require('express-async-errors');
const express = require('express');
const routes = require("./routes");
const appError = require('./errors/appError');

const app = express();

app.use(express.json());

app.use(routes);

//MIDDLEWARE
app.use((err, _request, response, _) => {
    if(err instanceof appError){
        return response.status(err.statusCode).json({
            message: err.message
        })
    }
    return response.status(500).json({
         message: "Erro interno do sistema!"
    })
})

module.exports = app;