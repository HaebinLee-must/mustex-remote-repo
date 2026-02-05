# CEX Wallet UI PRD
@/docs/instructions/kyc_compliance.md를 참조한다. 

> **Status:** Draft  
> **Last Updated:** 2026-01-20  
> **Depends On:**  
> - [Core PRD v1.2](../.claude/skills/cex-core/core_prd.md)  
> - [Wallet Structure](../.claude/skills/cex-core/wallet_structure.md)

---

## 1. 목표

자산 현황을 단일 진실 원천 기준으로 명확히 제공하고, 입출금 판단 경계를 분명히 한다.

---

## 2. 화면 구성

- **Wallet List** - 자산 목록
- **Deposit** - 입금
- **Withdrawal** - 출금
- **Transaction History** - 입출금 내역

---

## 3. Wallet List

### 3.1 테이블 구조
**컬럼:** Currency, Total, Available, In Orders, Locked, Action

**기능:** 검색, 소액 숨김, 정렬

---

## 4. Deposit

### 4.1 단계
1. 자산 선택
2. 네트워크 선택
3. 주소 생성/표시

### 4.2 주소 표시
- QR 코드 + 텍스트
- Copy 버튼
- 최소 입금 금액, 확인 블록 수 안내

---

## 5. Withdrawal

### 5.1 단계
1. 자산/네트워크 선택
2. 주소/금액 입력
3. 2FA 인증
4. 확인 및 제출

### 5.2 제약 처리
- State/Policy/Risk 미충족 시 CTA Disabled + 사유
- 잔고 부족, 한도 초과 시 안내

---

## 6. Transaction History

**컬럼:** Time, Type, Currency, Amount, Network, Status, TxID

**필터:** Date Range, Type, Currency, Status

---

## 7. 보안 안내

- "잘못된 네트워크로 입금 시 자산 손실 가능"
- "출금은 취소할 수 없습니다"

---

## 8. Quick Swap (추가)

### 8.1 목표
자산 간 즉시 교환 기능을 제공하여 복잡한 거래 과정을 간소화한다.

### 8.2 UI 구성
- **From/To 선택**: 드롭다운 형식의 자산 선택
- **실시간 환율**: 1 {AssetA} ≈ {Value} {AssetB} 표시
- **슬리피지 설정**: 허용 오차 범위 설정 (기본 0.5%)
- **전환 버튼**: Preview Conversion -> Confirm Swap 단계

### 8.3 제약 처리
- 최소/최대 교환 금액 제한
- 잔고 부족 시 버튼 비활성화 및 안내
