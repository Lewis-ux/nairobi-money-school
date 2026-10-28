import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  TrendingUp,
  Building,
  Calendar,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Filter,
  X,
  Menu,
  Mail,
  ChevronRight,
  Globe,
  FileText,
  Award,
  Search,
  Check,
  Shield,
  Briefcase,
  MapPin,
  ExternalLink,
  ChevronDown,
  Info,
  Send,
  AlertCircle,
  HelpCircle,
  Share2,
  Bookmark,
  Sparkles,
  SlidersHorizontal,
  Compass,
  Phone,
  Layers,
  BarChart2,
  CheckSquare,
  ArrowUpRight
} from 'lucide-react';

// ==========================================
// MOCK DATA STRUCTURES (Data Layer)
// ==========================================

const SAMPLE_COURSES = [
  {
    id: 'bonds-sovereign-debt',
    title: 'Bonds and Sovereign Debt in Emerging Markets',
    category: 'Fixed Income',
    level: 'Intermediate',
    priceKsh: 6500,
    duration: '4 Weeks (Self-paced + Live Q&A)',
    modulesCount: 6,
    studentsCount: 340,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    description: 'A deep dive into government securities, Treasury Bills, infrastructure bonds, Eurobonds, yield curve analysis, and sovereign credit evaluation in East Africa.',
    targetAudience: 'Individual investors, treasury staff, wealth managers, and financial analysts seeking practical mastery over East African debt markets.',
    outcomes: [
      'Calculate bond yields, clean/dirty prices, and duration metrics effortlessly',
      'Evaluate Central Bank of Kenya (CBK) auction dynamics and bidding strategies',
      'Assess sovereign default risks, IMF frameworks, and Eurobond refinancing cycles',
      'Construct balanced fixed-income portfolios tailored for high-yield African debt'
    ],
    curriculum: [
      { module: 'Module 1', title: 'Fundamentals of Debt Securities & Money Markets' },
      { module: 'Module 2', title: 'The Mechanics of CBK Treasury Bills & Bonds' },
      { module: 'Module 3', title: 'Infrastructure Bonds & Tax-Exempt Yield Strategies' },
      { module: 'Module 4', title: 'Eurobonds & African Sovereign Debt Restructuring' },
      { module: 'Module 5', title: 'Yield Curve Analysis & Macroeconomic Drivers' },
      { module: 'Module 6', title: 'Portfolio Strategy & Credit Risk Hedging' }
    ]
  },
  {
    id: 'financial-markets-mastery',
    title: 'African Capital Markets & Equity Investment Strategy',
    category: 'Capital Markets',
    level: 'Beginner',
    priceKsh: 4500,
    duration: '3 Weeks',
    modulesCount: 5,
    studentsCount: 580,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    description: 'Master stock market investing across the Nairobi Securities Exchange (NSE), cross-listed African counters, valuation frameworks, and dividend compounding.',
    targetAudience: 'Beginner and retail investors aiming to build generational wealth through equities, REITs, and ETFs in African growth markets.',
    outcomes: [
      'Understand how the NSE and regional exchanges operate, clear, and settle',
      'Perform fundamental analysis using P/E, EV/EBITDA, and Dividend Yield',
      'Read financial statements (Balance Sheets, Income Statements, Cash Flows)',
      'Analyze bank asset quality, non-performing loans (NPLs), and telecommunications models'
    ],
    curriculum: [
      { module: 'Module 1', title: 'Structure of African Stock Exchanges & Brokerage Accounts' },
      { module: 'Module 2', title: 'Financial Statement Analysis for Retail Investors' },
      { module: 'Module 3', title: 'Valuation Metrics: Finding Undervalued Gems' },
      { module: 'Module 4', title: 'REITs, ETFs, and Dividend Aristocrats in East Africa' },
      { module: 'Module 5', title: 'Risk Management, Diversification & Investor Psychology' }
    ]
  },
  {
    id: 'forex-macro-fundamentals',
    title: 'Forex Fundamentals & Macroeconomic Liquidity',
    category: 'Currencies',
    level: 'Intermediate',
    priceKsh: 3000,
    duration: '2 Weeks (Interactive Simulation & Practice)',
    modulesCount: 5,
    studentsCount: 420,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    description: 'Understand foreign exchange drivers, currency depreciation mechanisms, diaspora remittances impact, central bank reserves, interbank FX clearing, and commercial forward hedging.',
    targetAudience: 'Importers, corporate treasury personnel, diaspora investors, and FX analysts wanting macro depth over technical noise.',
    outcomes: [
      'Grasp balance of payments, trade deficits, and foreign FX reserves impact on currency valuations',
      'Evaluate parallel exchange market dynamics vs official interbank FX clearing mechanisms',
      'Utilize forward contracts and money market hedges for commercial FX risk mitigation',
      'Track Federal Reserve policy spillover, Eurobond debt cycles, and regional African currency transmission'
    ],
    curriculum: [
      { module: 'Module 1', title: 'Introduction to African Currency Regimes & Interbank Markets' },
      { module: 'Module 2', title: 'Drivers of FX Liquidity: Trade Deficits, Remittances & Eurobonds' },
      { module: 'Module 3', title: 'Central Bank Interventions, Reserves & Interest Rate Parity' },
      { module: 'Module 4', title: 'Corporate FX Risk Management: Forwards, Options & Swaps' },
      { module: 'Module 5', title: 'Interactive FX Hedging & Import-Export Exposure Simulation' }
    ]
  },
  {
    id: 'sacco-microfinance-wealth',
    title: 'SACCO Governance, Credit Risk & Wealth Building',
    category: 'Macroeconomics',
    level: 'Advanced',
    priceKsh: 5500,
    duration: '3 Weeks',
    modulesCount: 5,
    studentsCount: 290,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    description: 'A comprehensive study on Savings and Credit Cooperative Societies (SACCOs), regulatory oversight (SASRA), non-performing asset evaluation, and cooperative capital allocation.',
    targetAudience: 'SACCO board members, cooperative managers, institutional credit risk officers, and high-net-worth member-investors.',
    outcomes: [
      'Analyze SASRA regulatory benchmarks and capital adequacy requirements',
      'Evaluate loan book quality and loan loss provisioning strategies',
      'Structure dividend distributions vs retaining earnings for institutional growth',
      'Design sustainable wealth-generation models using cooperative vehicles'
    ],
    curriculum: [
      { module: 'Module 1', title: 'The Economics of SACCOs & Cooperative Financial Systems' },
      { module: 'Module 2', title: 'Regulatory Frameworks: SASRA Compliance & Capital Standards' },
      { module: 'Module 3', title: 'Credit Assessment, Portfolio Quality & NPL Management' },
      { module: 'Module 4', title: 'Liquidity Management & Treasury Operations' },
      { module: 'Module 5', title: 'Corporate Governance & Long-Term Institutional Strategy' }
    ]
  }
];

const SAMPLE_ARTICLES = [
  {
    id: 'navigating-kenya-infrastructure-bonds',
    title: 'Navigating Kenya Infrastructure Bonds in a High-Interest Rate Climate',
    category: 'Fixed Income',
    readTime: '6 min read',
    publishedDate: 'October 18, 2026',
    author: 'Nairobi Money School Research Desk',
    excerpt: 'An in-depth analysis of tax-exempt status, coupon reinvestment strategies, and secondary market trading dynamics on the Nairobi Securities Exchange.',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
    content: `
      <p>Infrastructure bonds (IFBs) issued by the Central Bank of Kenya continue to represent one of the most compelling risk-adjusted fixed income instruments in Sub-Saharan Africa. With tax-exempt status granted under Kenyan tax law, their effective yield outpaces conventional government bonds for tax-resident and international investors alike.</p>
      <h3>Understanding the Tax-Exempt Advantage</h3>
      <p>Unlike standard Treasury bonds where a 10% to 15% withholding tax applies to coupon payments, IFBs deliver net yields that equal their gross bidding rates. For high-net-worth investors and institutional funds, this tax shielding dramatically enhances compounding over a 10-to-18-year tenure.</p>
      <h3>Secondary Market Liquidity & Yield Trajectories</h3>
      <p>While holding to maturity guarantees the coupon return and principal repayment, investors must also understand secondary market dynamics on the NSE. As interest rate environments shift in response to Central Bank Rate (CBR) policy decisions, bond prices fluctuate inversely with prevailing yields.</p>
      <div class="my-6 p-4 bg-[#F4EFE6] border-l-4 border-[#C5A059] italic text-[#1A202C]">
        "Tax-exemption on infrastructure debt provides a vital buffer for regional investors seeking inflation-hedged income without equity market volatility."
      </div>
      <p>Investors looking to enter or exit positions before maturity should closely monitor the CBK auction calendar and interbank liquidity levels to optimize execution timing.</p>
    `
  },
  {
    id: 'understanding-afcfta-capital-flows',
    title: 'Understanding AfCFTA: Capital Flows & Cross-Border Investment Protocols',
    category: 'Macroeconomics',
    readTime: '8 min read',
    publishedDate: 'October 12, 2026',
    author: 'Pan-African Macro Unit',
    excerpt: 'How the African Continental Free Trade Area is reshaping portfolio investment corridors, currency settlement networks (PAPSS), and regional trade financing.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    content: `
      <p>The African Continental Free Trade Area (AfCFTA) represents a foundational shift not only for physical trade in goods and services, but also for capital movement and financial settlement across 54 signatory nations.</p>
      <h3>The Pan-African Payment and Settlement System (PAPSS)</h3>
      <p>A central pillar of cross-border financial integration is PAPSS, developed in collaboration with Afreximbank. By enabling cross-border payments in local currencies without requiring routing through US Dollar intermediary banks, PAPSS significantly reduces transaction costs and FX conversion drag.</p>
      <h3>Implications for Equity and Debt Investments</h3>
      <p>As regulatory barriers ease, cross-listing of corporate counters between the NSE, Johannesburg Stock Exchange (JSE), Nigerian Exchange (NGX), and BVMAC will become increasingly frictionless, offering investors seamless continental diversification.</p>
    `
  },
  {
    id: 'demystifying-sacco-dividends',
    title: 'Demystifying SACCO Dividends: Share Capital vs. Member Deposits',
    category: 'Financial Literacy',
    readTime: '5 min read',
    publishedDate: 'September 28, 2026',
    author: 'Financial Advisory Desk',
    excerpt: 'A clear guide to calculating interest on deposits versus dividends on share capital in deposit-taking cooperatives across East Africa.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    content: `
      <p>SACCOs are a cornerstone of financial accumulation in Kenya, holding over KSh 1 trillion in total assets. However, many members remain confused about the fundamental distinction between interest paid on non-withdrawable deposits and dividends paid on share capital.</p>
      <h3>Interest on Deposits</h3>
      <p>Interest on deposits represents the return earned on member savings used by the SACCO to extend credit. This rate is usually declared annually and is calculated on a prorated or minimum monthly balance basis.</p>
      <h3>Dividends on Share Capital</h3>
      <p>Share capital represents permanent equity ownership in the cooperative. While dividends on share capital often feature higher percentage yields (frequently 12% to 18%), share capital cannot be withdrawn—only transferred or sold to another member upon exit.</p>
    `
  }
];

const SAMPLE_EVENTS = [
  {
    id: 'sovereign-debt-masterclass-2026',
    title: 'East Africa Sovereign Debt & Macroeconomic Outlook 2027',
    date: 'November 18, 2026',
    time: '14:00 - 16:30 EAT (GMT+3)',
    type: 'Live Virtual Masterclass',
    speaker: 'Dr. Kwame Omondi, Chief Economist',
    price: 'Free Public Event (Registration Required)',
    description: 'An expert panel analyzing regional debt maturities, Eurobond refinancing outlook, inflation trends, and regional currency pressures.',
    topics: ['CBK Rate Decisions & Liquidity', 'Eurobond Refinancing Cycles', 'FX Reserve Dynamics']
  },
  {
    id: 'corporate-treasury-workshop',
    title: 'Corporate FX Risk Management & Hedging Strategies',
    date: 'December 04, 2026',
    time: '09:00 - 13:00 EAT',
    type: 'Executive Hybrid Workshop',
    speaker: 'Nairobi Money School Treasury Practice',
    price: 'KSh 12,000 / Participant',
    description: 'A intensive technical workshop designed for CFOs, corporate treasurers, and finance leaders dealing with multi-currency African transactions.',
    topics: ['Forward Contracts', 'Money Market Hedges', 'Balance Sheet FX Exposure']
  }
];

// ==========================================
// MAIN COMPONENT & STATE MANAGEMENT
// ==========================================

export default function App() {
  // Navigation State
  const [currentRoute, setCurrentRoute] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Selected Detail Modal States
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Search & Filter States
  const [courseFilter, setCourseFilter] = useState('All');
  const [courseSearch, setCourseSearch] = useState('');
  const [articleFilter, setArticleFilter] = useState('All');

  // Form Demo Feedback States
  const [corporateSubmitted, setCorporateSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [enrollmentModalCourse, setEnrollmentModalCourse] = useState(null);
  const [enrollmentSubmitted, setEnrollmentSubmitted] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  }, [currentRoute]);

  // Filtered Courses Calculation
  const filteredCourses = useMemo(() => {
    return SAMPLE_COURSES.filter(course => {
      const matchesCategory = courseFilter === 'All' || course.category === courseFilter;
      const matchesSearch = course.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
                            course.description.toLowerCase().includes(courseSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [courseFilter, courseSearch]);

  // Filtered Articles Calculation
  const filteredArticles = useMemo(() => {
    return SAMPLE_ARTICLES.filter(article => {
      return articleFilter === 'All' || article.category === articleFilter;
    });
  }, [articleFilter]);

  // Handler functions
  const navigateTo = (route) => {
    setCurrentRoute(route);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A202C] font-sans antialiased selection:bg-[#C5A059] selection:text-white">
      
      {/* GLOBAL HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#07111E] text-white border-b border-[#1E293B] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* BRAND LOGO */}
            <button 
              onClick={() => navigateTo('home')}
              className="flex items-center space-x-3 text-left group focus:outline-none focus:ring-2 focus:ring-[#C5A059] rounded-sm p-1"
            >
              <div className="w-10 h-10 bg-[#C5A059] flex items-center justify-center font-serif text-xl font-bold text-[#07111E] rounded-xs shadow-sm group-hover:bg-[#D4AF37] transition-colors">
                N
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-[#C5A059] transition-colors">
                  NAIROBI MONEY SCHOOL
                </span>
                <span className="text-[10px] tracking-widest text-[#A0AEC0] uppercase font-sans font-medium">
                  Pan-African Investor Education
                </span>
              </div>
            </button>

            {/* DESKTOP NAVIGATION LINKS */}
            <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium tracking-wide">
              {[
                { id: 'home', label: 'Home' },
                { id: 'academy', label: 'Academy' },
                { id: 'research', label: 'Research & Insights' },
                { id: 'corporate', label: 'Corporate Training' },
                { id: 'events', label: 'Events' },
                { id: 'about', label: 'About & Contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`transition-colors duration-150 py-1 border-b-2 ${
                    currentRoute === item.id
                      ? 'border-[#C5A059] text-[#C5A059] font-semibold'
                      : 'border-transparent text-[#CBD5E1] hover:text-white hover:border-[#CBD5E1]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* PRIMARY CTA BUTTON */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={() => navigateTo('academy')}
                className="bg-[#C5A059] hover:bg-[#B38F47] text-[#07111E] font-semibold px-5 py-2.5 rounded-xs text-sm transition-all duration-200 shadow-xs flex items-center space-x-2 focus:ring-2 focus:ring-offset-2 focus:ring-[#C5A059]"
              >
                <span>Explore the Academy</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* MOBILE MENU TOGGLE BUTTON */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="p-2 text-[#CBD5E1] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE NAVIGATION MENU SLIDE-DOWN */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A192F] border-b border-[#1E293B] px-4 pt-3 pb-6 space-y-2">
            {[
              { id: 'home', label: 'Home' },
              { id: 'academy', label: 'Academy' },
              { id: 'research', label: 'Research & Insights' },
              { id: 'corporate', label: 'Corporate Training' },
              { id: 'events', label: 'Events' },
              { id: 'about', label: 'About & Contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`block w-full text-left px-3 py-2.5 rounded-xs text-base font-medium ${
                  currentRoute === item.id
                    ? 'bg-[#1E293B] text-[#C5A059] font-semibold border-l-4 border-[#C5A059]'
                    : 'text-[#E2E8F0] hover:bg-[#102A43] hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-[#1E293B]">
              <button
                onClick={() => navigateTo('academy')}
                className="w-full bg-[#C5A059] text-[#07111E] font-semibold py-3 rounded-xs text-center flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>Explore the Academy</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA BY ROUTE */}
      <main>
        {currentRoute === 'home' && (
          <HomePage 
            navigateTo={navigateTo} 
            courses={SAMPLE_COURSES} 
            articles={SAMPLE_ARTICLES} 
            events={SAMPLE_EVENTS}
            setSelectedCourse={setSelectedCourse}
            setSelectedArticle={setSelectedArticle}
            setSelectedEvent={setSelectedEvent}
            newsletterSubmitted={newsletterSubmitted}
            setNewsletterSubmitted={setNewsletterSubmitted}
          />
        )}

        {currentRoute === 'academy' && (
          <AcademyPage 
            courses={filteredCourses}
            courseFilter={courseFilter}
            setCourseFilter={setCourseFilter}
            courseSearch={courseSearch}
            setCourseSearch={setCourseSearch}
            setSelectedCourse={setSelectedCourse}
            setEnrollmentModalCourse={setEnrollmentModalCourse}
          />
        )}

        {currentRoute === 'research' && (
          <ResearchPage 
            articles={filteredArticles}
            articleFilter={articleFilter}
            setArticleFilter={setArticleFilter}
            setSelectedArticle={setSelectedArticle}
          />
        )}

        {currentRoute === 'corporate' && (
          <CorporatePage 
            corporateSubmitted={corporateSubmitted}
            setCorporateSubmitted={setCorporateSubmitted}
          />
        )}

        {currentRoute === 'events' && (
          <EventsPage 
            events={SAMPLE_EVENTS}
            setSelectedEvent={setSelectedEvent}
          />
        )}

        {currentRoute === 'about' && (
          <AboutContactPage 
            contactSubmitted={contactSubmitted}
            setContactSubmitted={setContactSubmitted}
          />
        )}
      </main>

      {/* MODALS */}

      {/* COURSE DETAIL MODAL */}
      {selectedCourse && (
        <CourseDetailModal 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)} 
          onEnroll={(course) => {
            setSelectedCourse(null);
            setEnrollmentModalCourse(course);
          }}
        />
      )}

      {/* ARTICLE READER MODAL */}
      {selectedArticle && (
        <ArticleDetailModal 
          article={selectedArticle} 
          onClose={() => setSelectedArticle(null)} 
        />
      )}

      {/* EVENT REGISTRATION MODAL */}
      {selectedEvent && (
        <EventDetailModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}

      {/* COURSE ENROLLMENT DEMO MODAL */}
      {enrollmentModalCourse && (
        <EnrollmentModal 
          course={enrollmentModalCourse}
          onClose={() => {
            setEnrollmentModalCourse(null);
            setEnrollmentSubmitted(false);
          }}
          submitted={enrollmentSubmitted}
          setSubmitted={setEnrollmentSubmitted}
        />
      )}

      {/* GLOBAL FOOTER */}
      <footer className="bg-[#07111E] text-white border-t border-[#1E293B] pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1E293B]">
            
            {/* BRAND COLUMN */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-[#C5A059] flex items-center justify-center font-serif text-lg font-bold text-[#07111E]">
                  N
                </div>
                <span className="font-serif text-lg font-bold tracking-tight">NAIROBI MONEY SCHOOL</span>
              </div>
              <p className="text-[#94A3B8] text-sm leading-relaxed max-w-sm">
                Building the foundation of a pan-African investor education ecosystem. Serving institutional leaders, modern investors, and diaspora capital across African markets.
              </p>
              <div className="pt-2 flex items-center space-x-2 text-xs text-[#C5A059]">
                <MapPin className="w-4 h-4" />
                <span>Nairobi Financial Hub, Upper Hill, Kenya</span>
              </div>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h4 className="font-serif text-sm font-semibold tracking-wider text-[#E2E8F0] uppercase mb-4">
                Platform
              </h4>
              <ul className="space-y-2.5 text-sm text-[#94A3B8]">
                <li><button onClick={() => navigateTo('academy')} className="hover:text-[#C5A059] transition-colors">Course Catalogue</button></li>
                <li><button onClick={() => navigateTo('research')} className="hover:text-[#C5A059] transition-colors">Research & Insights</button></li>
                <li><button onClick={() => navigateTo('corporate')} className="hover:text-[#C5A059] transition-colors">Corporate Training</button></li>
                <li><button onClick={() => navigateTo('events')} className="hover:text-[#C5A059] transition-colors">Executive Masterclasses</button></li>
              </ul>
            </div>

            {/* COVERAGE TOPICS */}
            <div>
              <h4 className="font-serif text-sm font-semibold tracking-wider text-[#E2E8F0] uppercase mb-4">
                Knowledge Areas
              </h4>
              <ul className="space-y-2.5 text-sm text-[#94A3B8]">
                <li>Sovereign Debt & T-Bills</li>
                <li>Nairobi Securities Exchange</li>
                <li>African Forex Dynamics</li>
                <li>SACCO & Microfinance Governance</li>
                <li>Macroeconomics & Liquidity</li>
              </ul>
            </div>

            {/* DISCLOSURES */}
            <div>
              <h4 className="font-serif text-sm font-semibold tracking-wider text-[#E2E8F0] uppercase mb-4">
                Educational Mandate
              </h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Nairobi Money School provides educational content, research analysis, and training. Content does not constitute individual financial or investment advice.
              </p>
              <div className="mt-4 pt-4 border-t border-[#1E293B]">
                <span className="inline-block px-2 py-1 bg-[#1E293B] text-[#C5A059] text-[10px] font-semibold tracking-wider uppercase rounded-xs">
                  Prototype Frontend v1.0
                </span>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#64748B] space-y-4 md:space-y-0">
            <p>© {new Date().getFullYear()} Nairobi Money School. All rights reserved.</p>
            <div className="flex space-x-6">
              <span className="hover:text-[#94A3B8] cursor-pointer">Educational Policies</span>
              <span className="hover:text-[#94A3B8] cursor-pointer">Privacy Framework</span>
              <span className="hover:text-[#94A3B8] cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

// ==========================================
// PAGE COMPONENT: HOMEPAGE
// ==========================================

function HomePage({ 
  navigateTo, 
  courses, 
  articles, 
  events, 
  setSelectedCourse, 
  setSelectedArticle,
  setSelectedEvent,
  newsletterSubmitted,
  setNewsletterSubmitted
}) {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubmitted(true);
    }
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* EDITORIAL HERO SECTION */}
      <section className="bg-[#07111E] text-white pt-12 pb-20 border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* HERO TEXT COLUMN */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-[#102A43] border border-[#1E293B] px-3.5 py-1.5 rounded-full text-xs text-[#C5A059] font-medium tracking-wide">
                <Globe className="w-3.5 h-3.5" />
                <span>Pan-African Financial Intelligence & Executive Education</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                Master Sovereign Debt, Capital Markets & Macroeconomics in Africa.
              </h1>

              <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed max-w-2xl font-normal">
                Nairobi Money School equips modern investors, treasury professionals, and corporate leaders with rigorous, market-tested financial education tailored to African economies.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigateTo('academy')}
                  className="bg-[#C5A059] hover:bg-[#B38F47] text-[#07111E] font-semibold px-6 py-3.5 rounded-xs text-base transition-all duration-200 shadow-md flex items-center justify-center space-x-2 focus:ring-2 focus:ring-[#C5A059]"
                >
                  <span>Explore the Academy</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => navigateTo('corporate')}
                  className="bg-transparent hover:bg-[#102A43] text-[#E2E8F0] border border-[#334155] font-semibold px-6 py-3.5 rounded-xs text-base transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Building className="w-5 h-5 text-[#C5A059]" />
                  <span>Corporate & Institutional Training</span>
                </button>
              </div>

              {/* HIGHLIGHT PILLARS */}
              <div className="pt-8 grid grid-cols-3 gap-4 border-t border-[#1E293B] text-xs sm:text-sm text-[#94A3B8]">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                  <span>Practical Local Context</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                  <span>Sovereign Debt Focus</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                  <span>Pan-African Vision</span>
                </div>
              </div>
            </div>

            {/* HERO VISUAL COLUMN */}
            <div className="lg:col-span-5">
              <div className="relative rounded-xs overflow-hidden border border-[#1E293B] shadow-2xl bg-[#0A192F]">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80" 
                  alt="Nairobi Financial District Architecture" 
                  className="w-full h-[380px] object-cover opacity-80 hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07111E] via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#07111E]/90 backdrop-blur-xs border-t border-[#1E293B]">
                  <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase block mb-1">
                    Featured Core Module
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white">
                    Bonds, Treasury Bills & Sovereign Debt Metrics
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-1">
                    Mastering East African fixed income yields, auction mechanics, and sovereign credit frameworks.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED ACADEMY COURSES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#E2D9CC]">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#C5A059] uppercase font-semibold block mb-1">
              Curriculum Catalog
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#07111E]">
              Featured Academy Courses
            </h2>
          </div>
          <button
            onClick={() => navigateTo('academy')}
            className="mt-4 md:mt-0 text-sm font-semibold text-[#07111E] hover:text-[#C5A059] flex items-center space-x-1 transition-colors"
          >
            <span>View All Academy Courses</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.slice(0, 3).map((course) => (
            <div 
              key={course.id}
              className="bg-white border border-[#E2D9CC] rounded-xs overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-[#07111E]/90 text-[#C5A059] text-xs px-2.5 py-1 font-semibold rounded-xs border border-[#1E293B]">
                  {course.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#64748B] mb-2">
                    <span className="font-medium bg-[#FAF8F5] px-2 py-0.5 border border-[#E2D9CC] rounded-xs">{course.level}</span>
                    <span>{course.duration}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#07111E] group-hover:text-[#C5A059] transition-colors leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-sm text-[#4A5568] mt-2 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F1EFEA] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#64748B] block">Tuition Fee</span>
                    <span className="font-serif text-lg font-bold text-[#07111E]">KSh {course.priceKsh.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="bg-[#07111E] hover:bg-[#102A43] text-white text-xs font-semibold px-4 py-2.5 rounded-xs transition-colors flex items-center space-x-1"
                  >
                    <span>Overview</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RESEARCH & INSIGHTS EDITORIAL HIGHLIGHT */}
      <section className="bg-[#FAF8F5] border-y border-[#E2D9CC] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#E2D9CC]">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#C5A059] uppercase font-semibold block mb-1">
                Financial Journalism & Analysis
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#07111E]">
                Latest Research & Market Explainers
              </h2>
            </div>
            <button
              onClick={() => navigateTo('research')}
              className="mt-4 md:mt-0 text-sm font-semibold text-[#07111E] hover:text-[#C5A059] flex items-center space-x-1 transition-colors"
            >
              <span>Explore Research Hub</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article 
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="bg-white border border-[#E2D9CC] p-6 rounded-xs shadow-xs hover:border-[#C5A059] transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#64748B]">
                    <span className="text-[#C5A059] font-semibold tracking-wider uppercase text-[11px]">{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#07111E] group-hover:text-[#C5A059] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-[#4A5568] leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#F1EFEA] flex items-center justify-between text-xs text-[#64748B]">
                  <span>{article.publishedDate}</span>
                  <span className="text-[#07111E] font-semibold group-hover:underline flex items-center space-x-1">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CORPORATE EDUCATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#07111E] text-white rounded-xs p-8 sm:p-12 border border-[#1E293B] relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 text-[#C5A059] text-xs font-semibold uppercase tracking-wider">
              <Building className="w-4 h-4" />
              <span>Institutional Capability Building</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
              Tailored Financial Literacy & Treasury Training for Organizations
            </h2>
            <p className="text-[#CBD5E1] text-base leading-relaxed">
              We partner with commercial banks, SACCOs, asset managers, family offices, and universities across East Africa to design custom financial training programs.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('corporate')}
                className="bg-[#C5A059] hover:bg-[#B38F47] text-[#07111E] font-semibold px-6 py-3 rounded-xs text-sm transition-all flex items-center space-x-2"
              >
                <span>Request Custom Corporate Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E2D9CC]">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#C5A059] uppercase font-semibold block mb-1">
              Live Convenings & Webinars
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#07111E]">
              Upcoming Masterclasses
            </h2>
          </div>
          <button
            onClick={() => navigateTo('events')}
            className="text-sm font-semibold text-[#07111E] hover:text-[#C5A059] flex items-center space-x-1"
          >
            <span>View All Events</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div 
              key={event.id}
              className="bg-white border border-[#E2D9CC] p-6 rounded-xs flex flex-col justify-between space-y-4 hover:border-[#C5A059] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-[#FAF8F5] border border-[#E2D9CC] text-[#07111E] text-xs font-semibold px-2.5 py-1 rounded-xs">
                    {event.type}
                  </span>
                  <span className="text-xs text-[#C5A059] font-medium">{event.date}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#07111E]">
                  {event.title}
                </h3>
                <p className="text-xs text-[#64748B] font-medium">
                  Speaker: {event.speaker}
                </p>
                <p className="text-sm text-[#4A5568] leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F1EFEA] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#07111E]">{event.price}</span>
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="border border-[#07111E] hover:bg-[#07111E] hover:text-white text-[#07111E] text-xs font-semibold px-4 py-2 rounded-xs transition-colors"
                >
                  Reserve Seat
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HONEST DEMO NEWSLETTER SECTION */}
      <section className="bg-[#07111E] text-white py-16 border-t border-[#1E293B]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs font-mono tracking-widest text-[#C5A059] uppercase font-semibold">
            Pan-African Market Dispatches
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Subscribe to Nairobi Money School Intelligence
          </h2>
          <p className="text-[#94A3B8] text-sm max-w-xl mx-auto">
            Get weekly executive summaries on East African bond auctions, currency movements, and central bank macroeconomic updates directly in your inbox.
          </p>

          {newsletterSubmitted ? (
            <div className="p-4 bg-[#102A43] border border-[#C5A059] rounded-xs max-w-md mx-auto text-sm text-[#C5A059]">
              Thank you for subscribing to our dispatches. (Demo response recorded).
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input
                type="email"
                required
                placeholder="Enter your professional email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-[#0A192F] border border-[#334155] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C5A059] rounded-xs"
              />
              <button
                type="submit"
                className="bg-[#C5A059] hover:bg-[#B38F47] text-[#07111E] font-semibold px-6 py-3 rounded-xs text-sm transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}

// ==========================================
// PAGE COMPONENT: ACADEMY (COURSE CATALOG)
// ==========================================

function AcademyPage({ 
  courses, 
  courseFilter, 
  setCourseFilter, 
  courseSearch, 
  setCourseSearch, 
  setSelectedCourse,
  setEnrollmentModalCourse
}) {
  const categories = ['All', 'Fixed Income', 'Capital Markets', 'Currencies', 'Macroeconomics'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* PAGE HEADER */}
      <div className="border-b border-[#E2D9CC] pb-8">
        <span className="text-xs font-mono tracking-widest text-[#C5A059] uppercase font-semibold block mb-1">
          Structured Learning
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#07111E]">
          Academy Course Catalogue
        </h1>
        <p className="text-[#4A5568] text-base mt-2 max-w-3xl leading-relaxed">
          Comprehensive, market-tested courses engineered for individual investors, asset managers, and finance professionals navigating African financial markets.
        </p>
      </div>

      {/* FILTER & SEARCH CONTROL BAR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 border border-[#E2D9CC] rounded-xs">
        
        {/* CATEGORY TABS */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-2 lg:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCourseFilter(cat)}
              className={`px-3.5 py-2 rounded-xs text-xs font-semibold whitespace-nowrap transition-colors ${
                courseFilter === cat
                  ? 'bg-[#07111E] text-white'
                  : 'bg-transparent text-[#4A5568] hover:bg-[#FAF8F5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* SEARCH INPUT */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0AEC0]" />
          <input
            type="text"
            placeholder="Search courses or topics..."
            value={courseSearch}
            onChange={(e) => setCourseSearch(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-[#E2D9CC] pl-9 pr-4 py-2 text-xs text-[#07111E] rounded-xs focus:outline-none focus:border-[#C5A059]"
          />
          {courseSearch && (
            <button 
              onClick={() => setCourseSearch('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A0AEC0] hover:text-[#07111E]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* COURSES GRID */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div 
              key={course.id}
              className="bg-white border border-[#E2D9CC] rounded-xs overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#07111E]/90 text-[#C5A059] text-xs px-2.5 py-1 font-semibold rounded-xs border border-[#1E293B]">
                    {course.category}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#64748B]">
                    <span className="font-medium bg-[#FAF8F5] px-2 py-0.5 border border-[#E2D9CC] rounded-xs">{course.level}</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#07111E] leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-sm text-[#4A5568] leading-relaxed line-clamp-3">
                    {course.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-4">
                <div className="pt-4 border-t border-[#F1EFEA] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#64748B] block uppercase tracking-wider font-semibold">Tuition Fee</span>
                    <span className="font-serif text-lg font-bold text-[#07111E]">KSh {course.priceKsh.toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-[#64748B]">
                    <span>{course.modulesCount} Modules</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="w-full border border-[#07111E] text-[#07111E] hover:bg-[#FAF8F5] text-xs font-semibold py-2.5 rounded-xs transition-colors"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => setEnrollmentModalCourse(course)}
                    className="w-full bg-[#07111E] hover:bg-[#102A43] text-white text-xs font-semibold py-2.5 rounded-xs transition-colors"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white border border-[#E2D9CC] rounded-xs space-y-3">
          <HelpCircle className="w-8 h-8 text-[#A0AEC0] mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#07111E]">No courses match your query</h3>
          <p className="text-sm text-[#64748B]">Try clearing your search term or switching filter categories.</p>
          <button
            onClick={() => { setCourseFilter('All'); setCourseSearch(''); }}
            className="mt-2 text-xs font-semibold text-[#C5A059] underline"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}

// ==========================================
// PAGE COMPONENT: RESEARCH & INSIGHTS
// ==========================================

function ResearchPage({ articles, articleFilter, setArticleFilter, setSelectedArticle }) {
  const categories = ['All', 'Fixed Income', 'Macroeconomics', 'Financial Literacy'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* PAGE HEADER */}
      <div className="border-b border-[#E2D9CC] pb-8">
        <span className="text-xs font-mono tracking-widest text-[#C5A059] uppercase font-semibold block mb-1">
          Financial Media & Analysis
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#07111E]">
          Research & Insights
        </h1>
        <p className="text-[#4A5568] text-base mt-2 max-w-3xl leading-relaxed">
          Rigorous commentary, sovereign debt explainers, macroeconomic breakdowns, and capital market updates from the Nairobi Money School research team.
        </p>
      </div>

      {/* FILTER TABS */}
      <div className="flex items-center space-x-2 border-b border-[#E2D9CC] pb-4">
        <span className="text-xs font-semibold text-[#64748B] mr-2">Topic:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setArticleFilter(cat)}
            className={`px-3 py-1.5 rounded-xs text-xs font-semibold transition-colors ${
              articleFilter === cat
                ? 'bg-[#07111E] text-white'
                : 'bg-white text-[#4A5568] border border-[#E2D9CC] hover:bg-[#FAF8F5]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ARTICLES LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <article 
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="bg-white border border-[#E2D9CC] rounded-xs overflow-hidden shadow-xs hover:border-[#C5A059] transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="h-48 overflow-hidden bg-slate-100 relative">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-[#07111E]/90 text-[#C5A059] text-[10px] font-semibold px-2 py-0.5 tracking-wider uppercase rounded-xs">
                  {article.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#64748B]">
                  <span>{article.author}</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#07111E] group-hover:text-[#C5A059] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-sm text-[#4A5568] leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <div className="pt-4 border-t border-[#F1EFEA] flex items-center justify-between text-xs text-[#64748B]">
                <span>{article.publishedDate}</span>
                <span className="text-[#07111E] font-semibold group-hover:underline flex items-center space-x-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}

// ==========================================
// PAGE COMPONENT: CORPORATE TRAINING
// ==========================================

function CorporatePage({ corporateSubmitted, setCorporateSubmitted }) {
  const [formData, setFormData] = useState({
    orgName: '',
    orgType: 'Commercial Bank',
    contactName: '',
    email: '',
    phone: '',
    topic: 'Fixed Income & Bond Bidding',
    participants: '20-50',
    deliveryFormat: 'Hybrid (Nairobi Campus + Virtual)',
    requirements: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setCorporateSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* PAGE HEADER */}
      <div className="border-b border-[#E2D9CC] pb-8">
        <span className="text-xs font-mono tracking-widest text-[#C5A059] uppercase font-semibold block mb-1">
          Institutional Development
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#07111E]">
          Corporate & Institutional Financial Training
        </h1>
        <p className="text-[#4A5568] text-base mt-2 max-w-3xl leading-relaxed">
          Customized financial literacy programs, credit risk workshops, and macroeconomic advisory seminars for financial institutions, corporations, universities, and SACCOs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* VALUE PROPOSITION COLUMN */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[#07111E] text-white p-8 rounded-xs border border-[#1E293B] space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#C5A059]">
              Why Partner with Nairobi Money School?
            </h3>

            <div className="space-y-4 text-sm text-[#CBD5E1]">
              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Localized Case Studies</strong>
                  Trained on East African money markets, CBK auction dynamics, and regional tax codes.
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Flexible Delivery Models</strong>
                  In-person executive workshops in Nairobi or blended virtual modules for distributed regional teams.
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Measurable Learning Outcomes</strong>
                  Pre- and post-training assessments, practical modeling templates, and executive certificates.
                </div>
              </div>
            </div>
          </div>

          <div className="border border-[#E2D9CC] bg-white p-6 rounded-xs space-y-3">
            <h4 className="font-serif text-base font-bold text-[#07111E]">Eligible Institutional Partners</h4>
            <ul className="text-xs text-[#4A5568] space-y-2 list-disc pl-4">
              <li>Commercial & Microfinance Banks</li>
              <li>Deposit-Taking SACCOs (SASRA Regulated)</li>
              <li>Asset Management & Private Equity Firms</li>
              <li>University Economics & Business Faculties</li>
              <li>Family Offices & High-Net-Worth Advisory Hubs</li>
            </ul>
          </div>
        </div>

        {/* PROPOSAL FORM COLUMN */}
        <div className="lg:col-span-7 bg-white p-8 border border-[#E2D9CC] rounded-xs shadow-xs">
          {corporateSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 bg-[#F4EFE6] text-[#C5A059] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#07111E]">Training Proposal Request Received</h3>
              <p className="text-sm text-[#4A5568] max-w-md mx-auto">
                Thank you for reaching out. Our institutional director will review your requirements and respond within 24 business hours.
              </p>
              <div className="p-4 bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#64748B] rounded-xs max-w-md mx-auto">
                <strong>Prototype Notice:</strong> This submission is simulated for demo purposes and not saved to a live backend.
              </div>
              <button
                onClick={() => setCorporateSubmitted(false)}
                className="mt-4 text-xs font-semibold text-[#07111E] underline"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#07111E] pb-2 border-b border-[#F1EFEA]">
                Request a Custom Corporate Proposal
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#07111E]">Organization Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.orgName}
                    onChange={(e) => setFormData({...formData, orgName: e.target.value})}
                    placeholder="e.g. Equity Group or Stima SACCO"
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CC] px-3.5 py-2 text-xs text-[#07111E] rounded-xs focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#07111E]">Organization Type *</label>
                  <select
                    value={formData.orgType}
                    onChange={(e) => setFormData({...formData, orgType: e.target.value})}
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CC] px-3.5 py-2 text-xs text-[#07111E] rounded-xs focus:outline-none focus:border-[#C5A059]"
                  >
                    <option>Commercial Bank</option>
                    <option>Deposit-Taking SACCO</option>
                    <option>Asset Management Firm</option>
                    <option>University / Academic Institution</option>
                    <option>SME / Private Corporate</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#07111E]">Contact Person *</label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    placeholder="Full Name"
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CC] px-3.5 py-2 text-xs text-[#07111E] rounded-xs focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#07111E]">Work Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@company.co.ke"
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CC] px-3.5 py-2 text-xs text-[#07111E] rounded-xs focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#07111E]">Core Topic Focus</label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({...formData, topic: e.target.value})}
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CC] px-3.5 py-2 text-xs text-[#07111E] rounded-xs focus:outline-none focus:border-[#C5A059]"
                  >
                    <option>Fixed Income & Bond Bidding</option>
                    <option>SACCO Credit Risk & SASRA Compliance</option>
                    <option>Corporate FX Risk Hedging</option>
                    <option>African Capital Markets Investment</option>
                    <option>Custom Multi-Topic Syllabus</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#07111E]">Estimated Participants</label>
                  <select
                    value={formData.participants}
                    onChange={(e) => setFormData({...formData, participants: e.target.value})}
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CC] px-3.5 py-2 text-xs text-[#07111E] rounded-xs focus:outline-none focus:border-[#C5A059]"
                  >
                    <option>10 - 20 Executive Staff</option>
                    <option>20 - 50 Staff</option>
                    <option>50 - 150 Staff</option>
                    <option>150+ Organization-Wide</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#07111E]">Preferred Delivery Format</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  {['In-Person (Nairobi)', 'Virtual Live Sessions', 'Hybrid Model'].map((fmt) => (
                    <label 
                      key={fmt}
                      className={`p-2.5 border text-xs text-center cursor-pointer rounded-xs transition-colors ${
                        formData.deliveryFormat === fmt
                          ? 'border-[#07111E] bg-[#07111E] text-white font-semibold'
                          : 'border-[#E2D9CC] bg-[#FAF8F5] text-[#4A5568]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliveryFormat"
                        className="sr-only"
                        checked={formData.deliveryFormat === fmt}
                        onChange={() => setFormData({...formData, deliveryFormat: fmt})}
                      />
                      {fmt}
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#07111E]">Specific Requirements or Objectives</label>
                <textarea
                  rows={3}
                  value={formData.requirements}
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  placeholder="Outline any tailored learning outcomes or team backgrounds..."
                  className="w-full bg-[#FAF8F5] border border-[#E2D9CC] p-3 text-xs text-[#07111E] rounded-xs focus:outline-none focus:border-[#C5A059]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#07111E] hover:bg-[#102A43] text-white text-sm font-semibold py-3 rounded-xs transition-colors flex items-center justify-center space-x-2"
              >
                <span>Submit Institutional Inquiry</span>
                <ArrowRight className="w-4 h-4 text-[#C5A059]" />
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}

// ==========================================
// PAGE COMPONENT: EVENTS & WEBINARS
// ==========================================

function EventsPage({ events, setSelectedEvent }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* PAGE HEADER */}
      <div className="border-b border-[#E2D9CC] pb-8">
        <span className="text-xs font-mono tracking-widest text-[#C5A059] uppercase font-semibold block mb-1">
          Convenings & Conveners
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#07111E]">
          Executive Webinars & Workshops
        </h1>
        <p className="text-[#4A5568] text-base mt-2 max-w-3xl leading-relaxed">
          Interactive masterclasses led by economists, bond traders, and corporate policy experts. Designed for active market participants seeking real-time perspective.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event) => (
          <div 
            key={event.id}
            className="bg-white border border-[#E2D9CC] p-8 rounded-xs shadow-xs space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#F1EFEA] pb-3">
                <span className="bg-[#07111E] text-[#C5A059] text-xs font-semibold px-2.5 py-1 rounded-xs">
                  {event.type}
                </span>
                <span className="text-xs text-[#07111E] font-bold">{event.date}</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#07111E] leading-snug">
                {event.title}
              </h3>

              <div className="space-y-1 text-xs text-[#64748B]">
                <p><strong>Timing:</strong> {event.time}</p>
                <p><strong>Led by:</strong> {event.speaker}</p>
              </div>

              <p className="text-sm text-[#4A5568] leading-relaxed">
                {event.description}
              </p>

              <div className="pt-2">
                <span className="text-xs font-semibold text-[#07111E] block mb-2">Focus Topics:</span>
                <div className="flex flex-wrap gap-1.5">
                  {event.topics.map((topic, i) => (
                    <span key={i} className="bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#4A5568] px-2 py-0.5 rounded-xs">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#F1EFEA] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#64748B] uppercase tracking-wider block font-semibold">Access Fee</span>
                <span className="text-sm font-bold text-[#07111E]">{event.price}</span>
              </div>
              <button
                onClick={() => setSelectedEvent(event)}
                className="bg-[#C5A059] hover:bg-[#B38F47] text-[#07111E] font-semibold text-xs px-5 py-2.5 rounded-xs transition-colors"
              >
                Register Seat
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

// ==========================================
// PAGE COMPONENT: ABOUT & CONTACT
// ==========================================

function AboutContactPage({ contactSubmitted, setContactSubmitted }) {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* MISSION & PAN-AFRICAN VISION */}
      <section className="space-y-8 border-b border-[#E2D9CC] pb-12">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono tracking-widest text-[#C5A059] uppercase font-semibold block">
            Our Educational Philosophy
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#07111E] leading-tight">
            Democratizing High-Conviction Investment Education Across Africa
          </h1>
          <p className="text-[#4A5568] text-base leading-relaxed">
            Nairobi Money School was established on a simple premise: financial independence and institutional stability in Africa require rigorous, market-rooted knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          <div className="bg-white p-6 border border-[#E2D9CC] rounded-xs space-y-3">
            <Award className="w-6 h-6 text-[#C5A059]" />
            <h3 className="font-serif text-lg font-bold text-[#07111E]">Context-First Curriculum</h3>
            <p className="text-xs text-[#4A5568] leading-relaxed">
              We teach finance using actual African money market instruments, Central Bank reserve frameworks, and local regulatory dynamics rather than abstract foreign models.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#E2D9CC] rounded-xs space-y-3">
            <Globe className="w-6 h-6 text-[#C5A059]" />
            <h3 className="font-serif text-lg font-bold text-[#07111E]">Pan-African Outlook</h3>
            <p className="text-xs text-[#4A5568] leading-relaxed">
              Nairobi serves as our intellectual home, but our focus spans regional economic corridors across East, West, and Southern Africa.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#E2D9CC] rounded-xs space-y-3">
            <Shield className="w-6 h-6 text-[#C5A059]" />
            <h3 className="font-serif text-lg font-bold text-[#07111E]">Uncompromising Integrity</h3>
            <p className="text-xs text-[#4A5568] leading-relaxed">
              We provide objective educational intelligence. We do not sell speculative schemes or operate proprietary brokerage desks.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT FORM & LOCATION SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* CONTACT INFO */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#07111E]">Get in Touch</h2>
            <p className="text-sm text-[#4A5568] mt-1">
              Have questions regarding course admissions, corporate workshops, or editorial research?
            </p>
          </div>

          <div className="bg-[#07111E] text-white p-6 rounded-xs space-y-4">
            <div className="flex items-start space-x-3 text-xs">
              <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Nairobi Financial Campus</strong>
                Upper Hill Financial District, Nairobi, Kenya
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs">
              <Mail className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Admissions & Inquiries</strong>
                admissions@nairobimoneyschool.com
              </div>
            </div>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="lg:col-span-7 bg-white p-8 border border-[#E2D9CC] rounded-xs">
          {contactSubmitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle className="w-10 h-10 text-[#C5A059] mx-auto" />
              <h3 className="font-serif text-xl font-bold text-[#07111E]">Message Received</h3>
              <p className="text-xs text-[#4A5568]">
                Thank you for contacting Nairobi Money School. Our desk will respond via email within 1 business day.
              </p>
              <button
                onClick={() => setContactSubmitted(false)}
                className="text-xs font-semibold text-[#07111E] underline pt-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#07111E]">Contact Admissions Desk</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#07111E]">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={contactData.name}
                    onChange={(e) => setContactData({...contactData, name: e.target.value})}
                    placeholder="Full Name"
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CC] px-3 py-2 text-xs text-[#07111E] rounded-xs focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#07111E]">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={contactData.email}
                    onChange={(e) => setContactData({...contactData, email: e.target.value})}
                    placeholder="name@domain.com"
                    className="w-full bg-[#FAF8F5] border border-[#E2D9CC] px-3 py-2 text-xs text-[#07111E] rounded-xs focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#07111E]">Subject</label>
                <select
                  value={contactData.subject}
                  onChange={(e) => setContactData({...contactData, subject: e.target.value})}
                  className="w-full bg-[#FAF8F5] border border-[#E2D9CC] px-3 py-2 text-xs text-[#07111E] rounded-xs focus:outline-none focus:border-[#C5A059]"
                >
                  <option>General Inquiry</option>
                  <option>Academy Enrollment Question</option>
                  <option>Corporate Partnership</option>
                  <option>Media & Press Inquiry</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#07111E]">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={contactData.message}
                  onChange={(e) => setContactData({...contactData, message: e.target.value})}
                  placeholder="How can we assist your investment learning goals?"
                  className="w-full bg-[#FAF8F5] border border-[#E2D9CC] p-3 text-xs text-[#07111E] rounded-xs focus:outline-none focus:border-[#C5A059]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#07111E] hover:bg-[#102A43] text-white text-xs font-semibold py-3 rounded-xs transition-colors"
              >
                SendMessage
              </button>
            </form>
          )}
        </div>

      </section>

    </div>
  );
}

// ==========================================
// MODAL COMPONENTS
// ==========================================

function CourseDetailModal({ course, onClose, onEnroll }) {
  return (
    <div className="fixed inset-0 z-50 bg-[#07111E]/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-[#E2D9CC] rounded-xs max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative space-y-6 p-6 sm:p-8">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#A0AEC0] hover:text-[#07111E] p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <span className="bg-[#FAF8F5] border border-[#E2D9CC] text-[#C5A059] font-semibold text-xs px-2.5 py-1 rounded-xs inline-block">
            {course.category} • {course.level}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#07111E] leading-snug">
            {course.title}
          </h2>
        </div>

        <p className="text-sm text-[#4A5568] leading-relaxed">
          {course.description}
        </p>

        <div className="bg-[#FAF8F5] p-4 border border-[#E2D9CC] rounded-xs space-y-2">
          <h4 className="text-xs font-semibold text-[#07111E] uppercase tracking-wider">Intended Audience</h4>
          <p className="text-xs text-[#4A5568] leading-relaxed">{course.targetAudience}</p>
        </div>

        <div className="space-y-3">
          <h4 className="font-serif text-base font-bold text-[#07111E]">Key Learning Outcomes</h4>
          <ul className="space-y-2">
            {course.outcomes.map((outcome, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-xs text-[#4A5568]">
                <CheckCircle className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-serif text-base font-bold text-[#07111E]">Curriculum Overview</h4>
          <div className="space-y-1.5">
            {course.curriculum.map((item, idx) => (
              <div key={idx} className="p-2.5 bg-[#FAF8F5] border border-[#E2D9CC] text-xs flex justify-between rounded-xs">
                <span className="font-semibold text-[#07111E]">{item.module}</span>
                <span className="text-[#4A5568]">{item.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-[#F1EFEA] flex items-center justify-between">
          <div>
            <span className="text-xs text-[#64748B] block">Tuition Fee</span>
            <span className="font-serif text-xl font-bold text-[#07111E]">KSh {course.priceKsh.toLocaleString()}</span>
          </div>

          <button
            onClick={() => onEnroll(course)}
            className="bg-[#07111E] hover:bg-[#102A43] text-white text-xs font-semibold px-6 py-3 rounded-xs transition-colors"
          >
            Enroll in Course
          </button>
        </div>

      </div>
    </div>
  );
}

function ArticleDetailModal({ article, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-[#07111E]/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-[#E2D9CC] rounded-xs max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-10 space-y-6">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#A0AEC0] hover:text-[#07111E] p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-3 border-b border-[#E2D9CC] pb-6">
          <span className="text-xs text-[#C5A059] font-semibold uppercase tracking-wider">
            {article.category} • {article.readTime}
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#07111E] leading-tight">
            {article.title}
          </h1>
          <div className="text-xs text-[#64748B] flex items-center space-x-4">
            <span>By {article.author}</span>
            <span>•</span>
            <span>{article.publishedDate}</span>
          </div>
        </div>

        <div 
          className="prose prose-slate text-sm leading-relaxed space-y-4 text-[#2D3748]"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="pt-6 border-t border-[#E2D9CC] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#07111E] text-white text-xs font-semibold px-5 py-2.5 rounded-xs"
          >
            Close Reader
          </button>
        </div>

      </div>
    </div>
  );
}

function EventDetailModal({ event, onClose }) {
  const [registered, setRegistered] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-[#07111E]/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#E2D9CC] rounded-xs max-w-md w-full p-6 space-y-6 relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#A0AEC0] hover:text-[#07111E] p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {registered ? (
          <div className="py-6 text-center space-y-3">
            <CheckCircle className="w-10 h-10 text-[#C5A059] mx-auto" />
            <h3 className="font-serif text-xl font-bold text-[#07111E]">Seat Reserved</h3>
            <p className="text-xs text-[#4A5568]">
              Your seat for <strong>{event.title}</strong> has been tentatively held. Check your inbox for calendar credentials.
            </p>
            <div className="p-3 bg-[#FAF8F5] border border-[#E2D9CC] text-[11px] text-[#64748B] rounded-xs">
              Demo Mode: No payment or database record was created.
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <span className="text-xs text-[#C5A059] font-semibold uppercase">{event.type}</span>
            <h3 className="font-serif text-xl font-bold text-[#07111E]">{event.title}</h3>
            
            <div className="text-xs text-[#64748B] space-y-1 bg-[#FAF8F5] p-3 border border-[#E2D9CC] rounded-xs">
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Pricing:</strong> {event.price}</p>
            </div>

            <button
              onClick={() => setRegistered(true)}
              className="w-full bg-[#07111E] hover:bg-[#102A43] text-white text-xs font-semibold py-3 rounded-xs transition-colors"
            >
              Confirm Registration
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function EnrollmentModal({ course, onClose, submitted, setSubmitted }) {
  return (
    <div className="fixed inset-0 z-50 bg-[#07111E]/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#E2D9CC] rounded-xs max-w-md w-full p-6 space-y-6 relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#A0AEC0] hover:text-[#07111E] p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-6 text-center space-y-3">
            <CheckCircle className="w-10 h-10 text-[#C5A059] mx-auto" />
            <h3 className="font-serif text-xl font-bold text-[#07111E]">Enrollment Inquiry Submitted</h3>
            <p className="text-xs text-[#4A5568]">
              Thank you for your interest in <strong>{course.title}</strong>. Our admissions officer will send payment instructions and onboarding materials.
            </p>
            <div className="p-3 bg-[#FAF8F5] border border-[#E2D9CC] text-[11px] text-[#64748B] rounded-xs">
              Honest Demo Notice: No M-Pesa or card charge was executed in this prototype.
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#07111E]">Course Enrollment</h3>
            
            <div className="bg-[#FAF8F5] p-3 border border-[#E2D9CC] rounded-xs text-xs space-y-1">
              <p className="font-semibold text-[#07111E]">{course.title}</p>
              <p className="text-[#64748B]">Tuition: KSh {course.priceKsh.toLocaleString()}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#07111E] mb-1">Full Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Wanjiku Kimani"
                  className="w-full bg-[#FAF8F5] border border-[#E2D9CC] p-2 rounded-xs focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#07111E] mb-1">Email Address *</label>
                <input 
                  type="email" 
                  required 
                  placeholder="name@domain.com"
                  className="w-full bg-[#FAF8F5] border border-[#E2D9CC] p-2 rounded-xs focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            <button
              onClick={() => setSubmitted(true)}
              className="w-full bg-[#07111E] hover:bg-[#102A43] text-white text-xs font-semibold py-3 rounded-xs transition-colors"
            >
              Submit Enrollment Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
}