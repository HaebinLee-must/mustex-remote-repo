# CEX Trade Logic & Order UX Details

> **Status:** Draft (v1.0)  
> **Last Updated:** 2026-01-20  
> **Related PRD:** [Trade UI PRD](./trade.md)

---

## 1. 개요
본 문서는 거래 시스템의 주문 타입별 상세 동작 로직, 유효성 검사 규칙, 그리고 다양한 예외 상황에 대한 UX 대응 방안을 정의한다.

---

## 2. 주문 타입별 상세 로직 (Order Types)

### 2.1 Limit Order (지정가 주문)
- **필수 입력:** Price, Amount
- **동작:** 사용자가 지정한 가격 또는 그보다 유리한 가격에서만 체결.
- **예약금(Locked Balance) 계산:** `Price * Amount * (1 + Estimated Fee Rate)`

### 2.2 Market Order (시장가 주문)
- **필수 입력:** Amount (또는 Total)
- **동작:** 호가창의 최우선 호가부터 즉시 체결.
- **UX 주의사항:** 가격 변동성이 클 경우 예상보다 불리한 가격에 체결될 수 있음을 경고.
- **예약금 계산:** 최우선 호가 기준 예상 금액의 약 105% (Slippage 대비)

### 2.3 Stop-Limit Order (조건부 지정가 주문)
- **필수 입력:** Stop Price (트리거 가격), Limit Price (주문 가격), Amount
- **동작:** 시장 가격이 Stop Price에 도달하면 Limit Price의 지정가 주문이 활성화됨.

---

## 3. 실시간 유효성 검사 (Validation Rules)

| 항목 | 검사 규칙 | 실패 시 UX 피드백 |
| :--- | :--- | :--- |
| **최소 주문 금액** | 마켓별 설정값 이상 (예: 10 USDT) | "최소 주문 금액은 {Min} {Symbol} 입니다." |
| **잔고 확인** | `Total Cost <= Available Balance` | "잔고가 부족합니다. [입금하기]" |
| **가격 단위 (Tick)** | 마켓별 Price Tick 준수 (예: 0.01) | 입력 값을 가장 가까운 Tick 단위로 자동 보정 |
| **수량 단위 (Step)** | 마켓별 Amount Step 준수 (예: 0.0001) | 입력 값을 가장 가까운 Step 단위로 자동 보정 |

---

## 4. 예외 상황 및 UX 대응 (Edge Cases)

### 4.1 Slippage Warning (시장가 주문 시)
- **조건:** 주문 수량이 호가창의 뎁스를 크게 상회하여 예상 체결가와 현재가 차이가 3% 이상일 때.
- **UX:** 주문 버튼 상단에 경고 문구 노출: "호가 뎁스가 얇아 가격 편차가 클 수 있습니다."

### 4.2 Partial Fill (부분 체결)
- **현상:** 주문 수량 중 일부만 체결되고 나머지는 `Open Orders`에 남음.
- **UX:** `Open Orders` 리스트의 `Filled` 컬럼에 진행률(%) 표시 및 애니메이션 효과.

### 4.3 WebSocket Disconnect (연결 끊김)
- **현상:** 실시간 호가 및 차트 업데이트 중단.
- **UX:** 
    - 화면 상단에 "연결 재시도 중..." 인디케이터 표시.
    - 주문 패널의 가격 입력부 및 버튼 비활성화 처리 (잘못된 가격 기반 주문 방지).

---

## 5. 주문 프로세스 UX (Order Lifecycle)

1. **Input:** 입력 시 실시간으로 `Total` 및 `Fee` 계산하여 표시.
2. **Confirmation:** (옵션) 고액 주문 또는 시장가 주문 시 확인 팝업 노출.
3. **Submission:** 클릭 즉시 버튼을 `Loading` 상태로 전환하여 중복 클릭 방지.
4. **Result:**
    - **성공:** 토스트 메시지 ("주문이 정상적으로 접수되었습니다.")
    - **실패:** 사유 명시 ("잔고 부족", "네트워크 오류" 등)

---

## 6. Pilot 단계 제약 (Pilot Constraints)
- **Spot Only:** 현재 Spot 마켓만 지원하며 Derivatives 탭은 "Expansion 단계에서 지원 예정" 안내 노출.
- **Market Limit:** 단일 주문 최대 금액 제한 적용 (Risk 관리 차원).
