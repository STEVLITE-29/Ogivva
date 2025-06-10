// this is where all the email template wil be...
// verify email template
export const verifyEmailTemplate = (code: string) => `
<!DOCTYPE html>
<html>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
  </head>
  <body style="margin: 0; padding: 0; background-color: #ffffff; border: 1px solid #A0ABBB; font-family: "Plus Jakarta Sans", sans-serif">
    <div style="max-width: 600px; margin: auto; overflow: hidden; box-shadow:0 0 10px rgba(0,0,0,0.1);">
      <div style="background-color: #19BD42; color: white; text-align: center; padding:20px 0; font-size:24px; font-weight: 500; border-radius: 0 0 20px 20px">
        Verify Your Email
      </div>
      <div style="padding:30px; font-size:16px; color:#333333;">
        <p>Hello,</p>
        <p>Thank you for signing up with <span style="font-weight: 700; color: #19BD42;">Ogivva</span>! Your verification code is:</p>
        <div style="display:flex; justify-content:center; margin:20px 0;">
          ${code
            .split('')
            .map(
              (digit, i) => `
              <div style="
                font-size:32px;
                font-weight:bold;
                width:40px;
                height:50px;
                line-height:50px;
                text-align:center;
                margin:0 4px;
                border-radius:4px;
                color:white;
                background-color:#19BD42;
                display:inline-block;
              ">${digit}</div>`
            )
            .join('')}
        </div>
        <p>Enter this code on the verification page to complete your registration.</p>
        <p><strong>This code will expire in 24hrs for security reasons.</strong></p>
        <p>If you didn't create an account with us, please ignore this email.</p>
      </div>
      <div style="font-size:14px; color:#666666; padding:0 30px 30px;">
        Best regards,<br/>
        Ogivva
      </div>
    </div>
  </body>
</html> 
`

export const welcomeEmailTemplate = (name: string) => `
<!DOCTYPE html>
<html>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
  </head>
  <div style="font-family: Arial, sans-serif; background-color: #FAF9F6; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
      <div style="background-color: #19BD42; padding: 20px; color: white; text-align: center;">
        <h1 style="margin: 0;">Welcome to Ogivva!!</h1>
      </div>
      <div style="padding: 30px;">
        <p style="font-size: 18px; color: #3E2C23;">Hi ${name},</p>
        <p style="font-size: 16px; color: #3E2C23; line-height: 1.6;">
          We're thrilled to have you on board! 🎉<br/>
          Your account has been successfully created, and you're all set to start using our services.
        </p>
        <div style="margin: 30px 0; text-align: center;">
          <a href="https://yourapp.com/dashboard/linkfornow" style="background-color: #19BD42; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block;">
            Go to Dashboard
          </a>
        </div>
        <p style="font-size: 14px; color: #7D5A4F;">If you have any questions, feel free to reply to this email — we're happy to help.</p>
      </div>
      <div style="background-color: #F5F3ED; text-align: center; padding: 16px; font-size: 12px; color: #7D5A4F;">
        &copy; ${new Date().getFullYear()} Ogivva. All rights reserved.
      </div>
    </div>
  </div>
</html> 
`;