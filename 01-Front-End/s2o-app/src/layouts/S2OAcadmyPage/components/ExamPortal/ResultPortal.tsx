import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import './ResultPortal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Result } from './Result';

export const ResultPortal = () =>{
    return(
        <>
        <div className='container-light mt-5 d-flex justify-content-center'>
            <div className='head'>
            
                <div className="img-container d-flex justify-content-center ml-5 mt-5">
                    <img className='img1' src={require('./../../../../Images/s2o-academy.jpg')} alt="" ></img>
                </div>
                <div className='d-flex justify-content-center mt-5'>
                    <h1>Result Portal</h1>
                </div>
                <div>
                    
                    <div className='set d-flex justify-content-center
                     mt-5 mb-5'>
                        <div className='nic-input'>
                        <input type="text" placeholder="NIC" className='form-control' />
                        </div>
                         <div >
                          <div className="dropdown ml-2">
                            <a className="btn">Term <FontAwesomeIcon icon={faCaretDown} className="ml-2" /></a>
                            <div className="dropdown-content">
                                <a>1st Term</a>
                                <a>2nd Term</a>
                                <a>3rd Term</a>
                                <a>4th Term</a>
                                <a>5th Term</a>
                                <a>6th Term</a>
                            </div>
                        </div>
                        
                    </div>
                    </div>
                    <div className=' sub'>
                    <a className='btn mb-5'>Submit</a>
                    </div>
            
                </div>
                <Result/>
            </div>
            
        </div>
        
        </>
    );
}