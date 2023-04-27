import './LoadingBox.css';


export const LoadingBox = () => {
    return (

      

        <div className = "loader">

            <div className="loader-sidebar">

                <div className='loader-sidebar-logo'>

                    <div className="loader-sidebar-logo-icon"></div>
                    <div className="loader-sidebar-logo-text"></div>

                </div>

            
                <div className="loader-sidebar-option"></div>
                <div className="loader-sidebar-option"></div>
                <div className="loader-sidebar-option"></div>
                <div className="loader-sidebar-option"></div>

            </div>


            <div className="loader-main">

                <div className='loader-main-heading'></div>

                <div className="loader-main-flex">

                <div className="balls">
                    <div className="ball ball1"></div>
                    <div className="ball ball2"></div>
                    <div className="ball ball3"></div>
                </div>

                <span className="custom-text">Loading...</span>


                </div>
            </div>

        </div>



            // <div className ="loader">

            //     <div className="balls">
            //         <div className="ball ball1"></div>
            //         <div className="ball ball2"></div>
            //         <div className="ball ball3"></div>
            //     </div>

            //     <span className="custom-text">Loading...</span>
            // </div>
    )
}