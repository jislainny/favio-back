import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import { DateTime } from 'luxon'
import { md5 } from 'js-md5';

export default class UsuariosController {
  public async index({}: HttpContextContract) {
    return Usuario.all()
  }

   public async store({request,response}: HttpContextContract) {
    const {nome,cpf,senha} = request.body()
    const novoUsuario={nome,cpf,senha}
    const novasenha=md5(senha)
    novoUsuario.senha = novasenha
    Usuario.create(novoUsuario)
    return response.status(201).send(novoUsuario)
  }

  public async show({params,response}: HttpContextContract) {
  //funcao callback
  let UsuarioEncontrado=await Usuario.findByOrFail('id',params.id)
  if(UsuarioEncontrado ==undefined)
    return response.status(404)
  return UsuarioEncontrado
  }

  public async update({request,response,params}: HttpContextContract) {
    const {nome,cpf,senha}=request.body()
    let UsuarioEncontrado=await Usuario.findByOrFail('id',params.id)
    if(!UsuarioEncontrado)
      return response.status(404)
    UsuarioEncontrado.nome=nome
    UsuarioEncontrado.cpf=cpf
    UsuarioEncontrado.senha=senha

    await UsuarioEncontrado.save()
    await UsuarioEncontrado.merge({updatedAt:DateTime.local()}).save()
    return response.status(200).send(UsuarioEncontrado)

  }

  public async destroy({response, params}: HttpContextContract) {
    let UsuarioEncontrado=await Usuario.findByOrFail('id',params.id)
    if(!UsuarioEncontrado)
      return response.status(404)
    UsuarioEncontrado.delete()
    return response.status(204)
}
}