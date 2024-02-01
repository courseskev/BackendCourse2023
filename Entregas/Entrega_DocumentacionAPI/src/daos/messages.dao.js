import { messageModel } from '../models/messages.model.js';

class MessagesDao {
    
    async createOne(obj) {
        const response = await messageModel.create(obj);
        return response;
    }
}

export const messagesDao = new MessagesDao();