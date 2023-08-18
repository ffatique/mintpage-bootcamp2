import { AppProps } from 'next/app'
import '../styles/global.scss'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { ThirdwebProvider, coinbaseWallet, metamaskWallet, walletConnect } from "@thirdweb-dev/react"
import { Mumbai, Goerli } from "@thirdweb-dev/chains";
import { ThirdwebStorage, IpfsUploader, StorageDownloader } from "@thirdweb-dev/storage"

const gatewayUrls = {
  "ipfs://": [
    "https://gateway.ipfscdn.io/ipfs/",
    "https://cloudflare-ipfs.com/ipfs/",
    "https://ipfs.io/ipfs/",
  ],
};

const downloader = new StorageDownloader({});
const uploader = new IpfsUploader();
const storage = new ThirdwebStorage({ uploader, downloader, gatewayUrls });

export default function App({
  Component, pageProps: { session, ...pageProps }
}: AppProps) {
   return (
      <ThirdwebProvider
        supportedWallets={[
          metamaskWallet(),
          coinbaseWallet(),
          walletConnect({
            projectId: `${process.env.WALLETCONNECT_PROJECT_ID}`
          }),
        ]}
        clientId={`${process.env.THIRDWEB_CLIENT_ID}`}
        activeChain={ Mumbai }
        autoConnect={false}
        storageInterface={storage}
        >
        <ToastContainer autoClose={3000} />
        <Component {...pageProps}/>
      </ThirdwebProvider>
  )
}