import { Client } from 'whatsapp-web.js'
import { menuState } from '../../../repository/state'
import { sendMainMenu } from '../send/send-Main-Menu'
import { sendFixRechargeMenu } from '../send/send-FixRecharge-Menu'

export function handleRechargeMenuMenuInput(msg: any, client: Client) {
  const userInput = msg.body.trim()

  if (userInput === '1') {
    menuState[msg.id.remote] = 'rechargeMenu/fix'
    sendFixRechargeMenu(msg, client)
  } else if (userInput === '3') {
    menuState[msg.id.remote] = 'mainMenu'
    sendMainMenu(msg, client)
  } else {
    client.sendMessage(
      msg.from,
      'Opção inválida. Por favor, selecione uma opção válida.',
    )
  }
}
