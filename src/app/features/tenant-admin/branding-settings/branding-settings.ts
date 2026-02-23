import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-branding-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './branding-settings.html',
  styleUrl: './branding-settings.css',
})
export class BrandingSettings {
  // Current branding configuration
  config = {
    siteName: 'Acme Learning Center',
    primaryColor: '#6366f1', // Indigo
    secondaryColor: '#f43f5e', // Rose
    borderRadius: 8,
    logoUrl: 'https://via.placeholder.com/150x50?text=LOGO'
  };

  // Status flags
  isSaving = false;

  /**
   * Resets branding to default values
   */
  resetToDefaults() {
    Swal.fire({
      title: 'Reset Branding?',
      text: 'This will revert your platform to the default visual identity.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6366f1',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Reset Now'
    }).then((result) => {
      if (result.isConfirmed) {
        this.config = {
          siteName: 'Acme Learning Center',
          primaryColor: '#6366f1',
          secondaryColor: '#f43f5e',
          borderRadius: 8,
          logoUrl: 'https://via.placeholder.com/150x50?text=LOGO'
        };
        Swal.fire('Reset Complete', 'Default theme applied.', 'success');
      }
    });
  }

  /**
   * Simulates saving settings to the backend
   */
  saveSettings() {
    this.isSaving = true;

    // Simulate API call
    setTimeout(() => {
      this.isSaving = false;

      Swal.fire({
        title: 'Branding Synced!',
        text: 'Your new visual identity is now propagating across the platform.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        position: 'top-end',
        toast: true
      });

      console.log('Branding settings saved:', this.config);
    }, 1500);
  }
}
