import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { DepartmentModel } from "@/models/Department";
import { DepartmentStudyPlan } from "@/types/department";

// PUT - Update study plan for a specific level
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ domain: string; programId: string }> }
) {
    try {
        const session = await getSession();
        const { domain, programId } = await params;

        // Check admin
        const raw = process.env.ADMIN_EMAILS || "";
        const allowed = raw
            .split(",")
            .map((email) => email.trim().toLowerCase())
            .filter(Boolean);
        const isAdmin =
            allowed.length === 0 ||
            (session?.email ? allowed.includes(session.email.toLowerCase()) : false);

        if (!isAdmin) {
            return NextResponse.json(
                { ok: false, message: "Unauthorized" },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { id, PlanHeader, generalRequirements, departmentRequirements, majorRequirements, electiveRequirements } = body;

        if (!id) {
            return NextResponse.json(
                { ok: false, message: "Study plan ID is required" },
                { status: 400 }
            );
        }

        await dbConnect();

        const studyPlanData: Partial<DepartmentStudyPlan> = {
            id,
            PlanHeader: PlanHeader || { title: "" },
            generalRequirements: generalRequirements || [],
            departmentRequirements: departmentRequirements || [],
            majorRequirements: majorRequirements || [],
            electiveRequirements: electiveRequirements || [],
        };

        // Find the department and program
        const department = await DepartmentModel.findOne({ domain });
        if (!department) {
            return NextResponse.json(
                { ok: false, message: "Department not found" },
                { status: 404 }
            );
        }

        const program = department.programs.find((p: { id: string }) => p.id === programId);
        if (!program) {
            return NextResponse.json(
                { ok: false, message: "Program not found" },
                { status: 404 }
            );
        }

        // Check if study plan exists for this level
        const existingPlanIndex = program.studyPlan?.findIndex((sp: { id: string }) => sp.id === id);

        if (existingPlanIndex >= 0) {
            // Update existing study plan
            program.studyPlan[existingPlanIndex] = studyPlanData;
        } else {
            // Add new study plan
            if (!program.studyPlan) {
                program.studyPlan = [];
            }
            program.studyPlan.push(studyPlanData);
        }

        await department.save();

        return NextResponse.json({ ok: true, message: "Study plan updated successfully" });
    } catch (error) {
        console.error("Error updating study plan:", error);
        return NextResponse.json(
            { ok: false, message: "Failed to update study plan" },
            { status: 500 }
        );
    }
}
