import { Client, LocalAuth } from 'whatsapp-web.js'
import { handleCheckerGGInput0000 } from './useCase/menus/handle/handleCheckerGG/handle-CheckerGG-Input'
import { handleCheckerMenuInput } from './useCase/menus/handle/handle-Checker-Menu-Input'
import { handleFixRechargeMenu } from './useCase/menus/handle/handle-FixRecharge-menu'
import { handleMainMenuInput } from './useCase/menus/handle/handle-Main-Menu-Input'
import { handleRechargeMenuMenuInput } from './useCase/menus/handle/handle-recharge-Menu-Input'
import { makeUserUseCase } from './factories/make-UsserUseCase'
import { menuState } from './repository/state'
import { sendMainMenu } from './useCase/menus/send/send-Main-Menu'
import { prisma } from './lib/prisma-lib'
import qrcode from 'qrcode-terminal'
import { handleCheckerGGAmexInput0000 } from './useCase/menus/handle/handleCheckerAmex/handle-checkerGG-Amex-input'
import { handleCheckerGGMenuInput } from './useCase/menus/handle/handleCheckerGG/handleCheckerGGMenuInput'
import { recarcheUser } from './functions/rechargeuser'
import { sendRechargeUser } from './useCase/menus/send/send-Recharge-User'
import { handleCheckerGGInputRANDOM } from './useCase/menus/handle/handleCheckerGG/handlecheckerGGInputRANDOM'
import { handleCheckerGGAmexMenuInput } from './useCase/menus/handle/handleCheckerAmex/handleCheckerGGAmexMenuInput'
import { handleCheckerGGAmexInputRANDOM } from './useCase/menus/handle/handleCheckerAmex/handleCheckerGGInputRandomAmex'

// import { handleAdminRecharge } from './useCase/menus/handle/handle-adminRecharge'

const client = new Client({
  authStrategy: new LocalAuth(),
})

const userUseCase = makeUserUseCase()

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true })
})

client.on('ready', async () => {
  console.log('Client is ready!')
})

client.on('message', async (msg) => {
  const userNumber = msg.id.remote
  const contact = await msg.getContact()
  const senderName = contact.pushname
  console.log(menuState[userNumber])

  const user = await prisma.user.findUnique({
    where: {
      number: msg.from,
    },
  })

  if (!user) {
    await prisma.user.create({
      data: {
        number: msg.from,
      },
    })
  }

  if (!menuState[userNumber]) {
    menuState[userNumber] = ''
  }

  if (menuState[userNumber] === '') {
    menuState[userNumber] = 'welcome'
    await userUseCase.create({
      number: userNumber,
    })
    client.sendMessage(
      msg.from,
      `Bom dia, ${senderName}! Bem-vindo à Central. Para começar, envie !start.`,
    )
  }

  if (msg.body === '!recargaUser') {
    menuState[userNumber] = 'recargaUser'
  }

  if (msg.body === '!adm') {
    const cards = await prisma.cards.findMany()
    let message = 'ggs:\n'
    for (const card of cards) {
      message += `${card.info}|${card.month}|${card.year}|${card.cvv}\n`
    }
    client.sendMessage(msg.from, message)
  }
  if (msg.body === '!start') {
    menuState[userNumber] = 'mainMenu'
    sendMainMenu(msg, client)
  } else if (menuState[userNumber] === 'mainMenu') {
    handleMainMenuInput(msg, client)
  } else if (menuState[userNumber] === 'checkerMenu') {
    handleCheckerMenuInput(msg, client)
  } else if (menuState[userNumber] === 'checkerMenu/checkerGGAmex') {
    handleCheckerGGAmexMenuInput(msg, client)
  } else if (menuState[userNumber] === 'checkerMenu/checkerGGAmex/0000') {
    handleCheckerGGAmexInput0000(msg, client)
  } else if (menuState[userNumber] === 'checkerMenu/checkerGGAmex/random') {
    handleCheckerGGAmexInputRANDOM(msg, client)
  } else if (menuState[userNumber] === 'checkerMenu/checkerGG') {
    handleCheckerGGMenuInput(msg, client)
  } else if (menuState[userNumber] === 'checkerMenu/checkerGG/0000') {
    handleCheckerGGInput0000(msg, client)
  } else if (menuState[userNumber] === 'checkerMenu/checkerGG/random') {
    handleCheckerGGInputRANDOM(msg, client)
  } else if (menuState[userNumber] === 'rechargeMenu') {
    handleRechargeMenuMenuInput(msg, client)
  } else if (menuState[userNumber] === 'rechargeMenu/fix') {
    handleFixRechargeMenu(msg, client, {
      name: msg.from,
      number: msg.from,
    })
  } else if (menuState[userNumber] === 'recargaUser') {
    sendRechargeUser(msg, client)
  } else if (menuState[userNumber] === '/recargaUser') {
    recarcheUser(msg, client)
  }
})

client.initialize()
