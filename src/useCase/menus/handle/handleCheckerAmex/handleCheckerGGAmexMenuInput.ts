import { Client } from 'whatsapp-web.js'
import { menuState } from '../../../../repository/state'
import { sendMainMenu } from '../../send/send-Main-Menu'
import { prisma } from '../../../../lib/prisma-lib'

export async function handleCheckerGGAmexMenuInput(msg: any, client: Client) {
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
    menuState[msg.id.remote] = 'checkerMenu/checkerGGAmex/0000'
    client.sendMessage(msg.from, 'Envie os CardsGGs ✍')
  } else if (userInput.body === '2') {
    menuState[msg.id.remote] = 'checkerMenu/checkerGGAmex/random'
    client.sendMessage(msg.from, 'Envie os CardsGGs ✍')

    return userInput
  } else if (userInput.body === '3') {
    menuState[msg.id.remote] = 'mainMenu'
    sendMainMenu(msg, client)
  } else {
    client.sendMessage(
      msg.from,
      'Opção inválida. Por favor, selecione uma opção válida.',
    )
  }
}
