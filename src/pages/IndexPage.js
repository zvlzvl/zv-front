import React, {useEffect, useState} from 'react';

import bit from "../assets/baltic_talents_academy_logo.jpg";
import codeAcademy from "../assets/codeacademylt_logo.jpeg";
import ku from "../assets/klaipeda_university_logo.jpg";

import Projects from "../components/Projects";
import Skills from '../components/Skills';
import Experience from '../components/Experience'; // Import the Experience component

const IndexPage = () => {


    return (
        <main class="bg-primary ">
            {/* <!-- HERO --> */}
            <section className="px-4 mx-auto  text-primary-content pt-28" id="about">
                <div className="flex flex-col w-full px-6 mx-auto max-w-[1150px]">
                    <h4 className="text-4xl italic font-medium tracking-[7px] leading-[1.05em] my-3">Živilė Vibrė</h4>
                    <div className="bg-secondary w-[270px] h-[3px] mb-4"></div>
                    <h1 className="flex flex-col">
                        <div className="flex items-end gap-3">
                            <div className="text-4xl font-thin md:text-6xl">Full stack</div>
                            <div className="hidden text-4xl font-medium sm:flex md:text-6xl"> Programuotoja </div>
                        </div>
                        <div className="text-4xl font-medium sm:hidden"> Programuotoja </div>
                        <div className="mt-2 text-3xl font-light md:text-4xl">jaunesnioji-vidutinio lygio</div>

                    </h1>
                    <p className="mt-4 text-lg">
                        Esu jaunesnioji programuotoja. Prieš 3 metus atradau IT sritį ir buvau labai
                        maloniai nustebinta kaip ji mane užvaldė. Norėčiau Labai padėkoti už įkvėpimą pasukti IT keliu
                        WomenGotech projektui, už pradinių žinių bei įgūdžių bagažą Baltijos technologijų
                        intituto ir Code academy dėstytojams, bei pirmam darbdaviui integravusiam mane į "tikrą programavimo pasaulį"
                        MB Suavis vadovui Aidui B.
                    </p>

                </div>
            </section>

            {/* EDUCATION*/}
            <section className="w-full dark-right-up" id="education"></section>
            <section className="w-full py-6 bg-primary-content text-primary" >
                <div className="px-6 mx-auto max-w-[1150px]">
                    <div className="pb-8 text-center">
                        <h2 className="relative inline-block mx-auto text-5xl font-medium transition-all duration-300 text-primary group">Išsilavinimas
                            <span className="absolute left-[33%] top-[116%] w-[33%] h-[3px] bg-secondary transition-all duration-300 "></span>
                        </h2>
                    </div>

                    <div className='flex flex-wrap pt-6'>
                        <div className="w-full px-2 mb-6 md:w-1/2">
                            <div className="flex items-center mb-4 title">
                                <img className='rounded-lg' height="auto" width="70px" src={bit} alt="Baltijos Technologijų Institutas Logo" />
                                <h3 className="ml-4 text-xl font-semibold">Baltijos Technologijų Institutas</h3>
                            </div>
                            <h4 className="text-xl italic tracking-[0.5px]">2021 01 - 2021 06 5,5 mėn. Žiniatinklio programuotojo modulinė profesinio mokymo programa LTKS IV</h4>
                            <h5 className="mt-3 text-xl font-bold">Įgyti įgūdžiai/kompetencijos:</h5>
                            <p className="mt-2">
                                Taikyti objektinio programavimo technologiją, kuriant internetinius puslapius tam pritaikyta programavimo kalba. Projektuoti, kurti ir administruoti internetinius puslapius. Kurti ir vykdyti nesudėtingus tinklalapių testavimo atvejus.
                            </p>
                            <div className="flex flex-col mt-2">
                                <div>
                                    <span className='font-bold'>Frontend programavimas: </span> HMTL, CSS, Javascript</div>
                                <div><span className='font-bold'>Objektinis programavimas: </span> Java</div>
                                <div><span className='font-bold'> Backend programavimas: </span> PHP (Laravel) CRUD operacijos, Duomenų bazės (MySQL)</div>
                            </div>
                        </div>

                        <div className="w-full px-2 mb-6 md:w-1/2">
                            <div className="flex items-center mb-4 title">
                                <img className='rounded-lg' height="auto" width="70px" src={codeAcademy} alt="Code Academy Logo" />
                                <h3 className="ml-4 text-xl font-semibold">Code Academy (UAB "Programuok")</h3>
                            </div>
                            <h4 className="text-xl italic tracking-[0.5px]">2024 09 - 2025 04 1088 valandų Jaunesniojo Front-end TypeScript programuotojo ir dirbtinio intelekto kompetencijų programa</h4>
                            <h5 className="mt-3 text-xl font-bold">Įgyti įgūdžiai/kompetencijos:</h5>
                            <p className="mt-2">
                                Visapusiški įgūdžiai Frontend ir Backend kūrimui naudojant Javascript ir TypeScript. Interaktyvaus interneto dizaino, statinių svetainių, interaktyvių žiniatinklio programų, paprastų žaidimų kūrimo įgūdžiai.
                            </p>
                            <div className="flex flex-col mt-2">
                                <div><span className='font-bold'>Frontend programavimas: </span> HMTL, CSS, Javascript, Typescript, DOM manipuliavimas, React.js karkaso konceptai.</div>
                                <div><span className='font-bold'>Backend programavimas: </span> Node.js, npm, Express.js, Rest API pagrindai, Socket.io, serverio kūrimas bei CRUD operacijos, Duomenų bazės (MongoDB).</div>
                            </div>
                        </div>

                        <div className="w-full px-2 mb-6 ">
                            <div className="flex items-center mb-4 grow title">
                                <img className='rounded-lg' height="auto" width="70px" src={ku} alt="Klaipėdos Universitetas Logo" />
                                <h3 className="ml-4 text-xl font-semibold">Klaipėdos Universitetas</h3>
                            </div>
                            <h4 className="text-xl italic tracking-[0.5px]">2002 - 2006 Vadybos ir verslo administravimo bakalauras</h4>
                            <h5 className="mt-3 text-xl font-bold">Įgyti įgūdžiai/kompetencijos:</h5>
                            <p className="mt-2">
                                Įgytos kognityvinės, funkcinės, asmeninės ir etinės kompetencijos bei įgūdžiai gebėti demonstruoti vadybos metodų bei priemonių taikymą nuolat kintančioje aplinkoje dirbant žemiausios ir vidutinės grandies vadovais bet kurioje verslo organizacijoje.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* WORK & SKILLS */}
            <section className="w-full dark-right-down" id="work"></section>
            <section className="py-6 bg-primary text-primary-content" >
                <div className="flex flex-col gap-10 px-6 mx-auto md:flex-row max-w-[1150px]">
                    <Experience />
                    <Skills />
                </div>

            </section>
            <section className="w-full dark-right-up" id="projects"></section>
           
            {/* PROJECTS */}
            <Projects />

            <section className="w-full dark-right-down"></section>
            {/* CONTACTS */}
            <section className="py-6 bg-primary text-primary-content" id="contacts">
                <div className="flex flex-col justify-center px-6 mx-auto max-w-[1150px]">
                    <div className="text-center ">
                        <h2 className="relative inline-block mx-auto text-5xl font-medium transition-all duration-300 text-primary-content group">Susisiekime
                            <span className="absolute left-[33%] top-[116%] w-[33%] h-[3px] bg-secondary transition-all duration-300 "></span>
                        </h2>
                    </div>
                    <p className='mt-10 text-3xl text-center'>
                        Pasidalinkite savo lūkesčiais bei idėjomis ir aš
                        mielai prisidėsiu prie jų įgyvendinimo. </p>
                    <p className='mt-6 text-6xl text-center tracking-[2px] caveat'>to<span className='text-7xl text-secondary' >@</span>zivile.dev</p>
                </div>
            </section>

        </main >

    );
};

export default IndexPage;
