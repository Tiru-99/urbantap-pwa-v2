"use client"
import { useState , useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link'
import { MapPin, Home, Bath, Expand } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import FixedNavbar from '@/components/FixedNavbar'
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
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`, // Replace with your API key or token
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
    
    //helper functions
    function timeAgo(isoDateString: string): string {
        const now = new Date();
        const inputDate = new Date(isoDateString);
      
        if (isNaN(inputDate.getTime())) {
          throw new Error('Invalid ISO date string');
        }
      
        const diffInMs = now.getTime() - inputDate.getTime();
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInMonths = Math.floor(diffInDays / 30);
        const diffInYears = Math.floor(diffInDays / 365);
      
        if (diffInYears > 0) {
          return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
        }
        if (diffInMonths > 0) {
          return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
        }
        if (diffInDays > 0) {
          return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
        }
        if (diffInHours > 0) {
          return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
        }
        if (diffInMinutes > 0) {
          return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
        }
        return 'just now';
      }

      //function to parse no of bedrooms to frontend
      function getBedroomDisplay(bedroom : string){
        if(bedroom === "Studio"){
            return "Studio"
        }
        else if(bedroom === "One"){
            return "1"
        }
        else if(bedroom === "Two"){
            return "2"
        }
        else if(bedroom === "Three"){
            return "3"
        }
        else if(bedroom === "Four_Plus"){
            return "4+"
        }
        else{
            return "null"
        }
      }

      function getBathrooms(bathroom : string){
        if(bathroom === 'One'){
            return "1"
        }
        else if(bathroom === 'Two'){
            return "2"
        }
        else if(bathroom === 'Three_Plus'){
            return "3+"
        }
        else{
            return "null"
        }
      }

      // to get avatar initials in case the user image is not present
      const getInitials = (name: string) => {
        const nameParts = name.split(' ');
        const initials = nameParts
          .map(part => part.charAt(0).toUpperCase())
          .join('');
        return initials;
      };

      const createTitleForListing = (looking_for: boolean, category: string) => {
        const formattedCategory = category.toLowerCase().replace(/_/g, " "); // Convert to lowercase and replace underscores
        if (looking_for === false) {
          return `Selling ${formattedCategory}`;
        } else {
          return `Looking for ${formattedCategory}`;
        }
      };

     
      
      
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
      <div className="container mx-auto px-4 py-6 max-w-5xl bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Looking for Rental</h1>
      </div>
      
      {isLoading && <Loader size="lg" />}

      {/* Listings */}
      <div className="space-y-8">
        {listings.reverse().slice(0,6).map((listing, index) => (
          <div 
            key={listing.listing.id} 
            className={cn(
              "max-w-3xl mx-auto bg-white rounded-xl shadow-sm",
              index === 5 && "relative"
            )}
          >
            {index === 5 && (
              <div className="absolute inset-0 z-10 backdrop-blur-sm bg-background/80 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Want to see more listings?</h3>
                <p className="text-muted-foreground mb-4">Download our app to explore all available properties</p>
                <Button className="w-full max-w-sm">
                  Download App
                </Button>
              </div>
            )}
            
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

           {listing.listing.image_urls && listing.listing.image_urls.length > 0 && <div>
                <div className="w-full md:h-[400px] h-[200px] relative">
                    <img 
                        src={listing.listing.image_urls[0]}
                        alt={listing.listing.title}
                        className="w-full h-full object-cover rounded-t-lg"
                    />
                    </div>

                    <div className="bg-blue-50 px-4 py-3 rounded-b-xl">
                    <p className="font-semibold text-lg">Budget: {listing.listing.min_price} AED</p>
                    <div className="flex items-center gap-2 mt-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{listing.listing.address}</p>
                    </div>
                    </div>
                </div>
            }

            <div className="px-4 py-3 flex items-center justify-between ">
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

