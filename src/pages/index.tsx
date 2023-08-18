import Head from 'next/head'
import styles from '../styles/home.module.scss'
import { useState } from 'react'
import { ConnectWallet, useAddress, useSwitchChain, useNetworkMismatch, ChainId, useContract, MediaRenderer, useNFT, useChainId, useSDK, useActiveClaimCondition, useActiveClaimConditionForWallet, Web3Button, useContractMetadata } from "@thirdweb-dev/react"
import { toast } from 'react-toastify'
import { ethers } from 'ethers'
import Image from 'next/image'
import logo from '../../public/images/logo.png.webp'

export default function Home(){
  const address = useAddress()
  const switchChain = useSwitchChain()
  const isMismatched = useNetworkMismatch()
  const [amount, setAmount] = useState(1)

  // Campos a Serem Personalizados
  const nameProjet = "BootCamp2 iBEED"  // Nome do seu Projeto
  const contractAddress = "0x921935fae56B1DeA16cC109315474c1Ea08cB2D0"// Endereço do Contrato

  const { contract } = useContract(contractAddress)
  const { data: activeClaimCondition, isLoading: activeIsLoadingFirst, error: ClaimConditionError } = useActiveClaimCondition(contract);
  const { data: activeClaimConditionForWallet, isLoading: activeIsLoading, error } = useActiveClaimConditionForWallet(contract, `${address}`);
  const { data: contractMetadata, isLoading: metaDataIsLoading } = useContractMetadata(contract);

  console.log(contractMetadata)

  return (
    <div className={styles.container}>
      <Head>
        <title>{nameProjet}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta content="#000000" name="theme-color"></meta>
      </Head>
      
      <main className={styles.mainContainer}>
        <Image src={logo} alt="Logo iBEED"/>

        <div className={styles.claimContainer}>
          <div className={styles.infoContainer}>

           

            {metaDataIsLoading?

              <div className={styles.loading}>
                <svg className={styles.spinner} width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                  <circle className={styles.path} fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
                </svg>
              </div> 

            : 
              <>
                <MediaRenderer 
                  src={`${contractMetadata?.image}`}
                  alt="NFT Imagem"
                  className={styles.media}
                />

                <p>{contractMetadata?.name}</p>
                <span>{contractMetadata?.description}</span>
              </>
            }            
 
            
            <div className={styles.mintContainer}>
              <input inputMode="decimal" autoComplete="off" autoCorrect="off" type="number" min="0" step="1" pattern="^[0-9]*[.,]?[0-9]*$" placeholder="1" spellCheck="false" value={amount} onChange={(e) => setAmount(e.target.valueAsNumber)}></input>
              
              {address?
              <>
                {activeIsLoadingFirst?
                  <button>
                    <div className={styles.loading}>
                      <svg className={styles.spinner} width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                        <circle className={styles.path} fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
                      </svg>
                    </div> 
                  </button>
                  :
                  <>
                    {activeClaimCondition !== undefined ?
                    <>
                      {activeIsLoading?
                        <button>
                          <div className={styles.loading}>
                            <svg className={styles.spinner} width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                              <circle className={styles.path} fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
                            </svg>
                          </div> 
                        </button>
                      :
                      <>
                        {isMismatched? 
                          <button onClick={ () => switchChain(80001)} id={styles.max}>Mumbai</button>
                        :                   
                          <Web3Button
                            contractAddress={contractAddress}
                              action={(contract) => contract.erc721.claim(amount).then((nft: any) =>{
                                toast('Parabéns NFT Mintado')
                              }).catch((error: any) =>{
                                toast.error(`Falha ao mintar seu NFT`)
                              })
                            }
                            >Mint {activeIsLoading ? <></> : `/ ${(ethers.utils.formatUnits(activeClaimConditionForWallet!.price))} MATIC`} 
                            </Web3Button>
                          }
                        </>
                        }
                      </>
                    :
                    <button id={styles.max}>Não Disponível</button>
                    }
                  </>
                  }
                
              </>
              :
                <ConnectWallet className={styles.max} btnTitle='Wallet'/>
              }
            </div>
          </div>
        </div>

        <footer>
          <p>Copyrights © {nameProjet} 2023</p>
        </footer>
      </main>      
    </div>
  )
}
