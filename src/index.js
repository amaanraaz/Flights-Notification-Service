const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();
const mailSender = require('./config/email-config')

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    const res = await mailSender.sendMail({
        from: ServerConfig.GMAIL_EMAIL,
        to: 'test@gmail.com',
        subject: 'Is it working',
        text: 'yes its working '
    });
    console.log( res);
});
