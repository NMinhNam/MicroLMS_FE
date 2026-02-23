import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Header } from '../../components/header/header';
import { RouterOutlet } from '@angular/router';

/**
 * MainLayout Component (Core Layout)
 * 
 * Acts as the primary application skeleton. Coordinates:
 * - Sidebar: Global navigation with role-based links.
 * - Header: Action bar for search, notifications, and profile.
 * - RouterOutlet: Dedicated space for feature-specific views.
 * 
 * Location: src/app/core/layouts/main-layout
 */
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [Sidebar, Header, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout {
}
