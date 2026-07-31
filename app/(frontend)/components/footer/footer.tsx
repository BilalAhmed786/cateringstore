import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Cateringlogo from "../../assets/saif catering.png";
export default function Footer() {
  return (
    <footer className="border-t bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-11/12 px-6 py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={Cateringlogo}
                className="rounded-full"
                alt="Saif Catering Logo"
                width={70}
                priority
              />
              <div>
                <span className="text-2xl font-bold text-white">
                  Saif Catering
                </span>
              </div>
            </Link>

            <p className="mt-4 text-sm leading-7 text-gray-400">
              Delicious food, elegant presentation, and unforgettable catering
              services for weddings, birthdays, corporate events, and family
              gatherings.
            </p>

            <div className="mt-6 flex gap-4">
              <Link
                href="#"
                className="rounded-full bg-gray-800 p-2 transition hover:bg-amber-500 hover:text-white"
              >
                <Facebook size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-full bg-gray-800 p-2 transition hover:bg-amber-500 hover:text-white"
              >
                <Instagram size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-full bg-gray-800 p-2 transition hover:bg-amber-500 hover:text-white"
              >
                <Twitter size={18} />
              </Link>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-amber-500">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/menu-items" className="hover:text-amber-500">
                  Menu Items
                </Link>
              </li>

              <li>
                <Link href="/packages" className="hover:text-amber-500">
                  Packages
                </Link>
              </li>

              <li>
                <Link href="/events" className="hover:text-amber-500">
                  Events
                </Link>
              </li>

              <li>
                <Link href="/hampers" className="hover:text-amber-500">
                  Hampers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Our Services
            </h3>

            <ul className="space-y-3">
              <li>Wedding Catering</li>
              <li>Birthday Parties</li>
              <li>Corporate Events</li>
              <li>Family Gatherings</li>
              <li>Custom Food Packages</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Contact Us
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 text-amber-500" size={18} />
                <p>Rawalpindi, Pakistan</p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-amber-500" size={18} />
                <p>+92 300 1234567</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-amber-500" size={18} />
                <p>info@cateringstore.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CateringStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
