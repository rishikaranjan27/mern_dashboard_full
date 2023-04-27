import axios from "axios"
import React, { useEffect, useReducer, useState } from "react"
import Chart from 'react-google-charts';

import '../ScreensCSS/SpecificChart.css'
import {baseUrl} from '../lib'
import { Heading } from "../Components/Heading";
import { SubLoading } from '../Components/SubLoading'





const reducer = (state, action) => {

    switch(action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        
        case 'FETCH_SUCCESS':
            return {...state, country : action.payload, loading: false};

        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};


        default:
            return state;

    }
};



export const Country = () => {

    const [{loading, country, error}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });


    const getCountryData = async () => {

        dispatch({type: 'FETCH_REQUEST'});

        try {

            const {data} = await axios.get(
                `${baseUrl}/api/product/country`
            );

            console.log('getTop3Country', data);
            dispatch({type: 'FETCH_SUCCESS', payload: data});

        }

        catch(err){
            dispatch({type: 'FETCH_FAIL', payload: err});
            console.log(err);
        }

    }


    useEffect(() => {

        getCountryData();

    }, []);




    return(

        <div>

        {
            loading ? (
                <SubLoading/>
            ) : 

            error ? (
                <div> {error} </div>
            ) : 

            (
                <div className="sp">

            
                <Heading
                title="Country Dashboard"
                />
    
    
                <div className="top-country">
                { 
                    country && 
    
                    <div className="sp-dashboard">
    
                    <div className="sp-dashboard-flex1">
    
                        {/* Country Count */}
                        <div className="chart sp-count">
                        <h5>Country Count</h5>
                        <h1>{country.countryCount.length}</h1>
                        </div>
    
    
                        {/* Top 3 countries */}  
                        <div className="chart sp-top3">
                        <h5>Top 3 Countries</h5>
    
                        <Chart
                        chartType="PieChart"
    
                        data={[
                            ['Country', 'Total'],
                            ...country.top3Country.map((x) => [x._id.country, x.myCount]),
                        ]}   
    
                        options={{
                            legend: { position: 'none' },
                            colors:['#9264E5', '#AA87EE', '#95A0F7', '#52459F']
                        }}  
    
                        />
    
                        </div>
    
    
                        {/* Bottom 3 countries */}
                        <div className="chart sp-bottom3">
                        <h5>Bottom 3 Countries</h5>
    
            
    
                        <Chart
                        chartType="PieChart"
    
                        data={[
                            ['Country', 'Total'],
                            ...country.bottom3Country.map((x) => [x._id.country, x.myCount]),
                        ]}   
    
                        options={{
                            legend: { position: 'none' },
                            colors:['#9264E5', '#AA87EE', '#95A0F7', '#52459F']
                        }}  
    
                        />
    
                        </div>
    
                    </div>
    
    
    
    
    
                        <h5 className="sp-dashboard-subheading">Top Countries With Highest</h5>
    
                        <div className="sp-dashboard-flex2">
    
                        {/* Top Likelihood Country */}
                        <div className="chart likelihood">
                        <h5>Likelihood</h5>
    
    
                        <Chart
                        chartType="AreaChart"
    
                        data={[
                            ['Country', 'Total'],
                            ...country.topLikelihoodCountry.map((x) => [x._id.country, x.myCount]),
                        ]}   
    
                        options={{
                            legend: { position: 'none' },
                            colors: ["#95A0F7"],
    
                            
                        }}  
    
                        />
    
                        </div>
    
    
    
                        {/* Top Relevance Country */}
                        <div className="chart relevance">
                        <h5>Relevance</h5>
    
    
                        <Chart
                        chartType="BarChart"
    
                        data={[
                            ['Country', 'Total'],
                            ...country.topRelevanceCountry.map((x) => [x._id.country, x.myCount]),
                        ]}   
    
                        options={{
                            legend: { position: 'none' },
                            colors: ["#989AE5"],
                        }}  
    
                        />
    
                        </div>
    
    
    
                        {/* Top Intensity Country */}
                        <div className="chart intensity">
                        <h5>Intensity</h5>
    
    
                        <Chart
                        chartType="ScatterChart"
    
                        data={[
                            ['Country', 'Total'],
                            ...country.topIntensityCountry.map((x) => [x._id.country, x.myCount]),
                        ]}   
    
                        options={{
                            legend: { position: 'none' },
                            colors: ["#52459F"],
                        }}  
    
                        />
    
                        </div>
    
    
                        </div>
    
            
    
    
                    </div>
    
                }
                </div>
    
    
    
            </div>
                
            )
        }

        </div>

        
    )
}