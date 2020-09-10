//@Author ismael alves
import mongoose from 'mongoose'

module.exports = function(app){

    //metodo que verifica a saude do sistema
    app.get('/system/healthcheck', 
        (req, resp, next) => {
            let data = {
                process: process.pid,
                uptime: process.uptime(),
                dataBase:{
                    status: mongoose.STATES[mongoose.connection.readyState],
                }
            }
            resp.json(data) 
        }
    )
}