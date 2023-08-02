import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from 'src/app/service/chat-service.service';
import { TeacherServiceService } from 'src/app/service/teacher-service.service';

interface ChatMessage {
  sender: string;
  senderid:string;
  timestamp: Date;
  content: string;
  receiver?: string; // Make receiver property optional
}

interface Student {
  _id: string;
  name: string;
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
public teacherName: string = ''; // This will be set after fetching the teacher's data
public allStudentsData: Student[] = [];
public selectedStudent: Student | null = null;
public allMessages: ChatMessage[] = []; // Add this line to declare the allMessages array
teacherid!: string;


  constructor(
    private chatService: ChatServiceService,
    private teacherService: TeacherServiceService
  ) {}

  ngOnInit(): void {
    // Fetch the teacher's data after successful login
    this.teacherService.getteacherid().subscribe(
      (data) => {
        this.teacherid = data.teacherid;
        this.teacherName = data.teachername;
        this.allStudentsData = data.allStudentsData;
      },
      (error) => {
        console.error('Error fetching teacher data:', error);
      }
    );

    // Listen for incoming chat messages from the server
    this.chatService.onChatMessage().subscribe((message: any) => {
      console.log('Received chat message:', message);
      // Add the new message to the allMessages array
      this.allMessages=message
      console.log(this.allMessages)
      // Update the displayed messages based on the selected student
     
      this.chatService.sendfromserver().subscribe((message:any)=>{
        this.allMessages=message
      })
    })
}
  public sendMessage() {

      // Create a new chat message object with the sender and other details
      const newMessage: ChatMessage = {
        sender: this.teacherName,
        senderid:this.teacherid, 
        timestamp: new Date(),
        content: this.messageInput,
        receiver:this.selectedStudent?._id
      };
      console.log(newMessage)

      
      this.messageInput=''
      // Send the chat message to the server
      this.chatService.sendChatMessage(newMessage).subscribe(
        () => {
          // Message sent successfully, clear the input field
          this.messageInput = '';
        },
        (error) => {
          console.error('Error sending message:', error);
        }
      );
  }

  public sendMessageToStudent(student: Student) {
    if (!this.selectedStudent || this.selectedStudent._id !== student._id) {
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
  

  



}

