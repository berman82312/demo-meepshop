import { Lock, Op, Transaction } from "@sequelize/core";
import Account from "./model";
import eventServer from "lib/event/event.server";
import { AccountCreated } from "base/events";
import { initDB } from "db/config";

type QueryOptions = {
  lock?: Lock;
  transaction?: Transaction;
};

type AccountPayload = {
  name: string;
  balance?: number;
};

export class AccountRepository {
  queryOptions: QueryOptions = {};

  async get(id: number) {
    await initDB();

    const account = await Account.findByPk(id, this.queryOptions);
    eventServer.publish(AccountCreated, account);

    this._resetQueryOptions();

    return account;
  }

  async getAll(id?: number[]) {
    await initDB();
    const accounts = await Account.findAll({
      ...this.queryOptions,
      where: id
        ? {
          id: {
            [Op.in]: id,
          },
        }
        : undefined,
    });

    this._resetQueryOptions();

    return accounts;
  }

  async updateBalance(account: Account, balance: number) {
    account.balance = balance;
    return await account.save({
      fields: ["balance"],
    });
  }

  async createAccount(newAccountData: AccountPayload) {
    const account = await Account.create({
      name: newAccountData.name,
      balance: newAccountData.balance ?? 0,
    });
    return account;
  }

  lockForUpdate(transaction: Transaction) {
    this.queryOptions.lock = Lock.UPDATE;
    this.queryOptions.transaction = transaction;
    return this;
  }

  _resetQueryOptions() {
    this.queryOptions = {};
  }
}

export default new AccountRepository();
