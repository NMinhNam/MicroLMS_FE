import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  user = {
    name: 'Alex Rivera',
    email: 'admin@microlms.com',
    avatar: 'AR',
    bio: 'Frontend Architect & UI Enthusiast. Building the future of educational SaaS.'
  };

  security = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  activeTab = 'profile';
  isLoading = false;

  saveProfile() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      Swal.fire({
        title: 'Identity Synchronized',
        text: 'Your profile preferences have been updated across the network.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    }, 1200);
  }

  updatePassword() {
    if (this.security.newPassword !== this.security.confirmPassword) {
      Swal.fire('Error', 'New passwords do not match.', 'error');
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      Swal.fire({
        title: 'Security Hardened',
        text: 'Your access credentials have been successfully rotated.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
      this.security = { currentPassword: '', newPassword: '', confirmPassword: '' };
    }, 1500);
  }
}
