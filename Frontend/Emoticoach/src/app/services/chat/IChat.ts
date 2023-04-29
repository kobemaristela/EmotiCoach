export interface chat {
    username: string;
    timestamp: string;
    message: string;
    isuser: boolean;
}

export interface IchatRequest {
    messages: chat[];
}