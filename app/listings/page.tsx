"use client"
import { useState } from 'react'
import { MapPin, Home, Bath, Square , Expand } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import FixedNavbar from '@/components/FixedNavbar'


interface Listing {
  id: string
  user: {
    name: string
    avatar: string
  }
  title: string
  description: string
  images: string[]
  price: string
  location: string
  details: {
    bedrooms: number
    bathrooms: number
    area: string
  }
  postedAt: string
}

const sampleListings: Listing[] = [
  {
    id: '1',
    user: {
      name: 'Tiru',
      avatar: 'T',
    },
    title: 'Selling Off Plan',
    description: '5 Bedrooms available',
    images: ['/assets/bedroom.jpg'],
    price: 'AED 250,000,000',
    location: '456 Main Street',
    details: {
      bedrooms: 3,
      bathrooms: 2,
      area: '500+ sq ft',
    },
    postedAt: '2 days ago',
  },
  {
    id: '2',
    user: {
      name: 'Riya',
      avatar: 'R',
    },
    title: 'Luxury Villa',
    description: ' 7 Bedrooms with a private pool7 Bedrooms with a private pool7 Bedrooms with a private pool7 Bedrooms with a private pool7 Bedrooms with a private pool',
    images: ['/assets/bedroom.jpg'],
    price: 'AED 600,000,000',
    location: '789 Beach Avenue',
    details: {
      bedrooms: 7,
      bathrooms: 6,
      area: '10000+ sq ft',
    },
    postedAt: '5 days ago',
  },
  {
    id: '3',
    user: {
      name: 'Arjun',
      avatar: 'A',
    },
    title: 'Spacious Apartment',
    description: '3 Bedrooms in the city center',
    images: ['/assets/bedroom.jpg'],
    price: 'AED 3,500,000',
    location: '123 Downtown Road',
    details: {
      bedrooms: 3,
      bathrooms: 3,
      area: '1500 sq ft',
    },
    postedAt: '1 week ago',
  },
  {
    id: '4',
    user: {
      name: 'Zara',
      avatar: 'Z',
    },
    title: 'Modern Penthouse',
    description: '2 Bedrooms with a rooftop garden',
    images: ['/assets/bedroom.jpg'],
    price: 'AED 12,000,000',
    location: '456 Skyline Avenue',
    details: {
      bedrooms: 2,
      bathrooms: 2,
      area: '2000 sq ft',
    },
    postedAt: '3 days ago',
  },
  {
    id: '5',
    user: {
      name: 'Karan',
      avatar: 'K',
    },
    title: 'Family Home',
    description: '4 Bedrooms near the park',
    images: ['/assets/bedroom.jpg'],
    price: 'AED 5,500,000',
    location: '678 Green Park Lane',
    details: {
      bedrooms: 4,
      bathrooms: 3,
      area: '2500 sq ft',
    },
    postedAt: '6 days ago',
  },
  {
    id: '6',
    user: {
      name: 'Meera',
      avatar: 'M',
    },
    title: 'Cozy Studio',
    description: 'Perfect for singles or couples',
    images: ['/assets/bedroom.jpg'],
    price: 'AED 850,000',
    location: '123 Central Street',
    details: {
      bedrooms: 1,
      bathrooms: 1,
      area: '500 sq ft',
    },
    postedAt: '2 weeks ago',
  }
]



export default function PropertyListings() {
    //const [showDownloadPrompt, setShowDownloadPrompt] = useState(false)

    const[clicked , setClicked] = useState(false);
    return (
      <>
      <FixedNavbar></FixedNavbar>
      <div className="container mx-auto px-4 py-6 max-w-5xl bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Looking for Rental</h1>
      </div>

      {/* Listings */}
      <div className="space-y-8">
        {sampleListings.map((listing, index) => (
          <div 
            key={listing.id} 
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
                  <AvatarFallback>{listing.user.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-sm">{listing.user.name}</h3>
                  <p className="text-sm text-muted-foreground">Luxury Homes Ltd.</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{listing.postedAt}</p>
            </div>

            <div className="px-4 pb-3">
              <h2 className="text-sm font-semibold">{listing.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{clicked || listing.description.length < 100 ?  (listing.description):(listing.description.slice(0,80))} {listing.description.length > 60 &&(
                <span className='text-gray-600 font-bold cursor-pointer' onClick={()=>setClicked((prevState)=>!prevState)}>{clicked === true ? " ...Read Less" : " ...Read More"}</span>
              )} </p>
            </div>

            <div className="w-full md:h-[400px] h-[200px] relative">
              <img 
                src={listing.images[0]}
                alt={listing.title}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>

            <div className="bg-blue-50 px-4 py-3">
              <p className="font-semibold text-lg">Budget: {listing.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{listing.location}</p>
              </div>
            </div>

            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{listing.details.bedrooms} BHK</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{listing.details.bathrooms} Bath</span>
              </div>
              <div className="flex items-center gap-2">
                <Expand className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{listing.details.area}</span>
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

