export interface CreatePaymentPayload {
  transaction_amount: number
  description: string
  payment_method_id: string
  installments: number
  payer: {
    email: string
    first_name: string
    last_name: string
    identification: {
      type: string
      number: string
    }
    address: {
      zip_code: string
      street_name: string
      street_number: string
      neighborhood: string
      city: string
      federal_unit: string
    }
  }
}
