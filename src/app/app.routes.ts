import { Routes } from '@angular/router';
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { authGuard } from './core/guards/auth.guard';

// Auth Components
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register';

// Super Admin Components
import { Dashboard } from './features/super-admin/dashboard/dashboard';
import { Tenants } from './features/super-admin/tenants/tenants';
import { SubscriptionPlans } from './features/super-admin/subscription-plans/subscription-plans';

// Tenant Admin Components
import { BrandingSettings } from './features/tenant-admin/branding-settings/branding-settings';
import { CourseBuilder } from './features/tenant-admin/course-builder/course-builder';
import { UserManagement } from './features/tenant-admin/user-management/user-management';
import { RevenueAnalytics } from './features/tenant-admin/revenue-analytics';

// Learner Components
import { LearningSpace } from './features/learner/learning-space/learning-space';
import { CoursePlayer } from './features/learner/course-player/course-player';
import { ProfileVibe } from './features/learner/profile-vibe/profile-vibe';
import { Settings } from './features/learner/settings';
import { CourseCatalog } from './features/learner/course-catalog';
import { Checkout } from './features/learner/checkout';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: '',
        component: MainLayout,
        canActivate: [authGuard],
        children: [
            // Default Redirect
            { path: '', redirectTo: 'super-admin/dashboard', pathMatch: 'full' },

            // --- Super Admin Module ---
            { path: 'super-admin/dashboard', component: Dashboard },
            { path: 'super-admin/tenants', component: Tenants },
            { path: 'super-admin/plans', component: SubscriptionPlans },

            // --- Tenant Admin Module ---
            { path: 'tenant-admin/branding', component: BrandingSettings },
            { path: 'tenant-admin/builder', component: CourseBuilder },
            { path: 'tenant-admin/users', component: UserManagement },
            { path: 'tenant-admin/revenue', component: RevenueAnalytics },

            // --- Learner Module ---
            { path: 'learner/space', component: LearningSpace },
            { path: 'learner/catalog', component: CourseCatalog },
            { path: 'learner/checkout', component: Checkout },
            { path: 'learner/profile', component: ProfileVibe },
            { path: 'learner/settings', component: Settings },
        ]
    },
    // Course Player is a full-screen experience
    {
        path: 'learner/player',
        component: CoursePlayer,
        canActivate: [authGuard]
    },
    { path: '**', redirectTo: 'login' }
];
