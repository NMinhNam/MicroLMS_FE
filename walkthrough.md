# walkthrough.md

## Platform Overview: Micro-LMS SaaS
**Current Capability**: Core UI & Functional Simulation
**Architecture**: Package-By-Feature (Angular 17+)

---

### 1. Super Admin Experience (Platform Management)
- **Dashboard**: High-level overview of total students, tenants, and active courses. Includes "Export Report" functionality with user feedback.
- **Tenant Management**: 
    - Full list of all training agencies.
    - **Cloud Provisioning Simulation**: A specialized modal that shows step-by-step logs (DB creation, S3 setup, etc.) when a new tenant is added.
    - Status management (Active/Warning) and secure deletion flow.
- **Subscription Plans**: Interface to monitor revenue per tier and modify plan details (pricing, student limits) via an "Edit Strategy" modal.

### 2. Tenant Admin Experience (Agency Owner)
- **Branding Settings**: A revolutionary customization panel where owners can change primary colors and interface roundness, with a **Live UI Preview** that reflects changes instantly on a mock interface.
- **Course Builder**: 
    - A structured curriculum editor allowing modules and lessons creation.
    - Inline editing for module/lesson titles for a faster workflow.
    - Publishing flow to make content live for learners.
- **User Management**: A clean table interface for managing the agency's students and instructors, including an "Invite User" system.

### 3. Learner Experience (End User)
- **Learning Space**: A personalized dashboard featuring welcome greetings, daily study streaks, and "Continue Learning" progress trackers.
- **Immersive Course Player**: 
    - "Cinema-style" video consumption mode.
    - Collapsible lesson sidebar for focus-driven learning.
    - Tabbed interface for lesson resources and Q&A.
- **Profile Vibe**: A gamified profile page showcasing XP progress, collected digital badges (Speed Learner, Quiz Master), and a global leaderboard.

---

### Implementation Details
- **Logic**: All interactions use Angular Signal-ready patterns (though standard class-based for now) with full two-way binding.
- **Aesthetics**: Vanilla CSS with custom property tokens, backdrop-blurs, and vibrant gradients for a premium "Apple-like" feel.
- **Data**: Mocked via component properties to ensure the UI feels alive during development.
