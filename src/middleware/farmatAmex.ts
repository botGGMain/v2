export function formatAmex(
  input: string,
): { cardNumber: string; month: string; year: string; cvv: string }[] {
  const cardDetails: {
    cardNumber: string
    month: string
    year: string
    cvv: string
  }[] = []
  const lines = input.split('\n')

  for (const line of lines) {
    const matches = line.match(/(\d{15})\|(\d{2})\|(\d{4})\|(\d{4})/)
    if (matches) {
      const [, cardNumber, month, year, cvv] = matches
      cardDetails.push({ cardNumber, month, year, cvv })
    }
  }

  return cardDetails
}
