import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  step = 1; // 1: Billing, 2: Payment, 3: Success
  paymentMethod = 'stripe';
  isProcessing = false;

  course = {
    title: 'Advanced React Architecture',
    instructor: 'Sarah Drasner',
    price: 199,
    tax: 15.92
  };

  billing = {
    fullName: 'Alex Rivera',
    address: '123 Tech Lane',
    city: 'San Francisco',
    zip: '94103'
  };

  constructor(private router: Router) { }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  processPayment() {
    this.isProcessing = true;

    // Simulate payment gateway delay
    setTimeout(() => {
      this.isProcessing = false;
      this.step = 3;

      Swal.fire({
        title: 'Transaction Authorized!',
        text: 'Curriculum ownership has been transferred to your vault.',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
        backdrop: `rgba(99, 102, 241, 0.2)`
      });
    }, 2500);
  }

  goToLearningSpace() {
    this.router.navigate(['/learner/space']);
  }
}
