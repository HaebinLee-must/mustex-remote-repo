# CEX Frontend Data Model & API Interface

> **Status:** Draft (v1.0)  
> **Last Updated:** 2026-01-20  
> **Purpose:** Bridge between PRD and Technical Implementation

---

## 1. 공통 엔티티 (Common Entities)

### 1.1 Account Context
UI 전반의 권한 판단을 위한 핵심 객체.
```typescript
interface AccountContext {
  id: string;
  state: number; // 0~4 (Core PRD 기준)
  kycStatus: 'NONE' | 'PENDING' | 'VERIFIED' | 'REJECTED';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  permissions: string[]; // ['SPOT_TRADE', 'WITHDRAW', 'FIAT_ACCESS']
  restrictions: {
    reason: 'STATE' | 'POLICY' | 'RISK';
    message: string;
  }[];
}
```

### 1.2 Asset & Balance
```typescript
interface AssetBalance {
  symbol: string;
  name: string;
  total: number;
  available: number;
  locked: number; // In orders or pending withdrawal
  usdValue: number;
}
```

---

## 2. Trade API (WebSocket & REST)

### 2.1 Market Data (WebSocket)
- **Topic:** `market.{symbol}.ticker`
- **Payload:**
```json
{
  "symbol": "BTCUSDT",
  "lastPrice": "42500.50",
  "change24h": "+2.5",
  "high24h": "43000.00",
  "low24h": "41000.00",
  "volume24h": "1200.5"
}
```

### 2.2 Order Book (WebSocket)
- **Topic:** `market.{symbol}.depth`
```json
{
  "bids": [["42500.00", "1.2"], ["42499.50", "0.5"]],
  "asks": [["42501.00", "0.8"], ["42502.00", "2.1"]]
}
```

---

## 3. Onboarding & KYC API

### 3.1 KYC Submission (REST)
- **Endpoint:** `POST /api/v1/kyc/submit`
- **Request:**
```typescript
interface KYCRequest {
  type: 'BASIC' | 'ADVANCED';
  personalInfo: {
    firstName: string;
    lastName: string;
    dob: string;
    address: string;
  };
  documents: {
    docType: 'PASSPORT' | 'ID_CARD';
    fileId: string;
  }[];
}
```

---

## 4. Wallet API

### 4.1 Withdrawal Request (REST)
- **Endpoint:** `POST /api/v1/wallet/withdraw`
- **Request:**
```json
{
  "asset": "BTC",
  "network": "BTC",
  "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  "amount": "0.1",
  "otp": "123456"
}
```

---

## 5. UI 상태 관리 전략 (State Management)

- **Global Store (Zustand/Redux):** `AccountContext`, `AssetBalances`, `UI Theme`.
- **Server State (React Query):** `Transaction History`, `Order History`, `Market List`.
- **Real-time (Context/Socket):** `Order Book`, `Price Ticker`.

---

## 6. Error & Exception Model

API 응답 실패 시 UI에서 일관된 처리를 위한 에러 모델.
```typescript
interface ApiError {
  code: string; // e.g., "INSUFFICIENT_BALANCE", "KYC_REQUIRED"
  message: string; // 사용자 노출용 기본 메시지
  action?: {
    label: string;
    link: string; // e.g., "/kyc"
  };
}
