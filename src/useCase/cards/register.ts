import { Cards} from '@prisma/client'
import { PrismaBotRepository } from '../../repository/prisma'

interface CardUseCaseRequest {
  info: string,
  userId: string,
  month: string,
  year: string,
  cvv: string
}

interface CardUseCaseResponse {
  card: Cards
}

export class CardUseCase {
  constructor(private cardsRepository : PrismaBotRepository) {}

  async execute({ info, month, year, cvv, userId }: CardUseCaseRequest): Promise<CardUseCaseResponse> {
    const card = await this.cardsRepository.registerCard({
      userId,
      info,
      month,
      year,
      cvv,
    })

    return {
      card,
    }
  }
}
 