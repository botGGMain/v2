import { configurations, payment } from 'mercadopago'
import { CreatePaymentPayload } from './interfaces/mp-interface'
import qrcode from 'qrcode-terminal'
import { userPix } from './interfaces/user-interface'

let status = false // Inicialmente, a transação não está paga

export function createPix(data: userPix) {
  const payment_data: CreatePaymentPayload = {
    transaction_amount: 0.1,
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

  payment
    .create(payment_data)
    .then(function (data) {
      console.log(data.response.point_of_interaction.transaction_data.qr_code)

      const qrCodeText =
        data.response.point_of_interaction.transaction_data.qr_code

      qrcode.generate(qrCodeText, { small: true }, function (qrcodeText) {
        console.log('QR Code:')
        console.log(qrcodeText)
      })

      // Verificar se a transação foi paga
      setInterval(function () {
        payment
          .get(data.response.id)
          .then(function (response) {
            if (response.response.status === 'approved') {
              status = true // Atualizar o status para true quando a transação for aprovada
              console.log('A transação foi paga!')
              return status // Retornar o status
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }, 5000) // Verificar a cada 5 segundos
    })
    .catch(function (error) {
      console.log(error)
    })
}
