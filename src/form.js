import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from "./Form.module.css";
import ScatterChart from "./ScatterChart";
import TimingResultChart from "./TimingResultChart";

function HotelSelector(props) {
    const [firstSelecter, setFirstSelecter] = useState('stars');
    const [secondSelecter, setSecondSelecter] = useState('price');
    const [algSelecter, setAlgSelecter] = useState('time_test');
    const [isInverted1, setIsInverted1] = useState(false);
    const [isInverted2, setIsInverted2] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [chartData, setChartData] = useState(null);
    const [showTiming, setshowTiming] = useState(false);


    const handle1CheckboxChange = (event) => {
        setIsInverted1(event.target.checked);
        console.log(' WORK CHECK BOX') // work without submit

    };

    const handle2CheckboxChange = (event) => {
        setIsInverted2(event.target.checked);
        console.log(' WORK CHECK BOX') // work without submit

    };

    // Send a request to the back-end API with the user's input
    const handleSubmit = async (event) => {
        event.preventDefault();
        if( secondSelecter === firstSelecter ) {
            alert("Please select different parameters for search");
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                secondSelecter: secondSelecter,
                firstSelecter: firstSelecter,
                isInverted1: isInverted1,
                isInverted2: isInverted2,
                algorithm: algSelecter
            })
        };
        if(algSelecter === 'time_test'){
            await props.requestTimeTest(requestOptions); // pass to table
            setshowTiming(true);
            return;
        }
        await props.requestSkyline(requestOptions); // pass to table
        setChartData(props.globalData); // pass to chart
        // setChartData(props.skyline);
        setshowTiming(false);
        setSubmitted(true);
    };

    return (
        <div className={(chartData || showTiming) ? styles.containerWithChart : styles.container}>
            <Form  onSubmit={handleSubmit}>
                <div className={styles.selectors} >
                    <div className={styles.labelSelector}>
                            <Form.Label >Select first parameter</Form.Label>
                            <Form.Check
                                className={styles.checkBox}
                                type="checkbox"
                                label="Low to high"
                                checked={isInverted1}
                                onChange={handle1CheckboxChange}
                                />
                    </div>
                    <Form.Control
                            as="select"
                            value={firstSelecter}
                            onChange={(event) => setFirstSelecter(event.target.value)}>
                                    <option value="stars">stars</option>
                                    <option value="price">price</option>
                                    <option value="distance_to_beach">distance to beach</option>
                                    <option value="distance_to_center">distance to center</option>
                                    <option value="rating">rating</option>
                    </Form.Control>
                    <div className={styles.labelSelector}  style={{width: `240px`}}>
                            <Form.Label >Select second parameter</Form.Label>
                            <Form.Check
                                        className={styles.checkBox}
                                        type="checkbox"
                                        label="Low to high"
                                        checked={isInverted2}
                                        onChange={handle2CheckboxChange}
                                    />
                    </div>
                    <Form.Control
                            as="select"
                            value={secondSelecter}
                            onChange={(event) => setSecondSelecter(event.target.value)}>
                            <option value="stars">stars</option>
                            <option value="price">price</option>
                            <option value="distance_to_beach">distance to beach</option>
                            <option value="distance_to_center">distance to center</option>
                            <option value="rating">rating</option>
                    </Form.Control>
                    <Form.Label className={styles.labelSelector} style={{width: `155px`}} >Select algorithm</Form.Label>
                    <Form.Control
                        as="select"
                        value={algSelecter}
                        onChange={(event) => setAlgSelecter(event.target.value)}
                        >
                            <option value="conquer">Divide and Conquer</option>
                            <option value="brutForce">Brute Force</option>
                            <option value="blockNested">Block Nested Loop</option>
                            <option value="planeSweep">Plane Sweep</option>
                            <option value="time_test">Test all</option>
                    </Form.Control>
                    <Button variant="primary" type="submit">
                        Search
                    </Button>
                </div>
            </Form>
            {!showTiming && submitted && <ScatterChart className={chartData ? styles.HotelChart : styles.HotelChartShow} df={props.globalData }  skylineDF={props.skyline} param1={firstSelecter} param2 ={secondSelecter}  />}
            {showTiming  &&  <TimingResultChart className={styles.HotelChartShow}  results={props.timings}   />}
        </div>
    );
}

export default HotelSelector;