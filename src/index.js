const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const amqplib = require('amqplib')

const app = express();
// const mailSender = require('./config/email-config')

//rabbit mq implementation
async function connectQueue(){
    try {
        const connection = await amqplib.connect("amqp://localhost");
        const channel = await connection.createChannel();
        await channel.assertQueue("notification-queue");
        channel.consume("notification-queue",(data)=>{
            console.log(`${Buffer.from(data.content)}`);
            channel.ack(data)
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    // const res = await mailSender.sendMail({
    //     from: ServerConfig.GMAIL_EMAIL,
    //     to: 'test@gmail.com',
    //     subject: 'Is it working',
    //     text: 'yes its working '
    // });
    // console.log( res);
    await connectQueue();
    console.log("Queue is up");
});
