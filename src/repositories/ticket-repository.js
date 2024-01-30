const CrudRepository = require('./crud-repository');
const { ticket } = require('../models')

class TicketRepository extends CrudRepository {
    constructor(){
        super(ticket);
    }

    async getPendingTickets(){
        const res = await Ticket.findAll({
            where:{
                status: 'PENDING'
            }
        });
        return res;
    }
}

module.exports = TicketRepository;