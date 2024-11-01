import { AccountCreated } from "base/events";
import Account from "features/accounts/model";
import eventServer from "lib/event/event.server";
import logger from "lib/logger";

export async function boot() {
  eventServer.subscribe(AccountCreated, (account: Account) => {
    logger.log(`New account ${account.name}<ID: ${account.id}> created at ${new Date().toISOString()}`)
  })
}