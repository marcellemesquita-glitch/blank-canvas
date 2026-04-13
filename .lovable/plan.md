

# Desce Gelo Financeiro — Plano de Implementação

## Design System
- **Palette**: Navy Trust — `#0f1b3d`, `#1e3a5f`, `#3b6fa0`, `#e8edf3`
- **Fonts**: Sora (headings), Manrope (body) via Google Fonts
- **Layout**: Dashboard with collapsible sidebar

## Structure

### 1. Design System Setup
Update `index.css` with Navy Trust colors (HSL), import Sora + Manrope fonts, apply to `tailwind.config.ts`.

### 2. Sidebar + Layout
- `AppSidebar` with 4 nav items: Dashboard, Contas a Pagar, Folha de Pagamento, Fluxo de Caixa
- Layout wrapper with `SidebarProvider`, header with trigger + app title
- Icons: LayoutDashboard, FileText, Users, TrendingUp

### 3. Pages (all with mock data, no backend)

**Dashboard** (`/`)
- 4 summary cards: Total a Pagar, Folha Mensal, Entradas, Saídas
- Mini line chart for cash flow (Recharts)
- Recent transactions list

**Contas a Pagar** (`/contas`)
- Table with: fornecedor, valor, vencimento, status (pago/pendente/atrasado)
- Status badges with colors
- Add button (dialog form)

**Folha de Pagamento** (`/folha`)
- Employee table: nome, cargo, salário, status
- Summary cards: total folha, quantidade funcionários

**Fluxo de Caixa** (`/fluxo`)
- Bar chart: entradas vs saídas por mês
- Transaction table with type filter (entrada/saída)
- Balance summary cards

### 4. Routes
Add routes in `App.tsx` for `/`, `/contas`, `/folha`, `/fluxo`.

### Technical Details
- All data is mock/hardcoded (arrays in each page)
- Recharts for charts (already available via shadcn chart)
- shadcn components: Card, Table, Badge, Dialog, Button, Sidebar
- Responsive: sidebar collapses on mobile

