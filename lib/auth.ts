import { JWTPayload, SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

function getSecretKey() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('Invalid/Missing environment variable: "JWT_SECRET"');
    }
    return new TextEncoder().encode(secret);
}

export type SessionPayload = {
    userId: string;
    email: string;
    role?: string;
    expires?: string | Date;
};

// export async function encrypt(payload: JWTPayload | undefined) {
//     return await new SignJWT(payload)
//         .setProtectedHeader({ alg: 'HS256' })
//         .setIssuedAt()
//         .setExpirationTime('2h') // Token expires in 2 hours
//         .sign(getSecretKey());
// }

// export async function decrypt(input: string): Promise<JWTPayload> {
//     const { payload } = await jwtVerify(input, getSecretKey(), {
//         algorithms: ['HS256'],
//     });
//     return payload;
// }

export async function encrypt(payload: JWTPayload | undefined) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(getSecretKey());
}

export async function decrypt(input: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(input, getSecretKey(), {
        algorithms: ['HS256'],
    });
    return payload;
}

export async function getSession(): Promise<SessionPayload | null> {
    const token = (await cookies()).get('session')?.value;
    if (!token) return null;

    if (!process.env.JWT_SECRET) return null;

    try {
        const payload = await decrypt(token);
        const userId = payload.userId;
        const email = payload.email;

        if (typeof userId !== 'string' || typeof email !== 'string') return null;

        const rawExpires = payload.expires;
        const expires =
            typeof rawExpires === 'string' || rawExpires instanceof Date ? rawExpires : undefined;

        const role = typeof payload.role === 'string' ? payload.role : undefined;

        return { userId, email, role, expires };
    } catch {
        return null;
    }
}

export async function clearSession() {
    (await cookies()).set('session', '', { expires: new Date(0) });
}