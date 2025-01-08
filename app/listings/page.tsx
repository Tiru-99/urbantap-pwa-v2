"use client"
import { useState , useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link'
import { MapPin, Home, Bath, Expand } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import FixedNavbar from '@/components/FixedNavbar'
import { getBedroomDisplay , getBathrooms , createTitleForListing , timeAgo , getInitials } from '../utils/utils'
import { Loader } from '@/components/Loader'


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
    sq_ft: string , 
    no_of_bedrooms: string , 
    no_of_bathrooms: string ,
    created_at: string,
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


export default function PropertyListings() {


    //const [showDownloadPrompt, setShowDownloadPrompt] = useState(false)
    const[listings , setListings] = useState<Listing[]>([]); 
    const[isLoading , setIsLoading] = useState(false);

    console.log("This is my Listings" , listings)

    const headers = {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        'Content-Type': 'application/json',
      };

      useEffect(() => {
        const fetchListings = async () => {
          const api = process.env.NEXT_PUBLIC_API;
          setIsLoading(true);
      
          try {
            const response = await axios.get(`${api}/listings`, { headers });
            
            if (Array.isArray(response.data.data)) {
              const reversedListings = [...response.data.data].reverse();
              console.log("This is my reversed Listing:", reversedListings);
              setListings(reversedListings);
            }
          } catch (error) {
            console.error("Something went wrong while fetching the api:", error);
          } finally {
            setIsLoading(false);
          }
        };
      
        fetchListings();
      }, []);
    
      
     const [expandedStates, setExpandedStates] = useState<Record<string, boolean>>({});

      function toggleExpanded(listingId: string) {
          setExpandedStates(prev => ({
          ...prev,
          [listingId]: !prev[listingId]
          }));
      }
      

    return (
      <>
      <FixedNavbar></FixedNavbar>
      <div className="container mx-auto md:px-4 py-6 max-w-5xl bg-white">
      {/* Header */}
      
      {isLoading && <Loader size="lg" />}

      {/* Listings */}
      <div className="space-y-8">
        {listings.slice(0,6).map((listing, index) => (
          <div 
            key={listing.listing.id} 
            className={cn(
              "max-w-3xl mx-auto bg-white border-b-8 border-gray-100",
              index === 5 && "relative"
            )}
          >
            {/* if listing index is five , then blur that listing and show download the app button */}
            {index === 5 && (
              <div className="absolute inset-0 z-10 backdrop-blur-sm bg-background/80 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Want to see more listings?</h3>
                <p className="text-muted-foreground mb-4">Download our app to explore all available properties</p>
                <Button className="w-full max-w-sm">
                  Download App
                </Button>
              </div>
            )}
            
            {/* Profile Pic */}
            <div className="flex justify-between px-4 py-4">
              <div className="flex gap-3">
                <Avatar className="w-10 h-10">
                  {listing.broker.profile_pic ? (
                    <img src={listing.broker.profile_pic}></img>
                  ):(
                    <AvatarFallback>
                        {getInitials(listing.broker.name)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col justify-center">
                  <h3 className="font-semibold text-sm">{listing.broker.name}</h3>
                  <p className="text-sm text-muted-foreground">{listing.company.name}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{timeAgo(listing.listing.created_at)}</p>
            </div>
            
            {/* Listings deatils and see more section */}
            <div className="px-4 pb-3">
              <Link href={`/partial/${listing.listing.id}`}><h2 className="text-sm font-semibold">{createTitleForListing(listing.listing.looking_for , listing.listing.category)}</h2></Link>
              <p className="text-sm text-muted-foreground mt-1">
                    {listing.listing.title && (
                    <>
                        {expandedStates[listing.listing.id] 
                        ? listing.listing.title 
                        : listing.listing.title.slice(0, 80)}
                        {listing.listing.title.length > 80 && (
                        <span
                            className="text-gray-600 font-bold cursor-pointer"
                            onClick={() => toggleExpanded(listing.listing.id)}
                        >
                            {expandedStates[listing.listing.id] ? " ...Read Less" : " ...Read More"}
                        </span>
                        )}
                    </>
                    )}
                </p>
            </div>

            {/* Listing Image Section */}
           {listing.listing.image_urls && listing.listing.image_urls.length > 0 && <div>
                <div className="w-full md:h-[400px] h-[200px] relative px-4 md:px-0">
                    <img 
                        src={listing.listing.image_urls[0]}
                        alt={listing.listing.title}
                        className="w-full h-full object-cover rounded-t-lg"
                    />
                    </div>

                    <div className="bg-blue-50 px-4 mx-4 md:mx-0 py-3 rounded-b-xl">
                    <p className="font-semibold text-lg">Budget: {listing.listing.min_price} AED</p>
                    <div className="flex items-center gap-2 mt-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{listing.listing.address}</p>
                    </div>
                    </div>
                </div>
            }

            {/* Key features with logos */}
            <div className="px-4 py-3 flex items-center justify-between mx-4 ">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{getBedroomDisplay(listing.listing.no_of_bedrooms)} BHK</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{getBathrooms(listing.listing.no_of_bathrooms)} Bath</span>
              </div>
              <div className="flex items-center gap-2">
                <Expand className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{listing.listing.sq_ft} sq.ft</span>
              </div>
            </div>

            {/* Share , Enquire and Call Button */}
            <div className="grid grid-cols-3 p-4 border-t">
              <button className="flex items-center justify-center gap-2 py-2.5 px-4 text-gray-600 bg-white rounded-none hover:bg-gray-100 text-sm font-medium border-r-2 border-gray-200 last:border-none">
                <img className="h-5 w-5" src="/assets/call-calling.png" alt="Call icon" />
                Call
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 px-4 text-gray-600 hover:bg-gray-100 bg-white rounded-none text-sm font-medium border-r-2 border-gray-200 last:border-none">
                <img className="h-5 w-5" src="/assets/send-2.png" alt="Enquire icon" />
                Inquire
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 px-4 text-gray-600 bg-white hover:bg-gray-50 rounded-lg text-sm font-medium">
                <img className="h-5 w-5" src="/assets/Share.png" alt="Share icon" />
                Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
    )
  }

