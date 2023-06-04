import { Client } from 'whatsapp-web.js'

export function sendCheckerGGMenu(msg: any, client: Client) {
  const fixRechargeMenutext =
    'CheckerGG Menu\n\n 1️⃣ Live retorno(0000, Aprovada) - 2$\n2️⃣ Live retorno(Retornos Variados, porem com cartão valido) - 0.50$\n\n3️⃣ Menu'

  client.sendMessage(msg.from, fixRechargeMenutext)
}
