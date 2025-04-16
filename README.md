# 마포동네 커뮤니티

> "우리 동네의 이야기를, 우리끼리 나누는 곳"

서울시 마포구 주민을 위한 미니멀하고 실용적인 웹 커뮤니티입니다.

## 기술 스택

- **프론트엔드**: Next.js 15 (App Router), TypeScript, TailwindCSS
- **백엔드**: Vercel Edge Functions
- **데이터베이스**: Supabase
- **배포**: Vercel
- **패키지 관리자**: npm

## 로컬 개발 환경 설정

1. 저장소 클론

   ```bash
   git clone https://github.com/yourusername/mapo-dongne.git
   cd mapo-dongne
   ```

2. 의존성 설치

   ```bash
   npm install
   ```

3. 환경 변수 설정

   - `.env.local.example` 파일을 `.env.local`로 복사하고 Supabase 정보 입력

4. 개발 서버 실행 (터보팩 사용)

   ```bash
   npm run dev
   ```

5. 브라우저에서 http://localhost:3000 접속

## 디렉토리 구조

- `/src/app` - 페이지 및 라우팅
- `/src/components` - 재사용 가능한 UI 컴포넌트
- `/src/lib` - 유틸리티 함수 및 설정

## 핵심 기능

- 홈: 최근 글 + 핫 게시글 요약
- 게시판 목록: 자유게시판 / 핫게시판 / 홍보 / 지역 / 신규 생성 요청
- 게시판 상세: 글 목록 + 글쓰기 버튼
- 글 상세: 댓글, 좋아요, 태그 표시

## 기여하기

이슈 및 피드백은 GitHub 이슈 트래커를 통해 제출해주세요.

## 라이선스

MIT
