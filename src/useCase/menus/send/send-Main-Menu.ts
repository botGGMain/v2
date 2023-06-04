import { Client } from 'whatsapp-web.js'
import { prisma } from '../../../lib/prisma-lib'

export async function sendMainMenu(msg: any, client: Client) {
  const contact = await msg.getContact()
  const senderName = contact.pushname

  const user = await prisma.user.findUnique({
    where: {
      number: msg.from,
    },
  })

  const mainMenuText = `👨‍💻 Bem-vindo a Central Infinix! Olá ${senderName}\n\nSaldo: R$:${user?.balance}\n
Selecione uma opção:
1️⃣ Checker
2️⃣ Recarga
3️⃣ Suporte`
  console.log(msg.id.remote)
  client.sendMessage(msg.from, mainMenuText)
}
