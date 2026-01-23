# CEX Detailed Compliance & State Matrix

> **Status:** Draft (v1.0)  
> **Last Updated:** 2026-01-20  
> **Derived From:** [Core PRD v1.2](../.claude/skills/cex-core/core_prd.md), [Compliance Rules](../.claude/skills/cex-core/compliance_rules.md)

---

## 1. 개요
본 문서는 `Core PRD`의 State 레벨(0~4)에 따른 기능별 상세 권한과 제한 사유를 정의한다. 모든 UI 컴포넌트는 본 매트릭스를 기준으로 버튼 활성화 및 안내 메시지를 구성한다. 특히 계정 인증 상태를 시각화하는 뱃지(Badge) 시스템을 포함한다.

---

## 2. Account Status & Badge System

| 상태 (Status) | 대응 State Level | 뱃지 컬러 (Tailwind) | UI 텍스트 |
| :--- | :--- | :--- | :--- |
| **Initial / Unverified** | Level 0, 1 | `text-dark-muted` | Unverified |
| **Pending** | In-Review (KYC Submitted) | `text-primary` | Pending Verification |
| **Verified** | Level 2 이상 | `text-success` | Verified |

---

## 3. State Level 권한 매트릭스

| 기능 (Action) | Level 0 (Created) | Level 1 (Email Verified) | Level 2 (KYC Basic) | Level 3 (KYC Advanced) | Level 4 (Full) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Login** | O | O | O | O | O |
| **Deposit (Crypto)** | X | O | O | O | O |
| **Trade (Spot)** | X | X | O | O | O |
| **Withdraw (Crypto)** | X | X | △ (제한적) | O | O |
| **Fiat In/Out** | X | X | X | O | O |

- **O**: 허용
- **X**: 차단
- **△**: 정책(Policy)에 따른 한도 내 허용

---

## 3. 기능별 상세 제약 로직 및 UX 메시지

### 3.1 거래 (Trade)
- **대상:** `Trade Order Panel`, `Buy/Sell Button`
- **로직:** 
    - `State < Level 2`: 주문 불가
    - `Risk == High`: 주문 불가
- **UX 메시지:**
    - **State 제한:** "거래를 시작하려면 KYC Basic 인증(Level 2)이 필요합니다. [인증하기]"
    - **Risk 제한:** "보안 검토 중으로 주문이 제한되었습니다. 고객센터에 문의해주세요."

### 3.2 출금 (Withdrawal)
- **대상:** `Wallet Withdrawal Button`, `Submit Button`
- **로직:**
    - `State < Level 2`: 출금 불가
    - `State == Level 2`: 일일 출금 한도 적용 (예: $10,000 상당)
    - `State >= Level 3`: 확장된 출금 한도 적용
- **UX 메시지:**
    - **State 제한:** "자산 출금을 위해 KYC 인증이 필요합니다. [인증하기]"
    - **Policy 제한:** "현재 Level 2 등급의 일일 잔여 출금 한도는 {Amount} {Symbol} 입니다."

### 3.3 입금 (Deposit)
- **대상:** `Wallet Deposit Button`
- **로직:**
    - `State < Level 1`: 주소 생성 불가
- **UX 메시지:**
    - **State 제한:** "입금 주소를 생성하려면 이메일 인증이 필요합니다. [인증하기]"

---

## 4. 리스크(Risk) 상태 정의

| 리스크 유형 | 발생 사유 | 시스템 조치 | 해제 방법 |
| :--- | :--- | :--- | :--- |
| **Suspicious Activity** | 비정상 IP 로그인, 단시간 대량 거래 | 모든 출금 및 거래 즉시 차단 | 운영자 수동 검토 및 본인 확인 |
| **KYC Re-review** | 신분증 만료, 정보 불일치 의심 | KYC 단계 강등 또는 출금 제한 | 서류 재제출 및 승인 |
| **Policy Risk** | 규제 대상 국가 IP 접속 | 해당 지역 서비스 접근 차단 | 지역 이동 또는 소명 |

---

## 5. Pilot 단계 특약 (Pilot Provision)
- 모든 출금은 운영자 **수동 승인** 후 진행될 수 있음을 사용자에게 고지한다.
- **메시지:** "Pilot 운영 기간 동안 안전한 자산 보호를 위해 모든 출금 요청은 운영자 검토 후 처리됩니다. (최대 24시간 소요)"
