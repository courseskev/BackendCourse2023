import { messageModel } from '../db/models/messages.model.js';

class MessagesManager {
    
    async createOne(obj) {
        const response = await messageModel.create(obj);
        return response;
    }
}

export const messagesManager = new MessagesManager();