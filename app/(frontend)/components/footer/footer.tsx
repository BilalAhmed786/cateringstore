import Link from "next/link";
import Image from "next/image";
import { useGetStoreSettings } from "../../admin/settings/store/hooks/useGetStoreSettings";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Loader } from "../reusables/loader/loader";
export default function Footer() {
  const { data } = useGetStoreSettings();

  return (
    <footer className="border-t bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-11/12 px-6 py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              {data?.store?.logo && (
                <Image
                  src={data.store.logo}
                  className="rounded-full"
                  alt={data.store.name || "Store logo"}
                  width={70}
                  height={70}
                  priority
                />
              )}
              <div>
                <span className="text-2xl font-bold text-white">
                  {data?.store.name}
                </span>
              </div>
            </Link>

            <p className="mt-4 text-sm leading-7 text-gray-400">
             {data?.store.description}
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
            {!data?.store ? (
              <Loader variant="inline" className="flex justify-start" />
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 text-amber-500" size={18} />
                  <p>{data?.store.city}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="text-amber-500" size={18} />
                  <p>{data?.store.phone}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="text-amber-500" size={18} />
                  <p>{data?.store.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CateringStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
