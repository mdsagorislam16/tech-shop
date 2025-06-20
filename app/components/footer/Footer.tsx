import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md";
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";

const Footer = () => {
    return (
        <footer className="bg-slate-800 text-slate-200 text-sm mt-16">
            <Container>
                <div className="flex flex-col md:flex-row md:justify-between pt-16 pb-10 gap-10 md:gap-4">
                    
                    {/* Shop Categories */}
                    <FooterList>
                        <h3 className="text-base font-semibold mb-4 uppercase tracking-wide">Shop Categories</h3>
                        <Link href="#">Phones</Link>
                        <Link href="#">Laptops</Link>
                        <Link href="#">Desktops</Link>
                        <Link href="#">Watches</Link>
                        <Link href="#">TVs</Link>
                        <Link href="#">Accessories</Link>
                    </FooterList>

                    {/* Customer Service */}
                    <FooterList>
                        <h3 className="text-base font-semibold mb-4 uppercase tracking-wide">Customer Service</h3>
                        <Link href="#">Contact Us</Link>
                        <Link href="#">Shipping Policy</Link>
                        <Link href="#">Returns</Link>
                        <Link href="#">FAQs</Link>
                    </FooterList>

                    {/* About Us Section */}
                    <div className="w-full md:w-1/3">
                        <h3 className="text-base font-semibold mb-4 uppercase tracking-wide">About Us</h3>
                        <p className="mb-4 text-slate-300 leading-relaxed">
                            E-SHOP is a trusted e-commerce platform offering top-notch electronics and accessories.
                            We focus on quality service, secure transactions, and exceptional customer support to ensure your satisfaction.
                        </p>
                        <p className="text-slate-400 text-xs">
                            &copy; {new Date().getFullYear()} E-SHOP. All rights reserved.
                        </p>
                    </div>

                    {/* Follow Us Section */}
                    <div className="w-full md:w-auto text-center md:text-left">
                        <h3 className="text-base font-semibold mb-4 uppercase tracking-wide">Follow Us</h3>
                        <div className="flex justify-center md:justify-start gap-4 items-center">
                            <Link
                                href="https://www.facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="hover:text-white transition"
                            >
                                <MdFacebook size={24} />
                            </Link>
                            <Link
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                                className="hover:text-white transition"
                            >
                                <AiFillTwitterCircle size={24} />
                            </Link>
                            <Link
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="hover:text-white transition"
                            >
                                <AiFillInstagram size={24} />
                            </Link>
                            <Link
                                href="https://www.youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YouTube"
                                className="hover:text-white transition"
                            >
                                <AiFillYoutube size={24} />
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
