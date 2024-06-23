// get /rooms/{roomId}/messages
// get /users/{userId}/messages

export interface RetrieveMessagesForm {
  cursor?: number;
}

// post /rooms/:roomId/messages
// post /users/:userId/messages

export interface SendMessageForm {
  body: string;
}

export interface SendMessageErrors {
  body: string;
}
