import { Client } from 'whatsapp-web.js'
import { prisma } from '../lib/prisma-lib'
import { Prisma } from '@prisma/client'

export async function recarcheUser(msg: any, client: Client) {
  const userInput = msg.body

  const [numberUser, value] = userInput
    .split('/')
    .map((str: string) => str.trim())

  const numericValue = new Prisma.Decimal(value)
  const numberUserDb = numberUser + '@c.us' // Converter o valor para número

  try {
    const userFind = await prisma.user.findUnique({
      where: {
        number: numberUserDb,
      },
    })

    if (userFind === null) {
      client.sendMessage(msg.from, 'Usuario inexistente!')
      throw new Error()
    }

    await prisma.user.update({
      where: {
        number: numberUserDb,
      },
      data: {
        balance: Prisma.Decimal.add(userFind.balance, numericValue),
      },
    })

    client.sendMessage(
      msg.from,
      `Recarga para ${userFind.number}, no valor de ${numericValue}, concluida com sucesso!`,
    )
  } catch {
    client.sendMessage(msg.from, 'Recarga Falhou!')
  }
}
