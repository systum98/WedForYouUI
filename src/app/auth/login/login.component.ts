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
  userPhone = '';

  constructor(private fb: FormBuilder) {
    this.phoneForm = this.fb.group({
      phoneOrEmail: ['', [Validators.required, this.phoneOrEmailValidator]]
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

  // Custom validator for phone or email
  phoneOrEmailValidator(control: any) {
    const value = control.value;
    if (!value) return null;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[6-9]\d{9}$/;

    if (emailPattern.test(value) || phonePattern.test(value)) {
      return null; // Valid
    }
    return { invalidPhoneOrEmail: true }; // Invalid
  }

  onPhoneSubmit() {
    if (this.phoneForm.valid) {
      this.isLoading = true;
      const inputValue = this.phoneForm.get('phoneOrEmail')?.value;
      
      // Store phone number for display
      this.userPhone = this.isPhoneNumber(inputValue) ? inputValue : '';
      
      console.log('Phone/Email submitted:', inputValue);
      
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.currentStep = 'details';
      }, 1000);
    } else {
      this.phoneForm.markAllAsTouched();
    }
  }

  onDetailsSubmit() {
    if (this.detailsForm.valid) {
      this.isLoading = true;
      const formData = this.detailsForm.value;
      
      console.log('Details submitted:', formData);
      
      // Simulate API call to send OTP
      setTimeout(() => {
        this.isLoading = false;
        this.currentStep = 'otp';
        alert('OTP sent successfully!');
      }, 1000);
    } else {
      this.detailsForm.markAllAsTouched();
    }
  }

  onOtpSubmit() {
    if (this.otpForm.valid) {
      this.isLoading = true;
      const otpValue = this.otpForm.get('otp')?.value;
      
      console.log('OTP submitted:', otpValue);
      
      // Simulate OTP verification
      setTimeout(() => {
        this.isLoading = false;
        alert('Login Successful! Welcome to WedMeGood!');
        // Here you would typically redirect to dashboard
        this.resetForm();
      }, 1000);
    } else {
      this.otpForm.markAllAsTouched();
    }
  }

  clearInput() {
    this.phoneForm.get('phoneOrEmail')?.setValue('');
  }

  resendOtp() {
    console.log('Resending OTP...');
    alert('OTP resent successfully!');
  }

  onClose() {
    console.log('Closing login modal');
    this.resetForm();
  }

  resetForm() {
    this.currentStep = 'phone';
    this.phoneForm.reset();
    this.detailsForm.reset();
    this.otpForm.reset();
    this.userPhone = '';
    this.isLoading = false;
  }

  // Helper method to check if input is phone number
  isPhoneNumber(value: string): boolean {
    const phonePattern = /^[6-9]\d{9}$/;
    return phonePattern.test(value);
  }

  // Utility methods for form validation
  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(form: FormGroup, fieldName: string): string {
    const field = form.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        if (fieldName === 'phoneOrEmail') return 'Phone number or email is required';
        if (fieldName === 'firstName') return 'First name is required';
        if (fieldName === 'lastName') return 'Last name is required';
        if (fieldName === 'email') return 'Email is required';
        if (fieldName === 'otp') return 'OTP is required';
      }
      if (field.errors['invalidPhoneOrEmail']) {
        return 'Enter a valid phone number or email address';
      }
      if (field.errors['email']) return 'Enter a valid email address';
      if (field.errors['minlength']) {
        return `Minimum ${field.errors['minlength'].requiredLength} characters required`;
      }
      if (field.errors['pattern']) {
        if (fieldName === 'otp') return 'Enter a valid 6-digit OTP';
      }
    }
    return '';
  }
}