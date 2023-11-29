import { assert } from '@japa/preset-adonis'
import { test } from '@japa/runner'

test.group('List favoritos', () => {
 test('exibir favoritos', async({client})=>{
  const resposta=await client.get('/favoritos')
  resposta.assertStatus(200)
  resposta.assertBodyContains([])

 })
 //TDD
  test('exibir favorito vom id', async ({client})=>{
    const resposta= await client.get('/favoritos/1')
    resposta.assertStatus(200)
    resposta.assertBodyContains({nome:"Google"})
  })

 })
