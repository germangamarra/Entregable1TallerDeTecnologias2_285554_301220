import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { AccountPanel } from './components/AccountPanel'
import { TokenBalances } from './components/TokenBalances'
function App() {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <main style={{ padding: 40 }}>
        <ConnectButton />
      </main>
    )
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Web3 App</h1>
      <ConnectButton />

      <AccountPanel />
      <TokenBalances />
    </main>
  )
}

export default App