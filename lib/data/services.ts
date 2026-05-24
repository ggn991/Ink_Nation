export interface Service {
  id: string;
  name: string;
  tagline: string;
  description: string;
  isAvailable: boolean;
  isComingSoon: boolean;
  ctaText?: string;
  icon: string;
  priceStart?: string;
  details?: string[];
  steps?: { title: string; desc: string }[];
}

export const services: Service[] = [
  {
    id: "tattoo",
    name: "Custom Tattoos",
    tagline: "We Paint Your Legacy On Your Skin",
    description: "Every piece we create is custom-designed, engineered for your unique anatomy and story. From micro-minimalism to full bodysuit masterpieces, our artists deliver elite results in Chicano script, realism, traditional Japanese, American traditional, and vivid color watercolor.",
    isAvailable: true,
    isComingSoon: false,
    ctaText: "GET INKED",
    icon: "Brush",
    priceStart: "₹2,000",
    details: [
      "Custom, Color, Black & Grey, 3D, Portrait, Script, Traditional, Neo-Traditional",
      "One-on-one professional consultation with master artist",
      "Tailored sketch matching unique anatomy",
      "Surgical-grade aftercare protocol and kit included"
    ],
    steps: [
      { title: "Consultation & Brief", desc: "Sit down with an artist to map out your idea, size, placement, and custom references." },
      { title: "Custom Stencil Creation", desc: "Our artist designs a completely unique artwork and refines it until it matches your vision perfectly." },
      { title: "Surgical Prep & Transfer", desc: "Your skin is prepped using premium antiseptic, and the custom stencil is positioned dynamically." },
      { title: "Master Ink Session", desc: "The piece is executed with industry-leading machinery, maintaining the highest levels of safety and hygiene." },
      { title: "Medical Wrap & Aftercare", desc: "We wrap the area in medical-grade protective film and walk you through our verified recovery guide." }
    ]
  },
  {
    id: "piercing",
    name: "Professional Piercing",
    tagline: "Surgical Precision & Premium Jewellery",
    description: "Experience professional body modifications performed in absolute sterile environments. We utilize ultra-sharp, single-use surgical needles and stock only the highest grade biocompatible titanium and solid gold jewelry to ensure safe, comfortable healing.",
    isAvailable: true,
    isComingSoon: false,
    ctaText: "GET PIERCED",
    icon: "Sparkles",
    priceStart: "₹800",
    details: [
      "Industrial, Cartilage, Lobe, Helix, Tragus, Septum, Nose, Eyebrow, Navel",
      "Single-use sterile surgical needle technique (no piercing guns)",
      "Vast collection of implant-grade ASTM F-136 titanium studs",
      "Strict saline solution aftercare tracking"
    ],
    steps: [
      { title: "Jewellery Selection", desc: "Choose from our massive collection of implant-grade titanium or solid 14k gold studs." },
      { title: "Anatomical Marking", desc: "We mark the exit and entry points, checking carefully for symmetry and comfortable fit." },
      { title: "Sterile Setup", desc: "All tools are autoclave sterilized and opened in front of you. Needle is entirely single-use." },
      { title: "Quick Needle Pierce", desc: "The piercing is performed in one fluid movement. It is fast, highly precise, and minimizes tissue stress." },
      { title: "Jewellery Placement", desc: "The stud is threaded seamlessly into place and secured. Antiseptic cleaning is applied immediately." }
    ]
  },
  {
    id: "nail-art",
    name: "Premium Nail Art",
    tagline: "Masterpiece Extensions & Sculpting",
    description: "An upcoming luxury addition to our creative studios. From custom cybernetic acrylic structures to hand-painted illustrative gel designs, our upcoming nails wing will elevate your fingertips to match your ink.",
    isAvailable: false,
    isComingSoon: true,
    icon: "Heart",
    details: [
      "Illustrative hand-painted gel sets, structural acrylic sculpting, custom tips",
      "Safe, non-toxic products only",
      "Coming soon to our Bangalore and Mysore locations"
    ]
  },
  {
    id: "tattoo-removal",
    name: "Laser Tattoo Removal",
    tagline: "Pico-Second Laser Engineering",
    description: "Clear the canvas for something new. Our upcoming tattoo removal service uses state-of-the-art multi-wavelength laser technology to break down ink particles safely with zero scarring, preparing you for clean cover-ups.",
    isAvailable: false,
    isComingSoon: true,
    icon: "Trash2",
    details: [
      "Advanced multi-wavelength pico-second laser targeting, minimal skin trauma",
      "Perfect for partial fading to prepare flawless custom cover-up canvas",
      "Guided by certified laser technicians"
    ]
  },
  {
    id: "tattoo-training",
    name: "Tattoo Training Program",
    tagline: "Become A Certified Professional",
    description: "Launch your career in tattooing. Ink Nation's exclusive academy offers intensive 3-month and 6-month hands-on programs covering fundamental illustration, machine mechanics, skin physiology, sterile prep, and actual client execution under master supervision.",
    isAvailable: true,
    isComingSoon: false,
    ctaText: "GET INKED",
    icon: "GraduationCap",
    priceStart: "₹75,000",
    details: [
      "Syllabus: Illustration, Machine Tuning, Skin Biology, Autoclave Procedures, Live-skin tattooing",
      "Hands-on supervision by Kushal and Ricky",
      "Comprehensive certification upon passing final practical boards",
      "Direct residency opportunity for stellar graduates"
    ],
    steps: [
      { title: "Art Fundamentals", desc: "Master custom drawing, linework styles, Chicano script calligraphy, and digital mockup designs." },
      { title: "Machine Anatomy", desc: "Learn to calibrate and tune rotary and coil machines, adjusting voltage, needles, and stroke depths." },
      { title: "Skin Physiology & Safety", desc: "Study cross-contamination, skin layers, blood-borne pathogens, and autoclave sterilization." },
      { title: "Fake Skin Execution", desc: "Practice lining, smooth blending, and solid color packings on synthetic skin models." },
      { title: "Supervised Live Inking", desc: "Execute full live-client tattoos under direct one-on-one master supervision." }
    ]
  }
];

export const hygieneSteps = [
  { id: "01", title: "Autoclave Sterilization", desc: "Every reusable metal grip and tip goes through an advanced multi-vacuum medical autoclave cycle." },
  { id: "02", title: "Single-Use Cartridges Only", desc: "All needles are 100% single-use membrane cartridges, opened right in front of your eyes and discarded in bio-hazard bins." },
  { id: "03", title: "Medical-Grade Barriers", desc: "Machines, clip cords, power stations, and armrests are fully covered in disposable plastic sheets between clients." },
  { id: "04", title: "Certified Antiseptics", desc: "We utilize hospital-grade sanitizers and green soap compounds, keeping clean fields intact throughout your session." }
];
