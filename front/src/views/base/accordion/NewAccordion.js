
import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import '../../../scss/newAccordion.css'; 
import axios from 'axios';


const handleClick = (itemId) => {
  const itemDTO = {
      itemId: itemId,
      quantity: 1
  };

  axios.post("http://localhost:3011/cart/add", itemDTO)
    .then((resp) => {
      console.log("Item added to cart successfully");
    }).catch((err) => {
      console.log("Error adding item to cart:", err);
    });
};


const Accordion = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
      {/*     <CCardHeader>
            <strong></strong>
          </CCardHeader> */}
{/*           <CCardBody>
            <p className="text-body-secondary small">
            나의 쇼핑활동
            </p>
            <DocsExample href="components/accordion">
              <CAccordion activeItemKey={2}>
                <CAccordionItem itemKey={1}>
                  <CAccordionHeader>주문내역조회</CAccordionHeader>
                  <CAccordionBody>
  

</CAccordionBody>

</CAccordionItem>
                    
              </CAccordion>
            </DocsExample>
          </CCardBody> */}
        </CCard>

         <CCard className="mb-4">
          <CCardHeader>
            <strong>나의 쇼핑활동</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
            </p>
            <DocsExample href="components/accordion#flush">
              <CAccordion flush>
                <CAccordionItem itemKey={1}>
                  <CAccordionHeader>
                    장바구니
                  </CAccordionHeader>
                <CAccordionBody>
            

             <div className="ordertable">
             <input type="checkbox" id="checkall" onclick="checkAll()"/>
             <span>상품정보</span>
             <span>수량</span>
             <span>상품금액</span>
             </div>

            <div class = "noncart">
            <h7>장바구니에 담긴 상품이 없습니다.</h7>
           </div>
</CAccordionBody>

                </CAccordionItem>
                <CAccordionItem itemKey={2}>
                  <CAccordionHeader>주문내역</CAccordionHeader>
                  <CAccordionBody>
                    <strong>This is the second item&#39;s accordion body.</strong> It is hidden by
                    default, until the collapse plugin adds the appropriate classes that we use to
                    style each element. These classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any of this with custom
                    CSS or overriding our default variables. It&#39;s also worth noting that just
                    about any HTML can go within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={3}>
                  <CAccordionHeader>정보수정</CAccordionHeader>
                  <CAccordionBody>
                    <strong>This is the second item&#39;s accordion body.</strong> It is hidden by
                    default, until the collapse plugin adds the appropriate classes that we use to
                    style each element. These classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any of this with custom
                    CSS or overriding our default variables. It&#39;s also worth noting that just
                    about any HTML can go within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
            </DocsExample>
          </CCardBody>
        </CCard>
        
      </CCol>
    </CRow>
  )
}

export default Accordion
