'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

// Star component
function Star({ x, y, size, opacity, duration }: { x: number, y: number, size: number, opacity: number, duration: string }) {
  return (
    <div style={{
      position: 'absolute',
      left: `${x}%`, top: `${y}%`,
      width: size, height: size,
      borderRadius: '50%',
      background: '#fff',
      opacity,
      animation: `twinkle ${duration} infinite ease-in-out`,
      pointerEvents: 'none',
    }} />
  )
}

// Nebula glow
function Nebula({ x, y, color, size = 600, opacity = 0.1 }: { x: number, y: number, color: string, size?: number, opacity?: number }) {
  const hex = Math.round(opacity * 255).toString(16).padStart(2, '0')
  return (
    <div style={{
      position: 'absolute',
      left: `${x}%`, top: `${y}%`,
      width: size, height: size,
      transform: 'translate(-50%, -50%)',
      background: `radial-gradient(circle, ${color}${hex} 0%, transparent 70%)`,
      pointerEvents: 'none',
      animation: 'nebulaPulse 8s infinite ease-in-out',
    }} />
  )
}

// Floating tool node
function ToolNode({ x, y, color, label, size = 10, delay = '0s' }: { x: number, y: number, color: string, label: string, size?: number, delay?: string }) {
  return (
    <div style={{
      position: 'absolute', left: `${x}%`, top: `${y}%`,
      transform: 'translate(-50%, -50%)',
      animation: `float 6s ${delay} infinite ease-in-out`,
      pointerEvents: 'none',
      zIndex: 1,
    }}>
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}88`,
        margin: 'auto',
      }} />
      <div style={{
        marginTop: 6, fontSize: 9, color: '#334155',
        textAlign: 'center', whiteSpace: 'nowrap', fontWeight: 600,
      }}>{label}</div>
    </div>
  )
}

// Typewriter hook
function useTypewriter(words: string[], typingSpeed = 55, deletingSpeed = 25, pauseMs = 1800) {
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')
  const idx = useRef(0)

  useEffect(() => {
    const target = words[idx.current]
    let timer: NodeJS.Timeout

    if (phase === 'typing') {
      if (text.length < target.length) {
        timer = setTimeout(() => setText(target.slice(0, text.length + 1)), typingSpeed)
      } else {
        timer = setTimeout(() => setPhase('pausing'), pauseMs)
      }
    } else if (phase === 'pausing') {
      timer = setTimeout(() => setPhase('deleting'), 400)
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), deletingSpeed)
      } else {
        idx.current = (idx.current + 1) % words.length
        setPhase('typing')
      }
    }
    return () => clearTimeout(timer)
  }, [text, phase, words, typingSpeed, deletingSpeed, pauseMs])

  return text
}

// Generate stars once
const STARS = Array.from({ length: 220 }, (_, i) => ({
  id: i,
  x: (i * 37.3) % 100,
  y: (i * 61.7) % 100,
  size: (i % 18) * 0.1 + 0.3,
  opacity: (i % 7) * 0.1 + 0.2,
  duration: `${(i % 8) + 4}s`,
}))

const TOOL_NODES = [
  { x: 12, y: 22, c: '#06b6d4', l: 'ChatGPT', s: 9, d: '0s' },
  { x: 87, y: 28, c: '#8b5cf6', l: 'Midjourney', s: 8, d: '1s' },
  { x: 8,  y: 68, c: '#22c55e', l: 'ElevenLabs', s: 10, d: '2s' },
  { x: 90, y: 62, c: '#f59e0b', l: 'Cursor', s: 7, d: '0.5s' },
  { x: 22, y: 88, c: '#ec4899', l: 'Runway', s: 8, d: '1.5s' },
  { x: 78, y: 82, c: '#3b82f6', l: 'Zapier', s: 9, d: '2.5s' },
  { x: 48, y: 90, c: '#06b6d4', l: 'Perplexity', s: 6, d: '0.8s' },
  { x: 5,  y: 40, c: '#7c3aed', l: 'Claude', s: 7, d: '1.2s' },
  { x: 95, y: 45, c: '#10b981', l: 'Make', s: 6, d: '0.3s' },
]

const WORKFLOW = [
  { tool: 'Perplexity', role: 'Research', color: '#06b6d4' },
  { tool: 'Claude', role: 'Script', color: '#8b5cf6' },
  { tool: 'ElevenLabs', role: 'Voice', color: '#22c55e' },
  { tool: 'Runway', role: 'Video', color: '#ec4899' },
  { tool: 'Descript', role: 'Edit', color: '#f59e0b' },
]

const METRICS = [
  { n: '10,000+', l: 'AI Tools' },
  { n: '300+', l: 'Categories' },
  { n: '1M+', l: 'SEO Pages' },
  { n: 'Daily', l: 'Discovery Engine' },
]

const STACK_LAYERS = [
  { layer: 'Interface', desc: 'Web App · Dashboard · API', color: '#06b6d4' },
  { layer: 'Intelligence', desc: 'Stack Generator · Recommendations', color: '#8b5cf6' },
  { layer: 'Agents', desc: 'Architect · Research · Builder', color: '#3b82f6' },
  { layer: 'Discovery', desc: 'GitHub · ProductHunt · HuggingFace', color: '#22c55e' },
  { layer: 'Data Core', desc: 'Knowledge Graph · PostgreSQL', color: '#f59e0b' },
  { layer: 'Distribution', desc: 'Social · Newsletter · API', color: '#ec4899' },
]

export default function HomePage() {
  const [mouseX, setMouseX] = useState(0.5)
  const [mouseY, setMouseY] = useState(0.5)
  const [scrollY, setScrollY] = useState(0)
  const typed = useTypewriter([
    'Build a YouTube Channel',
    'Launch an AI SaaS',
    'Automate your Marketing',
    'Create a Podcast',
    'Scale your Startup',
  ])

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      setMouseX(e.clientX / window.innerWidth)
      setMouseY(e.clientY / window.innerHeight)
    }
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const parallaxX = (mouseX - 0.5) * 30
  const parallaxY = (mouseY - 0.5) * 20

  return (
    <div style={{ background: '#0B0B0C', minHeight: '100vh', color: '#fff', overflowX: 'hidden' }}>
      <Navbar />

      {/* Starfield — fixed background */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {STARS.map(s => (
          <Star key={s.id} x={s.x} y={s.y} size={s.size} opacity={s.opacity} duration={s.duration} />
        ))}
      </div>

      {/* ── SCENE 1: HERO ──────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '120px 20px 80px',
      }}>
        {/* Nebulae */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <Nebula x={50} y={42} color="#06b6d4" size={900} opacity={0.10} />
          <Nebula x={18} y={70} color="#8b5cf6" size={550} opacity={0.07} />
          <Nebula x={82} y={20} color="#3b82f6" size={450} opacity={0.06} />
        </div>

        {/* Floating tool nodes */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          {TOOL_NODES.map((n, i) => (
            <ToolNode key={i} x={n.x} y={n.y} color={n.c} label={n.l} size={n.s} delay={n.d} />
          ))}
        </div>

        {/* Core orb with parallax */}
        <div style={{
          position: 'absolute', left: '50%', top: '44%',
          width: 200, height: 200,
          transform: `translate(calc(-50% + ${parallaxX * 0.3}px), calc(-50% + ${parallaxY * 0.3}px))`,
          transition: 'transform 0.1s ease',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #06b6d422 0%, #3b82f610 40%, transparent 70%)',
          animation: 'corePulse 4s infinite ease-in-out',
          zIndex: 1,
        }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '1px solid #06b6d422',
          }} />
          <div style={{
            position: 'absolute', inset: 20, borderRadius: '50%',
            border: '1px solid #3b82f611',
          }} />
        </div>

        {/* Hero text */}
        <div style={{
          textAlign: 'center', position: 'relative', zIndex: 2,
          transform: `translateY(${scrollY * -0.12}px)`,
          maxWidth: 800,
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-block',
            background: '#06b6d410', color: '#06b6d4',
            border: '1px solid #06b6d422',
            borderRadius: 20, padding: '4px 16px',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            marginBottom: 32,
            animation: 'fadeIn 1s ease both',
          }}>
            AI WORKFLOW INFRASTRUCTURE · VERSION 20.0
          </div>

          {/* Main headline */}
          <div className="hero-headline" style={{ marginBottom: 24, animation: 'fadeUp 0.8s 0.2s ease both' }}>
            Navigate the<br />AI Universe.
          </div>

          {/* Typewriter */}
          <div style={{
            fontSize: 16, color: '#475569', marginBottom: 8, height: 28,
            animation: 'fadeUp 0.8s 0.4s ease both',
          }}>
            Your goal:{' '}
            <span style={{ color: '#06b6d4', fontWeight: 700 }}>{typed}</span>
            <span style={{ color: '#06b6d4', animation: 'twinkle 0.8s infinite' }}>|</span>
          </div>

          <p style={{
            fontSize: 15, color: '#334155', maxWidth: 440,
            margin: '16px auto 48px', lineHeight: 1.8,
            animation: 'fadeUp 0.8s 0.5s ease both',
          }}>
            Google indexed the web.<br />
            <em style={{ color: '#1e3a5f' }}>Atlas indexes intelligence.</em>
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap',
            animation: 'fadeUp 0.8s 0.6s ease both',
          }}>
            <Link href="/tools" style={{
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              border: 'none', color: '#fff', borderRadius: 10,
              padding: '14px 32px', fontWeight: 800, fontSize: 14,
              textDecoration: 'none', boxShadow: '0 0 40px #06b6d430',
              letterSpacing: 0.3, display: 'inline-block',
              transition: 'box-shadow 0.3s ease',
            }}>
              Explore Atlas →
            </Link>
            <Link href="/generate" style={{
              background: 'transparent',
              border: '1px solid #1E1F23', color: '#8F8F93',
              borderRadius: 10, padding: '14px 32px',
              fontWeight: 700, fontSize: 14, textDecoration: 'none',
              display: 'inline-block',
              transition: 'color 0.3s ease, border-color 0.3s ease',
            }}>
              Generate Stack
            </Link>
          </div>

          {/* Scroll indicator */}
          <div style={{
            marginTop: 64, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 6, opacity: 0.4,
          }}>
            <div style={{ fontSize: 10, color: '#334155', letterSpacing: 2 }}>SCROLL</div>
            <div style={{
              width: 1, height: 40,
              background: 'linear-gradient(#06b6d4, transparent)',
              animation: 'floatY 2s infinite ease-in-out',
            }} />
          </div>
        </div>
      </section>

      {/* ── SCENE 2: PROBLEM ──────────────────────────────────────── */}
      <section style={{
        minHeight: '80vh', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '120px 20px',
      }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <Nebula x={80} y={50} color="#ef4444" size={500} opacity={0.06} />
        </div>
        <div style={{ textAlign: 'center', maxWidth: 700, position: 'relative', zIndex: 2 }}>
          <div className="label-tag" style={{ marginBottom: 24, color: '#ef444488' }}>THE PROBLEM</div>
          <div className="section-headline" style={{
            background: 'linear-gradient(135deg, #f8fafc, #ef4444)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: 24,
          }}>
            50,000+ AI tools.<br />Nobody knows<br />which ones work together.
          </div>
          <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.8, marginBottom: 40 }}>
            Developers waste hours choosing between ChatGPT, Claude, Gemini,<br />
            Midjourney, Runway, ElevenLabs...
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
            {['ChatGPT?', 'Claude?', 'Gemini?', 'Midjourney?', 'Runway?', '...'].map((t, i) => (
              <div key={t} style={{
                background: '#111214', border: '1px solid #1E1F23',
                borderRadius: 8, padding: '6px 14px',
                fontSize: 12, color: '#475569',
                animation: `floatY ${3 + i * 0.4}s ${i * 0.2}s infinite ease-in-out`,
              }}>{t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCENE 3: SOLUTION ─────────────────────────────────────── */}
      <section style={{
        minHeight: '90vh', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '120px 20px',
      }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <Nebula x={50} y={50} color="#06b6d4" size={700} opacity={0.09} />
        </div>
        <div style={{ textAlign: 'center', maxWidth: 800, position: 'relative', zIndex: 2 }}>
          <div className="label-tag" style={{ marginBottom: 24 }}>THE SOLUTION</div>
          <div className="section-headline" style={{
            background: 'linear-gradient(135deg, #f8fafc 30%, #06b6d4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: 48,
          }}>
            You describe the goal.<br />ATLAS builds the system.
          </div>

          {/* Workflow demo card */}
          <div style={{
            background: '#0f172a', border: '1px solid #1E1F23',
            borderRadius: 16, padding: '24px 28px',
            maxWidth: 520, margin: '0 auto',
            textAlign: 'left',
          }}>
            <div style={{ fontSize: 11, color: '#334155', fontWeight: 700, marginBottom: 10 }}>GOAL</div>
            <div style={{ fontSize: 16, color: '#f1f5f9', fontWeight: 700, marginBottom: 20 }}>
              &ldquo;I want to automate YouTube videos&rdquo;
            </div>
            <div style={{ borderTop: '1px solid #1E1F23', paddingTop: 16 }}>
              <div style={{ fontSize: 10, color: '#334155', fontWeight: 700, marginBottom: 12 }}>ATLAS GENERATES</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {WORKFLOW.map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%',
                      background: `${s.color}22`, border: `1px solid ${s.color}44`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 9, fontWeight: 800, color: s.color, flexShrink: 0,
                    }}>{i + 1}</div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: s.color, minWidth: 90 }}>{s.tool}</span>
                    <span style={{ fontSize: 12, color: '#475569' }}>→ {s.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCENE 4: METRICS ──────────────────────────────────────── */}
      <section style={{
        minHeight: '50vh', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '80px 20px',
      }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <Nebula x={30} y={50} color="#8b5cf6" size={500} opacity={0.06} />
          <Nebula x={70} y={50} color="#06b6d4" size={400} opacity={0.05} />
        </div>
        <div style={{
          display: 'flex', gap: 0,
          background: '#111214', border: '1px solid #1E1F23',
          borderRadius: 20, overflow: 'hidden',
          maxWidth: 640, width: '100%',
          position: 'relative', zIndex: 2,
          flexWrap: 'wrap',
        }}>
          {METRICS.map((m, i) => (
            <div key={m.l} style={{
              flex: 1, minWidth: 130, padding: '36px 20px',
              textAlign: 'center',
              borderRight: i < METRICS.length - 1 ? '1px solid #1E1F23' : 'none',
            }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: '#06b6d4' }}>{m.n}</div>
              <div style={{ fontSize: 11, color: '#334155', marginTop: 4 }}>{m.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SCENE 5: SYSTEM ARCHITECTURE ─────────────────────────── */}
      <section style={{
        minHeight: '80vh', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '120px 20px',
      }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <Nebula x={50} y={50} color="#3b82f6" size={800} opacity={0.07} />
        </div>
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, maxWidth: 900, width: '100%' }}>
          <div className="label-tag" style={{ marginBottom: 24 }}>SYSTEM ARCHITECTURE</div>
          <div className="section-headline" style={{
            background: 'linear-gradient(135deg, #f8fafc, #3b82f6)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: 56,
          }}>The Intelligence Stack</div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 10,
          }}>
            {STACK_LAYERS.map((l, i) => (
              <div key={l.layer} style={{
                background: `${l.color}08`,
                border: `1px solid ${l.color}22`,
                borderRadius: 12, padding: '20px 16px',
                textAlign: 'center',
                animation: `fadeUp 0.5s ${i * 0.08}s both`,
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: l.color, marginBottom: 8 }}>{l.layer}</div>
                <div style={{ fontSize: 10, color: '#334155', lineHeight: 1.6 }}>{l.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCENE 6: NETWORK EFFECT ──────────────────────────────── */}
      <section style={{
        minHeight: '70vh', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '120px 20px',
      }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <Nebula x={50} y={50} color="#22c55e" size={600} opacity={0.07} />
        </div>
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, maxWidth: 640 }}>
          <div className="label-tag" style={{ marginBottom: 24, color: '#22c55e' }}>NETWORK EFFECT</div>
          <div className="section-headline" style={{
            background: 'linear-gradient(135deg, #f8fafc, #22c55e)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: 48,
          }}>
            More tools →<br />Better graph →<br />Stronger ATLAS
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
            {['Discover', 'Graph', 'Recommend', 'Generate', 'Share', 'Repeat'].map((s, i, arr) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  background: '#111214', border: '1px solid #22c55e22',
                  borderRadius: 8, padding: '8px 16px',
                  fontSize: 12, fontWeight: 700, color: '#22c55e',
                  animation: `floatY ${3 + i * 0.3}s ${i * 0.15}s infinite ease-in-out`,
                }}>{s}</div>
                {i < arr.length - 1 && <span style={{ color: '#1e3a5f', fontSize: 14 }}>→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCENE 7: CTA ──────────────────────────────────────────── */}
      <section style={{
        minHeight: '80vh', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '120px 20px',
      }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <Nebula x={50} y={50} color="#06b6d4" size={1000} opacity={0.12} />
        </div>
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          {/* Atlas logo orb */}
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, fontWeight: 900, color: '#fff',
            margin: '0 auto 40px',
            boxShadow: '0 0 60px #06b6d444',
            animation: 'corePulse 3s infinite ease-in-out',
          }}>A</div>

          <div className="section-headline" style={{
            background: 'linear-gradient(135deg, #f8fafc 30%, #06b6d4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: 24,
            fontSize: 'clamp(36px, 5.5vw, 80px)',
          }}>
            Enter Atlas
          </div>

          <p style={{
            fontSize: 15, color: '#334155',
            margin: '0 auto 48px', maxWidth: 380, lineHeight: 1.8,
          }}>
            The AI Workflow Infrastructure Layer.<br />
            Build systems. Not just find tools.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/tools" style={{
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              border: 'none', color: '#fff', borderRadius: 10,
              padding: '16px 40px', fontWeight: 800, fontSize: 15,
              textDecoration: 'none', boxShadow: '0 0 50px #06b6d440',
              letterSpacing: 0.3, display: 'inline-block',
            }}>
              Launch Atlas →
            </Link>
            <Link href="/generate" style={{
              background: 'transparent', border: '1px solid #1E1F23',
              color: '#8F8F93', borderRadius: 10,
              padding: '16px 40px', fontWeight: 700, fontSize: 15,
              textDecoration: 'none', display: 'inline-block',
            }}>
              Generate Stack
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid #1E1F23', padding: '32px 20px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 900, color: '#8F8F93' }}>
            ATLAS OS · AIAstralis · 2026
          </div>
          <div style={{ fontSize: 11, color: '#334155' }}>
            Google indexed the web. Atlas indexes intelligence.
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {['Tools', 'Stacks', 'Categories', 'Generate'].map(l => (
              <Link key={l} href={`/${l.toLowerCase()}`} style={{ fontSize: 12, color: '#334155', textDecoration: 'none' }}>{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
