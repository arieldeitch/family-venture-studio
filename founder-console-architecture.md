# Founder Console Architecture

## Executive Summary

The Founder Console is a lightweight web application built on Next.js 15 that enables the Founder/Executive Chairman to manage ideas, approve initiatives, and view assets without touching code.

**Architecture Philosophy:** Simplicity over scale. Every decision optimizes for: Idea → Live MVP.

**Technology Stack:**
- Next.js 15 (React framework + API routes)
- TypeScript (type safety)
- Tailwind CSS (styling)
- Supabase (database + auth)
- Vercel (deployment)

---

## System Overview

### High-Level Flow

```
Founder
  ↓
Browser (Next.js App on Vercel)
  ↓
Next.js API Routes
  ↓
Supabase (PostgreSQL + Auth)
```

### Key Components

1. **Frontend** - Next.js pages (App Router)
2. **API Layer** - Next.js API routes (/api/*)
3. **Database** - Supabase PostgreSQL
4. **Authentication** - Supabase Auth (SSO-ready)
5. **Deployment** - Vercel (auto-deploy from main)

---

## Technology Decisions

### Why Next.js 15?
- React + server components (fast, secure)
- Built-in API routes (no separate backend needed)
- Automatic code splitting (fast pages)
- Full TypeScript support
- Vercel native (zero-config deployment)

### Why Supabase?
- PostgreSQL (reliable, standard)
- Built-in auth (SSO + JWT)
- Real-time subscriptions (live updates)
- Row-level security (data protection)
- Free tier for Factory V0

### Why Tailwind CSS?
- Utility-first (fast styling)
- Responsive by default (mobile-first)
- Zero CSS files to maintain
- Large component ecosystem

### Why Vercel?
- Native Next.js support (optimal performance)
- Auto-deploy from GitHub (continuous deployment)
- Free tier for prototyping
- Zero infrastructure management

---

## System Architecture

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Founder (Browser)                     │
└────────────────────────┬────────────────────────────────┘
                         │
                    HTTPS / TLS
                         │
         ┌───────────────┴───────────────┐
         │                               │
┌────────▼──────────────────┐  ┌────────▼──────────────────┐
│    Vercel CDN / Edge      │  │    Next.js App Server     │
│  (Static Assets Cache)    │  │  (API Routes + Pages)     │
└────────┬──────────────────┘  └────────┬──────────────────┘
         │                              │
         └──────────────┬───────────────┘
                        │
                    HTTPS / JWT
                        │
        ┌───────────────▼───────────────┐
        │   Supabase PostgreSQL         │
        │   - Ideas Table               │
        │   - Initiatives Table         │
        │   - Assets Table              │
        │   - Auth (JWT)                │
        │   - Row-Level Security        │
        └───────────────────────────────┘
```

### Data Flow (Example: Submit Idea)

```
1. Founder types idea in browser
2. Clicks "Submit Idea"
3. React component calls POST /api/ideas
4. Next.js API route receives request
5. Validates JWT token from Supabase Auth
6. Inserts idea into database (with Founder's user_id)
7. Returns success response
8. Frontend updates dashboard (real-time via React state)
```

---

## Components

### Page Components

#### 1. Dashboard Page (`/pages/dashboard.tsx`)
**Purpose:** Main hub - shows idea inbox + initiative pipeline

**Responsibilities:**
- Display 4 Kanban columns (Discovery, Approved, Building, Deployed)
- Render initiative cards
- "New Idea" button (opens modal)
- Real-time status updates

**State:**
- initiatives: Initiative[]
- selectedInitiative: Initiative | null

**Child Components:**
- IdeaSubmitModal
- InitiativeKanban
- InitiativeCard

---

#### 2. Approval Center Page (`/pages/approval.tsx`)
**Purpose:** Focused approval workflow

**Responsibilities:**
- Show initiatives awaiting approval (Discovery stage)
- Display PRD summary for each
- Approval/Rejection buttons
- Confirmation toast

**State:**
- pendingApprovals: Initiative[]
- selectedForApproval: Initiative | null

**Child Components:**
- ApprovalCard
- ApprovalModal
- Toast

---

#### 3. Idea Inbox Page (`/pages/ideas.tsx`)
**Purpose:** View all submitted ideas with status

**Responsibilities:**
- List all ideas (created by Founder)
- Filter by status (Submitted, Approved, Rejected, Building, Live)
- Show status badges
- Click to view detail

**State:**
- ideas: Idea[]
- filterStatus: string

**Child Components:**
- IdeaList
- IdeaCard
- IdeaDetail

---

#### 4. Asset Library Page (`/pages/assets.tsx`)
**Purpose:** Centralized view of all factory outputs

**Responsibilities:**
- Display assets in tabs (PRDs, Architectures, Deployments)
- Show asset cards with metadata
- Search/filter by initiative or date
- Link to full document

**State:**
- assets: Asset[]
- activeTab: "prds" | "architectures" | "deployments"
- searchQuery: string

**Child Components:**
- AssetTabs
- AssetCard
- AssetGrid

---

#### 5. Layout Component (`/components/Layout.tsx`)
**Purpose:** Shared header, navigation, auth state

**Responsibilities:**
- Top navigation bar (logo, nav links, user menu)
- Sidebar (optional, for navigation)
- Auth check (redirect if not logged in)
- Session management

**State:**
- user: User | null
- loading: boolean

---

### Reusable Components

#### Button Component
```
<Button variant="primary|secondary|danger" onClick={fn}>
  Label
</Button>
```

#### Modal Component
```
<Modal isOpen={bool} onClose={fn} title="Modal Title">
  {children}
</Modal>
```

#### Card Component
```
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>{children}</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

#### Toast Component
```
<Toast type="success|error|info" message="Message" />
```

#### Input Component
```
<Input type="text|email|password" placeholder="..." value={val} onChange={fn} />
```

---

## Data Model

### Database Schema (Supabase PostgreSQL)

#### Ideas Table
```sql
CREATE TABLE ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  founder_id UUID NOT NULL REFERENCES auth.users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'submitted',
    -- submitted | approved | rejected | building | live
  feedback TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX ideas_founder_id_idx ON ideas(founder_id);
CREATE INDEX ideas_status_idx ON ideas(status);
```

#### Initiatives Table
```sql
CREATE TABLE initiatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id UUID REFERENCES ideas(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'discovery',
    -- discovery | approved | building | deployed
  owner_agent VARCHAR(50),
    -- ceo | cpo | cto | coo | ciso | builder | qa | release
  est_start TIMESTAMP,
  est_completion TIMESTAMP,
  current_stage TEXT,
  prd_url TEXT,
  architecture_url TEXT,
  deployment_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX initiatives_status_idx ON initiatives(status);
CREATE INDEX initiatives_idea_id_idx ON initiatives(idea_id);
```

#### Assets Table
```sql
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  initiative_id UUID REFERENCES initiatives(id),
  type VARCHAR(50),
    -- prd | architecture | deployment
  owner_agent VARCHAR(50),
  status VARCHAR(50) DEFAULT 'draft',
    -- draft | finalized | live
  title VARCHAR(255),
  url TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX assets_initiative_id_idx ON assets(initiative_id);
CREATE INDEX assets_type_idx ON assets(type);
```

#### Users Table (via Supabase Auth)
```
Managed by Supabase Auth
- id (UUID)
- email
- role (founder | manager | viewer)
```

---

## Page Structure

### Directory Layout

```
founder-console/
│
├── pages/
│   ├── index.tsx              # Redirect to /dashboard
│   ├── dashboard.tsx          # Main Kanban view
│   ├── ideas.tsx              # Idea inbox
│   ├── approval.tsx           # Approval center
│   ├── assets.tsx             # Asset library
│   ├── login.tsx              # Auth page
│   └── settings.tsx           # User settings (minimal)
│
├── api/
│   ├── ideas.ts               # GET /api/ideas, POST /api/ideas
│   ├── ideas/[id].ts          # GET /api/ideas/[id]
│   ├── initiatives.ts         # GET /api/initiatives
│   ├── initiatives/[id].ts    # GET /api/initiatives/[id], PATCH /api/initiatives/[id]
│   ├── assets.ts              # GET /api/assets
│   └── auth.ts                # Auth webhooks
│
├── components/
│   ├── Layout.tsx
│   ├── Button.tsx
│   ├── Modal.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Toast.tsx
│   ├── Navbar.tsx
│   ├── IdeaSubmitModal.tsx
│   ├── InitiativeKanban.tsx
│   ├── InitiativeCard.tsx
│   ├── ApprovalModal.tsx
│   ├── AssetCard.tsx
│   └── AssetGrid.tsx
│
├── lib/
│   ├── supabase.ts            # Supabase client
│   ├── auth.ts                # Auth helpers
│   ├── api.ts                 # API helpers (fetch wrappers)
│   └── constants.ts           # Constants (statuses, roles, etc.)
│
├── types/
│   ├── index.ts               # TypeScript types for Idea, Initiative, Asset
│
├── styles/
│   └── globals.css            # Tailwind imports
│
├── _app.tsx                   # Next.js app wrapper
├── _document.tsx              # HTML template
└── next.config.js             # Next.js config
```

---

## API Design

### Ideas API

#### GET /api/ideas
**Purpose:** Fetch all ideas for logged-in Founder

**Request:**
```
GET /api/ideas
Headers: Authorization: Bearer {jwt_token}
```

**Response:**
```json
{
  "ideas": [
    {
      "id": "uuid",
      "title": "Idea Title",
      "description": "...",
      "status": "submitted",
      "created_at": "2026-06-10T12:00:00Z",
      "feedback": null
    }
  ]
}
```

#### POST /api/ideas
**Purpose:** Create new idea

**Request:**
```json
{
  "title": "My Idea",
  "description": "Description"
}
```

**Response:**
```json
{
  "id": "uuid",
  "title": "My Idea",
  "status": "submitted",
  "created_at": "2026-06-10T12:00:00Z"
}
```

---

### Initiatives API

#### GET /api/initiatives
**Purpose:** Fetch all initiatives (grouped by status)

**Request:**
```
GET /api/initiatives
```

**Response:**
```json
{
  "initiatives": [
    {
      "id": "uuid",
      "idea_id": "uuid",
      "name": "Initiative Name",
      "status": "discovery",
      "owner_agent": "ceo",
      "est_completion": "2026-06-15T00:00:00Z",
      "prd_url": "https://...",
      "current_stage": "Evaluating"
    }
  ]
}
```

#### PATCH /api/initiatives/[id]
**Purpose:** Update initiative (approve/reject/status change)

**Request:**
```json
{
  "status": "approved",
  "feedback": "Approved by Founder"
}
```

**Response:**
```json
{
  "id": "uuid",
  "status": "approved",
  "updated_at": "2026-06-10T12:00:00Z"
}
```

---

### Assets API

#### GET /api/assets
**Purpose:** Fetch all assets (filtered by type)

**Request:**
```
GET /api/assets?type=prd&initiative_id=uuid
```

**Response:**
```json
{
  "assets": [
    {
      "id": "uuid",
      "initiative_id": "uuid",
      "type": "prd",
      "title": "PRD Title",
      "url": "https://...",
      "status": "finalized",
      "created_at": "2026-06-10T12:00:00Z"
    }
  ]
}
```

---

## Supabase Schema

### Row-Level Security (RLS) Policies

#### Ideas Table
- Founder can read/write own ideas
- Other users can read (if shared)

```sql
-- Founder sees own ideas
CREATE POLICY "Users can view own ideas"
  ON ideas FOR SELECT
  USING (auth.uid() = founder_id);

-- Founder can create ideas
CREATE POLICY "Users can create ideas"
  ON ideas FOR INSERT
  WITH CHECK (auth.uid() = founder_id);
```

#### Initiatives Table
- Everyone can read (public visibility)
- Only agents can update

```sql
-- Everyone can read initiatives
CREATE POLICY "Anyone can view initiatives"
  ON initiatives FOR SELECT
  USING (true);

-- Only admins can update (via API)
CREATE POLICY "Admins can update initiatives"
  ON initiatives FOR UPDATE
  USING (auth.jwt() ->> 'role' = 'admin');
```

#### Assets Table
- Everyone can read
- Only agents can create/update

```sql
-- Everyone can read assets
CREATE POLICY "Anyone can view assets"
  ON assets FOR SELECT
  USING (true);
```

---

## Frontend State Management

### State Architecture

**Simple approach for Factory V0:**

```typescript
// React Context for auth
const AuthContext = createContext({
  user: null,
  loading: true,
  logout: () => {}
});

// React hooks for data fetching (useEffect + useState)
const useFetchIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  
  useEffect(() => {
    fetch('/api/ideas')
      .then(r => r.json())
      .then(data => setIdeas(data.ideas));
  }, []);
  
  return ideas;
};

// Component uses hook
function IdeaList() {
  const ideas = useFetchIdeas();
  return <div>{ideas.map(idea => ...)}</div>;
}
```

**Real-time updates:**
- Use Supabase real-time subscriptions (optional for V1)
- For V0: simple polling + useEffect

---

## Deployment Architecture

### Deployment Pipeline

```
1. Developer pushes to main branch
   ↓
2. GitHub triggers Vercel webhook
   ↓
3. Vercel builds Next.js app
   ↓
4. Build completes, deployed to CDN
   ↓
5. App live at founder-console.vercel.app
```

### Environment Configuration

**.env.local (local development)**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
```

**.env.production (Vercel)**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
```

### Vercel Configuration

**vercel.json**
```json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase_url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase_key"
  }
}
```

---

## Security Considerations

### Authentication
- Supabase Auth (JWT tokens)
- SSO-ready (SAML/OAuth)
- Automatic token refresh

### Authorization
- Row-level security (RLS) on database
- API middleware to check JWT
- Role-based access (founder, admin, viewer)

### Data Protection
- HTTPS/TLS for all traffic
- JWT tokens in secure HTTP-only cookies
- Supabase enforces RLS on every query

### Rate Limiting
- Supabase built-in rate limiting
- Vercel Edge Functions for custom limits (optional)

---

## Performance Considerations

### Frontend Performance
- Next.js automatic code splitting
- Tailwind CSS purging (unused styles removed)
- Image optimization (if images used)
- Server-side rendering (fast initial page load)

### Database Performance
- Indexes on frequently queried columns (status, founder_id)
- Supabase auto-scales read replicas
- Pagination on list endpoints (if data grows)

### Caching
- Vercel edge cache (static assets)
- Next.js ISR (incremental static regeneration) for static pages
- Client-side caching with React hooks

---

## Development Workflow

### Local Setup
```bash
1. Clone repo
2. npm install
3. Create .env.local with Supabase keys
4. npm run dev
5. Open http://localhost:3000
```

### Deploy to Production
```bash
1. Push to main branch
2. Vercel auto-deploys
3. Monitor at https://founder-console.vercel.app
```

---

## Monitoring & Observability

### Logging
- Vercel built-in logs
- Supabase query logs (via dashboard)
- Browser console errors (client-side)

### Error Tracking
- Vercel error reporting
- Sentry (optional, for detailed errors)

### Performance Monitoring
- Vercel Analytics (CLS, LCP, FID)
- Supabase query performance
- Next.js performance insights

---

## Future Enhancements (Post-V0)

### V1 Features
- Real-time updates (Supabase subscriptions)
- Email notifications
- Advanced search/filtering
- Mobile app (React Native)

### V2 Features
- Analytics dashboard
- Slack integration
- Webhook system
- API for external integrations

---

## Constraints & Assumptions

### Factory V0 Constraints
- Single Founder user (no multi-user yet)
- Manual idea-to-initiative conversion (not automated)
- No file uploads (URLs only)
- No audit logging (timestamps only)

### Assumptions
- Founder has SSO access (Supabase Auth)
- Browser supports modern JavaScript
- Network connection available
- Supabase service uptime > 99%

---

## Sign-Off

**Document Owner:** CTO Agent  
**Technology Stack:** Next.js 15, TypeScript, Tailwind, Supabase, Vercel  
**Last Updated:** Factory V0  
**Status:** Ready for Build  
**Complexity:** Intentionally Simple  
**Next Phase:** Builder Agent (code generation)
