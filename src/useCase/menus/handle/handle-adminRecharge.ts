import { Client } from 'whatsapp-web.js'
import { makeUserUseCase } from '../../../factories/make-UsserUseCase'

const rechargeUseCase = makeUserUseCase()

export async function handleAdminRecharge(msg: any, client: Client) {
  const userInput = msg.body.trim()

  const value = parseInt(userInput)

  await rechargeUseCase.addBalance(msg.body, value)
}
