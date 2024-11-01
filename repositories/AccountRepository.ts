import { Account } from "db/models/Account.model";

class AccountRepository {
  async getAccount (id: number) {
    const account = await Account.findByPk(id)

    return account
  }

  async updateBalance (account: Account) {
    return await account.save({
      fields: ['balance']
    })
  }
}

export default new AccountRepository()