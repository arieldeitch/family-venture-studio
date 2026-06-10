# Founder Console Backlog

## Executive Summary

The Founder Console backlog is optimized for one goal: **Deploy working MVP in < 1 week**.

Every story, task, and epic is ruthlessly prioritized around the core workflow:
**Founder submits idea → Factory processes → Founder approves → Live.**

**Philosophy:** Working software > Completeness. Ship it, iterate it.

---

## MVP Scope Definition

### In Scope (MVP)
✅ Idea submission (form)  
✅ Idea list view (read)  
✅ Initiative dashboard (Kanban view)  
✅ Approval modal (approve/reject)  
✅ Authentication (Supabase SSO)  
✅ Basic deployment (Vercel)  

### Out of Scope (MVP)
❌ Asset library (defer to V1)  
❌ Advanced search/filtering (defer to V1)  
❌ Real-time updates (defer to V1)  
❌ Mobile app (defer to V2)  
❌ Email notifications (defer to V1)  
❌ Audit logging (defer to V1)  
❌ Role-based access (defer to V1)  

**Total MVP Scope:** 4 pages, 8 components, 3 API endpoints.

---

## Epic List

### Epic 1: Authentication & Foundation
**Goal:** Founder can log in securely.  
**Includes:** Supabase setup, auth context, protected routes.  
**Acceptance Criteria:**
- [ ] Founder logs in via Supabase Auth
- [ ] Auth state persists across page refreshes
- [ ] Unauthenticated users redirected to login

**Effort:** 2 days  
**Priority:** P0 (blocker)

---

### Epic 2: Idea Submission
**Goal:** Founder can submit ideas in < 30 seconds.  
**Includes:** Idea form, API endpoint, database storage.  
**Acceptance Criteria:**
- [ ] Founder submits idea with title + description
- [ ] Idea appears in list immediately (< 2 seconds)
- [ ] Submission form validates input (title required)
- [ ] Success toast confirms submission

**Effort:** 2 days  
**Priority:** P0 (core feature)

---

### Epic 3: Initiative Dashboard
**Goal:** Founder sees pipeline status at a glance.  
**Includes:** Kanban board, status sync, initiative cards.  
**Acceptance Criteria:**
- [ ] Dashboard shows 4 columns (Discovery, Approved, Building, Deployed)
- [ ] Initiatives populate from database
- [ ] Status badges visible on each card
- [ ] Page loads in < 2 seconds

**Effort:** 3 days  
**Priority:** P0 (core feature)

---

### Epic 4: Approval Workflow
**Goal:** Founder approves/rejects initiatives in < 10 seconds.  
**Includes:** Approval modal, API update, status transition.  
**Acceptance Criteria:**
- [ ] Click "Approve" opens modal with PRD summary
- [ ] Founder clicks "Approve" or "Reject"
- [ ] Status updates immediately in database
- [ ] Confirmation toast + initiative moves to next stage

**Effort:** 2 days  
**Priority:** P0 (core feature)

---

### Epic 5: Layout & Navigation
**Goal:** Consistent UI across all pages.  
**Includes:** Header, nav bar, layout component, styling.  
**Acceptance Criteria:**
- [ ] Navbar visible on all pages
- [ ] Logo + "Founder Console" branding
- [ ] User menu (logout button)
- [ ] Tailwind CSS responsive design
- [ ] Mobile-friendly

**Effort:** 1 day  
**Priority:** P1 (enabler)

---

## User Stories

### Story 1.1: Founder Logs In
**Epic:** Authentication & Foundation  
**As a** Founder  
**I want to** log in via email/password  
**So that** I can access the console  

**Acceptance Criteria:**
- [ ] Login page displays email + password fields
- [ ] Founder enters credentials
- [ ] Supabase auth validates credentials
- [ ] On success, redirect to dashboard
- [ ] On failure, show error message

**Technical Notes:**
- Use Supabase Auth (signInWithPassword)
- Redirect to /dashboard on success
- Show error toast on failure

**Effort:** 1 day  
**Story Points:** 3  

---

### Story 1.2: Session Persists
**Epic:** Authentication & Foundation  
**As a** Founder  
**I want** my session to persist across page refreshes  
**So that** I don't have to log in repeatedly  

**Acceptance Criteria:**
- [ ] JWT token stored in secure cookie
- [ ] Page refresh does not require re-login
- [ ] Token auto-refreshed before expiration
- [ ] Logout clears session

**Technical Notes:**
- Use Supabase Auth (automatic JWT refresh)
- Store in httpOnly cookie (Supabase handles this)

**Effort:** 0.5 day  
**Story Points:** 2  

---

### Story 2.1: Idea Submission Form
**Epic:** Idea Submission  
**As a** Founder  
**I want to** submit an idea with title + description  
**So that** the factory can evaluate it  

**Acceptance Criteria:**
- [ ] Form displays title field (required)
- [ ] Form displays description field (required)
- [ ] Form validates both fields before submission
- [ ] Submit button disabled until valid
- [ ] Form clears on successful submission

**Technical Notes:**
- Create /pages/idea-submit.tsx or modal component
- Client-side validation (title length > 3, description > 10)
- POST /api/ideas endpoint

**Effort:** 1 day  
**Story Points:** 3  

---

### Story 2.2: Create Ideas API
**Epic:** Idea Submission  
**As a** backend  
**I need to** store ideas in the database  
**So that** ideas persist and can be retrieved  

**Acceptance Criteria:**
- [ ] POST /api/ideas accepts title + description
- [ ] API validates JWT token
- [ ] Idea inserted into database with founder_id
- [ ] Returns 200 + idea object on success
- [ ] Returns 400 on validation error

**Technical Notes:**
- Use Supabase client to insert into ideas table
- Check JWT in request header
- Extract user_id from JWT token

**Effort:** 1 day  
**Story Points:** 3  

---

### Story 2.3: Idea List View
**Epic:** Idea Submission  
**As a** Founder  
**I want to** see all my submitted ideas  
**So that** I can track idea status  

**Acceptance Criteria:**
- [ ] Page displays list of ideas
- [ ] Each idea shows title + status badge
- [ ] Sorted by created_at (newest first)
- [ ] Click idea to see detail (title + description)
- [ ] Page loads in < 2 seconds

**Technical Notes:**
- Create /pages/ideas.tsx
- GET /api/ideas endpoint
- Use React useEffect + useState for data fetching

**Effort:** 1.5 days  
**Story Points:** 3  

---

### Story 3.1: Initiative Dashboard
**Epic:** Initiative Dashboard  
**As a** Founder  
**I want to** see all initiatives in a Kanban board  
**So that** I understand the factory pipeline  

**Acceptance Criteria:**
- [ ] Dashboard shows 4 columns (Discovery, Approved, Building, Deployed)
- [ ] Each column displays initiatives in that status
- [ ] Initiative cards show name + status badge
- [ ] Page loads in < 2 seconds
- [ ] Mobile responsive

**Technical Notes:**
- Create /pages/dashboard.tsx
- Fetch from GET /api/initiatives
- Group by status in React component
- Use Tailwind grid layout

**Effort:** 2 days  
**Story Points:** 5  

---

### Story 3.2: Fetch Initiatives API
**Epic:** Initiative Dashboard  
**As a** backend  
**I need to** retrieve all initiatives  
**So that** the dashboard can display them  

**Acceptance Criteria:**
- [ ] GET /api/initiatives returns all initiatives
- [ ] Each initiative includes: id, name, status, owner_agent
- [ ] Response includes estimated timelines
- [ ] Returns empty array if no initiatives
- [ ] Response time < 500ms

**Technical Notes:**
- Query initiatives table from Supabase
- Join with ideas table if needed
- No authentication required (public read)

**Effort:** 1 day  
**Story Points:** 3  

---

### Story 4.1: Approval Modal
**Epic:** Approval Workflow  
**As a** Founder  
**I want to** approve or reject an initiative  
**So that** the factory knows what to build  

**Acceptance Criteria:**
- [ ] Click initiative opens approval modal
- [ ] Modal shows initiative name + PRD summary (2-3 bullets)
- [ ] "Approve" button (primary)
- [ ] "Reject" button (secondary)
- [ ] Modal closes after decision
- [ ] Confirmation toast shows

**Technical Notes:**
- Create /components/ApprovalModal.tsx
- Pass initiative object as prop
- On approve, call PATCH /api/initiatives/[id]

**Effort:** 1.5 days  
**Story Points:** 3  

---

### Story 4.2: Update Initiative Status API
**Epic:** Approval Workflow  
**As a** backend  
**I need to** update initiative status  
**So that** approvals are recorded  

**Acceptance Criteria:**
- [ ] PATCH /api/initiatives/[id] accepts status + feedback
- [ ] Validates JWT token + user authorization
- [ ] Updates initiative status in database
- [ ] Returns updated initiative object
- [ ] Logs timestamp of change

**Technical Notes:**
- Create /api/initiatives/[id].ts
- Use dynamic route for initiative ID
- Update initiatives table in Supabase
- Add updated_at timestamp

**Effort:** 1 day  
**Story Points:** 3  

---

### Story 4.3: Initiative Status Badge
**Epic:** Approval Workflow  
**As a** Founder  
**I want to** see visual status indicators  
**So that** I quickly understand initiative stage  

**Acceptance Criteria:**
- [ ] Discovery: Blue badge
- [ ] Approved: Green badge
- [ ] Building: Yellow badge
- [ ] Deployed: Green badge (darker)
- [ ] Badges visible on all initiative cards

**Technical Notes:**
- Create /components/StatusBadge.tsx
- Use Tailwind color classes
- Reusable component

**Effort:** 0.5 day  
**Story Points:** 2  

---

### Story 5.1: Navigation Layout
**Epic:** Layout & Navigation  
**As a** Founder  
**I want to** navigate between pages easily  
**So that** I can access all features  

**Acceptance Criteria:**
- [ ] Navbar visible on all pages
- [ ] Logo + "Founder Console" text
- [ ] Nav links: Dashboard | Ideas | Logout
- [ ] Current page highlighted
- [ ] Mobile hamburger menu

**Technical Notes:**
- Create /components/Navbar.tsx
- Create /components/Layout.tsx (wrapper)
- Use Next.js Link for navigation
- Tailwind responsive classes

**Effort:** 1 day  
**Story Points:** 3  

---

### Story 5.2: Tailwind Setup & Styling
**Epic:** Layout & Navigation  
**As a** developer  
**I need to** configure Tailwind CSS  
**So that** components can be styled consistently  

**Acceptance Criteria:**
- [ ] Tailwind CSS installed and configured
- [ ] globals.css imports Tailwind directives
- [ ] Color scheme defined (primary, secondary, danger)
- [ ] Responsive breakpoints working
- [ ] Dark mode optional

**Technical Notes:**
- npm install tailwindcss postcss autoprefixer
- Create tailwind.config.js
- Add to next.config.js

**Effort:** 0.5 day  
**Story Points:** 1  

---

## Development Tasks

### Phase 1: Foundation (Days 1-2)
**Goal:** Auth + Layout ready

- [ ] **Task 1.1:** Setup Next.js 15 project
  - `npm create next-app@latest founder-console`
  - Select: TypeScript, Tailwind, ESLint
  - Est: 30 min

- [ ] **Task 1.2:** Configure Supabase client
  - npm install @supabase/supabase-js
  - Create /lib/supabase.ts
  - Add environment variables
  - Est: 1 hour

- [ ] **Task 1.3:** Create auth context
  - Create /lib/auth.ts
  - Implement useAuth hook
  - Handle JWT token refresh
  - Est: 2 hours

- [ ] **Task 1.4:** Build login page
  - Create /pages/login.tsx
  - Form + validation
  - Error handling
  - Est: 2 hours

- [ ] **Task 1.5:** Build navigation layout
  - Create /components/Layout.tsx
  - Create /components/Navbar.tsx
  - Setup responsive design
  - Est: 2 hours

- [ ] **Task 1.6:** Setup Supabase database
  - Create ideas table
  - Create initiatives table
  - Create users auth
  - Setup RLS policies
  - Est: 2 hours

**Subtotal Phase 1:** ~10 hours (1.25 days)

---

### Phase 2: Core Features (Days 3-5)
**Goal:** MVP working

- [ ] **Task 2.1:** Build idea submission form
  - Create /pages/idea-submit.tsx or modal
  - Form validation
  - Success toast
  - Est: 2 hours

- [ ] **Task 2.2:** Create POST /api/ideas endpoint
  - Accept title + description
  - Validate JWT
  - Insert into database
  - Return idea object
  - Est: 2 hours

- [ ] **Task 2.3:** Build ideas list page
  - Create /pages/ideas.tsx
  - Fetch ideas from API
  - Display list with status badges
  - Est: 2 hours

- [ ] **Task 2.4:** Build dashboard (Kanban board)
  - Create /pages/dashboard.tsx
  - Fetch initiatives from API
  - Group by status
  - Render cards
  - Est: 3 hours

- [ ] **Task 2.5:** Create GET /api/initiatives endpoint
  - Query initiatives table
  - Return all initiatives
  - Est: 1.5 hours

- [ ] **Task 2.6:** Build approval modal
  - Create /components/ApprovalModal.tsx
  - Show initiative + PRD summary
  - Approve/Reject buttons
  - Est: 2 hours

- [ ] **Task 2.7:** Create PATCH /api/initiatives/[id] endpoint
  - Update status
  - Validate authorization
  - Return updated initiative
  - Est: 2 hours

- [ ] **Task 2.8:** Integrate approval modal into dashboard
  - Click initiative → open modal
  - Submit decision → update status
  - Show confirmation
  - Est: 1.5 hours

- [ ] **Task 2.9:** Build status badges component
  - Create /components/StatusBadge.tsx
  - Color coding by status
  - Est: 30 min

- [ ] **Task 2.10:** Styling & responsive design
  - Polish all pages
  - Mobile-friendly
  - Consistent colors + spacing
  - Est: 2 hours

**Subtotal Phase 2:** ~17.5 hours (2.2 days)

---

### Phase 3: Testing & Deployment (Days 6-7)
**Goal:** Live MVP

- [ ] **Task 3.1:** Manual QA
  - Test login flow
  - Test idea submission
  - Test dashboard
  - Test approval workflow
  - Est: 2 hours

- [ ] **Task 3.2:** Setup Vercel deployment
  - Connect GitHub repo
  - Configure environment variables
  - Auto-deploy from main
  - Est: 1 hour

- [ ] **Task 3.3:** Test production environment
  - Login on live site
  - Submit test idea
  - Approve test initiative
  - Est: 1 hour

- [ ] **Task 3.4:** Performance optimization
  - Check Lighthouse score
  - Optimize images
  - Minify CSS/JS
  - Est: 1 hour

- [ ] **Task 3.5:** Documentation
  - Create README.md
  - Document setup steps
  - API endpoint list
  - Est: 1 hour

**Subtotal Phase 3:** ~6 hours (0.75 days)

---

## Epic Breakdown

### Epic 1: Authentication & Foundation
**Duration:** 2 days  
**Stories:**
- Story 1.1: Founder Logs In
- Story 1.2: Session Persists

**Tasks:**
- Setup Next.js + Supabase
- Auth context + JWT handling
- Login page
- Layout + Navigation

**Definition of Done:**
- [ ] Founder can log in with email/password
- [ ] Session persists across refreshes
- [ ] Navigation works on all pages
- [ ] Deployed to staging environment

---

### Epic 2: Idea Submission
**Duration:** 2 days  
**Stories:**
- Story 2.1: Idea Submission Form
- Story 2.2: Create Ideas API
- Story 2.3: Idea List View

**Tasks:**
- Build idea form component
- Create POST /api/ideas endpoint
- Build ideas list page
- Status badges

**Definition of Done:**
- [ ] Founder submits idea in < 30 seconds
- [ ] Idea appears in list immediately
- [ ] Form validates input
- [ ] Success toast confirms submission

---

### Epic 3: Initiative Dashboard
**Duration:** 3 days  
**Stories:**
- Story 3.1: Initiative Dashboard
- Story 3.2: Fetch Initiatives API

**Tasks:**
- Build Kanban board component
- Create GET /api/initiatives endpoint
- Implement status grouping
- Mobile responsive

**Definition of Done:**
- [ ] Dashboard displays 4 columns
- [ ] Initiatives populate from database
- [ ] Page loads in < 2 seconds
- [ ] Mobile-friendly

---

### Epic 4: Approval Workflow
**Duration:** 2 days  
**Stories:**
- Story 4.1: Approval Modal
- Story 4.2: Update Initiative Status API
- Story 4.3: Initiative Status Badge

**Tasks:**
- Build approval modal
- Create PATCH /api/initiatives endpoint
- Integrate with dashboard
- Status badge component

**Definition of Done:**
- [ ] Founder approves/rejects in < 10 seconds
- [ ] Status updates immediately
- [ ] Confirmation visible
- [ ] All status badges display correctly

---

### Epic 5: Layout & Navigation
**Duration:** 1 day  
**Stories:**
- Story 5.1: Navigation Layout
- Story 5.2: Tailwind Setup & Styling

**Tasks:**
- Setup Tailwind CSS
- Build Navbar component
- Build Layout wrapper
- Responsive design

**Definition of Done:**
- [ ] Navbar visible on all pages
- [ ] Navigation links work
- [ ] Mobile hamburger menu
- [ ] Consistent styling

---

## MVP Roadmap

### Week 1 Timeline

**Day 1-2: Foundation**
- [ ] Next.js + Supabase setup
- [ ] Authentication (login page)
- [ ] Layout + Navigation
- **Goal:** Founder can log in

**Day 3-4: Core Features**
- [ ] Idea submission form + API
- [ ] Ideas list page
- [ ] Initiative dashboard + API
- **Goal:** Founder can see ideas and initiatives

**Day 5-6: Approval Workflow**
- [ ] Approval modal
- [ ] Status update API
- [ ] Integration + testing
- **Goal:** Founder can approve initiatives

**Day 7: Polish & Deploy**
- [ ] Performance optimization
- [ ] Mobile testing
- [ ] Deploy to Vercel
- **Goal:** Live MVP

---

## Post-MVP Backlog (V1+)

### Features to defer (not MVP)

#### Asset Library (V1)
- View PRDs, Architectures, Deployments
- Search/filter assets
- Effort: 3 days
- Priority: P2

#### Real-Time Updates (V1)
- WebSocket subscriptions
- Live status changes
- Effort: 2 days
- Priority: P2

#### Email Notifications (V1)
- Notify Founder on idea approval
- Notify on initiative status change
- Effort: 2 days
- Priority: P3

#### Advanced Filtering (V1)
- Filter initiatives by stage
- Search ideas by keyword
- Effort: 1 day
- Priority: P3

#### Analytics Dashboard (V2)
- Ideas submitted per month
- Build velocity
- Effort: 3 days
- Priority: P3

#### Slack Integration (V2)
- Slack notifications
- Slack commands
- Effort: 2 days
- Priority: P3

#### Mobile App (V2)
- React Native version
- Offline support
- Effort: 5 days
- Priority: P4

#### Audit Logging (V2)
- Log all decisions
- Export audit trail
- Effort: 2 days
- Priority: P4

---

## Success Metrics (MVP)

### Deployment Metrics
- [ ] MVP live in < 7 days
- [ ] Zero critical bugs
- [ ] Uptime > 99%

### User Metrics
- [ ] Founder can submit idea in < 30 seconds
- [ ] Founder can approve initiative in < 10 seconds
- [ ] Dashboard loads in < 2 seconds
- [ ] Page abandonment rate < 5%

### Code Quality
- [ ] Test coverage > 70% (core features)
- [ ] Lighthouse score > 90
- [ ] Zero security vulnerabilities

---

## Dependencies & Blockers

### External Dependencies
- Supabase PostgreSQL instance (available)
- Vercel account (available)
- GitHub repo (available)

### Internal Dependencies
- None (Founder Console is first app)

### Known Blockers
- None at MVP stage

---

## Sign-Off

**Document Owner:** COO Agent  
**Last Updated:** Factory V0  
**Status:** Ready for Development  
**Target Launch:** < 7 days  
**MVP Scope:** 4 pages, 8 components, 3 API endpoints  
**Next Phase:** Builder Agent (code generation)
