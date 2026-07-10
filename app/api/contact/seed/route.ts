import dbConnect from "@/lib/dbConnect";
import { contactModel } from "@/models/contact";
import { contactsDataArray } from "@/staticData/Contact";
import { NextResponse } from "next/server";

async function seed() {
    try {
        await dbConnect();

        const operations = contactsDataArray.map((d) => ({
            updateOne: {
                filter: { name: d.name },
                update: {
                    $set: {
                        title: d.title,
                        department: d.department,
                        email: d.email,
                        name: d.name,
                        position: d.position,
                        phone: d.phone
                    }
                },
                upsert: true,
            },
        }));

        const result = await contactModel.bulkWrite(operations);

        return NextResponse.json({ ok: true, result });
    } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        return NextResponse.json({ ok: false, message }, { status: 500 });
    }
}

export async function GET(_request: Request) {
    void _request;
    return seed();
}

export async function POST(_request: Request) {
    void _request;
    return seed();
}
