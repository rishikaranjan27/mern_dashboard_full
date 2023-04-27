import './Heading.css'
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import { useNavigate } from 'react-router-dom'



export const Heading = ({title}) => {

    const navigate = useNavigate();


    return (
        <div className='heading'>

          

            <div className='heading-left'>

                <div className='heading-logo'
                onClick={() => {
                    navigate('/');
                }}>
                <BubbleChartIcon/>
                </div>


                <div className='heading-text'
                onClick={() => {
                    navigate('/');
                }}>
                <h2>Dash</h2>
                </div>

            </div>

       

            <div className='heading-right'>
            <h1>{title}</h1>
            </div>

        </div>
    )
}