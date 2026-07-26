export interface Branch {
  id: string;
  name: string;
  city: string;
  rating: number;
  reviewCount: number;
  address: string;
  hours: string;
  phone: string;
  whatsapp: string;
  mapsUrl: string;
  coords: {
    lat: number;
    lng: number;
  };
}

export const branches: Branch[] = [
  {
    id: "bangalore",
    name: "Ink Nation Bangalore",
    city: "Bangalore",
    rating: 4.9,
    reviewCount: 263,
    address: "1st Floor, 20th Main Road, above Sangeetha Mobiles, opp. Airtel Showroom, KHB Colony, 5th Block, Koramangala, Bengaluru, Karnataka 560095",
    hours: "11:00 AM – 9:00 PM",
    phone: "08123713723",
    whatsapp: "https://wa.me/918123713723",
    mapsUrl: "https://www.google.com/maps/place/Ink+Nation+tattoo+studio/@12.9361184,77.61353,17z/data=!3m1!5s0x3bae144ff14aea87:0x53ca2f919ed6b693!4m14!1m7!3m6!1s0x3bae15f1e7d08be3:0x1827d258214103fd!2sInk+Nation+tattoo+studio!8m2!3d12.9361184!4d77.6161049!16s%2Fg%2F11qgk27lrn!3m5!1s0x3bae15f1e7d08be3:0x1827d258214103fd!8m2!3d12.9361184!4d77.6161049!16s%2Fg%2F11qgk27lrn?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D",
    coords: {
      lat: 12.9361184,
      lng: 77.6161049
    }
  },
  {
    id: "mysore",
    name: "Ink Nation Mysore",
    city: "Mysore",
    rating: 5.0,
    reviewCount: 192,
    address: "F-225, Near Ganesha Temple, 1st Floor, 1st Main Road, Gokulam 2nd Stage, Mysore-570002, Karnataka",
    hours: "10:15 AM – 9:00 PM",
    phone: "08123713723",
    whatsapp: "https://wa.me/918123713723",
    mapsUrl: "https://www.google.com/maps/place/Ink+Nation+Tattoo+Studio+02/@12.29656,76.6263891,17z/data=!3m1!4b1!4m6!3m5!1s0x3baf7b41f225f739:0x6bc60281c863ae6f!8m2!3d12.29656!4d76.628964!16s%2Fg%2F11stydhq7d?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D",
    coords: {
      lat: 12.29656,
      lng: 76.628964
    }
  }
];

export const studioStats = {
  tattoosDoneCount: "6000+",
  yearsInBusiness: "7+",
  professionalArtists: 5,
  satisfiedClientsCount: "6000+",
  bangaloreReviews: 263,
  bangaloreRating: 4.9,
  mysoreReviews: 192,
  mysoreRating: 5.0
};
