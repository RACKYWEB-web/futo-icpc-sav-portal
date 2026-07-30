export const stats = [
  { label: 'Vanguard Members', value: 1240, suffix: '+' },
  { label: 'Awareness Campaigns', value: 36 },
  { label: 'Academy Enrollments', value: 2870, suffix: '+' },
  { label: 'Campus Events', value: 58 },
]

export const courses = [
  {
    id: 'c1',
    title: 'Understanding Corruption',
    category: 'Foundations',
    description: 'What corruption is, how it is defined, and why it matters to student life and public trust.',
    lessons: [
      { id: 1, title: 'Defining corruption', duration: '6 min' },
      { id: 2, title: 'Petty vs. grand corruption', duration: '7 min' },
      { id: 3, title: 'Why it persists', duration: '5 min' },
    ],
    quiz: [
      { q: 'Corruption is best described as:', options: ['A victimless act', 'Abuse of entrusted power for private gain', 'A purely legal term with no social cost', 'An issue limited to government alone'], answer: 1 },
      { q: 'Petty corruption typically involves:', options: ['International treaties', 'Small-scale everyday abuse of power', 'Only large public contracts', 'Foreign exchange policy'], answer: 1 },
    ],
    passMark: 70,
  },
  {
    id: 'c2',
    title: 'Examination Malpractice',
    category: 'Academic Integrity',
    description: 'Recognizing exam malpractice, its long-term costs, and how to protect academic integrity.',
    lessons: [
      { id: 1, title: 'Forms of exam malpractice', duration: '5 min' },
      { id: 2, title: 'Consequences for students and institutions', duration: '6 min' },
    ],
    quiz: [
      { q: 'Examination malpractice primarily damages:', options: ['Only the individual student', 'The credibility of certificates and the institution', 'Nothing measurable', 'Only exam invigilators'], answer: 1 },
    ],
    passMark: 70,
  },
  {
    id: 'c3',
    title: 'Bribery and Extortion',
    category: 'Foundations',
    description: 'How bribery and extortion operate, and the difference between offering, soliciting and coercion.',
    lessons: [
      { id: 1, title: 'Bribery vs. extortion', duration: '6 min' },
      { id: 2, title: 'Recognizing solicitation', duration: '5 min' },
    ],
    quiz: [
      { q: 'Extortion differs from bribery because it involves:', options: ['Mutual willingness', 'Coercion or threat', 'No exchange of value', 'Only digital transactions'], answer: 1 },
    ],
    passMark: 70,
  },
  {
    id: 'c4',
    title: 'Ethical Leadership',
    category: 'Leadership',
    description: 'Practical principles for leading with integrity in student unions, clubs and future workplaces.',
    lessons: [
      { id: 1, title: 'What ethical leadership looks like', duration: '7 min' },
      { id: 2, title: 'Leading under pressure', duration: '6 min' },
    ],
    quiz: [
      { q: 'An ethical leader facing pressure to cut corners should:', options: ['Comply quietly', 'Seek transparent, accountable alternatives', 'Delegate the decision without oversight', 'Ignore the issue'], answer: 1 },
    ],
    passMark: 70,
  },
  {
    id: 'c5',
    title: 'Whistleblowing',
    category: 'Accountability',
    description: 'How responsible reporting works, protections that can apply, and how to report safely.',
    lessons: [
      { id: 1, title: 'Why whistleblowing matters', duration: '5 min' },
      { id: 2, title: 'Reporting responsibly', duration: '6 min' },
    ],
    quiz: [
      { q: 'A responsible whistleblower should aim to:', options: ['Report false information for attention', 'Report genuine concerns through appropriate channels', 'Publicize unverified claims widely first', 'Avoid any documentation'], answer: 1 },
    ],
    passMark: 70,
  },
  {
    id: 'c6',
    title: 'Digital Ethics',
    category: 'Modern Integrity',
    description: 'Academic honesty and integrity in an age of AI tools, online research and digital submissions.',
    lessons: [
      { id: 1, title: 'Plagiarism in the digital age', duration: '6 min' },
      { id: 2, title: 'Using AI tools responsibly', duration: '6 min' },
    ],
    quiz: [
      { q: 'Responsible use of digital tools in academic work means:', options: ['Hiding all sources used', 'Being transparent about tools and sources used', 'Submitting unreviewed AI output as original work', 'Avoiding disclosure to markers'], answer: 1 },
    ],
    passMark: 70,
  },
]

export const campaigns = [
  {
    id: 'camp-1',
    title: 'Say No to Bribery',
    description: 'A campus-wide awareness drive encouraging students and staff to reject bribery in everyday transactions.',
    objectives: ['Raise awareness of bribery\u2019s cost', 'Distribute integrity materials across faculties', 'Collect pledge signatures'],
    date: 'Ongoing',
    location: 'Main Campus',
    participants: 412,
    image: 'https://images.unsplash.com/photo-1549057446-9f5c6ac91a04?w=900&q=80&auto=format&fit=crop',
  },
  {
    id: 'camp-2',
    title: 'Integrity Week',
    description: 'A week of talks, workshops and exhibitions on transparency, accountability and ethical leadership.',
    objectives: ['Host daily integrity talks', 'Run the Anti-Corruption Quiz finals', 'Unveil the Integrity Wall'],
    date: 'Sept 14–18',
    location: 'Convocation Square',
    participants: 680,
    image: 'https://images.unsplash.com/photo-1594750852563-5ed8e0421d40?w=900&q=80&auto=format&fit=crop',
  },
  {
    id: 'camp-3',
    title: 'Anti-Exam Malpractice Campaign',
    description: 'Targeted sensitization ahead of semester examinations, focused on academic integrity.',
    objectives: ['Faculty-level sensitization talks', 'Distribute academic integrity guides', 'Peer-to-peer integrity ambassadors'],
    date: 'Before exams, each semester',
    location: 'All Faculties',
    participants: 305,
    image: 'https://images.unsplash.com/photo-1632215861513-130b66fe97f4?w=900&q=80&auto=format&fit=crop',
  },
  {
    id: 'camp-4',
    title: 'Clean Campus Campaign',
    description: 'Connecting environmental responsibility with transparency in how campus resources are managed.',
    objectives: ['Community clean-up exercises', 'Awareness on resource accountability', 'Student volunteer drive'],
    date: 'Monthly',
    location: 'Hostels & Faculties',
    participants: 220,
    image: 'https://images.unsplash.com/photo-1546525848-3ce03ca516f6?w=900&q=80&auto=format&fit=crop',
  },
]

// Illustrative campus/community photography (free-license Unsplash photos, credited).
// These stand in for real chapter event photography — swap in your own before launch.
export const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1549057446-9f5c6ac91a04?w=1000&q=80&auto=format&fit=crop', caption: 'Students walking together on an awareness drive', credit: 'Eliott Reyna / Unsplash' },
  { url: 'https://images.unsplash.com/photo-1632215861513-130b66fe97f4?w=1000&q=80&auto=format&fit=crop', caption: 'Community engagement and sensitization', credit: 'Emmanuel Ikwuegbu / Unsplash' },
  { url: 'https://images.unsplash.com/photo-1594750852563-5ed8e0421d40?w=1000&q=80&auto=format&fit=crop', caption: 'Campus life at a Nigerian university', credit: 'Nqobile Vundla / Unsplash' },
  { url: 'https://images.unsplash.com/photo-1546525848-3ce03ca516f6?w=1000&q=80&auto=format&fit=crop', caption: 'A student on campus', credit: 'Mubarak Showole / Unsplash' },
]

export const events = [
  {
    id: 'ev-1',
    title: 'SAV Induction & Orientation',
    date: '2026-09-05',
    time: '10:00 AM',
    location: 'FUTO Auditorium',
    description: 'Orientation for newly registered Vanguard members covering mission, structure and expectations.',
    capacity: 500,
    registered: 340,
  },
  {
    id: 'ev-2',
    title: 'Ethical Leadership Workshop',
    date: '2026-09-20',
    time: '2:00 PM',
    location: 'School of Management Technology',
    description: 'A hands-on workshop on ethical decision-making for student leaders and club executives.',
    capacity: 150,
    registered: 98,
  },
  {
    id: 'ev-3',
    title: 'Corruption Awareness Walk',
    date: '2026-10-02',
    time: '7:00 AM',
    location: 'Campus Gate to Convocation Square',
    description: 'A peaceful awareness walk marking the close of Integrity Week.',
    capacity: 1000,
    registered: 512,
  },
  {
    id: 'ev-4',
    title: 'Anti-Corruption Quiz Finals',
    date: '2026-09-17',
    time: '4:00 PM',
    location: 'Senate Building Hall',
    description: 'Faculty teams compete in the annual anti-corruption knowledge quiz.',
    capacity: 300,
    registered: 210,
  },
]

export const sectorEffects = [
  { id: 'education', label: 'Education', note: 'Diverted resources can mean fewer functional laboratories, delayed scholarships and under-stocked libraries.' },
  { id: 'healthcare', label: 'Healthcare', note: 'Misused funds can reduce the availability of medicine, equipment and staffing in campus and public clinics.' },
  { id: 'infrastructure', label: 'Infrastructure', note: 'Inflated or abandoned contracts can leave roads, hostels and public buildings incomplete or substandard.' },
  { id: 'economy', label: 'Economy', note: 'Uncertainty and unfair advantage can discourage investment and raise the cost of doing business.' },
  { id: 'employment', label: 'Employment', note: 'Nepotism and favoritism can crowd out merit-based hiring and internship opportunities.' },
  { id: 'security', label: 'Security', note: 'Weakened institutions and misallocated resources can reduce the effectiveness of public safety services.' },
  { id: 'governance', label: 'Politics & Governance', note: 'Accountability mechanisms can be weakened, reducing public trust in democratic institutions.' },
  { id: 'youth', label: 'Youth', note: 'Normalized unethical shortcuts can discourage young people from believing merit is rewarded.' },
]

export const globalFacts = [
  'Transparency International publishes an annual Corruption Perceptions Index ranking countries by perceived public-sector corruption — see transparency.org for current data.',
  'The United Nations Convention against Corruption (UNCAC) is the main international legal framework against corruption, adopted in 2003.',
  'The World Bank has estimated that bribery alone costs the global economy over one trillion US dollars a year in direct payments — figures vary by methodology and year, so check worldbank.org for current estimates.',
  'October 9th is recognized by FUTO SAV as aligned with the spirit of the UN International Anti-Corruption Day observed globally on December 9th.',
]

export const faqs = [
  { q: 'What is FUTO ICPC/SAV?', a: 'FUTO ICPC/SAV is a student-led anti-corruption vanguard at the Federal University of Technology, Owerri, working in the spirit of ICPC\u2019s mandate but operating as a student initiative, not the ICPC itself.' },
  { q: 'Who can join?', a: 'Any registered FUTO student who supports the vanguard\u2019s mission of integrity and accountability can apply for membership.' },
  { q: 'Are reports confidential?', a: 'Reports can be submitted anonymously. Non-anonymous reports are only visible to authorized coordinators and are not shared publicly.' },
  { q: 'Do courses award certificates?', a: 'Yes — completing a course and passing its quiz issues a verifiable digital certificate with a unique certificate ID.' },
  { q: 'Is this an official ICPC platform?', a: 'No. FUTO ICPC/SAV is a student anti-corruption initiative inspired by ICPC\u2019s mission. It is not an official ICPC portal.' },
]

export const mythsFacts = [
  { myth: 'Small gifts to staff are harmless.', fact: 'Even small favors can create unfair advantage and normalize larger abuses over time.' },
  { myth: 'Reporting corruption changes nothing.', fact: 'Documented, credible reports feed institutional review processes and can trigger real accountability.' },
  { myth: 'Corruption only involves money.', fact: 'It also includes favoritism, abuse of office, and trading influence for non-financial favors.' },
  { myth: 'Only leaders are responsible for corruption.', fact: 'Everyday choices — from exams to small transactions — shape a culture of integrity or its absence.' },
]

export const resources = [
  { id: 'res-1', type: 'Guide', title: 'Academic Integrity Handbook', category: 'Education Integrity' },
  { id: 'res-2', type: 'Video', title: 'What Ethical Leadership Looks Like', category: 'Leadership' },
  { id: 'res-3', type: 'Infographic', title: 'Forms of Corruption, Explained', category: 'Foundations' },
  { id: 'res-4', type: 'Article', title: 'How Nepotism Undermines Merit', category: 'Employment' },
  { id: 'res-5', type: 'Document', title: 'Reporting Channels on Campus', category: 'Accountability' },
  { id: 'res-6', type: 'Video', title: 'Digital Ethics for Students', category: 'Modern Integrity' },
]

export const badgeCatalog = [
  { name: 'Integrity Champion', desc: 'Awarded for consistent participation across academy courses.' },
  { name: 'Anti-Corruption Advocate', desc: 'Awarded for active campaign participation.' },
  { name: 'Ethical Leader', desc: 'Awarded for completing the Ethical Leadership course.' },
  { name: 'Transparency Ambassador', desc: 'Awarded for submitting verified, constructive reports.' },
  { name: 'SAV Volunteer', desc: 'Awarded for logged volunteer hours at events.' },
  { name: 'Integrity Advocate', desc: 'Awarded for taking the Integrity Pledge.' },
]

export const pledgeCommitments = [
  'Reject bribery in all forms',
  'Reject examination malpractice',
  'Reject fraud and misuse of resources',
  'Respect and safeguard public resources',
  'Speak and act responsibly',
  'Promote accountability in my community',
  'Lead by example, on campus and beyond',
]
