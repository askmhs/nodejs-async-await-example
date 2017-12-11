import User from './../../Models/User';
import {NotFoundException} from "../../Exceptions/NotFoundException";

export class GetUserController {

    /**
     * Get List Users
     * @returns {Promise.<Promise.<T>|Promise>}
     */
    async all() {
        return User.find().select('-__v').lean().then((users) => {
            return users;
        }).catch((errUsers) => {
            throw errUsers;
        });
    }

    /**
     * Get Detail User
     * @param userId
     * @returns {Promise.<Promise.<T>|Promise>}
     */
    async detailUser(userId) {
        return User.findById(userId).select('-__v').lean().then((user) => {
            if (user !== null) {
                return user;
            } else {
                throw new NotFoundException(`Couldn't find user with id ${userId}!`);
            }
        }).catch((errUser) => {
            throw errUser;
        });
    }
}