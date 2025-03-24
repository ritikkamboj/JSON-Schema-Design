import React, { useState } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
// https://www.jsonschemavalidator.net/
// // JSON
// const schema = {
//   title: "Loan Application",
//   type: "object",
//   properties: {
//     businessName: {
//       type: "string",
//       title: "Business Name",
//     },
//     gstin: {
//       type: "string",
//       title: "GSTIN (15 Characters)",
//       pattern: "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$",
//     },
//     loanAmount: {
//       type: "number",
//       title: "Loan Amount",
//       minimum: 50000,
//       maximum: 500000,
//     },
//   },
//   required: ["businessName", "gstin", "loanAmount"],
// };

const businessSchema = {
  "type": "object",
  "title": "Business Details",
  "properties": {
    "BusinessName": {
       "type": "string",
        "title": "Business Name"
    },
    "gstin":{
      "type":"string",
      "title":"GSTIN (15 characters)",
      "pattern": "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$",
      "description": "GSTIN should be a valid 15-characters"

    },
    "directors":{
      "type":"array",
      "title":"Directors",
      "items":{
        "type":"object",
        "properties":{
          "name": {
            "type":"string",
            "title": "Director's Name"
          },
          "panNumber": {
            "type": "string",
            "title": "PAN Number",
            "pattern": "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
            "description": "Enter here PAN Number"
          },
          "tags":{
            "type": "array",
            "title": "Tags",
            "items" :{
              "type": "string",
              "enum": [
                "Director", "Authorized Signatory"
              ]
            },
            "uniqueItems": true,
            "description": "Choose one or more roles for this director."
          }
         
        },
        "required": ["name","panNumber","tags"]
      },
      "minItems" : 1
    }
   
  },
  "required": ["directors","gstin","BusinessName"]
}

const businessUiSchema = {
  directors: {
    "ui:options": {
      addable: true,
      orderable: true,
      removable: true
    },
    "ui:addButtonText": "Add Director" // Custom Add Button Text
  }
};


//Loan Schema 
const loanSchema ={
  "title": "Loan Details",
  "type": "object",
  "properties": {
    "creditScore": {
      "type": "number",
      "title": "Credit Score"
    },
    "loanAmount": {
      "type": "number",
      "title": "Required Loan Amount",
      "minimum": 50000,
      "maximum": 500000
    },
    "guarantors": {
      "type": "array",
      "title": "Guarantors (Required if Credit Score < 700)",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "title": "Guarantor Name"
          },
          "panNumber": {
            "type": "string",
            "title": "PAN Number",
            "pattern": "^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
          },
          "relationship": {
            "type": "string",
            "title": "Relationship with Applicant",
            "enum": ["Father", "Mother", "Brother", "Sister", "Spouse", "Other"]
          },
          "relation": {
            "type": "string",
            "title": "Specify Relationship (If Other)"
          }
        },
        "required": ["name", "panNumber", "relationship"]
      }
    },
    "bankStatements": {
      "type": "array",
      "title": "Upload Bank Statements",
      "items": {
        "type": "string",
        "format": "data-url"
      }
    }
  },
  "required": ["creditScore", "loanAmount"],
  "dependencies": {
    "creditScore": {
      "oneOf": [
        {
          "properties": {
            "creditScore": { "minimum": 700 }
          }
        },
        {
          "properties": {
            "creditScore": { "maximum": 699 },
            "guarantors": {
              "type": "array",
              "minItems": 2
            },
            "bankStatements": {
              "type": "array"
            }
          },
          "required": ["guarantors", "bankStatements"]
        }
      ]
    },
    "relationship": {
      "oneOf": [
        {
          "properties": {
            "relationship": { "enum": ["Other"] },
            "relation": { "type": "string" }
          },
          "required": ["relation"]
        },
        {
          "properties": {
            "relationship": { "enum": ["Father", "Mother", "Brother", "Sister", "Spouse"] }
          }
        }
      ]
    }
  }
}


// UI Customization (optional)
const loanUiSchema = {
  "loanAmount": {
    "ui:widget": "range",
  },
};

// Form Submission Handler
// const onSubmit = ({ formData }) => {
//   console.log("Form submitted with data:", formData);
//   alert("Form Submitted! Check the console for data.");
// };

const App = ({formData}) => {
  console.log('formData', formData )

  const [formType , setFormType] = useState('businessSchema');
  const [businessType , setBusinessType] = useState({});
  const [loanType , setLoanType] = useState({});

  // const schema = formType === 'businessSchema' ? businessSchema : loanSchema;

  
  const handleSubmit = ({ formData }) => {
    if (formType === "businessSchema") {
      setBusinessType(formData);
      console.log("Business Form Data:", formData);
      alert("Business Form Submitted!");
    } else {
      setLoanType(formData);
      console.log("Loan Form Data:", formData);
      alert("Loan Form Submitted!");
    }
  };
  
  const handleFinalSubmit = () => {
    const combinedData = {
      businessDetails: businessType,
      loanDetails: loanType,
    };
    console.log("Final Combined Data:", combinedData);
    alert("Final Submission Complete! Check console for data.");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Loan Application Form</h1>
     {formType === "businessSchema" ?  <Form
        schema={businessSchema}
        uiSchema={businessUiSchema}
        onSubmit={handleSubmit}
        validator={validator}
      /> :  <Form
      schema={loanSchema}
      uiSchema={loanUiSchema}
      onSubmit={handleSubmit}
      validator={validator}
    />}
      <div>
        <button onClick={()=> setFormType('businessSchema')}>Business Form</button>
        <button onClick={()=> setFormType('loanSchema')}>Loan Form</button>
        {Object.keys(businessType).length > 0 &&
        Object.keys(loanType).length > 0 && (
          <button onClick={handleFinalSubmit}>Submit All Data</button>
        )}
      </div>
     
    </div>
  );
};

export default App;
