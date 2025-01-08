"use client"

import { useState , useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import PartialListing from '@/components/PartialListing'
import { Loader } from '@/components/Loader'
import FixedNavbar from '@/components/FixedNavbar'


interface Listing {
  listing:{
    id: string
    title: string
    image_urls: string[] 
    price : string
    category : string
    looking_for : boolean
    min_price : string 
    address : string 
    location: string
    sq_ft: string 
    type : string 
    rental_frequency : string  
    no_of_bedrooms: string  
    no_of_bathrooms: string 
    furnished : string 
    city : string
    created_at: string
    amenities : string[]
  }
  broker: {
    id: string
    name: string
    profile_pic: string
  }
  
  company : {
    name: string
  }
}


export default function Page() {
  const params = useParams(); 

  const id = params.id; 
  
  const[listing , setListing] = useState<Listing | undefined>(); 
  const[isLoading , setIsLoading] = useState(false);


  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`, // Replace with your API key or token
    'Content-Type': 'application/json',
  };
  
  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_API;
    setIsLoading(true);
    axios.get(`${api}/listings/${id}`, { headers })
        .then((response) => {
            console.log("This is my response data ", response.data)
            setListing(response.data.data);
            setIsLoading(false);
        })
        .catch((e) => {
            console.log("Something went wrong while fetching the api", e);
        })
        .finally(() => { 
            setIsLoading(false);
        });
}, []);

  return (
    <>
    <FixedNavbar></FixedNavbar>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <PartialListing listing={listing} />
      </div>
    </div>

    {isLoading && <Loader size="lg" />}
    </>
  )
}