import { Client } from 'whatsapp-web.js'
import { menuState } from '../../../repository/state'
import { sendMainMenu } from '../send/send-Main-Menu'
import { prisma } from '../../../lib/prisma-lib'
import { sendCheckerGGMenu } from '../send/send-CheckerGG-Menu'
import { sendCheckerGGAmexMenu } from '../send/sendCheckerGGAmexMenu'

export async function handleCheckerMenuInput(msg: any, client: Client) {
  const userInput = msg
  const user = await prisma.user.findUnique({
    where: {
      number: userInput.from,
    },
  })
  if (!user) {
    throw new Error('usuário não cadastrado')
  }

  if (userInput.body === '1') {
    menuState[msg.id.remote] = 'checkerMenu/checkerGG'
    sendCheckerGGMenu(msg, client)
  } else if (userInput.body === '2') {
    menuState[msg.id.remote] = 'checkerMenu/checkerGGAmex'
    sendCheckerGGAmexMenu(msg, client)

    return userInput
  } else if (userInput.body === '3') {
    menuState[msg.id.remote] = 'mainMenu'
    sendMainMenu(msg, client)
    client.sendMessage(
      msg.from,
      'Opção inválida. Por favor, selecione uma opção válida.',
    )
  }
}
