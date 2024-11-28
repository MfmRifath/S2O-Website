export const Footer = () => {
    return (
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-t-2xl">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-5 px-4">
          <div className="row g-5 w-100">
            {/* Contact Section */}
            <div className="col-lg-4 col-md-6">
              <h5 className="text-white mb-4">Contact</h5>
              <p className="mb-2 text-white">
                <i className="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA
              </p>
              <p className="mb-2 text-white">
                <i className="fa fa-phone-alt me-3"></i>+012 345 67890
              </p>
              <p className="mb-2 text-white">
                <i className="fa fa-envelope me-3"></i>info@example.com
              </p>
              <div className="d-flex pt-3 gap-2">
                {["twitter", "facebook-f", "youtube", "linkedin-in"].map((icon) => (
                  <a
                    key={icon}
                    className="btn btn-outline-light btn-social rounded-circle p-2 d-flex align-items-center justify-content-center"
                    href="#"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <i className={`fab fa-${icon}`} />
                  </a>
                ))}
              </div>
            </div>
  
            {/* Quick Links */}
            <div className="col-lg-4 col-md-6">
              <h5 className="text-white mb-4">Quick Links</h5>
              <ul className="list-unstyled">
                {[
                  { text: "About Us", href: "#" },
                  { text: "Contact Us", href: "#" },
                  { text: "Our Services", href: "#" },
                  { text: "Privacy Policy", href: "#" },
                  { text: "Terms & Conditions", href: "#" },
                ].map((link) => (
                  <li key={link.text} className="mb-2">
                    <a
                      className="text-white text-decoration-none hover:underline"
                      href={link.href}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Footer Note */}
            <div className="col-lg-4 col-md-12 text-center">
              <h5 className="text-white mb-4">Stay Connected</h5>
              <p className="small">
                Follow us on social media to stay updated on the latest news and
                offers.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  };