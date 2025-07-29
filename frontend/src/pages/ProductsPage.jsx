import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
const backendURL = import.meta.env.VITE_BACKEND_URL;

import AdminProduct from "../components/AdminProduct";
import {
  Search,
  Filter,
  Star,
  Droplets,
  Thermometer,
  Shield,
  Clock,
  Beaker,
  Wrench,
  Truck,
  Factory,
} from "lucide-react";
import img3 from "../img/Greases/Lithomax Ep 2.png";
import img4 from "../img/Greases/Lithplex Blue 220.png";
import img5 from "../img/Greases/SULPHOCAL 220.png";
import img6 from "../img/Greases/polyplex EM 100.png";
import img7 from "../img/Greases/polyplex HT 460.png";
import img8 from "../img/Greases/Spinplex 22.png";
import img1 from "../img/Hydromax Series/Hydromax HVI 46.png";
import img2 from "../img/Hydromax Series/Hydromax AW 68.png";
import img9 from "../img/Hydromax Series/Hydromax HLPD 68.png";
import img10 from "../img/Hydromax Series/Hydromax HLPD 46.png";
import img11 from "../img/Hydromax Series/Hydromax AW 32.png";
import img12 from "../img/Hydromax Series/Hydromax AW 46.png";
import img13 from "../img/Aerosols/Anti Spatter Spray.jpg";
import img14 from "../img/Aerosols/Electrical Contact Cleaner Spray.jpg";
import img15 from "../img/Aerosols/PCB card coating spray.jpg";
import img16 from "../img/Aerosols/Rust Penetrate Spray.jpg";
import img17 from "../img/Engine Oil series/Engine Oil Turbo-X 15W40 CI4 Plus.png";
import img18 from "../img/Gear Oil series/Geardrive EP 100.png";
import img19 from "../img/Gear Oil series/Geardrive EP 150.png";
import img20 from "../img/Gear Oil series/Geardrive EP 220.png";
import img21 from "../img/Gear Oil series/Geardrive EP 320.jpg";
import img22 from "../img/Gear Oil series/Geardrive EP 460.png";
import img23 from "../img/Gear Oil series/Geardrive EP 680.png";
import img24 from "../img/Gear Oil series/Geardrive Synth EP 220.png";
import img25 from "../img/Gear Oil series/Geardrive Synth EP 320.png";
import img26 from "../img/Gear Oil series/Geardrive Synth PG 220.png";
import img27 from "../img/Gear Oil series/Geardrive Synth PG 320.png";
import img28 from "../img/Greases/Lithomax Ep 0.png";
import img29 from "../img/Greases/Lithomax Ep 00.png";
import img30 from "../img/Greases/Lithomax Ep 1.png";
import img31 from "../img/Greases/Lithomax Ep 3.png";
import img32 from "../img/Greases/SULPHOCAL 460.png";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  // Function to fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendURL}/api/products`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      
      // Transform API products to match your existing product structure
      const transformedProducts = data.products.map((product) => ({
        id: product._id,
        name: product.heading,
        category: "api-product", // You can modify this based on your needs
        image: `${backendURL}${product.image}`, // Full URL for the image
        rating: 4.5, // Default rating, you can add this field to your backend
        description: product.description,
        volume: product.availablesizes,
        specifications: {
          viscosityIndex: product.viscosityindex,
          flashPoint: product.flashpoint,
          applications: product.applications,
        },
        features: product.keyfeatures || [], // Ensure it's an array
        certifications: product.certifications || [], // Ensure it's an array
        isApiProduct: true, // Flag to identify API products
      }));
      
      setApiProducts(transformedProducts);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products from server");
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Refetch products when a new product is added
  const handleProductAdded = () => {
    fetchProducts();
  };

  // Updated lubricant features
  const lubricantFeatures = [
    { id: "high-temp", name: "High Temperature Resistant" },
    { id: "extended-life", name: "Extended Service Life" },
    { id: "synthetic", name: "Synthetic Formula" },
    { id: "biodegradable", name: "Biodegradable" },
    { id: "water-resistant", name: "Water Resistant" },
    { id: "anti-wear", name: "Anti-Wear Protection" },
    { id: "extreme-pressure", name: "Extreme Pressure" },
  ];

  const handleFeatureChange = (featureId) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  // Updated hardcoded products with corrected information and new categories
  const hardcodedProducts = [
    // Hydromax AW Series
    {
      id: "2",
      name: "Hydromax AW 68",
      category: "hydromax-aw",
      image: img2,
      rating: 4.3,
      description:
        "High performance anti-wear hydraulic fluid formulated with premium base oils and advanced additive technology. Provides excellent protection against wear, oxidation, and foam formation in hydraulic systems.",
      specifications: [
        "Vickers I-286-S & M-2950-S",
        "AFNOR NF E 48-603 HM",
        "DIN 51 524 PART 2 (HLP)",
        "VDMA 24318",
        "US STEEL 126/127",
        "Thyssen TH-N-256132",
        "FZG A/8.3/90 > 12 (ISO VG 46 and higher)",
        "FZG A/8.3/90 = 12 (ISO VG 15, 22 and 32)",
        "CINCINATTI MILACRON P68/P69/P70 (ISO VG 32-68)"
      ],
      features: ["Anti-Wear Protection", "Extended Service Life"],
      isApiProduct: false,
    },
    {
      id: "11",
      name: "Hydromax AW 32",
      category: "hydromax-aw",
      image: img11,
      rating: 4.7,
      description:
        "Premium anti-wear hydraulic fluid designed for mobile and stationary hydraulic systems. Excellent thermal stability and oxidation resistance ensure reliable performance under demanding conditions.",
      specifications: [
        "Vickers I-286-S & M-2950-S",
        "AFNOR NF E 48-603 HM",
        "DIN 51 524 PART 2 (HLP)",
        "VDMA 24318",
        "US STEEL 126/127",
        "ISO 11158 HM",
        "FZG A/8.3/90 = 12"
      ],
      features: ["Anti-Wear Protection", "Extended Service Life"],
      isApiProduct: false,
    },
    {
      id: "12",
      name: "Hydromax AW 46",
      category: "hydromax-aw",
      image: img12,
      rating: 4.5,
      description:
        "High-quality anti-wear hydraulic oil with excellent shear stability and thermal properties. Formulated to provide superior protection for hydraulic pumps, motors, and valves.",
      specifications: [
        "Vickers I-286-S & M-2950-S",
        "AFNOR NF E 48-603 HM",
        "DIN 51 524 PART 2 (HLP)",
        "VDMA 24318",
        "US STEEL 126/127",
        "ISO 11158 HM",
        "Denison HF-0, HF-1, HF-2"
      ],
      features: ["Anti-Wear Protection", "Extended Service Life"],
      isApiProduct: false,
    },

    // Hydromax HVI Series
    {
      id: "1",
      name: "Hydromax HVI 46",
      category: "hydromax-hvi",
      image: img1,
      rating: 4.5,
      description:
        "High Viscosity Index hydraulic fluid with exceptional thermal stability and low temperature fluidity. Engineered for applications requiring wide temperature operation and extended service intervals.",
      specifications: [
        "Vickers I-286-S & M-2950-S",
        "AFNOR NF E 48-603 HL",
        "DIN 51 524 PART 3 (HVLP)",
        "FZG A/8.3/90 > 12 (ISO VG 46 and 68)",
        "FZG A/8.3/90 = 12 (ISO VG 32)",
        "CINCINATTI MILACRON P68/P69/P70 (ISO VG 32-68)",
        "VDMA 24318",
        "Thyssen HT-N-256132",
        "US STEEL 126/127",
      ],
      features: ["High Temperature Resistant", "Extended Service Life", "Water Resistant"],
      isApiProduct: false,
    },
    {
      id: "9",
      name: "Hydromax HVI 68",
      category: "hydromax-hvi",
      image: img9,
      rating: 4.6,
      description:
        "Premium High Viscosity Index hydraulic oil offering superior performance across extreme temperature ranges. Features advanced additive package for maximum equipment protection and reliability.",
      specifications: [
        "Vickers I-286-S & M-2950-S",
        "AFNOR NF E 48-603 HL",
        "DIN 51 524 PART 3 (HVLP)",
        "ISO 11158 HV",
        "VDMA 24318",
        "FZG A/8.3/90 > 12"
      ],
      features: ["High Temperature Resistant", "Extended Service Life", "Water Resistant"],
      isApiProduct: false,
    },

    // Polyplex HT 460 Series
    {
      id: "7",
      name: "Polyplex HT 460",
      category: "polyplex-ht",
      image: img7,
      rating: 4.5,
      description:
        "Advanced high-temperature grease formulated with synthetic base oil and polyurea thickener. Engineered for extreme temperature applications with exceptional thermal stability and long service life.",
      specifications: [
        "Operating Temperature: -40°C to +180°C",
        "NLGI Grade 2",
        "Drop Point: >250°C",
        "Base Oil Viscosity @ 40°C: 460 cSt",
        "Water Resistance: Pass",
        "Four Ball Weld Load: >400 kg",
        "Copper Corrosion: 1b max",
        "Oil Separation @ 100°C: <5%"
      ],
      features: ["High Temperature Resistant", "Extended Service Life", "Extreme Pressure"],
      isApiProduct: false,
    },

    // Lithomax EP2 Grease Series
    {
      id: "3",
      name: "Lithomax EP 2",
      category: "lithomax-ep2",
      image: img3,
      rating: 4.7,
      description:
        "Multi-purpose lithium complex grease with extreme pressure additives. Specially formulated for heavy-duty applications in automotive, industrial, and off-road equipment requiring superior load-carrying capacity.",
      specifications: [
        "NLGI Grade 2",
        "Lithium Complex Thickener",
        "Operating Temperature: -20°C to +150°C",
        "Drop Point: >250°C",
        "DIN 51502: K2P-20",
        "DIN 51825: KP2P-20",
        "ISO 6743/9: L-XCEEB2",
        "Four Ball EP Test: Weld Load >315 kg"
      ],
      features: ["Extreme Pressure", "High Temperature Resistant", "Water Resistant"],
      isApiProduct: false,
    },
    {
      id: "28",
      name: "Lithomax EP 0",
      category: "lithomax-ep2",
      image: img28,
      rating: 4.4,
      description:
        "Semi-fluid lithium complex grease designed for centralized lubrication systems and applications requiring pumpable consistency with extreme pressure protection.",
      specifications: [
        "NLGI Grade 0",
        "Lithium Complex Thickener",
        "Operating Temperature: -25°C to +140°C",
        "Drop Point: >250°C",
        "DIN 51502: K0P-25"
      ],
      features: ["Extreme Pressure", "Extended Service Life"],
      isApiProduct: false,
    },
    {
      id: "29",
      name: "Lithomax EP 00",
      category: "lithomax-ep2",
      image: img29,
      rating: 4.3,
      description:
        "Very soft lithium complex grease ideal for centralized lubrication systems and sealed-for-life applications requiring fluid-like consistency.",
      specifications: [
        "NLGI Grade 00",
        "Lithium Complex Thickener", 
        "Operating Temperature: -30°C to +130°C",
        "Drop Point: >250°C"
      ],
      features: ["Extreme Pressure", "Extended Service Life"],
      isApiProduct: false,
    },
    {
      id: "30",
      name: "Lithomax EP 1",
      category: "lithomax-ep2",
      image: img30,
      rating: 4.5,
      description:
        "Soft lithium complex grease suitable for high-speed bearings and applications where reduced churning and lower operating temperatures are desired.",
      specifications: [
        "NLGI Grade 1",
        "Lithium Complex Thickener",
        "Operating Temperature: -25°C to +150°C",
        "Drop Point: >250°C"
      ],
      features: ["Extreme Pressure", "High Temperature Resistant"],
      isApiProduct: false,
    },
    {
      id: "31",
      name: "Lithomax EP 3",
      category: "lithomax-ep2",
      image: img31,
      rating: 4.6,
      description:
        "Heavy-duty lithium complex grease for applications subjected to shock loading, vibration, and extreme pressures. Ideal for chassis lubrication and heavy equipment.",
      specifications: [
        "NLGI Grade 3",
        "Lithium Complex Thickener",
        "Operating Temperature: -15°C to +150°C",
        "Drop Point: >250°C"
      ],
      features: ["Extreme Pressure", "High Temperature Resistant"],
      isApiProduct: false,
    },

    // Lithplex Blue 220 Series
    {
      id: "4",
      name: "Lithplex Blue 220",
      category: "lithplex-blue",
      image: img4,
      rating: 4.6,
      description:
        "Premium blue-colored lithium complex grease engineered for universal applications. Features excellent mechanical stability, water resistance, and protection against wear and corrosion in demanding industrial environments.",
      specifications: [
        "NLGI Grade 2",
        "Lithium Complex Thickener",
        "Base Oil Viscosity @ 40°C: 220 cSt",
        "Operating Temperature: -30°C to +160°C",
        "Drop Point: >250°C",
        "DIN 51502: K2P-30",
        "DIN 51825: KP2P-30",
        "ISO 6743/9: L-XCEEB2",
        "ASTM D-4950: GC/LB",
        "Water Washout @ 79°C: <10%"
      ],
      features: ["High Temperature Resistant", "Extended Service Life", "Water Resistant"],
      isApiProduct: false,
    },

    // Other existing products with updated categories
    {
      id: "5",
      name: "Sulphocal 220",
      category: "other-products",
      image: img5,
      rating: 4.8,
      description:
        "Calcium sulphonate complex thickened grease based on mineral oil with high drop point and excellent resistance to water, salt water, and corrosive environments.",
      specifications: [
        "DIN 51502", "DIN 51825 KP2U-30 / OG2U-30", "ISO 6743-9 L-XBFHB2",
      ],
      features: ["Biodegradable", "High Temperature Resistant", "Water Resistant"],
      isApiProduct: false,
    },
    {
      id: "6",
      name: "Polyplex EM 100",
      category: "other-products",
      image: img6,
      rating: 4.4,
      description:
        "Special synthetic grease formulated for electric motor bearings and applications requiring low noise operation and extended service life.",
      specifications: [
        "Medium and high speed bearings", "Bearings in cold environments and cooling systems", "Electric motor bearings", "Fan bearings, exhausters and pumps", "Oven wagon and drying tunnel bearings", "Bearings in conveyor belts", "Bearings and bolts in chains operated under strong temperatures variations", "Plain bearings and joints in plastic-plastic and plastic-metal contacts","Lubrication of wire guides, plastic bearings and slides",
      ],
      features: ["Synthetic Formula", "Extended Service Life"],
      isApiProduct: false,
    },
    {
      id: "8",
      name: "Spinplex 22",
      category: "other-products",
      image: img8,
      rating: 4.3,
      description:
      "Complex soap thickened synthetic grease with high resistance to oxidation, superior anticorrosive capacity, and excellent adhesion properties.",
      features: ["Synthetic Formula", "Biodegradable"],
      isApiProduct: false,
    },
    {
      id: "10",
      name: "Hydromax HLPD 46",
      category: "other-products",
      image: img10,
      rating: 4.4,
      description:
        "Detergent hydraulic fluid with ashless chemistry, designed for systems requiring miscibility with water and superior cleanliness.",
      features: ["Biodegradable", "Extended Service Life"],
      isApiProduct: false,
    },
    {
      id: "13",
      name: "Anti Spatter Spray",
      category: "other-products",
      image: img13,
      rating: 4.2,
      description:
        "High-performance aerosol formulation designed to prevent welding spatter from adhering to metal surfaces and equipment.",
      features: ["Synthetic Formula"],
      isApiProduct: false,
    },
    {
      id: "14",
      name: "Electrical Contact Cleaner Spray",
      category: "other-products",
      image: img14,
      rating: 4.3,
      description:
        "Specialized aerosol cleaner for removing dirt, grease, and oxidation from electrical contacts and connections.",
      specifications: [
        "Safe for use on plastics and rubber",
      ],
      features: ["Biodegradable"],
      isApiProduct: false,
    },
    {
      id: "15",
      name: "PCB Card Coating Spray",
      category: "other-products",
      image: img15,
      rating: 4.4,
      description:
        "Fast-drying, transparent protective conformal coating for printed circuit boards and electronic components.",
      features: ["Extended Service Life"],
      isApiProduct: false,
    },
    {
      id: "16",
      name: "Rust Penetrate Spray",
      category: "other-products",
      image: img16,
      rating: 4.6,
      description:
        "Powerful penetrating oil designed to loosen rusted or corroded parts with excellent lubrication properties.",
      features: ["High Temperature Resistant"],
      isApiProduct: false,
    },
    {
      id: "17",
      name: "Engine Oil Turbo-X 15W40 CI4 Plus",
      category: "other-products",
      image: img17,
      rating: 4.8,
      description:
        "High-performance, multi-grade engine oil designed for turbocharged and naturally aspirated diesel engines.",
      features: ["Synthetic Formula", "High Temperature Resistant", "Extended Service Life"],
      isApiProduct: false,
    },
    {
      id: "18",
      name: "GearDrive EP 100",
      category: "other-products",
      image: img18,
      rating: 4.5,
      description:
        "High-performance gear oil formulated to provide superior lubrication and protection for various gear systems.",
      features: ["High Temperature Resistant", "Extended Service Life"],
      isApiProduct: false,
    },
    {
      id: "19",
      name: "GearDrive EP 150",
      category: "other-products",
      image: img19,
      rating: 4.4,
      description:
        "High-performance gear oil designed to withstand extreme pressure and temperature conditions.",
      features: ["High Temperature Resistant", "Extended Service Life"],
      isApiProduct: false,
    },
    {
      id: "20",
      name: "GearDrive EP 220",
      category: "other-products",
      image: img20,
      rating: 4.6,
      description:
        "Premium gear oil providing superior lubrication and protection for heavy-duty gear applications.",
      features: ["High Temperature Resistant", "Extended Service Life"],
      isApiProduct: false,
    },
    {
      id: "21",
      name: "GearDrive EP 320",
      category: "other-products",
      image: img21,
      rating: 4.7,
      description:
        "Heavy-duty gear oil engineered for extreme pressure conditions and extended service intervals.",
      features: ["High Temperature Resistant", "Extended Service Life"],
      isApiProduct: false,
    },
    {
      id: "22",
      name: "GearDrive EP 460",
      category: "other-products",
      image: img22,
      rating: 4.5,
      description:
        "High-viscosity gear oil for applications requiring superior load-carrying capacity.",
      features: ["High Temperature Resistant", "Extended Service Life"],
      isApiProduct: false,
    },
    {
      id: "23",
      name: "GearDrive EP 680",
      category: "other-products",
      image: img23,
      rating: 4.8,
      description:
        "Extra heavy-duty gear oil designed for the most demanding industrial applications.",
      features: ["High Temperature Resistant", "Extended Service Life"],
      isApiProduct: false,
    },
    {
      id: "24",
      name: "Geardrive Synth EP 220",
      category: "other-products",
      image: img24,
      rating: 4.9,
      description:
        "Synthetic gear oil designed for high-performance applications with excellent thermal stability.",
      features: ["Synthetic Formula", "High Temperature Resistant", "Extended Service Life"],
      isApiProduct: false,
    },
    {
      id: "25",
      name: "Geardrive Synth EP 320",
      category: "other-products",
      image: img25,
      rating: 4.8,
      description:
        "Premium synthetic gear oil providing superior protection under extreme operating conditions.",
      features: ["Synthetic Formula", "High Temperature Resistant", "Extended Service Life"],
      isApiProduct: false,
    },
    {
      id: "26",
      name: "Geardrive Synth PG 220",
      category: "other-products",
      image: img26,
      rating: 4.7,
      description:
        "Biodegradable synthetic gear oil meeting environmental requirements without compromising performance.",
      features: ["Synthetic Formula", "Biodegradable", "Extended Service Life"],
      isApiProduct: false,
    },
    {
      id: "27",
      name: "Geardrive Synth PG 320",
      category: "other-products",
      image: img27,
      rating: 4.6,
      description:
        "Environmentally friendly synthetic gear oil with exceptional biodegradability and performance.",
      features: ["Synthetic Formula", "Biodegradable", "Extended Service Life"],
      isApiProduct: false,
    },
    {
      id: "32",
      name: "Sulphocal 460",
      category: "other-products",
      image: img32,
      rating: 4.7,
      description:
        "High-performance calcium sulphonate complex grease for heavy-duty applications with excellent water resistance.",
      features: ["Biodegradable", "High Temperature Resistant", "Water Resistant"],
      isApiProduct: false,
    },
  ];

  // Combine hardcoded products with API products
  const allProducts = [...hardcodedProducts, ...apiProducts];

  // Updated categories with new structure
  const categories = [
    { id: "all", name: "All Products", icon: <Droplets className="h-4 w-4" /> },
    {
      id: "hydromax-aw",
      name: "Hydromax AW Series",
      icon: <Factory className="h-4 w-4" />,
    },
    {
      id: "hydromax-hvi",
      name: "Hydromax HVI Series",
      icon: <Factory className="h-4 w-4" />,
    },
    {
      id: "polyplex-ht",
      name: "Polyplex HT 460",
      icon: <Thermometer className="h-4 w-4" />,
    },
    {
      id: "lithomax-ep2",
      name: "Lithomax EP2 Grease",
      icon: <Shield className="h-4 w-4" />,
    },
    {
      id: "lithplex-blue",
      name: "Lithplex 220 Blue",
      icon: <Droplets className="h-4 w-4" />,
    },
    {
      id: "other-products",
      name: "Other Products",
      icon: <Beaker className="h-4 w-4" />,
    },
  ];

  // FILTERING LOGIC
  const filteredProducts = allProducts
    .filter((product) => {
      // Category filter
      const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
      
      // Search filter
      const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Features filter
      const featuresMatch = selectedFeatures.length === 0 || 
        selectedFeatures.some((featureId) => {
          const featureName = lubricantFeatures.find(f => f.id === featureId)?.name;
          return product.features && Array.isArray(product.features) && 
                 product.features.includes(featureName);
        });

      return categoryMatch && searchMatch;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading && apiProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-200 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

return (
    <div className="min-h-screen bg-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Our Products
          </h1>
          <p className="text-gray-600">
            Discover our comprehensive range of premium lubricants and
            industrial fluids
          </p>
          {error && (
            <div className="mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="category">Sort by Category</option>
              </select>
            </div>
          </div>

          {/* Lubricant Features Checkboxes */}
          <div className="border-t pt-6">

            {selectedFeatures.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">
                  Selected features:
                </span>
                {selectedFeatures.map((featureId) => {
                  const feature = lubricantFeatures.find(
                    (f) => f.id === featureId
                  );
                  return (
                    <span
                      key={featureId}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {feature?.name}
                      <button
                        onClick={() => handleFeatureChange(featureId)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
                <button
                  onClick={() => setSelectedFeatures([])}
                  className="text-xs text-gray-500 hover:text-gray-700 underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-3xl bg-white shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
            >
              {/* Product Image */}
              <div className="mb-4 flex justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-32 w-32 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = img1;
                  }}
                />
              </div>

              {/* Product Name & Description */}
              <div className="mb-4">
                <h3 className="text-base sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-semibold text-gray-900">
                  {product.name}
                  {product.isApiProduct && (
                    <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      New
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                  {product.description}
                </p>
                
              </div>

              {/* View Details Button */}
              <button 
                onClick={() => { handleViewDetails(product) }} 
                className="mt-auto boton-elegante mb-2"
              >
                Details
              </button>

              <style>{`
                .boton-elegante {
                  width: 80%;
                  margin: 0 auto;
                  padding: 10px 20px;
                  border: 2px solid #2c2c2c;
                  background-color: #1a1a1a;
                  color: #ffffff;
                  font-size: 1rem;
                  cursor: pointer;
                  border-radius: 30px;
                  transition: all 0.4s ease;
                  outline: none;
                  position: relative;
                  overflow: hidden;
                  font-weight: bold;
                  mt-auto;
                }

                .boton-elegante::after {
                  content: "";
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: radial-gradient(
                    circle,
                    rgba(255, 255, 255, 0.25) 0%,
                    rgba(255, 255, 255, 0) 70%
                  );
                  transform: scale(0);
                  transition: transform 0.5s ease;
                }

                .boton-elegante:hover::after {
                  transform: scale(4);
                }

                .boton-elegante:hover {
                  border-color: #666666;
                  background: #292929;
                }

                .line-clamp-3 {
                  display: -webkit-box;
                  -webkit-line-clamp: 3;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                }
              `}</style>
            </div>
          ))}
        </div>

        {/* Product Detail Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              key="product-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            >
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-6 rounded-lg max-w-[80%] w-full shadow-lg relative overflow-y-auto max-h-[90vh]"
              >
                <button
                  onClick={handleCloseModal}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-lg z-10"
                >
                  ✕
                </button>

                <div className="flex flex-col md:flex-row gap-4">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full md:w-1/2 h-auto rounded-xl object-cover"
                    onError={(e) => {
                      e.target.src = img1;
                    }}
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">
                      {selectedProduct.name}
                    </h2>
                  

                    <p className="text-gray-700 mb-4">
                      {selectedProduct.description}
                    </p>

                    {selectedProduct.viscosity && (
                      <p className="mb-2">
                        <strong>Viscosity:</strong> {selectedProduct.viscosity}
                      </p>
                    )}
                    {selectedProduct.volume && (
                      <p className="mb-2">
                        <strong>Available Volumes:</strong> {selectedProduct.volume}
                      </p>
                    )}

                    {selectedProduct.specifications && (
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Specifications:</h4>
                        {Array.isArray(selectedProduct.specifications) ? (
                          <ul className="list-disc list-inside text-sm text-gray-700">
                            {selectedProduct.specifications.map((spec, idx) => (
                              <li key={idx}>{spec}</li>
                            ))}
                          </ul>
                        ) : (
                          <ul className="list-disc list-inside text-sm text-gray-700">
                            {Object.entries(selectedProduct.specifications).map(
                              ([key, value]) => (
                                <li key={key}>
                                  <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</strong>{" "}
                                  {Array.isArray(value) ? value.join(", ") : value}
                                </li>
                              )
                            )}
                          </ul>
                        )}
                      </div>
                    )}

                    {selectedProduct.features && selectedProduct.features.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Key Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.features.map((feature, idx) => (
                            <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedProduct.certifications && selectedProduct.certifications.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Certifications:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                          {selectedProduct.certifications.map((cert, idx) => (
                            <li key={idx}>{cert}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <img
              src="/LOGO2.jpg"
              alt="Company Logo"
              className="h-20 w-auto mx-auto mb-4 opacity-35"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}

        {/* Product Count */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {allProducts.length} products
            {apiProducts.length > 0 && (
              <span className="text-green-600 ml-2">
                ({apiProducts.length} from database)
              </span>
            )}
          </p>
        </div>

        {/* Add Product Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAddProduct((prev) => !prev)}
            className="bg-black text-white px-6 py-2 rounded-md shadow-md hover:bg-gray-700 transition duration-300"
          >
            {showAddProduct ? "Hide Add Product" : "Add Product"}
          </button>
        </div>

        {showAddProduct && (
          <div className="flex flex-col items-center mt-8 gap-4 w-full">
            <h2 className="text-[32px] font-bold">Add New Product</h2>
            <div className="w-full max-w-2xl">
              <AdminProduct onProductAdded={handleProductAdded} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductsPage;