# CEX Trade UI PRD

@/docs/instructions/kyc_compliance.md를 참조한다. 

> **Status:** Draft  
> **Last Updated:** 2026-01-20  
> **Depends On:**  
> - [Core PRD v1.2](../.claude/skills/cex-core/core_prd.md)  
> - [Trade Structure](../.claude/skills/cex-core/trade_structure.md)

---

## 1. 목표

고밀도 정보 환경에서 거래 판단에 필요한 정보를 빠르게 제공하고,  
실행 가능 여부를 명확히 분리한다.

---

## 2. 레이아웃 구조

### 2.1 데스크톱 레이아웃
```
┌─────────────┬──────────────────┬─────────────┐
│   Market    │      Chart       │  Order Book │
│    List     │                  │             │
├─────────────┴──────────────────┴─────────────┤
│  Order Panel  │  Recent Trades  │ Open Orders │
└───────────────┴─────────────────┴─────────────┘
```

### 2.2 모바일 레이아웃
- 탭 기반 네비게이션
- Chart / Order / Trades / Orders

---

## 3. 핵심 컴포넌트

### 3.1 Market List (좌측)

**표시 항목:**
- Currency Pair
- Last Price
- 24h Change (%)
- 24h Volume

**기능:**
- 검색 (심볼, 이름)
- 필터 (Spot, Derivatives, Favorites)
- 정렬 (가격, 변동률, 거래량)

**인터랙션:**
- 클릭 시 해당 마켓으로 전환
- 즐겨찾기 토글

---

### 3.2 Chart (중앙)

**표시 항목:**
- 캔들스틱 차트
- 거래량 차트
- 기술 지표 (선택 가능)

**기능:**
- 타임프레임 선택 (1m, 5m, 15m, 1h, 4h, 1d)
- 지표 토글 (MA, MACD, RSI 등)
- 줌/팬
- 전체화면

**제약 처리:**
- 데이터 로딩 중 스켈레톤 표시
- 네트워크 실패 시 재시도 옵션

---

### 3.3 Order Book (우측)

**표시 항목:**
- Bids (매수 호가)
- Asks (매도 호가)
- Price, Amount, Total

**기능:**
- Depth 조절 (0.01, 0.1, 1)
- Grouping 설정
- 클릭 시 주문 패널에 가격 자동 입력

**UI 규칙:**
- 숫자 우측 정렬
- 매수/매도 시맨틱 컬러
- Depth 시각화 (배경 그라데이션)

---

### 3.4 Order Panel (하단 좌측)

**주문 타입:**
- Limit Order (지정가)
- Market Order (시장가)
- Stop-Limit Order (조건부 지정가)

**입력 필드:**
- Price (Limit/Stop-Limit만)
- Amount
- Total (자동 계산)

**표시 항목:**
- Available Balance
- Estimated Fee
- Total Cost/Proceeds

**CTA:**
- Buy (Primary, 매수)
- Sell (Primary, 매도)

**제약 처리:**
- State/Policy/Risk 미충족 시 CTA Disabled + 사유
- 잔고 부족 시 명시
- 최소 주문 금액 미달 시 안내

---

### 3.5 Recent Trades (하단 중앙)

**표시 항목:**
- Time
- Price
- Amount
- Side (Buy/Sell)

**UI 규칙:**
- 실시간 업데이트
- 최근 거래 강조 (애니메이션)
- 매수/매도 컬러 구분

---

### 3.6 Open Orders / History (하단 우측)

**탭:**
- Open Orders (미체결 주문)
- Order History (체결 내역)

**Open Orders 표시:**
- Time, Pair, Type, Side, Price, Amount, Filled, Total, Action

**Action:**
- Cancel (개별 취소)
- Cancel All (전체 취소)

**Order History 표시:**
- Time, Pair, Type, Side, Price, Amount, Filled, Status

**필터:**
- Date Range
- Pair
- Type
- Status

---

## 4. UI 규칙

### 4.1 숫자 표현
- 우측 정렬
- 천 단위 구분 (,)
- 소수점 자릿수 일관성

### 4.2 컬러 시스템
- 상승: Green (#00C087)
- 하락: Red (#FF4D4F)
- 중립: Gray (#8C8C8C)

### 4.3 실시간 업데이트
- WebSocket 기반 실시간 데이터
- 연결 상태 표시
- 재연결 자동 시도

---

## 5. 제약 처리

### 5.1 거래 불가 상태
- **State 기반:** "거래하려면 KYC 인증이 필요합니다"
- **Policy 기반:** "현재 국가에서는 이 자산을 거래할 수 없습니다"
- **Risk 기반:** "보안 검토 중입니다. 고객센터에 문의해주세요"

### 5.2 주문 실패
- 실패 사유 명확히 표시
- 재시도 옵션 제공
- 잔고 즉시 복구

---

## 6. 환경 불안정성 대응

### 6.1 네트워크 실패
- WebSocket 연결 끊김 시 명시
- 재연결 시도 중 표시
- 수동 재연결 옵션

### 6.2 주문 상태 불명확
- 제출 중 상태 명시
- 타임아웃 시 확인 요청
- 중복 제출 방지

---

## 7. Pilot 단계 고려사항

- Spot만 지원 (Derivatives 비활성)
- 일부 자산 제한 안내
- 거래 한도 명시
