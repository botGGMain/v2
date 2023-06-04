import { Client } from 'whatsapp-web.js'
import { menuState } from '../../../repository/state'
import { sendMainMenu } from './send-Main-Menu'

export function sendRechargeUser(msg: any, client: Client) {
  const userNumber = msg.id.remote
  const fixRechargeMenutext = 'Envie no formato +55DDXXXXXXXXX|VALOR'
  const userInput = msg.body.trim()

  if (userInput === '!recargaUser') {
    menuState[userNumber] = '/recargaUser'
    client.sendMessage(msg.from, fixRechargeMenutext)
  } else {
    menuState[userNumber] = 'mainMenu'
    sendMainMenu(msg, client)
  }
}
