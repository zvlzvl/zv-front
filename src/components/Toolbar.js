
import {useState, useEffect, useRef} from "react";


import logo from "../assets/zlogo.png";

const Toolbar = () => {
    const [open, setOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (open) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
        const handleScroll = () => {
            // When scrolling past 100px from top, add 'active' class
            if (window.scrollY > 100) {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        };

        // Event listener for scroll
        window.addEventListener('scroll', handleScroll);

        // Clean up event listener on component unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, [open]);



    const scrollAnimate = (targetHash) => {
        setTimeout(() => {
            if (targetHash !== "none") {
                window.history.replaceState(null, null, targetHash);
            }
        }
        )
    };

    

return (
    <div className="fixed top-0 z-50 w-full">
        <div className={`xs:px-6 border-b border-primary-content backdrop-blur-xl  ${isActive
            ? 'bg-white/80 backdrop-blur-sm backdrop-filter'
            : 'bg-primary'
            }`}>
            <div className="mx-auto max-w-[1150px]">
                <nav className="flex items-center justify-between p-4">
                    {/* Logo Section */}
                    <a href="/#about" onClick={() => scrollAnimate("#about")}>
                        <img
                            className="transition-transform w-28 hover:scale-110"
                            src={logo}
                            alt="Logo"
                        />
                    </a>                        {/* Desktop */}
                    <div className="hidden space-x-1 tracking-wider text-primary-content md:flex">

                        <a href="/#education"
                            onClick={() => scrollAnimate("#education")}
                            className="px-4 py-1.5 text-lg font-bold transition-all duration-300 border-2 rounded-full group border-transparent hover:border-secondary">
                            Išsilavinimas
                        </a>
                        <a href="/#work"
                            onClick={() => scrollAnimate("#work")}
                            className="px-4 py-1.5 text-lg font-bold transition-all duration-300 border-2 rounded-full group border-transparent hover:border-secondary">
                            Patirtis
                        </a>
                        <a href="/#projects"
                            onClick={() => scrollAnimate("#projects")}
                            className="px-4 py-1.5 text-lg font-bold transition-all duration-300 border-2 rounded-full group border-transparent hover:border-secondary">
                            Projektai
                        </a>
                        <a href="/#contacts"
                            onClick={() => scrollAnimate("#contacts")}
                            className="px-4 py-1.5 text-lg font-bold transition-all duration-300 border-2 rounded-full group border-transparent hover:border-secondary">
                            Kontaktai
                        </a>
                        <a href="/CV_Zivile_Vibre.pdf" download
                            className="text-secondary px-4 py-1.5 rounded-full text-lg font-bold transition-all duration-300 group hover:bg-secondary hover:text-primary">
                            <div class="flex items-center justify-center gap-1">
                                CV
                                <svg stroke="currentColor" fill="currentColor" className="" width="16px" height="16px" viewBox="0 0 29.978 29.978" preserveAspectRatio="xMidYMid">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                    <g id="SVGRepo_iconCarrier"><g>
                                        <path d="M25.462,19.105v6.848H4.515v-6.848H0.489v8.861c0,1.111,0.9,2.012,2.016,2.012h24.967c1.115,0,2.016-0.9,2.016-2.012 v-8.861H25.462z"></path> <path d="M14.62,18.426l-5.764-6.965c0,0-0.877-0.828,0.074-0.828s3.248,0,3.248,0s0-0.557,0-1.416c0-2.449,0-6.906,0-8.723 c0,0-0.129-0.494,0.615-0.494c0.75,0,4.035,0,4.572,0c0.536,0,0.524,0.416,0.524,0.416c0,1.762,0,6.373,0,8.742 c0,0.768,0,1.266,0,1.266s1.842,0,2.998,0c1.154,0,0.285,0.867,0.285,0.867s-4.904,6.51-5.588,7.193 C15.092,18.979,14.62,18.426,14.62,18.426z"></path>
                                    </g>
                                    </g>
                                </svg>
                              
                            </div>
                        </a>
                    </div>

                    {/* Mobile */}
                    <button onClick={() => setOpen(!open)} className="p-2 text-primary-content md:hidden">
                        {open ? (
                            <svg className="w-6 h-6" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </nav>

                {/* Mobile Dropdown Menu */}
                {open && (
                    <div className="p-4 space-y-3 md:hidden rounded-b-2xl">

                        <a onClick={() => setOpen(false)} href="#education"
                            className="block pb-2 m-1 font-medium border-2 border-transparent rounded-sm text-primary-content md:p-0 hover:border-b-secondary">
                            Išsilavinimas
                        </a>
                        <a onClick={() => setOpen(false)} href="#work"
                            className="block pb-2 m-1 font-medium border-2 border-transparent rounded-sm text-primary-content md:p-0 hover:border-b-secondary">
                            Patirtis
                        </a>
                        <a onClick={() => setOpen(false)} href="#projects"
                            className="block pb-2 m-1 font-medium border-2 border-transparent rounded-sm text-primary-content md:p-0 hover:border-b-secondary">
                            Projektai
                        </a>
                        <a onClick={() => setOpen(false)} href="#contacts"
                            className="block pb-2 m-1 font-medium border-2 border-transparent rounded-sm text-primary-content md:p-0 hover:border-b-secondary">
                            Kontaktai
                        </a>
                        <a onClick={() => setOpen(false)} href="/CV_Zivile_Vibre.pdf" download
                            className="px-4  text-lg font-bold transition-all duration-300 cursor-pointer text-secondary group  w-[100px] ">
                            <div class="flex items-center gap-1">
                                CV
                                <svg stroke="currentColor" fill="currentColor" className="" width="16px" height="16px" viewBox="0 0 29.978 29.978" preserveAspectRatio="xMidYMid">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                    <g id="SVGRepo_iconCarrier"><g>
                                        <path d="M25.462,19.105v6.848H4.515v-6.848H0.489v8.861c0,1.111,0.9,2.012,2.016,2.012h24.967c1.115,0,2.016-0.9,2.016-2.012 v-8.861H25.462z"></path> <path d="M14.62,18.426l-5.764-6.965c0,0-0.877-0.828,0.074-0.828s3.248,0,3.248,0s0-0.557,0-1.416c0-2.449,0-6.906,0-8.723 c0,0-0.129-0.494,0.615-0.494c0.75,0,4.035,0,4.572,0c0.536,0,0.524,0.416,0.524,0.416c0,1.762,0,6.373,0,8.742 c0,0.768,0,1.266,0,1.266s1.842,0,2.998,0c1.154,0,0.285,0.867,0.285,0.867s-4.904,6.51-5.588,7.193 C15.092,18.979,14.62,18.426,14.62,18.426z"></path>
                                    </g>
                                    </g>
                                </svg>
                              
                            </div>
                        </a>
                        {/* <a onClick={() => setOpen(false)} href="/cv"
                                className="block pb-2 m-1 font-medium border-2 border-transparent rounded-sm text-primary-content md:p-0 hover:border-b-secondary">
                                CV
                            </a> */}
                    </div>
                )}
            </div>
        </div>


    </div>
);
};

export default Toolbar;
