import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";
import { encrypt } from "@/lib/auth";

function getAdminEmails() {
  const raw = process.env.ADMIN_EMAILS || "";
  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

function shouldUseSecureCookies(request: Request) {
  if (process.env.AUTH_COOKIE_SECURE === "false") return false;
  if (process.env.AUTH_COOKIE_SECURE === "true") return true;
  if (process.env.NODE_ENV !== "production") return false;
  return request.headers.get("x-forwarded-proto") === "https";
}

export async function POST(request: Request) {
  await dbConnect();

  const body = (await request.json()) as {
    email?: string;
    accessCode?: string;
    password?: string;
  };

  const password = body.password || "";
  const accessCode = (body.accessCode || "").trim();
  const email = (body.email || "").trim().toLowerCase();

  if (accessCode) {
    if (!password) {
      return NextResponse.json(
        { ok: false, message: "Missing password" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ accessCode });
    if (!user?.password) {
      return NextResponse.json(
        { ok: false, message: "Invalid access code or password" },
        { status: 401 },
      );
    }

    const passwordOk = await bcrypt.compare(password, user.password);
    if (!passwordOk) {
      return NextResponse.json(
        { ok: false, message: "Invalid access code or password" },
        { status: 401 },
      );
    }

    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const userEmail = (user.email as string | undefined) || accessCode;
    const session = await encrypt({ userId: user._id.toString(), email: userEmail, role: (user as { role?: string }).role || "student", expires });

    const res = NextResponse.json({ ok: true, role: (user as { role?: string }).role || "student" });
    res.cookies.set("session", session, {
      expires,
      httpOnly: true,
      secure: shouldUseSecureCookies(request),
      sameSite: "lax",
    });

    return res;
  }

  if (!email || !password) {
    return NextResponse.json(
      { ok: false, message: "Missing email or password" },
      { status: 400 },
    );
  }

  const adminEmails = getAdminEmails();
  const adminAllowed = adminEmails.length === 0 || adminEmails.includes(email);
  if (!adminAllowed) {
    return NextResponse.json(
      { ok: false, message: "Unauthorized admin login" },
      { status: 403 },
    );
  }

  const user = await User.findOne({ email });
  if (!user?.password) {
    return NextResponse.json(
      { ok: false, message: "Invalid email or password" },
      { status: 401 },
    );
  }

  const passwordOk = await bcrypt.compare(password, user.password);
  if (!passwordOk) {
    return NextResponse.json(
      { ok: false, message: "Invalid email or password" },
      { status: 401 },
    );
  }

  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const session = await encrypt({ userId: user._id.toString(), email: user.email, role: (user as { role?: string }).role || "admin", expires });

  const res = NextResponse.json({ ok: true, role: (user as { role?: string }).role || "admin" });
  res.cookies.set("session", session, {
    expires,
    httpOnly: true,
    secure: shouldUseSecureCookies(request),
    sameSite: "lax",
  });

  return res;
}
