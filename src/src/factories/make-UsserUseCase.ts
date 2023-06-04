import { PrismaBotRepository } from '../repository/prisma'
import { UserUseCase } from '../useCase/user/userMetod'

export function makeUserUseCase() {
  const userRepository = new PrismaBotRepository()
  const useCase = new UserUseCase(userRepository)

  return useCase
}
