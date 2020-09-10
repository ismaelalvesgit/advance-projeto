//@Author ismael alves

module.exports = function(app){

	// rota inicial de apresentação
	app.get('/', (req, resp, next)=>{
		let body = 'API VERSÃO 0.1 ON'
		if(process.env.HOSTNAME){
			body = `API VERSÃO 0.1 ON ${process.env.HOSTNAME}`
		}
		resp.json(body)	
	})

	// retirar o favicon.ico por default
	app.get('/favicon.ico', (req, res) =>{
		res.status(204)
	})
}