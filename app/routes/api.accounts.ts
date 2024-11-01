import { ActionFunctionArgs } from "@remix-run/node"
import { json } from "@remix-run/react"
import { AccountRepository } from "features/accounts/repository"
import service from "features/accounts/service"

export async function loader () {
  const repo = new AccountRepository()
  return json(await repo.getAll())
}

export async function action ({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return json({
      message: "Method not allowed"
    }, 405)
  }

  const { name, balance } = await request.json()

  const account = await service.create(name, balance)

  return json(account, 201)
}