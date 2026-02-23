import { Component } from '@angular/core';
import { NgFor, CurrencyPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

/**
 * Super Admin Dashboard Feature
 * 
 * Provides an overview of the entire SaaS platform.
 * Features:
 * - High-level KPIs (Total Tenants, Revenue, Growth).
 * - Tenant list with health monitoring.
 * 
 * Location: src/app/features/super-admin/dashboard
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(private router: Router) { }

  // Analytical stats for the platform overview
  stats = [
    { label: 'Total Tenants', value: '128', icon: '🏢', change: '+12%', positive: true },
    { label: 'Total Revenue', value: 12500, icon: '💰', change: '+8%', positive: true, isCurrency: true },
    { label: 'Active Students', value: '4,250', icon: '👨‍🎓', change: '+5%', positive: true },
    { label: 'Storage Used', value: '42%', icon: '💾', change: '-2%', positive: false }
  ];

  // List of tenants currently onboarded
  tenants = [
    { name: 'English First', owner: 'John Doe', status: 'Active', health: 98, plan: 'Pro' },
    { name: 'SkillShare Vietnam', owner: 'Nguyen Van A', status: 'Active', health: 92, plan: 'Enterprise' },
    { name: 'Coding Academy', owner: 'Alice Smith', status: 'Warning', health: 65, plan: 'Free' },
    { name: 'Design Hub', owner: 'Bob Johnson', status: 'Active', health: 95, plan: 'Pro' }
  ];

  /**
   * Logic to determine CSS class based on the health percentage of a tenant.
   * @param health The health percentage (0-100)
   */
  getHealthClass(health: number) {
    if (health > 90) return 'health-good';
    if (health > 70) return 'health-neutral';
    return 'health-bad';
  }

  /**
   * Navigate to the full Tenant Management page
   */
  navigateToTenants() {
    this.router.navigate(['/super-admin/tenants']);
  }

  /**
   * Simulate report generation
   */
  exportReport() {
    Swal.fire({
      title: 'Generating Report',
      text: 'Platform report is being generated and will be sent to your email.',
      icon: 'info',
      confirmButtonColor: '#6366f1'
    });
  }

  /**
   * Quick action: Edit tenant
   */
  editTenant(tenant: any) {
    console.log('Editing tenant:', tenant.name);
    this.router.navigate(['/super-admin/tenants'], { queryParams: { edit: tenant.name } });
  }
}
