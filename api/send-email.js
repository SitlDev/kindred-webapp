// Vercel Serverless Function for Resend email dispatch & admin forwarding in Kindred
export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY || 're_M5aW6bPe_CZfPX1hXAD4nmrQuqUzFxbWL';
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const adminForwardEmail = process.env.ADMIN_FORWARD_EMAIL || 'admin@knotstranded.com';

  try {
    const { to, subject, html, isSystemAlert } = req.body;

    if (!to || !subject || !html) {
      return res.status(400).json({ error: 'Missing required parameters: to, subject, html' });
    }

    // 1. Send primary email to the target recipient
    const primaryRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: `Kindred <${fromEmail}>`,
        to: to,
        subject: subject,
        html: html
      })
    });

    const primaryData = await primaryRes.json();
    console.log(`[Primary Email Sent to ${to}]:`, primaryData);

    // 2. Forward to admin@knotstranded.com if not already sent to admin
    if (to.toLowerCase() !== adminForwardEmail.toLowerCase()) {
      const forwardSubject = isSystemAlert 
        ? `[Kindred System Alert] ${subject}` 
        : `[Kindred Forwarded] ${subject}`;
        
      const forwardHtml = `
        <div style="background:#FAF8F5; border:1px solid rgba(61, 89, 65, 0.15); border-radius:20px; padding:20px; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:13px; line-height:1.6; color:#1D2B1E; margin-bottom:24px; max-width:600px;">
          <h3 style="margin-top:0; color:#3D5941; font-size:15px; font-weight:700;">🌱 Kindred Activity Forwarded Notification</h3>
          <strong>Original Recipient:</strong> <span style="font-family:monospace; font-size:12px;">${to}</span><br>
          <strong>Date Logged:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PST<br>
          <div style="margin-top:10px; padding-top:10px; border-top:1px dashed rgba(61, 89, 65, 0.15); color:#C4956D; font-weight:bold;">
            🔄 Protected under the Kindred Reciprocity Covenant.
          </div>
        </div>
        <div style="max-width:600px;">
          ${html}
        </div>
      `;

      const forwardRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          from: `Kindred Admin <${fromEmail}>`,
          to: adminForwardEmail,
          subject: forwardSubject,
          html: forwardHtml
        })
      });

      const forwardData = await forwardRes.json();
      console.log(`[Forwarded to Admin ${adminForwardEmail}]:`, forwardData);
    }

    return res.status(200).json({ success: true, message: 'Email sent and forwarded successfully' });
  } catch (error) {
    console.error('❌ Resend serverless mailing error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
