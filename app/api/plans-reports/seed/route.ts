import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { PlansReportsModel } from "@/models/PlansReports";
import { plansReportsItems } from "@/staticData/plans-reports";

async function seed() {
  try {
    await dbConnect();
    await PlansReportsModel.findOneAndUpdate(
      {},
      {
        $set: {
          items: plansReportsItems.map((item, idx) => ({
            ...item,
            file: item.file || "",
            order: idx,
          })),
        },
      },
      { new: true, upsert: true },
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function GET() {
  return seed();
}

export async function POST() {
  return seed();
}
