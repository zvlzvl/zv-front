
import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

import logo from "../assets/zvpilka.png";

const Footer = () => {
    const scrollAnimate = (targetHash) => {

        setTimeout(() => {
            if (targetHash !== "none") {
                window.history.replaceState(null, null, targetHash);
            }
        }
        )
    };
    return (
        <footer className="w-full p-6 border-t bg-primary-content text-base-content border-primary">
            <div className="flex flex-col items-center justify-between w-full mx-auto max-w-[1150px]">
                {/* Logo and Navigation */}
                <div className="flex flex-col items-center justify-center w-full gap-4 px-4 pb-4 mb-4 border-b md:justify-between md:flex-row border-secondary">
                    <a href="/#about" onClick={() => scrollAnimate("#about")}>
                        <img src={logo} alt="logo" className="transition-transform h-14 hover:scale-105" />
                    </a>

                    <nav className="flex flex-col items-center space-y-2 text-lg font-medium tracking-wide md:flex-row md:space-y-0 md:space-x-1">
                        <a onClick={() => scrollAnimate("#education")} className="px-4 md:py-1.5 text-lg font-bold transition-all duration-300 border-2 rounded-full group border-transparent md:hover:border-secondary hover:underline decoration-secondary md:decoration-transparent underline-offset-8 decoration-1" href="/#education">Išsilavinimas</a>
                        <a onClick={() => scrollAnimate("#work")} className="px-4 md:py-1.5 text-lg font-bold transition-all duration-300 border-2 rounded-full group border-transparent md:hover:border-secondary hover:underline decoration-secondary md:decoration-transparent underline-offset-8 decoration-1" href="/#work">Patirtis</a>
                        <a onClick={() => scrollAnimate("#projects")} className="px-4 md:py-1.5 text-lg font-bold transition-all duration-300 border-2 rounded-full group border-transparent md:hover:border-secondary hover:underline decoration-secondary md:decoration-transparent underline-offset-8 decoration-1" href="/#projects">Projektai</a>
                        <a onClick={() => scrollAnimate("#contacts")} className="px-4 md:py-1.5 text-lg font-bold transition-all duration-300 border-2 rounded-full group border-transparent md:hover:border-secondary hover:underline decoration-secondary md:decoration-transparent underline-offset-8 decoration-1" href="/#contacts">Kontaktai</a>
                    </nav>
                </div>


                {/* Bottom Row */}
                <div className="flex flex-col items-center justify-center w-full gap-4 p-6 md:justify-between md:flex-row">
                    <span className="tracking-[2px] font-thin">2022 - 2025 © Živilė Vibrė</span>
                    <div className="flex items-center gap-4">
                        <a href="https://www.linkedin.com/in/zivilevibre" target="_blank" rel="noopener noreferrer">
                            <svg width="30" height="31"
                                className="hover:scale-110"
                                viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.6084 10.0606V10.0334C10.6028 10.0426 10.5968 10.0518 10.5908 10.0606H10.6084Z"
                                    fill="#819199" />
                                <path
                                    d="M17.3796 2.14636H2.52059C1.8094 2.14636 1.2326 2.70939 1.2326 3.40331V18.4362C1.2326 19.1298 1.8094 19.6928 2.52059 19.6928H17.3796C18.0918 19.6928 18.6686 19.1294 18.6686 18.4362V3.40331C18.6686 2.70904 18.0915 2.14636 17.3796 2.14636ZM6.51756 16.8349H3.88408V8.91192H6.51756V16.8349ZM5.201 7.8296H5.18336C4.3 7.8296 3.7285 7.22106 3.7285 6.46083C3.7285 5.68366 4.31764 5.09205 5.21828 5.09205C6.11927 5.09205 6.67349 5.68366 6.69113 6.46083C6.69113 7.22106 6.11892 7.8296 5.201 7.8296ZM16.014 16.8349H13.3805V12.5953C13.3805 11.5306 12.9995 10.8039 12.0466 10.8039C11.3192 10.8039 10.886 11.2939 10.6951 11.7673C10.6257 11.9363 10.6087 12.1726 10.6087 12.4097V16.8346H7.97524C7.97524 16.8346 8.00981 9.65417 7.97524 8.91157H10.6087V10.0331C10.9587 9.4933 11.5845 8.7246 12.9826 8.7246C14.715 8.7246 16.0143 9.85737 16.0143 12.2912V16.8349H16.014Z"
                                    fill="#dcdcdc" />
                            </svg>
                        </a>
                        <a href="https://www.github.com/zvlzvl" target="_blank" rel="noopener noreferrer">
                            <svg width="30" height="30" viewBox="0 -3.5 256 256" className="hover:scale-110" xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="xMinYMin meet">
                                <g fill="#dcdcdc">
                                    <path
                                        d="M127.505 0C57.095 0 0 57.085 0 127.505c0 56.336 36.534 104.13 87.196 120.99 6.372 1.18 8.712-2.766 8.712-6.134 0-3.04-.119-13.085-.173-23.739-35.473 7.713-42.958-15.044-42.958-15.044-5.8-14.738-14.157-18.656-14.157-18.656-11.568-7.914.872-7.752.872-7.752 12.804.9 19.546 13.14 19.546 13.14 11.372 19.493 29.828 13.857 37.104 10.6 1.144-8.242 4.449-13.866 8.095-17.05-28.32-3.225-58.092-14.158-58.092-63.014 0-13.92 4.981-25.295 13.138-34.224-1.324-3.212-5.688-16.18 1.235-33.743 0 0 10.707-3.427 35.073 13.07 10.17-2.826 21.078-4.242 31.914-4.29 10.836.048 21.752 1.464 31.942 4.29 24.337-16.497 35.029-13.07 35.029-13.07 6.94 17.563 2.574 30.531 1.25 33.743 8.175 8.929 13.122 20.303 13.122 34.224 0 48.972-29.828 59.756-58.22 62.912 4.573 3.957 8.648 11.717 8.648 23.612 0 17.06-.148 30.791-.148 34.991 0 3.393 2.295 7.369 8.759 6.117 50.634-16.879 87.122-64.656 87.122-120.973C255.009 57.085 197.922 0 127.505 0" />
                                    <path
                                        d="M47.755 181.634c-.28.633-1.278.823-2.185.389-.925-.416-1.445-1.28-1.145-1.916.275-.652 1.273-.834 2.196-.396.927.415 1.455 1.287 1.134 1.923M54.027 187.23c-.608.564-1.797.302-2.604-.589-.834-.889-.99-2.077-.373-2.65.627-.563 1.78-.3 2.616.59.834.899.996 2.08.36 2.65M58.33 194.39c-.782.543-2.06.034-2.849-1.1-.781-1.133-.781-2.493.017-3.038.792-.545 2.05-.055 2.85 1.07.78 1.153.78 2.513-.019 3.069M65.606 202.683c-.699.77-2.187.564-3.277-.488-1.114-1.028-1.425-2.487-.724-3.258.707-.772 2.204-.555 3.302.488 1.107 1.026 1.445 2.496.7 3.258M75.01 205.483c-.307.998-1.741 1.452-3.185 1.028-1.442-.437-2.386-1.607-2.095-2.616.3-1.005 1.74-1.478 3.195-1.024 1.44.435 2.386 1.596 2.086 2.612M85.714 206.67c.036 1.052-1.189 1.924-2.705 1.943-1.525.033-2.758-.818-2.774-1.852 0-1.062 1.197-1.926 2.721-1.951 1.516-.03 2.758.815 2.758 1.86M96.228 206.267c.182 1.026-.872 2.08-2.377 2.36-1.48.27-2.85-.363-3.039-1.38-.184-1.052.89-2.105 2.367-2.378 1.508-.262 2.857.355 3.049 1.398" />
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>


    )


};



export default Footer;