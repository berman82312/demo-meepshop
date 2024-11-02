import { describe, expect, it, vi } from "vitest";
import { AccountService } from "./service";
import { AccountRepository } from "./repository";

const fakeAccount = (id: number, data?: Record<string, unknown>) => ({
  id,
  name: data?.name ?? "test",
  save: vi.fn(),
  ...data,
});

vi.mock("./model", () => {
  return {
    default: {
      findByPk: async () => fakeAccount(1),
      findAll: async () => [fakeAccount(1), fakeAccount(2)],
      create: async (data: Record<string, unknown>) => fakeAccount(1, data),
    },
  };
});

describe("AccountService", () => {
  it("create account", async () => {
    const service = new AccountService(new AccountRepository());

    const account = await service.create("John");

    expect(account?.name).toBe("John");
  });
  it("deposit to account", async () => {
    const service = new AccountService(new AccountRepository());

    const account = fakeAccount(1, {balance: 0})

    // @ts-expect-error fake account
    await service.deposit(account, 100);

    // @ts-expect-error fake account
    expect(account.balance).toBe(100);
    expect(account.save).toBeCalledTimes(1);
  });
  it("withdraw from account", async () => {
    const service = new AccountService(new AccountRepository());

    const account = fakeAccount(1, {balance: 100})

    // @ts-expect-error fake account
    await service.withdraw(account, 25);

    // @ts-expect-error fake account
    expect(account.balance).toBe(75);
    expect(account.save).toBeCalledTimes(1);
  });
  it("transfer between accounts", async () => {
    const service = new AccountService(new AccountRepository());

    const account1 = fakeAccount(1, {balance: 100})
    const account2 = fakeAccount(2, {balance: 25})

    // @ts-expect-error fake account
    await service.transfer(account1, account2, 50);

    // @ts-expect-error fake account
    expect(account1.balance).toBe(50);
    expect(account1.save).toBeCalledTimes(1);
    // @ts-expect-error fake account
    expect(account2.balance).toBe(75);
    expect(account2.save).toBeCalledTimes(1);
  });
});
