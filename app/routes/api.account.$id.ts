import { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/react";
import { AccountRepository } from "features/accounts/repository";

export async function loader({ params }: LoaderFunctionArgs) {
  const repo = new AccountRepository();
  return json(await repo.get(Number(params.id)));
}
