import { Component,OnInit, OnDestroy, HostListener } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})


export class NavBarComponent implements OnInit, OnDestroy {
  selectedCity: string = 'All Cities';
  cities: string[] = [
    'All Cities',
    'Mumbai',
    'Delhi NCR',
    'Bangalore',
    'Chennai',
    'Kolkata',
    'Hyderabad',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Chandigarh',
    'Goa',
    'Indore',
    'Kochi',
    'Lucknow'
  ];
  
  isScrolled = false;
  isMobileMenuOpen = false;
  activeDropdown: string | null = null;

  constructor(private router: Router) { 
    
  }

  ngOnInit(): void {
    // Any initialization logic
  }

  ngOnDestroy(): void {
    // Cleanup logic
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.pageYOffset > 10;
  }

  onCityChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCity = target.value;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleDropdown(menu: string): void {
    this.activeDropdown = this.activeDropdown === menu ? null : menu;
  }

  closeDropdowns(): void {
    this.activeDropdown = null;
  }

  onSearch(): void {
    console.log('Search clicked');
  }

  onWriteReview(): void {
    console.log('Write Review clicked');
  }

  onDownloadApp(): void {
    console.log('Download App clicked');
  }

  onLogin() {
    this.router.navigate(['/auth/login']);
  }

  // Navigation methods
  navigateToVenues(): void {
    console.log('Navigate to Venues');
  }

  navigateToVendors(): void {
    console.log('Navigate to Vendors');
  }

  navigateToPhotos(): void {
    console.log('Navigate to Photos');
  }

  navigateToRealWeddings(): void {
    console.log('Navigate to Real Weddings');
  }

  navigateToBlog(): void {
    console.log('Navigate to Blog');
  }

  navigateToEInvites(): void {
    console.log('Navigate to E-Invites');
  }

  navigateToGenie(): void {
    console.log('Navigate to Genie');
  }
}