//@Author ismael alves
import validateId from '../middlewares/handlerValidateIdMiddleware'
import ControllerBase from '../utils/controllerBase'
import Produto from '../models/produto'

module.exports = function(app){

	//metodo que pega a produto por id
	app.get('/produto/:id',
		validateId, 
		ControllerBase.findById({
			model: Produto,
		})
	)

	//metodo que pega todos produto cadastrados
	app.get('/produto', 
		ControllerBase.findAll({
			model: Produto,
			sort: {dataRegistro: -1}
		})
	)

	//metodo que deleta a tags
	app.delete('/produto/:id', 
		validateId,
		ControllerBase.delete({
			model: Produto,
			files: [
				{
					path: "produto/"
				}
			]
		})
	)

	//meodo que atualiza a tag
	app.put('/produto/:id',
		validateId,
		ControllerBase.update({
			model: Produto,
			file: {
				files: [
					{
						field: "fotos",
						path: "produto/",
						defaultFile: true
					}
				]
			},
		})
	)

	//metodo que cadastra as tags
	app.post('/produto',
		ControllerBase.save({
			model: Produto,
			file: {
				files: [
					{
						field: "fotos",
						path: "produto/",
						defaultFile: true
					}
				]
			},
		})
	)
}