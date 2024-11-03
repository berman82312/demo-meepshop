import { ActionFunctionArgs, json } from "@remix-run/node";
import sequelize from "db/config";
import service from "features/accounts/service";
import { getLogger } from "lib/logger";

export async function action({ request, params }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({
      message: "Method not allowed",
    }, 405);
  }

  const fromId = Number(params.id);
  const { id: toId, amount } = await request.json();

  try {
    const result = await sequelize.transaction(async (t) => {
      const accounts = await service.repository.lockForUpdate(t).getAll(
        [fromId, toId],
      );

      if (accounts.length !== 2) {
        throw new Error("Invalid account IDs");
      }

      const fromAccount = accounts.find((account) => account.id === fromId);
      const toAccount = accounts.find((account) => account.id === toId);

      if (!fromAccount || !toAccount) {
        throw new Error("Invalid account IDs");
      }

      const [newFromAccount, newToAccount] = await service.transfer(
        fromAccount,
        toAccount,
        Number(amount),
      );

      return [newFromAccount, newToAccount];
    });

    const fromAccount = result[0];
    const toAccount = result[1];

    const logger = getLogger();
    logger.log(
      `${fromAccount.name}<ID: ${fromAccount.id}> transfer ${amount} to ${toAccount.name}<ID: ${toAccount.id}>`,
    );

    return json({
      fromAccount,
      toAccount,
      amount,
    }, 200);
  } catch (err: unknown) {
    console.error(err);

    let errorMsg = "Unknown Error";

    if (err instanceof Error) {
      errorMsg = err.message;
    }

    return json({ error: errorMsg }, 404);
  }
}
