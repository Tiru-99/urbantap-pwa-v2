"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { useState } from "react"
import FixedNavbar from "@/components/FixedNavbar";

interface ExperienceProps {
    img : string; 
    companyName : string; 
    time : string; 
    timePeriod : string;
}

export default function Broker(){

    const paragraph = "I am a dedicated and results-oriented real estate agent passionate about helping clients find their dream homes and make sound investments. With a strong understanding of the property market and a keen eye for detail, I strive to provide personalized services tailored to each client's unique needs. Whether you're buying, selling, or investing, I ensure the process is seamless and stress-free by offering expert guidance and market insights. I take pride in building lasting relationships based on trust, transparency, and a genuine commitment to achieving the best outcomes. Beyond work, I enjoy exploring architecture, staying updated on market trends, and connecting with people from all walks of life. My mission is to turn your real estate goals into a reality while delivering an exceptional experience every step of the way."

    const languages = ["English" , "Arabic" , "Hindi"];
    const[readMore , setReadMore] = useState(true);

    const Experience : ExperienceProps[] = [
        {
            img : "/assets/bedroom.jpg",
            companyName : "Sobha Realty",
            time : "Dec 23 - Present",
            timePeriod : "5 months"
        },
        {
            img : "/assets/bedroom.jpg",
            companyName : "Sobha Realty",
            time : "Dec 23 - Present",
            timePeriod : "5 months"
        }, 
        {
            img : "/assets/bedroom.jpg",
            companyName : "Sobha Realty",
            time : "Dec 23 - Present",
            timePeriod : "5 months"
        }
    ]
    const[clicked, setClicked] = useState(false); 
    return(
        <>
            <FixedNavbar></FixedNavbar>    
            <div className="max-w-md mx-auto bg-white min-h-screen p-4">
                {/* <h2 className="font-bold text-xl text-center">Broker Details</h2> */}
                <div className="justify-center items-center mt-6">
                    <div className="flex justify-left gap-4">
                        <div>
                            <Avatar className="h-24 w-24">
                                <AvatarFallback>OF</AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="flex flex-col justify-center">
                            <h3 className="font-bold text-2xl">Omar Faizan</h3>
                            <p className="flex-wrap text-gray-600 font-light">Real Estate Agent at Sobha Realty</p>
                        </div>
                    </div>
                </div>


                <div className="bg-gray-100 flex justify-center items-center rounded-md p-1 mt-8 text-sm">
                    <div className={`text-center ${clicked === false ? 'bg-emerald-500' :''} w-full py-2 font-semibold rounded-md cursor-pointer`}
                    onClick={()=>(setClicked((prevState)=>!prevState))}>
                        Profile Info
                    </div>

                    <div className={`text-center ${clicked === true ? 'bg-emerald-500' :''} w-full py-2 font-semibold rounded-md cursor-pointer`}
                    onClick={()=>(setClicked((prevState)=>!prevState))}>
                        Property Listings
                    </div>  
                </div>

                {clicked === false ? (
                    <div className="mt-6">
                        <h2 className="font-bold text-lg">Total Years of Experience</h2>
                        <p className="font-normal">12 Years 3 Months</p>

                        <div className="flex flex-col mt-6 gap-6 border-b-2 pb-10">
                            {Experience.map((exp , index)=>(
                                <div key={index} className="flex gap-6">
                                    <div className="w-16 flex justify-center items-center">
                                        <img src={exp.img} className="rounded-md h-auto"></img>
                                    </div>

                                    <div className="flex flex-col justify-center">
                                        <p className="text-md">{exp.companyName}</p>
                                        <p className="text-sm text-gray-500">{exp.time} : {exp.timePeriod}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-b-2 pb-5">
                            <h2 className="font-bold text-xl pt-3">Profile Info</h2>
                            <p className="pt-3 text-sm">{readMore || paragraph.length < 100  ? `${paragraph.slice(0 ,90)}...` : paragraph}</p>
                            <p className="pt-2 text-md"> {paragraph.length > 100 && (<span className="cursor-pointer font-bold" onClick={()=>(setReadMore((prevState)=>!prevState))}>{readMore === true ? "Read More" : "Read Less"}</span>) } </p>
                        </div>

                        <div className="mt-3 ">
                            <h3 className="font-bold text-xl pt-3">Languages Spoken</h3>
                        </div>

                        <div className="flex gap-3 flex-wrap mt-2 border-b-2 pb-6">
                            {languages.map((language , index)=>(
                                <div key={index} className="text-center px-4 py-2 border-black border-2 tracking-tight text-sm rounded-full hover:bg-black/5">
                                    {language}
                                </div>
                            ))}
                        </div>


                        {/* Social Media Section  */}
                        <div className="mt-5 ">
                            <h2 className="text-xl font-bold mb-6">Contact Info</h2>
                            
                            <div className="space-y-6">
                                {/* Phone */}
                                <div className="flex items-center gap-4">
                                <img 
                                    src="/assets/img/phone.png" 
                                    alt="Phone"
                                    className="w-14 h-14 rounded-xl"
                                />
                                <div>
                                    <div className="text-gray-500">Phone</div>
                                    <div className="text-gray-900">523644498</div>
                                </div>
                                </div>

                                {/* Mail */}
                                <div className="flex items-center gap-4">
                                <img 
                                    src="/assets/img/mail.png" 
                                    alt="Mail"
                                    className="w-14 h-14 rounded-xl"
                                />
                                <div>
                                    <div className="text-gray-500">Mail</div>
                                    <div className="text-gray-900">parves@sobha.com</div>
                                </div>
                                </div>

                                {/* Instagram */}
                                <div className="flex items-center gap-4">
                                <img 
                                    src="/assets/img/instagram.png" 
                                    alt="Instagram"
                                    className="w-14 h-14 rounded-xl"
                                />
                                <div>
                                    <div className="text-gray-500">Instagram</div>
                                    <div className="text-gray-900">@parves</div>
                                </div>
                                </div>

                                {/* WhatsApp */}
                                <div className="flex items-center gap-4">
                                <img 
                                    src="/assets/img/whatsapp.png" 
                                    alt="Whatsapp"
                                    className="w-14 h-14 rounded-xl"
                                />
                                <div>
                                    <div className="text-gray-500">Whatsapp</div>
                                    <div className="text-gray-900">523644498</div>
                                </div>
                                </div>

                                {/* LinkedIn */}
                                <div className="flex items-center gap-4">
                                <img 
                                    src="/assets/img/linkedin.png" 
                                    alt="Linkedin"
                                    className="w-14 h-14 rounded-xl"
                                />
                                <div>
                                    <div className="text-gray-500">Linkedin</div>
                                    <div className="text-gray-900">linkedin.com/omar..</div>
                                </div>
                                </div>
                            </div>
                        </div>
                        

                    </div>
                ) : (
                    <div className="p-4">
                        <div className="border-2 border-dashed border-black rounded-lg p-6">
                            {/* Blurred Area */}
                            <div className="h-48 bg-gray-100 blur-sm mb-8 rounded-lg" />

                            {/* Lock Section */}
                            <div className="flex flex-col items-center justify-center gap-4">
                            <img 
                                src="/assets/img/lock.png" 
                                alt="Lock"
                                className="w-12 h-12"
                            />
                            <p className="text-center text-gray-900 font-medium">
                                Unlock info by adding to connection
                            </p>
                            <Button className="w-full max-w-xs bg-primary">
                                Download App Now
                            </Button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </>
    )
}