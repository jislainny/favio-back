import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'


export default class UsuariosController {
  public async index({ response }: HttpContextContract) {
    const usuarios = await Usuario.all()
    return response.status(200).send(usuarios)
  }
 
  public async store({ request, response }: HttpContextContract) {
    const { nome, cpf, senha } = request.body()

    const novoUsuario = await Usuario.create({ nome, cpf, senha })
    return response.status(201).send(novoUsuario)
  }

  public async show({ response, params }: HttpContextContract) {
    const usuario = await Usuario.findByOrFail('id',params.id)

    if (usuario) {
      return response.status(200).send(usuario)
    } else {
      return response.status(404).send('Usuário não encontrado')
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { nome, cpf, senha } = request.body()
    const usuario = await Usuario.findByOrFail('id',params.id)

    if (usuario) {
      usuario.nome = nome
      usuario.cpf = cpf
      usuario.senha = senha
  
      await usuario.save()
      return response.status(200).send(usuario)
    } else {
      return response.status(404).send('Usuário não encontrado')
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    const usuario = await Usuario.findByOrFail('id',params.id)

    if (usuario) {
      await usuario.delete()
      return response.status(204)
    } else {
      return response.status(404).send('Usuário não encontrado')
    }
  }
}