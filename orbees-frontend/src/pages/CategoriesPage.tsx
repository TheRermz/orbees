import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ShoppingCart, ShoppingBag, UtensilsCrossed, Coffee, Pizza, Apple,
  Milk, Sandwich, Wine, Home, Building, Building2, Lightbulb, Wrench,
  Hammer, Bed, Sofa, Lamp, Car, Bus, Plane, Train, Bike, Fuel, Truck,
  Ship, Heart, Activity, Pill, Stethoscope, Dumbbell, Baby, Eye,
  DollarSign, CreditCard, Banknote, PiggyBank, Wallet, TrendingUp,
  Receipt, Coins, BookOpen, GraduationCap, Pencil, School, Backpack,
  Music, Film, Gamepad2, Headphones, Camera, Tv, Star,
  Smartphone, Laptop, Monitor, Wifi, Briefcase, Users, BarChart2,
  Globe, Package, Gift, Scissors, Shirt, Palette, TreePine, Sun,
  Zap, Cat, Dog, Flower2, Tag, CheckCircle, Plus,
} from 'lucide-react';
import { categories as defaultCategories } from '../data/mockData';
import './CategoriesPage.css';

/* ─── ICON REGISTRY ─── */
const ICON_MAP: Record<string, React.ElementType> = {
  ShoppingCart, ShoppingBag, UtensilsCrossed, Coffee, Pizza, Apple,
  Milk, Sandwich, Wine, Home, Building, Building2, Lightbulb, Wrench,
  Hammer, Bed, Sofa, Lamp, Car, Bus, Plane, Train, Bike, Fuel, Truck,
  Ship, Heart, Activity, Pill, Stethoscope, Dumbbell, Baby, Eye,
  DollarSign, CreditCard, Banknote, PiggyBank, Wallet, TrendingUp,
  Receipt, Coins, BookOpen, GraduationCap, Pencil, School, Backpack,
  Music, Film, Gamepad2, Headphones, Camera, Tv, Star,
  Smartphone, Laptop, Monitor, Wifi, Briefcase, Users, BarChart2,
  Globe, Package, Gift, Scissors, Shirt, Palette, TreePine, Sun,
  Zap, Cat, Dog, Flower2, Tag,
};

const ICON_ENTRIES = Object.entries(ICON_MAP);

/* ─── COLOR UTILS ─── */
function hexToHsv(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + 6) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return [h, max === 0 ? 0 : d / max, max];
}

function hsvToHex(h: number, s: number, v: number): string {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
  };
  const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0');
  return `#${toHex(f(5))}${toHex(f(3))}${toHex(f(1))}`;
}

function isValidHex(h: string) {
  return /^#[0-9A-Fa-f]{6}$/.test(h);
}

/* ─── COLOR WHEEL COMPONENT ─── */
function ColorWheel({ hex, onChange }: { hex: string; onChange: (h: string) => void }) {
  const ringRef = useRef<HTMLCanvasElement>(null);
  const slRef = useRef<HTMLCanvasElement>(null);
  const [hsv, setHsv] = useState<[number, number, number]>(() => hexToHsv(isValidHex(hex) ? hex : '#F5A623'));
  const [hexInput, setHexInput] = useState(hex.replace('#', ''));
  const dragging = useRef<'ring' | 'sl' | null>(null);

  // sync hex input when hex prop changes externally
  useEffect(() => {
    if (isValidHex(hex)) {
      setHexInput(hex.replace('#', ''));
      setHsv(hexToHsv(hex));
    }
  }, [hex]);

  // draw hue ring
  useEffect(() => {
    const canvas = ringRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const size = 200, cx = 100, cy = 100;
    const outerR = 96, innerR = 68;
    ctx.clearRect(0, 0, size, size);
    for (let deg = 0; deg < 360; deg++) {
      const a0 = ((deg - 1) * Math.PI) / 180;
      const a1 = ((deg + 1) * Math.PI) / 180;
      ctx.beginPath();
      ctx.arc(cx, cy, outerR, a0, a1);
      ctx.arc(cx, cy, innerR, a1, a0, true);
      ctx.closePath();
      ctx.fillStyle = `hsl(${deg}, 100%, 50%)`;
      ctx.fill();
    }
    // ring indicator
    const angle = (hsv[0] * Math.PI) / 180;
    const r = (outerR + innerR) / 2;
    const ix = cx + r * Math.cos(angle);
    const iy = cy + r * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(ix, iy, 9, 0, Math.PI * 2);
    ctx.fillStyle = hsvToHex(hsv[0], 1, 1);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(ix, iy, 9, 0, Math.PI * 2);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2.5;
    ctx.stroke();
  }, [hsv]);

  // draw SL square
  useEffect(() => {
    const canvas = slRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = `hsl(${hsv[0]}, 100%, 50%)`;
    ctx.fillRect(0, 0, W, H);
    const wg = ctx.createLinearGradient(0, 0, W, 0);
    wg.addColorStop(0, 'rgba(255,255,255,1)');
    wg.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = wg;
    ctx.fillRect(0, 0, W, H);
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, 'rgba(0,0,0,0)');
    bg.addColorStop(1, 'rgba(0,0,0,1)');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    // indicator
    const px = hsv[1] * W;
    const py = (1 - hsv[2]) * H;
    ctx.beginPath();
    ctx.arc(px, py, 7, 0, Math.PI * 2);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(px, py, 5, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,0,0,0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }, [hsv]);

  const pickRing = useCallback((e: MouseEvent | React.MouseEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const x = ('clientX' in e ? e.clientX : 0) - rect.left - rect.width / 2;
    const y = ('clientY' in e ? e.clientY : 0) - rect.top - rect.height / 2;
    const deg = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
    const newHsv: [number, number, number] = [deg, hsv[1], hsv[2]];
    setHsv(newHsv);
    const h = hsvToHex(...newHsv);
    setHexInput(h.replace('#', ''));
    onChange(h);
  }, [hsv, onChange]);

  const pickSL = useCallback((e: MouseEvent | React.MouseEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const s = Math.max(0, Math.min(1, (('clientX' in e ? e.clientX : 0) - rect.left) / rect.width));
    const v = Math.max(0, Math.min(1, 1 - (('clientY' in e ? e.clientY : 0) - rect.top) / rect.height));
    const newHsv: [number, number, number] = [hsv[0], s, v];
    setHsv(newHsv);
    const h = hsvToHex(...newHsv);
    setHexInput(h.replace('#', ''));
    onChange(h);
  }, [hsv, onChange]);

  // global mousemove/mouseup for drag
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dragging.current === 'ring' && ringRef.current) pickRing(e, ringRef.current);
      if (dragging.current === 'sl' && slRef.current) pickSL(e, slRef.current);
    };
    const onUp = () => { dragging.current = null; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [pickRing, pickSL]);

  const handleHexInput = (val: string) => {
    setHexInput(val);
    const full = '#' + val;
    if (isValidHex(full)) {
      setHsv(hexToHsv(full));
      onChange(full);
    }
  };

  return (
    <div className="color-wheel-root">
      <div className="color-wheel-container">
        <canvas
          ref={ringRef} width={200} height={200}
          className="ring-canvas"
          onMouseDown={e => { dragging.current = 'ring'; pickRing(e, ringRef.current!); }}
          onClick={e => pickRing(e, ringRef.current!)}
        />
        <canvas
          ref={slRef} width={120} height={120}
          className="sl-canvas"
          onMouseDown={e => { dragging.current = 'sl'; pickSL(e, slRef.current!); }}
          onClick={e => pickSL(e, slRef.current!)}
        />
      </div>
      <div className="hex-input-row">
        <span className="hex-hash">#</span>
        <input
          className="hex-input"
          type="text"
          maxLength={6}
          value={hexInput}
          onChange={e => handleHexInput(e.target.value.toUpperCase())}
          placeholder="F5A623"
        />
        <div className="hex-swatch" style={{ background: '#' + hexInput }} />
      </div>
    </div>
  );
}

/* ─── DEFAULT ICON MAP BY CATEGORY NAME ─── */
const NAME_TO_ICON: Record<string, string> = {
  'Alimentação': 'UtensilsCrossed',
  'Transporte': 'Car',
  'Moradia': 'Home',
  'Saúde': 'Pill',
  'Educação': 'BookOpen',
  'Lazer': 'Gamepad2',
  'Salário': 'Banknote',
  'Outros': 'Package',
};

/* ─── MAIN PAGE ─── */
interface UserCat { id: string; name: string; color: string; iconKey: string; }

export default function CategoriesPage() {
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<string>('Tag');
  const [color, setColor] = useState('#F5A623');
  const [iconSearch, setIconSearch] = useState('');
  const [userCats, setUserCats] = useState<UserCat[]>([]);
  const [success, setSuccess] = useState('');

  const filteredIcons = iconSearch
    ? ICON_ENTRIES.filter(([k]) => k.toLowerCase().includes(iconSearch.toLowerCase()))
    : ICON_ENTRIES;

  const SelectedIconComp = ICON_MAP[selectedIcon] ?? Tag;

  const handleCreate = () => {
    if (!name.trim()) return;
    const newCat: UserCat = {
      id: Date.now().toString(),
      name: name.trim(),
      color,
      iconKey: selectedIcon,
    };
    setUserCats(prev => [...prev, newCat]);
    setSuccess(`Categoria "${name.trim()}" criada com sucesso!`);
    setName('');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="categories-page">
      {/* ── Existing categories ── */}
      <div className="cats-section">
        <h2 className="section-title-sm">Categorias existentes</h2>
        <div className="cats-grid">
          {defaultCategories.map(cat => {
            const iconKey = NAME_TO_ICON[cat.name] ?? 'Tag';
            const Icon = ICON_MAP[iconKey] ?? Tag;
            return (
              <div key={cat.id} className="cat-chip-item">
                <div className="cat-chip-icon" style={{ background: cat.color }}>
                  <Icon size={16} color="white" />
                </div>
                <span className="cat-chip-name">{cat.name}</span>
              </div>
            );
          })}
          {userCats.map(cat => {
            const Icon = ICON_MAP[cat.iconKey] ?? Tag;
            return (
              <div key={cat.id} className="cat-chip-item new">
                <div className="cat-chip-icon" style={{ background: cat.color }}>
                  <Icon size={16} color="white" />
                </div>
                <span className="cat-chip-name">{cat.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="cats-divider" />

      {/* ── Create ── */}
      <div className="cats-create-section">
        <h2 className="section-title-sm">Nova categoria</h2>

        {success && (
          <div className="cats-success">
            <CheckCircle size={15} />
            {success}
          </div>
        )}

        <div className="create-layout">
          {/* Name */}
          <div className="create-field full-width">
            <label>Nome</label>
            <input
              type="text"
              className="cat-name-input"
              placeholder="Ex: Pets, Viagens, Streaming..."
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          {/* Icon + Color + Preview row */}
          <div className="create-row">
            {/* Icon picker */}
            <div className="icon-picker-block">
              <label>Ícone</label>
              <input
                type="text"
                className="icon-search"
                placeholder="Buscar ícone..."
                value={iconSearch}
                onChange={e => setIconSearch(e.target.value)}
              />
              <div className="icon-grid">
                {filteredIcons.map(([key, Icon]) => (
                  <button
                    key={key}
                    title={key}
                    className={`icon-option ${selectedIcon === key ? 'selected' : ''}`}
                    style={selectedIcon === key ? { background: color + '22', color, borderColor: color } : {}}
                    onClick={() => setSelectedIcon(key)}
                  >
                    <Icon size={18} />
                  </button>
                ))}
                {filteredIcons.length === 0 && (
                  <span className="icon-empty">Nenhum ícone encontrado</span>
                )}
              </div>
            </div>

            {/* Color wheel */}
            <div className="color-picker-block">
              <label>Cor</label>
              <ColorWheel hex={color} onChange={setColor} />
            </div>

            {/* Preview */}
            <div className="preview-block">
              <label>Preview</label>
              <div className="cat-preview-circle" style={{ background: color }}>
                <SelectedIconComp size={32} color="white" />
              </div>
              <span className="cat-preview-name">{name || 'Nome'}</span>
              <div className="cat-preview-chip" style={{ background: color + '22', borderColor: color + '66' }}>
                <div className="cat-chip-icon-sm" style={{ background: color }}>
                  <SelectedIconComp size={12} color="white" />
                </div>
                <span style={{ color }}>{name || 'Nome'}</span>
              </div>
            </div>
          </div>

          <button
            className="btn-create-cat"
            style={{ background: color }}
            onClick={handleCreate}
            disabled={!name.trim()}
          >
            <Plus size={16} />
            Criar Categoria
          </button>
        </div>
      </div>
    </div>
  );
}
