yarn add @tinymce/tinymce-react


yarn add @fortawesome/fontawesome-svg-core --save-dev

yarn add @fortawesome/free-solid-svg-icons --save-dev

yarn add @fortawesome/react-fontawesome --save-dev

yarn add @fortawesome/free-brands-svg-icons --save-dev

yarn add @fortawesome/free-regular-svg-icons --save-dev




# Bulletin Board System
`쇼핑몰` 웹 애플리케이션 프로젝트 입니다. <br/><br/>


# 📚 목차
* [사용 기술](#-사용-기술)
* [구현 기능](#-구현-기능)
* [API 명세서](#-API-명세서)
* [ERD 설계](#-ERD-설계)


# 🕹 사용 기술
### 📌 Backend
|기술|
|----|
|Spring Boot|
|Spring Security|
|Bean Validation|
|JSON Web Token|
|Jpa|
|MySQL Connector J|
|Swagger|

### 🥕 Frontend
|기술|
|----|
|NodeJS|
|React
|axios|
|react-axios|
|react-dom|
|react-js-pagination|
|react-router|
|react-router-dom|
|react-scripts|

# 🎢 구현 기능
* 상품
  * 카테고리
  * 색상
  * 상품 등록
  * 장바구니
  * 좋아요
  * 결제
* 회원 기능
  * 회원가입
  * 로그인/로그아웃
  

## 상품
### 카테고리
* 카테고리는 1~2차 카테고리로 구성.
* 권한이 관리자인 회원만 등록 가능.


### 색상
* 상품의 색상을 관리자에서 등록.
* 색상명, RGB는 유니크키로 중복불가.


### 상품등록
* 상품은 상품그룹(리스트에 노출) 상품(옵션별)로 구성
* 각각의 상품은 사이즈, 색상 옵션가 등 설정가능


### 장바구니
* 상품 상세 페이지에서 선택해놓은 옵션이 저장.
* 장바구니 페이지에서 수량 수정가능 && 수정하면 저장.

### 좋아요
* 좋아요 아이콘을 클릭하면 아이템 그룹이 저장 && 그룹이 저장됨으로 아이템 옵션 등의 정보가 없음.


### 결제
* 상품상세 페이지에서 바로구매 버튼 혹은 장바구니에서 구매.
* 수량이 수정 가능하고 수정했어도 저장x(새로고침하면 원래대로)
* 결제는 카카오페이
* 결제완료하면 주문내역에는 주문 건별 상품별로 출력

## 회원기능
### 회원가입
* 이메일, 비밀번호, 이름, 닉네임, 생년월일, 성별 입력
* 추후 추천상품의 기준이 되는 정보
* 상품을 보는 것 외에는 모든 기능이 회원만 가능
* 회원가입 시 아이디 중복을 체크합니다.
* 회원가입을 통해 서비스에 사용자 정보를 저장합니다.


### 로그인/로그아웃
* 로그인
  * 로그인을 완료하면 브라우저의 `Local Storage` 에 사용자 `email` 와 `JWT` 토큰 정보를 저장합니다.
* 로그아웃
* 로그아웃을 완료하면 브라우저의 `Local Storage` 의 내용도 삭제합니다.

# 🤙🏻 API 명세서
HTTP 메서드를 통해 행위를 명시할 수 있도록 RESTful 방식으로 설계했습니다. <br/><br/>



