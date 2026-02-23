import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css',
})
export class UserManagement {
  // Modal state
  showInviteModal = false;
  isInviting = false;

  // New User Form
  newUser = {
    name: '',
    email: '',
    role: 'Student'
  };

  // Mock users data
  users = [
    { id: 1, name: 'Alice Wong', email: 'alice@example.com', role: 'Student', status: 'Active', joined: '2026-01-10' },
    { id: 2, name: 'Michael Chen', email: 'michael.c@agency.com', role: 'Instructor', status: 'Active', joined: '2025-12-05' },
    { id: 3, name: 'Sarah Miller', email: 'sarah.m@gmail.com', role: 'Student', status: 'Inactive', joined: '2026-02-01' },
    { id: 4, name: 'David Lee', email: 'david.l@university.edu', role: 'Student', status: 'Active', joined: '2026-01-15' },
    { id: 5, name: 'Elena Rodriguez', email: 'rodriguez.e@design.com', role: 'Instructor', status: 'Warning', joined: '2026-01-20' }
  ];

  // Filters state
  searchQuery = '';
  selectedRole = 'All';
  selectedStatus = 'All';

  // Dropdown options
  identities = [
    { label: 'All Identities', value: 'All' },
    { label: 'Students', value: 'Student' },
    { label: 'Instructors', value: 'Instructor' }
  ];

  lifecycles = [
    { label: 'All Status', value: 'All' },
    { label: 'Pulse Active', value: 'Active' },
    { label: 'Dormant', value: 'Inactive' },
    { label: 'Flagged', value: 'Warning' }
  ];

  /**
   * Returns a subset of users based on current filters
   */
  get filteredUsers() {
    return this.users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesRole = this.selectedRole === 'All' || user.role === this.selectedRole;
      const matchesStatus = this.selectedStatus === 'All' || user.status === this.selectedStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }

  /**
   * Toggles user status for demonstration
   */
  toggleUserStatus(user: any) {
    user.status = user.status === 'Active' ? 'Inactive' : 'Active';
    console.log(`User ${user.name} status changed to ${user.status}`);
  }

  /**
   * Deletes user
   */
  deleteUser(user: any) {
    Swal.fire({
      title: 'Remove User?',
      text: `Are you sure you want to remove ${user.name} from the platform?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, remove'
    }).then((result) => {
      if (result.isConfirmed) {
        this.users = this.users.filter(u => u.id !== user.id);
        Swal.fire('Removed!', 'User access has been revoked.', 'success');
      }
    });
  }

  /**
   * Toggles invitation modal
   */
  toggleInviteModal() {
    this.showInviteModal = !this.showInviteModal;
    if (!this.showInviteModal) {
      this.newUser = { name: '', email: '', role: 'Student' };
    }
  }

  /**
   * Simulates sending an invite
   */
  sendInvite() {
    if (!this.newUser.name || !this.newUser.email) return;

    this.isInviting = true;
    setTimeout(() => {
      this.users.unshift({
        id: Date.now(),
        name: this.newUser.name,
        email: this.newUser.email,
        role: this.newUser.role,
        status: 'Active',
        joined: new Date().toISOString().split('T')[0]
      });
      this.isInviting = false;
      this.toggleInviteModal();

      Swal.fire({
        title: 'Invitation Sent!',
        text: `An enrollment invite has been sent to ${this.newUser.email}`,
        icon: 'success',
        timer: 2500,
        showConfirmButton: false
      });
    }, 1200);
  }
}
