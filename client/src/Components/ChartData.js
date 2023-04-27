import axios from "axios"
import React, { useEffect, useReducer, useState } from "react"
import Chart from 'react-google-charts';
import './ChartData.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {LoadingBox} from '../Components/LoadingBox'
import {baseUrl} from '../lib'

import TopicIcon from '@mui/icons-material/Topic';
import PublicIcon from '@mui/icons-material/Public';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';

import { useNavigate } from 'react-router-dom'




const reducer = (state, action) => {

    switch(action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        
        case 'FETCH_SUCCESS':
            return {...state, summary : action.payload, loading: false};

        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};



        case 'FILTER_REQUEST':
            return {...state, loading: true};
            
        case 'FILTER_SUCCESS':
            return {...state, filter : action.payload, loading: false};
    
        case 'FILTER_FAIL':
            return {...state, loading: false, error: action.payload};




        default:
            return state;

    }
};



export const ChartData = () => {

    const navigate = useNavigate();

    const [{loading, summary, filter, error, err}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });



    const [filterType, setFilterType] = useState('');
    const [filterValue, setFilterValue] = useState('');

    console.log('filterType', filterType);

    console.log('filterValue', filterValue);
   

    const [topicOpen, setTopicOpen] = useState(false);
    const [sectorOpen, setSectorOpen] = useState(false);
    const [sourceOpen, setSourceOpen] = useState(false);
    const [regionOpen, setRegionOpen] = useState(false);


    const filterHandler = async (filterType, filterValue) => {

        try {

            dispatch({type: 'FILTER_REQUEST'});

            const {data} = await axios.get(
                //`/api/product/filter/${filterType}/${filterValue}`
                 `${baseUrl}/api/product/filter/${filterType}/${filterValue}`
                //`/api/product/update?filterType=${filterType}&filterValue=${filterValue}`,
               
            )

            console.log('updateData', data);

            dispatch({type: 'FILTER_SUCCESS', payload: data});

        }

        catch (err) {

            dispatch({type: 'FILTER_FAIL', payload: err});

            console.log(err);
        }
    }




    useEffect(() => {

        const fetchData = async () => {

            dispatch({type: 'FETCH_REQUEST'});
    
            try {
    
                const {data} = await axios.get(
                    //'/api/product/summary'
                    `${baseUrl}/api/product/summary`
    
                );
    
                console.log('data', data);
    
                dispatch({type: 'FETCH_SUCCESS', payload: data});
    
            
    
            }
    
            catch (err) {
    
                dispatch({type: 'FETCH_FAIL', payload: err});
    
                console.log(err);
            }
    
        };

        

        fetchData();

    }, []);



    

    return (

        <div className="chartData">

            {
                loading ? (
                    <LoadingBox/>
                ) :

                error ? (
                    <div>{error}</div>
                ) : 
                
                (
                    <div className="loadedData">

                         <div className="sidebar">

                            <div className="logo">

                                <div className="logo-icon"><BubbleChartIcon/></div>
                                {/* <div className="logo-icon"><ViewInArIcon/></div> */}
                                <h2>Dash</h2>
                            </div>

                            {/* <h2 className="white__text">Filter</h2> */}

                            {  
                                summary && 

                                <div className="filterOptions">

                                        <div className=" white__text"
                                        onClick={() => {
                                            setTopicOpen(!topicOpen);
                                        }}>
                                            <div className="logo-side"><TopicOutlinedIcon/></div>
                                            <div>Topic</div>
                                            {/* <div><KeyboardArrowDownIcon/></div> */}
                                        </div>


                                    <div class={topicOpen ? ' panel-collapse' : 'panel-collapse panel-close'}>
                                    {
                                        summary.topicOptions.map((item) => (

                                            <div>

                                            <label>
                                            <input type="radio" 
                                            name='radio'
                                            onClick={() => {
                                            setFilterValue(item);
                                            setFilterType('Topic');
                                            filterHandler('topic', item);
                                            }} 
                                            />
                                            <span>{item}</span>
                                            </label>


                                            <br/>

                                            </div>
                                                    
                                        ))
                                    }
                                    </div>





                                    <div className="white__text" 
                                    onClick={() => {
                                        setSectorOpen(!sectorOpen);
                                    }}>
                                        <div className="logo-side"><EngineeringOutlinedIcon/></div>
                                        <div>Sector</div>
                                        {/* <div><KeyboardArrowDownIcon/></div> */}
                                    </div>

                                    <div class={sectorOpen ? 'panel-collapse' : 'panel-collapse panel-close'}>
                                    {
                                        summary.sectorOptions.map((item) => (


                                            <div>

                                            <label>
                                            <input type="radio" 
                                            name='radio'
                                            onClick={() => {
                                            setFilterValue(item);
                                            setFilterType('Sector');
                                            filterHandler('sector', item);
                                            }} 
                                            />
                                            <span>{item}</span>
                                            </label>

                                            <br/>

                                            </div>
                                                    
                                        ))
                                    }
                                    </div>


                                    <div className="white__text" 
                                    onClick={() => {
                                        setSourceOpen(!sourceOpen);
                                    }}>
                                        <div className="logo-side"><AttachFileOutlinedIcon/></div>
                                        <div>Source</div>
                                        {/* <div><KeyboardArrowDownIcon/></div> */}
                                    </div>

                                    <div class={sourceOpen ? 'panel-collapse' : 'panel-collapse panel-close'}>
                                    {
                                        summary.sourceOptions.map((item) => (

                                            <div>

                                            <label>
                                            <input type="radio" 
                                            name='radio'
                                            onClick={() => {
                                            setFilterValue(item);
                                            setFilterType('Source');
                                            filterHandler('source', item);
                                            }} 
                                            />
                                            <span>{item}</span>
                                            </label>

                                            <br/>

                                            </div>
                                                    
                                        ))
                                    }
                                    </div>


                                    <div className="white__text" 
                                    onClick={() => {
                                        setRegionOpen(!regionOpen);
                                    }}>
                                        <div className="logo-side"><PublicIcon/></div>
                                        <div>Region</div>
                                        {/* <div><KeyboardArrowDownIcon/></div> */}
                                    </div>

                                    <div class={regionOpen ? 'panel-collapse' : 'panel-collapse panel-close'}>
                                    {
                                        summary.regionOptions.map((item) => (

                                            <div>

                                            <label>
                                            <input type="radio" 
                                            name='radio'
                                            onClick={() => {
                                            setFilterValue(item);
                                            setFilterType('Region');
                                            filterHandler('region', item);
                                            }} 
                                            />
                                            <span>{item}</span>
                                            </label>

                                            <br/>

                                            </div>
                                                    
                                        ))
                                    }
                                    </div>

                                                
                                </div>
                            }

                         </div>


{/* ----------------------------------------------------------------------------------------------------------------------- */}

                            <div className="main">

                            <div className="main-header">

                            <h1 className="black__text">Dashboard</h1>

                            {   
                                filter &&

                                <div className="filterData">
                                    <div>{filterType} - {filterValue}</div>
                                </div>
                                
                            }

                            </div>

                            {
                                filter && 

                                <div className="filteredChart">


                                <div className="flex-1">

                                <div className="chart country__Chart">
                                {

                                    <div>
                                    <h5>Country</h5>

                                    <Chart className="chartDetails"
                                    chartType="GeoChart"
                                    data={[
                                        ['Country', 'Total'],
                                        ...filter.countryRange.map((x) => [x._id, x.totalCountry]),
                                    ]}   

                                    options={{

                                        colorAxis: {
                                            values:[0, 10, 11, 20, 21, 30],
                                            colors:['#9264E5', '#9264E5', '#AA87EE', '#AA87EE', '#95A0F7', '#95A0F7']
                                        },
                                        datalessRegionColor: "#DCDBFB",
                                        defaultColor: "#DCDBFB",
                                        legend: { position: 'none' },
                                        colors: ["#DCDBFB"],
                                    }}  
                                    

                                    /> 

                                    </div>                           
                                }
                                </div>



                                <div className="chart region__Chart">
                                {

                                    <div>
                                    <h5>Region</h5>

                                    <Chart className="chartDetails"
                                    chartType="PieChart"
                                    data={[
                                        ['Region', 'Total'],
                                        ...filter.regionRange.map((x) => [x._id, x.totalRegion]),
                                    ]}     
                                    options={{
                                        legend: { position: 'none' },
                                        colors:['#9264E5', '#AA87EE', '#95A0F7', '#52459F']
                                    }}  
                                                    
                                    />

                                    </div>    
                                }
                                </div>

                                </div>



                                <div className="chart topic__Chart">
                                {

                                    <div>
                                    <h5>Topic</h5>

                                    <Chart className="chartDetails"
                                    chartType="Line"
                                    data={[
                                        ['Topic', 'Total'],
                                        ...filter.topicRange.map((x) => [x._id, x.totalTopic]),
                                    ]}   


                                    options={{
                                        legend: { position: 'none' },
                                        colors: ["#52459F"],
                                    }}      
                                    />

                                    </div>
                                }
                                </div>




                                <div className="flex-2">

                                <div className="chart likelihood__Chart">
                                {
                                    <div>
                                    <h5>Likelihood</h5>

                                    <Chart className="chartDetails"
                                    chartType="Scatter"
                                    data={[
                                        ['Likelihood', 'Total'],
                                        ...filter.likelihoodRange.map((x) => [x._id, x.totalLikelihood]),
                                    ]}
                                    options={{
                                        legend: { position: 'none' },
                                        colors: ["#52459F"],
                                    }}
                                    />   

                                    </div>                        
                                }
                                </div>



                                <div className="chart relevance__Chart">
                                {

                                    <div>
                                    <h5>Relevance</h5>

                                    <Chart className="chartDetails"
                                    chartType="BarChart"
                                    data={[
                                        ['Relevance', 'Total'],
                                        ...filter.relevanceRange.map((x) => [x._id, x.totalRelevance]),
                                    ]}       
                                    options={{
                                        legend: { position: 'none' },
                                        colors: ["#989AE5"],
                                    }}             
                                    />

                                    </div>
                                }
                                </div>


                                </div>


                                <div className="chart intensity__Chart">
                                {
                                    <div>
                                    <h5>Intensity</h5>

                                    <Chart className="chartDetails"
                                    chartType="Bar"
                                    data={[
                                        ['Intensity', 'Total'],
                                        ...filter.intensityRange.map((x) => [x._id, x.totalIntensity]),
                                    ]}
                                    options={{
                                        bar: { groupWidth: "100%" },
                                        legend: { position: 'none' },
                                        colors: ["#989AE5"],
                                    }}  
                                    />  

                                    </div>              
                                }
                                </div>

                               



                                </div>
                                
                            }


{/* ----------------------------------------------------------------------------------------------------------------------- */}


                            {
                                summary && !filter &&

                                <div className="defaultChart">


                                    <div className="flex-1">

                                    <div className="chart country__Chart">
                                    {

                                        <div>
                                        <h5
                                        onClick={() => {
                                            navigate('/country');
                                        }}
                                        >Country</h5>

                                        <Chart className="chartDetails"
                                        chartType="GeoChart"
                                        data={[
                                            ['Country', 'Total'],
                                            ...summary.countryRange.map((x) => [x._id, x.totalCountry]),
                                        ]}   

                                        options={{

                                            colorAxis: {
                                                values:[0, 10, 11, 20, 21, 30],
                                                colors:['#9264E5', '#9264E5', '#AA87EE', '#AA87EE', '#95A0F7', '#95A0F7']
                                            },
                                            datalessRegionColor: "#DCDBFB",
                                            defaultColor: "#DCDBFB",
                                            legend: { position: 'none' },
                                            colors: ["#DCDBFB"],
                                        }}  
                                        

                                        /> 

                                        </div>                           
                                    }
                                    </div>



                                    <div className="chart region__Chart">
                                    {

                                        <div>
                                        <h5
                                        onClick={() => {
                                            navigate('/region');
                                        }}
                                        >Region</h5>

                                        <Chart className="chartDetails"
                                        chartType="PieChart"
                                        data={[
                                            ['Region', 'Total'],
                                            ...summary.regionRange.map((x) => [x._id, x.totalRegion]),
                                        ]}     
                                        options={{
                                            legend: { position: 'none' },
                                            colors:['#9264E5', '#AA87EE', '#95A0F7', '#52459F']
                                        }}  
                                                          
                                        />

                                        </div>    
                                    }
                                    </div>

                                    </div>



                                    <div className="chart topic__Chart">
                                    {

                                        <div>
                                        <h5
                                        onClick={() => {
                                            navigate('/topic');
                                        }}
                                        >Topic</h5>

                                        <Chart className="chartDetails"
                                        chartType="Line"
                                        data={[
                                            ['Topic', 'Total'],
                                            ...summary.topicRange.map((x) => [x._id, x.totalTopic]),
                                        ]}   


                                        options={{
                                            legend: { position: 'none' },
                                            colors: ["#52459F"],
                                        }}      
                                        />

                                        </div>
                                    }
                                    </div>




                                    <div className="flex-2">

                                    <div className="chart likelihood__Chart">
                                    {
                                        <div>
                                        <h5>Likelihood</h5>

                                        <Chart className="chartDetails"
                                        chartType="Scatter"
                                        data={[
                                            ['Likelihood', 'Total'],
                                            ...summary.likelihoodRange.map((x) => [x._id, x.totalLikelihood]),
                                        ]}
                                        options={{
                                            legend: { position: 'none' },
                                            colors: ["#52459F"],
                                        }}
                                        />   

                                        </div>                        
                                    }
                                    </div>



                                    <div className="chart relevance__Chart">
                                    {

                                        <div>
                                        <h5>Relevance</h5>

                                        <Chart className="chartDetails"
                                        chartType="BarChart"
                                        data={[
                                            ['Relevance', 'Total'],
                                            ...summary.relevanceRange.map((x) => [x._id, x.totalRelevance]),
                                        ]}       
                                        options={{
                                            legend: { position: 'none' },
                                            colors: ["#989AE5"],
                                        }}             
                                        />

                                        </div>
                                    }
                                    </div>


                                    </div>


                                    <div className="chart intensity__Chart">
                                    {
                                        <div>
                                        <h5>Intensity</h5>

                                        <Chart className="chartDetails"
                                        chartType="Bar"
                                        data={[
                                            ['Intensity', 'Total'],
                                            ...summary.intensityRange.map((x) => [x._id, x.totalIntensity]),
                                        ]}
                                        options={{
                                            bar: { groupWidth: "100%" },
                                            legend: { position: 'none' },
                                            colors: ["#989AE5"],
                                        }}  
                                        />  

                                        </div>              
                                    }
                                    </div>
                             


                                    


                                </div>
                                
                            }

                            </div>

{/* ----------------------------------------------------------------------------------------------------------------------- */}


                    </div>
                )
            }

           

        </div>

    )
}
