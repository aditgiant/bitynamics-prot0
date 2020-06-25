import React, { Component, useState } from 'react';
import { Redirect } from "react-router-dom";
import '../App.css';

// add later verification if user has made a project before

// if yes,
// 1. directly fill projectID with latest projectID
// 2. directly fill redirect with redirect

// if no,
// 1. create a new project with new projectID
// 2. fill projectID with new projectID
// 3. fill fill redirect with redirect

// temporary random pick one projectID

function Home () {
    const [projectID, setProjectID]= useState('QEBkUkkHYC0EE5sxqUxC')
    const [redirect, setRedirect]= useState(true)
    return (
        <Redirect to={`/project/${projectID}`} />
    )}

export default Home;