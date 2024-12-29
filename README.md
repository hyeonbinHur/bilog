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

이번 프로젝트에서 Next.js와 TypeScript를 처음 사용하면서 많은 도전과 성장을 경험했습니다. 이전 프로젝트에서는 JavaScript로만 작업을 했을때 개발함에 있어서는 큰 불편함을 느끼지 못했지만, 코드를 나중에 수정해야 할때, 백엔드에서 받아오는 데이터의 타입이 일정하지 않을때 예상 못한 부분에서 많은 에러를 던지는 것을 보고, 이번 프로젝트에서는 유지보수성과 타입 안정성이 꼭 필요하다고 생각하여 TypeScript를 프로젝트에 적용해야한다고 판단하고 타입스크립트를 공부하며 프로젝트를 진행하였습니다. 프로젝트를 완성한 지금, 타입스크립트에 대한 이해도가 크게 상승했다는 것을 채감하였습니다.

초기에는 Next.js와 TypeScript에 익숙하지 않아 많은 시행착오를 겪었지만, 시간이 지나면서 이 두 기술의 강점을 체감할 수 있었습니다. 특히, Next.js는 SEO 최적화와 서버 사이드 렌더링(SSR)을 간편하게 구현할 수 있어, 블로그와 같은 프로젝트에 매우 유용하다는 것을 깨달았습니다. 이러한 경험을 통해 Next.js의 강력한 기능들을 충분히 활용할 수 있었습니다.

이미지 최적화 과정에서도 중요한 교훈을 얻었습니다. 처음에는 이미지 품질을 낮추면 유저 경험에 악영향을 미칠 수 있다는 우려가 있었습니다. 하지만, 이미지 용량을 줄이는 방법을 고민하면서 AWS S3와 URL 저장 방식을 도입해 효율적으로 문제를 해결할 수 있었습니다. 이 과정에서, 클라우드 저장소를 활용하는 방법과 데이터베이스 최적화에 대해 많은 것을 배웠습니다.

또한, TinyMCE 텍스트 에디터를 프로젝트에 통합하는 과정은 큰 학습의 기회였습니다. 처음에는 셋팅에서 어려움이 많았지만, 공식 문서를 통해 필요한 기능을 하나씩 구현하며 개발자는 문서를 읽는 능력이 얼마나 중요한지 다시금 깨달았습니다. 이 경험을 통해 더 나은 문제 해결 능력을 기를 수 있었고, 직접 해결해 나가는 과정에서 만족감을 느꼈습니다.

언어 설정은 프로젝트에서 가장 중요한 부분 중 하나라고 생각됩니다. 각 페이지별로 다른 언어를 제공해야 하는 문제를 해결하는 데 많은 시간을 투자했습니다. 서버사이드와 클라이언트사이드에서의 데이터 요청 방식을 적절히 조화시키며, 고정관념을 깨는 시도를 통해 기능을 구현하는 데 성공했습니다. 이러한 과정에서 얻은 교훈은, 항상 유연한 사고와 새로운 접근 방식을 시도하는 것이 중요하다는 점입니다.

이번 프로젝트는 제게 많은 성장을 안겨주었습니다. 특히, Next.js와 TypeScript의 처음 사용으로 인해 많은 도전이 있었지만, 그만큼 배우는 것도 많았습니다. 향후 프로젝트에서는 이 경험을 바탕으로 더 나은 코드를 작성하고, 유지보수성을 고려한 개발을 이어갈 수 있을 것입니다.








  
