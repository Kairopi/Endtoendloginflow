import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePip, Note } from '../../state/PipStore';
import { TextNoteCapture } from '../capture/TextNoteCapture';
import { StoryView } from './StoryView';

function ymd(ts: number) {
  return new Date(ts).toISOString().slice(0, 10);
}

export function HealthTimeline() {
  const { state } = usePip();
  const [composer, setComposer] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [storyPattern, setStoryPattern] = useState<{ tag: string; notes: Note[] } | null>(null);
  const [highlightedTag, setHighlightedTag] = useState<string | null>(null);
  const [selected, setSelected] = useState<{ start: string; end: string } | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const next = el.scrollTop > 80;
      setCollapsed((c) => (c === next ? c : next));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const expandHeatmap = () => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });

  const profileNotes = useMemo(
    () => state.notes.filter((n) => n.profileId === state.activeProfileId).sort((a, b) => b.createdAt - a.createdAt),
    [state.notes, state.activeProfileId],
  );

  const countsByDay = useMemo(() => {
    const m = new Map<string, number>();
    profileNotes.forEach((n) => {
      const k = ymd(n.createdAt);
      m.set(k, (m.get(k) ?? 0) + 1);
    });
    return m;
  }, [profileNotes]);

  const streak = useMemo(() => {
    let count = 0;
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    // allow today to be empty; count back from yesterday if today is empty
    if (!countsByDay.has(ymd(d.getTime()))) d.setDate(d.getDate() - 1);
    while (countsByDay.has(ymd(d.getTime()))) {
      count++;
      d.setDate(d.getDate() - 1);
    }
    return count;
  }, [countsByDay]);

  const patterns = useMemo(() => {
    const skip = new Set(['voice', 'text', 'photo', 'check-in', 'morning', 'afternoon', 'evening', 'night', 'triage', 'translator', 'routine', 'urgent']);
    const byTag = new Map<string, Note[]>();
    for (const n of profileNotes) {
      for (const t of n.tags ?? []) {
        if (skip.has(t)) continue;
        if (!byTag.has(t)) byTag.set(t, []);
        byTag.get(t)!.push(n);
      }
    }
    const now = Date.now();
    const DAY = 86400000;
    type P = { tag: string; notes: Note[]; window: 'recent' | 'ongoing' | 'long' | 'historical'; spanDays: number; firstAt: number };
    const out: P[] = [];
    byTag.forEach((ns, tag) => {
      if (ns.length < 2) return;
      const sorted = [...ns].sort((a, b) => a.createdAt - b.createdAt);
      const firstAt = sorted[0].createdAt;
      const lastAt = sorted[sorted.length - 1].createdAt;
      const spanDays = Math.max(1, Math.round((lastAt - firstAt) / DAY));
      const sinceLast = (now - lastAt) / DAY;
      if (sinceLast > 60) return; // gone quiet, don't surface
      let window: P['window'];
      if (spanDays >= 90) window = 'long';
      else if (spanDays >= 30) window = 'ongoing';
      else window = 'recent';
      out.push({ tag, notes: sorted, window, spanDays, firstAt });
    });
    // Sort: long-arc first, then ongoing, then recent — within each, earliest first-seen wins
    const rank = { long: 0, ongoing: 1, recent: 2, historical: 3 } as const;
    return out.sort((a, b) => rank[a.window] - rank[b.window] || a.firstAt - b.firstAt);
  }, [profileNotes]);

  const searchMatches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;
    return profileNotes.filter((n) => {
      return (
        (n.text ?? '').toLowerCase().includes(q) ||
        (n.transcript ?? '').toLowerCase().includes(q) ||
        (n.tags ?? []).some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, profileNotes]);

  const highlightedPattern = useMemo(() => {
    if (!highlightedTag) return null;
    return patterns.find((p) => p.tag === highlightedTag) ?? null;
  }, [highlightedTag, patterns]);

  const matchedDays = useMemo(() => {
    if (!searchMatches && !highlightedPattern) return null;
    const s = new Set<string>();
    (searchMatches ?? []).forEach((n) => s.add(ymd(n.createdAt)));
    (highlightedPattern?.notes ?? []).forEach((n) => s.add(ymd(n.createdAt)));
    return s;
  }, [searchMatches, highlightedPattern]);

  const visible = useMemo(() => {
    let list = searchMatches ?? (highlightedPattern ? highlightedPattern.notes : profileNotes);
    if (selected) {
      list = list.filter((n) => {
        const k = ymd(n.createdAt);
        return k >= selected.start && k <= selected.end;
      });
    }
    return list;
  }, [profileNotes, selected, searchMatches, highlightedPattern]);

  // Group by day (when not filtered to a single day)
  const grouped = useMemo(() => {
    const map = new Map<string, Note[]>();
    for (const n of visible) {
      const k = ymd(n.createdAt);
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(n);
    }
    return Array.from(map.entries());
  }, [visible]);

  return (
    <div className="pip-textured-bg relative w-full h-full overflow-hidden" style={{ background: '#F5F2E4' }}>
      <div
        ref={scrollRef}
        className="overflow-y-auto"
        style={{
          height: '100%',
          paddingBottom: 'calc(max(env(safe-area-inset-bottom, 0px), 8px) + 200px)',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
        }}
      >
        <header
          style={{
            paddingTop: 'max(env(safe-area-inset-top, 0px), 22px)',
            paddingBottom: 18,
            paddingLeft: 'max(env(safe-area-inset-left, 0px), 22px)',
            paddingRight: 'max(env(safe-area-inset-right, 0px), 22px)',
          }}
        >
          <div className="flex items-start justify-between" style={{ gap: 12 }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontVariationSettings: '"opsz" 96, "SOFT" 40', fontWeight: 400, fontSize: 32, color: '#3D405B', lineHeight: 1.05, letterSpacing: '-0.025em', margin: 0, flex: 1 }}>
              Everything you've <span style={{ fontStyle: 'italic' }}>noticed</span>.
            </h1>
            <button
              onClick={() => {
                setSearchOpen((v) => !v);
                if (!searchOpen) setTimeout(() => searchInputRef.current?.focus(), 200);
                else setSearchQuery('');
              }}
              aria-label={searchOpen ? 'Close search' : 'Search notes'}
              aria-expanded={searchOpen}
              style={{
                width: 40,
                height: 40,
                borderRadius: 999,
                border: 'none',
                background: searchOpen ? 'rgba(224,122,95,0.12)' : 'rgba(61,64,91,0.06)',
                color: searchOpen ? '#E07A5F' : '#3D405B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'background 0.18s ease, color 0.18s ease',
              }}
            >
              {searchOpen ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              )}
            </button>
          </div>

          <motion.div
            initial={false}
            animate={{ height: searchOpen ? 48 : 0, opacity: searchOpen ? 1 : 0, marginTop: searchOpen ? 14 : 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find a word, a feeling, a tag…"
              style={{
                width: '100%',
                height: 44,
                padding: '0 16px',
                borderRadius: 999,
                border: '0.5px solid rgba(61,64,91,0.14)',
                background: '#FBF8EE',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontVariationSettings: '"opsz" 18',
                fontSize: 15,
                color: '#3D405B',
                outline: 'none',
              }}
            />
            {searchMatches && (
              <p style={{ fontFamily: 'Inter', fontSize: 11.5, color: 'rgba(61,64,91,0.55)', margin: '8px 4px 0', letterSpacing: '0.04em' }}>
                {searchMatches.length} {searchMatches.length === 1 ? 'match' : 'matches'}
                {matchedDays && matchedDays.size > 0 ? ` · across ${matchedDays.size} ${matchedDays.size === 1 ? 'day' : 'days'}` : ''}
              </p>
            )}
          </motion.div>
        </header>

        <JournalHeatmap
          notes={profileNotes}
          countsByDay={countsByDay}
          selected={selected}
          onSelect={setSelected}
          streak={streak}
          collapsed={collapsed}
          onExpand={expandHeatmap}
          matchedDays={matchedDays}
        />

        {selected && selected.start !== selected.end && (
          <RangeSummary
            range={selected}
            notes={profileNotes}
            countsByDay={countsByDay}
            onClear={() => setSelected(null)}
          />
        )}

        {patterns.length > 0 && !selected && !searchQuery && (
          <div
            className="mt-4 flex flex-col gap-3"
            style={{
              paddingLeft: 'max(env(safe-area-inset-left, 0px), 20px)',
              paddingRight: 'max(env(safe-area-inset-right, 0px), 20px)',
            }}
          >
            {patterns.slice(0, 3).map((p) => (
              <PatternCard
                key={p.tag}
                tag={p.tag}
                notes={p.notes}
                window={p.window}
                spanDays={p.spanDays}
                highlighted={highlightedTag === p.tag}
                onHighlight={() => {
                  setHighlightedTag((cur) => (cur === p.tag ? null : p.tag));
                  scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenStory={() => setStoryPattern({ tag: p.tag, notes: p.notes })}
              />
            ))}
          </div>
        )}

        <div
          className="mt-4 flex flex-col gap-5"
          style={{
            paddingLeft: 'max(env(safe-area-inset-left, 0px), 20px)',
            paddingRight: 'max(env(safe-area-inset-right, 0px), 20px)',
          }}
        >
          {visible.length === 0 ? (
            <EmptyState selectedDate={selected?.start ?? null} />
          ) : (
            grouped.map(([day, notes]) => (
              <DayGroup
                key={day}
                day={day}
                notes={notes}
                expandedId={expanded}
                onToggle={(id) => setExpanded(expanded === id ? null : id)}
              />
            ))
          )}
        </div>
      </div>

      <button
        onClick={() => setComposer(true)}
        className="absolute rounded-full flex items-center justify-center active:scale-95 transition"
        style={{
          right: 'max(env(safe-area-inset-right, 0px), 22px)',
          bottom: 108,
          width: 56,
          height: 56,
          background: '#E07A5F',
          boxShadow: '0 10px 24px rgba(193,93,69,0.35)',
          color: '#fff',
          border: 'none',
        }}
        aria-label="Add note"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>

      {composer && <TextNoteCapture onClose={() => setComposer(false)} />}
      {storyPattern && <StoryView title={`Pattern: ${storyPattern.tag}`} notes={storyPattern.notes} onClose={() => setStoryPattern(null)} />}

      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { scrollbar-width: none; }`}</style>
    </div>
  );
}

function intensityColor(n: number): string {
  if (n <= 0) return '#EFEAD6';
  if (n === 1) return '#F4C9B8';
  if (n === 2) return '#EDA388';
  if (n === 3) return '#E07A5F';
  return '#C25E45';
}

function JournalHeatmap({
  notes,
  countsByDay,
  selected,
  onSelect,
  streak,
  collapsed,
  onExpand,
  matchedDays,
}: {
  notes: Note[];
  countsByDay: Map<string, number>;
  selected: { start: string; end: string } | null;
  onSelect: (r: { start: string; end: string } | null) => void;
  streak: number;
  collapsed: boolean;
  onExpand: () => void;
  matchedDays: Set<string> | null;
}) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const todayKey = ymd(now.getTime());
  const currentYear = now.getFullYear();

  const earliestYear = useMemo(() => {
    if (!notes.length) return currentYear;
    return new Date(Math.min(...notes.map((n) => n.createdAt))).getFullYear();
  }, [notes, currentYear]);

  const years = useMemo(() => {
    const start = Math.min(earliestYear, currentYear - 2);
    const out: number[] = [];
    for (let y = currentYear; y >= start; y--) out.push(y);
    return out;
  }, [earliestYear, currentYear]);

  const [activeYear, setActiveYear] = useState(currentYear);
  const [range, setRange] = useState<'90d' | '6mo' | '12mo'>('12mo');
  const [ribbonOpen, setRibbonOpen] = useState(false);
  const [showInsight, setShowInsight] = useState(true);
  const showRangeToggle = activeYear === currentYear;

  useEffect(() => {
    setShowInsight(true);
    const t = window.setTimeout(() => setShowInsight(false), 14000);
    return () => window.clearTimeout(t);
  }, [activeYear]);

  const monthlyByYear = useMemo(() => {
    const m = new Map<number, number[]>();
    years.forEach((y) => m.set(y, Array(12).fill(0)));
    notes.forEach((n) => {
      const d = new Date(n.createdAt);
      const y = d.getFullYear();
      if (m.has(y)) m.get(y)![d.getMonth()] += 1;
    });
    return m;
  }, [notes, years]);

  const { weeks, monthLabels } = useMemo(() => {
    let earliest: Date, latest: Date;
    if (activeYear === currentYear && range !== '12mo') {
      const days = range === '90d' ? 90 : 182;
      latest = new Date(now);
      earliest = new Date(now);
      earliest.setDate(earliest.getDate() - (days - 1));
    } else {
      earliest = new Date(activeYear, 0, 1);
      latest = new Date(activeYear, 11, 31);
    }
    const start = new Date(earliest);
    start.setDate(start.getDate() - start.getDay());
    const end = new Date(latest);
    end.setDate(end.getDate() + (6 - end.getDay()));
    const cols: { key: string; date: Date; inYear: boolean; future: boolean }[][] = [];
    const cursor = new Date(start);
    while (cursor <= end) {
      const col: { key: string; date: Date; inYear: boolean; future: boolean }[] = [];
      for (let r = 0; r < 7; r++) {
        const d = new Date(cursor);
        col.push({
          key: ymd(d.getTime()),
          date: d,
          inYear: d >= earliest && d <= latest,
          future: d > now,
        });
        cursor.setDate(cursor.getDate() + 1);
      }
      cols.push(col);
    }
    const labels: { col: number; label: string }[] = [];
    let lastMonth = -1;
    cols.forEach((col, i) => {
      const firstInYear = col.find((c) => c.inYear);
      if (!firstInYear) return;
      const m = firstInYear.date.getMonth();
      if (m !== lastMonth) {
        labels.push({ col: i, label: firstInYear.date.toLocaleDateString(undefined, { month: 'short' }) });
        lastMonth = m;
      }
    });
    return { weeks: cols, monthLabels: labels };
  }, [activeYear, currentYear, range, todayKey]);

  const cellDims = useMemo(() => {
    if (activeYear === currentYear && range === '90d') return { size: 18, gap: 4, radius: 5 };
    if (activeYear === currentYear && range === '6mo') return { size: 13, gap: 3, radius: 3 };
    return { size: 11, gap: 3, radius: 3 };
  }, [activeYear, currentYear, range]);

  const { size: cellSize, gap, radius } = cellDims;

  const [dragStart, setDragStart] = useState<string | null>(null);
  const [dragEnd, setDragEnd] = useState<string | null>(null);
  const dragOrigin = useRef<{ x: number; y: number; pointerType: string } | null>(null);
  const dragActivated = useRef(false);
  const dragging = dragStart !== null;
  const dragRange = dragging && dragEnd
    ? (dragStart! <= dragEnd ? { start: dragStart!, end: dragEnd } : { start: dragEnd, end: dragStart! })
    : null;

  function cancelDrag() {
    setDragStart(null);
    setDragEnd(null);
    dragOrigin.current = null;
    dragActivated.current = false;
  }

  function commitDrag() {
    if (!dragRange) return cancelDrag();
    // On touch, only commit if drag actually activated (passed threshold). Tap-as-select still works for mouse via single cell click.
    if (dragOrigin.current?.pointerType === 'touch' && !dragActivated.current && dragRange.start !== dragRange.end) {
      return cancelDrag();
    }
    if (dragRange.start === dragRange.end) {
      if (selected && selected.start === dragRange.start && selected.end === dragRange.end) {
        onSelect(null);
      } else {
        onSelect(dragRange);
      }
    } else {
      onSelect(dragRange);
    }
    cancelDrag();
  }

  function isInSelection(key: string) {
    if (dragRange) return key >= dragRange.start && key <= dragRange.end;
    if (selected) return key >= selected.start && key <= selected.end;
    return false;
  }

  const insight = useMemo(() => {
    const inYear = notes.filter((n) => new Date(n.createdAt).getFullYear() === activeYear);
    if (inYear.length === 0) return null;
    if (inYear.length < 3) return 'Still early. The story builds with each note.';
    const bands = { morning: 0, afternoon: 0, evening: 0, night: 0 } as Record<string, number>;
    inYear.forEach((n) => {
      const h = new Date(n.createdAt).getHours();
      if (h >= 5 && h < 12) bands.morning++;
      else if (h >= 12 && h < 17) bands.afternoon++;
      else if (h >= 17 && h < 22) bands.evening++;
      else bands.night++;
    });
    const topBand = Object.entries(bands).sort((a, b) => b[1] - a[1])[0][0];
    const tagCount = new Map<string, number>();
    const skip = new Set(['voice', 'text', 'photo', 'check-in', 'morning', 'afternoon', 'evening', 'night', 'triage', 'translator', 'routine', 'urgent']);
    inYear.forEach((n) =>
      (n.tags ?? []).forEach((t) => {
        if (skip.has(t)) return;
        tagCount.set(t, (tagCount.get(t) ?? 0) + 1);
      }),
    );
    const topTag = Array.from(tagCount.entries()).sort((a, b) => b[1] - a[1])[0];
    if (!topTag) return `You noticed most in the ${topBand}s.`;
    return `You noticed most in the ${topBand}s. '${topTag[0]}' came up ${topTag[1]} ${topTag[1] === 1 ? 'time' : 'times'}.`;
  }, [notes, activeYear]);

  const RIBBON_W = 96;
  const RIBBON_H = 18;

  function YearSparkline({ year }: { year: number }) {
    const buckets = monthlyByYear.get(year) ?? Array(12).fill(0);
    const max = Math.max(1, ...buckets);
    const barW = RIBBON_W / 12;
    const on = year === activeYear;
    return (
      <svg width={RIBBON_W} height={RIBBON_H} viewBox={`0 0 ${RIBBON_W} ${RIBBON_H}`} style={{ display: 'block' }}>
        {buckets.map((v, i) => {
          const h = v === 0 ? 1.5 : Math.max(1.5, (v / max) * (RIBBON_H - 2));
          return (
            <rect
              key={i}
              x={i * barW + 0.5}
              y={RIBBON_H - h}
              width={barW - 1}
              height={h}
              rx={0.8}
              fill={on ? '#E07A5F' : v === 0 ? 'rgba(61,64,91,0.12)' : 'rgba(61,64,91,0.32)'}
            />
          );
        })}
      </svg>
    );
  }

  const selectedSummary = selected
    ? (() => {
        const a = new Date(selected.start);
        const b = new Date(selected.end);
        let count = 0;
        countsByDay.forEach((n, k) => {
          if (k >= selected.start && k <= selected.end) count += n;
        });
        const sameDay = selected.start === selected.end;
        if (sameDay) {
          const label =
            selected.start === todayKey ? 'Today' :
            selected.start === ymd(now.getTime() - 86400000) ? 'Yesterday' :
            a.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
          return { label, count };
        }
        const fmt = (d: Date) => d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        return { label: `${fmt(a)} – ${fmt(b)}`, count };
      })()
    : null;

  return (
    <div
      style={{
        paddingLeft: 'max(env(safe-area-inset-left, 0px), 20px)',
        paddingRight: 'max(env(safe-area-inset-right, 0px), 20px)',
        marginBottom: 14,
      }}
      onPointerMove={(e) => {
        if (!dragOrigin.current) return;
        const dx = e.clientX - dragOrigin.current.x;
        const dy = e.clientY - dragOrigin.current.y;
        // If vertical motion dominates and exceeds threshold, the user is scrolling — abandon drag.
        if (dragOrigin.current.pointerType === 'touch' && Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) {
          cancelDrag();
          return;
        }
        // Mark drag as activated once horizontal motion crosses threshold.
        if (Math.abs(dx) > 6) dragActivated.current = true;
      }}
      onPointerUp={commitDrag}
      onPointerCancel={cancelDrag}
      onPointerLeave={(e) => {
        if (e.pointerType === 'touch') cancelDrag();
      }}
    >
      {/* Sticky collapsed strip — pinned to top of scroll, full-bleed */}
      <button
        onClick={onExpand}
        aria-label="Expand heatmap"
        aria-expanded={!collapsed}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          marginLeft: 'calc(-1 * max(env(safe-area-inset-left, 0px), 20px))',
          marginRight: 'calc(-1 * max(env(safe-area-inset-right, 0px), 20px))',
          paddingLeft: 'max(env(safe-area-inset-left, 0px), 20px)',
          paddingRight: 'max(env(safe-area-inset-right, 0px), 20px)',
          paddingTop: 11,
          paddingBottom: 11,
          marginBottom: -44,
          background: 'rgba(245, 242, 228, 0.88)',
          backdropFilter: 'blur(14px) saturate(140%)',
          WebkitBackdropFilter: 'blur(14px) saturate(140%)',
          borderBottom: '0.5px solid rgba(61,64,91,0.08)',
          opacity: collapsed ? 1 : 0,
          pointerEvents: collapsed ? 'auto' : 'none',
          transform: collapsed ? 'translateY(0)' : 'translateY(-6px)',
          transition: 'opacity 0.24s ease, transform 0.24s ease',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          border: 'none',
          width: 'auto',
          textAlign: 'left' as const,
        }}
      >
        <YearSparkline year={activeYear} />
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontVariationSettings: '"opsz" 18',
            fontSize: 13,
            color: 'rgba(61,64,91,0.72)',
            flex: 1,
            lineHeight: 1,
          }}
        >
          {streak > 0 ? (
            <>
              <span style={{ color: '#E07A5F', fontWeight: 500 }}>{streak}</span>{' '}
              {streak === 1 ? 'day' : 'days'} of noticing
            </>
          ) : (
            <>{activeYear}</>
          )}
        </span>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="rgba(61,64,91,0.45)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>

      <div>
      {streak > 0 && (
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontVariationSettings: '"opsz" 18',
            fontSize: 14,
            color: 'rgba(61,64,91,0.6)',
            margin: '0 0 14px',
          }}
        >
          <span style={{ color: '#E07A5F', fontWeight: 500 }}>{streak}</span>{' '}
          {streak === 1 ? 'day' : 'days'} of noticing.
        </p>
      )}

      {/* Year Ribbon — hidden until year pill is tapped */}
      <motion.div
        initial={false}
        animate={{ height: ribbonOpen ? 'auto' : 0, opacity: ribbonOpen ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <div className="overflow-x-auto no-scrollbar" style={{ marginBottom: 14, paddingTop: 2 }}>
          <div style={{ display: 'inline-flex', gap: 16, paddingBottom: 2 }}>
            {years.map((y) => {
              const on = y === activeYear;
              return (
                <button
                  key={y}
                  onClick={() => {
                    setActiveYear(y);
                    setRibbonOpen(false);
                  }}
                  aria-label={`View ${y}`}
                  aria-current={on}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 5,
                  }}
                >
                  <YearSparkline year={y} />
                  <span
                    style={{
                      fontFamily: on ? 'var(--font-serif)' : 'Inter',
                      fontStyle: on ? 'italic' : 'normal',
                      fontVariationSettings: on ? '"opsz" 18' : undefined,
                      fontSize: on ? 14 : 11.5,
                      fontWeight: 500,
                      color: on ? '#E07A5F' : 'rgba(61,64,91,0.5)',
                      letterSpacing: on ? '-0.01em' : '0.04em',
                      lineHeight: 1,
                    }}
                  >
                    {y}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Heatmap card */}
      <div
        style={{
          background: '#FBF8EE',
          borderRadius: 22,
          border: '0.5px solid rgba(61,64,91,0.08)',
          padding: '16px 16px 14px',
          boxShadow: '0 1px 2px rgba(61,64,91,0.04), 0 8px 20px rgba(61,64,91,0.05)',
        }}
      >
        <div className="flex items-center justify-between" style={{ marginBottom: 10, minHeight: 24, gap: 10 }}>
          <button
            onClick={() => setRibbonOpen((v) => !v)}
            aria-expanded={ribbonOpen}
            aria-label="Choose year"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              background: ribbonOpen ? 'rgba(224,122,95,0.10)' : 'rgba(61,64,91,0.05)',
              border: 'none',
              padding: '5px 10px',
              borderRadius: 999,
              cursor: 'pointer',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontVariationSettings: '"opsz" 18',
              fontSize: 13.5,
              color: ribbonOpen ? '#E07A5F' : '#3D405B',
              letterSpacing: '-0.01em',
              transition: 'background 0.18s ease, color 0.18s ease',
            }}
          >
            {activeYear}
            <svg
              width="10"
              height="10"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: ribbonOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.22s ease' }}
              aria-hidden
            >
              <path d="M4 6l4 4 4-4" />
            </svg>
          </button>

          {selectedSummary ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontVariationSettings: '"opsz" 24',
                  fontStyle: 'italic',
                  fontSize: 14,
                  color: '#3D405B',
                  margin: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                {selectedSummary.label}
                <span style={{ fontStyle: 'normal', fontFamily: 'Inter', fontSize: 11.5, color: 'rgba(61,64,91,0.5)', marginLeft: 6 }}>
                  · {selectedSummary.count}
                </span>
              </p>
              <button
                onClick={() => onSelect(null)}
                style={{
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: 12,
                  color: '#E07A5F',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                }}
              >
                Clear
              </button>
            </div>
          ) : null}
        </div>

        {showRangeToggle && (
          <div
            role="tablist"
            aria-label="Time window"
            style={{
              display: 'inline-flex',
              background: 'rgba(61,64,91,0.05)',
              borderRadius: 999,
              padding: 3,
              marginBottom: 12,
            }}
          >
            {(['90d', '6mo', '12mo'] as const).map((r) => {
              const on = range === r;
              const label = r === '90d' ? '90 days' : r === '6mo' ? '6 months' : '12 months';
              return (
                <button
                  key={r}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setRange(r)}
                  style={{
                    background: on ? '#fff' : 'transparent',
                    color: on ? '#3D405B' : 'rgba(61,64,91,0.55)',
                    border: 'none',
                    padding: '6px 13px',
                    borderRadius: 999,
                    fontFamily: 'Inter',
                    fontWeight: on ? 600 : 500,
                    fontSize: 12,
                    letterSpacing: '-0.005em',
                    cursor: 'pointer',
                    boxShadow: on ? '0 1px 2px rgba(61,64,91,0.08), 0 4px 10px rgba(61,64,91,0.06)' : 'none',
                    transition: 'all 0.18s ease',
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        <div className="overflow-x-auto no-scrollbar" style={{ paddingBottom: 4 }}>
          <div style={{ display: 'inline-block', minWidth: '100%' }}>
            <div style={{ position: 'relative', height: 14, marginBottom: 4 }}>
              {monthLabels.map((m) => (
                <span
                  key={`${m.col}-${m.label}`}
                  style={{
                    position: 'absolute',
                    left: m.col * (cellSize + gap),
                    fontFamily: 'Inter',
                    fontWeight: 500,
                    fontSize: 10,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'rgba(61,64,91,0.45)',
                    top: 0,
                  }}
                >
                  {m.label}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap, touchAction: 'pan-y', userSelect: 'none' }}>
              {weeks.map((col, ci) => (
                <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap }}>
                  {col.map((cell) => {
                    const count = countsByDay.get(cell.key) ?? 0;
                    const sel = isInSelection(cell.key);
                    const isToday = cell.key === todayKey;
                    const interactive = cell.inYear && !cell.future;
                    const isMatch = matchedDays?.has(cell.key) ?? false;
                    const dimmed = matchedDays !== null && !isMatch && interactive;
                    const bg = !interactive ? 'transparent' : dimmed ? 'rgba(239,234,214,0.55)' : intensityColor(count);
                    const label = cell.date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' });
                    return (
                      <button
                        key={cell.key}
                        onPointerDown={(e) => {
                          if (!interactive) return;
                          (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
                          dragOrigin.current = { x: e.clientX, y: e.clientY, pointerType: e.pointerType };
                          dragActivated.current = e.pointerType !== 'touch';
                          setDragStart(cell.key);
                          setDragEnd(cell.key);
                        }}
                        onPointerEnter={() => {
                          if (!interactive || !dragging) return;
                          // On touch, only extend selection once drag has activated (prevents scroll from selecting cells).
                          if (dragOrigin.current?.pointerType === 'touch' && !dragActivated.current) return;
                          setDragEnd(cell.key);
                        }}
                        disabled={!interactive}
                        aria-label={`${label} — ${count} ${count === 1 ? 'note' : 'notes'}`}
                        style={{
                          width: cellSize,
                          height: cellSize,
                          borderRadius: radius,
                          background: bg,
                          outline: sel ? '1.5px solid #3D405B' : isMatch ? '1.5px solid #E07A5F' : 'none',
                          border: !sel && !isMatch && isToday ? '1.5px solid #E07A5F' : 'none',
                          boxShadow: isMatch ? '0 0 0 2px rgba(224,122,95,0.18)' : 'none',
                          padding: 0,
                          margin: 0,
                          cursor: interactive ? 'pointer' : 'default',
                          touchAction: 'pan-y',
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between" style={{ marginTop: 12 }}>
          <span style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(61,64,91,0.5)' }}>Less</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {[0, 1, 2, 3, 4].map((n) => (
              <span
                key={n}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  background: intensityColor(n),
                  display: 'inline-block',
                }}
              />
            ))}
          </div>
          <span style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(61,64,91,0.5)' }}>More</span>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{
          opacity: insight && showInsight ? 1 : 0,
          maxHeight: insight && showInsight ? 200 : 0,
          marginTop: insight && showInsight ? 16 : 0,
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: 'hidden' }}
        aria-hidden={!showInsight}
      >
        {insight && (
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontVariationSettings: '"opsz" 24, "SOFT" 30',
              fontSize: 17,
              lineHeight: 1.4,
              color: '#3D405B',
              margin: '0 4px',
              letterSpacing: '-0.005em',
            }}
          >
            {insight}
          </p>
        )}
      </motion.div>
      </div>
    </div>
  );
}

function EmptyState({ selectedDate }: { selectedDate: string | null }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 22,
        border: '1px dashed rgba(61,64,91,0.15)',
        padding: '28px 22px',
        textAlign: 'center',
      }}
    >
      <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontVariationSettings: '"opsz" 18', fontSize: 17, color: '#3D405B', margin: 0 }}>
        {selectedDate ? 'A quiet day. Worth noticing too.' : 'Nothing yet — and that is okay.'}
      </p>
      <p style={{ fontFamily: 'Inter', fontSize: 13, color: 'rgba(61,64,91,0.55)', marginTop: 6 }}>
        Tap the + when something comes up.
      </p>
    </div>
  );
}

function DayGroup({
  day,
  notes,
  expandedId,
  onToggle,
}: {
  day: string;
  notes: Note[];
  expandedId: string | null;
  onToggle: (id: string) => void;
}) {
  const date = new Date(day);
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  let label: string;
  if (day === today) label = 'Today';
  else if (day === yesterday) label = 'Yesterday';
  else label = date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="flex flex-col gap-2">
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontVariationSettings: '"opsz" 24',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 15,
          color: 'rgba(61,64,91,0.6)',
          margin: 0,
          paddingLeft: 2,
        }}
      >
        {label}
      </p>
      <div className="flex flex-col gap-2">
        {notes.map((n) => (
          <EntryCard key={n.id} note={n} open={expandedId === n.id} onToggle={() => onToggle(n.id)} />
        ))}
      </div>
    </div>
  );
}

function RangeSummary({
  range,
  notes,
  countsByDay,
  onClear,
}: {
  range: { start: string; end: string };
  notes: Note[];
  countsByDay: Map<string, number>;
  onClear: () => void;
}) {
  const stats = useMemo(() => {
    const inRange = notes.filter((n) => {
      const k = ymd(n.createdAt);
      return k >= range.start && k <= range.end;
    });
    // Day count in range
    const startD = new Date(range.start);
    const endD = new Date(range.end);
    const totalDays = Math.round((endD.getTime() - startD.getTime()) / 86400000) + 1;
    // Noticed / quiet days
    let noticedDays = 0;
    countsByDay.forEach((_, k) => {
      if (k >= range.start && k <= range.end) noticedDays++;
    });
    const quietDays = totalDays - noticedDays;
    // Time band
    const bands = { morning: 0, afternoon: 0, evening: 0, night: 0 } as Record<string, number>;
    inRange.forEach((n) => {
      const h = new Date(n.createdAt).getHours();
      if (h >= 5 && h < 12) bands.morning++;
      else if (h >= 12 && h < 17) bands.afternoon++;
      else if (h >= 17 && h < 22) bands.evening++;
      else bands.night++;
    });
    const topBand = Object.entries(bands).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
    // Top tag — count distinct days the tag appeared (more telling than raw frequency)
    const skip = new Set(['voice', 'text', 'photo', 'check-in', 'morning', 'afternoon', 'evening', 'night', 'triage', 'translator', 'routine', 'urgent']);
    const tagDays = new Map<string, Set<string>>();
    inRange.forEach((n) => {
      const dk = ymd(n.createdAt);
      (n.tags ?? []).forEach((t) => {
        if (skip.has(t)) return;
        if (!tagDays.has(t)) tagDays.set(t, new Set());
        tagDays.get(t)!.add(dk);
      });
    });
    const topTagEntry = Array.from(tagDays.entries())
      .map(([t, days]) => [t, days.size] as [string, number])
      .sort((a, b) => b[1] - a[1])[0] ?? null;
    const topTag: [string, number] | null = topTagEntry && topTagEntry[1] >= 2 ? topTagEntry : null;
    // Day of week
    const dows = [0, 0, 0, 0, 0, 0, 0];
    inRange.forEach((n) => dows[new Date(n.createdAt).getDay()]++);
    const topDow = inRange.length >= 3
      ? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dows.indexOf(Math.max(...dows))]
      : null;
    return { totalDays, noticedDays, quietDays, notesCount: inRange.length, topBand, topTag, topDow };
  }, [range, notes, countsByDay]);

  const fmt = (k: string) =>
    new Date(k).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

  const sentence = (() => {
    if (stats.notesCount === 0) return 'A quiet stretch. Worth noticing too.';
    if (stats.topTag) {
      const [t, d] = stats.topTag;
      const lead = `'${t}' showed up on ${d} of these ${stats.totalDays} ${stats.totalDays === 1 ? 'day' : 'days'}`;
      const tail = stats.topBand ? `, mostly in the ${stats.topBand}s.` : '.';
      return lead + tail;
    }
    if (stats.topDow) return `${stats.topDow}s kept returning, mostly in the ${stats.topBand}s.`;
    return `Mostly in the ${stats.topBand}s.`;
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      style={{
        marginLeft: 'max(env(safe-area-inset-left, 0px), 20px)',
        marginRight: 'max(env(safe-area-inset-right, 0px), 20px)',
        marginBottom: 14,
        background: '#fff',
        borderRadius: 24,
        padding: '20px 22px 18px',
        boxShadow: '0 1px 2px rgba(61,64,91,0.04), 0 14px 32px rgba(61,64,91,0.08)',
        border: '0.5px solid rgba(61,64,91,0.06)',
      }}
    >
      <div className="flex items-baseline justify-between" style={{ marginBottom: 14 }}>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontVariationSettings: '"opsz" 24',
          fontSize: 17,
          color: '#3D405B',
          margin: 0,
          letterSpacing: '-0.01em',
        }}>
          {fmt(range.start)} – {fmt(range.end)}
          <span style={{ fontStyle: 'normal', fontFamily: 'Inter', fontSize: 11.5, color: 'rgba(61,64,91,0.5)', marginLeft: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {stats.totalDays} {stats.totalDays === 1 ? 'day' : 'days'}
          </span>
        </p>
        <button
          onClick={onClear}
          aria-label="Clear range"
          style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer', color: 'rgba(61,64,91,0.45)', lineHeight: 0 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex" style={{ gap: 28, marginBottom: 14 }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontVariationSettings: '"opsz" 96, "SOFT" 40',
            fontSize: 40,
            color: '#E07A5F',
            margin: 0,
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}>
            {stats.noticedDays}
          </p>
          <p style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 11, color: 'rgba(61,64,91,0.55)', margin: '4px 0 0', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            Noticed
          </p>
        </div>
        <div>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontVariationSettings: '"opsz" 96, "SOFT" 40',
            fontSize: 40,
            color: 'rgba(61,64,91,0.45)',
            margin: 0,
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}>
            {stats.quietDays}
          </p>
          <p style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: 11, color: 'rgba(61,64,91,0.55)', margin: '4px 0 0', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            Quiet
          </p>
        </div>
      </div>

      <p style={{
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontVariationSettings: '"opsz" 24, "SOFT" 30',
        fontSize: 16,
        lineHeight: 1.45,
        color: '#3D405B',
        margin: '0 0 4px',
        letterSpacing: '-0.005em',
      }}>
        {sentence}
      </p>
    </motion.div>
  );
}

function PatternCard({
  tag,
  notes,
  window: win = 'recent',
  spanDays,
  highlighted = false,
  onHighlight,
  onOpenStory,
}: {
  tag: string;
  notes: Note[];
  window?: 'recent' | 'ongoing' | 'long' | 'historical';
  spanDays?: number;
  highlighted?: boolean;
  onHighlight?: () => void;
  onOpenStory?: () => void;
}) {
  const dates = notes.map((n) => n.createdAt).sort((a, b) => a - b);
  const first = new Date(dates[0]).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  const last = new Date(dates[dates.length - 1]).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  const span = spanDays ?? Math.max(1, Math.round((dates[dates.length - 1] - dates[0]) / 86400000));
  const months = Math.round(span / 30);
  const durationLabel =
    win === 'long' ? `ongoing · ${months} ${months === 1 ? 'month' : 'months'}` :
    win === 'ongoing' ? `ongoing · ${span} days` :
    'recurring';
  return (
    <div
      onClick={onHighlight}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onHighlight?.(); }}
      aria-pressed={highlighted}
      className="flex flex-col relative overflow-hidden active:scale-[0.99] transition text-left"
      style={{
        background: highlighted ? '#FBE8DB' : '#FDF4E3',
        borderRadius: 22,
        padding: '18px 18px 16px',
        border: highlighted ? '0.5px solid rgba(224,122,95,0.55)' : '0.5px solid rgba(224,122,95,0.3)',
        boxShadow: highlighted ? '0 0 0 3px rgba(224,122,95,0.12)' : 'none',
        cursor: 'pointer',
        transition: 'background 0.22s ease, border 0.22s ease, box-shadow 0.22s ease',
      }}
    >
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: -32,
          right: -28,
          width: 120,
          height: 120,
          borderRadius: 120,
          background: 'radial-gradient(circle, rgba(224,122,95,0.18) 0%, rgba(224,122,95,0) 70%)',
        }}
      />
      <div className="flex items-center gap-2 mb-2">
        <span style={{ width: 18, height: 1, background: '#E07A5F' }} />
        <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 9.5, color: '#E07A5F', letterSpacing: '0.28em', textTransform: 'uppercase' }}>
          {win === 'long' || win === 'ongoing' ? 'Ongoing' : 'Recurring'}
        </span>
        {(win === 'long' || win === 'ongoing') && (
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontVariationSettings: '"opsz" 14',
            fontSize: 11.5,
            color: 'rgba(61,64,91,0.55)',
            letterSpacing: '-0.005em',
          }}>
            {durationLabel}
          </span>
        )}
      </div>
      <p style={{ fontFamily: 'var(--font-serif)', fontVariationSettings: '"opsz" 48', fontWeight: 400, fontSize: 24, color: '#3D405B', lineHeight: 1.05, letterSpacing: '-0.02em', textTransform: 'capitalize', margin: 0 }}>
        {tag}
        <span style={{ fontStyle: 'italic', color: '#E07A5F' }}>.</span>
      </p>
      <p style={{ fontFamily: 'Inter', fontSize: 12.5, color: 'rgba(61,64,91,0.55)', marginTop: 4, lineHeight: 1.5 }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#3D405B' }}>{notes.length}</span> notes · {first} – {last}
      </p>
      <AnimatePresence initial={false}>
        {highlighted && (
          <motion.div
            key="story-link"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); onOpenStory?.(); }}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontVariationSettings: '"opsz" 18',
                fontSize: 13.5,
                color: '#E07A5F',
                letterSpacing: '-0.005em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              Read the thread
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const typeMeta: Record<string, { label: string; color: string; bg: string }> = {
  voice: { label: 'Voice', color: '#B27A1A', bg: 'rgba(178,122,26,0.10)' },
  photo: { label: 'Photo', color: '#3F6E9C', bg: 'rgba(63,110,156,0.10)' },
  translator: { label: 'Translated', color: '#4B7A63', bg: 'rgba(75,122,99,0.10)' },
  triage: { label: 'Triage', color: '#B14A37', bg: 'rgba(177,74,55,0.10)' },
  text: { label: 'Note', color: '#5B6168', bg: 'rgba(91,97,104,0.10)' },
  check_in: { label: 'Check-in', color: '#B0473A', bg: 'rgba(176,71,58,0.10)' },
  video: { label: 'Video', color: '#3F6E9C', bg: 'rgba(63,110,156,0.10)' },
};

function VoiceGlyph({ color }: { color: string }) {
  const bars = [4, 9, 6, 11, 7, 10, 5, 8, 4];
  return (
    <svg width={32} height={14} viewBox="0 0 32 14" fill="none" aria-hidden>
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 3.5}
          y={(14 - h) / 2}
          width={2}
          height={h}
          rx={1}
          fill={color}
          opacity={0.85}
        />
      ))}
    </svg>
  );
}

function EntryCard({ note, open, onToggle }: { note: Note; open: boolean; onToggle: () => void }) {
  const meta = typeMeta[note.type] ?? typeMeta.text;
  const date = new Date(note.createdAt);
  const time = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  const preview = (note.text ?? note.transcript ?? '').trim();
  const firstLine = preview.split('\n')[0];
  const tags = (note.tags ?? []).filter((t) => !['voice', 'text', 'photo'].includes(t));
  const isPhoto = note.type === 'photo' && (note.mediaUrls?.length ?? 0) > 0;
  const isVoice = note.type === 'voice';
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div
      onClick={onToggle}
      className="cursor-pointer active:scale-[0.995] transition"
      style={{
        background: '#fff',
        borderRadius: 18,
        padding: '14px 16px',
        boxShadow: open
          ? '0 1px 2px rgba(61,64,91,0.04), 0 16px 32px rgba(61,64,91,0.08)'
          : '0 1px 2px rgba(61,64,91,0.04), 0 8px 18px rgba(61,64,91,0.04)',
        border: '0.5px solid rgba(61,64,91,0.06)',
        overflow: 'hidden',
      }}
    >
      <div className="flex items-center gap-2">
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '3px 8px',
            borderRadius: 999,
            background: meta.bg,
          }}
        >
          <span style={{ width: 5, height: 5, borderRadius: 999, background: meta.color }} />
          <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 9.5, color: meta.color, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            {meta.label}
          </span>
        </span>
        {isVoice && (
          <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            <VoiceGlyph color={meta.color} />
          </span>
        )}
        <span style={{ fontFamily: 'Inter', fontSize: 11.5, color: 'rgba(61,64,91,0.45)' }}>{time}</span>
        {isPhoto && !open && (
          <span style={{ marginLeft: 'auto', display: 'inline-flex', gap: 4 }}>
            {note.mediaUrls!.slice(0, 3).map((src, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                aria-label="View full image"
                style={{ padding: 0, border: 'none', background: 'transparent', cursor: 'zoom-in', lineHeight: 0 }}
              >
                <img
                  src={src}
                  alt=""
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    objectFit: 'cover',
                    border: '0.5px solid rgba(61,64,91,0.08)',
                    display: 'block',
                  }}
                />
              </button>
            ))}
            {note.mediaUrls!.length > 3 && (
              <span style={{
                width: 36, height: 36, borderRadius: 8,
                background: 'rgba(63,110,156,0.10)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Inter', fontWeight: 600, fontSize: 11, color: '#3F6E9C',
              }}>
                +{note.mediaUrls!.length - 3}
              </span>
            )}
          </span>
        )}
      </div>

      {firstLine && (
        <p
          style={{
            fontFamily: 'Inter',
            fontSize: 14.5,
            color: '#3D405B',
            lineHeight: 1.45,
            letterSpacing: '-0.005em',
            margin: '8px 0 0',
            display: '-webkit-box',
            WebkitLineClamp: open ? 'unset' : 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {open ? preview : firstLine}
        </p>
      )}

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="expand"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            {note.mediaUrls?.length ? (
              <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
                {note.mediaUrls.map((src, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                    aria-label="View full image"
                    className="shrink-0"
                    style={{ padding: 0, border: 'none', background: 'transparent', cursor: 'zoom-in', borderRadius: 14, overflow: 'hidden' }}
                  >
                    <img src={src} alt="" className="object-cover" style={{ width: 120, height: 120, display: 'block' }} />
                  </button>
                ))}
              </div>
            ) : null}
            {tags.length ? (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: '3px 9px',
                      borderRadius: 999,
                      background: 'rgba(94,142,116,0.1)',
                      color: '#4B7A63',
                      fontFamily: 'Inter',
                      fontWeight: 500,
                      fontSize: 11,
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontVariationSettings: '"opsz" 12',
                fontSize: 11.5,
                color: 'rgba(61,64,91,0.4)',
                marginTop: 12,
              }}
            >
              {date.toLocaleString(undefined, { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightboxIndex !== null && note.mediaUrls && (
          <Lightbox
            images={note.mediaUrls}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Lightbox({ images, startIndex, onClose }: { images: string[]; startIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(startIndex);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex((i) => Math.min(images.length - 1, i + 1));
      if (e.key === 'ArrowLeft') setIndex((i) => Math.max(0, i - 1));
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [images.length, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(20, 18, 14, 0.94)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <motion.img
        key={index}
        src={images[index]}
        alt=""
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          borderRadius: 12,
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
        }}
      />

      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: 'absolute',
          top: 'max(env(safe-area-inset-top, 0px), 18px)',
          right: 18,
          width: 40,
          height: 40,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.12)',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {images.length > 1 && (
        <>
          {index > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setIndex(index - 1); }}
              aria-label="Previous"
              style={navBtnStyle('left')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
          {index < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setIndex(index + 1); }}
              aria-label="Next"
              style={navBtnStyle('right')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          )}
          <div
            style={{
              position: 'absolute',
              bottom: 'max(env(safe-area-inset-bottom, 0px), 24px)',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: 6,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((_, i) => (
              <span
                key={i}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: i === index ? '#fff' : 'rgba(255,255,255,0.35)',
                  transition: 'background 0.18s ease',
                }}
              />
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}

function navBtnStyle(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute',
    top: '50%',
    [side]: 12,
    transform: 'translateY(-50%)',
    width: 44,
    height: 44,
    borderRadius: 999,
    background: 'rgba(255,255,255,0.12)',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
  };
}
