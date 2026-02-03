"use client"
import Add_button from './add_button';
import { Search, IndianRupee, Check } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";

const CategorypageUI = ({ catg }) => {
    const [text, settext] = useState("")
    const [Results, setResults] = useState([])
    const [Loading, setLoading] = useState(false)
    const [cart, setCart] = useState([])
    const [addedNotification, setAddedNotification] = useState(null)
    // Use slug instead of hotelSlug - this is the URL-safe field
    const hotelSlug = catg?.[0]?.slug || "hotel";
    const router = useRouter();
    const boxRef = useRef(null);
    console.log("Hotel slug being used:", hotelSlug)
    
    useEffect(() => {
        function handleClickOutside(e) {
            if (boxRef.current && !boxRef.current.contains(e.target)) {
                setResults([]);
                settext("");
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (!text) {
            setResults([]);
            return;
        }
        setLoading(true);

        const timer = setTimeout(async () => {
            try {
                // Pass hotel slug to search API
                const res = await fetch(`/api/search?query=${encodeURIComponent(text)}&hotel=${encodeURIComponent(hotelSlug)}`);
                
                if (!res.ok) {
                    console.error("Search API error:", res.status);
                    setResults([]);
                    setLoading(false);
                    return;
                }

                const data = await res.json();
                console.log("Search results:", data);
                setResults(Array.isArray(data) ? data : []);
                setLoading(false);
            } catch (error) {
                console.error("Search error:", error);
                setResults([]);
                setLoading(false);
            }
        }, 300); // debounce

        return () => clearTimeout(timer);
    }, [text, hotelSlug]);

    // Load cart from localStorage on mount
    useEffect(() => {
        try {
            const raw = localStorage.getItem('cart');
            if (raw) setCart(JSON.parse(raw));
        } catch (e) {
            console.error('Failed to load cart from localStorage', e);
        }
    }, []);

    // Persist cart to localStorage when it changes
    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (e) {
            console.error('Failed to save cart to localStorage', e);
        }
    }, [cart]);

    // Check if item is already in cart
    const isItemInCart = (itemId) => {
        return cart.some(item => item._id === itemId);
    };

    const addToCart = (item) => {
        // Prevent duplicate items - check if item already exists
        if (isItemInCart(item._id)) {
            setAddedNotification(item._id);
            setTimeout(() => setAddedNotification(null), 2000);
            return;
        }

        const payload = {
            _id: item._id,
            name: item.name,
            price: Number(item.price || 0),
            images: item.images || []
        };
        setCart(prev => [...prev, payload]);

        // Show notification
        setAddedNotification(item._id);
        setTimeout(() => setAddedNotification(null), 2000);
    };

    const removeFromCart = (index) => {
        setCart(prev => {
            const copy = [...prev];
            copy.splice(index, 1);
            return copy;
        });
    };

    if (!Array.isArray(catg)) {
        return <div className="p-6">No items found</div>;
    }

    function handleSelect(name) {
        setResults([]);
        settext(name);
        // Pass hotel slug to search page
        router.push(`/search?query=${encodeURIComponent(name)}&hotel=${encodeURIComponent(hotelSlug)}`);
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-orange-50 via-yellow-50 to-amber-50">
            {/* Hero Section with Search */}
            <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/60 z-10" />
                <img
                    src="/food_bg.jpg"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 ">
                    <h1 className="text-4xl md:text-4xl gap-1.5 sm:flex sm:justify-evenly sm:items-baseline font-bold text-white mb-6 drop-shadow-lg">
                        <p>Discover Delicious </p>
                        <p className='align-middle'> Food</p>
                    </h1>

                    <div ref={boxRef} className="relative w-full max-w-2xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => settext(e.target.value)}
                            className="w-full py-4 pl-12 pr-6 rounded-full bg-white/95 backdrop-blur-sm shadow-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all"
                            placeholder="Search your favorite dishes..."
                        />
                        {/* search dropdown */}
                        {text && (
                            <div className="absolute w-full bg-white rounded-3xl shadow-xl mt-2 z-50">
                                {Loading && (
                                    <p className="p-3 text-gray-500">Searching...</p>
                                )}
                                {!Loading && Results.length === 0 && (
                                    <p className="p-3 text-gray-500">No results found in this hotel</p>
                                )}
                                {!Loading &&
                                    Results.map((item) => (
                                        <div
                                            key={item._id}
                                            onClick={() => handleSelect(item.name)}
                                            className="p-3 cursor-pointer rounded-lg hover:bg-gray-100 border-b last:border-b-0"
                                        >
                                            <p className="font-medium text-gray-800">{item.name}</p>
                                            <p className="text-sm text-gray-500">₹{item.price}</p>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='text-3xl font-medium p-4 '>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">All items</h2>
                <p className="text-xl text-gray-600">Explore your favourite</p>
            </div>

            {/* Menu Grid - Vertical Scrolling Only */}
            <div className="max-w-7xl mx-auto px-4 py-8 rounded-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {catg.map((val) => {
                        const inCart = isItemInCart(val._id);
                        const isNotifying = addedNotification === val._id;

                        return (
                            <div
                                key={val._id}
                                className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                            >
                                {/* Image Container */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={val.images?.[0]?.url || "/food_bg.jpg"}
                                        alt={val.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors">
                                        {val.name}
                                    </h3>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-1">
                                            <IndianRupee className="w-5 h-5 text-emerald-600" />
                                            <span className="text-2xl font-bold text-emerald-600">{val.price}</span>
                                        </div>

                                        <div className="flex items-center space-x-1 text-yellow-500">
                                            <span className="text-lg">⭐</span>
                                            <span className="text-gray-600 font-medium">{val.category}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => addToCart(val)}
                                            className={`flex-1 py-3 rounded-2xl font-semibold transform transition-all duration-300 shadow-lg hover:shadow-xl ${
                                                inCart
                                                    ? 'bg-green-500 hover:bg-green-600 text-white'
                                                    : 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white hover:from-amber-600 hover:via-orange-600 hover:to-red-600 hover:scale-105'
                                            }`}
                                        >
                                            {inCart ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <Check className="w-5 h-5" />
                                                    In Cart
                                                </span>
                                            ) : isNotifying ? (
                                                'Added! ✓'
                                            ) : (
                                                'Add to Cart'
                                            )}
                                        </button>

                                        <a href={`/${hotelSlug}/info/${val._id}`}>
                                            <button className="px-4 py-3 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition-colors">
                                                ℹ️
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <Add_button data={cart} onRemoveItem={removeFromCart} />
        </div>
    );
}

export default CategorypageUI