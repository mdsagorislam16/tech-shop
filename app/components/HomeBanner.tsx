'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const HomeBanner = () => {
    return (
        <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8 overflow-hidden">
            <div className="mx-auto px-8 py-16 flex flex-col gap-8 md:flex-row items-center justify-between max-w-7xl">
                {/* Text Section with Animation */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center md:text-left"
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
                        Summer Sale!
                    </h1>
                    <p className="text-lg md:text-xl text-white mb-2">
                        Enjoy discounts on selected products
                    </p>
                    <p className="text-2xl md:text-5xl text-yellow-300 font-bold">
                        GET 50% OFF
                    </p>
                </motion.div>

                {/* Image Section with Animation */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full md:w-1/2 relative aspect-video"
                >
                    <Image
                        src="/banner-image.png"
                        fill
                        alt="Banner Image"
                        className="object-contain"
                        priority
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default HomeBanner;
