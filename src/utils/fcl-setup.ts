import * as fcl from '@onflow/fcl'

export const loadFCLConfig = () => {
  fcl
    .config({
      'flow.network': process.env.NEXT_PUBLIC_FLOW_NETWORK as fcl.Environment,
      'accessNode.api': process.env.NEXT_PUBLIC_ACCESS_NODE_API || '',
      'discovery.wallet': process.env.NEXT_PUBLIC_DISCOVERY_WALLET || '',
      'app.detail.icon': process.env.NEXT_PUBLIC_ICON_URL || '/payglide.png',
      'app.detail.title': process.env.NEXT_PUBLIC_APP_NAME || 'PayGlide'
    })
}
