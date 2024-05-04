export interface UserData {
  id: string;
  createdOn: Date;
  email: string;
  userName: string;
  phoneNumber: string;
}

export interface AuthResponse {
  success: boolean;
  data: UserData;
  errors: string[];
  message: string;
  token: string;
}

export interface CreateDeckRequest {
  title: string;
  description: string;
  type: string; //["PRIVATE", "PUBLIC"]
  status: string; //["DRAFT", "PUBLISHED"]
  timer?: number; //Optional
  deckGuests?: string[]; //Optional
}

export interface CreateDeckResponse {
  message: string;
  data: {
    createdBy: string;
    createdOn: string;
    deckGuests: string[];
    description: string;
    likeCount: number;
    playCount: number;
    questions: string[];
    status: string;
    timer: number;
    title: string;
    type: string;
    updatedBy: string;
    updatedOn: string;
    __v: number;
    _id: string;
  };
}

export interface DeckQuestion {
  answer: string;
  audio: string[];
  createdOn: string;
  decks: string[];
  difficulty: string;
  file: string[];
  image: string[];
  multichoiceOptions: string[];
  question: string;
  timer: number;
  type: string;
  updatedOn: string;
  video: string[];
  __v: number;
  _id: string;
}

export interface SingleDeck {
  createdBy: string;
  createdOn: string;
  deckGuests: string[];
  description: string;
  likeCount: number;
  playCount: number;
  questions: DeckQuestion[];
  status: string;
  timer: number;
  title: string;
  type: string;
  updatedBy: string;
  updatedOn: string;
  _id: string;
}

export interface SingleDeckResponse {
  data: SingleDeck;
  message: string;
}


export interface DeckListResponse {
  data: SingleDeck[];
  message: string;
}