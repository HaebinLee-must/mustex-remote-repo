# [Skill Document] CEX 통합 인증 및 KYC 컴플라이언스 명세

## 1. 개요 (Context)

글로벌 거래소 솔루션의 핵심은 국가별 규제(Compliance)에 유연하게 대응하면서도 가입 이탈을 최소화하는 것입니다. 본 기술 스택은 **React, Tailwind CSS, Zustand, React Hook Form**을 기반으로 하며, 정책 기반의 동적 온보딩 시스템을 구축하는 것을 목표로 합니다.

## 2. 통합 보안 레벨 및 권한 매트릭스

사용자의 인증 상태에 따라 프론트엔드 기능을 동적으로 제어합니다.

| **레벨** | **상태 (State)** | **허용 기능 (Permissions)** | **UX 제약 조건** |
| --- | --- | --- | --- |
| **Level 0** | Created | 로그인, 마켓 조회 | 입금 시도 시 "이메일 인증 필요" 안내 |
| **Level 1** | Verified | 가상자산 입금 가능 | 거래 시도 시 "KYC Basic 필요" 팝업 노출 |
| **Level 2** | KYC Basic | 현물 거래, 기본 한도 출금 | 한도 도달 시 "상급 KYC(Level 3) 권장" 메시지 |
| **Level 3** | Advanced | 법정화폐(Fiat) 거래, 최대 한도 | 모든 기능 잠금 해제 |

## 3. 핵심 기술 구현 (Frontend Logic)

### 3.1 정책 기반 동적 워크플로우 (Policy-Driven Workflow)

- **Residence-First Logic**: 거주 국가 선택 즉시 `constants/policy.ts`를 참조하여 이후 스텝을 실시간 재구성합니다.
    - *예시*: EU, UK, AU 국가 선택 시 `isPOARequired` 플래그를 활성화하여 주소 증빙(POA) 단계를 강제 삽입합니다.
- **Conditional ID UI**: 국적(Nationality)과 거주 국가 조합에 따라 허용되는 신분증 타입(Passport, ID Card, Driver License)을 카드 형태로 필터링하여 노출합니다.

### 3.2 개인정보 검증 및 폼 핸들링

- **Age Guard**: 생년월일 입력 시 실시간으로 만 18세 미만 여부를 계산합니다. 조건 미달 시 에러 메시지를 표시하고 'Continue' 버튼을 즉시 비활성화(`disabled:opacity-50`)합니다.
- **Name Input Structure**: First name과 Family name을 분리하되, "I have a middle name" 체크박스 선택 시에만 중간 이름 필드를 동적으로 렌더링합니다.

### 3.3 보안 이미지 처리 프로세스

- **Presigned URL**: 민감 정보 보안을 위해 신분증 및 셀피 이미지는 클라이언트 메모리를 거치지 않고 S3 스토리지로 직접 업로드하며, 이때 서버로부터 발급받은 서명된 URL을 사용합니다.
- **Client-Side Pre-Validation**: 서버 부하 및 API 오남용 방지를 위해 업로드 전 다음 항목을 프론트엔드에서 즉시 검사합니다:
    - 파일 크기 (최대 5MB)
    - 허용 확장자 (JPG, PNG, PDF)

## 4. 사용자 경험(UX) 및 리스크 관리

### 4.1 상태 보존 및 중단 처리 (Persistence)

- **Server-Side Temp Save**: 단계 전환 시 브라우저 스토리지가 아닌 서버 DB에 데이터를 임시 저장합니다. 사용자가 브라우저를 닫고 재진입 시 `kycStatus`를 확인하여 멈췄던 지점부터 프로세스를 재개(Dynamic Stepper)합니다.

### 4.2 예외 상황 대응 (Edge Case Handling)

- **네트워크 지연**: 대용량 이미지 업로드 시 `Progress Bar`를 필수 제공하여 사용자 이탈을 방지하고, 실패 시 `Retry` 트리거를 노출합니다.
- **리스크 감지 즉시 차단**: 동일 IP 다수 가입 또는 위조 의심 시, 프로세스를 즉시 중단하고 운영팀 개입을 요구하는 전용 에러 화면으로 리다이렉트합니다.
- **심사 대기 UI**: 제출 완료 후 `Level 1_PENDING` 상태일 때 대시보드 상단에 심사 소요 시간(최대 48시간 등)을 명시한 배너를 노출합니다.

## 5. 데이터 구조 (Interface)

TypeScript

```jsx
interface OnboardingState {
  currentStep: number;
  residenceCountry: string; // 정책 분기 핵심 변수
  isPOARequired: boolean;   // Compliance Config에서 결정
  kycStatus: 'L0' | 'L1_PENDING' | 'L1_APPROVED' | 'L2_PENDING' | 'REJECTED';
  securityLevel: 0 | 1 | 2 | 3; // 기능 권한 제어용
}
```

---

**Senior PM's Note**: 이 문서는 개발팀의 기술 부채를 방지하고, 글로벌 서비스 확장 시 코드 수정 없이 `policy.ts` 설정만으로 새로운 국가의 규제에 대응할 수 있도록 아키텍처를 가이드하는 데 목적이 있습니다.