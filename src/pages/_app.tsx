import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  WagmiConfig,
  createConfig,
  configureChains,
  mainnet,
  PublicClient,
} from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const { chains, publicClient } = configureChains(
  [mainnet],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: "https://responsive-lively-brook.quiknode.pro/4bc6ee0cd8f90e1457df450bc756c10547be2f32",
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT as string,
  chains,
});

const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
