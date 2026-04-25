import { formatUnits } from 'viem'
import { useAccount, useReadContracts } from 'wagmi'

const erc20Abi = [
  {
    name: 'name',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'string' }],
  },
  {
    name: 'symbol',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'string' }],
  },
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint8' }],
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ type: 'uint256' }],
  },
] as const

const tokens = [
  {
    address: '0xdd13E55209Fd76AfE204dBda4007C227904f0a81', // WETH
  },
  {
    address: '0x779877A7B0D9E8603169DdbD7836e478b4624789', // LINK
  },
]as const

export function TokenBalances() {
  const { address } = useAccount()

  const contracts = tokens.flatMap((token) => [
    {
      address: token.address,
      abi: erc20Abi,
      functionName: 'name',
    },
    {
      address: token.address,
      abi: erc20Abi,
      functionName: 'symbol',
    },
    {
      address: token.address,
      abi: erc20Abi,
      functionName: 'decimals',
    },
    {
      address: token.address,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: address ? [address] : undefined,
    },
  ])

  const { data, isLoading, error } = useReadContracts({
    contracts,
    query: {
      enabled: Boolean(address),
    },
  })

  if (!address) {
    return null
  }

  if (isLoading) {
    return <p>Cargando tokens...</p>
  }

  if (error) {
    return <p>Error cargando tokens.</p>
  }

  return (
    <section>
      <h2>Saldos de Tokens</h2>

      {tokens.map((token, index) => {
        const baseIndex = index * 4

        const name = data?.[baseIndex]?.result as string | undefined
        const symbol = data?.[baseIndex + 1]?.result as string | undefined
        const decimals = data?.[baseIndex + 2]?.result as number | undefined
        const balance = data?.[baseIndex + 3]?.result as bigint | undefined

        const formattedBalance =
          balance !== undefined && decimals !== undefined
            ? formatUnits(balance, decimals)
            : '0'

        return (
          <div key={token.address}>
            <h3>{name ?? 'Token'}</h3>
            <p>
              <strong>Símbolo:</strong> {symbol ?? '-'}
            </p>
            <p>
              <strong>Saldo:</strong> {Number(formattedBalance).toFixed(4)}{' '}
              {symbol ?? ''}
            </p>
            <p>
              <strong>Contrato:</strong> {token.address}
            </p>
          </div>
        )
      })}
    </section>
  )
}