const plivo = require("plivo");

function OTPSender(senderID, destinationNumber) {
  let otp = Math.floor(100000 + Math.random() * 900000);
  let message = `Your OTP is ${otp}`;

  let client = new plivo.Client(
    process.env.GET_PILVO_ID,
    process.env.GET_PILVO_TOKEN
  );
  client.messages.create({
    src: senderID,
    dst: destinationNumber,
    text: message,
  });
}

OTPSender("8118806678", "918789695291");
