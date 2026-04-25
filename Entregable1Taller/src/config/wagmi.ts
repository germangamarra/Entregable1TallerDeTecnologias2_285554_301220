import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Entregable Web3',
  projectId: 'demo',
  chains: [sepolia],
});