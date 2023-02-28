import CreatePaymentCard from '@/components/createPaymentCard'
import PaymentCard from '@/components/paymentCard'
import Button from '@/components/ui/CustomButton'
import Loader from '@/components/ui/Loader'
import useWindowSize from '@/hooks/useWindowSize'
import styles from '@/styles/Home.module.css'
import { NftType } from '@/types/nftType.type'
import { BigLogoIcon, HeartIcon, MainLogoIcon } from '@/utils/icons'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [step, setStep] = useState(1);
  const [nft, setNft] = useState<NftType | undefined>(undefined);
  const width = useWindowSize().width;
  const [createStep, setCreateStep] = useState(0);
  const [createFlowSelected, setCreateFlowSelected] = useState(false);

  const getNftDetail = () => {

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL ?? ""}project/136396920/nft-sale-details`, {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? ""
      }
    })
      .then(response => response.json())
      .then(data => { console.log(data); setNft(data); setStep(1) })
      .catch(error => console.error(error));
  }

  const scrollToNextViewHeight = () => {
    const element = document.getElementById("paymentCardSection");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }
  }

  const openWaitlistForm = () => {
    window.open('https://forms.gle/YEgjp5wNJH4JXrty7', '_blank');
  }


  useEffect(() => {
    getNftDetail();
  }, [])

  return (
    <>
      <Head>
        <title>PayGlide Demo</title>
        <meta name="description" content="Freedom of Payments" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.bgContainer}>
            <div className={styles.TitleSection}>
              <div className={styles.textContainer}>
                <MainLogoIcon width={width < 551 ? 180 : 206} height={50} style={{ marginBottom: "3rem" }} />
                <p className={styles.mainTitle}>FrEEDOM OF PayMENTS</p>
                <p className={[styles.mainTitleDescription, styles.gradientText].join(" ")}>PayGlide enables direct fiat to NFT payments onFLOW blockchain</p>
                <div className={styles.btnContainer}>
                  <div className={styles.firstHomeBtn}>
                    <Button
                      color="white"
                      onClick={openWaitlistForm}
                      width="230px"
                      height="52px"
                      fontSize={20}
                      fontWeight={300}
                      bgColor='transparent'
                      text={"JOIN WAITLIST"}
                      border="1px solid white"
                      borderRadius={30}
                    ></Button>
                  </div>
                  <div>
                    <Button
                      color="white"
                      onClick={() => { scrollToNextViewHeight() }}
                      width="230px"
                      height="52px"
                      borderRadius={30}
                      fontSize={20}
                      fontWeight={300}
                      bgColor='#BF3DDB'
                      text={"TRY DEMO"}
                    ></Button>
                  </div>
                </div>
                <BigLogoIcon width={width < 1300 ? 400 : 490} height={width < 1300 ? 310 : 400} className={styles.animatedIcon} />

              </div>
              {width > 551 && (
                <div className={styles.bottomSection}>
                  <div style={{ marginRight: 50, display: "flex", flexDirection: "row" }}>
                    <p className={[styles.bottomSectionTitle, styles.gradientText].join(" ")}  >Made with </p>
                    <HeartIcon width={19} height={19} style={{ margin: "0 1rem" }} />
                    <p className={[styles.bottomSectionTitle, styles.gradientText].join(" ")}  >by PayGlide</p>
                  </div>
                  <div style={{ marginRight: 50 }}>
                    <p className={styles.bottomSectionTitle}>Privacy Policy</p>
                  </div>
                  <div>
                    <a href='mailto:daniel@eucleides.com' className={styles.bottomSectionTitle}>Get in touch</a>
                  </div>
                </div>
              )}
            </div>
            {(!!nft) && !createFlowSelected && (
              <div className={styles.paymentCardSection} id="paymentCardSection">
                <div className={styles.scrollContainer}>
                  <p className={styles.demoText} style={{ color: "white" }}>Testnet Demo</p>
                  <PaymentCard step={step} onStepChange={setStep} nft={nft} />

                  {width < 551 && (
                    <div className={styles.bottomSection}>
                      <div style={{ marginRight: 50 }}>
                        <p className={styles.bottomSectionTitle}>Privacy Policy</p>
                      </div>
                      <div>
                        <p className={styles.bottomSectionTitle}>PayGlide © 2022</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className={styles.bottomSectionBtn}>
                  <Button
                    color="white"
                    onClick={() => { setCreateFlowSelected(true) }}
                    width={width < 1300 ? "90%" : "65%"}
                    height="60px"
                    borderRadius={30}
                    fontSize={20}
                    fontWeight={500}
                    bgColor='#BF3DDB'
                    text={"CREATE CHECKOUT"}
                  ></Button>
                </div>
              </div>
            )}
            {createFlowSelected && (
              <div className={styles.paymentCardSection} id="paymentCardSection">
                <div className={styles.scrollContainer}>

                  <p className={styles.demoText} style={{ color: "white" }}>Testnet Demo</p>
                  <CreatePaymentCard step={createStep} onStepChange={setCreateStep} />

                </div>
                <div className={styles.bottomSectionBtn}>
                  <Button
                    color="white"
                    onClick={() => { setCreateFlowSelected(false) }}
                    width={width < 1300 ? "90%" : "65%"}
                    height="60px"
                    borderRadius={30}
                    fontSize={20}
                    fontWeight={500}
                    bgColor='#BF3DDB'
                    text={"EXIT"}
                  ></Button>
                </div>
                {width < 551 && (
                  <div className={styles.bottomSection} style={{ flexDirection: "column", alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <p className={[styles.bottomSectionTitle, styles.gradientText].join(" ")}  >Made with </p>
                      <HeartIcon width={19} height={19} style={{ margin: "0 1rem" }} />
                      <p className={[styles.bottomSectionTitle, styles.gradientText].join(" ")}  >by PayGlide</p>
                    </div>
                    <div>
                      <p className={styles.bottomSectionTitle}>Privacy Policy</p>
                    </div>
                    <div>
                      <a href='mailto:daniel@eucleides.com' className={styles.bottomSectionTitle}>Get in touch</a>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </main>
    </>
  )
}
