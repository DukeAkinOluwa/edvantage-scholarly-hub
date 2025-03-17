
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-edvantage-blue/5 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Link
              to="/"
              className="text-2xl font-display font-bold text-edvantage-blue inline-block mb-2"
            >
              Edvantage
            </Link>
            <p className="text-edvantage-dark-gray max-w-xs">
              Simplifying the academic journey for tertiary students with an
              engaging and efficient platform.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-edvantage-dark-gray hover:text-edvantage-blue transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-edvantage-dark-gray hover:text-edvantage-blue transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://www.instagram.com/edvantage_edu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-edvantage-dark-gray hover:text-edvantage-blue transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com/company/edvantageng"
                target="_blank"
                rel="noopener noreferrer"
                className="text-edvantage-dark-gray hover:text-edvantage-blue transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-edvantage-dark-gray hover:text-edvantage-blue transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-edvantage-dark-gray hover:text-edvantage-blue transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-edvantage-dark-gray hover:text-edvantage-blue transition-colors"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-edvantage-dark-gray hover:text-edvantage-blue transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-edvantage-dark-gray hover:text-edvantage-blue transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Features</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/#features"
                  className="text-edvantage-dark-gray hover:text-edvantage-blue transition-colors"
                >
                  Time Management
                </Link>
              </li>
              <li>
                <Link
                  to="/#features"
                  className="text-edvantage-dark-gray hover:text-edvantage-blue transition-colors"
                >
                  Collaboration
                </Link>
              </li>
              <li>
                <Link
                  to="/#features"
                  className="text-edvantage-dark-gray hover:text-edvantage-blue transition-colors"
                >
                  Gamification
                </Link>
              </li>
              <li>
                <Link
                  to="/#features"
                  className="text-edvantage-dark-gray hover:text-edvantage-blue transition-colors"
                >
                  Academic Resources
                </Link>
              </li>
              <li>
                <Link
                  to="/#features"
                  className="text-edvantage-dark-gray hover:text-edvantage-blue transition-colors"
                >
                  AI Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-edvantage-blue" />
                <a
                  href="mailto:edvantage.edu.ng@gmail.con"
                  className="text-edvantage-dark-gray hover:text-edvantage-blue transition-colors"
                >
                  edvantage.edu.ng@gmail.con
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <Link to="/contact" className="btn-primary">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 mt-8 text-center">
          <p className="text-sm text-edvantage-dark-gray">
            &copy; {currentYear} Edvantage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
