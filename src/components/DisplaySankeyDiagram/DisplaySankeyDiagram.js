import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import "./DisplaySankeyDiagram.css";

const DisplaySankeyDiagram = () => {
  const { t } = useTranslation();

  const rows = useSelector((state) => state.rows.rows);
  React.useEffect(() => {
    am4core.useTheme(am4themes_animated);
    // Themes end
    var chart = am4core.create("chartdiv", am4charts.SankeyDiagram);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = rows;

    let hoverState = chart.links.template.states.create("hover");
    hoverState.properties.fillOpacity = 0.6;

    chart.dataFields.fromName = "inflow";
    chart.dataFields.toName = "outflow";
    chart.dataFields.value = "value";

    // for right-most label to fit
    chart.paddingRight = 120;

    // make nodes draggable
    var nodeTemplate = chart.nodes.template;
    nodeTemplate.inert = true;
    nodeTemplate.readerTitle = "Drag me!";
    nodeTemplate.showSystemTooltip = true;
    nodeTemplate.width = 20;

    // make nodes draggable
    var nodeTemplate = chart.nodes.template;
    nodeTemplate.readerTitle = "Click to show/hide or drag to rearrange";
    nodeTemplate.showSystemTooltip = true;
    nodeTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;

    return () => {
      chart.dispose();
    };
  });

  return (
    <div className="container sankey-diagram-container">
      <h2> {t("Sankey_Diagram")}</h2>
      <div id="chartdiv" className="chart-display-container"></div>
    </div>
  );
};

export default DisplaySankeyDiagram;
