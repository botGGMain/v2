export interface Card {
  cc: string
  ano: string
  cvv: string
}

export function validateCardAmex({ cc, ano, cvv }: Card): Promise<boolean> {
  if (cc.length !== 15) {
    console.log('FORMATO DE CARTÃO INCORRETO')
    process.exit(1)

    return Promise.resolve(false)
  }

  if (parseInt(ano) <= 23) {
    console.log('Cartão Expirado')
    process.exit(1)

    return Promise.resolve(false)
  }

  if (cvv.length !== 4) {
    console.log('FORMATO DE CVV INCORRETO')
    process.exit(1)

    return Promise.resolve(false)
  }

  return Promise.resolve(true)
}
