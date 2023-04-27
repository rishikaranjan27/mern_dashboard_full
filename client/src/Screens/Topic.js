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
            return {...state, topic : action.payload, loading: false};

        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};


        default:
            return state;

    }
};



export const Topic = () => {

    const [{loading, topic, error}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });


    const getTopicData = async () => {

        dispatch({type: 'FETCH_REQUEST'});

        try {

            const {data} = await axios.get(
                `${baseUrl}/api/product/topic`
            );

            console.log('topic', data);
            dispatch({type: 'FETCH_SUCCESS', payload: data});

        }

        catch(err){
            dispatch({type: 'FETCH_FAIL', payload: err});
            console.log(err);
        }

    }


    useEffect(() => {

        getTopicData();

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
                title="Topic Dashboard"
                />
    
    
                <div className="top-topic">
                { 
                    topic && 
    
                    <div className="sp-dashboard">
    
                    <div className="sp-dashboard-flex1">
    
                    {/* Topic Count */}
                    <div className="chart sp-count">
                     <h5>Topic Count</h5>
                     <h1>{topic.topicCount.length}</h1>
                     </div>
    
    
                    {/* Top 3 topic */}
                    
                    <div className="chart sp-top3">
                    <h5>Top 3 Topic</h5>
    
        
    
                    <Chart
                    chartType="PieChart"
    
                    data={[
                        ['Topic', 'Total'],
                        ...topic.top3Topic.map((x) => [x._id.topic, x.myCount]),
                    ]}   
    
                    options={{
                        legend: { position: 'none' },
                        colors:['#9264E5', '#AA87EE', '#95A0F7', '#52459F']
                    }}  
    
                    />
    
                    </div>
    
    
                    {/* Bottom 3 topic */}
                    <div className="chart sp-bottom3">
                    <h5>Bottom 3 Topic</h5>
    
        
    
                    <Chart
                    chartType="PieChart"
    
                    data={[
                        ['Topic', 'Total'],
                        ...topic.bottom3Topic.map((x) => [x._id.topic, x.myCount]),
                    ]}   
    
                    options={{
                        legend: { position: 'none' },
                        colors:['#9264E5', '#AA87EE', '#95A0F7', '#52459F']
                    }}  
    
                    />
    
                    </div>
    
    
                    </div>
    
                    {/* ---- */}
    
                    <div>
    
    
                    <h5 className="sp-dashboard-subheading">Top Topics With Highest</h5>
                    
    
                    <div className="sp-dashboard-flex2">
    
                    {/* Top Likelihood topic */}
                    <div className="chart likelihood">
                    <h5>Likelihood</h5>
    
    
                    <Chart
                    chartType="AreaChart"
    
                    data={[
                        ['Topic', 'Total'],
                        ...topic.topLikelihoodTopic.map((x) => [x._id.topic, x.myCount]),
                    ]}   
    
                    options={{
                        legend: { position: 'none' },
                        colors: ["#95A0F7"],
                    }}  
    
                    />
    
                    </div>
    
    
    
                    {/* Top Relevance topic */}
                    <div className="chart relevance">
                    <h5>Relevance</h5>
    
    
                    <Chart
                    chartType="BarChart"
    
                    data={[
                        ['Topic', 'Total'],
                        ...topic.topRelevanceTopic.map((x) => [x._id.topic, x.myCount]),
                    ]}   
    
                    options={{
                        legend: { position: 'none' },
                        colors: ["#989AE5"],
                    }}  
    
                    />
    
                    </div>
    
    
    
                    {/* Top Intensity topic */}
                    <div className="chart intensity">
                    <h5>Intensity</h5>
    
    
                    <Chart
                    chartType="ScatterChart"
    
                    data={[
                        ['Topic', 'Total'],
                        ...topic.topIntensityTopic.map((x) => [x._id.topic, x.myCount]),
                    ]}   
    
                    options={{
                        legend: { position: 'none' },
                        colors: ["#52459F"],
                    }}  
    
                    />
    
                    </div>
    
    
    
                    </div>
    
                    {/* --- */}
    
                    
    
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