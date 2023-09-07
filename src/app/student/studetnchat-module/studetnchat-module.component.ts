import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from 'src/app/service/chat-service.service';
import { StudentServiceService } from 'src/app/service/student-service.service';
import { ChatMessage, teacher, Group } from '../StudentInterface/interfaces';

@Component({
  selector: 'app-studetnchat-module',
  templateUrl: './studetnchat-module.component.html',
  styleUrls: ['./studetnchat-module.component.css'],
})
export class StudetnchatModuleComponent implements OnInit {
  public messageInput: string = '';
  public messages: ChatMessage[] = [];
  public stundetName: string = '';
  public allStudentsData: teacher[] = [];
  public selectedStudent: teacher | null = null;
  public allMessages: ChatMessage[] = [];
  public groups: Group[] = [];
  public selectedGroup: Group | null = null;
  public groupMessages: ChatMessage[] = [];
  filteredStudents: teacher[] = [];
  filteredGroups: Group[] = [];
  studentid!: string;
  search!: string;

  constructor(
    private chatService: ChatServiceService,
    private studentserive: StudentServiceService
  ) {}

  ngOnInit(): void {
    this.studentserive.getstudentid().subscribe((data) => {
      this.studentid = data.studentid;
      this.stundetName = data.studentname;
      this.allStudentsData = data.teachersData;
      this.groups = data.classes;
    });
    this.calldatafromserver();

    this.chatService.sendfromserver().subscribe((message: any) => {
      console.log('studetnsendmessage', message);
      this.allMessages = message;
    });

    this.chatService.groupselect().subscribe((message: any) => {
      console.log(message);
      this.groupMessages = message;
    });

    this.chatService.onGroupChatMessage().subscribe((message: any) => {
      console.log(message);

      this.groupMessages = message;
    });
  }

  calldatafromserver() {
    {
      this.chatService.fromserver().subscribe((message: any) => {
        console.log('Received chat message:', message);
        this.allMessages = message;
      });
    }
  }
  public sendMessage() {
    const newMessage: ChatMessage = {
      sender: this.stundetName,
      senderid: this.studentid,
      timestamp: new Date(),
      content: this.messageInput,
      receiver: this.selectedStudent?._id,
    };

    this.messageInput = '';
    this.chatService.sendmessagestudent(newMessage).subscribe(
      () => {
        this.calldatafromserver();
      },
      (error) => {
        console.error('Error sending message:', error);
      }
    );
  }

  public sendMessageToStudent(student: teacher) {
    if (!this.selectedStudent || this.selectedStudent._id !== student._id) {
      this.selectedGroup = null;
      student.selected = 'selected';
      student.studentid = this.studentid;

      this.selectedStudent = student;
      console.log(this.selectedStudent, 'selectedstudent');

      this.chatService.selectteacher(this.selectedStudent).subscribe(() => {
        this.calldatafromserver();
      });
    }
  }

  sendMessageToGroup(group: Group) {
    if (!this.selectedGroup || this.selectedGroup._id !== group._id) {
      this.selectedStudent = null;
      group.studentid = this.studentid;
      this.selectedGroup = group;
      console.log(this.selectedGroup, 'group elctsd');
      this.chatService
        .selectgroupforstudent(this.selectedGroup)
        .subscribe(() => {});
    }
  }

  public sendGroupMessage() {
    const newMessage: ChatMessage = {
      sender: this.stundetName,
      senderid: this.studentid,
      timestamp: new Date(),
      content: this.messageInput,
      receiver: this.selectedGroup?._id,
    };
    this.messageInput = '';

    this.chatService.sendGroupChatstudent(newMessage).subscribe(() => {
      this.messageInput = '';
    });
  }
}
