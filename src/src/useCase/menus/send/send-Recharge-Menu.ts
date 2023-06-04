import { Client } from 'whatsapp-web.js'

export function sendRechargeMenu(msg: any, client: Client) {
  const recargaMenutext = `Recarga
Selecione uma opção:
1️⃣ Valor
3️⃣ Voltar`

  client.sendMessage(msg.from, recargaMenutext)
}
