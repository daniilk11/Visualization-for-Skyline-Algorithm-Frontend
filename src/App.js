import './App.css';
import 'typeface-poppins';
import  "./form.js"
import HotelSelector from "./form";
import HotelTable from "./table";
import React, { useState } from 'react';

function App() {
    const [currentPage, setCurrentPage] = useState(0);
    const [currentData, setCurrentData] = useState(null); // define state to store data
    const [globalData, setGlobalData] = useState([]); // define state to store data
    const [skylineData, setSkylineData] = useState(null); // define state to store data
    const [dataIsLoading, setDataIsLoading] = useState(false); // define state to store data
    const [shouldClick, setShouldClick] = useState(0); // define state to store data
    const [timings, setTimings] = useState({}); // define state to store data
    const itemsPerPage = 50;



    function changeCurrentPage(currentPage){
        let start = (currentPage - 1) * itemsPerPage;  // bug
        if(currentPage === 0){
            start = 0;
        }
        const end = start + itemsPerPage;
        setCurrentData( globalData.slice(start, end)); // set the new data to state
        console.log(currentPage);
        console.log("currentPage");
        console.log(currentData);
    }

    function onPageChange(pageNumber) {
        if(pageNumber === currentPage) return;
        setCurrentPage(pageNumber);
        changeCurrentPage(pageNumber);
    }

    function handleNewData(globalData) {
        setCurrentData( globalData.slice(0, itemsPerPage)); // set the new data to state
    }

    async function requestData() {
        setDataIsLoading(false);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        try {
            const response = await fetch('http://localhost:3001/getAllData', requestOptions);
            const data = await response.json();
            setGlobalData(data);
            handleNewData(data);
            setDataIsLoading(true);
            return  Math.ceil(data.length / itemsPerPage);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function requestSkyline(requestOptions) {
        if(shouldClick < 1 ){
            setShouldClick(1);
            await  requestData();
        }
        fetch('http://localhost:3001/calculateSkyline', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setSkylineData(data); // pass to table
            });
    }

    async function requestTimeTest(requestOptions) {
        if(shouldClick < 1 ){
            setShouldClick(1);
            await  requestData();
        }
        fetch('http://localhost:3001/getAlgoritmTime', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTimings(data); // pass to table
            });
    }


  return (
      <div >
          <div >
        <h1>Choose right hotel for your vacation</h1>
          </div>
        {/* Create a form for user input  pass call back function to it*/}
            <HotelSelector requestSkyline={requestSkyline}
                           globalData={globalData}
                           // currentData={currentData}// only 50  items that are on page
                           requestTimeTest={requestTimeTest}
                           skyline={skylineData}
                           timings={timings}
                           dataIsLoading={dataIsLoading}
            />
        {/* Display the results in a table */}
            <HotelTable
            data={skylineData ? skylineData : currentData}
            skylineData={skylineData} // delete
            itemsPerPage={itemsPerPage}
            page={currentPage}
            onPageChange={onPageChange}
            requestData={requestData}
            dataIsLoading={dataIsLoading}
            shouldClick={shouldClick}
            setShouldClick={setShouldClick}
            />
      </div>
  );
}

export default App;
