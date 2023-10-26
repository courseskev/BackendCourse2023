import { messageModel } from "../db/models/messages.model";

class MessagesManager {
    
    async createOne(obj) {
        const response = await messageModel.create(obj);
        return response;
    }
}

export const messagesManager = new MessagesManager();