import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma-lib'

export class PrismaBotRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByNumber(number: string) {
    const user = await prisma.user.findUnique({
      where: {
        number,
      },
    })

    if (!user) {
      const user = await prisma.user.create({
        data: {
          number,
        },
      })

      return user
    }

    return user
  }

  async registerCard(data: Prisma.CardsCreateInput) {
    const cardVerification = await prisma.cards.findFirst({
      where: {
        info: data.info,
      },
    })
    if (!cardVerification) {
      const card = await prisma.cards.create({
        data,
      })

      return card
    }

    return cardVerification
  }

  async addBalance(numberId: string, value: number) {
    try {
      const newValue = new Prisma.Decimal(value)

      const userFind = await prisma.user.findUnique({
        where: {
          number: numberId,
        },
      })

      if (!userFind) {
        throw new Error('usuario inexistente')
      }

      const user = prisma.user.update({
        where: {
          number: numberId,
        },
        data: {
          balance: Prisma.Decimal.add(userFind.balance, newValue),
        },
      })

      return user
    } catch {
      throw new Error(
        'Error na validação de numero do usuario no banco de dados',
      )
    }
  }

  async debitBalance(numberId: string, debit: number) {
    const findUser = await prisma.user.findUnique({
      where: {
        number: numberId,
      },
    })

    if (!findUser) {
      throw new Error('Usuario não encontrado')
    }

    const newDebit = new Prisma.Decimal(debit)

    const user = await prisma.user.update({
      where: {
        number: numberId,
      },
      data: {
        balance: Prisma.Decimal.sub(findUser.balance, newDebit),
      },
    })

    return user
  }
}
