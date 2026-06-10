# Founder Console PRD

## Executive Summary

The Founder Console is the mission control center for the Family Venture Studio. It enables the Founder/Executive Chairman to manage ideas, approve initiatives, and view the factory's asset library—all without touching code or engineering systems.

**Vision:** Founder-driven decision making with zero engineering friction.

---

## Product Definition

### Product Name
Founder Console

### Primary User
Founder / Executive Chairman

### Secondary Users
- Portfolio Managers (read-only asset view)
- Board Members (pipeline visibility)

### Core Goal
Manage ideas and approvals without managing engineering.

### Success Criteria
- Founder can submit idea in < 30 seconds
- Founder can approve initiative in < 10 seconds
- Founder never needs to access source code
- 100% of decisions captured in audit trail

---

## Core Features

### 1. Idea Inbox

**Purpose:** Low-friction idea capture and tracking.

**User Stories:**
- As a Founder, I can submit a new idea with title + description in < 30 seconds
- As a Founder, I can view all my submitted ideas with their current status
- As a Founder, I can see when an idea has been moved to "Approved" or "Rejected"
- As a Founder, I can view feedback or rejection reason

**Interactions:**
- Single-page idea submission form (Title, Description, Optional Context)
- Idea list view with status badges (Submitted, Approved, Rejected, Building, Live)
- Click idea to view detail + status history

**Success Metrics:**
- Submission form completion time < 30 seconds average
- Zero validation errors on submission
- All ideas appear in dashboard within 2 seconds

---

### 2. Initiative Dashboard

**Purpose:** Real-time visibility into portfolio pipeline.

**User Stories:**
- As a Founder, I can see all initiatives grouped by stage
- As a Founder, I can see which ideas have been converted to initiatives
- As a Founder, I can see estimated timelines for each initiative
- As a Founder, I can see key milestones (Approved, Building Started, Deployed)

**Pipeline Stages:**
1. **Discovery** - Ideas under evaluation (awaiting approval decision)
2. **Approved** - Initiatives approved, waiting for build to start
3. **Building** - Active development (PRD → Architecture → Backlog → Build)
4. **Deployed** - Live in production

**Dashboard Layout:**
- Kanban board view (4 columns by stage)
- Card per initiative showing:
  - Initiative name
  - Status
  - Owner agent
  - Est. time to next stage
  - Quick action button (Approve / Reject for Discovery stage)

**Success Metrics:**
- Dashboard loads in < 2 seconds
- Stage transitions visible within 30 seconds of factory action
- Zero false pipeline statuses

---

### 3. Approval Center

**Purpose:** Fast approval/rejection decisions with minimal cognitive load.

**User Stories:**
- As a Founder, I can approve an initiative from the dashboard in < 10 seconds
- As a Founder, I can reject an initiative with optional feedback
- As a Founder, I can see the PRD summary before approving
- As a Founder, I receive confirmation of my decision

**Approval Flow:**
1. Founder clicks "Approve" or "Reject" on initiative card
2. Modal appears with:
   - Initiative name + description
   - PRD summary (2-3 key features)
   - Estimated build time
   - "Approve" / "Reject" buttons
3. Founder clicks decision
4. Confirmation toast + initiative moves to next stage

**Rejection Flow:**
1. Founder clicks "Reject"
2. Modal appears with optional feedback text field
3. Founder provides reason (optional) or skips
4. Initiative moves to "Rejected" status
5. Factory notified for archive

**Success Metrics:**
- Approval decision < 10 seconds average
- 100% of approvals logged with timestamp + user
- Zero lost decisions

---

### 4. Asset Library

**Purpose:** Centralized repository of all factory outputs accessible to leadership.

**User Stories:**
- As a Founder, I can view all PRDs created by the factory
- As a Founder, I can view all Architectures created by the factory
- As a Founder, I can view all Deployments and their live status
- As a Founder, I can filter assets by initiative / status / date

**Asset Types:**
- **PRDs** - Product Requirement Documents (linked to initiative)
- **Architectures** - System design documents
- **Deployments** - Live application URLs + deployment details

**Asset Card View:**
- Asset name
- Asset type (badge)
- Owner initiative
- Owner agent
- Date created
- Status (Draft / Finalized / Live)
- Quick link to view full document

**Success Metrics:**
- All assets indexed and searchable in < 5 seconds
- Zero missing or orphaned assets
- Asset library loads in < 2 seconds

---

## User Flows

### Flow 1: Submit Idea to Approval

```
Founder lands on Console
  ↓
Clicks "New Idea"
  ↓
Fills title + description (< 30 seconds)
  ↓
Clicks "Submit"
  ↓
Idea appears in "Discovery" stage on dashboard
  ↓
CEO Agent picks up idea for evaluation
```

### Flow 2: Approve Initiative

```
Founder sees initiative in "Discovery" stage
  ↓
Clicks "Approve"
  ↓
Modal shows PRD summary + timeline
  ↓
Founder clicks "Approve"
  ↓
Initiative moves to "Approved" stage
  ↓
CPO Agent begins PRD refinement
```

### Flow 3: Monitor Pipeline

```
Founder opens dashboard
  ↓
Sees 4 stages: Discovery | Approved | Building | Deployed
  ↓
Clicks any stage card to expand
  ↓
Views all initiatives in that stage
  ↓
Sees real-time progress + timestamps
```

---

## UI/UX Principles

### Principle 1: Founder-Friendly
- No jargon (use "Idea" not "Ticket")
- No technical settings or configuration
- Single-click actions where possible

### Principle 2: Minimal Friction
- 1-2 screens max per task
- Pre-filled defaults (date auto-populated, etc.)
- No required fields unless essential

### Principle 3: Real-Time Transparency
- Live status updates (no page refresh)
- Audit trail visible (who approved when)
- Clear stage indicators

### Principle 4: Mobile-First
- Responsive design (works on phone)
- Thumb-friendly buttons (large hit zones)
- Touch-optimized forms

---

## Information Architecture

### Pages

1. **Dashboard** (Home)
   - Initiative Kanban board (4 columns)
   - Quick stats (Ideas this month, Deployed this quarter)
   - New Idea button (prominent)

2. **Idea Inbox**
   - List of all submitted ideas
   - Filter by status
   - Click to view detail

3. **Approval Center**
   - Prioritized list of ideas awaiting approval
   - PRD preview for each
   - Approve/Reject quick actions

4. **Asset Library**
   - Tabbed view: PRDs | Architectures | Deployments
   - Search + filter
   - Click to view full document

5. **Settings** (minimal)
   - Email notification preferences
   - Logout

---

## Data Model

### Idea
- ID (unique)
- Title
- Description
- Submitted by (Founder)
- Submitted at (timestamp)
- Status (Submitted, Approved, Rejected, Building, Live)
- Feedback (optional rejection reason)

### Initiative
- ID (unique)
- Idea ID (linked)
- Name
- Status (Discovery, Approved, Building, Deployed)
- Owner Agent (CEO, CPO, CTO, etc.)
- Est. Start (timestamp)
- Est. Completion (timestamp)
- Current Stage (text)
- Last Updated (timestamp)

### Asset
- ID (unique)
- Type (PRD, Architecture, Deployment)
- Initiative ID (linked)
- Owner Agent
- Status (Draft, Finalized, Live)
- URL (link to document)
- Created At (timestamp)

---

## Success Metrics

### Founder Engagement
- Ideas submitted per month (target: 4+)
- Approval rate (% approved vs rejected)
- Time from idea to approval (target: < 48 hours)

### Product Metrics
- Idea submission time (target: < 30 seconds)
- Approval decision time (target: < 10 seconds)
- Dashboard load time (target: < 2 seconds)
- Founder session duration (target: < 5 minutes per visit)

### Quality Metrics
- Zero lost ideas (100% tracked)
- Zero missed approvals (100% logged)
- Audit trail completeness (100%)

---

## Technical Constraints

### Must-Haves (Factory V0)
- Web-based (no native app)
- Zero authentication complexity (SSO assumed)
- Real-time updates (WebSocket or polling)
- Mobile responsive

### Out of Scope (V1+)
- Mobile native app
- Email digests
- Slack integration
- Advanced analytics

---

## Dependencies

### Internal
- Factory API (Initiative status, Asset registry)
- CEO Agent (Idea evaluation)
- CPO Agent (PRD generation)
- CTO Agent (Architecture)

### External
- SSO provider (for auth)
- Document storage (for asset links)

---

## Rollout Plan

### Phase 1: MVP (Week 1)
- Idea submission form
- Dashboard (static, manual refresh)
- Approval modal

### Phase 2: Polish (Week 2)
- Real-time updates
- Asset library
- Mobile responsiveness

### Phase 3: GA (Week 3)
- Performance optimization
- Audit logging
- Founder training

---

## Appendix: Wireframe Descriptions

### Dashboard
```
┌─────────────────────────────────────────────────┐
│ Founder Console                    [New Idea] │
├─────────────────────────────────────────────────┤
│                                                  │
│ Discovery        Approved       Building  Deployed
│ ┌──────────┐    ┌──────────┐   ┌──────┐   ┌────┐
│ │ Idea-001 │    │ Init-001 │   │      │   │    │
│ │ Status   │    │ Est: 2d  │   │      │   │    │
│ │ [Approve]│    │ [Ready]  │   │      │   │    │
│ └──────────┘    └──────────┘   └──────┘   └────┘
│
└─────────────────────────────────────────────────┘
```

### Approval Modal
```
┌──────────────────────────────────┐
│ Approve Initiative?               │
├──────────────────────────────────┤
│                                   │
│ Founder Console V0                │
│                                   │
│ Features:                         │
│ • Idea submission                 │
│ • Approval dashboard              │
│ • Asset library                   │
│                                   │
│ Est. Build Time: 5 days           │
│                                   │
│ [Approve]        [Reject]         │
│                                   │
└──────────────────────────────────┘
```

---

## Sign-Off

**Document Owner:** CPO Agent  
**Last Updated:** Factory V0  
**Status:** Ready for Build  
**Next Review:** Post-MVP (Week 2)
