import { describe, expect, it, vi } from "vitest";
import { AccountRepository } from "./repository";

const fakeAccount = (id: number, data?: Record<string, unknown>) => ({
  id,
  name: data?.name ?? "test",
  ...data
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

describe("AccountRepository", () => {
  it("get account by id", async () => {
    const repository = new AccountRepository();

    const account = await repository.get(1);

    expect(account?.id).toBe(1);
  });
  it("get multiple accounts", async () => {
    const repository = new AccountRepository();

    const accounts = await repository.getAll([1, 2]);

    expect(accounts.length).toBe(2);
  });
  it("create account", async () => {
    const repository = new AccountRepository();

    const account = await repository.createAccount({
      name: "james",
    });

    expect(account.name).toBe("james");
  });
  it("update balance", async () => {
    const repository = new AccountRepository();

    const account = {
      save: vi.fn(),
      balance: 0
    }

    // @ts-expect-error mock model
    await repository.updateBalance(account, 100);

    expect(account.save).toBeCalledTimes(1)
  });
});
