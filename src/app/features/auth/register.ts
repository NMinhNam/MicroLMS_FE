import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  user = {
    fullName: '',
    email: '',
    password: '',
    role: 'Learner'
  };

  isLoading = false;

  constructor(private router: Router) { }

  register() {
    this.isLoading = true;

    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;

      Swal.fire({
        title: 'Account Provisioned!',
        text: `Welcome to MicroLMS, ${this.user.fullName}. Your educational workspace has been initialized.`,
        icon: 'success',
        confirmButtonColor: '#6366f1'
      }).then(() => {
        this.router.navigate(['/login']);
      });
    }, 2000);
  }
}
