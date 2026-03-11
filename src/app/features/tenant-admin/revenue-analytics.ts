import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-revenue-analytics',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './revenue-analytics.html',
  styleUrl: './revenue-analytics.css',
})
export class RevenueAnalytics {
  totalRevenue = 54290;
  activeEnrollments = 1240;
  avgOrderValue = 145;

  courses = [
    { title: 'UX Design Fundamentals', revenue: 12500, enrollments: 340, growth: 12, color: '#6366f1' },
    { title: 'Python for Data Science', revenue: 9800, enrollments: 210, growth: 8, color: '#10b981' },
    { title: 'Motion Graphics Masterclass', revenue: 15400, enrollments: 450, growth: 24, color: '#f43f5e' },
    { title: 'SwiftUI Deep Dive', revenue: 6400, enrollments: 120, growth: -2, color: '#f59e0b' },
    { title: 'Public Speaking', revenue: 10190, enrollments: 120, growth: 5, color: '#a259ff' }
  ];

  transactions = [
    { id: 'TXN-9021', user: 'Alex Rivera', amount: 199, status: 'Completed', date: '2 mins ago' },
    { id: 'TXN-9020', user: 'Jordan Smith', amount: 149, status: 'Completed', date: '1 hour ago' },
    { id: 'TXN-9019', user: 'Casey Jones', amount: 299, status: 'Completed', date: '3 hours ago' },
    { id: 'TXN-9018', user: 'Riley Evans', amount: 89, status: 'Failed', date: '5 hours ago' }
  ];

  exportData() {
    Swal.fire({
      title: 'Exporting Financials',
      text: 'Compiling revenue matrix for the current quarter...',
      icon: 'info',
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
  }
}
