/*
Project: Hiring Portal Project
Author: Harshini C
Date: 25/03/2024
Sprint: Sprint 1

Modification Log:
-------------------------------------------------------------------------------------------------------
Date        |   Author                  | Sprint   | Description 
-------------------------------------------------------------------------------------------------------
17/4/2024   |   hs                      | 2        | Add New Candidate
22/4/2024   |   hs                      | 3        | Add New Candidate validations
06/05/2024  |   Harshini C              | 4        | View Candidates applied in
7/5/2024    | HS                        | 4        | Resume Handling
-------------------------------------------------------------------------------------------------------
*/

const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "first name is required"],
    },
    lastName: {
        type: String,
        required: [true, "last name is required"],
    },
    emailAddress: {
        type: String,
        required: [true, "email address is required"],
        unique: true,
    },
    mobileNumber: {
        type: Number,
        required: [true, "mobile number is required"],
        unique: true,
    },
    skillSet: {
        type: String,
        enum : ['Guidewire BA (PC)','Guidewire BA (BC)','Guidewire BA (CC)','Guidewire QA (PC)','Guidewire QA (BC)','Guidewire QA (CC)','Guidewire DEV (PC)','Guidewire DEV (BC)','Guidewire DEV (CC)','Guidewire Lead (CC)',
        'Guidewire Lead (PC)','Guidewire Lead (BC)','Buisness Analyst','Technical Specialist','Guidewire Integration Developer','Guidewire Architect','Guidewire QA','Guidewire Portal','Guidewire Datahub','Guidewire Infocentre',
        'Recruitment Executive','Business Development Executive','Guidewire Backend Developer','Duckcreek Developer','Coldfusion Developer','Oneshield Designer','Digital Marketing Executive','Mulesoft Developer','Scrum Master',
        'Project Leader','Oneshield BA','Oneshield QA'],
        required: true,  // Dropdown list to choose from
    },
    // otherSkillSet: {
    //     type: String,  // input field to add candidate's skills set that are not avaiable in dropdown options
    //     default: "" // Optional: Set an empty string as default
    // },
    itExperience: {
        type: Number,
        required: [true, "experience is required"],
        
    },
    totalRelevantExperience: {
        type: Number,
        required: [true, "total relevant experience is required"],
        
    },
    currentCompany: {
        type: String,
        required: true
    },
    currentCTC: {
        type: Number,
        required: [true, "current CTC is required"],
        
    },
    expectedCTC: {
        type: Number,
        required: [true, "expected CTC is required"],
       
    }, 
    noticePeriod: {
        type: Number,
        required: [true, "notice period is required"],
        
    },
    servingNoticePeriod: {
        type: Boolean,
        required: [true, "serving notice period is required"],
        
    },
    lastWorkingDay: {
        type: String,
        // required: [true, "last working date is required"],
        
    },
    status: {
        type: String,
        enum : ['Submitted','Cleared 1st Round','Cleared 2nd Round','Offer Issued','On-Hold','Rejected','Candidate Not Interested'],
        default: "Submitted",
        required: true
    },
    certified: {
        type: Boolean,
        required: true
    },
    comments: {
        type: String,
        default: "" // Optional: Set an empty string as default
    },
    resume: { 
        type: String, 
        ref: 'Resume' // Indication if resume is uploaded
    }, 
    enteredYear: { 
        type: String, 
        default: new Date().getFullYear()  
    }, 
    enteredMonth: { 
        type: String, 
        default: new Date().getMonth()+1  
    }, 
    fileId: { 
        type: String, 
        ref: 'fs.field'
    },
 
} , {timestamps: true});

// intializing 
module.exports = mongoose.model('Candidates', candidateSchema)   
