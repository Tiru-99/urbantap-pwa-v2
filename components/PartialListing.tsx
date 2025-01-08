'use client'
import{ useState } from 'react';
import { ChevronLeft , ChevronRight, Circle, MapPin} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Home, Bath , Expand , Upload , ArrowLeft} from 'lucide-react'
import Link from 'next/link'
import { GatedContent } from './GatedContent';
import { getBedroomDisplay , getBathrooms , createTitleForListing } from '@/app/utils/utils';

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

interface PropertyDetailsProps {
  listing: Listing | undefined;
}

export default function PartialListing({listing} : PropertyDetailsProps) {

  
  const[readMore , setReadMore] = useState<boolean>(false);
  const[carouselIndex , setCarouselIndex] = useState<number>(0);


  return (
    <>
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="top-0 z-10 bg-background border-b">
        <div className="px-4 h-20 flex items-center justify-between ">
          <div className="flex items-center gap-3 ">
            <Link href="/listings">
              <Button variant="ghost" size="icon" className="h-12 w-12 bg-gray-50 rounded-full">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="text-base font-semibold">Post details</h1>
          </div>
          <Button variant="ghost" size="icon" className="h-12 w-12 bg-gray-100 rounded-full">
            <Upload className="h-5 w-5" />
            <span className="sr-only">Share</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20">
        {/* Property Image */}
        {listing?.listing.image_urls && listing.listing.image_urls.length> 0 && <div className="aspect-[4/3] bg-muted relative">
              {carouselIndex >=0 && (<img
                src={listing?.listing.image_urls[carouselIndex] || "/placeholder.svg?height=400&width=600"}
                alt="Property"
                className="object-cover w-full h-full"
              />)}

            {listing?.listing.image_urls && listing.listing.image_urls.length  > 0 && 
            <>
            <span className="absolute bg-white rounded-lg top-1/2 left-2 h-8 w-8 flex items-center justify-center"
            onClick={()=>( setCarouselIndex((prevIndex) => (prevIndex - 1 + listing?.listing.image_urls.length) % listing?.listing.image_urls.length))}>
              <ChevronLeft className="h-4 w-4"></ChevronLeft>
            </span>

            <span className="absolute bg-white rounded-lg top-1/2 right-2 h-8 w-8 flex items-center justify-center"
            onClick={()=>(setCarouselIndex((prevIndex)=>(prevIndex + 1) % listing?.listing.image_urls.length))}>
              <ChevronRight className="h-4 w-4"></ChevronRight>
            </span>
            </>
            }

            {/* Circles */}
            <span className='absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1'>
              {listing?.listing.image_urls.map((_ , index)=>(
                <Circle className='h-3 w-3'
                  onClick={()=>(setCarouselIndex(index))}
                  fill={index === carouselIndex ? "#888" : "#fff"}
                  strokeWidth={0} key={index}></Circle>
              ))}
            </span>

        </div>}

        {/* Property Details */}
        <div className="p-4 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-1">{createTitleForListing(listing?.listing.looking_for , listing?.listing.category)}</h2>
            
        {listing?.listing?.title ? (
        <>
          {/* Desktop View */}
          <p className="text-sm text-muted-foreground mb-4 hidden md:block">
            {listing.listing.title.length > 80 ? (
              <>
                {readMore ? listing.listing.title : listing.listing.title.slice(0, 200)}
                {listing.listing.title.length > (readMore ? 0 : 200) && (
                  <span
                    className="text-gray-600 cursor-pointer font-bold"
                    onClick={() => setReadMore((prev) => !prev)}
                  >
                    {readMore ? " ...Read Less" : " ...Read More"}
                  </span>
                )}
              </>
            ) : (
              listing.listing.title
            )}
          </p>

          {/* Mobile View */}
          <p className="text-sm text-muted-foreground mb-4 md:hidden">
            {listing.listing.title.length > 80 ? (
              <>
                {readMore ? listing.listing.title : listing.listing.title.slice(0, 120)}
                {listing.listing.title.length > (readMore ? 0 : 120) && (
                  <span
                    className="text-gray-600 cursor-pointer font-bold"
                    onClick={() => setReadMore((prev) => !prev)}
                  >
                    {readMore ? " ...Read Less" : " ...Read More"}
                  </span>
                )}
              </>
            ) : (
              listing.listing.title
            )}
          </p>
        </>
      ) : (
        <p className="text-sm text-muted-foreground mb-4">Title not available</p>
      )}


            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-lg font-semibold">Rent: {listing?.listing.min_price} AED</p>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{listing?.listing.address}</span>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-3 gap-4 py-2 text-gray-500">
            <div className="text-center flex justify-center items-center gap-2">
              <span><Home/></span>
              <p className="text-sm">{getBedroomDisplay(listing?.listing.no_of_bedrooms)} BHK</p>
            </div>
            <div className="text-center flex justify-center items-center gap-2">
              <span><Bath/></span>
              <p className="text-sm">{getBathrooms(listing?.listing.no_of_bathrooms)} Bath</p>
            </div>
            <div className="text-center flex justify-center items-center gap-2">
              <span><Expand/></span>
              <p className="text-sm">{listing?.listing.sq_ft} sq.ft</p>
            </div>
          </div>

          {/* More Details */}
          <div className="space-y-4">
            <h3 className="font-semibold">More details</h3>
            <div className="p-4 max-w-full mx-auto ">
                <GatedContent />
            </div>
          </div>

        </div>
      </div>

    </div>
    </>
  )
}
