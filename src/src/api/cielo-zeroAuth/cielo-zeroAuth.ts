import axios, { AxiosError } from 'axios'

async function createTransaction() {
  const merchantKey = 'SUA_CHAVE_DO_COMERCIANTE'
  const transactionRequest = {
    MerchantOrderId: '2014111701',
    Customer: {
      Name: 'Comprador crédito completo',
      Email: 'compradorteste@teste.com',
      Birthdate: '1991-01-02',
      Address: {
        Street: 'Rua Teste',
        Number: '123',
        Complement: 'AP 123',
        ZipCode: '12345987',
        City: 'Rio de Janeiro',
        State: 'RJ',
        Country: 'BRA',
      },
      DeliveryAddress: {
        Street: 'Rua Teste',
        Number: '123',
        Complement: 'AP 123',
        ZipCode: '12345987',
        City: 'Rio de Janeiro',
        State: 'RJ',
        Country: 'BRA',
      },
      Billing: {
        Street: 'Rua Neturno',
        Number: '12345',
        Complement: 'Sala 123',
        Neighborhood: 'Centro',
        City: 'Rio de Janeiro',
        State: 'RJ',
        Country: 'BR',
        ZipCode: '20080123',
      },
    },
    Payment: {
      Currency: 'BRL',
      Country: 'BRA',
      ServiceTaxAmount: 0,
      Installments: 1,
      Interest: 'ByMerchant',
      Capture: true,
      Authenticate: 'false',
      Recurrent: 'false',
      SoftDescriptor: '123456789ABCD',
      CreditCard: {
        CardNumber: '1234123412341231',
        Holder: 'Teste Holder',
        ExpirationDate: '12/2030',
        SecurityCode: '123',
        SaveCard: 'false',
        Brand: 'Visa',
        CardOnFile: {
          Usage: 'Used',
          Reason: 'Unscheduled',
        },
      },
      IsCryptoCurrencyNegotiation: true,
      Type: 'CreditCard',
      Amount: 200, // Valor em centavos (2 reais)
      AirlineData: {
        TicketNumber: 'AR988983',
      },
    },
  }
  try {
    const response = await axios.post(
      'https://apisandbox.cieloecommerce.cielo.com.br/1/sales/',
      transactionRequest,
      {
        headers: {
          MerchantKey: merchantKey,
        },
      },
    )
    console.log('Transação criada com sucesso:', response.data)
  } catch (error: unknown) {
    const axiosError = error as AxiosError
    if (axiosError.response) {
      console.error('Erro ao criar transação:', axiosError.response.data)
    } else {
      console.error('Erro ao criar transação:', error)
    }
  }
}

createTransaction()
