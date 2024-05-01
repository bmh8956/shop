import React, {useEffect, useState} from 'react';
import {CCard, CCardBody, CCardHeader, CCardText, CCarousel, CCarouselItem, CCol, CRow} from "@coreui/react";
import {DocsExample} from "src/components";
import ReactImg from "src/assets/images/react.jpg";
import AngularImg from "src/assets/images/angular.jpg";
import VueImg from "src/assets/images/vue.jpg";
import {useParams} from "react-router-dom";
import { freeSet } from '@coreui/icons'
import CIcon from "@coreui/icons-react";
import axios from "axios";
import ItemList from "src/views/user/item/ItemList";

function Items({props}) {
    const [items, setItems] = useState([])

    const img1 = 'https://cf.product-image.s.zigzag.kr/original/d/2024/2/22/202_202402221324280320_79765.gif?width=400&height=400&quality=80&format=jpeg'
    const img2 = 'https://cf.product-image.s.zigzag.kr/original/d/2024/4/12/7416_202404121417300928_37462.gif?width=400&height=400&quality=80&format=jpeg'
    const img3 = 'https://image.msscdn.net/images/plan_w_mobile_img/2024041616370700000006399.jpg'

    const [isBaskHovered, setIsBaskHovered] = useState(false);
    const [isLikeHovered, setIsLikeHovered] = useState(false);

    const overflow_ellipsis = {
        whiteSpace: 'nowrap',       /* 텍스트를 한 줄에 표시합니다. */
        overflow: 'hidden',         /* 넘치는 부분을 숨깁니다. */
        textOverflow: 'ellipsis',   /* 넘치는 부분에 대해 생략 부호를 표시합니다. */
    }

    const addCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const getItems = () => {
        // 테스트
        // let mock = []
        // let mock_idx = 0;
        // while (25 > mock.length) {
        //     mock.push(
        //         {
        //             id: mock_idx,
        //             images: [
        //                 {
        //                     url: img1,
        //                     isMain: 1
        //                 },
        //                 {
        //                     url: img2,
        //                     isMain: 0
        //                 },
        //                 {
        //                     url: img3,
        //                     isMain: 0
        //                 }
        //             ],
        //             name: '상품1',
        //             isDisCounted: (mock.length + 1) % 2,
        //             defaultPrice: 30000,
        //             salePrice: (mock.length + 1) % 2 ? 25000 : 30000,
        //             Like: (mock.length + 1) % 2 % 2,
        //             basket: (mock.length + 1) % 2 % 2
        //         },)
        // }
        // setItems(mock)

      axios.get('http://localhost:3011/item/index').then((res) => {
        setItems(res.data)
        console.log(res.data)
      })

    }

    useEffect(() => {
        getItems()
    }, []);

    const likeIcon = {
        cursor: 'pointer',
    }

    const basketIcon = {
        cursor: 'pointer',
    }

    const toItemDetail = (id) => {
        console.log(id)
    }

    return (
        <>
            <CRow>
                {
                    items.map((it, index) => (
                        <ItemList item={it} key={index} />
                    ))
                }
            </CRow>
        </>
    );
}

export default Items;
