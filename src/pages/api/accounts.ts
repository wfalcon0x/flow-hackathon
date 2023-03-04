import { type NextApiRequest, type NextApiResponse } from 'next'
import { generateKeys } from '../../utils/crypto'
import { createChildAccount } from '../../utils/flow'
import { loadFCLConfig } from '../../utils/fcl-setup'
import { createServerSupabaseClient, Session, SupabaseClient } from '@supabase/auth-helpers-nextjs'
loadFCLConfig()

const getOrCreateAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET requests allowed' })
    return
  }
  try {
    const supabase = createServerSupabaseClient({ req, res })

    const {
      data: { session },
    } = await supabase.auth.getSession()
    console.log(session)
    if (!session)
    return res.status(401).json({
      error: 'not_authenticated',
      description:
        'The user does not have an active session or is not authenticated'
    })

    let { error, data } = await supabase
      .from('users').select('*').eq('id', session?.user.id).limit(1).single()
    if (error) {
      console.log({ error })
      // there is probably no user yet
    }
    console.log({ data })
    if (data) {
      return res.status(200).json({
        publicKey: data.publicKey,
        address: data.address,
      })
    }

    const generated = await generateAccount(supabase, session)

    res.status(200).json(generated)
    return
  } catch (error) {
    console.log(error)
    const message = (error as Error).message
    console.log(message)
    res.status(500).json({
      error: message,
    })
  }
}

const generateAccount = async (supabase: SupabaseClient<any, "public", any>, session: Session) => {
  const keys = await generateKeys()
  const address = await createChildAccount(keys.publicKey)

  const updates = {
    id: session?.user.id,
    address,
    email: session?.user.email,
    public_key: keys.publicKey,
    private_key: keys.privateKey,
    key_id: '0',
    updated_at: new Date(),
  }

  let { error } = await supabase.from('users').upsert(updates)

  if (error) {
    throw error
  }
  return {
    publicKey: keys.publicKey,
    address,
  }
}

export default getOrCreateAccount
