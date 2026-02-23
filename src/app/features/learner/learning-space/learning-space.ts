import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-learning-space',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learning-space.html',
  styleUrl: './learning-space.css',
})
export class LearningSpace {
  // Courses being currently studied
  activeCourses = [
    { id: 101, title: 'UX Design Fundamentals', instructor: 'Sarah Jenkins', progress: 65, lastAccessed: '2 hours ago', color: '#6366f1' },
    { id: 102, title: 'Motion Graphics with After Effects', instructor: 'Aris T.', progress: 12, lastAccessed: 'Yesterday', color: '#f43f5e' },
    { id: 103, title: 'Python for Data Science', instructor: 'Dr. Emily Watson', progress: 88, lastAccessed: 'Just now', color: '#10b981' }
  ];

  // Recommendations for the learner
  recommendations = [
    { title: 'High-Conversion Landing Pages', level: 'Intermediate', duration: '4.5 hrs', rating: 4.9 },
    { title: 'SwiftUI Masterclass', level: 'Beginner', duration: '12 hrs', rating: 4.8 },
    { title: 'Public Speaking for Techies', level: 'All Levels', duration: '2 hrs', rating: 5.0 }
  ];

  // Weekly Activity Data
  weeklyActivity = {
    hoursSpent: 14.5,
    goal: 20,
    streak: 5
  };

  constructor(private router: Router) { }

  /**
   * Opens the course player
   */
  openCourse(course: any) {
    console.log('Opening course:', course.title);
    this.router.navigate(['/learner/player']);
  }

  /**
   * Simulates enrolling in a new course
   */
  enrollNow(course: any) {
    Swal.fire({
      title: 'Enrolled Successfully!',
      text: `"${course.title}" has been added to your dashboard. Redirecting to first lesson...`,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    }).then(() => {
      this.router.navigate(['/learner/player']);
    });
  }

  /**
   * Navigate to Profile/Achievements
   */
  viewAchievements() {
    this.router.navigate(['/learner/profile']);
  }
}
