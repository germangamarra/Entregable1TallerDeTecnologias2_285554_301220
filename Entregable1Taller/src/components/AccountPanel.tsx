import { useAccount, useBalance, useBlockNumber, useEnsName } from 'wagmi'

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function AccountPanel() {
  const { address } = useAccount()

  const { data: ensName } = useEnsName({
    address,
  })

  const { data: balance } = useBalance({
    address,
  })

  const { data: blockNumber } = useBlockNumber({
    watch: true,
  })

  if (!address) {
    return null
  }

  const formattedBalance = balance
    ? Number(balance.formatted).toFixed(4)
    : '0.0000'

  return (
    <section>
      <h2>Panel de Cuenta</h2>

      <p>
        <strong>Cuenta:</strong> {ensName ?? shortenAddress(address)}
      </p>

      <p>
        <strong>Saldo:</strong> {formattedBalance} ETH
      </p>

      <p>
        <strong>Bloque actual:</strong> {blockNumber?.toString() ?? 'Cargando...'}
      </p>
    </section>
  )
}