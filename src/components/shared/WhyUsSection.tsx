function WhyUsSection() {
  return (
    <div className="bg-yellow-400 text-black px-6 py-10 grid gap-8 md:grid-cols-4 sm:px-8 md:px-12 lg:px-16">
      <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
        Kenapa Pilih Kami?
      </h1>

      {/* Card 1 */}
      <div className="flex flex-col items-start">
        <h2 className="text-lg font-semibold sm:text-xl md:text-2xl mb-2">
          Tahan lama dan mudah dipasang.
        </h2>
        <h3 className="text-sm sm:text-base md:text-lg">
          Kaca film berkualitas yang awet dan mudah dipasang untuk kenyamanan
          Anda.
        </h3>
      </div>

      {/* Card 2 */}
      <div className="flex flex-col items-start">
        <h2 className="text-lg font-semibold sm:text-xl md:text-2xl mb-2">
          Privasi Maksimal, <br /> Cahaya Tetap Masuk
        </h2>
        <h3 className="text-sm sm:text-base md:text-lg">
          Jaga privasi tanpa mengurangi cahaya alami di ruangan Anda.
        </h3>
      </div>

      {/* Card 3 */}
      <div className="flex flex-col items-start">
        <h2 className="text-lg font-semibold sm:text-xl md:text-2xl mb-2">
          Pilih Motif dan Warna Beragam
        </h2>
        <h3 className="text-sm sm:text-base md:text-lg">
          Beragam motif dan warna kaca film untuk mempercantik ruang Anda sesuai
          selera.
        </h3>
      </div>
    </div>
  );
}

export default WhyUsSection;
