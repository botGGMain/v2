import { Client } from 'whatsapp-web.js'
import { menuState } from '../../../repository/state'
import { sendCheckerMenu } from '../send/send-Checker-Menu'
import { sendRechargeMenu } from '../send/send-Recharge-Menu'

export function handleMainMenuInput(msg: any, client: Client) {
  const userInput = msg.body.trim()

  if (userInput === '1') {
    menuState[msg.id.remote] = 'checkerMenu'
    sendCheckerMenu(msg, client)
  } else if (userInput === '2') {
    menuState[msg.id.remote] = 'rechargeMenu'
    sendRechargeMenu(msg, client)
  } else if (userInput === '3') {
    client.sendMessage(msg.from, 'wa.me/+5511961501649\nwa.me/+552196528-0480')
  } else {
    client.sendMessage(
      msg.from,
      'Opção inválida. Por favor, selecione uma opção válida.',
    )
  }
}
