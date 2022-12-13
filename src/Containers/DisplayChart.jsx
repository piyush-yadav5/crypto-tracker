import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../Config/api';
import { CryptoState } from '../CurrencyContext';
import 'chart.js/auto'

import DaySelector from './DaySelector';

const DisplayChart = ({ coin, id }) => {

    const [historicalData, setHistoricalData] = useState();

    const [days, setDays] = useState(1);

    const [loading, setLoading] = useState(false);

    const { currency } = CryptoState();

    const [buttonSelected, setButtonSelected] = useState(1);

    useEffect(() => {
        const fetchHistoricalData = async () => {
            setLoading(true);
            const { data } = await axios.get(HistoricalChart(id, days, currency));
            setHistoricalData(data.prices);
            setLoading(false);
        }
        fetchHistoricalData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [days])

    const setDaysHandler = (day) =>{
        setDays(day);
        setButtonSelected(day);
    }

    return (
        <div className="lg:w-3/4 flex flex-col items-center justify-center lg:mt-7 p-10 max-md:w-full max-md:p-2">
            {loading ? (<CircularProgress size={250} thickness={1} style={{ color: "gold" }} />) : (
                <>
                    <Line
                        data={{
                            labels: historicalData?.map((coin) => {
                                let date = new Date(coin[0]);
                                let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM` :
                                    `${date.getHours()}:${date.getMinutes()} AM`;
                                return days === 1 ? time : date.toLocaleDateString();
                            }),

                            datasets: [
                                {
                                    data: historicalData?.map((coin) => coin[1]),
                                    label: `Price ( Past ${days} Days ) in ${currency}`,
                                    borderColor: "#EEBC1D",
                                },
                            ],
                        }}
                        options={{
                            elements: {
                                point: {
                                    radius: 1,
                                },
                            },
                        }} />
                        <div className="mt-6">
                        <DaySelector clicked={setDaysHandler} buttonSelected={buttonSelected} />
                        </div>
                </>
            )}
        </div>
    )
}

export default DisplayChart