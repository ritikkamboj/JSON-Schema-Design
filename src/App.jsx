import React from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
// https://www.jsonschemavalidator.net/
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
      }

    }
   
  },
  "required": ["directors","gstin","BusinessName"]
}

//Loan Schema 
const loanSchema ={
  "title": "Loan Details",
  "type":"object",
  "properties":{
    "creditScore":{
      "type":"integer",
      "title":"Credit Score",
     },
     "loanAmount":{
      "type" : "number",
      "title": "Loan Amount",
      "minimum":50000,
      "maximum":500000
  },
  "gurantors":{
    "type": "array",
    "title": "Gurantors",
    "items":{
      "type": "object",
      "properties":{
        "name": {
          "type": "string",
          "title": "Gurantor's Name"
        },
        "panNumber":{
          "type": "string",
          "title": "PAN Number"
        },
        "relationship":{
          "type": "string",
          "title": "Relationship With Applicants",
          "enum": [
            "Father", "Mother", "Brother", "Sister","Spouse","other"
          ]
        },
        "relation":{
          "type": "string",
          "title": "Specify Relation (If Other)",
          "description": ""
        }


      },
      "required": ["name", "panNumber", "relationship"]
    }

  }

}


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
