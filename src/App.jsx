import React from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";

// JSON
const schema = {
  title: "Loan Application jai shree ram ",
  type: "object",
  properties: {
    businessName: {
      type: "string",
      title: "Business Name",
    },
    gstin: {
      type: "string",
      title: "GSTIN (15 Characters)",
      pattern: "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$",
    },
    loanAmount: {
      type: "number",
      title: "Loan Amount",
      minimum: 50000,
      maximum: 500000,
    },
  },
  required: ["businessName", "gstin", "loanAmount"],
};

const businessSchema = {
  type: "Object",
  title: "Business Details",
  properties: {},
};

// UI Customization (optional)
const uiSchema = {
  loanAmount: {
    "ui:widget": "range",
  },
};

// Form Submission Handler
const onSubmit = ({ formData }) => {
  console.log("Form submitted with data:", formData);
  alert("Form Submitted! Check the console for data.");
};

const App = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Loan Application Form</h1>
      <Form
        schema={schema}
        // uiSchema={uiSchema}
        onSubmit={onSubmit}
        validator={validator}
      />
    </div>
  );
};

export default App;
