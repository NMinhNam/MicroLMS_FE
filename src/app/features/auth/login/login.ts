import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.html',
    styleUrl: './login.css'
})
export class Login {
    credentials = {
        email: 'admin@microlms.com',
        password: 'password123'
    };

    isLoading = false;
    errorMessage = '';

    constructor(private router: Router) { }

    login() {
        this.isLoading = true;
        this.errorMessage = '';

        // Simulate API call
        setTimeout(() => {
            if (this.credentials.email === 'admin@microlms.com' && this.credentials.password === 'password123') {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('user', JSON.stringify({
                    name: 'Alex Rivera',
                    role: 'Super Admin',
                    avatar: 'AR'
                }));

                Swal.fire({
                    title: 'Welcome Back!',
                    text: 'Authentication successful. Synchronizing your workspace...',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                    position: 'top-end',
                    toast: true
                });

                this.router.navigate(['/super-admin/dashboard']);
            } else {
                this.errorMessage = 'Invalid email or password. Please try again.';
                Swal.fire({
                    title: 'Login Failed',
                    text: 'Invalid email or password. Please try again.',
                    icon: 'error',
                    confirmButtonColor: '#ef4444'
                });
            }
            this.isLoading = false;
        }, 1500);
    }
}
