import { Client } from 'whatsapp-web.js'

export function sendFixRechargeMenu(msg: any, client: Client) {
  const fixRechargeMenutext =
    'Recarga 💰\n\n Envie o valor da recarga:\n\n2️⃣ - Voltar'

  client.sendMessage(msg.from, fixRechargeMenutext)
}
