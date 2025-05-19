exports.paymentSuccessEmail = (name, amount) => {
    return `<!DOCTYPE html>
      <html>
      
      <head>
          <meta charset="UTF-8">
          <title>Payment Confirmation</title>
          <style>
              body {
                  background-color: #ffffff;
                  font-family: Arial, sans-serif;
                  font-size: 16px;
                  line-height: 1.4;
                  color: #333333;
                  margin: 0;
                  padding: 0;
              }
      
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  text-align: center;
              }
      
              .logo {
                  max-width: 200px;
                  margin-bottom: 20px;
              }
      
              .message {
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 20px;
              }
      
              .body {
                  font-size: 16px;
                  margin-bottom: 20px;
              }
      
              .cta {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #FFD60A;
                  color: #000000;
                  text-decoration: none;
                  border-radius: 5px;
                  font-size: 16px;
                  font-weight: bold;
                  margin-top: 20px;
              }
      
              .support {
                  font-size: 14px;
                  color: #999999;
                  margin-top: 20px;
              }
      
              .highlight {
                  font-weight: bold;
              }
          </style>
      </head>
      
      <body>
          <div class="container">
              <a href="#">
                  <img class="logo" src="https://res.cloudinary.com/dom1fx2wq/image/upload/v1744377924/Logo-Full-Dark_bjnofd.png" alt="StudyNotion Logo">
              </a>
              <div class="message">Course Payment Confirmation</div>
              <div class="body">
                  <p>Dear ${name},</p>
                  <p>We have received your payment of <span class='highlight'>₹${amount}</span>.</p>
                  <p>Thank you for your purchase! You are now enrolled in your selected courses.</p>
              </div>
              <div class="support">
                  If you have any questions or need assistance, please feel free to reach out to us at 
                  <a href="mailto:nodemailer123purpose@gmail.com">nodemailer123purpose@gmail.com</a>. We are here to help!
              </div>
          </div>
      </body>
      
      </html>`;
};
