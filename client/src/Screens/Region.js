import axios from "axios"
import React, { useEffect, useReducer, useState } from "react"
import Chart from 'react-google-charts';

import '../ScreensCSS/SpecificChart.css'
import {baseUrl} from '../lib'
import { Heading } from "../Components/Heading";
import { SubLoading } from "../Components/SubLoading";




const reducer = (state, action) => {

    switch(action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        
        case 'FETCH_SUCCESS':
            return {...state, region : action.payload, loading: false};

        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};


        default:
            return state;

    }
};



export const Region = () => {

    const [{loading, region, error}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });


    const getRegionData = async () => {

        dispatch({type: 'FETCH_REQUEST'});

        try {

            const {data} = await axios.get(
                `${baseUrl}/api/product/region`
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

        getRegionData();

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
                title="Region Dashboard"
                />
    
    
                <div className="top-region">
                { 
                    region && 
    
                    <div className="sp-dashboard">
    
                    <div className="sp-dashboard-flex1">
    
    
                        {/* Region Count */}
                        <div className="chart sp-count">
                        <h5>Region Count</h5>
                        <h1>{region.regionCount.length}</h1>
                        </div>
        
    
                        {/* Top 3 region */}
                        
                        <div className="chart sp-top3">
                        <h5>Top 3 Region</h5>
    
            
    
                        <Chart
                        chartType="PieChart"
    
                        data={[
                            ['Region', 'Total'],
                            ...region.top3Region.map((x) => [x._id.region, x.myCount]),
                        ]}   
    
                        options={{
                            legend: { position: 'none' },
                            colors:['#9264E5', '#AA87EE', '#95A0F7', '#52459F']
                        }}  
    
                        />
    
                        </div>
    
    
                        {/* Bottom 3 region */}
                        <div className="chart sp-bottom3">
                        <h5>Bottom 3 Region</h5>
    
            
    
                        <Chart
                        chartType="PieChart"
    
                        data={[
                            ['Region', 'Total'],
                            ...region.bottom3Region.map((x) => [x._id.region, x.myCount]),
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
    
                    {/* Top Likelihood Region */}
                    <div className="chart likelihood">
                    <h5>Likelihood</h5>
    
    
                    <Chart
                    chartType="AreaChart"
    
                    data={[
                        ['Country', 'Total'],
                        ...region.topLikelihoodRegion.map((x) => [x._id.region, x.myCount]),
                    ]}   
    
                    options={{
                        legend: { position: 'none' },
                        colors: ["#95A0F7"],
                    }}  
    
                    />
    
                    </div>
    
    
    
                    {/* Top Relevance Region */}
                    <div className="chart relevance">
                    <h5>Relevance</h5>
    
    
                    <Chart
                    chartType="BarChart"
    
                    data={[
                        ['Region', 'Total'],
                        ...region.topRelevanceRegion.map((x) => [x._id.region, x.myCount]),
                    ]}   
    
                    options={{
                        legend: { position: 'none' },
                        colors: ["#989AE5"],
                    }}  
    
                    />
    
                    </div>
    
    
    
                    {/* Top Intensity Region */}
                    <div className="chart intensity">
                    <h5>Intensity</h5>
    
    
                    <Chart
                    chartType="ScatterChart"
    
                    data={[
                        ['Region', 'Total'],
                        ...region.topIntensityRegion.map((x) => [x._id.region, x.myCount]),
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