import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { User } from '@/models/User';

const PREFIX: Record<string, string> = { student: 'ST', staff: 'EM' };

function pad(n: number) {
    return String(n).padStart(6, '0');
}

function buildCode(prefix: string, n: number) {
    return `${prefix}${pad(n)}`;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role') ?? 'student';
    const check = searchParams.get('check') ?? '';

    await dbConnect();

    const prefix = PREFIX[role] ?? 'ST';

    if (check) {
        const existing = await User.findOne({ accessCode: check }).lean();
        return NextResponse.json({ ok: true, available: !existing });
    }

    const allCodes = await User.find(
        { role, accessCode: { $regex: `^${prefix}\\d+$` } },
        { accessCode: 1 }
    ).lean();

    const nums = allCodes
        .map((u) => parseInt(((u as { accessCode?: string }).accessCode ?? '').slice(prefix.length), 10))
        .filter((n) => !Number.isNaN(n));

    const next = nums.length === 0 ? 1 : Math.max(...nums) + 1;
    return NextResponse.json({ ok: true, code: buildCode(prefix, next) });
}
