import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
 standalone: true,
  imports: [
    CommonModule,         // ✅ needed for *ngIf, *ngFor
    ReactiveFormsModule,  // ✅ needed for [formGroup], formControlName
    FormsModule           // (optional) template-driven forms
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
 
})

export class LoginComponent {
  currentStep: 'phone' | 'details' | 'otp' = 'phone';
  phoneForm: FormGroup;
  detailsForm: FormGroup;
  otpForm: FormGroup;
  isLoading = false;
  phoneNumber = '';

  constructor(private fb: FormBuilder) {
    this.phoneForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]]
    });

    this.detailsForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  onPhoneSubmit() {
    if (this.phoneForm.valid) {
      this.isLoading = true;
      this.phoneNumber = this.phoneForm.get('phone')?.value;
      
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.currentStep = 'details';
      }, 1000);
    }
  }

  onDetailsSubmit() {
    if (this.detailsForm.valid) {
      this.isLoading = true;
      
      // Simulate sending OTP
      setTimeout(() => {
        this.isLoading = false;
        this.currentStep = 'otp';
      }, 1000);
    }
  }

  onOtpSubmit() {
    if (this.otpForm.valid) {
      this.isLoading = true;
      
      // Simulate OTP verification
      setTimeout(() => {
        this.isLoading = false;
        alert('Login Successful!');
        // Redirect to dashboard or home page
      }, 1000);
    }
  }

  onBackStep() {
    if (this.currentStep === 'details') {
      this.currentStep = 'phone';
    } else if (this.currentStep === 'otp') {
      this.currentStep = 'details';
    }
  }

  resendOtp() {
    // Implement resend OTP logic
    console.log('Resending OTP...');
  }

  // Utility methods for form validation
  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(form: FormGroup, fieldName: string): string {
    const field = form.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['pattern']) {
        if (fieldName === 'phone') return 'Enter a valid 10-digit mobile number';
        if (fieldName === 'otp') return 'Enter a valid 6-digit OTP';
      }
      if (field.errors['email']) return 'Enter a valid email address';
      if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }
}