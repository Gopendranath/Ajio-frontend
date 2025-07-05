interface Category {
    name: string
    items: {
        name: string
        subcategories: {
            name: string
            items: string[]
        }[]
    }[]
}

export const categories: Category[] = [
  {
    name: "MEN",
    items: [
      {
        name: "Clothing",
        subcategories: [
          { name: "T-Shirts & Polos", items: ["Casual T-Shirts", "Polo T-Shirts", "Henley T-Shirts"] },
          { name: "Shirts", items: ["Casual Shirts", "Formal Shirts", "Printed Shirts"] },
          { name: "Jeans & Trousers", items: ["Skinny Jeans", "Regular Jeans", "Chinos", "Formal Trousers"] },
          { name: "Ethnic Wear", items: ["Kurtas", "Sherwanis", "Dhoti Pants"] },
        ],
      },
      {
        name: "Footwear",
        subcategories: [
          { name: "Casual Shoes", items: ["Sneakers", "Loafers", "Canvas Shoes"] },
          { name: "Formal Shoes", items: ["Oxford", "Derby", "Brogues"] },
          { name: "Sports Shoes", items: ["Running Shoes", "Training Shoes", "Basketball Shoes"] },
        ],
      },
      {
        name: "Accessories",
        subcategories: [
          { name: "Watches", items: ["Analog", "Digital", "Smart Watches"] },
          { name: "Bags", items: ["Backpacks", "Laptop Bags", "Travel Bags"] },
          { name: "Personal Care", items: ["Grooming", "Fragrances", "Skincare"] },
        ],
      },
    ],
  },
  {
    name: "WOMEN",
    items: [
      {
        name: "Clothing",
        subcategories: [
          { name: "Western Wear", items: ["Dresses", "Tops & Tunics", "Jeans", "Skirts"] },
          { name: "Ethnic Wear", items: ["Sarees", "Salwar Suits", "Lehenga", "Kurtis"] },
          { name: "Lingerie & Sleepwear", items: ["Bras", "Panties", "Nightwear", "Shapewear"] },
        ],
      },
      {
        name: "Footwear",
        subcategories: [
          { name: "Heels", items: ["Stilettos", "Block Heels", "Wedges"] },
          { name: "Flats", items: ["Ballerinas", "Loafers", "Moccasins"] },
          { name: "Sneakers", items: ["Casual Sneakers", "Sports Shoes", "High-tops"] },
        ],
      },
      {
        name: "Accessories",
        subcategories: [
          { name: "Handbags", items: ["Tote Bags", "Sling Bags", "Clutches"] },
          { name: "Jewelry", items: ["Earrings", "Necklaces", "Bracelets"] },
          { name: "Beauty", items: ["Makeup", "Skincare", "Hair Care"] },
        ],
      },
    ],
  },
  {
    name: "KIDS",
    items: [
      {
        name: "Boys (2-14 Years)",
        subcategories: [
          { name: "Clothing", items: ["T-Shirts", "Shirts", "Jeans", "Shorts"] },
          { name: "Footwear", items: ["School Shoes", "Sneakers", "Sandals"] },
          { name: "Accessories", items: ["Bags", "Watches", "Caps"] },
        ],
      },
      {
        name: "Girls (2-14 Years)",
        subcategories: [
          { name: "Clothing", items: ["Dresses", "Tops", "Jeans", "Skirts"] },
          { name: "Footwear", items: ["School Shoes", "Sneakers", "Sandals"] },
          { name: "Accessories", items: ["Hair Accessories", "Bags", "Jewelry"] },
        ],
      },
      {
        name: "Infants (0-2 Years)",
        subcategories: [
          { name: "Baby Clothing", items: ["Onesies", "Rompers", "Sets"] },
          { name: "Baby Care", items: ["Diapers", "Baby Food", "Toys"] },
        ],
      },
    ],
  },
  {
    name: "HOME & LIVING",
    items: [
      {
        name: "Home Decor",
        subcategories: [
          { name: "Wall Decor", items: ["Wall Art", "Mirrors", "Wall Stickers"] },
          { name: "Lighting", items: ["Table Lamps", "Floor Lamps", "Ceiling Lights"] },
          { name: "Furnishing", items: ["Cushions", "Curtains", "Rugs"] },
        ],
      },
      {
        name: "Kitchen & Dining",
        subcategories: [
          { name: "Cookware", items: ["Pans", "Pots", "Pressure Cookers"] },
          { name: "Dinnerware", items: ["Plates", "Bowls", "Glasses"] },
          { name: "Storage", items: ["Containers", "Jars", "Organizers"] },
        ],
      },
      {
        name: "Bedding & Bath",
        subcategories: [
          { name: "Bed Linen", items: ["Bed Sheets", "Comforters", "Pillows"] },
          { name: "Bath Linen", items: ["Towels", "Bath Mats", "Shower Curtains"] },
        ],
      },
    ],
  },
]
