// backend/api/contact.js
import { sendEmail } from "../utils/sendEmail.js";

const contact = async (req, res) => {
  try {
    const { firstname, lastname, email, service, message } = req.body;

    if (!firstname || !lastname || !email || !service || !message) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    // יוצרים תוכן המייל
    const html = `
      <p><strong>Name:</strong> ${firstname} ${lastname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `;

    await sendEmail({
      to: "codebydava@gmail.com",
      subject: `New contact form submission from ${firstname} ${lastname}`,
      html,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

export default contact;
