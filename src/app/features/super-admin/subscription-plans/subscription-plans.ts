import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

/**
 * Subscription Plans Feature (Super Admin)
 * 
 * Manages the monetization tiers of the platform.
 * Allows Super Admin to:
 * - Define and edit plan features.
 * - Monitor active subscriptions per plan.
 * - Set pricing and limits (student count, storage).
 * 
 * Location: src/app/features/super-admin/subscription-plans
 */
@Component({
  selector: 'app-subscription-plans',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscription-plans.html',
  styleUrl: './subscription-plans.css',
})
export class SubscriptionPlans {
  // UI State
  showEditModal = false;
  editingPlan: any = null;
  isSaving = false;

  // Available subscription tiers
  plans = [
    {
      name: 'Free Tier',
      price: 0,
      students: 50,
      storage: '5GB',
      revenue: 0,
      activeTenants: 42,
      features: ['Basic Course Builder', 'Community Support', 'Standard Branding'],
      isPopular: false,
      color: '#6b7280'
    },
    {
      name: 'Pro Plan',
      price: 49,
      students: 500,
      storage: '50GB',
      revenue: 3822,
      activeTenants: 78,
      features: ['AI Assistant Enabled', 'Priority Support', 'Custom Domain', 'Advanced Analytics'],
      isPopular: true,
      color: 'var(--primary-color)'
    },
    {
      name: 'Enterprise',
      price: 199,
      students: 'Unlimited',
      storage: '500GB',
      revenue: 1592,
      activeTenants: 8,
      features: ['White-label App', 'Dedicated Success Manager', 'SSO Integration', 'SLA Guarantee'],
      isPopular: false,
      color: '#1e293b'
    }
  ];

  /**
   * Opens the edit modal for a specific plan
   */
  editPlan(plan: any) {
    this.editingPlan = { ...plan }; // Clone the plan for editing
    this.showEditModal = true;
  }

  /**
   * Simulates saving the modified plan
   */
  savePlan() {
    this.isSaving = true;

    setTimeout(() => {
      const index = this.plans.findIndex(p => p.name === this.editingPlan.name);
      if (index !== -1) {
        this.plans[index] = { ...this.editingPlan };
      }
      this.isSaving = false;
      this.closeModal();

      Swal.fire({
        title: 'Strategy Updated',
        text: `The ${this.editingPlan.name} has been updated across the platform.`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    }, 1000);
  }

  /**
   * Closes the edit modal
   */
  closeModal() {
    this.showEditModal = false;
    this.editingPlan = null;
  }

  /**
   * Refreshes dashboard statistics (Simulated)
   */
  refreshStats() {
    console.log('Refreshing monetization stats...');
    // Real logic would re-fetch from backend
  }
}
