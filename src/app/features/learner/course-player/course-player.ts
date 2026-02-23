import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as Plyr from 'plyr';

@Component({
  selector: 'app-course-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-player.html',
  styleUrl: './course-player.css',
})
export class CoursePlayer implements AfterViewInit, OnDestroy {
  @ViewChild('videoPlayer') videoElement!: ElementRef;
  player: any;

  // Current active lesson
  currentLesson = {
    id: 101,
    title: 'Modern Architecture Patterns',
    module: 'Foundations',
    type: 'video',
    videoUrl: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
    poster: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg'
  };

  // Course structure for sidebar
  curriculum = [
    {
      title: 'Phase 1: Foundations',
      lessons: [
        { id: 101, title: 'Modern Architecture Patterns', duration: '12:45', completed: true, videoUrl: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4' },
        { id: 102, title: 'Defining Your Tech Stack', duration: '08:20', completed: false, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' }
      ]
    },
    {
      title: 'Phase 2: Advanced Logic',
      lessons: [
        { id: 201, title: 'State Management at Scale', duration: '24:10', completed: false, videoUrl: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4' },
        { id: 202, title: 'Dependency Injection Deep Dive', duration: '15:30', completed: false, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' }
      ]
    }
  ];

  // UI State
  isSidebarOpen = true;
  activeTab = 'overview';

  constructor(private router: Router) { }

  ngAfterViewInit() {
    this.initPlayer();
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.destroy();
    }
  }

  initPlayer() {
    try {
      // Handle both default and namespace imports
      const PlyrConstructor = (Plyr as any).default || Plyr;
      this.player = new PlyrConstructor(this.videoElement.nativeElement, {
        tooltips: { controls: true, seek: true },
        quality: { default: 576, options: [720, 576, 480, 360] }
      });
    } catch (e) {
      console.error('Plyr initialization failed:', e);
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  goBack() {
    this.router.navigate(['/learner/space']);
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  selectLesson(lesson: any) {
    this.currentLesson = {
      ...lesson,
      module: lesson.id < 200 ? 'Foundations' : 'Advanced Logic',
      type: 'video'
    };

    if (this.player) {
      this.player.source = {
        type: 'video',
        sources: [{ src: lesson.videoUrl, type: 'video/mp4' }]
      };
      this.player.play();
    }

    // Toast notification
    Swal.fire({
      title: 'Now Playing',
      text: lesson.title,
      icon: 'info',
      toast: true,
      position: 'bottom-start',
      timer: 1500,
      showConfirmButton: false
    });
  }

  markAsComplete() {
    const lesson = this.findLessonById(this.currentLesson.id);
    if (lesson) {
      lesson.completed = true;

      Swal.fire({
        title: 'Mission Accomplished! 🚀',
        text: 'Progress synchronized to your curriculum.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    }
  }

  private findLessonById(id: number) {
    for (const phase of this.curriculum) {
      const lesson = phase.lessons.find(l => l.id === id);
      if (lesson) return lesson;
    }
    return null;
  }
}
