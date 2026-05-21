export interface Artist {
  id: string;
  name: string;
  slug: string;
  specialty: string;
  experience: string;
  bio: string;
  image: string;
  instagram: string;
  portfolio: {
    id: string;
    title: string;
    style: string;
    image: string;
  }[];
}

export const artists: Artist[] = [
  {
    id: "kushal",
    name: "Kushal",
    slug: "kushal",
    specialty: "Detailed Realism & Custom Work",
    experience: "8+ Years Experience",
    bio: "Praised specifically in reviews for his custom designs and detailed work, Kushal is Ink Nation's principal realistic artist. Clients praise his patience and meticulous hyper-realistic detailing.",
    image: "https://images.unsplash.com/photo-1598448663023-ed35ae5541f1?q=80&w=800&auto=format&fit=crop",
    instagram: "@kushal_inknation",
    portfolio: [
      { id: "k1", title: "Hyper-realistic Portrait", style: "Realism", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop" },
      { id: "k2", title: "Custom Chicano Script", style: "Script", image: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=800&auto=format&fit=crop" },
      { id: "k3", title: "Detailed Sleeve", style: "Black & Grey", image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=800&auto=format&fit=crop" }
    ]
  },
  {
    id: "ricky",
    name: "Ricky",
    slug: "ricky",
    specialty: "Precision Geometry & Fine Line",
    experience: "7+ Years Experience",
    bio: "Ricky is a master of precision technique. Known specifically in reviews for his surgical hand and expert technical geometric mandalas and fine line details.",
    image: "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=800&auto=format&fit=crop",
    instagram: "@ricky_inknation",
    portfolio: [
      { id: "r1", title: "Geometric Sleeve", style: "3D & Geometry", image: "https://images.unsplash.com/photo-1590246814883-57831168e243?q=80&w=800&auto=format&fit=crop" },
      { id: "r2", title: "Japanese Dragon", style: "Traditional", image: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?q=80&w=800&auto=format&fit=crop" },
      { id: "r3", title: "Fine-line Architecture", style: "Traditional", image: "https://images.unsplash.com/photo-1597405490028-2823d4b45a5a?q=80&w=800&auto=format&fit=crop" }
    ]
  },
  {
    // TODO: Replace with real artist names
    id: "arjun",
    name: "Arjun",
    slug: "arjun",
    specialty: "Neo-Traditional Illustration",
    experience: "5+ Years Experience",
    bio: "Arjun blends American Traditional themes with illustrative modern graphics. Bold colors and rich lines define his signature sketches.",
    image: "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?q=80&w=800&auto=format&fit=crop",
    instagram: "@arjun_inknation",
    portfolio: [
      { id: "s1", title: "Neo-Traditional Owl", style: "Neo-Traditional", image: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=800&auto=format&fit=crop" },
      { id: "s2", title: "Bold Skull & Rose", style: "Traditional", image: "https://images.unsplash.com/photo-1612459284970-e8f027596582?q=80&w=800&auto=format&fit=crop" },
      { id: "s3", title: "Illustrative Hourglass", style: "Neo-Traditional", image: "https://images.unsplash.com/photo-1590246814883-57831168e243?q=80&w=800&auto=format&fit=crop" }
    ]
  },
  {
    // TODO: Replace with real artist names
    id: "dev",
    name: "Dev",
    slug: "dev",
    specialty: "Vibrant Watercolor & Botanical",
    experience: "4+ Years Experience",
    bio: "Dev specializes in fluid watercolor splatters, natural botanical lines, and dream-like organic flower concepts.",
    image: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=800&auto=format&fit=crop",
    instagram: "@dev_inknation",
    portfolio: [
      { id: "rh1", title: "Vivid Phoenix", style: "Colour", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop" },
      { id: "rh2", title: "Botanical Spine Line", style: "Colour", image: "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?q=80&w=800&auto=format&fit=crop" },
      { id: "rh3", title: "Watercolor Elephant", style: "Colour", image: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?q=80&w=800&auto=format&fit=crop" }
    ]
  },
  {
    // TODO: Replace with real artist names
    id: "meera",
    name: "Meera",
    slug: "meera",
    specialty: "Abstract Blackwork & Cyberpunk",
    experience: "6+ Years Experience",
    bio: "Meera handles heavy geometric layouts, cybernetic textures, bold lettering, and modern blackouts.",
    image: "https://images.unsplash.com/photo-1597405490028-2823d4b45a5a?q=80&w=800&auto=format&fit=crop",
    instagram: "@meera_inknation",
    portfolio: [
      { id: "v1", title: "Heavy Blackwork Arm", style: "Black & Grey", image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=800&auto=format&fit=crop" },
      { id: "v2", title: "Abstract Script", style: "Script", image: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=800&auto=format&fit=crop" },
      { id: "v3", title: "Biomechanical Hand", style: "3D & Geometry", image: "https://images.unsplash.com/photo-1598448663023-ed35ae5541f1?q=80&w=800&auto=format&fit=crop" }
    ]
  }
];
