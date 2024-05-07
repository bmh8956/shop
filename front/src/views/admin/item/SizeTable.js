import React, {useEffect, useState} from 'react';
import {
  CButton,
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/react";

function SizeTable({data}) {
  const [row, setRow] = useState([1]);
  const [col, setCol] = useState([1]);
  const [info, setInfo] = useState([])

  const addRight = () => {
    if(col.length === 6) {
      alert("6개까지만 가능합니다.")
      return
    }
    let arr = []
    for (const c of col) {
      arr.push(c)
    }
    arr.push(col[col.length - 1] + 1)
    setCol(arr)
  }

  const addBottom = () => {
    let arr = []
    for (const r of row) {
      arr.push(r)
    }
    arr.push(row[row.length - 1] + 1)
    setRow(arr)
  }

  useEffect(() => {
    if(data) {
      const val = JSON.parse(data)
      const r = 0
      const c = 0
      const ar = []
      const ac = []
      for(const v in val) {
        ar.push(Number(v) + 1)
      }
      for(const v in val[1]) {
        ac.push(Number(v))
      }
      setRow(ar)
      setCol(ac)
      setInfo(val)
    }
  }, [data]);

  return (
    <CTable hover>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col" width={'10%'}>#</CTableHeaderCell>
          {
            col.map((it, index) => (
              index < col.length - 1 &&
              <CTableHeaderCell scope="col" width={'15%'} key={index}>
                <CFormInput placeholder={'기준'} id={0 + '-' + (it)} data-row={0} data-col={it} defaultValue={info.length ? info[0][index].value : ''} />
              </CTableHeaderCell>
            ))
          }
          <CTableHeaderCell>
            <CButton color={'primary'} onClick={addRight}>+</CButton>
          </CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {
          row.map((it, index) => (
            index < row.length - 1 &&
            <CTableRow key={index}>
              <CTableDataCell active>
                <CFormInput placeholder={'사이즈'} id={(it) + '-0'}
                            data-row={it}
                            data-col={0}
                            defaultValue={info.length ? info[index + 1][0].value : ''} />
              </CTableDataCell>
              {
                col.map((c, cIndex) => (
                  cIndex < col.length - 1 &&
                  <CTableDataCell key={cIndex}>
                    <CFormInput placeholder={String(it) + '-' + Number(cIndex + 1)}
                                id={String(it) + '-' + Number(cIndex + 1)}
                                data-row={it}
                                data-col={cIndex + 1}
                                defaultValue={info.length ? info[it][cIndex + 1].value : ''} />
                  </CTableDataCell>
                ))
              }
            </CTableRow>
          ))
        }
        <CTableRow>
          <CTableDataCell>
            <CButton color={'primary'} onClick={addBottom}>+</CButton>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  );
}

export default SizeTable;
