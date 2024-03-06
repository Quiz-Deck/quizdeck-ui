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

interface MultichoiceOptions {
  answer: string;
}

export interface AddDeckQuestionRequest {
  question: string;
  type: string; //"MULTI_CHOICE" || "QNA" || "IMAGE" || "AUDIO" || "VIDEO" || "FILE"
  multichoiceOptions: string[]; //optional if type is multi-choice ,
  answer: string;
}
