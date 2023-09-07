export interface selectstudent {
    name: string;
    _id: string;
    studentid?: string;
    selected: string; 
}

export interface ChatMessage {
  sender: string;
  senderid: string;
  timestamp: Date;
  content: string;
  receiver?: string;
}
