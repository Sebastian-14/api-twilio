const express = require('express');
const twilio = require('twilio');
var cors = require('cors')

require('dotenv').config();

const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const port = process.env.PORT || 5000;

const app = express();
app.use(cors())

app.listen(port, function () {
  console.log('servidor iniciado')
});

app.get('/twilio/token', (req, res) => {
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );

  token.addGrant(new VideoGrant());

  token.identity = req.query.user;

  res.send({ token: token.toJwt() });
});
