import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import '../styles/global.css';

const BarChartComponent = ({ endpoint }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const transformData = (apiResponse) => {
        const transformedData = [];

        apiResponse.forEach((yearData) => {
            for (const year in yearData) {
                yearData[year].forEach((monthData) => {
                    for (const month in monthData) {
                        monthData[month].forEach((dayData) => {
                            for (const date in dayData) {
                                transformedData.push({
                                    date,
                                    sale: dayData[date],
                                });
                            }
                        });
                    }
                });
            }
        });

        return transformedData;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(endpoint);
                const transformed = transformData(response.data);
                setData(transformed);
                setLoading(false);
            } catch (err) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }
    if (error) return <div>{error}</div>;

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sale" fill="#007FFF" />
            </BarChart>
        </ResponsiveContainer>
    );
};

BarChartComponent.propTypes = {
    endpoint: PropTypes.string.isRequired,
};

export default BarChartComponent;
