import { ActionFunctionArgs, json } from "@remix-run/node";
import sequelize from "db/config";
import service from "features/accounts/service";

export async function action({ request, params }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({
      message: "Method not allowed",
    }, 405);
  }
  const id = Number(params.id);
  const { amount } = await request.json();

  try {
    const result = await sequelize.transaction(async (t) => {
      let account = await service.repository.lockForUpdate(t).get(id);
      if (!account) {
        throw new Error("Invalid account id");
      }
      account = await service.deposit(account, Number(amount));
      return account;
    });
    return json(result, 201);
  } catch (err: unknown) {
    console.error(err);
    let errorMsg = "Unknown Error";
    if (err instanceof Error) {
      errorMsg = err.message;
    }
    return json({ error: errorMsg }, 404);
  }
}
