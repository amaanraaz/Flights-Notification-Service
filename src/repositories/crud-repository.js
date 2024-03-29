// generic crud code.
// repositories talk to model
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/error/app-error');

class CrudRepository{
    constructor(model){
        this.model = model;
    }

    async create(data){
        const response = await this.model.create(data);
        return response;
    }

    async delete(data){
        const response = await this.model.destroy({
            // just like where clause
            where:{
                id: data
            }
        });
        return response;
    }

    async get(data){
        const response = await this.model.findByPk(data);
        if(!response){
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND)
        }
        return response;
    }

    async getAll(){
        const response = await this.model.findAll();
        return response;
    }

    async update(id,data){ //data is the object -> {}
        const response = await this.model.update(data,{
            where:{
                id:id
            }
        });
        return response;
    }

}

module.exports = CrudRepository;