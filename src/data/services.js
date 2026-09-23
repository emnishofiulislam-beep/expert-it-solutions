export const DEFAULT_IMAGE = '/placeholder.jpg';

export const SERVICES = [
  {
    id: 'cctv',
    slug: 'cctv',
    title: 'CCTV & Surveillance',
    shortDescription: 'HD camera installation, NVR setup & 24/7 mobile monitoring.',
    fullDescription: 'EXPERT IT SOLUTIONS offers end-to-end CCTV camera surveillance systems for residential homes, corporate offices, industrial factories, and commercial showrooms across Bangladesh. We deliver high-definition IP cameras, night-vision PTZ units, NVR/DVR storage servers, and seamless mobile app streaming with AI motion detection.',
    icon: 'Camera',
    image: DEFAULT_IMAGE,
    category: 'Security Systems',
    features: [
      'High-Definition 2MP to 4K IP & Analog Cameras',
      'Infrared & Color Night Vision with AI Person/Vehicle Detection',
      'Centralized NVR/DVR Setup with Cloud & Local RAID Backup',
      'Real-time Mobile Phone & Tablet Remote Live-View',
      'Hidden Cabling & Weatherproof IP67 Outdoor Armor',
      'Scheduled Maintenance & 24/7 Rapid Technical Response'
    ],
    benefits: [
      'Round-the-clock protection against theft, burglary, and trespassing',
      'Crystal-clear legal evidentiary footage records with time-stamping',
      'Remote monitoring of your office and factory operations from anywhere in the world',
      'Reduces insurance premiums and boosts workplace productivity'
    ],
    whyChooseUs: [
      'Authorized deployment partner for Hikvision and Dahua systems in Bangladesh',
      'Trained certified electrical and security network engineers',
      'Compliant neat concealed wiring and rack installations',
      '1-year full replacement warranty and on-site support visits'
    ],
    processSteps: [
      { step: '01', title: 'Site Inspection', description: 'Comprehensive survey of premises to identify blind spots and optimal camera angles.' },
      { step: '02', title: 'System Blueprint', description: 'Customized schematic design with camera models, cabling paths, and storage sizing.' },
      { step: '03', title: 'Precision Installation', description: 'Neat cabling, hardware mounting, NVR network configuration, and testing.' },
      { step: '04', title: 'Handover & Training', description: 'Staff training, mobile app configuration, and complete warranty handover.' }
    ],
    relatedServices: ['access-control', 'networking-solutions']
  },
  {
    id: 'networking-solutions',
    slug: 'networking-solutions',
    title: 'Networking Solutions',
    shortDescription: 'Structured cabling, router/switch setup & enterprise Wi-Fi.',
    fullDescription: 'We design, install, and optimize robust enterprise networking infrastructures. From Cat6/Fiber optic structured cabling, managed switches, and Cisco/MikroTik router configuration to enterprise-grade seamless mesh Wi-Fi and VPN tunnels, we ensure zero-downtime high-speed connectivity.',
    icon: 'Network',
    image: DEFAULT_IMAGE,
    category: 'Infrastructure',
    features: [
      'Structured Cat6/Cat6A & Optical Fiber Cabling with Fluke Testing',
      'Server Rack Setup, Patch Panel Termination & Cable Dressing',
      'MikroTik, Cisco & TP-Link Router & Firewall Configuration',
      'Enterprise Mesh Wi-Fi with Seamless Roaming & Guest Captive Portal',
      'Multi-Branch Site-to-Site VPN & Bandwidth Management (QoS)',
      'VLAN Segmentation, Network Security & Intrusion Prevention'
    ],
    benefits: [
      'Eliminates dead zones, buffering, and packet drops throughout the facility',
      'Safeguards sensitive internal corporate data against unauthorized snooping',
      'Prioritizes critical business traffic like ERP and VoIP calls',
      'Scalable architecture ready to support hundreds of concurrent devices'
    ],
    whyChooseUs: [
      'Certified Cisco (CCNA) and MikroTik network specialists on staff',
      'High-grade branded patch panels, server cabinets, and certified cables',
      'Detailed network topology documentation provided after deployment',
      'Prompt on-call and remote emergency network troubleshooting'
    ],
    processSteps: [
      { step: '01', title: 'Bandwidth & Traffic Audit', description: 'Assessing employee count, device loads, and application latency requirements.' },
      { step: '02', title: 'Network Topology Layout', description: 'Designing core switch, distribution switch, access points, and rack blueprints.' },
      { step: '03', title: 'Cabling & Rack Dressing', description: 'Structured laying of shielded cables, rack installation, and clean labeling.' },
      { step: '04', title: 'Router/Firewall Tuning', description: 'Subnetting, firewall rules, QoS, Wi-Fi optimization, and throughput validation.' }
    ],
    relatedServices: ['cctv', 'pabx-solutions']
  },
  {
    id: 'pabx-solutions',
    slug: 'pabx-solutions',
    title: 'PABX Solutions',
    shortDescription: 'IP PBX, intercom systems & corporate telephone solutions.',
    fullDescription: 'Upgrade your corporate voice communications with our modern IP PBX and analog PABX intercom systems. We deploy cost-effective internal calling, interactive voice response (IVR), call recording, conference bridges, and direct multi-branch extensions.',
    icon: 'PhoneCall',
    image: DEFAULT_IMAGE,
    category: 'Telecommunications',
    features: [
      'IP PBX Servers & Grandstream / Panasonic Analog PABX Systems',
      'Interactive Voice Response (IVR / Digital Auto-Attendant)',
      'Multi-branch Extension Dialing & Mobile Softphone Apps',
      'Automated Call Recording & In-Depth Call Analytics Reporting',
      'Voicemail to Email & Department Hunt Groups',
      'GSM Gateway Integration for Low-Cost Mobile Calls'
    ],
    benefits: [
      'Free inter-office and multi-branch internal voice calls',
      'Professional enterprise image with automated greeting and operator routing',
      'Total oversight of customer support and sales team telephone interactions',
      'Easy scalability as your organization hires more team members'
    ],
    whyChooseUs: [
      'Decade of experience in corporate telecommunications in Bangladesh',
      'Support for both modern SIP/VoIP and legacy PSTN telephone lines',
      'Neat distribution boxes (MDF/IDF) with zero crosstalk or static',
      'Full post-sales configuration and extension reassignment support'
    ],
    processSteps: [
      { step: '01', title: 'Requirement Gathering', description: 'Determining trunk lines, internal extension count, and call flow routing rules.' },
      { step: '02', title: 'System Selection', description: 'Choosing between Asterisk/FreePBX appliances or hardware PBX systems.' },
      { step: '03', title: 'Line Laying & IP Phones', description: 'Connecting telephone lines, configuring desk SIP phones and softphones.' },
      { step: '04', title: 'IVR Recording & Testing', description: 'Deploying studio-grade voice prompts and conducting load stress testing.' }
    ],
    relatedServices: ['networking-solutions', 'pa-system']
  },
  {
    id: 'access-control',
    slug: 'access-control',
    title: 'Access Control',
    shortDescription: 'Biometric fingerprint, face attendance & smart door locks.',
    fullDescription: 'Manage workplace physical security and automate employee working hours with our cutting-edge biometric access control systems. We integrate smart electromagnetic door locks, turnstiles, and cloud-synced time-attendance software.',
    icon: 'Fingerprint',
    image: DEFAULT_IMAGE,
    category: 'Security Systems',
    features: [
      'Biometric Fingerprint & Ultra-Fast AI Facial Recognition Terminals',
      'RFID Proximity Cards & Encrypted Key Fob Access',
      'Electromagnetic (EM) & Drop-Bolt Smart Door Locks for Glass & Wood Doors',
      'Automated Time-Attendance Software with Shift & Overtime Calculation',
      'Exit Push Buttons, Emergency Break-Glass Units & Backup UPS Power',
      'Cloud Synchronization & Direct Integration with HR/Payroll Systems'
    ],
    benefits: [
      'Prevents unauthorized persons from entering sensitive company zones',
      'Eliminates buddy-punching and fraudulent manual attendance logs',
      'Provides accurate monthly overtime and deduction reports in one click',
      'Logs comprehensive audit trail of every entry and exit event'
    ],
    whyChooseUs: [
      'Official partners for ZKTeco, Hikvision, and Virdi access hardware',
      'Experienced in framing glass, aluminum, wooden, and fire-exit doors',
      'Turnkey software setup and staff attendance training provided',
      'Emergency door override mechanisms installed for fire code compliance'
    ],
    processSteps: [
      { step: '01', title: 'Door Inspection', description: 'Assessing door types (frameless glass, wooden, metal) to select correct locks.' },
      { step: '02', title: 'Hardware Installation', description: 'Mounting biometric terminal, EM lock, bracket, power supply, and exit switch.' },
      { step: '03', title: 'Software Setup', description: 'Installing attendance server, defining work shifts, holidays, and grace periods.' },
      { step: '04', title: 'User Enrollment', description: 'Enrolling staff fingerprints/faces and training HR management personnel.' }
    ],
    relatedServices: ['cctv', 'pa-system']
  },
  {
    id: 'pa-system',
    slug: 'pa-system',
    title: 'PA System',
    shortDescription: 'PA amplifiers, ceiling speakers & commercial sound systems.',
    fullDescription: 'Deliver clear audio announcements, emergency evacuation alerts, and ambient background music across your building, factory, shopping mall, school, or corporate office with our industrial Public Address (PA) solutions.',
    icon: 'Volume2',
    image: DEFAULT_IMAGE,
    category: 'Audio & Acoustics',
    features: [
      'Multi-Zone Audio Matrix Amplifiers & Paging Microphones',
      'Acoustic Ceiling Speakers, Wall-Mount Column Speakers & Outdoor Horns',
      'Fire Alarm & Emergency Voice Evacuation System Integration',
      'Scheduled Bell & Automated Voice Announcement Systems',
      'Bluetooth & Aux Background Music Streaming with Volume Attenuators',
      'High-Impedance 70V/100V Long-Distance Low-Loss Audio Cabling'
    ],
    benefits: [
      'Instant facility-wide or zone-specific vocal announcements',
      'Pleasant shopping and waiting environment with mellow background music',
      'Vital life-safety communication during fire drills and emergencies',
      'Consistent sound pressure level without echo or ear-piercing distortion'
    ],
    whyChooseUs: [
      'Brands trusted globally: Bosch, Ahuja, ITC, and ITC-Audio',
      'Acoustic engineers calculate decibel coverage for clear intelligibility',
      'Clean recessed installation into drywall and suspended ceiling grids',
      'Robust surge-protected audio racks designed for 24/7 non-stop operation'
    ],
    processSteps: [
      { step: '01', title: 'Acoustic Area Mapping', description: 'Calculating ambient noise levels to specify speaker wattage and positions.' },
      { step: '02', title: 'Speaker Wiring', description: 'Running heavy-gauge oxygen-free copper speaker cables to amplifier rack.' },
      { step: '03', title: 'Rack & Zone Setup', description: 'Connecting multi-zone mixer amplifier, microphones, and audio players.' },
      { step: '04', title: 'Calibration', description: 'Tuning volume levels per zone to prevent feedback howl and clipping.' }
    ],
    relatedServices: ['pabx-solutions', 'cctv']
  },
  {
    id: 'ac-services',
    slug: 'ac-services',
    title: 'AC Services & Maintenance',
    shortDescription: 'AC installation, chemical master wash & gas refilling.',
    fullDescription: 'Keep your server rooms, IT data centers, corporate offices, and showroom environments cool and dust-free. We provide precision HVAC/AC installation, thorough chemical master-jet cleaning, refrigerant leak fixing, and preventive service contracts.',
    icon: 'Wind',
    image: DEFAULT_IMAGE,
    category: 'Cooling & Environment',
    features: [
      'Split, Cassette & Precision Inverter AC Installation',
      'High-Pressure Jet Chemical Deep Cleaning & Disinfection',
      'Server Room 24/7 Redundant AC Cooling Systems',
      'R32, R410A & R22 Gas Pressure Checking & Nitrogen Leak Testing',
      'Capacitor, Compressor, Motor & PCB Circuit Board Repair',
      'Annual Maintenance Contracts (AMC) for Corporate Offices'
    ],
    benefits: [
      'Protects sensitive servers, routers, and PCs from fatal thermal throttling',
      'Cuts electricity consumption by up to 30% with clean heat-exchange coils',
      'Purifies indoor air quality by eradicating bacteria, mold, and dust build-up',
      'Extends the operating lifespan of expensive air conditioning compressors'
    ],
    whyChooseUs: [
      'Certified refrigeration technicians with modern digital manifold gauges',
      'Non-hazardous eco-friendly coil cleaning chemical formulas',
      'Same-day emergency response for server room cooling failures',
      'Transparent pricing with detailed performance checkup report'
    ],
    processSteps: [
      { step: '01', title: 'Thermal Diagnosis', description: 'Measuring intake and exhaust temperature delta and electrical amp draw.' },
      { step: '02', title: 'Deep Wash', description: 'Dismantling indoor blower, washing condenser and evaporator with jet pump.' },
      { step: '03', title: 'Gas & Pressure Check', description: 'Inspecting flare nut joints, measuring suction pressure, top-up if needed.' },
      { step: '04', title: 'Performance Test', description: 'Running full load test to ensure rapid cooling and zero water leakage.' }
    ],
    relatedServices: ['computer-sales-service', 'networking-solutions']
  },
  {
    id: 'web-development',
    slug: 'web-development',
    title: 'Web & Software Development',
    shortDescription: 'Custom business websites, web applications & software.',
    fullDescription: 'We build fast, secure, mobile-friendly websites and full-stack web applications for businesses. From corporate brand showcases and MERN stack custom portals to full-scale e-commerce stores with payment gateway integrations, we turn ideas into revenue-driving digital solutions.',
    icon: 'Code',
    image: DEFAULT_IMAGE,
    category: 'Software Solutions',
    features: [
      'Modern React, Next.js, Node.js & MERN Stack Engineering',
      'Mobile-First Responsive Web Design for all screen sizes',
      'E-commerce Solutions with bKash, Nagad, Card & COD Gateways',
      'SEO Optimization, Ultra-Fast Load Speeds & Core Web Vitals',
      'Secure Admin Dashboards, Role-Based Access & Database Schemas',
      'Domain, Cloud Hosting Setup, SSL Certificates & Ongoing Maintenance'
    ],
    benefits: [
      'Expands business reach 24/7 across Bangladesh and international markets',
      'Generates direct online orders, inquiries, and customer leads',
      'Establishes high brand credibility against competitors',
      'Automates tedious manual booking, order management, and billing tasks'
    ],
    whyChooseUs: [
      'Clean, maintainable source code following modern engineering standards',
      'Focus on real conversions and delightful user experience (UI/UX)',
      'Free 3-month post-launch bug fixing and tech support',
      'Flexible backend architectures ready for future business scaling'
    ],
    processSteps: [
      { step: '01', title: 'Discovery & Wireframing', description: 'Analyzing your business model and crafting intuitive UI mockups.' },
      { step: '02', title: 'Agile Development', description: 'Building the frontend and backend with modern reusable code.' },
      { step: '03', title: 'QA & Cross-Browser Testing', description: 'Rigorous testing on mobile, tablet, and desktop browsers.' },
      { step: '04', title: 'Cloud Deployment', description: 'Deploying to high-performance servers with SSL and SEO tracking.' }
    ],
    relatedServices: ['networking-solutions', 'computer-sales-service']
  },
  {
    id: 'printer-solutions',
    slug: 'printer-solutions',
    title: 'Printer Solutions',
    shortDescription: 'Laser printer sales, genuine toner supplies & repair.',
    fullDescription: 'From high-speed office laser printers and all-in-one multifunction copiers to thermal POS receipt printers, EXPERT IT SOLUTIONS supplies, fixes, and maintains printing hardware. We also supply genuine toner cartridges and offer annual cartridge refilling services.',
    icon: 'Printer',
    image: DEFAULT_IMAGE,
    category: 'Hardware Solutions',
    features: [
      'Authorized Sales of HP, Canon, Epson & Brother Printers',
      'Network & Wi-Fi Printer Sharing across all Office Workstations',
      'Genuine Original & Premium Compatible Toner / Ink Cartridges',
      'Paper Jam Repair, Roller Replacement & Fuser Unit Overhaul',
      'Thermal POS Barcode & Receipt Printer Setup for Retailers',
      'Monthly Printer Cartridge Management & On-Site Fleet Support'
    ],
    benefits: [
      'Prevents frustrating paper jams and unreadable faded prints',
      'Enables every staff member to print effortlessly over Wi-Fi without cables',
      'Reduces office printing costs with high-yield premium toner supplies',
      'Prompt on-site replacement printer provided during major servicing'
    ],
    whyChooseUs: [
      'Comprehensive inventory of spare parts (fusers, rollers, gears, logic boards)',
      'Genuine 100% original ink and toners guaranteed with manufacturer seal',
      'Experienced printer technicians trained on laser and ink-tank engines',
      'Affordable repair rates with honest diagnostic assessments'
    ],
    processSteps: [
      { step: '01', title: 'Print Volume Assessment', description: 'Recommending ideal ink-tank vs. monochrome laser models for your page loads.' },
      { step: '02', title: 'Installation & Network Share', description: 'Configuring network IP, printer drivers, and scan-to-folder on all PCs.' },
      { step: '03', title: 'Toner Stocking', description: 'Setting up recurring genuine toner replenishment at wholesale corporate rates.' },
      { step: '04', title: 'Regular Servicing', description: 'Routine cleaning of optical mirrors, rollers, and paper paths.' }
    ],
    relatedServices: ['computer-sales-service', 'networking-solutions']
  },
  {
    id: 'computer-sales-service',
    slug: 'computer-sales-service',
    title: 'Computer Sales & Service',
    shortDescription: 'Custom desktop PC builds, laptop repair & speed upgrades.',
    fullDescription: 'Visit our physical showroom for genuine branded desktop computers, custom gaming & workstation rigs, laptops, and original parts. We also operate a certified hardware repair lab providing chip-level motherboard fixes, SSD upgrades, thermal repasting, and OS installations.',
    icon: 'Monitor',
    image: DEFAULT_IMAGE,
    category: 'Hardware Solutions',
    features: [
      'Custom Desktop PC Builds for Office, Graphic Design, Video & Gaming',
      'Brand New Laptops & Original Accessories with Official Warranty',
      'SSD Speed Boost, RAM Upgrades & Data Migration from Old HDDs',
      'Chip-Level Motherboard, Power Supply & Display Repair',
      'Professional Liquid Metal & Thermal Paste Application (Arctic MX-4)',
      'Windows / Linux OS Installation, Driver Optimization & Virus Removal'
    ],
    benefits: [
      'Breathes lightning-fast new life into sluggish office computers',
      'Custom-tailored PC specs matching your exact workflow and budget',
      'Safe recovery of critical business files, accounts, and databases',
      'Convenient physical showroom in Dhaka with instant in-person testing'
    ],
    whyChooseUs: [
      'Physical showroom with physical demo units you can test before buying',
      '100% genuine products with official brand warranty cards',
      'Transparent diagnostic process in front of the customer',
      'Over 10,000+ satisfied desktop and laptop customers served'
    ],
    processSteps: [
      { step: '01', title: 'Requirement / Diagnostic Check', description: 'Listening to your requirements or testing PC hardware components.' },
      { step: '02', title: 'Quotation & Part Selection', description: 'Offering best-value balanced component combinations with price breakdown.' },
      { step: '03', title: 'Assembly / Precision Repair', description: 'Neat cable management, thermal pasting, and rigorous benchmark testing.' },
      { step: '04', title: 'Quality Assurance & Delivery', description: 'Stress-testing, warranty seal application, and customer walkthrough.' }
    ],
    relatedServices: ['networking-solutions', 'printer-solutions']
  }
];
