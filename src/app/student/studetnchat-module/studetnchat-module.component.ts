import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from 'src/app/service/chat-service.service';
import { StudentServiceService } from 'src/app/service/student-service.service';
import { TeacherServiceService } from 'src/app/service/teacher-service.service';

interface ChatMessage {
  sender: string;
  senderid:string;
  timestamp: Date;
  content: string;
  receiver?: string; // Make receiver property optional
}

interface teacher {
  _id: string;
  name: string;
  selected?:string
  studentid?:string
}

interface Group {
  _id: string;
  name: string;
  selected?:string
  studentid?:string
}

@Component({
  selector: 'app-studetnchat-module',
  templateUrl: './studetnchat-module.component.html',
  styleUrls: ['./studetnchat-module.component.css']
})
export class StudetnchatModuleComponent implements OnInit {
  public messageInput: string = '';
public messages: ChatMessage[] = [];
public stundetName: string = ''; 
public allStudentsData: teacher[] = [];
public selectedStudent: teacher | null = null;
public allMessages: ChatMessage[] = []; 
public groups:Group[]= [];
public selectedGroup: Group| null = null;
public groupMessages: ChatMessage[] = [];
filteredStudents: teacher[] = [];
filteredGroups: Group[] = [];
studentid!: string;
search!:string


  constructor(
    private chatService: ChatServiceService,
    private studentserive: StudentServiceService
  ) {}

  ngOnInit(): void {
    // Fetch the teacher's data after successful login
    this.studentserive.getstudentid().subscribe(
      (data) => {
        console.log(data)
        this.studentid = data.studentid;
        this.stundetName = data.studentname;
        this.allStudentsData = data.teachersData;
        this.groups=data.classes
      },
      (error) => {
        console.error('Error fetching teacher data:', error);
      }
    );
      this.calldatafromserver()

      this.chatService.sendfromserver().subscribe((message:any)=>{
        this.allMessages=message
      })

      this.chatService.groupselect().subscribe((message:any)=>{

        this.groupMessages=message
      })
  
      this.chatService.onGroupChatMessage().subscribe((message: any) => {
        console.log(message)
         
          this.groupMessages=message
      });
    // Listen for incoming chat messages from the server
    
}

  calldatafromserver(){
    {
      this.chatService.fromserver().subscribe((message: any) => {
        console.log('Received chat message:', message);
        // Add the new message to the allMessages array
        this.allMessages=message
        console.log(this.allMessages,".......reacived")
        // Update the displayed messages based on the selected student
       
      })
    }
  }
  public sendMessage() {
 

      // Create a new chat message object with the sender and other details
      const newMessage: ChatMessage = {
        sender: this.stundetName,
        senderid:this.studentid, 
        timestamp: new Date(),
        content: this.messageInput,
        receiver:this.selectedStudent?._id
      };

      
      this.messageInput=''
      // Send the chat message to the server
      this.chatService.sendmessagestudent(newMessage).subscribe(
        () => {
          // Message sent successfully, clear the input field
          this.calldatafromserver()
        },
        (error) => {
          console.error('Error sending message:', error);
        }
      );
  }

  public sendMessageToStudent(student: teacher) {
    if (!this.selectedStudent || this.selectedStudent._id !== student._id) {
      this.selectedGroup=null
      student.selected = "selected";
      student.studentid = this.studentid;
       
      this.selectedStudent = student;
 
  
      // Emit the "select-student" event instead of "chat-message"
      this.chatService.selectteacher(this.selectedStudent).subscribe(
        () => {
          console.log("hai")
          this.calldatafromserver()
        },
        (error) => {
          console.error('Error sending select-student event:', error);
        }
      );
    }
  }

  sendMessageToGroup(group:Group){
    if (!this.selectedGroup || this.selectedGroup._id!== group._id) {
      this.selectedStudent=null
      group.studentid = this.studentid;
      this.selectedGroup = group;
      console.log(this.selectedGroup)
      // Emit the "select-student" event instead of "chat-message"
      this.chatService.selectgroupforstudent(this.selectedGroup).subscribe(
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
      sender: this.stundetName,
      senderid: this.studentid,
      timestamp: new Date(),
      content: this.messageInput,
     receiver:this.selectedGroup?._id
    };
    this.messageInput=''

    this.chatService.sendGroupChatstudent(newMessage).subscribe(
      () => {
        this.messageInput = '';
      },
      (error) => {
        console.error('Error sending group message:', error);
      }
    );
  }

 
  

  



}


