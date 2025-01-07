"use client"
import Link from 'next/link'
import { useState , useEffect } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react'
import { useParams } from 'next/navigation'
import PartialListing from '@/components/PartialListing'


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
  // 
  
  const[listing , setListing] = useState<Listing | undefined>(); 
  const[isLoading , setIsLoading] = useState(false);
  console.log(isLoading);

  console.log("This is the listing data " , listing);

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-6">
          <Link href="/listings" passHref>
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              View All Listings
            </Button>
          </Link>
        </div>
        <PartialListing listing={listing} />
      </div>
    </div>
  )
}