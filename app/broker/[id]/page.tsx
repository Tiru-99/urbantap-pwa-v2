"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState , useEffect} from "react"
import FixedNavbar from "@/components/FixedNavbar";
import { useParams } from "next/navigation";
import { formatMonthsToYearsAndMonths , getInitials } from "@/app/utils/utils";
import { Loader } from "@/components/Loader";


interface Broker {
    id: string;
    name: string;
    email: string;
    info: string;
    y_o_e: number; // years of experience
    languages: string[];
    is_certified: boolean;
    profile_pic: string;
    country_code: string;
    w_number: string;
    ig_link: string;
    linkedin_link: string;
    designation: string;
    company_id: string;
    user_id: string;
  }
  
  interface Company {
    id: string;
    name: string;
    description: string;
    logo: string;
  }
  

export default function Broker(){

      
    const[broker , setBroker] = useState<Broker>(); 
    const[company , setCompany] = useState<Company>(); 
    const[readMore , setReadMore] = useState<boolean>(true)
    const[isLoading , setIsLoading] = useState<boolean>(false)
    const params = useParams();
    const id = params.id ; 


    const headers = {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`, // Replace with your API key or token
        'Content-Type': 'application/json',
      };

    useEffect(()=>{
        const api = process.env.NEXT_PUBLIC_API; 
            setIsLoading(true)
            axios.get(`${api}/brokers/${id}` , { headers })
            .then((response)=>{
                //set broker data 
                setBroker(response.data.data.broker);
                //set company data 
                setCompany(response.data.data.company);
                setIsLoading(false);
            }).catch((e)=>{
                console.log("Something went wrong while fetching data" , e)
            }).finally(()=>
                setIsLoading(false)
            )

    },[])

    const[clicked, setClicked] = useState(false); 

    return(
        <>
            <FixedNavbar></FixedNavbar>

            <div className="max-w-md mx-auto bg-white min-h-screen p-4">
                <div className="justify-center items-center mt-6">
                    <div className="flex justify-left gap-4">
                        {/*Name and avatar section */}
                        <div>
                            <Avatar className="h-24 w-24">
                                {broker?.profile_pic ? (
                                 <img src={broker.profile_pic}></img>) :(
                                    <AvatarFallback>{getInitials(broker?.name)}</AvatarFallback>
                                 )}
                                
                            </Avatar>
                        </div>

                        <div className="flex flex-col justify-center">
                            <h3 className="font-bold text-2xl">{broker?.name}</h3>
                            <p className="flex-wrap text-gray-600 font-light">{company?.description}</p>
                        </div>
                    </div>
                </div>
                
                {/* Lock Icon Section  */}
                <div className="max-w-sm p-4 mt-4 border-2 border-dashed border-gray-300 rounded-lg bg-white">
                    <div className="flex flex-col items-center gap-4">
                        {/* Lock icon - replace src with your actual lock image */}
                        <img
                        src="/assets/img/lock.png"
                        alt="Lock icon"
                        className="w-8 h-8"
                        />
                        <p className="text-center text-gray-800 font-medium">
                        Unlock info by downloading the app
                        </p>
                    </div>
                </div>

                {/* Profile Info and Property Listings Switch Bar */}
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

                {/* See More */}
                {clicked === false ? (
                    <div className="mt-6">
                        { broker?.y_o_e && (
                            <>
                                <h2 className="font-bold text-lg">Total Years of Experience</h2>
                                <p className="font-normal">{formatMonthsToYearsAndMonths(broker?.y_o_e)}</p>
                            </>)
                        }

                        { company && <div className="flex flex-col mt-6 gap-6 border-b-2 pb-10">                            
                                <div className="flex gap-6">
                                    <div className="w-16 flex justify-center items-center">
                                    <div className="w-16 h-16">
                                        {company?.logo ? (
                                            <img src="/assets/img/instagram.png" className="w-full h-full object-cover" alt="Company Logo" />
                                        ) : (
                                            <span className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                                                {getInitials(company?.name)}
                                            </span>
                                        )}
                                    </div>

                                    </div>

                                    <div className="flex flex-col justify-center">
                                        <p className="text-md">{company?.name}</p>
                                        <p className="text-sm text-gray-500">{formatMonthsToYearsAndMonths(broker?.y_o_e)}</p>
                                    </div>
                                </div>
                        </div>}

                        {/* Profile Info */}
                        <div className="border-b-2 pb-5">
                            <h2 className="font-bold text-xl pt-3">Profile Info</h2>
                            <p className="pt-3 text-sm">{readMore || ( broker?.info && broker?.info.length < 100)  ? `${broker?.info.slice(0 ,90)}` : broker?.info}</p>
                            <p className="pt-2 text-md"> {broker?.info && broker?.info.length > 100 && (<span className="cursor-pointer font-bold" onClick={()=>(setReadMore((prevState)=>!prevState))}>{readMore === true ? "Read More" : "Read Less"}</span>) } </p>
                        </div>

                        <div className="mt-3 ">
                            <h3 className="font-bold text-xl pt-3">Languages Spoken</h3>
                        </div>

                        <div className="flex gap-3 flex-wrap mt-2 border-b-2 pb-6">
                            {broker?.languages.map((language , index)=>(
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
                                    <div className="text-gray-900">{broker?.country_code} {broker?.w_number}</div>
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
                                    <div className="text-gray-900">{broker?.email}</div>
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
                                    <div className="text-gray-900">{broker?.ig_link}</div>
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
                                    <div className="text-gray-900">{broker?.w_number}</div>
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
                                    <div className="text-gray-900">{broker?.linkedin_link}</div>
                                </div>
                                </div>
                            </div>
                        </div>
                        

                    </div>
                ) : (
                    // Broker Listings Blurred and Lock Component
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
            {isLoading && <Loader size="lg" />}
        </>
    )
}