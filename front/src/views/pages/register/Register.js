import React, { useState } from 'react';
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import axios from "axios";
import { useNavigate } from "react-router";

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
       await axios.post("http://localhost:3011/memberTest/MemberCreateTest", req)
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
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="성별" autoComplete="gender" onChange={handleChangeGender} />
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
