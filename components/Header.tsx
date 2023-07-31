import React from "react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
const Header: React.FC = () => {
  const route = useRouter();
  const BackGroundImage = ():string =>  {
    
    return route.basePath + "/" + (route.pathname === '/hakkimizda' ? "images/banner/hakkimizda_banner.jpg" : "images/banner/banner.jpeg");
  }
  const address_image= BackGroundImage();
  const handleScroll = () => {
    try {
      let navbar = document.getElementsByTagName("nav");
      let logo = document.getElementById("logo");
      let navbar_parent = navbar[0].parentElement;
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        navbar[0].style.height = `${60}px`;
        logo.style.fontSize = '24px';
        navbar_parent.style.opacity = '.8';
      } else {
        navbar[0].style.height = `${100}px`;
        logo.style.fontSize = '36px';
        navbar_parent.style.opacity = '1';
      }
    } catch (error) {
      
    }
  };
  const isActive= (address:string) => address === route.pathname ? "active" : "";
  useEffect(() => {
    // Add the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);
    // Clean up the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return <>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha512-SfTiTlX6kk+qitfevl/7LibUOeJWlt9rbyDn92a1DqWOw9vWG2MFoays0sgObmWazO5BQPiFucnnEAjpAB+/Sw==" crossOrigin={"anonymous"} referrerPolicy="no-referrer" />
     <div className="sticky bg-logo">
         <nav>
        <span className="Elegant" id="logo">Elegant</span>
        <ul>
            <li className={isActive('/')}><Link href={'/'}>Ürünler</Link></li>
            <li className={isActive('/hakkimizda')}><Link href={'/hakkimizda'}>Hakkımızda</Link></li>
            <li className={isActive('/projeler')}><Link href={'/projeler'}>Projeler</Link></li>
            <li className={isActive('/bize-ulasin')}><Link href={'/bize-ulasin'}>Bize Ulaşın</Link></li>
        </ul>
    </nav>
    </div>
   
    <div className="sequare">
            
    </div>
    <div className="banner" style={{backgroundImage:`url(${BackGroundImage()})`}}>
      {/* <img src={BackGroundImage()} alt="" style={{width:"100%", height:"100%", borderRadius:"10px"}}/> */}
    </div>
    </>
};

export default Header;
