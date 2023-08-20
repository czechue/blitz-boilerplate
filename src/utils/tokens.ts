import { generateToken, hash256 } from '@blitzjs/auth'
import { addHours } from 'date-fns'
import db from '~/db'
import { TokenType } from '@prisma/client'

const EMAIL_VERIFY_LINK_IN_HOURS = 4

const createToken = async ({ userId, userEmail, tokenType }) => {
    const token = generateToken()
    const hashedToken = hash256(token)
    const expiresAt = addHours(new Date(), EMAIL_VERIFY_LINK_IN_HOURS)

    await db.token.create({
        data: {
            user: { connect: { id: userId } },
            type: tokenType,
            expiresAt,
            hashedToken,
            sentTo: userEmail,
        },
    })

    return token
}

export const regenerateToken = async ({
    userId,
    userEmail,
    tokenType,
}: {
    userId: string
    userEmail: string
    tokenType: TokenType
}): Promise<string> => {
    await db.token.deleteMany({
        where: { type: tokenType, userId },
    })

    const token = await createToken({
        userId,
        userEmail,
        tokenType,
    })

    return token
}
