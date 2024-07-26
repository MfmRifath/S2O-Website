import './Result.css';

export const Result =()=>{
    return(
        <div className="container-white d-flex justify-content-center">
            <div>
                <div>
                <h1>
                    <span className='head-primary'><b>S2O Academy</b></span>
                    <span className='res'> Result</span>
                </h1>
                </div>
                <div>
                <p>Name      :</p>
                <p>Reg.No    :</p>
                <p>Physics   :</p>
                <p>Chemistry :</p>
                <p>Total     :</p>
                <p>Rank      :</p>
                <p>Z-Score   :</p>
                </div>
                
            </div>
        </div>
    );
}