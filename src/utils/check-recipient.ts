import * as fcl from "@onflow/fcl";

fcl
  .config()
  .put("discovery.wallet", process.env.NEXT_PUBLIC_DISCOVERY_WALLET ?? "")
  .put("accessNode.api", process.env.NEXT_PUBLIC_ACCESS_NODE_API ?? "")
  .put("0xFLOAT", process.env.NEXT_PUBLIC_FLOAT_ADDRESS ?? "")
  .put("0xFIND", process.env.NEXT_PUBLIC_FIND_ADDRESS ?? "")

export const validateRecipient = async (recipient: string, host: string, eventId: string) => {
  const checkClaimedFromAddress = `
  import FLOAT from 0xFLOAT
  
  pub fun main(hostAddress: Address, eventId: UInt64, accountAddress: Address): {String: AnyStruct} {
    let acct = getAuthAccount(accountAddress)
  
    // Check if FLOAT storage path exists
    if acct.borrow<&FLOAT.Collection>(from: FLOAT.FLOATCollectionStoragePath) == nil {
      return { "message": "You'll need to already have any float in order to claim this float", "ok": false}
    }
    let floatEventCollection = getAccount(hostAddress).getCapability(FLOAT.FLOATEventsPublicPath)
        .borrow<&FLOAT.FLOATEvents{FLOAT.FLOATEventsPublic}>()
        ?? panic("Could not borrow the FLOAT Events Collection from the account.")
    let floatEventPublic = floatEventCollection.borrowPublicEventRef(eventId: eventId)
  
    let claimed = floatEventPublic!.hasClaimed(account: accountAddress)
  
    // Check if FLOAT has been already claimed
    if claimed != nil {
      return { "message": "You'll only be able to claim this float once, thanks for trying again!", "ok": false, "claimed": claimed }
    }
    return { "message": "All systems go", "ok": true }
  }
  `

  const findMatcher = /^[a-z0-9-]{3,16}.find$/
  const walletAddressMatcher = /^0x[a-fA-F0-9]{16}$/g
  const noSpaces = recipient.replace(/\s/g, "");
  let addressToCheck = noSpaces
  
  if (findMatcher.test(noSpaces)) {
    console.log('Checking .find address')
    const code = `
      import FIND from 0xFIND
      pub fun main(name: String) : Address? {
          return FIND.lookupAddress(name)
      }
    `;
  
    addressToCheck = await fcl.query({
      cadence: code,
      args: (arg: any, t: any) => [
        arg(noSpaces, t.String),
      ],
    })
    if (addressToCheck === null) {
      return {
        ok: false,
        message: "No .find address found",
      }
    }
  }
  
  if (walletAddressMatcher.test(addressToCheck)) {
    console.log('Checking FLOATs')
    const result = await fcl.query({
      cadence: checkClaimedFromAddress,
      args: (arg: any, t: any) => [
        arg(host, t.Address),
        arg(eventId, t.UInt64),
        arg(addressToCheck, t.Address), 
  
      ],
    });
    return result
  }

  return {
    ok: false,
    message: "Invalid address",
  }
}