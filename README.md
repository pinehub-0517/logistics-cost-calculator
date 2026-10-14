# 물류 운송비 계산기

운행거리(km), 차량 수, km당 운임을 입력하면 **총 운송비**, **운송비 절감액**, **절감률**을 즉시 계산해 보여주는 웹앱입니다.
React + Vite + TypeScript로 만들어졌으며, 외부 데이터베이스나 API 없이 브라우저에서만 동작합니다.

## 주요 기능

- 운행거리(km) · 차량 수 · km당 운임 · 기존 km당 운임(비교 기준) 입력
- 입력 즉시 총 운송비 자동 계산
- 기존 운임 대비 운송비 절감액과 절감률 표시 (비용이 늘어나면 "비용 증가"로 표시)
- KPI 카드(총 운송비 · 절감액 · 절감률 · 총 운행거리)와 상세 결과 화면
- 기존 vs 적용 운송비 비교 막대
- PC · 태블릿 · 모바일 반응형, 다크 모드 자동 대응
- 입력값 검증(음수, 비숫자, 차량 수 정수 여부)

## 계산 공식

| 항목 | 공식 |
| --- | --- |
| 총 운행거리 | 운행거리 × 차량 수 |
| 총 운송비 | 총 운행거리 × km당 운임 |
| 기존 운송비 | 총 운행거리 × 기존 km당 운임 |
| 운송비 절감액 | 기존 운송비 − 총 운송비 |
| 절감률 | 절감액 ÷ 기존 운송비 |

계산 로직은 [`src/lib/calc.ts`](src/lib/calc.ts)에 순수 함수로 분리되어 있습니다.

## 요구 사항

- Node.js 18 이상 (20 LTS 권장)
- npm 9 이상

## 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행 (기본 http://localhost:5173)
npm run dev

# 3. 프로덕션 빌드 (dist/ 폴더 생성)
npm run build

# 4. 빌드 결과 미리보기
npm run preview
```

`npm run build`는 TypeScript 타입 검사(`tsc`)를 먼저 수행한 뒤 Vite 번들링을 실행합니다.

## 프로젝트 구조

```
logistics-cost-calculator/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx              # 진입점
    ├── App.tsx               # 상태 관리 · 레이아웃
    ├── index.css             # 전역 스타일 · 반응형
    ├── lib/
    │   └── calc.ts           # 계산 로직 · 숫자 포맷
    └── components/
        ├── InputForm.tsx     # 입력 폼
        ├── KpiCard.tsx       # KPI 카드
        └── ResultPanel.tsx   # 결과 화면
```

## Vercel 배포

1. 이 프로젝트를 GitHub(또는 GitLab/Bitbucket) 저장소에 푸시합니다.
2. [Vercel](https://vercel.com)에서 **Add New → Project**로 저장소를 가져옵니다.
3. Vercel이 Vite 프로젝트를 자동 감지합니다. 기본값을 그대로 사용하면 됩니다.
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Deploy**를 누르면 배포가 완료됩니다.

CLI로 배포하려면:

```bash
npm i -g vercel
vercel
```

환경 변수나 서버 설정은 필요하지 않습니다.

## 보안 · 개인정보

- 모든 계산은 브라우저에서만 수행되며 입력값은 어디에도 전송·저장되지 않습니다.
- API 키, 개인정보, 비밀값을 포함하지 않습니다. `.env*` 파일은 `.gitignore`로 제외됩니다.

## 라이선스

MIT
