import { ValidationError } from "base/error";
import Account from "./model";
import { AccountRepository } from "./repository";
import eventServer from "lib/event/event.server";
import { AccountCreated } from "base/events";

class NotEnoughBalanceError extends ValidationError {
  constructor(account: Account) {
    super(`Not enough balance: account <${account.id}>`)
    this.name = 'NotEnoughBalanceError'
  }
}

export class AccountService {
  repository: AccountRepository

  constructor(repository: AccountRepository) {
    this.repository = repository
  }

  async create (name: string, balance?: number) {
    const newAccount = await this.repository.createAccount({
      name,
      balance
    })

    eventServer.publish(AccountCreated, newAccount)

    return newAccount
  }

  async deposit (account: Account, amount: number) {
    const newAccount = await this.repository.updateBalance(account, account.balance + amount)
    return newAccount
  }

  async withdraw (account: Account, amount: number) {
    if (account.balance < amount) {
      throw new NotEnoughBalanceError(account)
    }

    const newAccount = await this.repository.updateBalance(account, account.balance - amount)
    return newAccount
  }

  async transfer (from: Account, to: Account, amount: number) {
    if (from.balance < amount) {
      throw new NotEnoughBalanceError(from)
    }

    const newFromBalanceAfter = from.balance - amount
    const newToBalanceAfter = to.balance + amount

    const [newFrom, newTo] = await Promise.all([
      this.repository.updateBalance(from, newFromBalanceAfter),
      this.repository.updateBalance(to, newToBalanceAfter)
    ])

    return [newFrom, newTo]
  }
}

export default new AccountService(new AccountRepository())