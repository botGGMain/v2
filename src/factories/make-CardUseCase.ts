import { PrismaBotRepository } from '../repository/prisma'
import { CardUseCase } from '../useCase/cards/register'

export function makeCardUseCase() {
  const cardRepository = new PrismaBotRepository()
  const useCase = new CardUseCase(cardRepository)

  return useCase
}
