import React, {useEffect, useRef} from 'react';

const CVPage = () => {
    const cvRef = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleDownload = () => {
        // Check if html2pdf is loaded and element exists
        if (window.html2pdf && cvRef.current) {
            const element = document.getElementById('cv-content-inner');
            // Scroll CV into view before rendering
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // or 'auto'
              });

            const opt = {
                margin: [0, 0, 0, 0],  // Explicitly set all margins to 0
                filename: 'CV_Zivile_Vibre.pdf',
                image: {type: 'jpeg', quality: 0.98},
                html2canvas: {scale: 2, useCORS: true},
                jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait'},
                pagebreak: {mode: ['avoid-all']}  // Try to avoid page breaks
            };
            // Wait for scroll to happen, then generate PDF
            setTimeout(() => {
                window.html2pdf().set(opt).from(element).save();
            },300); // Slight delay to let scroll finish
        } else {
            window.print(); // fallback
        }
    };

    return (
        <div>
            <div className="flex flex-col items-center min-h-screen px-4 pt-0 my-[100px]">
                {/* Control buttons */}


                {/* A4 Container */}
                <div
                    ref={cvRef}
                    id="cv-content-inner"
                    className="w-full max-w-4xl mx-auto my-0 bg-white"
                >
                    {/* CV Content */}
                    <div className="flex flex-col h-full p-8">
                        {/* Header */}
                        <section className="py-6 mb-3 text-center bg-primary-content">
                            <div className="pb-6 text-center ">
                                <h2 className="relative inline-block mx-auto text-4xl font-thin transition-all duration-300 text-primary group">ŽIVILĖ VIBRĖ
                                    <span className="absolute left-[33%] top-[116%] w-[33%] h-[3px] bg-secondary transition-all duration-300 "></span>
                                </h2>
                            </div>
                            <h3 className="text-lg text-primary ">FULL-STACK PROGRAMUOTOJA (jaunesnioji-vidutinio lygio)</h3>
                        </section>
                        {/* Main content - Two column layout */}
                        <div className="flex flex-col flex-grow gap-6 text-primary-content">
                            {/* Left Column */}
                            <div className="w-full space-y-4">

                                {/* Apie mane */}
                                <section className="w-full mb-4 leading-tight">
                                    <p>
                                        Esu ambicinga Jaunesnioji FULL-STACK (PHP, JavaScript) programuotoja, siekiantis vidutinio lygio, ieškanti naujų iššūkių IT srityje. Nesenai pasukau IT kryptimi.
                                        <br />Turiu 2+ metų patirtį dirbant su Laravel karkasu vidinio programavimo ("Back-end") programuotoja.
                                        Taip pat neseniai baigiau 1 088 valandų intensyvius „JavaScript“ kursus, kuriuose gilinausi į React.js, Node.js, TypeScript bei web aplikacijų kūrimą.
                                        <br />Esu atvira naujovėms, noriai mokausi ir stengius nuolat tobulėti, siekdama tapti stipria specialiste. Daugiau informacijos ir mano darbus rasite mano portfolio.
                                    </p>
                                </section>

                                {/* IT PATIRTIS */}
                                <section className="mb-4 leading-tight">
                                    <h4 className="p-0.5 pl-2 mb-2 font-light bg-gray-200">IT PATIRTIS</h4>
                                    <div class="flex justify-between">
                                        <div className="font-medium">2021 09 - 2024 01</div>
                                        <p className="w-[75%]">Jaunesnioji programuotoja, MB "Suavis"<br />Kurti bei administruoti įmonės tinklalapį traficero.com. Darbas su Laravel karkasu vidinio programavimo ("Back-end") programuotoja. Puslapio funkcionalumo kūrimas, duomenų bazių valdymas, sukurto WEB dizaino perkėlimas ir adaptavimas prie laravel karkaso.</p>
                                    </div>
                                </section>

                                {/* KT. PATIRTIS */}
                                <section className="mb-4 leading-tight">
                                    <h4 className="p-0.5 pl-2 mb-2 font-light bg-gray-200 ">KT. PATIRTIS</h4>
                                    <div class="flex justify-between">
                                        <div className="font-medium">2012 09 - 2019 10</div>
                                        <p className="w-[75%]">Projektų vadovė, UAB "Sorpo Consulting"<br />ES paramos socialinėms įmonėms projektų kūrimas, valdymas, paraiškų teikimas. Socialinių įmonių administravimas.</p>
                                    </div>
                                    <div class="flex justify-between">
                                        <div className="font-medium">2007 01 - 2011 06</div>
                                        <p className="w-[75%]">Parduotuvės vedėja, UAB "Limeta"<br />Medicinos prekių bei įrangos pardavimas.</p>
                                    </div>
                                    <div class="flex justify-between">
                                        <div className="font-medium">2005 07 - 2006 11</div>
                                        <p className="w-[75%]">Pardavimų vadybininkė, UAB "Merkurita"<br />Vilnos gaminių pardavimai.</p>
                                    </div>

                                </section>

                                <div className="flex justify-between ">
                                    {/* IŠSILAVINIMAS */}
                                    <section className="mb-4 w-[60%] leading-tight">
                                        <h4 className="p-0.5 pl-2 mb-2 font-light bg-gray-200">IŠSILAVINIMAS</h4>
                                        <div class="flex justify-between ">
                                            <div className="font-medium">2002 - 2006</div>
                                            <p className="w-[62%] "> <strong>Klaipėdos universitetas</strong><br />Vadybos ir verslo administravimo bakalauras</p>
                                        </div>
                                        <div class="flex justify-between ">
                                            <div className="font-medium">2021 01 - 2021 06</div>
                                            <p className="w-[62%] "> <strong>UAB Baltijos technologijų institutas</strong><br />Žiniatinklio programuotojas, LTKS IV</p>
                                        </div>
                                        <div class="flex justify-between ">
                                            <div className="font-medium">2024 09 - 2025 04</div>
                                            <p className="w-[62%] "> <strong>CodeAcademy</strong><br />Jaunesnysis Front-End TypeScript programuotojas</p>
                                        </div>
                                    </section>

                                    <div className='flex flex-col w-[35%] leading-tight'>
                                        {/* INTERNETE */}
                                        <section className="mb-4 ">
                                            <h4 className="p-0.5 pl-2 mb-2 font-light bg-gray-200">INTERNETE</h4>
                                            <p><strong>LinkedIn:</strong><br /> www.linkedin.com/in/zivilevibre</p>
                                            <p><strong>Portfolio:</strong><br /> https://zvlzvl.github.io/portfolio/</p>
                                        </section>
                                        {/* KONTAKTAI */}
                                        <section className="mb-4 leading-tight">
                                            <h4 className="w-full p-0.5 pl-2 mb-2 font-light bg-gray-200 ">KONTAKTAI</h4>
                                            <p>Klaipėda, Lietuva</p>
                                            <p>Tel.: +37061612424</p>
                                            <p>El. paštas: to@zivile.dev</p>
                                        </section>
                                    </div>
                                </div>

                                <div className="flex justify-between ">
                                    {/* ĮGŪDŽIAI */}
                                    <section className="mb-4 w-[60%]">
                                        <h4 className="p-0.5 pl-2 mb-2 font-light bg-gray-200">ĮGŪDŽIAI</h4>
                                        <p>PHP, PHP Pest, Laravel, WordPress, JS, TypeScript pagr., Node.js, Express, npm, Socket.io, React, MySQL, MongoDB pagr., GIT, HTML, CSS, Bootstrap, Tailwind</p>
                                    </section>
                                    {/* KALBOS */}
                                    <section className="mb-4 w-[35%]">
                                        <h4 className="p-0.5 pl-2 mb-2 font-light bg-gray-200">KALBOS</h4>
                                        <p><strong>Lietuvių:</strong> gimtoji</p>
                                        <p><strong>Anglų: </strong>
                                            supratimas – gerai, kalbėjimas – vidutiniškai</p>
                                    </section>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="flex gap-1 mb-2 print:hidden">
                    <button onClick={handleDownload}
                        className="relative inline-block px-8 py-2 mt-8 mb-10 font-medium text-sm md:text-lg text-primary-content tracking-widest bg-secondary border-2 border-secondary rounded-full overflow-hidden transition-all duration-300 ease-in-out hover:before:translate-x-full before:content-[''] before:absolute before:inset-0 before:bg-base-content before:transition-transform before:duration-500 before:z-0 hover:text-primary print:hidden">
                        <span className="relative z-10">Atsisiųsti CV</span>
                    </button>
                </div>
            </div>

        </div>
    );
}

export default CVPage;