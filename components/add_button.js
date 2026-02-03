"use client"
import { useState, useEffect, useRef } from 'react'

const Add_button = ({ data = [], onRemoveItem }) => {
    const [open, setOpen] = useState(false)
    const [selectedTab, setSelectedTab] = useState('items')
    const scrollRef = useRef(null)
    console.log("data count :", data.length);
    
    useEffect(() => {
        if (open) {
            document.body.classList.add('no-scroll')
        } else {
            document.body.classList.remove('no-scroll')
        }
        return () => document.body.classList.remove('no-scroll')
    }, [open])

    const deleteItem = (index) => onRemoveItem?.(index)
    const total = data.reduce((sum, item) => sum + Number(item.price || 0), 0)

    // Check if item is in cart by _id
    const isItemInCart = (itemId) => {
        return data.some(item => item._id === itemId)
    }

    return (
        <>
            {/* Floating Action Button */}
            <div className="fixed bottom-8 right-8 z-[999]">
                <div
                    onClick={() => setOpen(!open)}
                    className="relative w-24 h-24 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 shadow-2xl hover:shadow-purple-500/50 rounded-3xl p-6 flex items-center justify-center cursor-pointer transition-all duration-500 hover:scale-110 active:scale-105 group"
                >
                    {data.length > 0 &&
                        <div
                            key={data.length}
                            className="bg-red-600 rounded-full min-w-[20px] h-5 px-1.5 absolute top-0 left-0 flex items-center justify-center text-white text-xs font-medium shadow-lg"
                            style={{
                                animation: 'badgePop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                            }}
                        >
                            {data.length}
                        </div>
                    }
                    <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl animate-pulse opacity-75 group-hover:opacity-100" />
                    <div className="relative z-10">
                        {open ? (
                            <svg className="w-8 h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <span className="text-3xl">🛍️</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Side Slide Panel */}
            <div className={`fixed inset-0 z-[1000] transition-transform duration-700 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent backdrop-blur-sm"
                    onClick={() => setOpen(false)}
                />

                {/* Slide Panel */}
                <div className="relative w-full max-w-sm h-[95%] bg-gradient-to-b rounded-3xl from-indigo-900/95 via-purple-900/90 to-slate-900/95 backdrop-blur-2xl border-l-2 border-indigo-500/30 shadow-2xl flex flex-col">

                    {/* Panel Header */}
                    <div className="p-8 border-b border-indigo-500/20 flex-shrink-0">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-300 via-white to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
                                    Cart
                                </h1>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                                    <span className="text-indigo-200 font-medium">{data.length} items</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold transition-all duration-300 hover:scale-110"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex bg-white/5 backdrop-blur-sm rounded-2xl p-1">
                            <button
                                onClick={() => setSelectedTab('items')}
                                className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-300 ${selectedTab === 'items'
                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                                    : 'text-indigo-200 hover:text-white'
                                    }`}
                            >
                                Items
                            </button>
                            <button
                                onClick={() => setSelectedTab('summary')}
                                className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-300 ${selectedTab === 'summary'
                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                                    : 'text-indigo-200 hover:text-white'
                                    }`}
                            >
                                Summary
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 flex overflow-hidden">
                        {selectedTab === 'items' ? (
                            /* Items List - Perfect Scroll */
                            <div ref={scrollRef} className="flex-1 overflow-y-auto py-6 px-6 scrollbar-thin scrollbar-thumb-purple-500/80 scrollbar-track-indigo-900/50">
                                {data.length > 0 ? (
                                    data.map((item, index) => (
                                        <div key={`${item._id}-${index}`} className="group mb-8 last:mb-0">
                                            <div className="p-6 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl rounded-3xl border border-indigo-500/20 hover:border-indigo-400/40 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden">
                                                {/* Decorative blob */}
                                                <div className="absolute top-0 -right-12 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-indigo-500/10 rounded-full blur-xl group-hover:scale-110 transition-transform duration-700" />

                                                <div className="relative z-10 flex items-center justify-between">
                                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                                        <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500/30 to-indigo-500/30 rounded-2xl p-2 flex-shrink-0 shadow-2xl">
                                                            <div className="w-full h-full rounded-xl bg-gradient-to-br from-purple-400/80 to-indigo-400/80 flex items-center justify-center backdrop-blur-md">
                                                                <span className="text-white font-black text-xl drop-shadow-lg">
                                                                    {item.name?.[0]?.toUpperCase() || 'I'}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="min-w-0 flex-1">
                                                            <h3 className="font-black text-2xl text-white truncate group-hover:text-indigo-100 transition-all duration-300">
                                                                {item.name || 'Unknown Item'}
                                                            </h3>
                                                            <p className="text-emerald-400 font-black text-3xl mt-2 drop-shadow-lg">
                                                                ₹{Number(item.price || 0).toLocaleString()}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => deleteItem(index)}
                                                        className="w-16 h-16 ml-4 bg-gradient-to-br from-rose-500/95 to-red-600/95 hover:from-rose-600 hover:to-red-700 text-white font-black text-xl shadow-2xl hover:shadow-rose-500/50 hover:scale-110 active:scale-95 transition-all duration-300 rounded-3xl border-2 border-white/20 flex-shrink-0 backdrop-blur-xl"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-20 text-center text-indigo-300">
                                        <div className="w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-3xl flex items-center justify-center mb-8 backdrop-blur-xl border-2 border-indigo-500/30 shadow-2xl">
                                            <svg className="w-20 h-20 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                        </div>
                                        <h2 className="text-3xl font-black text-white/80 mb-4">Empty Cart</h2>
                                        <p className="text-xl text-indigo-400 max-w-xs">Start shopping to see your items here</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Summary Tab */
                            <div className="flex-1 flex flex-col justify-center items-center p-12 text-center bg-gradient-to-b from-transparent to-indigo-900/30">
                                <div className="w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-xl border-2 border-emerald-500/30 shadow-2xl">
                                    <svg className="w-16 h-16 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                                <h2 className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-6">
                                    ₹{total.toLocaleString()}
                                </h2>
                                <p className="text-xl text-indigo-300 mb-8">{data.length} items selected</p>
                                <button
                                    disabled={data.length === 0}
                                    className={`w-full max-w-xs py-6 px-8 rounded-3xl font-black text-xl shadow-2xl transition-all duration-500 border-4 ${data.length === 0
                                        ? 'bg-indigo-900/50 border-indigo-500/30 text-indigo-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-emerald-500/50 hover:scale-[1.02] hover:-translate-y-1 text-white border-emerald-400/50 active:scale-[0.98]'
                                        }`}
                                >
                                    {data.length === 0 ? 'Nothing to checkout' : 'Checkout Now →'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                body.no-scroll {
                    overflow: hidden;
                    position: fixed;
                    width: 100%;
                }
                .scrollbar-thin::-webkit-scrollbar {
                    width: 6px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                    background: transparent;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, rgba(168, 85, 247, 0.8), rgba(147, 51, 234, 0.8));
                    border-radius: 3px;
                }
            `}</style>
            <style>{`
        @keyframes badgePop {
          0% {
            transform: scale(0.5) rotate(-10deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.3) rotate(10deg);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
      `}</style>
        </>
    )
}

export default Add_button