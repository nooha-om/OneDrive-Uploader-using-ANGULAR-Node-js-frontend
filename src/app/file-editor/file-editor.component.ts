import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-file-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './file-editor.component.html',
  styleUrls: ['./file-editor.component.css']
})
export class FileEditorComponent {
  filename: string = 'test.txt';
  fileContent: string = '';
  backendUrl = 'http://localhost:3000';
  fileId: string = '';

  constructor(private http: HttpClient) {}

  // Upload new file
  uploadFile() {
    if (!this.filename) return alert("Enter filename");

    this.http.post<{ fileId: string, message: string }>(
      `${this.backendUrl}/onedrive/upload`,
      { filename: this.filename, content: this.fileContent }
    ).subscribe({
      next: res => {
        this.fileId = res.fileId;
        alert(res.message);
      },
      error: err => console.error("Upload failed:", err)
    });
  }

  // Load file content by filename
  loadFile() {
    if (!this.filename) return alert("Enter filename");

    this.http.get<{ fileId: string, filename: string, content: string }>(
      `${this.backendUrl}/onedrive/fileByName/${this.filename}`
    ).subscribe({
      next: res => {
        this.fileContent = res.content;
        this.fileId = res.fileId;
      },
      error: err => console.error("Load failed:", err)
    });
  }

  // Save updated content
  saveFile() {
    if (!this.filename) return alert("Enter filename");

    this.http.put<{ fileId: string, filename: string, message: string }>(
      `${this.backendUrl}/onedrive/fileByName/${this.filename}`,
      { content: this.fileContent }
    ).subscribe({
      next: res => alert(res.message),
      error: err => console.error("Save failed:", err)
    });
  }
}
