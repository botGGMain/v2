import axios, { AxiosResponse } from 'axios'
import { TokenResponse } from './interfaces/interfacesCielo'

interface ClientInfos {
  clientId: string
  clientSecret: string
}

export async function obterTokenAutenticacao({
  clientId,
  clientSecret,
}: ClientInfos): Promise<string> {
  try {
    const response: AxiosResponse<TokenResponse> = await axios.post(
      'https://api.cielo.com.br/zeroauth/v1/oauth2/token',
      {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      },
    )
    console.log(response.data.access_token)
    return response.data.access_token
  } catch (error) {
    console.error('Erro ao obter token de autenticação:', error)
    throw error
  }
}
