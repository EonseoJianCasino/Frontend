# 브라우저 확장 프론트엔드

Vite + React + TypeScript 기반으로 만든 크롬 확장 프로젝트입니다. 

## 준비하기

1. 의존성 설치
   ```bash
   npm install
   ```
2. 개발 서버 실행 (UI 수정 확인용)
   ```bash
   npm run dev
   ```
   - Vite 개발 서버가 열리며, `http://localhost:5173`에서 화면을 바로 확인할 수 있습니다.

## 빌드 & 배포 과정

1. 프로덕션 빌드
   ```bash
   npm run build
   ```
   - `dist/` 폴더에 확장 배포 파일이 생성됩니다.
2. 크롬에 로드
   - `chrome://extensions` 이동 → **개발자 모드** 활성화
   - **압축해제된 확장 프로그램을 로드** 클릭 후 `dist/` 폴더 선택

## 주요 스크립트 요약

- `npm run dev`: 개발 모드 실행
- `npm run build`: 타입 체크 후 프로덕션 번들 생성