# BURUMAL Super Admin Module Specification

**Version:** 1.0  
**Date:** August 2026  
**Purpose:** Comprehensive specification for Super Admin control center architecture

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Dashboard Pages](#dashboard-pages)
3. [Sidebar Navigation](#sidebar-navigation)
4. [Permissions Matrix](#permissions-matrix)
5. [Database Entities](#database-entities)
6. [API Endpoints](#api-endpoints)
7. [Workflows](#workflows)
8. [Security Rules](#security-rules)
9. [Implementation Phases](#implementation-phases)

---

## Architecture Overview

### Control Center Philosophy

The Super Admin is not simply "the person who can do everything." It is the **control center of BURUMAL**:

```
                         SUPER ADMIN
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
       BUSINESS            OPERATIONS           SECURITY
          │                   │                   │
      Analytics           Orders              Fraud
      Marketing           Sellers             Audit
      Promotions           Delivery            Roles
      Commission           Support             Access
          │                   │                   │
          └───────────────────┼───────────────────┘
                              │
                         BURUMAL PLATFORM
```

This architecture enables:
- Employees managing different parts of BURUMAL
- Granular access control
- Separation of concerns
- Auditability
- Scalability

---

## Dashboard Pages

### Phase 1: Essential MVP (Completed)

| Page | Route | Description | Status |
|------|-------|-------------|--------|
| Dashboard | `/admin-super/dashboard` | Platform overview with KPIs | ✅ Implemented |
| Users | `/admin-super/users` | User management (suspend, block, reactivate) | ✅ Implemented |
| Sellers | `/admin-super/sellers` | Seller verification and management | ✅ Implemented |
| Products | `/admin-super/products` | Product approval and catalog management | ✅ Implemented |
| Categories | `/admin-super/categories` | Category CRUD operations | ✅ Implemented |
| Orders | `/admin-super/orders` | Order viewing and cancellation | ✅ Implemented |
| Payments | `/admin-super/payments` | Payment transaction overview | ✅ Implemented |
| Deliveries | `/admin-super/deliveries` | Courier and delivery zone management | ✅ Implemented |
| Reviews | `/admin-super/reviews` | Review moderation | ✅ Implemented |
| Disputes | `/admin-super/disputes` | Dispute resolution and refunds | ✅ Implemented |
| Payouts | `/admin-super/payouts` | Seller payout management | ✅ Implemented |
| Promotions | `/admin-super/promotions` | Campaign creation and management | ✅ Implemented |
| Notifications | `/admin-super/notifications` | Platform-wide announcements | ✅ Implemented |
| Analytics | `/admin-super/analytics` | Sales, customer, seller metrics | ✅ Implemented |
| Reports | `/admin-super/reports` | Report generation and download | ✅ Implemented |
| Roles | `/admin-super/roles` | Admin role and permission management | ✅ Implemented |
| Settings | `/admin-super/settings` | Platform configuration | ✅ Implemented |
| Audit Logs | `/admin-super/audit-logs` | Admin action tracking | ✅ Implemented |
| System Health | `/admin-super/system-health` | Infrastructure monitoring | ✅ Implemented |

### Phase 2: Marketplace Growth (Future)

| Page | Route | Description | Priority |
|------|-------|-------------|----------|
| Fraud & Risk | `/admin-super/fraud` | Risk detection and fraud management | High |
| Search Management | `/admin-super/search` | Search analytics and synonym configuration | High |
| Pricing Rules | `/admin-super/pricing` | Category and seller-specific commission rules | High |
| Seller Wallets | `/admin-super/wallets` | Seller balance and payout management | High |
| Financial Ledger | `/admin-super/ledger` | Complete financial transaction history | High |
| Coupons | `/admin-super/coupons` | Coupon and voucher management | Medium |
| Referral System | `/admin-super/referrals` | Referral program configuration | Medium |
| Loyalty Program | `/admin-super/loyalty` | Points and rewards management | Medium |
| Content Management | `/admin-super/cms` | Homepage and content page management | Medium |
| Media Library | `/admin-super/media` | Central media asset management | Medium |
| Geographic Management | `/admin-super/geo` | Province, commune, zone configuration | Medium |
| Storefronts | `/admin-super/storefronts` | Seller store management | Medium |
| Policies | `/admin-super/policies` | Policy version management | Medium |
| Prohibited Products | `/admin-super/prohibited` | Restricted product configuration | High |
| Device & Sessions | `/admin-super/sessions` | Session and device management | High |

### Phase 3: Scale (Future)

| Page | Route | Description | Priority |
|------|-------|-------------|----------|
| Business Intelligence | `/admin-super/bi` | Advanced analytics and insights | Medium |
| Feature Flags | `/admin-super/features` | Feature toggle management | Medium |
| Integrations | `/admin-super/integrations` | Third-party service configuration | Medium |
| Sandbox Mode | `/admin-super/sandbox` | Test environment controls | Low |
| Emergency Center | `/admin-super/emergency` | Platform emergency controls | High |
| Admin Impersonation | `/admin-super/impersonate` | View-as-user support tool | Low |
| Localization | `/admin-super/i18n` | Translation and locale management | Low |

---

## Sidebar Navigation

### Current Structure (Phase 1)

```
�Overview
├─ Dashboard
📊Analytics
├─ Analytics
├─ Reports
👥Users
├─ Users
├─ Sellers
🛍️Products
├─ Products
├─ Categories
📦Orders
├─ Orders
💰Finance
├─ Payments
├─ Payouts
🚚Logistics
├─ Deliveries
⭐Reviews
├─ Reviews
🔧Support
├─ Disputes
📢Marketing
├─ Promotions
├─ Notifications
⚙️Settings
├─ Roles
├─ Settings
🔒Security
├─ Audit Logs
├─ System Health
```

### Future Structure (Phase 2 & 3)

```
�Overview
├─ Dashboard
📊Analytics
├─ Analytics
├─ Reports
├─ Business Intelligence
├─ Search Analytics
👥Users
├─ Users
├─ Sellers
├─ Sessions & Devices
🛍️Products
├─ Products
├─ Categories
├─ Storefronts
├─ Media Library
📦Orders
├─ Orders
💰Finance
├─ Payments
├─ Payouts
├─ Seller Wallets
├─ Financial Ledger
├─ Pricing Rules
🚚Logistics
├─ Deliveries
├─ Geographic Management
⭐Reviews
├─ Reviews
🔧Support
├─ Disputes
📢Marketing
├─ Promotions
├─ Coupons
├─ Notifications
├─ Content Management
├─ Referral System
├─ Loyalty Program
⚙️Settings
├─ Roles
├─ Settings
├─ Policies
├─ Feature Flags
├─ Localization
🔒Security
├─ Fraud & Risk
├─ Audit Logs
├─ System Health
├─ Integrations
├─ Prohibited Products
🚨Emergency
├─ Emergency Center
🧪Testing
├─ Sandbox Mode
🔧Tools
├─ Admin Impersonation
```

---

## Permissions Matrix

### Admin Roles

| Role | Description | Access Level |
|------|-------------|--------------|
| Super Admin | Full platform control | All permissions |
| Finance Admin | Payments, refunds, commissions, payouts | Finance module |
| Content Moderator | Reviews, reports, content approvals | Content module |
| Logistics Manager | Couriers, delivery zones, shipments | Logistics module |
| Marketing Manager | Campaigns, promotions, analytics | Marketing module |
| Seller Admin | Seller verification and management | Seller module |
| Support Agent | Customer support and disputes | Support module |
| Risk Analyst | Fraud detection and risk management | Risk module |
| BI Analyst | Business intelligence and reporting | Analytics module |

### Permission Categories

#### Business Module
| Permission | Super Admin | Finance Admin | Marketing Manager | BI Analyst |
|------------|-------------|---------------|------------------|-------------|
| View Dashboard | ✅ | ✅ | ✅ | ✅ |
| View Analytics | ✅ | ✅ | ✅ | ✅ |
| View Reports | ✅ | ✅ | ✅ | ✅ |
| Manage Promotions | ✅ | ❌ | ✅ | ❌ |
| Manage Coupons | ✅ | ❌ | ✅ | ❌ |
| Manage Referrals | ✅ | ❌ | ✅ | ❌ |
| Manage Loyalty | ✅ | ❌ | ✅ | ❌ |
| Manage Content | ✅ | ❌ | ✅ | ❌ |
| View Business Intelligence | ✅ | ❌ | ❌ | ✅ |

#### Operations Module
| Permission | Super Admin | Content Moderator | Logistics Manager | Support Agent |
|------------|-------------|-------------------|-------------------|--------------|
| View Orders | ✅ | ❌ | ✅ | ✅ |
| Cancel Orders | ✅ | ❌ | ❌ | ✅ |
| Manage Products | ✅ | ✅ | ❌ | ❌ |
| Manage Categories | ✅ | ❌ | ❌ | ❌ |
| Manage Reviews | ✅ | ✅ | ❌ | ❌ |
| Manage Disputes | ✅ | ❌ | ❌ | ✅ |
| Manage Deliveries | ✅ | ❌ | ✅ | ❌ |
| Manage Geographic Zones | ✅ | ❌ | ✅ | ❌ |

#### Finance Module
| Permission | Super Admin | Finance Admin |
|------------|-------------|---------------|
| View Payments | ✅ | ✅ |
| Process Refunds | ✅ | ✅ |
| Manage Payouts | ✅ | ✅ |
| View Financial Ledger | ✅ | ✅ |
| Manage Pricing Rules | ✅ | ✅ |
| Manage Seller Wallets | ✅ | ✅ |
| Adjust Balances | ✅ | ✅ |

#### Security Module
| Permission | Super Admin | Risk Analyst |
|------------|-------------|--------------|
| View Users | ✅ | ❌ |
| Manage Users | ✅ | ❌ |
| View Sellers | ✅ | ❌ |
| Manage Sellers | ✅ | ❌ |
| View Fraud Alerts | ✅ | ✅ |
| Manage Fraud Cases | ✅ | ✅ |
| View Audit Logs | ✅ | ✅ |
| View System Health | ✅ | ❌ |
| Manage Roles | ✅ | ❌ |
| Manage Settings | ✅ | ❌ |
| Manage Integrations | ✅ | ❌ |
| Access Emergency Controls | ✅ | ❌ |

---

## Database Entities

### Core Entities (Phase 1)

#### Users
```typescript
interface User {
  id: string;
  phone: string;
  email?: string;
  name: string;
  role: 'customer' | 'seller' | 'admin';
  status: 'active' | 'suspended' | 'blocked';
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}
```

#### Sellers
```typescript
interface Seller {
  id: string;
  userId: string;
  businessName: string;
  businessType: 'individual' | 'company';
  taxId?: string;
  address: string;
  description?: string;
  status: 'pending' | 'verified' | 'suspended' | 'rejected';
  commissionRate: number;
  balance: number;
  pendingBalance: number;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Products
```typescript
interface Product {
  id: string;
  sellerId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  status: 'pending' | 'approved' | 'suspended' | 'rejected';
  views: number;
  sales: number;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Orders
```typescript
interface Order {
  id: string;
  customerId: string;
  sellerId: string;
  productId: string;
  quantity: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  deliveryAddress: string;
  deliveryZone: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Payments
```typescript
interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: 'mobile_money' | 'bank_transfer' | 'card';
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Reviews
```typescript
interface Review {
  id: string;
  productId: string;
  customerId: string;
  rating: number;
  comment: string;
  status: 'visible' | 'hidden' | 'reported';
  createdAt: Date;
  updatedAt: Date;
}
```

#### Admin Roles
```typescript
interface AdminRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

#### Admin Users
```typescript
interface AdminUser {
  id: string;
  userId: string;
  roleId: string;
  status: 'active' | 'inactive';
  lastActiveAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Audit Logs
```typescript
interface AuditLog {
  id: string;
  adminId: string;
  action: string;
  target: string;
  reason: string;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}
```

### Phase 2 Entities

#### Fraud Alerts
```typescript
interface FraudAlert {
  id: string;
  entityType: 'user' | 'seller' | 'order' | 'payment';
  entityId: string;
  riskLevel: 'low' | 'medium' | 'high';
  reason: string;
  details Record<string, any>;
  status: 'open' | 'investigating' | 'resolved' | 'dismissed';
  resolvedBy?: string;
  resolvedAt?: Date;
  createdAt: Date;
}
```

#### Seller Wallet
```typescript
interface SellerWallet {
  id: string;
  sellerId: string;
  availableBalance: number;
  pendingBalance: number;
  commission: number;
  withdrawable: number;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Financial Ledger
```typescript
interface LedgerEntry {
  id: string;
  orderId: string;
  type: 'payment' | 'commission' | 'payout' | 'refund' | 'adjustment';
  amount: number;
  description: string;
  referenceId?: string;
  createdAt: Date;
}
```

#### Coupons
```typescript
interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderValue?: number;
  categoryIds?: string[];
  sellerIds?: string[];
  maxUses?: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  status: 'active' | 'inactive' | 'expired';
  createdAt: Date;
  updatedAt: Date;
}
```

#### Storefront
```typescript
interface Storefront {
  id: string;
  sellerId: string;
  name: string;
  logo?: string;
  banner?: string;
  description?: string;
  status: 'active' | 'suspended';
  isFeatured: boolean;
  rating: number;
  categories: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

#### Geographic Zone
```typescript
interface GeographicZone {
  id: string;
  type: 'province' | 'commune' | 'zone' | 'neighborhood';
  name: string;
  parentId?: string;
  deliveryPrice: number;
  estimatedDays: number;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Policy Version
```typescript
interface PolicyVersion {
  id: string;
  policyType: 'terms' | 'privacy' | 'seller_agreement' | 'return' | 'refund' | 'delivery' | 'prohibited';
  version: string;
  content: string;
  effectiveDate: Date;
  createdAt: Date;
}
```

#### Search Analytics
```typescript
interface SearchAnalytics {
  id: string;
  query: string;
  resultCount: number;
  hasResults: boolean;
  userId?: string;
  timestamp: Date;
}
```

#### Media Asset
```typescript
interface MediaAsset {
  id: string;
  type: 'product_image' | 'seller_logo' | 'store_banner' | 'homepage_banner' | 'category_image';
  entityId?: string;
  url: string;
  filename: string;
  size: number;
  mimeType: string;
  uploadedBy: string;
  createdAt: Date;
}
```

### Phase 3 Entities

#### Feature Flag
```typescript
interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Integration
```typescript
interface Integration {
  id: string;
  provider: string;
  type: 'payment' | 'sms' | 'email' | 'maps' | 'storage' | 'delivery';
  status: 'active' | 'inactive' | 'error';
  config: Record<string, any>;
  lastSyncAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Referral
```typescript
interface Referral {
  id: string;
  referrerId: string;
  referredId?: string;
  code: string;
  status: 'pending' | 'completed' | 'expired';
  rewardAmount: number;
  completedAt?: Date;
  createdAt: Date;
}
```

#### Loyalty Points
```typescript
interface LoyaltyPoints {
  id: string;
  userId: string;
  points: number;
  earned: number;
  redeemed: number;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Session
```typescript
interface Session {
  id: string;
  userId: string;
  deviceType: string;
  deviceName?: string;
  location?: string;
  ipAddress: string;
  userAgent: string;
  isActive: boolean;
  lastActivityAt: Date;
  createdAt: Date;
}
```

---

## API Endpoints

### Authentication

```
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/verify-otp
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
POST   /api/auth/admin/login
POST   /api/auth/admin/logout
```

### Users

```
GET    /api/admin/users
GET    /api/admin/users/:id
POST   /api/admin/users
PUT    /api/admin/users/:id
DELETE /api/admin/users/:id
POST   /api/admin/users/:id/suspend
POST   /api/admin/users/:id/block
POST   /api/admin/users/:id/reactivate
```

### Sellers

```
GET    /api/admin/sellers
GET    /api/admin/sellers/:id
POST   /api/admin/sellers
PUT    /api/admin/sellers/:id
DELETE /api/admin/sellers/:id
POST   /api/admin/sellers/:id/approve
POST   /api/admin/sellers/:id/reject
POST   /api/admin/sellers/:id/verify
POST   /api/admin/sellers/:id/suspend
POST   /api/admin/sellers/:id/reactivate
```

### Products

```
GET    /api/admin/products
GET    /api/admin/products/:id
PUT    /api/admin/products/:id
DELETE /api/admin/products/:id
POST   /api/admin/products/:id/approve
POST   /api/admin/products/:id/reject
POST   /api/admin/products/:id/suspend
```

### Categories

```
GET    /api/admin/categories
POST   /api/admin/categories
PUT    /api/admin/categories/:id
DELETE /api/admin/categories/:id
```

### Orders

```
GET    /api/admin/orders
GET    /api/admin/orders/:id
POST   /api/admin/orders/:id/cancel
```

### Payments

```
GET    /api/admin/payments
GET    /api/admin/payments/:id
POST   /api/admin/payments/:id/refund
```

### Deliveries

```
GET    /api/admin/deliveries
GET    /api/admin/couriers
POST   /api/admin/couriers
PUT    /api/admin/couriers/:id
GET    /api/admin/delivery-zones
POST   /api/admin/delivery-zones
PUT    /api/admin/delivery-zones/:id
```

### Reviews

```
GET    /api/admin/reviews
PUT    /api/admin/reviews/:id/hide
PUT    /api/admin/reviews/:id/show
DELETE /api/admin/reviews/:id
```

### Disputes

```
GET    /api/admin/disputes
GET    /api/admin/disputes/:id
POST   /api/admin/disputes/:id/resolve
POST   /api/admin/disputes/:id/approve-refund
POST   /api/admin/disputes/:id/reject-refund
```

### Payouts

```
GET    /api/admin/payouts
GET    /api/admin/payouts/:id
POST   /api/admin/payouts/:id/approve
POST   /api/admin/payouts/:id/process
```

### Promotions

```
GET    /api/admin/promotions
POST   /api/admin/promotions
PUT    /api/admin/promotions/:id
DELETE /api/admin/promotions/:id
POST   /api/admin/promotions/:id/activate
POST   /api/admin/promotions/:id/deactivate
```

### Notifications

```
GET    /api/admin/notifications
POST   /api/admin/notifications
GET    /api/admin/notifications/:id
```

### Analytics

```
GET    /api/admin/analytics/sales
GET    /api/admin/analytics/customers
GET    /api/admin/analytics/sellers
GET    /api/admin/analytics/products
```

### Reports

```
GET    /api/admin/reports
POST   /api/admin/reports/:type/generate
GET    /api/admin/reports/:id/download
```

### Roles

```
GET    /api/admin/roles
POST   /api/admin/roles
PUT    /api/admin/roles/:id
DELETE /api/admin/roles/:id
GET    /api/admin/admin-users
POST   /api/admin/admin-users
PUT    /api/admin/admin-users/:id
DELETE /api/admin/admin-users/:id
```

### Settings

```
GET    /api/admin/settings
PUT    /api/admin/settings
```

### Audit Logs

```
GET    /api/admin/audit-logs
GET    /api/admin/audit-logs/:id
```

### System Health

```
GET    /api/admin/system-health
POST   /api/admin/system-health/restart-api
POST   /api/admin/system-health/clear-cache
POST   /api/admin/system-health/run-diagnostics
```

### Phase 2 Endpoints

#### Fraud & Risk
```
GET    /api/admin/fraud-alerts
GET    /api/admin/fraud-alerts/:id
POST   /api/admin/fraud-alerts/:id/investigate
POST   /api/admin/fraud-alerts/:id/resolve
POST   /api/admin/fraud-alerts/:id/dismiss
```

#### Search
```
GET    /api/admin/search-analytics
GET    /api/admin/search-synonyms
POST   /api/admin/search-synonyms
PUT    /api/admin/search-synonyms/:id
DELETE /api/admin/search-synonyms/:id
```

#### Pricing
```
GET    /api/admin/pricing-rules
POST   /api/admin/pricing-rules
PUT    /api/admin/pricing-rules/:id
DELETE /api/admin/pricing-rules/:id
```

#### Wallets
```
GET    /api/admin/wallets
GET    /api/admin/wallets/:seller-id
POST   /api/admin/wallets/:seller-id/adjust
```

#### Ledger
```
GET    /api/admin/ledger
GET    /api/admin/ledger/:order-id
```

#### Coupons
```
GET    /api/admin/coupons
POST   /api/admin/coupons
PUT    /api/admin/coupons/:id
DELETE /api/admin/coupons/:id
```

#### Storefronts
```
GET    /api/admin/storefronts
GET    /api/admin/storefronts/:id
PUT    /api/admin/storefronts/:id
POST   /api/admin/storefronts/:id/feature
POST   /api/admin/storefronts/:id/unfeature
```

#### Geographic
```
GET    /api/admin/geo-zones
POST   /api/admin/geo-zones
PUT    /api/admin/geo-zones/:id
DELETE /api/admin/geo-zones/:id
```

#### Policies
```
GET    /api/admin/policies
POST   /api/admin/policies
PUT    /api/admin/policies/:id
GET    /api/admin/policies/:type/versions
```

#### Media
```
GET    /api/admin/media
POST   /api/admin/media/upload
DELETE /api/admin/media/:id
```

#### Sessions
```
GET    /api/admin/sessions/:user-id
DELETE /api/admin/sessions/:id
```

### Phase 3 Endpoints

#### Feature Flags
```
GET    /api/admin/feature-flags
POST   /api/admin/feature-flags
PUT    /api/admin/feature-flags/:id
DELETE /api/admin/feature-flags/:id
```

#### Integrations
```
GET    /api/admin/integrations
POST   /api/admin/integrations
PUT    /api/admin/integrations/:id
DELETE /api/admin/integrations/:id
POST   /api/admin/integrations/:id/test
```

#### Emergency
```
POST   /api/admin/emergency/pause-orders
POST   /api/admin/emergency/disable-payments
POST   /api/admin/emergency/disable-seller-registration
POST   /api/admin/emergency/disable-withdrawals
POST   /api/admin/emergency/maintenance-mode
```

#### Impersonation
```
POST   /api/admin/impersonate/start
POST   /api/admin/impersonate/end
```

---

## Workflows

### Seller Verification Workflow

```
1. Seller registers
   ↓
2. Completes onboarding form
   ↓
3. Status: pending
   ↓
4. Super Admin reviews
   ↓
5. Approve/Reject decision
   ↓
6. If approved: Status → verified
   If rejected: Status → rejected
   ↓
7. Audit log entry created
```

### Product Approval Workflow

```
1. Seller adds product
   ↓
2. Status: pending
   ↓
3. Content Moderator reviews
   ↓
4. Approve/Reject/Suspend decision
   ↓
5. If approved: Status → approved (visible)
   If rejected: Status → rejected (hidden)
   If suspended: Status → suspended (hidden)
   ↓
6. Seller notified
   ↓
7. Audit log entry created
```

### Order Processing Workflow

```
1. Customer places order
   ↓
2. Payment processed
   ↓
3. Status: pending
   ↓
4. Seller confirms
   ↓
5. Status: processing
   ↓
6. Courier assigned
   ↓
7. Status: shipped
   ↓
8. Delivered
   ↓
9. Status: completed
   ↓
10. Commission deducted
    ↓
11. Seller balance updated
```

### Payout Workflow

```
1. Seller requests payout
   ↓
2. Status: pending
   ↓
3. Finance Admin reviews
   ↓
4. Approve/Reject decision
   ↓
5. If approved: Status → processing
   ↓
6. Payment initiated
   ↓
7. Status: completed
   ↓
8. Ledger entry created
   ↓
9. Audit log entry created
```

### Dispute Resolution Workflow

```
1. Customer opens dispute
   ↓
2. Status: open
   ↓
3. Support Agent investigates
   ↓
4. Status: under_review
   ↓
5. Decision made
   ↓
6. If refund approved:
   - Process refund
   - Deduct from seller balance
   - Ledger entry created
   ↓
7. Status: resolved
   ↓
8. Both parties notified
   ↓
9. Audit log entry created
```

### Fraud Detection Workflow

```
1. System detects suspicious activity
   ↓
2. Fraud alert created
   ↓
3. Risk level assigned (low/medium/high)
   ↓
4. Risk Analyst investigates
   ↓
5. Status: investigating
   ↓
6. Decision made
   ↓
7. If fraud confirmed:
   - Suspend account
   - Block payments
   - Notify relevant teams
   ↓
8. Status: resolved
   ↓
9. Audit log entry created
```

### Emergency Control Workflow

```
1. Emergency situation identified
   ↓
2. Super Admin accesses Emergency Center
   ↓
3. Selects emergency action
   ↓
4. Re-authentication required (password + MFA)
   ↓
5. Confirmation dialog
   ↓
6. Action executed
   ↓
7. Audit log entry created
   ↓
8. All relevant admins notified
```

---

## Security Rules

### Super Admin Account Security

#### Mandatory Requirements
- **MFA/2FA**: Multi-factor authentication required
- **Strong Password**: Minimum 12 characters, mixed case, numbers, symbols
- **Session Timeout**: 30 minutes of inactivity
- **Login Notifications**: Email/SMS on new device/location
- **Device Management**: View and revoke active sessions
- **Audit Logging**: All actions logged with timestamp, IP, user agent
- **Role-Based Access**: Granular permissions per role
- **Re-authentication**: Required for sensitive operations

#### Sensitive Operations Requiring Re-authentication
- Approving payouts > 1,000,000 BIF
- Suspending sellers with > 10,000,000 BIF revenue
- Modifying commission rates
- Accessing emergency controls
- Viewing full financial ledger
- Impersonating users

### API Security

#### Authentication
- JWT tokens with short expiration (15 minutes)
- Refresh tokens with longer expiration (7 days)
- Token rotation on refresh
- IP whitelisting for admin endpoints

#### Authorization
- Role-based access control (RBAC)
- Permission checks on every endpoint
- Resource-level ownership checks
- Audit trail for all data modifications

#### Data Protection
- API keys and secrets never displayed in plain text
- Encrypted at rest (database)
- Encrypted in transit (TLS 1.3)
- PII data masking in logs
- Regular security audits

### Admin Impersonation Rules

#### Allowed
- "View as user" mode for support
- Read-only access to user data
- Cannot perform actions on behalf of user
- Cannot access payment information

#### Prohibited
- "Login as user" (full session takeover)
- Modifying user data
- Making purchases
- Accessing sensitive information

#### Logging Requirements
- Admin who initiated impersonation
- User being impersonated
- Reason for impersonation
- Timestamp
- Actions performed during session
- Duration of impersonation

### Emergency Control Rules

#### Authorization
- Only Super Admin role
- Requires password + MFA confirmation
- Requires explicit reason
- Requires secondary approval for critical actions

#### Actions
- Pause new orders
- Disable payments
- Disable seller registration
- Disable withdrawals
- Disable specific payment provider
- Enable maintenance mode

#### Post-Action
- Immediate audit log entry
- Notification to all admins
- Automatic incident report generation
- Required follow-up documentation

### Audit Log Rules

#### What to Log
- All admin actions
- Authentication events (login, logout, failed attempts)
- Permission changes
- Configuration changes
- Financial transactions
- Emergency control usage

#### Log Format
```typescript
{
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  target: string;
  targetId?: string;
  reason?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}
```

#### Retention
- Active logs: 1 year
- Archived logs: 7 years
- Export capability for compliance

### Data Privacy Rules

#### PII Handling
- Minimal data collection
- Purpose limitation
- Data minimization
- Right to deletion
- Data portability

#### Compliance
- Burundian data protection laws
- Payment provider requirements
- Delivery partner requirements
- International data transfer rules (if applicable)

---

## Implementation Phases

### Phase 1: Essential MVP ✅ Completed

**Timeline:** Completed  
**Goal:** Basic marketplace operations

**Features:**
- ✅ Dashboard with KPIs
- ✅ User management
- ✅ Seller verification
- ✅ Product approval
- ✅ Category management
- ✅ Order management
- ✅ Payment overview
- ✅ Delivery management
- ✅ Review moderation
- ✅ Dispute resolution
- ✅ Payout management
- ✅ Promotions
- ✅ Notifications
- ✅ Analytics
- ✅ Reports
- ✅ Roles & permissions
- ✅ Platform settings
- ✅ Audit logs
- ✅ System health

### Phase 2: Marketplace Growth (Future)

**Timeline:** 3-6 months  
**Goal:** Enhanced marketplace capabilities

**Features:**
- 🔄 Fraud & Risk Management
- 🔄 Search Management
- 🔄 Pricing & Commission Rules
- 🔄 Seller Wallets
- 🔄 Financial Ledger
- 🔄 Coupons & Gift Vouchers
- 🔄 Referral System
- 🔄 Loyalty Program
- 🔄 Content Management System
- 🔄 Media Library
- 🔄 Geographic Management
- 🔄 Storefront Management
- 🔄 Policy Management
- 🔄 Prohibited Products
- 🔄 Device & Session Management

**Priority Order:**
1. Fraud & Risk Management (High)
2. Search Management (High)
3. Pricing Rules (High)
4. Seller Wallets (High)
5. Financial Ledger (High)
6. Prohibited Products (High)
7. Device & Session Management (High)
8. Content Management (Medium)
9. Media Library (Medium)
10. Storefront Management (Medium)
11. Geographic Management (Medium)
12. Policy Management (Medium)
13. Coupons (Medium)
14. Referral System (Medium)
15. Loyalty Program (Medium)

### Phase 3: Scale (Future)

**Timeline:** 6-12 months  
**Goal:** Advanced marketplace operations

**Features:**
- 🔄 Business Intelligence
- 🔄 Feature Flags
- 🔄 Multiple Payment Providers
- 🔄 Advanced Logistics
- 🔄 Automated Fraud Detection
- 🔄 Seller Tiers
- 🔄 Personalized Recommendations
- 🔄 Advanced Marketing Automation
- 🔄 Multi-country Support
- 🔄 API Ecosystem
- 🔄 Integrations Management
- 🔄 Sandbox Mode
- 🔄 Emergency Center
- 🔄 Admin Impersonation
- 🔄 Localization Management

**Priority Order:**
1. Emergency Center (High)
2. Feature Flags (Medium)
3. Integrations Management (Medium)
4. Business Intelligence (Medium)
5. Sandbox Mode (Low)
6. Admin Impersonation (Low)
7. Localization Management (Low)

---

## Appendix

### Key Performance Indicators (KPIs)

#### Platform Health
- Daily active users
- Daily active sellers
- Order volume
- Revenue
- Conversion rate
- Customer retention rate
- Seller retention rate

#### Operational Health
- Average order processing time
- Average delivery time
- Payment success rate
- Dispute resolution time
- Customer support response time

#### Financial Health
- Gross merchandise value (GMV)
- Commission revenue
- Average order value
- Refund rate
- Payout processing time

#### Security Health
- Fraud detection rate
- Failed login attempts
- Suspicious activity alerts
- Security incidents

### Monitoring & Alerting

#### Critical Alerts
- Payment service down
- Database connection failed
- API response time > 5s
- Error rate > 5%
- Fraud spike detected

#### Warning Alerts
- Low stock on top products
- High cancellation rate
- Negative review spike
- Seller verification backlog
- Payout processing delay

### Backup & Recovery

#### Backup Strategy
- Database: Daily full backups + hourly incremental
- Media: Daily backups to cloud storage
- Configuration: Version-controlled
- Audit logs: Immutable storage

#### Recovery Time Objectives (RTO)
- Critical systems: 1 hour
- Non-critical systems: 4 hours
- Full platform: 8 hours

#### Recovery Point Objectives (RPO)
- Database: 1 hour
- Media: 24 hours
- Configuration: Real-time

---

**Document Status:** Version 1.0  
**Last Updated:** August 2026  
**Next Review:** December 2026
