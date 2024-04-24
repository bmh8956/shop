package com.shop.back.member.controller;

import com.shop.back.jwt.JwtTokenUtil;
import com.shop.back.member.dto.param.MemberUpdateRequest;
import com.shop.back.member.dto.request.JoinRequest;
import com.shop.back.member.dto.request.LoginRequest;
import com.shop.back.member.dto.response.JoinResponse;
import com.shop.back.member.dto.response.LoginResponse;
import com.shop.back.member.entity.Member;
import com.shop.back.member.exception.MemberException;
import com.shop.back.member.repository.MemberRepository;
import com.shop.back.member.service.MemberService;
import com.shop.back.security.WebSecurityConfig;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import oracle.jdbc.proxy.annotation.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService service;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private BCryptPasswordEncoder encodePassword;

    @GetMapping
    public ResponseEntity<?> checkEmailDuplicate(@RequestParam("email") String email) {
        System.out.println("이메일 중복 요청 성공: " + email);
        System.out.println("MemberController checkEmailDuplicate " + new Date());

        HttpStatus status = service.checkEmailDuplicate(email);
        return new ResponseEntity<>(status);
    }

    //회원가입
    @PostMapping("/join")
    public ResponseEntity<JoinResponse> join(@Valid @RequestBody JoinRequest req) {
        System.out.println("MemberController join " + new Date());

        return ResponseEntity.ok(service.join(req));
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest req) {
    	
        System.out.println("MemberController login " + new Date());
        
        return ResponseEntity.ok(service.login(req));
    }

    //정보 수정
    @PutMapping("/{id}")
    public ResponseEntity<String> updateMember(@PathVariable Long id, @RequestBody MemberUpdateRequest req, @RequestHeader("Authorization") String token) {
        // JWT 토큰에서 사용자 이름을 추출
        String username = jwtTokenUtil.getUsernameFromToken(token.substring(7));

        // 사용자의 존재 여부 확인
        Member member = memberRepository.findByEmail(username);
        if (member == null) {
            return new ResponseEntity<>("사용자를 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        }

        // 정보 수정 권한 확인
        if (!member.getId().equals(id)) {
            return new ResponseEntity<>("해당 사용자의 정보를 수정할 수 있는 권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        // 기존 비밀번호 확인
        if (!encodePassword.matches(req.getCurrentPwd(), member.getPwd())) {
            return new ResponseEntity<>("기존 비밀번호가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        }

        // 회원 정보 수정
        boolean update = service.updateMember(id, req.getNickname(), req.getPwd(), req.getBirth());
        if (update) {
            return new ResponseEntity<>("정보 수정이 완료되었습니다.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("정보 수정을 실패하였습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




    //요청 DTO 검증 예외처리 핸들러
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        System.out.println("MemberController handleMethodArgumentNotValidException " + new Date());

        BindingResult bs = e.getBindingResult();
        StringBuilder sb = new StringBuilder();
        bs.getFieldErrors().forEach(err -> {
            sb.append(String.format("[%s]: %s.\n입력된 값: %s",
                    err.getField(), err.getDefaultMessage(), err.getRejectedValue()));
        });

        return new ResponseEntity<>(sb.toString(), HttpStatus.BAD_REQUEST);

    }

    //사용자 관련 요청 예외처리 핸들러
    @ExceptionHandler(MemberException.class)
    public ResponseEntity<?> handleUserException(MemberException e) {
        System.out.println("UserController handlerUserException " + new Date());

        return new ResponseEntity<>(e.getMessage(), e.getStatus());
    }
}
