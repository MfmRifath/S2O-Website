export const Footer = () =>{
    return(
        <div className="main-color footer">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-5 main-color">
                
                <div className="m-5 row g-5">
                <div className="col-lg-3 col-md-6">
                        <h5 className="text-white mb-4">Contect</h5>
                        <p className="mb-2 text-white"><i className="fa fa-map-marker-alt me-3"></i>123Street,New York,USA</p>
                        <p className="mb-2 text-white"><i className="fa fa-phone-alt me-3"></i>+01234567890</p>
                        <p className="mb-2 text-white"><i className="fa fa-envelope me-3"></i>info@example.com</p>
                        <div className="d-flex pt-2">
                            <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-youtube"></i></a>
                            <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 m-5">
                    <h5 className="text-white mb-4">Quick Links</h5>
                    <a className="btn btn-outline-light" href="">About Us</a>
                    <a className="btn btn-outline-light" href="">Contact Us</a>
                    <a className="btn btn-outline-light" href="">Our Services</a>
                    <a className="btn btn-outline-light" href="">Privacy Policy</a>
                    <a className="btn btn-outline-light" href="">Terms & Condition</a>
                </div>

            </footer>

        </div>
    );
}