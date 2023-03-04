const WALLETLESS_FLOATS = `
import FLOAT from 0x0afe396ebc8eee65
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetadataViews from 0x631e88ae7f1d7c20
import GrantedAccountAccess from 0x0afe396ebc8eee65
import ChildAccount from 0x1b655847a90e644a

transaction(
  pubKey: String,
  fundingAmt: UFix64,
  childAccountName: String,
  childAccountDescription: String,
  clientIconURL: String,
  clientExternalURL: String
) {

  prepare(signer: AuthAccount) {
    // Save a ChildAccountCreator if none exists
    if signer.borrow<&ChildAccount.ChildAccountCreator>(from: ChildAccount.ChildAccountCreatorStoragePath) == nil {
      signer.save(<-ChildAccount.createChildAccountCreator(), to: ChildAccount.ChildAccountCreatorStoragePath)
    }
    // Link the public Capability so signer can query address on public key
    if !signer.getCapability<
        &ChildAccount.ChildAccountCreator{ChildAccount.ChildAccountCreatorPublic}
      >(ChildAccount.ChildAccountCreatorPublicPath).check() {
      // Unlink & Link
      signer.unlink(ChildAccount.ChildAccountCreatorPublicPath)
      signer.link<
        &ChildAccount.ChildAccountCreator{ChildAccount.ChildAccountCreatorPublic}
      >(
        ChildAccount.ChildAccountCreatorPublicPath,
        target: ChildAccount.ChildAccountCreatorStoragePath
      )
    }
    // Get a reference to the ChildAccountCreator
    let creatorRef = signer.borrow<&ChildAccount.ChildAccountCreator>(
        from: ChildAccount.ChildAccountCreatorStoragePath
      ) ?? panic("Problem getting a ChildAccountCreator reference!")
    // Construct the ChildAccountInfo metadata struct
    let info = ChildAccount.ChildAccountInfo(
        name: childAccountName,
        description: childAccountDescription,
        clientIconURL: MetadataViews.HTTPFile(url: clientIconURL),
        clienExternalURL: MetadataViews.ExternalURL(clientExternalURL),
        originatingPublicKey: pubKey
      )
    // Create the account, passing signer AuthAccount to fund account creation
    // and add initialFundingAmount in Flow if desired
    let newAccount: AuthAccount = creatorRef.createChildAccount(
        signer: signer,
        initialFundingAmount: fundingAmt,
        childAccountInfo: info
      )
    // At this point, the newAccount can further be configured as suitable for
    // use in your dApp (e.g. Setup a Collection, Mint NFT, Configure Vault, etc.)
    // ...


    // SETUP COLLECTION
    if newAccount.borrow<&FLOAT.Collection>(from: FLOAT.FLOATCollectionStoragePath) == nil {
      newAccount.save(<- FLOAT.createEmptyCollection(), to: FLOAT.FLOATCollectionStoragePath)
      newAccount.link<&FLOAT.Collection{NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection, FLOAT.CollectionPublic}>
                (FLOAT.FLOATCollectionPublicPath, target: FLOAT.FLOATCollectionStoragePath)
    }

    // SETUP FLOATEVENTS
    if newAccount.borrow<&FLOAT.FLOATEvents>(from: FLOAT.FLOATEventsStoragePath) == nil {
      newAccount.save(<- FLOAT.createEmptyFLOATEventCollection(), to: FLOAT.FLOATEventsStoragePath)
      newAccount.link<&FLOAT.FLOATEvents{FLOAT.FLOATEventsPublic, MetadataViews.ResolverCollection}>
                (FLOAT.FLOATEventsPublicPath, target: FLOAT.FLOATEventsStoragePath)
    }

    // SETUP SHARED MINTING
    if newAccount.borrow<&GrantedAccountAccess.Info>(from: GrantedAccountAccess.InfoStoragePath) == nil {
      newAccount.save(<- GrantedAccountAccess.createInfo(), to: GrantedAccountAccess.InfoStoragePath)
      newAccount.link<&GrantedAccountAccess.Info{GrantedAccountAccess.InfoPublic}>
                (GrantedAccountAccess.InfoPublicPath, target: GrantedAccountAccess.InfoStoragePath)
    }
  }

  execute {
    log("Finished setting up the account for FLOATs.")
  }
}
`

export default WALLETLESS_FLOATS
