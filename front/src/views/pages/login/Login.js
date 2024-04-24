import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../context/AuthProvider"
import { HttpHeadersContext } from "../../../context/HttpHeadersProvider"

/* const Login = () => {
  useEffect(() => {
    const param = {
      test: 'aaa'
    }
    axios.get('http://localhost:3011/test', {params:param}).then(res => {
      console.log(res)
    })
  }, []); */
  function Login() {

    const { auth, setAuth } = useContext(AuthContext);
    const { headers, setHeaders } = useContext(HttpHeadersContext);
  
    const navigate = useNavigate();
  
    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

   /*  원본 
    const changeId = (event) => {
      setId(event.target.value);
    }
    */

    const changeId = (event) => {
      setId(event.target.value);
      // 이메일 형식 유효성 검사
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(event.target.value)) {
        setEmailError('이메일을 입력해주세요.');
      } else {
        setEmailError('');
      }
    };

  /*   const changePwd = (event) => {
      setPwd(event.target.value);
    } */
  
    const changePwd = (event) => {
      setPwd(event.target.value);
      // 비밀번호 유효성 검사
      if (event.target.value.length < 8) {
        setPasswordError('비밀번호는 8자 이상이어야 합니다.');
      } else {
        setPasswordError('');
      }
    };


    const login = async () => {
  
      const req = {
        email: id,
        pwd: pwd
      }
  
      await axios.post("http://localhost:3011/member/test", req)
      .then((resp) => {
        console.log("[Login.js] login() success :D");
        console.log(resp.data);
  
          alert(resp.data.id + "님, 성공적으로 로그인 되었습니다 🔐");
  
          // JWT 토큰 저장
          localStorage.setItem("bbs_access_token", resp.data.jwt);
          localStorage.setItem("id", resp.data.id);
  
          setAuth(resp.data.id); // 사용자 인증 정보(아이디 저장)
          setHeaders({"Authorization": `Bearer ${resp.data.jwt}`}); // 헤더 Authorization 필드 저장
  
          navigate("/bbslist");
        
  
      }).catch((err) => {
        console.log("[Login.js] login() error :<");
        console.log(err);
  
        alert("로그인실패" );
      });
    }
  
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>로그인</h1>
                    <p className="text-body-secondary"></p>
                    <CInputGroup className="mb-3">
  <CInputGroupText>
    <CIcon icon={cilUser} />
  </CInputGroupText>
  <CFormInput
    placeholder="아이디"
    autoComplete="userid"
    value={id}
    onChange={changeId}
    invalid={!!emailError}
  />
   {emailError && <div className="invalid-feedback">{emailError}</div>}
</CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="비밀번호"
                        autoComplete="current-password"
                        value={pwd}
                        onChange={changePwd}
                        invalid={!!passwordError}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                      <CButton type="submit" color="primary" className="px-4" onClick={login}>로그인</CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          ID/PW 찾기
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>회원가입</h2>
                    <p>
                    지금 가입하면 포인트 증정!!
                    </p>
                    <Link to="/register">
                      <CButton type="submit" color="primary" className="mt-3" active tabIndex={-1}>
                        이메일로 가입하기
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );

}
  

export default Login;
