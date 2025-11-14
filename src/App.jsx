import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Search, Moon, Sun, BookOpenCheck, GraduationCap, Library, PawPrint, Scale, History, PhoneCall, Globe, Brain, Bone, HeartPulse, Cat, Dog, Bird, Rabbit, Cow, Horse } from 'lucide-react'
import Spline from '@splinetool/react-spline'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

// ---------- Layout & Theme ----------
function useDarkMode() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])
  return { dark, setDark }
}

function Shell({ children }) {
  const { dark, setDark } = useDarkMode()
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!q) { setResults([]); return }
      const res = await fetch(`${API_BASE}/api/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setResults(data)
    }, 250)
    return () => clearTimeout(handler)
  }, [q])

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 to-emerald-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 text-slate-800 dark:text-slate-100 font-['Poppins','Inter',sans-serif]">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/50 border-b border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => nav('/')} className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-300">
            <PawPrint className="h-6 w-6" />
            <span>DVM Portal</span>
          </button>

          <nav className="hidden md:flex items-center gap-4 ml-6 text-sm">
            <Link to="/semesters" className="hover:text-emerald-600 flex items-center gap-1"><Library className="h-4 w-4"/>Library</Link>
            <Link to="/notes" className="hover:text-emerald-600 flex items-center gap-1"><BookOpenCheck className="h-4 w-4"/>Quick Notes</Link>
            <Link to="/history" className="hover:text-emerald-600 flex items-center gap-1"><History className="h-4 w-4"/>History</Link>
            <Link to="/welfare" className="hover:text-emerald-600 flex items-center gap-1"><Scale className="h-4 w-4"/>Animal Welfare</Link>
            <Link to="/models" className="hover:text-emerald-600 flex items-center gap-1"><Brain className="h-4 w-4"/>3D Models</Link>
            <Link to="/contact" className="hover:text-emerald-600 flex items-center gap-1"><PhoneCall className="h-4 w-4"/>Contact</Link>
          </nav>

          <div className="relative ml-auto w-full md:w-96">
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search books, notes, subjects..."
              className="w-full rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400"/>
            {q && results.length>0 && (
              <div className="absolute mt-2 w-full bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 max-h-96 overflow-auto">
                {results.map((r,i)=> (
                  <div key={i} className="px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/40 text-sm">
                    <div className="font-medium">{r.title}</div>
                    <div className="text-xs text-slate-500">{r.context} • S{r.semester} • {r.subject}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button onClick={()=>setDark(!dark)} className="ml-3 p-2 rounded-lg bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
            {dark? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
          </button>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-16 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-sm flex flex-col md:flex-row gap-2 justify-between">
          <p>© {new Date().getFullYear()} DVM Student Portal</p>
          <p className="text-slate-500">Made for veterinary students with a love for animals.</p>
        </div>
      </footer>
    </div>
  )
}

// ---------- Pages ----------
function Home() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-slate-800 dark:text-white">
              Your complete study companion for Veterinary Medicine
            </h1>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Explore semester-wise libraries, concise revision notes, interactive 3D anatomy, animal welfare laws, and more — all in one friendly, fast, and organized place.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/semesters" className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500">Browse Library</Link>
              <Link to="/models" className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-slate-700 hover:border-emerald-400">View 3D Models</Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <Stat value="10" label="Semesters"/>
              <Stat value="50+" label="Core Subjects"/>
              <Stat value="1000+" label="Study Aids"/>
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-emerald-100 to-sky-100 dark:from-slate-800 dark:to-slate-800 p-3 shadow-inner">
            <Spline scene="https://prod.spline.design/7d0xv6b3rUoH5kN9/scene.splinecode" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2"><GraduationCap className="h-6 w-6 text-emerald-600"/> Semester Tracks</h2>
        <SemesterGrid/>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2"><PawPrint className="h-6 w-6 text-emerald-600"/> Animal Categories</h2>
        <AnimalIcons/>
      </section>
    </div>
  )
}

function Stat({ value, label }){
  return (
    <div className="bg-white/70 dark:bg-slate-800/70 rounded-xl p-4 shadow border border-slate-200 dark:border-slate-700">
      <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">{value}</div>
      <div className="text-slate-600 dark:text-slate-300">{label}</div>
    </div>
  )
}

function SemesterGrid(){
  const items = new Array(10).fill(0).map((_,i)=> i+1)
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {items.map(n => (
        <Link key={n} to={`/semesters/${n}`} className="group rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all">
          <div className="text-sm text-slate-500">Semester</div>
          <div className="text-2xl font-semibold group-hover:text-emerald-600">{n}</div>
          <div className="mt-2 text-xs text-slate-500">Books, notes, diagrams, MCQs</div>
        </Link>
      ))}
    </div>
  )
}

function AnimalIcons(){
  const icons = [
    {label:'Cattle', Icon:Cow},
    {label:'Dog', Icon:Dog},
    {label:'Horse', Icon:Horse},
    {label:'Cat', Icon:Cat},
    {label:'Poultry', Icon:Bird},
    {label:'Rabbit', Icon:Rabbit},
  ]
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
      {icons.map(({label, Icon})=> (
        <div key={label} className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 text-center hover:border-emerald-300">
          <Icon className="h-7 w-7 mx-auto text-emerald-600"/>
          <div className="text-sm mt-2">{label}</div>
        </div>
      ))}
    </div>
  )
}

function Semesters(){
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(1)

  useEffect(()=>{ load() },[])

  async function load(){
    const res = await fetch(`${API_BASE}/api/semesters`)
    const j = await res.json()
    setData(j)
    setLoading(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6 flex items-center gap-2"><Library className="h-7 w-7 text-emerald-600"/> Semester Library</h1>
      {loading ? <Loader/> : (
        <div className="grid md:grid-cols-[240px,1fr] gap-6">
          <div className="space-y-2">
            {data.map(s=> (
              <button key={s.number} onClick={()=>setActive(s.number)} className={`w-full text-left px-4 py-2 rounded-lg border ${active===s.number? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'}`}>
                Semester {s.number}
              </button>
            ))}
          </div>
          <div>
            {data.filter(s=>s.number===active).map(s=> (
              <div key={s.number} className="space-y-6">
                {s.subjects.map((sub, idx)=> (
                  <div key={idx} className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-medium">{sub.name}</div>
                    </div>
                    <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {sub.resources.map((r,i)=> (
                        <div key={i} className="rounded-lg border border-slate-200 dark:border-slate-700 p-3 hover:border-emerald-300">
                          <div className="text-sm font-medium">{labelForType(r.type)}</div>
                          <div className="text-slate-600 dark:text-slate-300 text-sm">{r.title}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function labelForType(t){
  const map={pdf:'PDF Book', notes:'Handwritten Notes', key_points:'Key Points', mcqs:'Practice MCQs', short_qs:'Short Questions', long_qs:'Long Questions', past_papers:'Past Papers', manual:'Practical Manual', diagrams:'Diagrams'}
  return map[t]||t
}

function SemesterDetail(){
  const [data,setData]=useState(null)
  const id = location.pathname.split('/').pop()
  useEffect(()=>{(async()=>{const r=await fetch(`${API_BASE}/api/semesters/${id}`); setData(await r.json())})()},[id])
  if(!data) return <Loader/>
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">Semester {data.number}</h1>
      {data.subjects.map((sub,idx)=> (
        <div key={idx} className="mb-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4">
          <div className="text-xl font-medium mb-2">{sub.name}</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sub.resources.map((r,i)=> (
              <div key={i} className="rounded-lg border border-slate-200 dark:border-slate-700 p-3">
                <div className="text-sm font-medium">{labelForType(r.type)}</div>
                <div className="text-slate-600 dark:text-slate-300 text-sm">{r.title}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function Notes(){
  const [notes,setNotes]=useState([])
  useEffect(()=>{(async()=>{const r=await fetch(`${API_BASE}/api/subjects/quick-notes`); setNotes(await r.json())})()},[])
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6 flex items-center gap-2"><BookOpenCheck className="h-7 w-7 text-emerald-600"/> Subject-wise Quick Notes</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {notes.map((n,i)=> (
          <div key={i} className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4">
            <div className="text-xl font-medium mb-2">{n.subject}</div>
            <ul className="list-disc pl-5 text-slate-600 dark:text-slate-300">
              {n.bullets.map((b,j)=> <li key={j}>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function HistoryPage(){
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6 flex items-center gap-2"><History className="h-7 w-7 text-emerald-600"/> History of Veterinary Medicine</h1>
      <p className="text-slate-700 dark:text-slate-300">From ancient Mesopotamian healers to modern One Health initiatives, veterinary medicine has evolved through centuries...</p>
      <div className="mt-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
        <Spline scene="https://prod.spline.design/0t2dS9q3Yg0y9d8Y/scene.splinecode" />
      </div>
      <ul className="mt-6 list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
        <li>Origins in ancient civilizations</li>
        <li>Key milestones in animal health</li>
        <li>Evolution of veterinary education worldwide</li>
        <li>Veterinary progress in Pakistan</li>
      </ul>
    </div>
  )
}

function WelfarePage(){
  const items = [
    {title:'Pakistan PCA Act', desc:'Key provisions of the Prevention of Cruelty to Animals Act.'},
    {title:'Import/Export Rules', desc:'Health certificates, quarantine, transport standards.'},
    {title:'Slaughterhouse Regulations', desc:'Humane handling and Halal compliance.'},
    {title:'OIE Standards', desc:'International health codes and welfare guidelines.'},
    {title:'Basic Rights of Animals', desc:'Five freedoms: from hunger, discomfort, pain, fear, and to express normal behavior.'},
    {title:'Veterinary Code of Ethics', desc:'Professional conduct, consent, and reporting obligations.'},
  ]
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6 flex items-center gap-2"><Scale className="h-7 w-7 text-emerald-600"/> Animal Welfare Laws</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((it,i)=> (
          <div key={i} className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4">
            <div className="font-medium">{it.title}</div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{it.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Models(){
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-semibold mb-2 flex items-center gap-2"><Brain className="h-7 w-7 text-emerald-600"/> Interactive 3D Animations</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <ModelCard title="Heart Anatomy 3D" scene="https://prod.spline.design/2G2aY0r6I1i2jKfA/scene.splinecode" Icon={HeartPulse} />
        <ModelCard title="Ruminant Digestive System" scene="https://prod.spline.design/pAPqg5qkzJH3m5eJ/scene.splinecode" Icon={Bone} />
        <ModelCard title="Injection Sites" scene="https://prod.spline.design/2s9H6m5uY7Lw0W2N/scene.splinecode" Icon={SyringeIcon} />
        <ModelCard title="Gait Cycle" scene="https://prod.spline.design/0b9M8Yx7m1n2o3P4/scene.splinecode" Icon={Horse} />
      </div>
      <p className="text-sm text-slate-500">Note: 3D scenes are lightweight embeds for smooth performance.</p>
    </div>
  )
}

function SyringeIcon(props){
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props} className={`h-6 w-6 ${props.className||''}`}><path strokeWidth="2" d="M20 14l-6-6M3 21l6-6m0 0l7-7a2 2 0 112 2l-7 7m-2-2L8 8m-3 3l3 3"/></svg>
}

function ModelCard({ title, scene, Icon }){
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-emerald-50/50 dark:from-slate-900 dark:to-slate-900">
      <div className="h-64">
        <Spline scene={scene} />
      </div>
      <div className="p-4 flex items-center gap-2">
        <Icon className="h-6 w-6 text-emerald-600"/>
        <div className="font-medium">{title}</div>
      </div>
    </div>
  )
}

function Contact(){
  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6 flex items-center gap-2"><PhoneCall className="h-7 w-7 text-emerald-600"/> Contact</h1>
      <form className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3">
        <input placeholder="Your name" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"/>
        <input placeholder="Email" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"/>
        <textarea rows={4} placeholder="Message" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"/>
        <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500">Send</button>
      </form>
    </div>
  )
}

function Loader(){
  return <div className="flex items-center justify-center py-16"><div className="h-5 w-5 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin"/></div>
}

// ---------- Router Wrapper ----------
function App(){
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/semesters" element={<Semesters/>} />
          <Route path="/semesters/:id" element={<SemesterDetail/>} />
          <Route path="/notes" element={<Notes/>} />
          <Route path="/history" element={<HistoryPage/>} />
          <Route path="/welfare" element={<WelfarePage/>} />
          <Route path="/models" element={<Models/>} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
      </Shell>
    </BrowserRouter>
  )
}

export default App
