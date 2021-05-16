import React from "react";
import { useTranslation } from 'react-i18next';

import DisplaySankeyDiagram from "../DisplaySankeyDiagram/DisplaySankeyDiagram";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import TableComponent from "../TableComponent/TableComponent";

import "../../styles/styles.css"

const createData = (item) => ({
    inflow: item.inflow,
    outflow: item.outflow,
    value: item.value,
  });

const MainPageContainer = () => {
  return (
    <div>
      <div>
        <HeaderComponent />
        <div className="p-24 main-page-content-container">
          <DisplaySankeyDiagram />
          <TableComponent />
        </div>       
      </div>
    </div>
  )
}

export default MainPageContainer;