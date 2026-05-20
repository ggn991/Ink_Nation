export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqCategories = [
  "Before Getting Inked",
  "The Process",
  "Aftercare",
  "Pricing & Booking",
  "Piercing FAQ",
  "Training"
];

export const faqs: FAQItem[] = [
  // Before Getting Inked
  {
    category: "Before Getting Inked",
    question: "How should I prepare for my first tattoo session?",
    answer: "Proper preparation ensures a comfortable session. Get a full 8 hours of sleep the night before, stay well-hydrated, and eat a hearty meal 1-2 hours before your appointment to maintain stable blood sugar levels. Wear loose-fitting, comfortable clothing that allows easy access to the area being tattooed. Strictly avoid drinking alcohol or taking blood-thinning medications like aspirin for at least 24 hours prior, as blood-thinning causes excessive bleeding and dilutes the ink."
  },
  {
    category: "Before Getting Inked",
    question: "Do tattoos hurt? Which placements hurt the least or most?",
    answer: "Yes, tattoos involve a degree of discomfort, but it is entirely manageable and often described as a hot scratchy sensation. Placements with more fat and muscle like the outer bicep, forearm, outer thigh, and calves hurt the least. Placements directly over bone or dense nerve endings hurt the most, including the ribs, sternum, spine, throat, collarbone, tops of feet, and inner joints."
  },
  {
    category: "Before Getting Inked",
    question: "Can I use numbing creams before my appointment?",
    answer: "We strongly advise against applying over-the-counter numbing creams before arriving. Many numbing creams constrict blood vessels and alter the skin texture, making it rubbery, thick, and difficult to tattoo, which can compromise the final healing. If you are extremely anxious about pain, please discuss it with Kushal or Ricky during your consultation. We can utilize certified, studio-approved topical anesthetics safely midway through the session once the skin outline is open."
  },
  // The Process
  {
    category: "The Process",
    question: "What hygiene protocols do your studios follow?",
    answer: "At Ink Nation, hygiene is our religion. We operate under strict clinical sanitation procedures. All needles are 100% single-use membrane cartridges, opened right in front of you and immediately discarded in bio-hazard sharps containers. We use medical-grade autoclaves to sterilize reusable stainless steel grips and accessories. All work surfaces, chairs, and power supplies are wrapped in single-use barrier film before every client, and our artists wear disposable nitrile gloves at all times."
  },
  {
    category: "The Process",
    question: "Can I bring a friend with me to my session?",
    answer: "You are welcome to bring one friend along for moral support. However, to maintain a sterile, distraction-free environment for our artists, guests are generally asked to remain in our comfortable reception lounge rather than directly inside the active tattooing booths, especially for large, highly focused sessions."
  },
  {
    category: "The Process",
    question: "How long does a typical tattoo session take?",
    answer: "The duration depends entirely on the design size, level of detail, and placement. A small fine-line piece (2\"-3\") might take 30 to 60 minutes. A medium piece (4\"-6\") with intricate shading takes 2 to 4 hours. Massive custom sleeves or back pieces are split into multiple 5-6 hour sessions to allow both the artist and your skin to rest."
  },
  // Aftercare
  {
    category: "Aftercare",
    question: "What is the standard healing timeline for a tattoo?",
    answer: "Initial healing takes about 2 to 3 weeks, while the deep skin layers can take up to 2 months to fully recover. During the first 3-5 days, your tattoo might flake and look slightly dull. Around day 5-10, it will begin to peel like a mild sunburn and feel extremely itchy. Do not scratch or pick at the peeling skin, as this pulls out raw ink. Full surface healing is usually complete in 14-21 days."
  },
  {
    category: "Aftercare",
    question: "How do I care for my tattoo using medical protective film?",
    answer: "If we wrap your tattoo in medical-grade protective film (like SecondSkin), leave it on for 3 to 5 days. It is waterproof, so you can shower normally, but avoid soaking it. You will see a collection of plasma, blood, and ink pool under the bandage—this is completely normal. After 3-5 days, gently peel the wrap off under warm running water, wash with a mild unscented soap, pat dry with a clean paper towel, and begin applying a very thin layer of unscented moisturizer."
  },
  {
    category: "Aftercare",
    question: "Can I go swimming or workout after getting a tattoo?",
    answer: "No. You must strictly avoid swimming pools, oceans, lakes, hot tubs, and saunas for at least 2 to 3 weeks. Submerging a fresh tattoo in water harbors bacteria and causes severe infections or ink leaching. You should also avoid heavy, sweaty workouts for the first 7-10 days, as stretching the skin and sweat build-up can crack the healing scabs."
  },
  // Pricing & Booking
  {
    category: "Pricing & Booking",
    question: "How do you calculate your tattoo pricing?",
    answer: "Tattoo pricing is calculated based on size, complexity, and custom design needs. Small custom pieces start at ₹2,000. Larger, detailed works are priced by the piece or session. Adding full color adds +20% to the base design price due to the extra labor, blending, and session time. We provide an exact quote after a free consultation."
  },
  {
    category: "Pricing & Booking",
    question: "Do you require a deposit to book an appointment?",
    answer: "Yes, we require a small, non-refundable deposit to secure your booking slot and lock in your session date. This deposit is fully deducted from the final cost of your tattoo on the day of your session. It ensures that our artists are compensated for the time they spend creating your custom design before you arrive."
  },
  {
    category: "Pricing & Booking",
    question: "What is your rescheduling or cancellation policy?",
    answer: "We understand that plans change. You can reschedule your appointment up to 48 hours in advance without losing your deposit, and we will roll it over to your new date. Rescheduling within less than 48 hours or failing to show up (no-show) results in the forfeiture of the deposit, as that slot could have been filled by another client on our waitlist."
  },
  // Piercing FAQ
  {
    category: "Piercing FAQ",
    question: "What is the difference between a needle and a piercing gun?",
    answer: "At Ink Nation, we use single-use surgical needles exclusively. Piercing guns are dangerous because they use blunt force to push a dull stud through the tissue, causing severe cellular trauma, swelling, and scarring. Furthermore, plastic guns cannot be autoclaved, risking severe infection. A surgical needle is ultra-sharp, hollow, and slides cleanly through the tissue, creating a precise, fast-healing channel."
  },
  {
    category: "Piercing FAQ",
    question: "What materials do you use for your piercing jewelry?",
    answer: "We strictly stock implant-grade ASTM F-136 titanium and solid 14k/18k gold. These materials are 100% biocompatible, hypoallergenic, and contain zero trace nickel. This completely prevents allergic reactions, swelling, and rejection, which are extremely common with cheap steel or silver jewelry."
  },
  {
    category: "Piercing FAQ",
    question: "How long does it take for a cartilage or industrial piercing to heal?",
    answer: "Earlobes heal quickly in 6 to 8 weeks. However, cartilage piercings (helix, tragus, conch, industrial) have limited blood flow and take 6 to 12 months to fully heal. During this time, clean the area twice daily with a sterile saline spray, and avoid sleeping on the piercing, twisting the jewelry, or touching it."
  },
  // Training
  {
    category: "Training",
    question: "Do I need to have a background in drawing to join your training academy?",
    answer: "While basic drawing skills are beneficial, they are not a strict prerequisite. Our comprehensive curriculum starts from the absolute fundamentals of drawing, covering shadow grids, custom script, and anatomical proportions. The most critical requirements are passion, dedication, and a willingness to practice 6-8 hours daily."
  },
  {
    category: "Training",
    question: "What does the 3-month and 6-month academy curriculum cover?",
    answer: "The syllabus is split into three core phases: Phase 1 covers art fundamentals, script calligraphy, drawing anatomy, and digital mockups. Phase 2 introduces machine calibration, voltage tuning, skin anatomy, bloodborne pathogens, and fake-skin packing. Phase 3 focuses on live-skin execution, where you tattoo actual clients under direct master supervision."
  },
  {
    category: "Training",
    question: "Are your certifications recognized, and do you offer jobs?",
    answer: "Yes, you will receive a professional Ink Nation Certification upon successfully passing our rigorous written and practical board exams. Outstanding graduates are frequently offered direct resident artist positions or junior apprenticeships at our flagship Bangalore and Mysore branches."
  }
];
