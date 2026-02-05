# CEX Project Documentation

## 📁 Directory Structure

```
mustex/
├── .claude/
│   └── skills/
│       └── cex-core/
│           ├── core_prd.md                # Core PRD v1.2 (최상위 판단 헌법)
│           ├── ui_ux_rules.md             # UI/UX 공통 규칙
│           ├── compliance_rules.md        # 규제 준수 원칙
│           ├── onboarding_structure.md    # 온보딩 구조 (판단 규칙)
│           ├── trade_structure.md         # 거래 구조 (판단 규칙)
│           ├── wallet_structure.md        # 지갑 구조 (판단 규칙)
│           └── mypage_structure.md        # 마이페이지 구조 (판단 규칙)
├── prd/
│   ├── onboarding.md                     # 온보딩 UI PRD (산출물)
│   ├── trade.md                          # 거래 UI PRD (산출물)
│   ├── wallet.md                         # 지갑 UI PRD (산출물)
│   └── mypage.md                         # 마이페이지 UI PRD (산출물)
├── reference/
│   ├── screenshots/                      # 참고 스크린샷 (판단 기준 아님)
│   └── notes.md                          # 참고 노트 (판단 기준 아님)
└── core_prd.txt                          # Core PRD 원본 (v1.2)
```

---

## 🧠 Skills vs 📄 PRD vs 📚 Reference

### Skills (.claude/skills/cex-core/)
**역할:** AI의 사고 규칙, 판단 기준 (변하지 않는 헌법)

- **Core PRD v1.2** - 최상위 판단 기준
- **UI/UX Rules** - 제한 상태 표현 원칙
- **Compliance Rules** - 규제 준수 원칙
- **Module Structures** - 각 모듈의 구조와 책임 경계

**특징:**
- Claude Code 실행 시 자동 로드
- 기능 설명이 아니라 판단 규칙
- 화면이 아니라 구조와 책임 경계
- AI가 "이 서비스는 이런 거래소다"라고 기억해야 하는 내용

---

### PRD (prd/)
**역할:** Skills를 기반으로 생성된 구체적 산출물

- **onboarding.md** - 화면 목록, 플로우, UI 정의
- **trade.md** - 레이아웃, 컴포넌트, 인터랙션
- **wallet.md** - 입출금 화면, 테이블 구조
- **mypage.md** - 섹션 구성, 설정 항목

**특징:**
- Skills 구조를 구체화한 산출물
- 실제 화면, 플로우, 기능 정의 포함
- GitHub 공유·리뷰·개발 기준 문서
- 바뀌어도 AI의 사고 규칙은 안 바뀜

---

### Reference (reference/)
**역할:** 참고 자료 (판단 기준 아님)

- **screenshots/** - 경쟁사 분석 스크린샷
- **notes.md** - 기술 참고 사항

**특징:**
- 판단 기준이 아님
- 설명·재료·맥락용
- 프롬프트에서 필요할 때만 주입

---

## 📚 Skills 상세

### 1. Core PRD v1.2
**파일:** `core_prd.md`

**주요 원칙:**
- Account 기반 판단
- State → Policy → Risk 순서
- Pilot 단계 운영 원칙
- 규제 친화적 서비스

---

### 2. Module Structures
각 모듈의 구조와 책임 경계를 정의:

**onboarding_structure.md**
- State 전환 구조 (0 → 1 → 2 → 3)
- 책임 경계 (모듈 vs Core/Policy)
- 플로우 구조 원칙

**trade_structure.md**
- 거래 타입 구조 (Spot, Derivatives)
- 정보 구조 원칙 (고밀도 환경)
- 주문 구조 및 상태

**wallet_structure.md**
- 자산 구조 원칙 (내부 원장 우선)
- 입출금 구조 및 상태
- 잔고 구성 (Total, Available, In Orders, Locked)

**mypage_structure.md**
- 모듈 성격 (조회·설정 중심, 판단 로직 없음)
- 섹션 구조
- 보안 원칙

---

## 🚀 Usage

### Claude Code에서 사용
```bash
cd /Users/mufin/Desktop/mustex
claude
```

Skills가 자동으로 로드되어 Core PRD 원칙을 따르는 코드 생성이 가능합니다.

### 문서 업데이트 가이드

**Skills 수정 시:**
- `.claude/skills/cex-core/*.md` 편집
- AI의 사고 규칙이 바뀌는 것이므로 신중히 결정
- 변경 시 모든 PRD에 영향

**PRD 수정 시:**
- `prd/*.md` 편집
- Skills를 위배하지 않는 범위에서 자유롭게 수정
- 화면, 플로우, UI 디테일 추가/변경

**Reference 추가 시:**
- `reference/` 디렉토리 활용
- 판단 기준으로 오해받지 않도록 주의

---

## ✅ Version History

- **v1.2** (2026-01-20)
  - Pilot 단계 운영 원칙 추가
  - 규제 친화적 서비스 원칙 강화
  - 환경 불안정성 전제 원칙 추가
  - 운영 권한 분리 원칙 명시
  - Module Structure Skills 추가 (4개)
