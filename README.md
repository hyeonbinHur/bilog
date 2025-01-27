<div align="center">
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">
    <img src="https://img.shields.io/badge/typescript-3178c6?style=for-the-badge&logo=TypeScript&logoColor=white">
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
    <img src="https://img.shields.io/badge/Next intle-26A69A?style=for-the-badge&logo=i18next&logoColor=white">
    <img src="https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white">
    <img src="https://img.shields.io/badge/NextAuth-000000?style=for-the-badge&logo=Next.js&logoColor=white">
    <img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=for-the-badge&logo=Amazon RDS&logoColor=white">
    <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
    <img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white">

  <br/>
  <br/>
  <br/>
  <div align="center">
    <img src="https://github.com/user-attachments/assets/77794825-4b72-458e-adf4-9b469af88e84" 
         width="400px"
         alt="Bilog Thumbnail image"/>
  </div>
</div>

  ## Project Overview

많은 개발자들이 다양한 이유로 자신만의 블로그를 운영하거나 개발하고 있습니다. 일부는 블로그를 개발하는 것이 흔하고 뻔한 작업이라고 생각할 수 있습니다. 그럼에도 불구하고, 'Bilog'를 만든 가장 큰 이유는 기존의 블로그 플랫폼에서 제가 원하는 기능을 찾을 수 없었기 때문입니다.
한국어로 한국인들과 의견을 나누는 것은 전 세계적으로 한국어를 사용할 수 있는 개발자가 극히 일부에 불과하며, 영어를 사용하는 한국 개발자들 또한 그 수가 매우 적습니다. 한국인과 외국인 모두와 동시에 의견을 공유하고 싶었기에, 두 언어를 모두 포용할 수 있는 글로벌 블로그 플랫폼이 필요했고, 그 결과로 'Bilog'를 직접 개발하게 되었습니다.

  ## Core Libraries
- Next.js (v14.0.3): React 기반의 프레임워크로, 서버 사이드 렌더링과 정적 사이트 생성 지원.  
- React (v18.3.1): 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리.  
- TailwindCSS (v3.3.0)**: 유틸리티 기반의 CSS 프레임워크.
- Next-Intl (v3.26.2)**: Next.js 애플리케이션에서 다국어 지원 및 국제화 기능을 제공.  
- Next-Auth (v4.24.11)**: 다양한 인증 제공자를 지원하는 인증 라이브러리.
- MySQL2 (v3.11.4)**: MySQL 데이터베이스와 Node.js의 통신을 지원.  
- TypeScript (v5.7.2)**: 정적 타입 체킹과 코드 품질 향상을 위한 도구.
- AWS S3 (v3.701.0)**: 파일 및 이미지 업로드를 위한 안전한 클라우드 스토리지 서비스. 

## Setup

Run the following command to install dependencies:

```bash
 npm install    
```

## Feature

## 기본 블로그 페이지
![1](https://github.com/user-attachments/assets/c5dac1f7-e83c-460d-9632-ed8a61cd2031)

## 포스트 개별 언어 설정
![2](https://github.com/user-attachments/assets/cd457c00-0032-4087-a107-ce943b38dc63)

## 웹 전체 언어 설정
![3](https://github.com/user-attachments/assets/64587693-9c17-4592-b434-de8d26ebbfe6)

## 메인 페이지
![4](https://github.com/user-attachments/assets/a1a96043-96cd-46a7-a087-f46abfb0d3a3)

## 회고

이전 프로젝트를 React와 JavaScript로 개발할 당시에는 큰 어려움을 느끼지 못했습니다. 그러나 개발 이후, 프로젝트를 다시 점검해야 하는 상황이나 백엔드 데이터 타입이 변경될 때, 프론트엔드에서 예상치 못한 에러를 여러 번 마주하게 되었습니다. 이러한 문제는 견고한 타입 선언에 대한 고민으로 이어졌고, 결국 TypeScript의 필요성을 실감하고 TypeScript를 도입한 첫 프로젝트를 시작하게 되었습니다.

TypeScript 학습은 문법, 이론, 구현 등 기초부터 차근차근 시작해야 했기때문에 생각보다 오랜 시간이 소요되었습니다. 하지만 이 프로젝트는 단순히 다른 사람의 영향이 아닌, 실질적인 필요성을 기반으로 시작되었기에 주도적으로 기술 역량을 향상시키는 계기가 되었습니다.

TypeScript와 더불어 SEO 문제 또한 중요한 고민거리였습니다. 기존 React는 SPA 특성상 검색 엔진 최적화(SEO)에 한계가 있었고, 이를 극복하기 위해 Next.js 도입을 결정했습니다. 이로써 프론트엔드 개발자로서의 기술적 방향성을 명확하게 설정할 수 있었습니다.

물론, 새롭게 도입하고 싶었던 기술들이 많았습니다. 예를 들어, Google Analytics를 활용해 유저 방문 패턴과 유입 비중 등을 분석하며 블로그를 더욱 발전시키고 싶었습니다. 그러나 경험과 실력이 충분하지 않은 상태에서 무분별하게 새로운 기술을 적용하는 것은 오히려 프로젝트의 안정성을 해칠 수 있다고 판단했습니다.

이 프로젝트는 완벽한 타입 선언과 서버사이드 렌더링을 포함한 핵심 기술에 집중했습니다. 단순히 기능 구현에만 몰두하기보다는, 이론적 배경과 성능적 관점까지 고려하여 기술의 근본적인 이해와 적용에 집중했습니다.

결과적으로, 이 프로젝트는 단발성으로 끝나는 것이 아닌, 유지 가능하고 발전 가능한 프로젝트로 자리 잡았습니다. 프론트엔드 개발자로서 TypeScript와 Next.js의 필요성을 직접 체감하고 적용한 경험은 기술적 성장의 중요한 토대가 되었습니다. 앞으로도 꾸준한 업데이트를 통해 더 나은 프로젝트로 발전시켜 나갈 것입니다.













  
