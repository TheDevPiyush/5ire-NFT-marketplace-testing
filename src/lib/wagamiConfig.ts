import { http, createConfig } from 'wagmi'

// 5ire Testnet Config

const _5ireTestnetConfig = {
    id: 997,
    name: 'T5IRE',
    network: '5ireChain Thunder Testnet',
    nativeCurrency: {
        name: 'T5IRE',
        symbol: 'T5IRE',
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ['https://rpc.testnet.5ire.network'] },
    },
    blockExplorers: {
        default: { name: '5irechain Explorer', url: 'https://testnet.5irescan.io' },
    },
    testnet: true,
}

// 5ire Mainnet Config

const _5ireMainnetConfig = {
    id: 995,
    name: '5ireChain',
    network: '5ireChain Mainnet',
    nativeCurrency: {
        name: '5IRE',
        symbol: '5IRE',
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ['https://rpc.5ire.network'] },
    },
    blockExplorers: {
        default: { name: '5irechain Explorer', url: 'https://5irescan.io' },
    },
    testnet: false,
}

// Initialiase the Configs into Wagami

export const config = createConfig({
    chains: [_5ireTestnetConfig, _5ireMainnetConfig],
    transports: {
        [_5ireTestnetConfig.id]: http(_5ireTestnetConfig.rpcUrls.default.http[0]),
        [_5ireMainnetConfig.id]: http(_5ireMainnetConfig.rpcUrls.default.http[0]),
    },
})