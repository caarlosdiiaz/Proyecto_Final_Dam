import nodemailer from 'nodemailer';
import pug from 'pug';
import path from 'path';

const horaDia = new Date().toLocaleString('es-ES', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
});


export async function sendEmail(nombreProfesor: string, contenido: string): Promise<void>{
  const templatePath = path.join(__dirname, '../templates/emailTemplate.pug');
  const html = pug.renderFile(templatePath, { nombreProfesor, contenido, horaDia });

  const mailOptions = {
    from: process.env.emailFrom,
    to: `${process.env.emailTo}, ${process.env.emailFrom}`,
    subject: `Se ha borrado una url de ${process.env.sitemapUrl}`,
    html,
  };

  const transporter = nodemailer.createTransport({
    service: 'SMTP',
    host: process.env.smtpServer,
    port: parseInt(process.env.smtpPort || '587', 10),
    secure: false,
    auth: {
      user: process.env.emailUser,
      pass: process.env.emailPass,
    },
  });

  try {
    const info = await transporter.sendMail(mailOptions);
    alert("✅ Correo enviado:" + info.response);
  } catch (error) {
    alert("❌ Error al enviar correo:" + error);
  }

}