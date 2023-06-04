import { Client } from 'whatsapp-web.js'

export function sendCheckerGGAmexMenu(msg: any, client: Client) {
  const fixRechargeMenutext =
    'CheckerGG Amex Menu\n\n 1️⃣ Live retorno(0000, 1016, 1045 (Aprovada) - 5$\n2️⃣ Live retorno(Retornos Variados, porem com cartão valido) - 1$\n\n3️⃣ Menu'

  client.sendMessage(msg.from, fixRechargeMenutext)
}
