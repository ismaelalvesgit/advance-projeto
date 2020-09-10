//@Author ismael alves
import validateId from '../middlewares/handlerValidateIdMiddleware'
import ControllerBase from '../utils/controllerBase'
import Carrinho from '../models/carrinho'
import carrinhoValidate from '../validators/carrinhoValidator'
import verifyHandlerMiddleware from '../middlewares/verifiyHandlerMiddleware'

module.exports = function(app){

	//metodo que pega todos produto cadastrados no carrinho
	app.get('/carrinho', 
		ControllerBase.findAll({
			model: Carrinho,
			skipLinks: true,	
			populate: [{
				path:"produto"
			}],		
			sort: {dataRegistro: -1}
		})
	)

	//metodo que esvazia o carrinho
	app.delete('/carrinho', 
		(req, resp, next)=>{
			Carrinho.deleteMany({}).then((doc)=>{
				resp.sendStatus(204)
			}).catch()
		}
	)

	//metodo que deleta o produto no carrinho
	app.delete('/carrinho/:id', 
		validateId,
		ControllerBase.delete({
			model: Carrinho
		})
	)

	//meodo que atualiza o produto no carrinho
	app.put('/carrinho/:id',
		validateId,
		carrinhoValidate.editar(),
		verifyHandlerMiddleware,
		ControllerBase.update({
			model: Carrinho,
		})
	)

	//metodo que cadastra o produto no carrinho
	app.post('/carrinho',
		carrinhoValidate.cadastro(),
		verifyHandlerMiddleware,
		(req, resp, next)=>{
			const options = {new: true, runValidators: true}
			const body = req.body
			Carrinho.findOne({produto: body.produto, tamanho: body.tamanho}).then((carrinho)=>{
				// Atualizar o carrinho
				if(carrinho){
					Carrinho.findByIdAndUpdate(carrinho._id, {quantidade: carrinho.quantidade + parseInt(body.quantidade)}, options).then((doc)=>{
						resp.json(doc)
					}).catch(next)
				}else{
					new Carrinho(body).save().then((doc)=>{
						resp.status(201).json(doc)
					}).catch(next)
				}
			}).catch(next)
		}
	)
}