import React, {useEffect, useState} from 'react';
import {Button, Table} from 'react-bootstrap';
import { useTable } from 'react-table';
import styles from './Table.module.css'
import Loader from './assets/loader2.gif';



function HotelTable({data,skylineData, itemsPerPage,page, onPageChange, requestData,dataIsLoading,shouldClick,setShouldClick}) {
    const [currentPage, setCurrentPage] = useState(1);
    // const [dataIsLoading, setDataIsLoading] = useState(false);
    const [buttonStates, setButtonStates] = useState([]);
    const [lastPageInPaginator, setLastPage] = useState(0);
    const [maxPage, setMaxPage] = useState(0);

    const RenderTableData = () => {
        return data.map((row, index) => {
            return (
                <tr key={index}>
                {Object.values(row).map(value => (
                <td >{value}</td> ))}
                </tr>

            );
        });
    };

    function generateArray(startNumber, length) {
        const myArray = [];
        for (let i = 0; i < length; i++) {
            const number = startNumber + i;
            myArray.push([number, false]);
        }
        return myArray;
    }

    const handlePaginatorClick =  (number) => {
        if( lastPageInPaginator > maxPage){ // dont set active state
            return
        }

        if( number === lastPageInPaginator-1){
            number = lastPageInPaginator-1
            let  tmp = maxPage - (lastPageInPaginator - 1)
            if(tmp > 10){
                tmp =10;
            }
            setButtonStates(generateArray(lastPageInPaginator-1, tmp ))
            setLastPage(tmp);
        }
        else {
            let res =generateArray(buttonStates[0][0], lastPageInPaginator );
            res[number][1] = true;
            setButtonStates(res)

        }
        setCurrentPage(number);
        onPageChange(number);

        // else if( lastPageInPaginator ){ // dont set active state
        //     return
        // }
    };

    async function handleClick()  {
            // setDataIsLoading(false);
            let res = await requestData();
            setMaxPage(res);
            // setDataIsLoading(true);// Paginator size
            if(res >= 10){
                res = 10;
            }
            setLastPage(res);
            setButtonStates(generateArray(0, res))
    }

    if(shouldClick === 1 ){
        handleClick();
        setShouldClick(2);
    }

    return (
            <div className={styles.container}>
                { dataIsLoading ? (
                 <div className={styles.tableDiv}>
                    <div className={styles.paginatorMain}>
                        <ul className={styles.pagination}>
                            {buttonStates.map((isActive, number) => (
                                <li key={number === 0 ? 'previous' : (number === buttonStates.length - 1 ? 'next' : number )}>
                                    <a
                                        className={isActive[1] ? styles.active : ''}
                                        onClick={() => handlePaginatorClick(number === 0 ? 0 : (number === buttonStates.length ? buttonStates[number-1][0] : number))}
                                        href="#"
                                    >
                                        {number === 0 ? 'Previous' : (number === buttonStates.length - 1 ? 'Next' : number )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div >
                    <div >
                        <Table  className={styles.table}>
                                <thead>
                                <tr>
                                    {Object.keys(data[0]).map(columnName =>
                                        (
                                        <th key={columnName}>{columnName}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody><RenderTableData/></tbody>
                        </Table>
                    </div >
                </div>
                    ) : (
                        <div className={styles.loader}>
                        <button className={styles.loaderButton}
                        onClick={handleClick}>
                        Get Data
                        </button>
                        </div>
                    )
                }

            </div>
        );
}

export default HotelTable;