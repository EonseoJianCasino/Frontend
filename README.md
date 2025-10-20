# 브라우저 확장 프론트엔드

Vite + React + TypeScript로 구현한 Chrome 확장프로그램입니다.

## 개발 환경 실행

1. 의존성 설치
   `
   npm install
   `
2. 개발 서버 실행
   `
   npm run dev
   `
3. Chrome 확장 로드
   - chrome://extensions 이동 후 **개발자 모드**를 켭니다.
   - **압축해제된 확장 프로그램을 로드** → 프로젝트의 dist/ 폴더를 선택합니다.
   - 서버가 켜져 있는 동안 소스 파일을 저장하면 확장 화면이 자동으로 새로고침됩니다.

> dist/는 개발 서버가 실행되는 동안 자동으로 갱신됩니다.

## 프로덕션 빌드 & 배포

1. 최종 번들 생성
   `
   npm run build
   `
   - dist/에 배포용 파일이 생성됩니다.
2. Chrome에 배포판 로드
   - chrome://extensions → dist/ 선택
   - 필요 시 이 폴더를 압축해 Chrome 웹 스토어에 업로드할 수 있습니다.

## 주요 스크립트 요약

- npm run dev: CRXJS 개발 서버 실행 (자동 HMR)
- npm run build: 타입 검사 후 프로덕션 번들 생성
