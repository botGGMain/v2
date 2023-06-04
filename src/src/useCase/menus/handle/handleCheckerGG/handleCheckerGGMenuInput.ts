import { Client } from 'whatsapp-web.js'
import { menuState } from '../../../../repository/state'
import { sendMainMenu } from '../../send/send-Main-Menu'
import { prisma } from '../../../../lib/prisma-lib'

export async function handleCheckerGGMenuInput(msg: any, client: Client) {
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
    menuState[msg.id.remote] = 'checkerMenu/checkerGG/0000'
    client.sendMessage(msg.from, 'Envie os CardsGGs ✍')
  } else if (userInput.body === '2') {
    menuState[msg.id.remote] = 'checkerMenu/checkerGG/random'
    client.sendMessage(msg.from, 'Envie os CardsGGs ✍')

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
