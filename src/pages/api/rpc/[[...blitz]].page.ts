import { rpcHandler } from '@blitzjs/rpc'
import { api } from 'src/blitz-server'
import { errorFormatter } from '@/utils/errorFormatter'

export default api(
    rpcHandler({
        formatError: errorFormatter,
        onError: console.log,
    })
)
