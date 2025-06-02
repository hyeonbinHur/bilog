# Bilog (비-로그) 🌍
<img width="1512" alt="image" src="https://github.com/user-attachments/assets/0fbf95aa-1e0f-452e-82be-988be38f384c" />

> 영어와 한국어를 동시에 지원하는 개발자 친화적 글로벌 기술 블로그

<br/>
<br/>

🖼️ 서비스 미리보기

🇰🇷 한국어 모드
<details>
<summary>한국어 포스트 리스트 보기</summary>
<img width="1512" alt="한국어 포스트 리스트" src="https://github.com/user-attachments/assets/11a4a6d4-7517-4a45-86c8-6d1e6c4a2336" />
</details>
<details>
<summary>한국어 포스트 본문 보기</summary>
<img width="1512" alt="한국어 포스트 본문" src="https://github.com/user-attachments/assets/79676674-5a11-4db3-82ae-253928952fec" />
</details>

🇺🇸 영어 모드
<details>
<summary>영어 포스트 리스트 보기</summary>
<img width="1512" alt="영어 포스트 리스트" src="https://github.com/user-attachments/assets/b2de2459-efb6-403e-b0e8-3054955ae235" />
</details>

<details>
<summary>영어 포스트 본문 보기</summary>
<img width="1512" alt="영어 포스트 본문" src="https://github.com/user-attachments/assets/da6da5ea-62c9-4e2f-820c-160a7daeca4b" />
</details>

<details>
<summary>페이지 전체 언어 변경 헤더</summary>
<img width="1512" alt="페이지 전체 언어 변경 헤더" src="https://github.com/user-attachments/assets/40d692f6-958f-4622-8a2f-a26a67ad0469" />
</details>

<details>
<summary>포스트 내부 언어 변경</summary>
<img width="1512" alt="페이지 전체 언어 변경 헤더" src="https://github.com/user-attachments/assets/a4e91f4f-3ab6-4351-afe0-a897c8a633b6" />
</details>


**서비스 상태**: 현재 운영 중 🟢

**링크**: https://www.h-bilog.online/

## 🚀 주요 기능

### 🌐 다국어 시스템
- **독립적 언어 선택**: 전체 사이트 언어와 개별 포스트 언어 독립 설정
- **브라우저 언어 자동 감지**: 첫 방문 시 Accept-Language Header 기반 자동 설정
- **하이브리드 렌더링**: SSR 성능 최적화 + CSR 사용자 상호작용

### ✍️ 고급 에디터 시스템
- **TinyMCE WYSIWYG 에디터**: 직관적인 글 작성 환경
- **코드 하이라이팅**: react-syntax-highlighter를 활용한 문법 강조

### 🔐 다중 인증 시스템
- **Next-Auth 기반 소셜 로그인**
  - Google 인증
  - GitHub 인증  
  - Kakao 인증

### 🎨 현대적 UI/UX
- **Tailwind CSS + Shadcn/ui**: 일관성 있는 디자인 시스템
- **반응형 디자인**: 모든 디바이스에서 최적화된 사용자 경험

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js, React
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui
- **Editor**: TinyMCE
- **i18n**: next-intl

### Backend & Database
- **Database**: MySQL
- **Cloud Storage**: AWS S3
- **Database Hosting**: AWS RDS

## 📊 성능 지표

| 메트릭 | Before | After | 개선율 |
|--------|---------|-------|--------|
| First Load JS | 640KB | 146KB | 77% ↓ |
| Lighthouse Score | 82점 | 98점 | 16점 ↑ |
| LCP | 5.6초 | 1.0초 | 82% ↓ |
| 이미지 용량 | 원본 | 77% 감소 | - |

## 🚀 설치 및 실행


### 의존성 설치 및 실행
```bash
npm install
npm run dev
```

## 📁 프로젝트 구조

```
src/
├── app/                # Next.js 14 App Router
├── components/         # 재사용 가능한 컴포넌트
├── context/           # React Context
├── helper/            # 유틸리티 함수
├── hooks/             # 커스텀 훅
├── i18n/              # 다국어 리소스
└── lib/               # 공통 라이브러리
```

## 🌟 주요 학습 성과

### 기술적 성과
- **다국어 웹 애플리케이션 설계**: next-intl을 활용한 국제화(i18n) 구현
- **하이브리드 렌더링 최적화**: SSR 성능과 CSR 상호작용의 균형
- **이미지 최적화 파이프라인**: WebP 변환 + 리사이징으로 77% 용량 절감
- **SEO 최적화**: Sitemap.xml, Robot.ts를 통한 검색 엔진 최적화

### 운영 경험
- **실제 서비스 운영**: 글로벌 사용자를 대상으로 한 블로그 플랫폼 지속 운영
- **성능 모니터링**: Lighthouse를 활용한 지속적 성능 개선
- **사용자 경험 개선**: Progress Bar, 코드 하이라이팅 등 UX 최적화
