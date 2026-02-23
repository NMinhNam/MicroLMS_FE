import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private currentTheme = signal<'light' | 'dark'>('light');

    constructor() {
        // Check for saved preference
        const savedTheme = localStorage.getItem('app-theme') as 'light' | 'dark';
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.setTheme('dark');
        }
    }

    isDarkMode() {
        return this.currentTheme() === 'dark';
    }

    toggleTheme() {
        this.setTheme(this.currentTheme() === 'light' ? 'dark' : 'light');
    }

    private setTheme(theme: 'light' | 'dark') {
        this.currentTheme.set(theme);
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('app-theme', theme);

        // Also add/remove a class for components that might need it
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
}
