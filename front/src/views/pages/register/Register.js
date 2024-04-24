import React, { useState } from 'react';
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import axios from "axios";
import { useNavigate } from "react-router";
import { CFormCheck } from '@coreui/react';
function Join() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const navigate = useNavigate();

  const handleChangeId = (event) => {
    setId(event.target.value);
  }

  const handleChangeName = (event) => {
    setName(event.target.value);
  }

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  }

  const handleChangeBirth = (event) => {
    setBirth(event.target.value);
  }

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  }
  /* 유효성 나중에 확인용 
  // 이메일 유효성 검사 (xx@xxxx.xx)

const isEmail = email => {
    const emailRegex = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
    return emailRegex.test(email);
};

const isEmailValid = isEmail(email); 

// 비밀번호 유효성 검사 (대소문자,숫자,특수문자 포함 8자리 이상)

const isPw = pw => {
    const pwRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return pwRegex.test(pw);
};

const isPwValid = isPw(pw);
  */

  const handleJoin = async () => {
    const req = {
      id: id,
      name: name,
      gender: gender,
      birth: birth,
      email: email,
      pwd: password,
      checkPwd: confirmPassword
    }
    
    /* await axios.post("http://localhost:3011/user/join", req) */
       await axios.post("http://localhost:3011/member/join", req)
      .then((resp) => {
        console.log("[Join.js] join() success :D");
        console.log(resp.data);
        alert(resp.data.id + "님 회원가입을 축하드립니다 🎊");
        navigate("/login");
      }).catch((err) => {
        console.log("[Join.js] join() error :<");
        console.log(err);
        const resp = err.response;
        if (resp.status == 400) {
          alert(resp.data);
        }
      });  
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>회원가입</h1>
                  <p className="text-body-secondary"></p>
                 {/*  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="아이디" autoComplete="userid" onChange={handleChangeId} />
                  </CInputGroup> */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="이름" autoComplete="username" onChange={handleChangeName} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                  
                   {/*  <CFormInput placeholder="성별" autoComplete="gender" onChange={handleChangeGender} /> */}
                   
                   <CFormCheck 
                   inline 
                   type="radio" 
                   name="inlineRadioOptions" 
                   id="inlineCheckbox1" 
                   value="X" 
                   label="선택안함"
                   onChange={(e) => handleChangeGender(e)} // 여기서 handleChangeGender 함수 호출
                   />
                  <CFormCheck 
                   inline 
                   type="radio" 
                   name="inlineRadioOptions" 
                   id="inlineCheckbox2" 
                   value="M" 
                   label="남" 
                   onChange={(e) => handleChangeGender(e)} // 여기서 handleChangeGender 함수 호출
                  />
                  <CFormCheck 
                  inline 
                  type="radio" 
                  name="inlineRadioOptions" 
                  id="inlineCheckbox3" 
                  value="G" 
                  label="여" 
                  onChange={(e) => handleChangeGender(e)} // 여기서 handleChangeGender 함수 호출
                 />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="생년월일" autoComplete="birth" onChange={handleChangeBirth} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="이메일" autoComplete="email" onChange={handleChangeEmail} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="비밀번호"
                      autoComplete="new-password"
                      onChange={handleChangePassword}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="비밀번호 확인"
                      autoComplete="new-password"
                      onChange={handleChangeConfirmPassword}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={handleJoin}>회원가입</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

export default Join;
