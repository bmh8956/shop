package com.shop.back.member.controller;

import com.shop.back.Role;
import com.shop.back.member.dto.request.AdminMemberUpdateRequest;
import com.shop.back.member.entity.Member;
import com.shop.back.member.repository.MemberRepository;
import com.shop.back.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminMemberController {

    private final MemberService service;
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;


    // 회원 조회
    @GetMapping("/{id}")
    public ResponseEntity<Member> getMemberById(@PathVariable Long id) {
        Optional<Member> optionalMember = memberRepository.findById(id);
        if (optionalMember.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Member member = optionalMember.get();
        return ResponseEntity.ok(member);
    }

    //USER 리스트
    @GetMapping("/userList")
    public ResponseEntity<List<Member>> userList() {
        List<Member> userList = service.getMemberbyRole(Role.USER);
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    //USER 수정
    @PutMapping("/userDetail/{id}")
    public ResponseEntity<Member> updateUser(@PathVariable Long id, @RequestBody AdminMemberUpdateRequest req) {
        return updateMember(id, req);
    }

    //USER 검색

    //ADMIN 리스트
    @GetMapping("/adminList")
    public ResponseEntity<List<Member>> adminList() {
        List<Member> adminList = service.getMemberbyRole(Role.ADMIN);
        System.out.println("adminList: " + adminList);
        return new ResponseEntity<>(adminList, HttpStatus.OK);
    }

    //ADMIN 수정
    @PutMapping("/adminDetail/{id}")
    public ResponseEntity<Member> updateAdmin(@PathVariable Long id, @RequestBody AdminMemberUpdateRequest req) {
        return updateMember(id, req);
    }

    //ADMIN 검색

    //UNREGISTER 리스트
    @GetMapping("/unregisterList")
    public ResponseEntity<List<Member>> unregisterList() {
        List<Member> unregisterList = service.getMemberbyRole(Role.UNREGISTER);
        return new ResponseEntity<>(unregisterList, HttpStatus.OK);
    }

    //UNREGISTER 수정
    @PutMapping("/unregisterDetail/{id}")
    public ResponseEntity<Member> updateUnregister(@PathVariable Long id, @RequestBody AdminMemberUpdateRequest req) {
        return updateMember(id, req);
    }

    //UNREGISTER 검색

    //MemberUpdate
    private ResponseEntity<Member> updateMember(Long id, AdminMemberUpdateRequest req) {
        Optional<Member> optionalMember = memberRepository.findById(id);
        if (optionalMember.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Member member = optionalMember.get();
        // 수정된 비밀번호를 BCrypt 알고리즘을 사용하여 해싱
        String hashedPassword = passwordEncoder.encode(req.getPwd());

        member.setPwd(hashedPassword);
        member.setName(req.getName());
        member.setNickname(req.getNickname());
        member.setPhone(req.getPhone());
        member.setGender(req.getGender());
        member.setBirth(req.getBirth());
        member.setRole(req.getRole());
        member.setAddress(req.getAddress());

        memberRepository.save(member);

        System.out.println("수정 후 비밀번호: " + req.getPwd());
        System.out.println("수정 후 이름: " + req.getName());
        System.out.println("수정 후 닉네임: " + req.getNickname());
        System.out.println("수정 후 전화번호: " + req.getPhone());
        System.out.println("수정 후 성별: " + req.getGender());
        System.out.println("수정 후 생년월일: " + req.getBirth());
        System.out.println("수정 후 권한: " + req.getRole());
        System.out.println("수정 후 주소: " + req.getAddress());


        return ResponseEntity.ok(member);
    }
}
