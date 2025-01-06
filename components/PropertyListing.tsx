'use client'
import{ useState } from 'react';
import { ChevronLeft , ChevronRight, Circle, MapPin} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Home, Bath , Expand , Upload , ArrowLeft} from 'lucide-react'
import Link from 'next/link'

interface PropertyDetailsProps {
  images: string[]
  title: string
  description:string
  rent: string
  location: string
  details: {
    bedrooms: number
    bathrooms: string
    size: string
  }
  moreDetails: {
    type: string
    projectName: string
    rentFrequency: string
    noOfBedrooms: number
    noOfBathrooms: string
    furnishing: string
    propertySize: string
    city: string
  }
  amenities: string[]
  broker: {
    name: string
    avatar: string
    postedTime: string
  }
}

export default function PropertyDetails({
  images,
  title = "Is Renting",
  description,
  rent = "AED 20,000",
  location = "Sidra Villas II, Dubai Hills Estate, Dubai",
  details = {
    bedrooms: 2,
    bathrooms: "2",
    size: "1000+ sq ft"
  },
  moreDetails = {
    type: "Apartment",
    projectName: "Zada Tower",
    rentFrequency: "Monthly",
    noOfBedrooms: 3,
    noOfBathrooms: "1-3 Bathroom",
    furnishing: "Furnished",
    propertySize: "1,200 sq.ft",
    city: "Dubai"
  },
  amenities = [
    "Storage Kitchen & Chimney",
    "Barbecue Area",
    "Double Glazed Windows"
  ],
  broker = {
    name: "Omar faizan",
    avatar: "OF",
    postedTime: "1 month ago"
  }
}: PropertyDetailsProps) {

  
  const[readMore , setReadMore] = useState<boolean>(false);
  const[showAmmenities , setShowAmmenities] = useState<boolean>(false);
  const[carouselIndex , setCarouselIndex] = useState<number>(0);
 



  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
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
        <div className="aspect-[4/3] bg-muted relative">
          {carouselIndex >=0 && (<img
            src={images[carouselIndex] || "/placeholder.svg?height=400&width=600"}
            alt="Property"
            className="object-cover w-full h-full"
          />)}

        <span className="absolute bg-white rounded-lg top-1/2 left-2 h-8 w-8 flex items-center justify-center"
        onClick={()=>( setCarouselIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length))}>
          <ChevronLeft className="h-4 w-4"></ChevronLeft>
        </span>

        <span className="absolute bg-white rounded-lg top-1/2 right-2 h-8 w-8 flex items-center justify-center"
        onClick={()=>(setCarouselIndex((prevIndex)=>(prevIndex + 1) % images.length))}>
          <ChevronRight className="h-4 w-4"></ChevronRight>
        </span>

        {/* Circles */}
        <span className='absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1'>
          {images?.map((_ , index)=>(
             <Circle className='h-3 w-3'
              onClick={()=>(setCarouselIndex(index))}
              fill={index === carouselIndex ? "#888" : "#fff"}
              strokeWidth={0} key={index}></Circle>
          ))}
        </span>

        </div>

        {/* Property Details */}
        <div className="p-4 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-1">{title}</h2>
            
           {/* Desktop View */}
            <p className="text-sm text-muted-foreground mb-4 hidden md:block">
              {description.length > 80 && (
                <>
                  {readMore ? description : description.slice(0, 200)}
                  {description.length > (readMore ? 0 : 200) && (
                    <span
                      className="text-gray-600 cursor-pointer font-bold"
                      onClick={() => setReadMore((prevState) => !prevState)}
                    >
                      {readMore ? " ...Read Less" : " ...Read More"}
                    </span>
                  )}
                </>
              )}
              {description.length <= 80 && description}
            </p>

            {/* Mobile View */}
            <p className="text-sm text-muted-foreground mb-4 md:hidden">
              {description.length > 80 && (
                <>
                  {readMore ? description : description.slice(0, 120)}
                  {description.length > (readMore ? 0 : 120) && (
                    <span
                      className="text-gray-600 cursor-pointer font-bold"
                      onClick={() => setReadMore((prevState) => !prevState)}
                    >
                      {readMore ? " ...Read Less" : " ...Read More"}
                    </span>
                  )}
                </>
              )}
              {description.length <= 80 && description}
            </p>


            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-lg font-semibold">Rent: {rent}</p>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{location}</span>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-3 gap-4 py-2 text-gray-500">
            <div className="text-center flex justify-center items-center gap-2">
              <p className="text-sm">{details.bedrooms} BHK</p>
              <span><Home/></span>
            </div>
            <div className="text-center flex justify-center items-center gap-2">
              <p className="text-sm">{details.bathrooms} Bath</p>
              <span><Bath/></span>
            </div>
            <div className="text-center flex justify-center items-center gap-2">
              <p className="text-sm">{details.size}</p>
              <span><Expand/></span>
            </div>
          </div>

          {/* More Details */}
          <div className="space-y-4">
            <h3 className="font-semibold">More details</h3>
            <div className="grid grid-cols-2 gap-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="text-sm">{moreDetails.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Project name</p>
                <p className="text-sm">{moreDetails.projectName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rent frequency</p>
                <p className="text-sm">{moreDetails.rentFrequency}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">No of Bedrooms</p>
                <p className="text-sm">{moreDetails.noOfBedrooms}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">No of Bathrooms</p>
                <p className="text-sm">{moreDetails.noOfBathrooms}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Furnishing</p>
                <p className="text-sm">{moreDetails.furnishing}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Property size (sq.ft)</p>
                <p className="text-sm">{moreDetails.propertySize}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">City</p>
                <p className="text-sm">{moreDetails.city}</p>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h3 className="font-semibold">Amenities</h3>
            <ul className="space-y-2">
              {showAmmenities === true ? amenities.map((amenity, index) => (
                <li key={index} className="text-sm">• {amenity}</li>
              )) : (amenities.slice(0,3).map((amenity, index) => (
                <li key={index} className="text-sm">• {amenity}</li>
              )))}
            </ul>
            <Button variant="outline"
            className="text-sm rounded-full bg-gray-100 start-0"
            onClick={()=>(setShowAmmenities((prevState)=>(!prevState)))}>
              {showAmmenities ? "Hide Ammenities" : "Show All Ammenities"}
            </Button>
          </div>

          {/* Broker Details */}
          <div className="space-y-4">
            <h3 className="font-semibold">Broker details</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{broker.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{broker.name}</p>
                  <p className="text-sm text-muted-foreground">{broker.postedTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
