import { http, createConfig } from 'wagmi'


const _5irechainTestnetConfig = {
    id: 997,
    name: '5ire Testnet',
    network: '5irechain',
    nativeCurrency: {
        name: 'T5ire',
        symbol: 'T5IRE',
        decimals: 18,
    },
    rpcUrls: {
        default: 'https://rpc.testnet.5ire.network',
    },
    blockExplorers: {
        default: { name: '5irechain Explorer', url: 'https://testnet.5irescan.io' },
    },
    testnet: false,
}
const _5irechainMainNetConfig = {
    id: 995,
    name: '5ireChain',
    network: '5irechain',
    nativeCurrency: {
        name: '5ire',
        symbol: '5IRE',
        decimals: 18,
    },
    rpcUrls: {
        default: 'https://rpc.5ire.network',
    },
    blockExplorers: {
        default: { name: '5irechain Explorer', url: 'https://5irescan.io' },
    },
    testnet: false,
}

export const config = createConfig({
    chains: [_5irechainTestnetConfig, _5irechainMainNetConfig],
    transports: {
        [_5irechainTestnetConfig.id]: http(_5irechainTestnetConfig.rpcUrls.default),
        [_5irechainMainNetConfig.id]: http(_5irechainMainNetConfig.rpcUrls.default),
    },
})