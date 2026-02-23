import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

/**
 * Course Builder Feature (Tenant Admin)
 * 
 * Provides a drag-and-drop interface for creating course content.
 * Features:
 * - Module management (Add/Rename/Delete).
 * - Lesson management within modules.
 * - Content type selection (Video, Quiz, Document).
 * - Draft/Publish status control.
 * 
 * Location: src/app/features/tenant-admin/course-builder
 */
@Component({
  selector: 'app-course-builder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-builder.html',
  styleUrl: './course-builder.css',
})
export class CourseBuilder {
  // Course Metadata
  course = {
    title: 'Advanced Angular Architecture',
    description: 'Master the scale of modern frontend applications.',
    status: 'Draft'
  };

  // Structured curriculum data
  modules = [
    {
      id: 1,
      title: 'Introduction to Micro-Frontends',
      isOpen: true,
      lessons: [
        { id: 101, title: 'What are Micro-Frontends?', type: 'video', duration: '12:00' },
        { id: 102, title: 'Key Benefits & Challenges', type: 'document', duration: '5 min' }
      ]
    },
    {
      id: 2,
      title: 'Implementation Strategies',
      isOpen: false,
      lessons: [
        { id: 201, title: 'Iframe vs Web Components', type: 'video', duration: '18:30' },
        { id: 202, title: 'Module Federation Basics', type: 'video', duration: '22:15' },
        { id: 203, title: 'Architecture Quiz', type: 'quiz', duration: '10 questions' }
      ]
    }
  ];

  /**
   * Toggles module accordion
   */
  toggleModule(module: any) {
    module.isOpen = !module.isOpen;
  }

  /**
   * Simulates adding a new module
   */
  addModule() {
    const newId = Date.now();
    this.modules.push({
      id: newId,
      title: 'New Untitled Module',
      isOpen: true,
      lessons: []
    });
  }

  /**
   * Deletes a module
   */
  deleteModule(index: number) {
    Swal.fire({
      title: 'Delete Module?',
      text: 'Are you sure you want to delete this module and all its lessons? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete everything'
    }).then((result) => {
      if (result.isConfirmed) {
        this.modules.splice(index, 1);
        Swal.fire('Deleted!', 'Module removed.', 'success');
      }
    });
  }

  /**
   * Simulates adding a lesson to a module
   */
  addLesson(module: any) {
    const newId = Date.now();
    module.lessons.push({
      id: newId,
      title: 'Untitled Lesson',
      type: 'video',
      duration: '0:00'
    });
    module.isOpen = true; // Ensure module is expanded when adding lesson
  }

  /**
   * Deletes a lesson from a module
   */
  deleteLesson(module: any, lessonIndex: number) {
    module.lessons.splice(lessonIndex, 1);
  }

  /**
   * Returns icon based on content type
   */
  getContentIcon(type: string) {
    switch (type) {
      case 'video': return '📽️';
      case 'quiz': return '❓';
      case 'document': return '📄';
      default: return '🔗';
    }
  }

  /**
   * Simulates publishing the course
   */
  publishCourse() {
    this.course.status = 'Published';
    Swal.fire({
      title: 'Course Published!',
      text: 'Your curriculum is now live for all enrolled students.',
      icon: 'success',
      confirmButtonColor: '#6366f1'
    });
  }
}
