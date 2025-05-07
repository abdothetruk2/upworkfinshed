import Image from "next/image";

function AboutUsSection() {
  const instagram = process.env.INSTAGRAM_ACCOUNT;
  const whatsapp = process.env.WHATSAPP_NUMBER;

  return (
    <div className="bg-bottom-background bg-cover bg-center text-white px-6 py-14 sm:px-8 md:px-12 lg:px-16">
      <h1 className="text-4xl font-bold mb-6">Product By</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Logo and Description Section */}
        <div className="flex flex-col">
          <div className="flex items-center mb-4">
            <Image
              src="/images/logo.webp"
              alt="Logo Image"
              className="w-2/6 h-auto mr-4"
              height={180}
              width={180}
            />
            <div className="flex flex-col space-y-4 ml-6 mr-4">
              <p className="text-sm sm:text-base">
                8 Istana Profil adalah penyedia berbagai profil kayu, cat,
                aksesoris perabot, triplek, HPL, takon, wallpaper, parket, dan
                masih banyak lagi. Dengan pengalaman luas, kami siap memenuhi
                kebutuhan bahan bangunan dan dekorasi Anda.
              </p>
              <p className="font-semibold text-2xl">Hubungi Kami:</p>

              {/* Social Media Icons */}
              <div className="flex flex-row space-x-2">
                {/* WhatsApp Link */}
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/images/Whatsapp.webp"
                    alt="Whatsapp istana profil"
                    height={72}
                    width={72}
                  />
                </a>

                {/* Instagram Link */}
                <a
                  href={`https://instagram.com/${instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/images/Instagram.webp"
                    alt="Instagram istana profil"
                    height={72}
                    width={72}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">Lokasi</h3>
          {/* Clickable Google Map */}
          <div className="mt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50665.712958325596!2d101.47439429787505!3d0.48577930682124953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5af6b742d33bf%3A0x52ccd4438797a6bf!2s8%20Istana%20Profil!5e0!3m2!1sid!2sid!4v1730621558712!5m2!1sid!2sid"
              width="100%"
              height="250"
              frameBorder="0"
              style={{ border: 0 }}
              loading="lazy"
              aria-hidden="false"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsSection;
