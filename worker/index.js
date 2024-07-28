const Redis = require('ioredis');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Alert = require('./model/Alert');
const User = require('./model/User');


const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, 
  auth: {
    user: "nannie47@ethereal.email",
    pass: "jqCC31QxRZH2rjqRf6",
  },
});


const redisSubscriber = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,

  retryStrategy: function (times) {
    const delay = Math.min(times * 50, 2000);
    console.log(`Redis reconnect attempt #${times} after ${delay}ms`);
    return delay;
  },
});


mongoose.connect("mongodb+srv://admin-hunain:dragonx123@cluster0.mjcd13o.mongodb.net/toss", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

redisSubscriber.subscribe('price_updates');


redisSubscriber.on('message', async (channel, message) => {
  if (channel === 'price_updates') {
    const priceUpdate = JSON.parse(message);
    await checkAndTriggerAlerts(priceUpdate);

  }
});

const checkAndTriggerAlerts = async (priceUpdate) => {
  const { coin, price } = priceUpdate;

 
  const alerts = await Alert.find({
    coin: coin,
    targetPrice: { $lte: price },
    status: 'created',
  });

  for (const alert of alerts) {
   
    await Alert.findByIdAndUpdate(alert._id, {
      status: 'triggered',
      triggeredAt: new Date(),
    });

  
    const user = await User.findById(alert.userId);

    
    const mailOptions = {
      from: 'jqCC31QxRZH2rjqRf6',
      to: user.email,
      subject: `Price Alert: ${coin} has reached ${alert.targetPrice}`,
      text: `The price of ${coin} has reached ${alert.targetPrice}. Current price is ${price}.`,
    };



    console.log('Sending email to:', user.email);

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
        await Alert.findByIdAndUpdate(alert._id, { status: 'deleted' });
      }
    });
  }


  await checkAndTriggerAlertsDecrease(priceUpdate);
};


const checkAndTriggerAlertsDecrease = async (priceUpdate) => {
  const { coin, price } = priceUpdate;

  
  const alerts = await Alert.find({
    coin: coin,
    targetPrice: { $gte: price },
    status: 'created',
  });

  for (const alert of alerts) {

    await Alert.findByIdAndUpdate(alert._id, {
      status: 'triggered',
      triggeredAt: new Date(),
    });

  
    const user = await User.findById(alert.userId);


    const mailOptions = {
      from: 'nannie47@ethereal.email',
      to: user.email,
      subject: `Price Alert: ${coin} has dropped to ${alert.targetPrice}`,
      text: `The price of ${coin} has dropped to ${alert.targetPrice}. Current price is ${price}.`,
    };

    transporter.sendMail(mailOptions,async (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
        await Alert.findByIdAndUpdate(alert._id, { status: 'deleted' });
        console.log('Alert deleted:', alert._id);
      }
    });
  }
};

console.log('Worker is listening for price updates...');
