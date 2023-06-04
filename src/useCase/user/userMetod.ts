import { User } from '@prisma/client'
import { PrismaBotRepository } from '../../repository/prisma'

interface UserUseCaseRequest {
  number: string
}

interface UserUseCaseResponse {
  user: User
}

export class UserUseCase {
  constructor(private userRepository: PrismaBotRepository) {}

  async create({ number }: UserUseCaseRequest): Promise<UserUseCaseResponse> {
    const user = await this.userRepository.findByNumber(number)

    return {
      user,
    }
  }

  async addBalance(
    number: string,
    value: number,
  ): Promise<UserUseCaseResponse> {
    const user = await this.userRepository.addBalance(number, value)

    return {
      user,
    }
  }

  async debitBalance(
    number: string,
    value: number,
  ): Promise<UserUseCaseResponse> {
    const user = await this.userRepository.debitBalance(number, value)

    return {
      user,
    }
  }
}
