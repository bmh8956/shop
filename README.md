https://github.com/coreui/coreui-free-react-admin-template
coreui 사용


//  오류 발생시 추가
yarn add @tinymce/tinymce-react

yarn add @fortawesome/fontawesome-svg-core --save-dev

yarn add @fortawesome/free-solid-svg-icons --save-dev

yarn add @fortawesome/react-fontawesome --save-dev

yarn add @fortawesome/free-brands-svg-icons --save-dev

yarn add @fortawesome/free-regular-svg-icons --save-dev

Bulletin Board System
게시판 웹 애플리케이션 프로젝트 입니다.


📚 목차
사용 기술
구현 기능
API 명세서
ERD 설계
🕹 사용 기술
📌 Backend
기술	버전
Spring Boot	2.7.2
Spring Security	2.7.2
Bean Validation	2.7.2
JSON Web Token	0.9.1
MyBatis	2.1.3
MySQL Connector J	8.0.28
Swagger	3.0.0
🥕 Frontend
기술	버전
NodeJS	16.16.0
React	18.2.0
axios	0.27.2
react-axios	2.0.6
react-dom	18.2.0
react-js-pagination	3.0.3
react-router	6.3.0
react-router-dom	6.3.0
react-scripts	5.0.1
🎢 구현 기능
게시판 기능
모든 게시글 및 특정 게시글 조회
게시글 검색 (제목, 내용, 작성자)
게시글 작성 [회원]
게시글 수정 [회원, 게시글 작성자]
게시글 삭제 [회원, 게시글 작성자]
게시글 답글 작성 [회원]
댓글 기능
댓글 조회
댓글 작성 [회원]
댓글 수정 [회원, 댓글 작성자]
댓글 삭제 [회원, 댓글 작성자]
회원 기능
회원가입
로그인/로그아웃
게시판 기능
모든 게시글 및 특정 게시글 조회
모든 게시글을 조회할 수 있습니다. 페이징 기능을 통해 한 페이지에서 최대 10개의 게시글이 조회됩니다.
게시글의 제목을 클릭하면, 게시글의 상세 내용을 조회할 수 있습니다.
게시글 검색
게시글의 제목과 내용 또는 작성자로 게시글을 검색할 수 있습니다.
게시글 작성
로그인한 사용자는 게시글을 작성할 수 있습니다.

로그인하지 않았을 경우 글 작성이 제한됩니다.

게시글 수정
게시글 작성자는 게시글을 수정할 수 있습니다.
자신이 작성한 게시글에만 수정, 삭제 버튼이 활성화됩니다.
게시글 삭제
게시글 작성자는 게시글을 삭제할 수 있습니다.
게시글 답글 작성
하나의 게시글에 대한 답글을 작성할 수 있습니다. 게시글 작성 과 마찬가지로 로그인한 사용자만 답글을 작성할 수 있습니다.
댓글 기능
댓글 조회
게시글 상세 에서 관련된 댓글을 조회할 수 있습니다. 페이징 기능을 통해 한 페이지에서 최대 5개의 댓글이 조회됩니다.
댓글 작성
로그인한 사용자는 댓글을 작성할 수 있습니다.
댓글 수정
자신이 작성한 댓글을 수정할 수 있습니다.
댓글 삭제
자신이 작성한 댓글을 삭제할 수 있습니다.
회원 기능
회원가입
회원가입 시 아이디 중복을 체크합니다.

회원가입을 통해 서비스에 사용자 정보를 저장합니다.

로그인/로그아웃
로그인

로그인을 완료하면 브라우저의 Local Storage 에 사용자 id 와 JWT 토큰 정보를 저장합니다.
로그아웃

로그아웃을 완료하면 브라우저의 Local Storage 의 내용도 삭제합니다.

🤙🏻 API 명세서
HTTP 메서드를 통해 행위를 명시할 수 있도록 RESTful 방식으로 설계했습니다.


🕸 ERD 설계
👾 트러블슈팅
회원 인증 및 인가 기능 구현 (Spring Security + JWT)
회원 및 비회원에 따라 가용한 기능에 제약을 두기 위해 Spring Security + JWT 토큰 방식으로 구현했다.

요청을 보낸 사용자를 판별하기 위해 @AuthenticationPrincipal 을 사용하여, 로그인 시 인증한 후 저장한 사용자 정보인 UserDetails 의 username(Id) 를 가져와 글 작성자와 비교했다.




사용자 로그인 요청 데이터 검증과 사용자 인증 예외 처리
사용자가 회원가입과 로그인을 위해 입력한 데이터에 대해 Bean Validation 을 사용해 검증 기능을 구현했다.

Bean Validation 에서 던진 예외를 받아서 처리한 다음 오류 메시지를 응답으로 내려주도록 구현했다.

회원가입 요청 폼 데이터

회원 가입 요청 처리 컨트롤러




조회수 중복 카운팅 예방
게시글 조회수 중복 카운팅 예방을 위해 read_history 테이블을 두어 구현했다.

Cookie 의 경우 하나의 도메인 당 사용할 수 있는 개수가 제한되기 때문에, 여러 게시글을 조회하면 제한 개수를 넘어버릴 것이라 예상했다. 그래서 사용자가 이미 읽은 게시글인지 확인할 수 있도록 서버에서 사용자 아이디 게시글 조회 시간 을 두어 체크했다.
