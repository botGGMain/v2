import { Client } from 'whatsapp-web.js'
import { makeCardUseCase } from '../../../../factories/make-CardUseCase'
import { menuState } from '../../../../repository/state'
import { sendCheckerMenu } from '../../send/send-Checker-Menu'
import { makeUserUseCase } from '../../../../factories/make-UsserUseCase'
import { prisma } from '../../../../lib/prisma-lib'
import { checkerReturCodeAmex0000 } from '../../../../functions/checkerReturnCode'
import { processarTransacaoAmex } from '../../../../api/pagarmeAmex'
import { hansPetterLuhAmex } from '../../../../functions/checkerHansPetterLuhAmex'
import { formatAmex } from '../../../../middleware/farmatAmex'

const cardUseCase = makeCardUseCase()
const userUseCase = makeUserUseCase()

export async function handleCheckerGGAmexInput0000(
  msg: any,
  client: Client,
  // limit: number,
) {
  const userInput = msg.body.trim()

  client.sendMessage(msg.from, 'Aguarde, estamos consultando! 👨‍💻')

  const user = await prisma.user.findUnique({
    where: {
      number: msg.from,
    },
  })

  if (!user) {
    client.sendMessage(msg.from, 'Usuario não encontrado.')
    throw new Error('usuario não encontrado')
  }

  if (userInput !== '3') {
    interface Cards {
      cardNumber: string
      month: string
      year: string
      cvv: string
    }

    const cards = formatAmex(msg.body)

    const validateCards: Cards[] = []

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i]

      if (hansPetterLuhAmex(card.cardNumber)) {
        const { bandeira, status, amount, returnCode, responseMessage } =
          await processarTransacaoAmex({
            cc: card.cardNumber,
            ano: card.year,
            cvv: card.cvv,
            mes: card.month,
          })

        if (user.balance.toNumber() >= 2) {
          if (status === 200 && (await checkerReturCodeAmex0000(returnCode))) {
            const validatedCard = {
              ...card,
              returnCode,
              responseMessage,
              bandeira,
              amount,
              status,
            }

            await cardUseCase.execute({
              userId: msg.id.remote,
              info: card.cardNumber,
              month: card.month,
              year: card.year,
              cvv: card.cvv,
            })

            await userUseCase.debitBalance(msg.from, 5)
            validateCards.push(validatedCard)
          }
        } else {
          client.sendMessage(msg.from, 'Saldo Insuficiente!')
        }
      }
    }

    const validateCardJSON = JSON.stringify(validateCards)
    const validadeCardsUser = JSON.parse(validateCardJSON)
    const validateCardJSONSlice = validadeCardsUser.slice(0, 100)

    if (validateCards.length === 0) {
      client.sendMessage(msg.from, 'Nenhuma GG Aprovada\n2️⃣. Voltar')
    } else {
      let message = `GGs Aprovadas: ${validateCardJSONSlice.length}\n`

      for (const card of validateCardJSONSlice) {
        message += `✅ Transação Efetuada ✅\n\n`
        message += `💳: ${card.cardNumber}\n`
        message += `📆: ${card.month}/${card.year}\n`
        message += `🔒: ${card.cvv}\n`
        message += `🇧🇷: ${card.bandeira}\n\n`
        message += `👨‍💻: ${card.responseMessage}\n`
        message += `Return Code: ${card.returnCode}\n`
        message += `Valor da transação: R$ ${(card.amount / 100).toFixed(
          2,
        )}\n\n\n`
      }

      client.sendMessage(msg.from, `${message}\n 2️⃣ Voltar`)
    }
  }

  if (userInput === '2') {
    menuState[msg.id.remote] = 'checkerMenu'
    sendCheckerMenu(msg, client)
  }
}
