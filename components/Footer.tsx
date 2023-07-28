import React from "react";
import Link from "next/link";
const Header: React.FC = () => {

  return <>
         <footer>
        <div className="container">
            <div className="grid-container">
                <div className="map-container">
                    <iframe className="map-iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3012.583372776478!2d30.37550171640944!3d40.77285147932578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ccb2c45d833ddb%3A0xf4c3df33139c1e36!2sELEGANT%20HOME%20PLUS%20AV%C4%B0ZE%20VE%20AYDINLATMA!5e0!3m2!1sen!2str!4v1637675086769!5m2!1sen!2str" 
                    
                    loading="lazy"></iframe>
                    {/* allowfullscreen=""  */}
                </div>
                <div className="adress text-center">
                    <p>İstiklal, Çark Cd.</p>
                    <p>No: 253, 54100</p>
                    <p>Serdivan/Sakarya</p>
                </div>
                <div className="links">
                    <a href="">
                        {/* <!-- Instagram Icon --> */}
                        <i className="fa fa-instagram"></i>
                        Instagram
                    </a>
                    <a href="">
                        {/* <!-- Facebook Icon --> */}
                        <i className="fa fa-facebook-official"></i>
                         Facebook
                    </a>
                    <a href="">
                        {/* <!-- Phone Icon --> */}
                        <i className="fa fa-phone"></i>
                        05349613265
                    </a>
                </div>
            </div>
        </div>
    </footer>
    </>
};

export default Header;
