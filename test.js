// const config = require('./src/lib/wagamiConfig')

import config  from './src/lib/wagamiConfig'

await waitForTransactionReceipt(config, {
    chainId: 997,
    hash: '0x6a720639c2c755e9e831fa4fb5bff09de413d026adb622e5d3c16f5c2832811e',
})