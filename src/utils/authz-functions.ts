import type { AuthorizationObject } from '@onflow/fcl'
import { sign } from './crypto'

export function adminAuthorizationFunction(account: any): AuthorizationObject {
  const address = process.env.NEXT_PUBLIC_ADMIN_ADDRESS
  const keyIndex = process.env.NEXT_PUBLIC_ADMIN_KEY_INDEX
  return {
    ...account,
    tempId: `${address}-${keyIndex}`,
    addr: address,
    keyId: Number(keyIndex),
    signingFunction: async (signable: any) => {
      const privateKey = process.env.ADMIN_PRIVATE_KEY_HEX as string

      const signature = await sign(signable.message, privateKey)

      return {
        addr: address,
        keyId: Number(keyIndex),
        signature,
      }
    },
  }
}
