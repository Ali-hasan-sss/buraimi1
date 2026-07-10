import nodemailer from 'nodemailer';

function createTransport() {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user || 'no-reply@buraimi.edu.om';

    if (!host || !user || !pass) {
        return null;
    }

    return {
        transport: nodemailer.createTransport({
            host,
            port,
            secure: port === 465,
            auth: { user, pass },
        }),
        from,
    };
}

export type WelcomeMailOptions = {
    to: string;
    name: string;
    role: 'student' | 'staff';
    accessCode: string;
    password: string;
};

export async function sendWelcomeMail(opts: WelcomeMailOptions): Promise<void> {
    const mailer = createTransport();

    const ar = {
        roleTitle: opts.role === 'student' ? 'طالب' : 'موظف',
        roleSalutation: opts.role === 'student' ? 'الطالب' : 'الموظف',
        codeLabel: opts.role === 'student' ? 'رقم الطالب' : 'رقم الموظف',
    };
    const en = {
        roleTitle: opts.role === 'student' ? 'Student' : 'Staff Member',
        codeLabel: opts.role === 'student' ? 'Student ID' : 'Employee ID',
    };
    const accentColor = opts.role === 'student' ? '#1d4ed8' : '#059669';

    const subject = `Login Credentials / بيانات الدخول — Buraimi University (${opts.accessCode})`;

    const html = `<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px;">
  <tr><td align="center">
    <table width="100%" style="max-width:580px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

      <!-- HEADER -->
      <tr>
        <td style="background:#254151;padding:24px 32px;text-align:center;">
          <p style="margin:0;color:#a8c5d6;font-size:11px;letter-spacing:2px;text-transform:uppercase;">BURAIMI UNIVERSITY &nbsp;|&nbsp; جامعة البريمي</p>
          <h1 style="margin:8px 0 0;color:#fff;font-size:20px;font-weight:700;">Login Credentials / بيانات الدخول</h1>
        </td>
      </tr>

      <!-- DIVIDER LABEL -->
      <tr>
        <td style="background:#f0f9ff;padding:8px 32px;text-align:center;border-bottom:1px solid #e2e8f0;">
          <span style="color:#6096b4;font-size:12px;font-weight:600;letter-spacing:1px;">🇬🇧 ENGLISH</span>
        </td>
      </tr>

      <!-- ENGLISH SECTION -->
      <tr>
        <td style="padding:28px 32px;" dir="ltr">
          <p style="margin:0 0 6px;color:#6b7280;font-size:14px;">Hello,</p>
          <h2 style="margin:0 0 18px;color:#254151;font-size:17px;">You have been registered as a <strong>${en.roleTitle}</strong> at Buraimi University.</h2>
          <p style="margin:0 0 20px;color:#374151;font-size:14px;line-height:1.7;">
            Dear <strong>${opts.name}</strong>,<br/>
            Below are your login credentials for the Buraimi University e-portal.<br/>
            Please keep them safe and do not share with anyone.
          </p>
          <table width="100%" cellpadding="0" cellspacing="0"
            style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;margin-bottom:20px;">
            <tr><td style="padding:18px 22px;">
              <p style="margin:0 0 12px;padding-bottom:12px;border-bottom:1px solid #e2e8f0;">
                <span style="color:#6b7280;font-size:12px;display:block;margin-bottom:4px;">${en.codeLabel}</span>
                <strong style="color:${accentColor};font-size:22px;font-family:monospace;letter-spacing:3px;">${opts.accessCode}</strong>
              </p>
              <p style="margin:0;">
                <span style="color:#6b7280;font-size:12px;display:block;margin-bottom:4px;">Temporary Password</span>
                <strong style="color:#254151;font-size:17px;font-family:monospace;letter-spacing:1px;">${opts.password}</strong>
              </p>
            </td></tr>
          </table>
          <p style="margin:0;color:#374151;font-size:12px;line-height:1.7;">⚠️ Please change your password after first login.</p>
        </td>
      </tr>

      <!-- DIVIDER -->
      <tr><td style="background:#e2e8f0;height:4px;"></td></tr>

      <!-- DIVIDER LABEL AR -->
      <tr>
        <td style="background:#f0f9ff;padding:8px 32px;text-align:center;border-bottom:1px solid #e2e8f0;">
          <span style="color:#6096b4;font-size:12px;font-weight:600;letter-spacing:1px;">🇸🇦 عربي</span>
        </td>
      </tr>

      <!-- ARABIC SECTION -->
      <tr>
        <td style="padding:28px 32px;" dir="rtl">
          <p style="margin:0 0 6px;color:#6b7280;font-size:14px;">مرحباً،</p>
          <h2 style="margin:0 0 18px;color:#254151;font-size:17px;">تم تسجيلك كـ <strong>${ar.roleTitle}</strong> في جامعة البريمي.</h2>
          <p style="margin:0 0 20px;color:#374151;font-size:14px;line-height:1.7;">
            عزيزي/عزيزتي ${ar.roleSalutation} <strong>${opts.name}</strong>،<br/>
            فيما يلي بيانات الدخول الخاصة بك للنظام الإلكتروني لجامعة البريمي.<br/>
            يُرجى الاحتفاظ بها وعدم مشاركتها مع أي شخص.
          </p>
          <table width="100%" cellpadding="0" cellspacing="0"
            style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;margin-bottom:20px;">
            <tr><td style="padding:18px 22px;">
              <p style="margin:0 0 12px;padding-bottom:12px;border-bottom:1px solid #e2e8f0;">
                <span style="color:#6b7280;font-size:12px;display:block;margin-bottom:4px;">${ar.codeLabel}</span>
                <strong style="color:${accentColor};font-size:22px;font-family:monospace;letter-spacing:3px;direction:ltr;display:inline-block;">${opts.accessCode}</strong>
              </p>
              <p style="margin:0;">
                <span style="color:#6b7280;font-size:12px;display:block;margin-bottom:4px;">كلمة المرور المؤقتة</span>
                <strong style="color:#254151;font-size:17px;font-family:monospace;letter-spacing:1px;direction:ltr;display:inline-block;">${opts.password}</strong>
              </p>
            </td></tr>
          </table>
          <p style="margin:0;color:#374151;font-size:12px;line-height:1.7;">⚠️ يُنصح بتغيير كلمة المرور فور تسجيل الدخول لأول مرة.</p>
        </td>
      </tr>

      <!-- FOOTER -->
      <tr>
        <td style="background:#f8fafc;padding:14px 32px;border-top:1px solid #e2e8f0;text-align:center;">
          <p style="margin:0;color:#9ca3af;font-size:11px;">
            This email was sent automatically — Do not reply &nbsp;|&nbsp; هذا البريد أُرسل تلقائياً — لا تردّ على هذه الرسالة
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;

    if (!mailer) {
        console.log(`[MAILER] SMTP not configured. Welcome email for ${opts.to}:`);
        console.log(`  ${en.codeLabel}: ${opts.accessCode}`);
        console.log(`  Password: ${opts.password}`);
        return;
    }

    await mailer.transport.sendMail({
        from: `"Buraimi University | جامعة البريمي" <${mailer.from}>`,
        to: opts.to,
        subject,
        html,
    });
}
