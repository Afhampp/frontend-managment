import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from 'src/app/service/chat-service.service';
import { TeacherServiceService } from 'src/app/service/teacher-service.service';


interface ChatMessage {
  sender: string;
  senderid:string;
  timestamp: Date;
  content: string;
  receiver?: string; 
}


interface Student {
  _id: string;
  name: string;
  selected?:string
  teacherid?:string
}
interface Group {
  classid: string;
  classname: string;
  selected?:string
  teacherid?:string
}



@Component({
  selector: 'app-teacher-chat-module',
  templateUrl: './teacher-chat-module.component.html',
  styleUrls: ['./teacher-chat-module.component.css'],
})
export class TeacherChatModuleComponent implements OnInit {
  public messageInput: string = '';
public messages: ChatMessage[] = [];
public teacherName: string = '';
public allStudentsData: Student[] = [];
public selectedStudent: Student | null = null;
public allMessages: ChatMessage[] = []; 
public groups:Group[]= [];
  public selectedGroup: Group| null = null;
  public groupMessages: ChatMessage[] = [];
teacherid!: string;


  constructor(
    private chatService: ChatServiceService,
    private teacherService: TeacherServiceService
  ) {}

  ngOnInit(): void {
    this.teacherService.getteacherid().subscribe(
      (data) => {
        console.log(data)
        this.teacherid = data.teacherid;
        this.teacherName = data.teachername;
        this.allStudentsData = data.allStudentsData;
        this.groups=data.classIds
      },
      (error) => {
        console.error('Error fetching teacher data:', error);
      }
    );


    this.chatService.onChatMessage().subscribe((message: any) => {
      console.log('Received chat message:', message);
  
      this.allMessages=message
     
    
     
      this.chatService.sendfromserver().subscribe((message:any)=>{
        this.allMessages=message
      })
    })
    this.chatService.groupselect().subscribe((message:any)=>{

      this.groupMessages=message
    })

    this.chatService.onGroupChatMessage().subscribe((message: any) => {
      console.log(message)
       
        this.groupMessages=message
    });
}
  public sendMessage() {

      const newMessage: ChatMessage = {
        sender: this.teacherName,
        senderid:this.teacherid, 
        timestamp: new Date(),
        content: this.messageInput,
        receiver:this.selectedGroup?.classid
      };
      console.log(this.selectedGroup)
      console.log(newMessage)

      
      this.messageInput=''

      this.chatService.sendChatMessage(newMessage).subscribe(
        () => {
   
          this.messageInput = '';
        },
        (error) => {
          console.error('Error sending message:', error);
        }
      );
  }

  public sendMessageToStudent(student: Student) {
    if (!this.selectedStudent || this.selectedStudent._id !== student._id) {
      this.selectedGroup=null
      student.selected = "selected";
      student.teacherid = this.teacherid;
      this.selectedStudent = student;
  
      // Emit the "select-student" event instead of "chat-message"
      this.chatService.selectStudent(this.selectedStudent).subscribe(
        () => {
          // Do something after the se
        },
        (error) => {
          console.error('Error sending select-student event:', error);
        }
      );
    }
  }
  sendMessageToGroup(group:Group){
    if (!this.selectedGroup || this.selectedGroup.classid!== group.classid) {
      this.selectedStudent=null
      group.teacherid = this.teacherid;
      this.selectedGroup = group;
      console.log(this.selectedGroup)
  
      // Emit the "select-student" event instead of "chat-message"
      this.chatService.selectgroup(this.selectedGroup).subscribe(
        () => {
          // Do something after the se
        },
        (error) => {
          console.error('Error sending select-student event:', error);
        }
      );
    }
  }

  public sendGroupMessage() {
    const newMessage: ChatMessage = {
      sender: this.teacherName,
      senderid: this.teacherid,
      timestamp: new Date(),
      content: this.messageInput,
     receiver:this.selectedGroup?.classid
    };
    console.log(newMessage)

    this.chatService.sendGroupChatMessage(newMessage).subscribe(
      () => {
        this.messageInput = '';
      },
      (error) => {
        console.error('Error sending group message:', error);
      }
    );
  }
  

  



}

