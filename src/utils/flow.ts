import * as fcl from '@onflow/fcl'
import { adminAuthorizationFunction } from './authz-functions'
import WALLETLESS_FLOATS from './cadence/walletless-floats'
import GET_CHILD_ADDRESS_FROM_PUBLIC_KEY_ON_CREATOR from './cadence/get-child-address-from-public-key-on-creator'

export async function createChildAccount(publicKeyHex: string): Promise<string> {
  
  const response = await fcl.mutate({
    cadence: WALLETLESS_FLOATS,
    args: (arg: any, t: any) => [
      arg(publicKeyHex, t.String),
      arg('0.1', t.UFix64),
      arg('PayGlide Proxy Account', t.String),
      arg('', t.String),
      arg('demo.payglide.xyz/payglide.png', t.String),
      arg('demo.payglide.xyz', t.String),
    ],
    payer: adminAuthorizationFunction,
    proposer: adminAuthorizationFunction,
    authorizations: [adminAuthorizationFunction],
    limit: 9999,
  })
  const txResult = await fcl.tx(response).onceSealed()
  console.log(txResult)
  fcl.config().put("0xChildAccount", process.env.NEXT_PUBLIC_CHILDACCT_ADDRESS ?? "")
  const adminAddress = process.env.NEXT_PUBLIC_ADMIN_ADDRESS || ''
  const result = await fcl.query({
    cadence: GET_CHILD_ADDRESS_FROM_PUBLIC_KEY_ON_CREATOR,
    args: (arg: any, t: any) => [
      arg(adminAddress, t.Address),
      arg(publicKeyHex, t.String),
    ]
  })
  return result
}
