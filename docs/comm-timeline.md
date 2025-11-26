## 프론트/백엔드 통신 타임라인

1. 확장프로그램 미니창에서 **성능 & 보안 분석 실행** 버튼 클릭
2. (프론트→백엔드) **POST** `/api/tests`
3. (백엔드→프론트) **testId** 응답
4. (프론트→백엔드) **GET** `/api/tests/{testId}/wait?topic=CORE_READY` (롱폴링)
5. (프론트→백엔드) **POST** `/api/tests/{testId}/web-vitals` + **POST** `/api/tests/{testId}/web-vitals/ai`
6. (백엔드→프론트) **CORE_READY** 응답
   - CORE_READY: Web_vitals, Security_vitals, Scores 준비 완료 → 관련 API 요청 가능
7. (프론트→백엔드) **GET** `/api/tests/{testId}/wait?topic=AI_READY` (롱폴링)
8. (프론트→백엔드) **GET** `/api/tests/{testId}/scores` (미니창 결과 표시)
9. 미니창에서 **자세히 보기** 클릭 → 대시보드 이동
10. (프론트→백엔드) 대시보드 페이지 구성을 위한 **GET** API들 요청
11. (백엔드→프론트) **AI_READY** 응답
    - AI_READY: Ai_recommendations, Ai_expectations, Ai_priority, Ai_expectations_score 준비 완료
12. (프론트→백엔드) 개선방안 & 효과 페이지 구성을 위한 **GET** API들 요청
