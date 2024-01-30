const {TicketRepository} = require('../repositories');
const ticketRepository = new TicketRepository();
const {MailConfig} = require('../config');

async function sendEmail(mailTo, mailFrom, subject, text){
    try {
        const response = await MailConfig.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: subject,
            text: text
        });
        return response
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createTicket(data){
    try {
        const res = await ticketRepository.create(data);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getPendingEmails(){
    try {
        const res = await ticketRepository.getPendingTickets();
        return res;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    sendEmail,
    createTicket,
    getPendingEmails
}