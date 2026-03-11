import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-catalog.html',
  styleUrl: './course-catalog.css',
})
export class CourseCatalog implements OnInit {
  searchQuery = '';
  selectedCategory = 'All';
  selectedLevel = 'All';

  categories = ['All', 'Design', 'Development', 'Business', 'Marketing'];
  levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  courses = [
    {
      id: 201,
      title: 'Advanced React Architecture',
      instructor: 'Sarah Drasner',
      category: 'Development',
      level: 'Advanced',
      price: 199,
      students: 1250,
      rating: 4.9,
      image: '⚛️',
      color: '#61dafb'
    },
    {
      id: 202,
      title: 'UI/UX Design Masterclass',
      instructor: 'Gary Simon',
      category: 'Design',
      level: 'Intermediate',
      price: 149,
      students: 5400,
      rating: 4.8,
      image: '🎨',
      color: '#f24e1e'
    },
    {
      id: 203,
      title: 'Social Media Strategy 2026',
      instructor: 'Neil Patel',
      category: 'Marketing',
      level: 'Beginner',
      price: 89,
      students: 3100,
      rating: 4.7,
      image: '📈',
      color: '#ff4500'
    },
    {
      id: 204,
      title: 'High-Performance Teams',
      instructor: 'Simon Sinek',
      category: 'Business',
      level: 'Intermediate',
      price: 299,
      students: 890,
      rating: 5.0,
      image: '🤝',
      color: '#4a90e2'
    },
    {
      id: 205,
      title: 'Docker & Kubernetes Deep Dive',
      instructor: 'Bret Fisher',
      category: 'Development',
      level: 'Advanced',
      price: 179,
      students: 2100,
      rating: 4.9,
      image: '🐳',
      color: '#2496ed'
    },
    {
      id: 206,
      title: 'Figma for Advanced Prototypes',
      instructor: 'Mizu Tan',
      category: 'Design',
      level: 'Advanced',
      price: 129,
      students: 1800,
      rating: 4.9,
      image: '💎',
      color: '#a259ff'
    }
  ];

  filteredCourses = [...this.courses];

  constructor(private router: Router) { }

  ngOnInit() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredCourses = this.courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory === 'All' || course.category === this.selectedCategory;
      const matchesLevel = this.selectedLevel === 'All' || course.level === this.selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }

  enroll(course: any) {
    Swal.fire({
      title: 'Enroll in Course?',
      text: `Confirm your enrollment in ${course.title}. This will add the curriculum to your learning space.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#6366f1',
      confirmButtonText: 'Confirm Enrollment'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Secure Gateway Open',
          text: 'Initializing encrypted payment tunnel...',
          icon: 'info',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/learner/checkout']);
        });
      }
    });
  }
}
