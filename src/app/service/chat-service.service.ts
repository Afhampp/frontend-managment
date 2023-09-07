import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChatMessage } from './interface/chatinterface';

@Injectable({
  providedIn: 'root',
})
export class ChatServiceService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.socketUrl);
  }

  public sendChatMessage(message: ChatMessage): Observable<void> {
    return new Observable<void>((observer) => {
      this.socket.emit('chat-message', message, (ack: { success: boolean }) => {
        if (ack.success) {
          observer.next();
          observer.complete();
        } else {
          observer.error('Failed to send chat message');
        }
      });
    });
  }

  public sendmessagestudent(message: ChatMessage): Observable<void> {
    return new Observable<void>((observer) => {
      this.socket.emit(
        'chat-message-student',
        message,
        (ack: { success: boolean }) => {
          if (ack.success) {
            observer.next();
            observer.complete();
          } else {
            observer.error('Failed to send chat message');
          }
        }
      );
    });
  }

  public sendGroupChatMessage(message: ChatMessage): Observable<void> {
    return new Observable<void>((observer) => {
      this.socket.emit(
        'chat-message-group-teacher',
        message,
        (ack: { success: boolean }) => {
          if (ack.success) {
            observer.next();
            observer.complete();
          } else {
            observer.error('Failed to send chat message');
          }
        }
      );
    });
  }
  public sendGroupChatstudent(message: ChatMessage): Observable<void> {
    return new Observable<void>((observer) => {
      this.socket.emit(
        'chat-message-group-student',
        message,
        (ack: { success: boolean }) => {
          if (ack.success) {
            observer.next();
            observer.complete();
          } else {
            observer.error('Failed to send chat message');
          }
        }
      );
    });
  }

  public selectStudent(selectedStudent: any): Observable<void> {
    return new Observable<void>((observer) => {
      this.socket.emit(
        'select-student',
        selectedStudent,
        (ack: { success: boolean }) => {
          if (ack.success) {
            observer.next();
            observer.complete();
          } else {
            observer.error('Failed to send select-student event');
          }
        }
      );
    });
  }
  public selectgroup(selectedGroup: any): Observable<void> {
    return new Observable<void>((observer) => {
      this.socket.emit(
        'select-group',
        selectedGroup,
        (ack: { success: boolean }) => {
          if (ack.success) {
            observer.next();
            observer.complete();
          } else {
            observer.error('Failed to send select-student event');
          }
        }
      );
    });
  }

  public selectgroupforstudent(selectedGroup: any): Observable<void> {
    return new Observable<void>((observer) => {
      this.socket.emit(
        'select-group-student',
        selectedGroup,
        (ack: { success: boolean }) => {
          if (ack.success) {
            observer.next();
            observer.complete();
          } else {
            observer.error('Failed to send select-student event');
          }
        }
      );
    });
  }
  public selectteacher(selectedTeacher: any): Observable<void> {
    return new Observable<void>((observer) => {
      this.socket.emit(
        'select-teacher',
        selectedTeacher,
        (ack: { success: boolean }) => {
          if (ack.success) {
            observer.next();
            observer.complete();
          } else {
            observer.error('Failed to send select-student event');
          }
        }
      );
    });
  }

  public onChatMessage(): Observable<ChatMessage> {
    return new Observable<ChatMessage>((observer) => {
      this.socket.on('chat-message', (data: any) => {
        observer.next(data);
      });
    });
  }

  public onGroupChatMessage(): Observable<any> {
    return new Observable<ChatMessage>((observer) => {
      this.socket.on('chat-message-group-message-to-front', (data: any) => {
        observer.next(data);
      });
    });
  }

  public fromserver(): Observable<ChatMessage> {
    return new Observable<ChatMessage>((observer) => {
      this.socket.on('chat-message-student', (data: any) => {
        observer.next(data);
      });
    });
  }

  public groupselect(): Observable<ChatMessage> {
    return new Observable<ChatMessage>((observer) => {
      this.socket.on('chat-message-group', (data: any) => {
        observer.next(data);
      });
    });
  }

  public sendfromserver(): Observable<ChatMessage> {
    return new Observable<ChatMessage>((observer) => {
      this.socket.on('chat-message-new', (data: any) => {
        observer.next(data);
      });
    });
  }
}
