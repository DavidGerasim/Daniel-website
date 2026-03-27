// // frontend/app/services/page.jsx
// "use client";
// import { motion } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules";
// import { useRouter } from "next/navigation";
// import "swiper/css";
// import "swiper/css/pagination";

// import { useI18n } from "../i18nProvider";
// import { dictionaries } from "../i18n";

// import Image from "next/image";
// import { MdOutlineArrowOutward } from "react-icons/md";

// const Services = () => {
//   const { lang } = useI18n();
//   const t = dictionaries[lang];
//   const services = t.services.list;
//   const router = useRouter();

//   return (
//     <motion.section
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.4 } }}
//     >
//       {/* Header */}
//       <div className="container mx-auto w-full flex flex-col gap-16 px-4 sm:px-6">
//         <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">
//           <h2 className="h2 max-w-full sm:max-w-[480px] break-words">
//             {t.services.title.normal}{" "}
//             <span className="text-accent">{t.services.title.accent}</span>{" "}
//             {t.services.title.rest}
//           </h2>
//         </div>
//       </div>

//       {/* Slider wrapper with negative margin for edge-to-edge */}
//       <div className="w-screen overflow-x-hidden">
//   <Swiper
//     key={lang}
//     spaceBetween={16}
//     slidesPerView={1}
//     breakpoints={{
//       640: { slidesPerView: 2, spaceBetween: 20 },
//       1024: { slidesPerView: 3, spaceBetween: 30 },
//     }}
//     modules={[Pagination]}
//     pagination={{ clickable: true, dynamicBullets: true }}
//     className="!pb-10"
//   >
//     {services.map((service) => (
//       <SwiperSlide
//       key={service.id}
//       className="flex justify-center min-w-0"
//     >
//       <div className="bg-secondary/90 rounded-xl flex flex-col shadow-md px-6 py-6 min-h-[260px] flex-1 max-w-[calc(100%-16px)]">
//         {/* Icon + arrow */}
//         <div className="flex items-center justify-between mb-4">
//           <Image
//             src={service.icon}
//             width={40}
//             height={40}
//             alt={service.title}
//           />
//           <div
//             onClick={() => router.push(`/login?service=${service.id}`)}
//             className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-xl hover:rotate-45 transition-all cursor-pointer"
//           >
//             <MdOutlineArrowOutward />
//           </div>
//         </div>
    
//         <h5 className="text-lg font-medium mb-2 truncate">
//           {service.title}
//         </h5>
    
//         <div className="overflow-y-auto">
//           <p className="text-sm text-white/70 leading-relaxed break-words line-clamp-3 md:line-clamp-none">
//             {service.description}
//           </p>
//         </div>
//       </div>
//     </SwiperSlide>
//     ))}
//   </Swiper>
// </div>
//     </motion.section>
//   );
// };

// export default Services;