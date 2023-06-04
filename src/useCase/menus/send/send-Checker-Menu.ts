import { Client } from 'whatsapp-web.js'

export function sendCheckerMenu(msg: any, client: Client) {
  const checkerMenuText = `Checker Menu ✔\n\n1️⃣ CheckerGG\n2️⃣ CheckerGG Amex\n\n3️⃣ Voltar`

  client.sendMessage(msg.from, checkerMenuText)
}
