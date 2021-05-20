const mainData = [
  { inflow: "Salary", outflow: "Bills and Finance", value: 1300 },
  { inflow: "Rental", outflow: "Savings", value: 800 },
  { inflow: "Income from shares", outflow: "Investments", value: 600 },
  { inflow: "Bills and Finance", outflow: "Electricity Bill", value: 500 },
  { inflow: "Bills and Finance", outflow: "Mobile Bill", value: 300 },
  { inflow: "Investments", outflow: "Shares", value: 600 },
  { inflow: "Bills and Finance", outflow: "Home loan", value: 500 },
];

const altMainData = [
  { inflow: "Salary", outflow: "Bills and Finance", value: 1200 },
  { inflow: "Rental", outflow: "Savings", value: 800 },
  { inflow: "Income from shares", outflow: "Investments", value: 600 },
  { inflow: "Bills and Finance", outflow: "Electricity Bill", value: 500 },
  { inflow: "Bills and Finance", outflow: "Mobile Bill", value: 300 },
  { inflow: "Investments", outflow: "Shares", value: 400 },
  { inflow: "Bills and Finance", outflow: "Home loan", value: 500 },
];

const headers = ["Inflow", "Outflow", "Value"];

const initialRowState = {
  headers: headers,
  rows: mainData,
  length: mainData.length,
};

export { initialRowState, headers, mainData, altMainData };
