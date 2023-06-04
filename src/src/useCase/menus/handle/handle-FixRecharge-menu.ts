import { Client } from 'whatsapp-web.js'
import { payment, configurations } from 'mercadopago'
import qrcode from 'qrcode-terminal'
import { userPix } from '../../../api/interfaces/user-interface'
import { CreatePaymentPayload } from '../../../api/interfaces/mp-interface'
import { sendMainMenu } from '../send/send-Main-Menu'
import { makeUserUseCase } from '../../../factories/make-UsserUseCase'
import { menuState } from '../../../repository/state'

configurations.setAccessToken(
  'APP_USR-7392882239138850-060118-030cc1ddd941dcba061348b5fdf2d1aa-1382592728',
)

let status = false
const userUseCase = makeUserUseCase()

export async function handleFixRechargeMenu(
  msg: any,
  client: Client,
  data: userPix,
) {
  const userNumber = msg.id.remote
  const userInput = msg.body.trim()

  if (userInput !== '') {
    const value = parseFloat(userInput)
    const payment_data: CreatePaymentPayload = {
      transaction_amount: value,
      description: 'Product title',
      payment_method_id: 'pix',
      installments: 1,
      payer: {
        email: 'contato.igoroliveira21@gmail.com',
        first_name: `${data.name}`,
        last_name: `${data.name}`,
        identification: {
          type: 'CPF',
          number: '19119119100',
        },
        address: {
          zip_code: '06233200',
          street_name: 'Avenida das Nações Unidas',
          street_number: '3003',
          neighborhood: 'Bonfim',
          city: 'Osasco',
          federal_unit: 'SP',
        },
      },
    }

    try {
      const paymentResponse = await payment.create(payment_data)
      console.log(
        paymentResponse.response.point_of_interaction.transaction_data.qr_code,
      )

      const qrCodeText =
        paymentResponse.response.point_of_interaction.transaction_data.qr_code

      qrcode.generate(qrCodeText, { small: true }, function (qrcodeText) {
        console.log('QR Code:')
        console.log(qrcodeText)
        client.sendMessage(msg.from, `pix copia e cola: ${qrCodeText}`)
        client.sendMessage(
          msg.from,
          'Aguardando pagamento, apos o pagamento iremos avisar.',
        )
        menuState[userNumber] = 'mainMenu'
      })

      const checkPaymentPromise = new Promise((resolve, reject) => {
        const intervalId = setInterval(async () => {
          try {
            const response = await payment.get(paymentResponse.response.id)
            if (response.response.status === 'approved') {
              status = true
              console.log('A transação foi paga!')
              clearInterval(intervalId)
              resolve(status)
            }
          } catch (error) {
            console.log(error)
            clearInterval(intervalId)
            reject(error)
          }
        }, 5000)
      })

      await checkPaymentPromise

      const { user } = await userUseCase.addBalance(msg.from, value)
      client.sendMessage(
        msg.from,
        `Recarga no valor de ${value} efetuada com sucesso.`,
      )
      client.sendMessage(msg.from, `Seu saldo atual é ${user.balance}`)
      sendMainMenu(msg, client)
    } catch (error) {
      console.log(error)
    }
  }
}
