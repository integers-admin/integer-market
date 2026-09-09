// "use client";
// import { useState, useMemo, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { copyBoxInto, motion } from "framer-motion";
// import {
//   Search,
//   SlidersHorizontal,
//   X,
//   ChevronDown,
//   LayoutGrid,
//   List,
//   TrendingUp,
//   ShoppingCart,
//   ArrowRight,
//   Check,
//   Download,
// } from "lucide-react";
// import ReportCard from "../components/ui/ReportCard";
// import Badge from "../components/ui/Badge";
// import ScrollReveal from "../components/ui/ScrollReveal";
// import Breadcrumb from "../components/ui/Breadcrumb";
// import { ReportCardSkeleton, FilterSkeleton } from "../components/ui/Skeleton";
// import { reports } from "../data/reports";
// import { industries, industryCategories } from "../data/industries";
// import { staggerContainer, fadeInUp } from "../lib/variants";
// import axios from "axios";
// import Link from "next/link";
// import { useCart } from "../context/CartContext";

// const sortOptions = [
//   { value: "newest", label: "Newest First" },
//   { value: "oldest", label: "Oldest First" },
//   { value: "price-asc", label: "Price: Low to High" },
//   { value: "price-desc", label: "Price: High to Low" },
// ];

// export default function Reports() {
//   const searchParams = useSearchParams();
//   const [query, setQuery] = useState("");
//   const [mobileFilters, setMobileFilters] = useState(false);
//   const [viewMode, setViewMode] = useState("grid");
//   const [isLoading, setIsLoading] = useState(false);

//   const { addToCart, isInCart } = useCart();

//   const [listData, setListData] = useState([]);
//   const [industry, setIndustry] = useState([]);
//   const [sub_industry, setSub_industry] = useState([]);
//   const [sort, setSort] = useState("");

//   const [totalReport, setTotalReport] = useState(null);

//   const router = useRouter();

//   const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

//   const [selectedFilters, setSelectedFilters] = useState({
//     industries: [],
//     sub_industries: [],
//   });

//   // console.log("selectedFilters: ", selectedFilters);

//   const handleCheckboxChange = (group, value) => {
//     setSelectedFilters((prev) => {
//       const exists = prev[group].includes(value);
//       return {
//         ...prev,
//         [group]: exists
//           ? prev[group].filter((item) => item !== value)
//           : [...prev[group], value],
//       };
//     });
//   };

//   const getListData = async () => {
//     try {
//       setIsLoading(true);

//       // const response = await axios.post(`${BASE_URL}/reports/filter/display`, {
//       //   ...selectedFilters,
//       //   sort,
//       // });

//       const token = localStorage.getItem("token");

//       const response = await axios.post(
//         `${BASE_URL}/reports/filter/display`,
//         {
//           ...selectedFilters,
//           sort,
//           q: query,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       if (response?.status === 200) {
//         setListData(response?.data?.items ?? []);
//         setTotalReport(response?.data?.total ?? null);
//       }

//       // console.log("getListData: ", response);

//       // const listData = response.data;

//       // setListData(listData?.items ?? []);
//       // setTotalReport(listData?.total ?? 0);
//     } catch (err) {
//       console.log("something went wrong...", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getCheckBoxData = async () => {
//     try {
//       setIsLoading(true);
//       let response = await axios.get(`${BASE_URL}/filters`);

//       if (response?.status === 200) {
//         setIndustry(response?.data?.industries ?? []);
//         setSub_industry(response?.data?.sub_industries ?? []);
//       }
//     } catch (err) {
//       console.log("something went wrong...", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getCheckBoxData();
//   }, []);

//   // console.log("query: ",query);

//   // useEffect(() => {
//   //   getListData();
//   // }, [selectedFilters, sort]);

//   useEffect(() => {
//   const timer = setTimeout(() => {
//     getListData();
//   }, 500);

//   return () => clearTimeout(timer);
// }, [query, selectedFilters, sort]);

//   // useEffect(() => {
//   //   const t = setTimeout(() => setIsLoading(false), 800)
//   //   return () => clearTimeout(t)
//   // }, [])

//   // const toggleIndustry = (val) =>
//   //   setSelectedIndustries(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val])

//   // const clearAll = () => { setQuery(''); setSelectedIndustries([]) }

//   // const filtered = useMemo(() => {
//   //   let res = [...reports]
//   //   if (query) {
//   //     const q = query.toLowerCase()
//   //     res = res.filter(r =>
//   //       r.title.toLowerCase().includes(q) ||
//   //       r.description.toLowerCase().includes(q) ||
//   //       r.tags.some(t => t.toLowerCase().includes(q)) ||
//   //       r.industryName.toLowerCase().includes(q)
//   //     )
//   //   }
//   //   if (selectedIndustries.length) res = res.filter(r => selectedIndustries.includes(r.industry))
//   //   res.sort((a, b) => {
//   //     if (sort === 'newest') return new Date(b.publishDate) - new Date(a.publishDate)
//   //     if (sort === 'oldest') return new Date(a.publishDate) - new Date(b.publishDate)
//   //     if (sort === 'price-asc') return a.price - b.price
//   //     if (sort === 'price-desc') return b.price - a.price
//   //     return 0
//   //   })
//   //   return res
//   // }, [query, selectedIndustries, sort])

//   const activeFilters =
//     selectedFilters.industries.length + selectedFilters.sub_industries.length;

//   const resetFilters = () => {
//     setSelectedFilters({
//       industries: [],
//       sub_industries: [],
//       report_types: [],
//       regions: [],
//       countries: [],
//       use_cases: [],
//     });
//   };

//   const handleAddToCart = (report) => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       router.push("/login");
//       return;
//     }
//     addToCart(report);
//     // setCartAdded(true);
//     // setTimeout(() => setCartAdded(false), 2000);
//   };

//   const handleDownload = async (slug) => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await axios.get(`${BASE_URL}/reports/${slug}/download`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 200 && response.data?.download_url) {
//         window.open(response.data.download_url, "_blank");
//       }
//     } catch (error) {
//       console.log("Download error:", error);
//     }
//   };

//   const FilterPanel = ({
//     industry,
//     sub_industry,
//     selectedFilters,
//     handleCheckboxChange,
//   }) => {
//     return (
//       <aside aria-label="Report filters">
//         <div>
//           <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
//             Industry
//           </h3>
//           {/* {industryCategories?.map(cat => {
//           const subs = cat.subcategories.map(s => industries.find(i => i.slug === s)).filter(Boolean)
//           return (
//             <div key={cat.slug} className="mb-4">
//               <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 pl-0.5">{cat.name}</p>
//               <div className="space-y-1" role="group" aria-label={`Filter by ${cat.name}`}>
//                 {subs.map(ind => (
//                   <label key={ind.slug} className="flex items-center gap-2.5 cursor-pointer group">
//                     <input
//                       type="checkbox"
//                       checked={selectedIndustries.includes(ind.slug)}
//                       onChange={() => toggleIndustry(ind.slug)}
//                       className="size-4 rounded border-slate-300 accent-[#e27c60] cursor-pointer"
//                     />
//                     <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors flex-1">{ind.name}</span>
//                     <span className="text-xs text-slate-400">{ind.reportCount}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           )
//         })} */}

//           <div className=" flex flex-col gap-2">
//             <div
//               className={`overflow-hidden transition-all duration-300 xl:max-h-full xl:opacity-100 xl:mt-2`}
//             >
//               {industry?.map((ind, i) => {
//                 return (
//                   <label
//                     key={ind.id}
//                     className="flex items-center gap-2.5 cursor-pointer group"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={selectedFilters.industries.includes(ind?.name)}
//                       onChange={() =>
//                         handleCheckboxChange("industries", ind?.name)
//                       }
//                       className="size-4 rounded border-slate-300 accent-[#e27c60] cursor-pointer"
//                     />
//                     <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors flex-1">
//                       {ind.name}
//                     </span>
//                     {/* <span className="text-xs text-slate-400">{ind.reportCount}</span> */}
//                   </label>
//                 );
//               })}
//             </div>

//             <div className="mt-4 flex justify-between items-center cursor-pointer">
//               <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
//                 Sub Industry
//               </h3>
//             </div>
//             <div className={`overflow-hidden transition-all duration-300`}>
//               {sub_industry?.map((sub, i) => {
//                 return (
//                   <label
//                     key={sub.id}
//                     className="flex items-center gap-2.5 cursor-pointer group"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={selectedFilters.sub_industries.includes(
//                         sub?.name,
//                       )}
//                       onChange={() =>
//                         handleCheckboxChange("sub_industries", sub?.name)
//                       }
//                       className="size-4 rounded border-slate-300 accent-[#e27c60] cursor-pointer"
//                     />
//                     <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors flex-1">
//                       {sub.name}
//                     </span>
//                     {/* <span className="text-xs text-slate-400">{ind.reportCount}</span> */}
//                   </label>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {activeFilters > 0 && (
//           <button
//             onClick={resetFilters}
//             className="mt-4 text-sm text-red-500 hover:text-red-700 font-medium transition-colors cursor-pointer"
//           >
//             Clear all filters
//           </button>
//         )}
//       </aside>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-surface">
//       {/* Page header */}
//       <div className="bg-white border-b border-slate-100 pt-24 pb-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <ScrollReveal>
//             <Breadcrumb items={[{ label: "Reports" }]} className="mb-4" />
//             <Badge variant="white" className="mb-4">
//               1,000+ Reports
//             </Badge>
//             <h1 className="text-4xl font-bold text-slate-900 mb-4">
//               Market Research Reports
//             </h1>
//             <p className="text-slate-400 max-w-xl">
//               Browse our full catalog of market intelligence reports across
//               pharma, nutraceuticals, chemicals, and more.
//             </p>
//           </ScrollReveal>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         {/* Search + sort bar */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-8">
//           <div className="relative flex-1">
//             <label htmlFor="reports-search" className="sr-only">
//               Search reports
//             </label>
//             <Search
//               size={18}
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//               aria-hidden="true"
//             />
//             <input
//               id="reports-search"
//               type="search"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search reports, ingredients, markets..."
//               className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary transition-colors text-sm"
//             />
//           </div>

//           <div className="flex items-center gap-3">
//             <label htmlFor="sort-select" className="sr-only">
//               Sort reports
//             </label>
//             <div className="relative">
//               <select
//                 id="sort-select"
//                 value={sort}
//                 onChange={(e) => setSort(e.target.value)}
//                 className="appearance-none pl-4 pr-10 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm focus:outline-none focus:border-primary cursor-pointer"
//               >
//                 <option value="">Sort By Alphabet</option>
//                 <option value="title_asc">Sort By A-Z</option>
//                 <option value="title_desc">Sort By Z-A</option>
//               </select>
//               <ChevronDown
//                 size={14}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
//                 aria-hidden="true"
//               />
//             </div>

//             <button
//               onClick={() => setMobileFilters((v) => !v)}
//               className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:border-primary transition-colors cursor-pointer"
//               aria-expanded={mobileFilters}
//               aria-controls="mobile-filter-panel"
//             >
//               <SlidersHorizontal size={16} aria-hidden="true" />
//               Filters
//               {activeFilters > 0 && (
//                 <span className="size-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
//                   {activeFilters}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         <div className="flex gap-8">
//           {/* Desktop sidebar */}
//           <div className="hidden lg:block w-56 flex-shrink-0">
//             {isLoading ? (
//               <div className="sticky top-24">
//                 <FilterSkeleton />
//               </div>
//             ) : (
//               <div className="sticky top-24 bg-white rounded-2xl border border-slate-100 p-5">
//                 <div className="flex items-center justify-between mb-5">
//                   <span className="text-sm font-semibold text-slate-900">
//                     Filters
//                   </span>
//                   {activeFilters > 0 && (
//                     <Badge variant="primary" size="xs">
//                       {activeFilters}
//                     </Badge>
//                   )}
//                 </div>
//                 <FilterPanel
//                   industry={industry}
//                   sub_industry={sub_industry}
//                   selectedFilters={selectedFilters}
//                   handleCheckboxChange={handleCheckboxChange}
//                 />
//               </div>
//             )}
//           </div>

//           {/* Mobile filters */}
//           {mobileFilters && (
//             <motion.div
//               id="mobile-filter-panel"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="lg:hidden fixed inset-0 z-40 bg-black/50"
//               onClick={() => setMobileFilters(false)}
//             >
//               <div
//                 className="absolute left-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <span className="text-lg font-semibold text-slate-900">
//                     Filters
//                   </span>
//                   <button
//                     onClick={() => setMobileFilters(false)}
//                     aria-label="Close filters"
//                     className="cursor-pointer"
//                   >
//                     <X
//                       size={20}
//                       className="text-slate-500"
//                       aria-hidden="true"
//                     />
//                   </button>
//                 </div>
//                 <FilterPanel
//                   industry={industry}
//                   sub_industry={sub_industry}
//                   selectedFilters={selectedFilters}
//                   handleCheckboxChange={handleCheckboxChange}
//                 />
//               </div>
//             </motion.div>
//           )}

//           {/* Results */}
//           <div className="flex-1 min-w-0">
//             {/* Active filter chips */}
//             {/* {activeFilters > 0 && (
//               <div
//                 className="flex flex-wrap gap-2 mb-6"
//                 role="list"
//                 aria-label="Active filters"
//               >
//                 {selectedIndustries.map((slug) => {
//                   const ind = industries.find((i) => i.slug === slug);
//                   return (
//                     <button
//                       key={slug}
//                       role="listitem"
//                       onClick={() => toggleIndustry(slug)}
//                       className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer"
//                     >
//                       {ind?.name}
//                       <X size={11} aria-hidden="true" />
//                     </button>
//                   );
//                 })}
//               </div>
//             )} */}

//             <div className="flex flex-wrap gap-3">
//               {Object.entries(selectedFilters).map(([group, items]) =>
//                 items.map((item) => (
//                   <div
//                     key={`${group}-${item}`}
//                     className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#f2c7c0] bg-[#fff5f3] text-[#e27c60] text-sm"
//                   >
//                     <span>{item}</span>

//                     <button
//                       onClick={() =>
//                         setSelectedFilters((prev) => ({
//                           ...prev,
//                           [group]: prev[group].filter((i) => i !== item),
//                         }))
//                       }
//                       className="text-red-500 hover:text-red-700 cursor-pointer text-base"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 )),
//               )}
//             </div>

//             <div className="flex items-center justify-between mb-4">
//               <p className="text-sm text-slate-500">
//                 <span className="font-semibold text-slate-700">
//                   {totalReport ?? ""}
//                 </span>{" "}
//                 Reports found
//               </p>
//               {/* Grid / List toggle */}
//               <div
//                 className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1"
//                 role="group"
//                 aria-label="View mode"
//               >
//                 <button
//                   onClick={() => setViewMode("grid")}
//                   aria-label="Grid view"
//                   aria-pressed={viewMode === "grid"}
//                   className={`p-2 rounded-lg transition-colors cursor-pointer ${viewMode === "grid" ? "bg-primary text-white shadow-sm" : "text-slate-400 hover:text-slate-700"}`}
//                 >
//                   <LayoutGrid size={15} aria-hidden="true" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode("list")}
//                   aria-label="List view"
//                   aria-pressed={viewMode === "list"}
//                   className={`p-2 rounded-lg transition-colors cursor-pointer ${viewMode === "list" ? "bg-primary text-white shadow-sm" : "text-slate-400 hover:text-slate-700"}`}
//                 >
//                   <List size={15} aria-hidden="true" />
//                 </button>
//               </div>
//             </div>

//             {listData.length === 0 ? (
//               <div className="text-center py-20">
//                 <p className="text-slate-400 text-lg font-medium mb-2">
//                   No reports found
//                 </p>
//                 <p className="text-slate-400 text-sm mb-4">
//                   Try adjusting your search or filters
//                 </p>
//                 <button
//                   onClick={resetFilters}
//                   className="text-primary font-semibold text-sm hover:text-primary-dark transition-colors cursor-pointer"
//                 >
//                   Clear all filters
//                 </button>
//               </div>
//             ) : isLoading ? (
//               <div
//                 className={
//                   viewMode === "grid"
//                     ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
//                     : "flex flex-col gap-3"
//                 }
//               >
//                 {Array.from({ length: 6 }).map((_, i) => (
//                   <ReportCardSkeleton key={i} />
//                 ))}
//               </div>
//             ) : (
//               <motion.div
//                 initial="hidden"
//                 animate="visible"
//                 variants={staggerContainer}
//                 className={
//                   viewMode === "grid"
//                     ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
//                     : "flex flex-col gap-3"
//                 }
//               >
//                 {listData.map((report) => {
//                   return (
//                     <motion.div key={report.report_id} variants={fadeInUp}>
//                       <motion.article
//                         whileHover={{
//                           y: -2,
//                           boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
//                         }}
//                         transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
//                         className={`relative rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm group flex flex-col`}
//                       >
//                         <div className="p-5 flex flex-col flex-1">
//                           <div className="flex items-center gap-1.5 mb-3 text-xs text-slate-400">
//                             <span className="text-primary font-medium">
//                               {report.sub_industries}
//                             </span>
//                             <span aria-hidden="true">·</span>
//                             {/* <span>{report.title}</span> */}
//                             {report?.owned ? (
//                               <span className="ml-auto px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-semibold border border-green-200 text-[10px]">
//                                 Owned
//                               </span>
//                             ) : (
//                               <span className="ml-auto flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-orange-50 text-orange-500 font-semibold border border-orange-100 text-[10px]">
//                                 <TrendingUp size={8} aria-hidden="true" />
//                                 Trending
//                               </span>
//                             )}
//                           </div>

//                           {/* Title */}
//                           <h3 className="font-semibold text-sm leading-snug mb-2 line-clamp-2 flex-grow-0">
//                             <Link
//                               href={`/report-name/${report.seo_slug}`}
//                               className="text-slate-900 hover:text-primary transition-colors duration-200 focus-visible:text-primary"
//                             >
//                               {report.title}
//                             </Link>
//                           </h3>

//                           {/* Description - 2 lines */}
//                           <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2 flex-1">
//                             {report.subtitle}
//                           </p>

//                           {/* Key metrics row */}
//                           <div className="flex items-center gap-3 mb-5 text-xs text-slate-500">
//                             <span className="flex items-center gap-1">
//                               <TrendingUp
//                                 size={11}
//                                 className="text-primary"
//                                 aria-hidden="true"
//                               />
//                               {report?.cagr}% CAGR
//                             </span>
//                             <span className="text-slate-200" aria-hidden="true">
//                               |
//                             </span>
//                             <span className="font-medium text-slate-700">
//                               ${report?.market_size}
//                             </span>
//                             {/* <span className="text-slate-200" aria-hidden="true">|</span>
//           <span>{report?.pages}p</span> */}
//                           </div>

//                           {/* Footer: price + action */}
//                           <div className="flex items-center justify-between pt-4 border-t border-slate-100">
//                             <div className="flex flex-col">
//                               <span className="text-lg font-black text-slate-900 leading-none">
//                                 ${report?.full_price}
//                               </span>
//                               <span className="text-[10px] text-slate-400 mt-0.5">
//                                 USD · PDF
//                               </span>
//                             </div>

//                             <div className="flex items-center gap-2">
//                               {report?.owned ? (
//                                 <button
//                                   // href={`/report-name/${report.seo_slug}`}
//                                   onClick={() =>
//                                     handleDownload(report.seo_slug)
//                                   }
//                                   className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary/10 text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer"
//                                 >
//                                   <Download size={12} aria-hidden="true" />
//                                   Download
//                                 </button>
//                               ) : (
//                                 <>
//                                   {/* Primary CTA - Add to Cart */}
//                                   <motion.button
//                                     whileTap={{ scale: 0.96 }}
//                                     onClick={() =>
//                                       handleAddToCart(report.seo_slug)
//                                     }
//                                     aria-label={
//                                       isInCart(report.seo_slug)
//                                         ? "Already in cart"
//                                         : `Add ${report.title} to cart`
//                                     }
//                                     className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-sm ${
//                                       isInCart(report.seo_slug)
//                                         ? "bg-green-50 text-green-700 border border-green-200 shadow-green-100"
//                                         : "bg-primary text-white hover:bg-primary-dark shadow-primary/20 hover:shadow-primary/30"
//                                     }`}
//                                   >
//                                     {isInCart(report.seo_slug) ? (
//                                       <>
//                                         <Check size={12} aria-hidden="true" />{" "}
//                                         In Cart
//                                       </>
//                                     ) : (
//                                       <>
//                                         <ShoppingCart
//                                           size={12}
//                                           aria-hidden="true"
//                                         />{" "}
//                                         Add to Cart
//                                       </>
//                                     )}
//                                   </motion.button>

//                                   {/* Secondary: view detail arrow */}
//                                   {/* <Link
//                   href={`/report-name/${report.slug}`}
//                   className="flex items-center justify-center size-8 rounded-xl bg-slate-50 text-slate-400 hover:bg-primary/8 hover:text-primary transition-colors duration-200 flex-shrink-0"
//                   aria-label={`View ${report.title} details`}
//                 >
//                   <ArrowRight size={14} aria-hidden="true" />
//                 </Link> */}

//                                   {/* Primary CTA - Add to Cart */}
//                                   {/* <motion.button
//                                     whileTap={{ scale: 0.96 }}
//                                     className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-sm
//                   `}
//                                   > */}
//                                   {/* {inCart
//                     ? <>
//                     <Check size={12} aria-hidden="true" /> In Cart</> */}
//                                   {/* : <> */}
//                                   {/* <ShoppingCart
//                                       size={12}
//                                       aria-hidden="true"
//                                     />{" "}
//                                     Add to Cart
//                                     {/* </>
//                   }
//                                   </motion.button> */}

//                                   {/* Secondary: view detail arrow */}
//                                   <Link
//                                     href={`/report-name/${report.seo_slug}`}
//                                     className="flex items-center justify-center size-8 rounded-xl bg-slate-50 text-slate-400 hover:bg-primary/8 hover:text-primary transition-colors duration-200 flex-shrink-0"
//                                     aria-label={`View ${report.title} details`}
//                                   >
//                                     <ArrowRight size={14} aria-hidden="true" />
//                                   </Link>
//                                 </>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </motion.article>
//                     </motion.div>
//                   );
//                 })}
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useMemo, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  LayoutGrid,
  List,
  TrendingUp,
  ShoppingCart,
  ArrowRight,
  Check,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ReportCard from "../components/ui/ReportCard";
import Badge from "../components/ui/Badge";
import ScrollReveal from "../components/ui/ScrollReveal";
import Breadcrumb from "../components/ui/Breadcrumb";
import { ReportCardSkeleton, FilterSkeleton } from "../components/ui/Skeleton";
import { reports } from "../data/reports";
import { industries, industryCategories } from "../data/industries";
import { staggerContainer, fadeInUp } from "../lib/variants";
import axios from "axios";
import Link from "next/link";
import { useCart } from "../context/CartContext";

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function Reports() {
  const [query, setQuery] = useState("");
  const [mobileFilters, setMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [isFilterLoading, setIsFilterLoading] = useState(true);
  const [isListLoading, setIsListLoading] = useState(true);

  const { addToCart, isInCart } = useCart();

  const [listData, setListData] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [sub_industry, setSub_industry] = useState([]);
  const [sort, setSort] = useState("");

  //pagination
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(() => {
    const page = Number(searchParams.get("page"));
    return page > 0 ? page : 1;
  });

  const limit = 9;
  const [totalPages, setTotalPages] = useState(1);

  const [totalReport, setTotalReport] = useState(null);

  // const searchParams = useSearchParams();

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const [selectedFilters, setSelectedFilters] = useState({
    industries: [],
    sub_industries: [],
  });

  // console.log("selectedFilters: ", selectedFilters);

  const handleCheckboxChange = (group, value) => {
    setCurrentPage(1);
    setSelectedFilters((prev) => {
      const exists = prev[group].includes(value);
      return {
        ...prev,
        [group]: exists
          ? prev[group].filter((item) => item !== value)
          : [...prev[group], value],
      };
    });
  };

  const getListData = async () => {
    try {
      setIsListLoading(true);

      // const response = await axios.post(`${BASE_URL}/reports/filter/display`, {
      //   ...selectedFilters,
      //   sort,
      // });

      const token = localStorage.getItem("1r#efp@G6*6dIBELf^8j");

      const response = await axios.post(
        `${BASE_URL}/reports/filter/display`,
        {
          ...selectedFilters,
          sort,
          q: query,
          page: currentPage,
          limit: limit,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // if (response?.status === 200) {
      //   setListData(response?.data?.items ?? []);
      //   setTotalReport(response?.data?.total ?? null);
      //   // total pages calculate

      //   const total = response?.data?.total ?? 0;
      //   setTotalPages(Math.ceil(total / limit));
      //   setTotalPages(Math.ceil((listData?.total ?? 0) / limit));
      // }

      if (response?.status === 200) {
        const items = response?.data?.items ?? [];
        const total = response?.data?.total ?? 0;

        setListData(items);
        setTotalReport(total);
        setTotalPages(Math.max(1, Math.ceil(total / limit)));
      }

      // console.log("getListData: ", response);

      // const listData = response.data;

      // setListData(listData?.items ?? []);
      // setTotalReport(listData?.total ?? 0);
    } catch (err) {
      console.log("something went wrong...", err);
      setListData([]);
      setTotalReport(0);
      setTotalPages(1);
    } finally {
      setIsListLoading(false);
    }
  };

  const getCheckBoxData = async () => {
    try {
      setIsFilterLoading(true);
      let response = await axios.get(`${BASE_URL}/filters`);

      if (response?.status === 200) {
        setIndustry(response?.data?.industries ?? []);
        setSub_industry(response?.data?.sub_industries ?? []);
      }
    } catch (err) {
      console.log("something went wrong...", err);
    } finally {
      setIsFilterLoading(false);
    }
  };

  const activeFilters =
    selectedFilters.industries.length + selectedFilters.sub_industries.length;

  const resetFilters = () => {
    setSelectedFilters({
      industries: [],
      sub_industries: [],
    });
    setCurrentPage(1);
  };

  const handleAddToCart = (report) => {
    const token = localStorage.getItem("1r#efp@G6*6dIBELf^8j");

    if (!token) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    addToCart(report);
  };

  const handleDownload = async (slug) => {
    try {
      const token = localStorage.getItem("1r#efp@G6*6dIBELf^8j");

      const response = await axios.get(`${BASE_URL}/reports/${slug}/download`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data?.download_url) {
        window.open(response.data.download_url, "_blank");
      }
    } catch (error) {
      console.log("Download error:", error);
    }
  };

  useEffect(() => {
    getCheckBoxData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (currentPage === 1) {
      params.delete("page");
    } else {
      params.set("page", currentPage.toString());
    }

    const queryString = params.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }, [currentPage, pathname, router, searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getListData();
    }, 500);

    return () => clearTimeout(timer);
  }, [query, selectedFilters, sort, currentPage]);

  // pagination
  const pageNumbers = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pageNumbers.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      pageNumbers.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      );
    }
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const FilterPanel = ({
    industry,
    sub_industry,
    selectedFilters,
    handleCheckboxChange,
  }) => {
    return (
      <aside aria-label="Report filters">
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Industry
          </h3>

          <div className=" flex flex-col gap-2">
            <div
              className={`overflow-hidden transition-all duration-300 xl:max-h-full xl:opacity-100 xl:mt-2`}
            >
              {industry?.map((ind, i) => {
                return (
                  <label
                    key={ind.id}
                    className="flex items-center gap-2.5 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters.industries.includes(ind?.name)}
                      onChange={() =>
                        handleCheckboxChange("industries", ind?.name)
                      }
                      className="size-4 rounded border-slate-300 accent-[#e27c60] cursor-pointer"
                    />
                    <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors flex-1">
                      {ind.name}
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="mt-4 flex justify-between items-center cursor-pointer">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Sub Industry
              </h3>
            </div>
            <div className={`overflow-hidden transition-all duration-300`}>
              {sub_industry?.map((sub, i) => {
                return (
                  <label
                    key={sub.id}
                    className="flex items-center gap-2.5 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters.sub_industries.includes(
                        sub?.name,
                      )}
                      onChange={() =>
                        handleCheckboxChange("sub_industries", sub?.name)
                      }
                      className="size-4 rounded border-slate-300 accent-[#e27c60] cursor-pointer"
                    />
                    <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors flex-1">
                      {sub.name}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {activeFilters > 0 && (
          <button
            onClick={resetFilters}
            className="mt-4 text-sm text-red-500 hover:text-red-700 font-medium transition-colors cursor-pointer"
          >
            Clear all filters
          </button>
        )}
      </aside>
    );
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-white border-b border-slate-100 pt-24 pb-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <ScrollReveal>
            <Breadcrumb items={[{ label: "Reports" }]} className="mb-4" />
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Market Research Reports
            </h1>
            <p className="text-slate-400 max-w-xl">
              Browse our full catalog of market intelligence reports across
              pharma, nutraceuticals, chemicals, and more.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row gap-4 mb-4.5">
          <div className="relative flex-1">
            <label htmlFor="reports-search" className="sr-only">
              Search reports
            </label>
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              id="reports-search"
              type="search"
              value={query}
              // onChange={(e) => setQuery(e.target.value)}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search reports, ingredients, markets..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="sort-select" className="sr-only">
              Sort reports
            </label>
            <div className="relative">
              <select
                id="sort-select"
                value={sort}
                // onChange={(e) => setSort(e.target.value)}
                onChange={(e) => {
                  setSort(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none pl-4 pr-10 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="">Sort By Alphabet</option>
                <option value="title_asc">Sort By A-Z</option>
                <option value="title_desc">Sort By Z-A</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            <button
              onClick={() => setMobileFilters((v) => !v)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:border-primary transition-colors cursor-pointer"
              aria-expanded={mobileFilters}
              aria-controls="mobile-filter-panel"
            >
              <SlidersHorizontal size={16} aria-hidden="true" />
              Filters
              {activeFilters > 0 && (
                <span className="size-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  {activeFilters}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <div className="hidden lg:block w-56 flex-shrink-0">
            {isFilterLoading ? (
              <div className="sticky top-24">
                <FilterSkeleton />
              </div>
            ) : (
              <div className="sticky top-24 bg-white rounded-2xl border border-slate-100 p-5">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm font-semibold text-slate-900">
                    Filters
                  </span>
                  {activeFilters > 0 && (
                    <Badge variant="primary" size="xs">
                      {activeFilters}
                    </Badge>
                  )}
                </div>
                <FilterPanel
                  industry={industry}
                  sub_industry={sub_industry}
                  selectedFilters={selectedFilters}
                  handleCheckboxChange={handleCheckboxChange}
                />
              </div>
            )}
          </div>

          {/* Mobile filters */}
          {mobileFilters && (
            <motion.div
              id="mobile-filter-panel"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/50"
              onClick={() => setMobileFilters(false)}
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-semibold text-slate-900">
                    Filters
                  </span>
                  <button
                    onClick={() => setMobileFilters(false)}
                    aria-label="Close filters"
                    className="cursor-pointer"
                  >
                    <X
                      size={20}
                      className="text-slate-500"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <FilterPanel
                  industry={industry}
                  sub_industry={sub_industry}
                  selectedFilters={selectedFilters}
                  handleCheckboxChange={handleCheckboxChange}
                />
              </div>
            </motion.div>
          )}

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-3">
              {Object.entries(selectedFilters).map(([group, items]) =>
                items.map((item) => (
                  <div
                    key={`${group}-${item}`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#f2c7c0] bg-[#fff5f3] text-[#e27c60] text-sm"
                  >
                    <span>{item}</span>

                    <button
                      onClick={() => {
                        setCurrentPage(1);
                        setSelectedFilters((prev) => ({
                          ...prev,
                          [group]: prev[group].filter((i) => i !== item),
                        }));
                      }}
                      className="text-red-500 hover:text-red-700 cursor-pointer text-base"
                    >
                      ×
                    </button>
                  </div>
                )),
              )}
            </div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-700">
                  {totalReport ?? ""}
                </span>{" "}
                Reports found
              </p>
              {/* Grid / List toggle */}
              <div
                className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1"
                role="group"
                aria-label="View mode"
              >
                <button
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  aria-pressed={viewMode === "grid"}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${viewMode === "grid" ? "bg-primary text-white shadow-sm" : "text-slate-400 hover:text-slate-700"}`}
                >
                  <LayoutGrid size={15} aria-hidden="true" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  aria-pressed={viewMode === "list"}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${viewMode === "list" ? "bg-primary text-white shadow-sm" : "text-slate-400 hover:text-slate-700"}`}
                >
                  <List size={15} aria-hidden="true" />
                </button>
              </div>
            </div>

            {isListLoading ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
                    : "flex flex-col gap-3"
                }
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <ReportCardSkeleton key={i} />
                ))}
              </div>
            ) : listData.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-slate-400 text-lg font-medium mb-2">
                  No reports found
                </p>
                <p className="text-slate-400 text-sm mb-4">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={resetFilters}
                  className="text-primary font-semibold text-sm hover:text-primary-dark transition-colors cursor-pointer"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
                    : "flex flex-col gap-3"
                }
              >
                {listData?.map((report) => {
                  return (
                    <motion.div key={report.report_id} variants={fadeInUp}>
                      <motion.article
                        whileHover={{
                          y: -2,
                          boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
                        }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className={`relative rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm group flex flex-col`}
                      >
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center gap-1.5 mb-3 text-xs text-slate-400">
                            <span className="text-primary font-medium">
                              {report.sub_industries}
                            </span>
                            <span aria-hidden="true">·</span>
                            {/* <span>{report.title}</span> */}
                            {report?.owned ? (
                              <span className="ml-auto px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-semibold border border-green-200 text-[10px]">
                                Owned
                              </span>
                            ) : (
                              <span className="ml-auto flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-orange-50 text-orange-500 font-semibold border border-orange-100 text-[10px]">
                                <TrendingUp size={8} aria-hidden="true" />
                                Trending
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="font-semibold text-sm leading-snug mb-2 line-clamp-2 flex-grow-0">
                            <Link
                              href={`/report-name/${report.seo_slug}`}
                              className="text-slate-900 hover:text-primary transition-colors duration-200 focus-visible:text-primary"
                            >
                              {report.title}
                            </Link>
                          </h3>

                          {/* Description - 2 lines */}
                          <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2 flex-1">
                            {report.subtitle}
                          </p>

                          {/* Key metrics row */}
                          <div className="flex items-center gap-3 mb-5 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <TrendingUp
                                size={11}
                                className="text-primary"
                                aria-hidden="true"
                              />
                              {report?.cagr}% CAGR
                            </span>
                            <span className="text-slate-200" aria-hidden="true">
                              |
                            </span>
                            <span className="font-medium text-slate-700">
                              ${report?.market_size}
                            </span>
                          </div>

                          {/* Footer: price + action */}
                          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <div className="flex flex-col">
                              <span className="text-lg font-black text-slate-900 leading-none">
                                ${report?.full_price}
                              </span>
                              <span className="text-[10px] text-slate-400 mt-0.5">
                                USD · PDF
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              {report?.owned ? (
                                <button
                                  // href={`/report-name/${report.seo_slug}`}
                                  onClick={() =>
                                    handleDownload(report.seo_slug)
                                  }
                                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary/10 text-primary text-xs font-bold hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer"
                                >
                                  <Download size={12} aria-hidden="true" />
                                  Download
                                </button>
                              ) : (
                                <>
                                  {/* Primary CTA - Add to Cart */}
                                  <motion.button
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() =>
                                      handleAddToCart(report.seo_slug)
                                    }
                                    aria-label={
                                      isInCart(report.seo_slug)
                                        ? "Already in cart"
                                        : `Add ${report.title} to cart`
                                    }
                                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-sm ${
                                      isInCart(report.seo_slug)
                                        ? "bg-green-50 text-green-700 border border-green-200 shadow-green-100"
                                        : "bg-primary text-white hover:bg-primary-dark shadow-primary/20 hover:shadow-primary/30"
                                    }`}
                                  >
                                    {isInCart(report.seo_slug) ? (
                                      <>
                                        <Check size={12} aria-hidden="true" />{" "}
                                        In Cart
                                      </>
                                    ) : (
                                      <>
                                        <ShoppingCart
                                          size={12}
                                          aria-hidden="true"
                                        />{" "}
                                        Add to Cart
                                      </>
                                    )}
                                  </motion.button>
                                  <Link
                                    href={`/report-name/${report.seo_slug}`}
                                    className="flex items-center justify-center size-8 rounded-xl bg-slate-50 text-slate-400 hover:bg-primary/8 hover:text-primary transition-colors duration-200 flex-shrink-0"
                                    aria-label={`View ${report.title} details`}
                                  >
                                    <ArrowRight size={14} aria-hidden="true" />
                                  </Link>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex justify-center">
                <div className="flex flex-wrap justify-center items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="bg-white hover:bg-gray-100 cursor-pointer px-3 py-1 border border-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Prev
                  </button>

                  {pageNumbers.map((item, index) =>
                    item === "..." ? (
                      <span key={index} className="px-2">
                        ...
                      </span>
                    ) : (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(item)}
                        className={`min-w-9 h-9 px-3 border border-gray-200 cursor-pointer rounded ${
                          currentPage === item
                            ? "bg-primary text-white"
                            : "bg-white hover:bg-gray-100"
                        }`}
                      >
                        {item}
                      </button>
                    ),
                  )}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="bg-white hover:bg-gray-100 cursor-pointer px-3 py-1 border border-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
