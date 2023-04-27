import './SubLoading.css'


export const SubLoading = () => {
    return (
        <div className="subLoad">

            <div className="subLoad-header">
                <div className="subLoad-header-left">

                    <div className="subLoad-header-logo"></div>
                    <div className="subLoad-header-text"></div>

                </div>

                <div className="subLoad-header-right">

                    <div className="subLoad-header-right-heading"></div>

                </div>
            </div>


            <div className="subLoad-main">

                <div className="subLoad-main-subSection">


                    <div className ="subLoader-main">

                    <div className="balls">
                        <div className="ball ball1"></div>
                        <div className="ball ball2"></div>
                        <div className="ball ball3"></div>
                    </div>

                    <span className="custom-text">Loading...</span>

                    </div>

                </div>


            </div>
             
        </div>
    )
}