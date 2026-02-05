# CEX MyPage UI PRD

@/docs/instructions/kyc_compliance.md를 참조한다. 

> **Status:** Draft  
> **Last Updated:** 2026-01-20  
> **Depends On:**  
> - [Core PRD v1.2](../.claude/skills/cex-core/core_prd.md)  
> - [MyPage Structure](../.claude/skills/cex-core/mypage_structure.md)

---

## 1. 목표

계정 상태를 조회·설정 중심으로 제공하며, 판단 로직은 포함하지 않는다.

---

## 2. 섹션 구성

- **Account Overview** - 계정 개요
- **Security Settings** - 보안 설정
- **Personal Information** - 개인정보
- **Transaction History** - 거래 내역
- **Support & FAQ** - 지원

---

## 3. Account Overview

### 3.1 표시 항목
- 현재 State 레벨 (Level 0~4)
- KYC 상태 (Pending / Verified / Rejected)
- 권한 및 제한 사항
- 다음 단계 안내 (CTA)

### 3.2 UI
- 카드 형식
- 진행 상황 시각화
- 제한 사유 명시 (State/Policy/Risk 구분)

---

## 4. Security Settings

### 4.1 Password Change
**입력:** Current Password, New Password, Confirm Password

**CTA:** Change Password (Primary)

**제약:** 2FA 인증 필요

### 4.2 2FA Settings
**옵션:** Enable / Disable

**CTA:** Enable 2FA (Primary)

**제약:** 비활성화 시 추가 인증

### 4.3 Login History
**표시:** Time, Device, IP, Location, Status

**기능:** 의심스러운 활동 신고

---

## 5. Personal Information

### 5.1 표시 항목
- 이름, 이메일, 전화번호, 생년월일, 주소

### 5.2 편집
- 일부 정보는 KYC 재검토 필요 안내
- 변경 요청 제출 후 승인 대기

---

## 6. Transaction History

**표시:** Time, Type, Pair, Amount, Status

**필터:** Date Range, Type

---

## 7. Support & FAQ

### 7.1 FAQ
- 카테고리별 Q&A
- 검색 기능

### 7.2 Contact
- 이메일, 채팅, 티켓 제출
