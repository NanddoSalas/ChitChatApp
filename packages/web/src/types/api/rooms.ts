// put /rooms/:roomId

export interface UpdateRoomForm {
  name: string;
  private: boolean;
}

// post /rooms

export interface CreateRoomForm {
  name: string;
  private: boolean;
}
