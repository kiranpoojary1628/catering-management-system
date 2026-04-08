const foodQuizData = [
  {
    id: 1,
    slug: "wedding-catering",
    title: "Wedding Catering",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop",
    price: "₹50,000 onwards",
    tagline: "Grand menus for unforgettable weddings",
    description:
      "Your wedding is a once-in-a-lifetime celebration, and the food should be just as memorable.",
    showMenu: true,
    menu: [
      {
        name: "Welcome Drink",
        image:
          "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&auto=format&fit=crop",
      },
      {
        name: "Paneer Butter Masala",
        image:
          "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=600&auto=format&fit=crop",
      },
      {
        name: "Veg & Non-Veg Starters",
        image:
          "https://images.unsplash.com/photo-1599122759357-66745a5c36ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VmVnJTIwJTI2JTIwTm9uLVZlZyUyMFN0YXJ0ZXJzfGVufDB8fDB8fHww",
      },
      {
        name: "Veg / Chicken Biryani",
        image:
          "https://images.unsplash.com/photo-1631515242808-497c3fbd3972?w=600&auto=format&fit=crop",
      },
      {
        name: "Butter Naan & Roti",
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop",
      },
      {
        name: "Dal Makhani",
        image:
          "https://plus.unsplash.com/premium_photo-1694506374757-632d818eb023?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RGFsJTIwTWFraGFuaXxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        name: "Gulab Jamun",
        image:
          "https://media.istockphoto.com/id/163064596/photo/gulab-jamun.webp?a=1&b=1&s=612x612&w=0&k=20&c=F_5_AgCdrsecO13W-wiuCZAwYZPBpN3UETTyYtQQlLM=",
      },
      {
        name: "Ice Cream",
        image:
          "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8SWNlJTIwQ3JlYW18ZW58MHx8MHx8fDA%3D",
      },
    ],
  },

  {
    id: 2,
    slug: "birthday-parties",
    title: "Birthday Parties",
    image:
      "https://media.istockphoto.com/id/1187650964/photo/colorful-balloons-on-wall.webp?a=1&b=1&s=612x612&w=0&k=20&c=kdcjiVtwoh_PVSx2gNCWLnBtgy9p96nImQiEryh_0wI=",
    price: "₹15,000 onwards",
    tagline: "Fun, flavorful & budget friendly",
    description:
      "Celebrate birthdays with joy, color, and delicious food.",
    showMenu: true,
    menu: [
      {
        name: "French Fries",
        image:
          "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600&auto=format&fit=crop",
      },
      {
        name: "Veg Pizza",
        image:
          "https://images.unsplash.com/photo-1669895616443-5d21d5acc6e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VmVnJTIwUGl6emF8ZW58MHx8MHx8fDA%3D",
      },
      {
        name: "Burger",
        image:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop",
      },
      {
        name: "Pasta",
        image:
          "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=600&auto=format&fit=crop",
      },
      {
        name: "Soft Drinks",
        image:
          "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=600&auto=format&fit=crop",
      },
      {
        name: "Chocolate Cake",
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop",
      },
    ],
  },

  {
    id: 3,
    slug: "corporate-events",
    title: "Corporate Events",
    image:
      "https://plus.unsplash.com/premium_photo-1723867267202-169dfe3b197a?w=800&auto=format&fit=crop",
    price: "₹40,000 onwards",
    tagline: "Professional service with premium taste",
    description:
      "Corporate catering designed to impress with punctual service and refined menus.",
    showMenu: true,
    menu: [
      {
        name: "Welcome Juice",
        image:
          "https://plus.unsplash.com/premium_photo-1676642612947-a518c0a4c99d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8V2VsY29tZSUyMEp1aWNlfGVufDB8fDB8fHww",
      },
      {
        name: "Veg Starter",
        image:
          "https://media.istockphoto.com/id/2227481993/photo/soya-manchurian-served-with-fried-rice-is-a-delicious-protein-rich-indo-chinese-combo.webp?a=1&b=1&s=612x612&w=0&k=20&c=CbSlDTW5-0QWNbvO07Nq_zwVj1F1AmW8cSepeC91VoA=",
      },
      {
        name: "South Indian Thali",
        image:
          "https://images.unsplash.com/photo-1742281257687-092746ad6021?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U291dGglMjBJbmRpYW4lMjBUaGFsaXxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        name: "North Indian Curry",
        image:
          "https://plus.unsplash.com/premium_photo-1712678665724-7c3faa117a2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Tm9ydGglMjBJbmRpYW4lMjBDdXJyeXxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        name: "Rice & Sambar",
        image:
          "https://images.unsplash.com/photo-1707270686195-7415251cc9c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8UmljZSUyMGFuZCUyMFNhbWJhcnxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        name: "Tea / Coffee",
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop",
      },
    ],
  },

  {
    id: 4,
    slug: "house-warming",
    title: "House Warming",
    image:
      "https://media.istockphoto.com/id/1423673905/photo/dinner-time-verity-of-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=71pmLpb-prJP-TeGJeXi64dGw3-UiIZZxIlQJgoA7SE=",
    price: "₹20,000 onwards",
    tagline: "Traditional food, homely touch",
    description:
      "Authentic flavors and homely dishes for a traditional housewarming ceremony.",
    showMenu: true,
    menu: [
      {
        name: "Kesari Bath",
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop",
      },
      {
        name: "Rice",
        image:
          "https://images.unsplash.com/photo-1743674452796-ad8d0cf38005?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8UmljZSUyMHBsYXRlfGVufDB8fDB8fHww",
      },
      {
        name: "Sambar",
        image:
          "https://media.istockphoto.com/id/1169102817/photo/kerala-sambar-dish.webp?a=1&b=1&s=612x612&w=0&k=20&c=q_n9KW0cKgv-HptzzlM1aNENz9Bn4jUVBBnmgN8XImc=",
      },
      {
        name: "Rasam",
        image:
          "https://media.istockphoto.com/id/1253133142/photo/indian-rasam-soup.webp?a=1&b=1&s=612x612&w=0&k=20&c=DMmnYL9P7EzCoYx2MMYuFMKwd1ReAbpHzB2AxB_MZAU=",
      },
      {
        name: "Payasa",
        image:
          "https://media.istockphoto.com/id/692446072/photo/most-famous-indian-sweet-pudding-kheer-or-semiya-khir-in-a-bowl-selective-focus.webp?a=1&b=1&s=612x612&w=0&k=20&c=E0Hvk0wDfY5C6i9ISojyzDYKawp7q9mGo0THnuN_j20=",
      },
    ],
  },

  {
    id: 5,
    slug: "karavali-special",
    title: "Karavali Special",
    image:
      "https://images.unsplash.com/photo-1756741987051-a6a38f28838b?w=800&auto=format&fit=crop",
    price: "₹35,000 onwards",
    tagline: "Authentic karavali flavors & seafood delights",
    description:
      "Experience rich karavali cuisine with authentic Mangalorean flavors.",
    showMenu: true,
    menu: [
      {
        name: "Fish Fry",
        image:
          "https://media.istockphoto.com/id/1589469486/photo/vanjaram-fish-fry.webp?a=1&b=1&s=612x612&w=0&k=20&c=Uj_-kMWZJm79mbtJQlnPKaLgndD4HBBPG8f-GxABSGc=",
      },
      {
        name: "Neer Dosa",
        image:
          "https://media.istockphoto.com/id/2209136251/photo/ghavne-and-chutney-or-neer-dosa-is-a-popular-breakfast-dish-from-the-konkani-or-south-indian.webp?a=1&b=1&s=612x612&w=0&k=20&c=BZz4RFzB-u19fKQVxq6vPsgT608Fa39rj4CFk8KiSKI=",
      },
      {
        name: "Chicken Sukka",
        image:
          "https://images.unsplash.com/photo-1631515242808-497c3fbd3972?w=600&auto=format&fit=crop",
      },
      {
        name: "Prawn Curry",
        image:
          "https://images.unsplash.com/photo-1632660345494-9cc2607f89c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UHJhd24lMjBDdXJyeXxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        name: "Solkadhi",
        image:
          "https://media.istockphoto.com/id/878185832/photo/solkadhi-or-sol-kadhi-a-famous-drink-from-goa-or-maharashtras-konkan-region.webp?a=1&b=1&s=612x612&w=0&k=20&c=fnTMmMFEHZ5GjBjvlWTPwYA0UXK1TrDr_Jbavg1Ky18=",
      },
    ],
  },
];

export default foodQuizData;