import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
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
import { useState } from "react";
import { useNavigate } from "react-router";

function Join() {
  
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [gender, setgender] = useState("");
	const [birth, setbirth] = useState("");
  const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [checkPwd, setCheckPwd] = useState("");
	
  const navigate = useNavigate();

  const changeid = (event) => {
		setId(event.target.value);
	}

  
  const changeName = (event) => {
		setName(event.target.value);
	}

  const changegender = (event) => {
		setgender(event.target.value);
	}

  const changebirth = (event) => {
		setbirth(event.target.value);
	}

  const changeEmail = (event) => {
		setEmail(event.target.value);
	}

  const changePwd = (event) => {
		setPwd(event.target.value);
	}

  const changecheckPwd = (event) => {
		setCheckPwd(event.target.value);
	}



const join = async() => {
    /* 회원가입 로컬*/
    
    const req = {
      id: id,
      name: name,
      gender: gender,
      birth: birth,
      email: email,
      pwd: pwd,
      checkPwd: checkPwd
    }
    
    await axios.post("http://localhost:3011/user/join", req)
			.then((resp) => {
				console.log("[Join.js] join() success :D");
				console.log(resp.data);

        alert(resp.data.id + "님 회원가입을 축하드립니다 🎊");
				navigate("/login");
    
    }).catch((err) => {
				console.log("[Join.js] join() error :<");
				console.log(err);

				// alert(err.response.data);

				const resp = err.response;
				if (resp.status == 400) {
					alert(resp.data);
				}
			});    
        
   
         /* / 오류날수있음                네트워크 통신  주석처리*/
   




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
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="이름" autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                {/* 성별 입력 */}
                  <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput placeholder="성별" autoComplete="gender" />
              </CInputGroup>
                     {/* 생년월일 입력 */}
                     <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput placeholder="생년월일" autoComplete="birth" />
              </CInputGroup>
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="이메일" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="비밀번호"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="checkpassword"
                      placeholder="비밀번호 확인"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
           

          
                  <div className="d-grid">
                  <CButton color="success" onClick={join}>회원가입</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

}
export default Join;
