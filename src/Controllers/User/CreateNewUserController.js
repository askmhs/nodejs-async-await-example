import User from './../../Models/User';

export class CreateNewUserController {

    /**
     * CreateNewUserController Constructor
     * @param data
     */
    constructor(data) {
        this._data = data;
    }

    /**
     * Create User
     * @returns {Promise.<Promise.<T>|Promise>}
     */
    async createUser() {
        return User.create(this._data).then((created) => {
            return created;
        }).catch((errCreated) => {
            throw errCreated;
        });
    }
}