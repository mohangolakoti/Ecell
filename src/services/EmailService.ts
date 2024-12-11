import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ecell@vishnu.edu.in',
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendRegistrationConfirmation = async (
  to: string,
  eventName: string,
  teamName: string
) => {
  const mailOptions = {
    from: 'ecell@vishnu.edu.in',
    to,
    subject: `Registration Confirmation - ${eventName}`,
    html: `
      <h2>Registration Confirmed!</h2>
      <p>Dear ${teamName},</p>
      <p>Your registration for ${eventName} has been confirmed.</p>
      <p>We'll keep you updated with further details about the event.</p>
      <br/>
      <p>Best regards,</p>
      <p>E-Cell VITB Team</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

export const sendStatusUpdate = async (
  to: string,
  eventName: string,
  teamName: string,
  status: 'approved' | 'rejected'
) => {
  const mailOptions = {
    from: 'ecell@vishnu.edu.in',
    to,
    subject: `Registration ${status.charAt(0).toUpperCase() + status.slice(1)} - ${eventName}`,
    html: `
      <h2>Registration ${status.charAt(0).toUpperCase() + status.slice(1)}</h2>
      <p>Dear ${teamName},</p>
      <p>Your registration for ${eventName} has been ${status}.</p>
      ${status === 'approved' ? '<p>We look forward to your participation!</p>' : ''}
      <br/>
      <p>Best regards,</p>
      <p>E-Cell VITB Team</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

export const sendEventReminder = async (
  to: string,
  eventName: string,
  teamName: string,
  eventDate: string,
  location: string
) => {
  const mailOptions = {
    from: 'ecell@vishnu.edu.in',
    to,
    subject: `Event Reminder - ${eventName}`,
    html: `
      <h2>Event Reminder</h2>
      <p>Dear ${teamName},</p>
      <p>This is a reminder that ${eventName} is scheduled for:</p>
      <p><strong>Date:</strong> ${new Date(eventDate).toLocaleDateString()}</p>
      <p><strong>Location:</strong> ${location}</p>
      <br/>
      <p>Best regards,</p>
      <p>E-Cell VITB Team</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};