/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Utensils, 
  ShoppingCart, 
  MapPin, 
  Info, 
  Phone, 
  Star, 
  ChevronRight, 
  ArrowLeft,
  X,
  Plus,
  Minus,
  MessageCircle,
  Clock,
  Instagram,
  Facebook,
  Award,
  Tag,
  Coffee,
  Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface MenuItem {
  id: string;
  name: string;
  description: string;
  benefits?: string;
  price: number;
  image: string;
  category: string;
  isPopular?: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

enum View {
  HOME = 'home',
  MENU = 'menu',
  ORDERS = 'orders',
  POPULAR = 'popular',
  PROMOS = 'promos',
  ABOUT = 'about',
  LOCATION = 'location',
  CONTACT = 'contact',
  DRINKS = 'drinks'
}

// --- Data ---

const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Carne de Sol Completa',
    description: 'Acompanha: arroz, feijão, macarrão, purê, farofa e salada.',
    benefits: 'Acompanha: arroz, feijão, macarrão, purê, farofa e salada.',
    price: 20.00,
    image: 'https://lh3.googleusercontent.com/d/1vsHCEDnWTmz2eTN561Nj5osiFRS-EkUu',
    category: 'Principais',
    isPopular: true
  },
  {
    id: '2',
    name: 'Bisteca Bovina Especial',
    description: 'Acompanha: arroz, feijão, macarrão, purê, farofa e salada.',
    benefits: 'Acompanha: arroz, feijão, macarrão, purê, farofa e salada.',
    price: 20.00,
    image: 'https://lh3.googleusercontent.com/d/1ZgfnYe3MTyL1J6kJ8HeXqbt1qBsUl-pX',
    category: 'Principais'
  },
  {
    id: '3',
    name: 'Bisteca Suína',
    description: 'Acompanha: arroz, feijão, macarrão, purê, farofa e salada.',
    benefits: 'Acompanha: arroz, feijão, macarrão, purê, farofa e salada.',
    price: 20.00,
    image: 'https://lh3.googleusercontent.com/d/1Ki-kjPmkR_636L_9WUqqwJd1qz5uuq7G',
    category: 'Principais'
  },
  {
    id: '4',
    name: 'Assado de Panela',
    description: 'Acompanha: arroz, feijão, macarrão, purê, farofa e salada.',
    benefits: 'Acompanha: arroz, feijão, macarrão, purê, farofa e salada.',
    price: 20.00,
    image: 'https://lh3.googleusercontent.com/d/1FO2J2ZhaTjcSDJ7RN8KbXa5xvW-XIEC5',
    category: 'Principais'
  },
  {
    id: '5',
    name: 'Frango Assado na Brasa',
    description: 'Acompanha: arroz, feijão, macarrão, purê, farofa e salada.',
    benefits: 'Acompanha: arroz, feijão, macarrão, purê, farofa e salada.',
    price: 20.00,
    image: 'https://lh3.googleusercontent.com/d/1cjoeoXVF3YhPeXXSTQR6fbvaHOj7F5jW',
    category: 'Principais',
    isPopular: true
  },
  {
    id: '6',
    name: 'Frango Cozido',
    description: 'Acompanha: arroz, feijão, macarrão, purê, farofa e salada.',
    benefits: 'Acompanha: arroz, feijão, macarrão, purê, farofa e salada.',
    price: 20.00,
    image: 'https://lh3.googleusercontent.com/d/1dYu03xa4oUd6Qy97VsKnk7a3cMR6wFtV',
    category: 'Principais'
  },
  {
    id: '7',
    name: 'Fígado Acebolado',
    description: 'Acompanha: arroz, feijão, macarrão, purê, farofa e salada.',
    benefits: 'Acompanha: arroz, feijão, macarrão, purê, farofa e salada.',
    price: 20.00,
    image: 'https://lh3.googleusercontent.com/d/1QAop3f4zRoVJ8U-_rHx_Nasgo8exWQsS',
    category: 'Principais'
  },
  {
    id: '8',
    name: 'Peixe Cozido',
    description: 'Acompanha: arroz, feijão, macarrão, purê, farofa e salada.',
    benefits: 'Acompanha: arroz, feijão, macarrão, purê, farofa e salada.',
    price: 20.00,
    image: 'https://lh3.googleusercontent.com/d/1bdfYfcgFFP5khS-YxnhgGkyamjK7pctq',
    category: 'Principais'
  },
  {
    id: '9',
    name: 'Peixe Frito',
    description: 'Acompanha: arroz, feijão, macarrão, purê, farofa e salada.',
    benefits: 'Acompanha: arroz, feijão, macarrão, purê, farofa e salada.',
    price: 20.00,
    image: 'https://lh3.googleusercontent.com/d/1vw2JpUh0gO9ZM1du1SvUpEl6AoYQG3Kh',
    category: 'Principais'
  },
  {
    id: '10',
    name: 'Churrasco: Carne e Toscana',
    description: 'Acompanha: arroz, feijão, macarrão, purê, farofa e salada.',
    benefits: 'Acompanha: arroz, feijão, macarrão, purê, farofa e salada.',
    price: 20.00,
    image: 'https://lh3.googleusercontent.com/d/1SER4WbgBxeMvDPRXKHbAOIPPAURwwdNs',
    category: 'Principais',
    isPopular: true
  },
  {
    id: '11',
    name: 'Suco de Graviola',
    description: 'Suco natural da fruta. Opção: Com leite ou Sem leite.',
    benefits: 'A graviola é rica em fibras, melhora a digestão, fortalece o sistema imunológico e fornece energia natural para o seu dia.',
    price: 12.00,
    image: 'https://lh3.googleusercontent.com/d/1_Dx6EqyUzehIw9o_j-h6egfHZWaUdlPa',
    category: 'Bebidas'
  },
  {
    id: '13',
    name: 'Suco de Maracujá',
    description: 'Suco natural da fruta. Opção: Com leite ou Sem leite.',
    benefits: 'Conhecido por ser um calmante natural, o maracujá também é rico em Vitamina C, A e complexo B, ajudando no relaxamento e saúde da pele.',
    price: 10.00,
    image: 'https://lh3.googleusercontent.com/d/1w9ckfOJTqHHNR_4O-JQ7iPsJccKRuX5w',
    category: 'Bebidas'
  },
  {
    id: '14',
    name: 'Suco de Cupuaçu',
    description: 'Suco natural da fruta. Opção: Com leite ou Sem leite.',
    benefits: 'O cupuaçu é um "superfruto" que estimula o sistema imunológico, aumenta a energia e ajuda a reduzir o colesterol ruim.',
    price: 10.00,
    image: 'https://lh3.googleusercontent.com/d/1Vuqha8yFgxaF08tXc7bpcqNggYdpE5T4',
    category: 'Bebidas'
  },
  {
    id: '15',
    name: 'Suco de Manga',
    description: 'Suco natural da fruta. Opção: Com leite ou Sem leite.',
    benefits: 'A manga auxilia na saúde dos olhos, melhora a digestão e é rica em antioxidantes que combatem o envelhecimento precoce.',
    price: 10.00,
    image: 'https://lh3.googleusercontent.com/d/1PtSsDsky_sgbc8LBPBxhW5IhOWLOQQ3i',
    category: 'Bebidas'
  },
  {
    id: '16',
    name: 'Suco de Acerola',
    description: 'Suco natural da fruta. Opção: Com leite ou Sem leite.',
    benefits: 'A acerola é uma campeã em Vitamina C, essencial para prevenir gripes e resfriados e fortalecer os vasos sanguíneos.',
    price: 10.00,
    image: 'https://lh3.googleusercontent.com/d/1TzshLooX3D6e0fC3no1i796LIPDo0nnu',
    category: 'Bebidas'
  },
  {
    id: '17',
    name: 'Suco de Cajá',
    description: 'Suco natural da fruta. Opção: Com leite ou Sem leite.',
    benefits: 'Rico em ferro e cálcio, o cajá ajuda a prevenir anemia e fortalece os ossos, além de ser refrescante e nutritivo.',
    price: 10.00,
    image: 'https://lh3.googleusercontent.com/d/1my0Q_boDiWeZojqN6arL4pgQL1i7CG1w',
    category: 'Bebidas'
  },
  {
    id: '18',
    name: 'Suco de Goiaba',
    description: 'Suco natural da fruta. Opção: Com leite ou Sem leite.',
    benefits: 'A goiaba é rica em licopeno e fibras, ajudando no controle do açúcar no sangue e mantendo a saúde do coração em dia.',
    price: 10.00,
    image: 'https://lh3.googleusercontent.com/d/1g4SGEv7zaYSp4t3p_Y7N0vuySoa6P4LZ',
    category: 'Bebidas'
  },
  {
    id: '19',
    name: 'Coca-Cola (Lata)',
    description: 'Refrigerante 350ml bem gelado.',
    price: 6.00,
    image: 'https://lh3.googleusercontent.com/d/14F8iMWuMWyM7SzQbewG2UNBUUOpeqipc',
    category: 'Bebidas'
  },
  {
    id: '20',
    name: 'Pepsi (Lata)',
    description: 'Refrigerante 350ml bem gelado.',
    price: 6.00,
    image: 'https://lh3.googleusercontent.com/d/1A6qWpKC-V-SgMC4ZofS5b3FRJ6Rywvp2',
    category: 'Bebidas'
  },
  {
    id: '21',
    name: 'Guaraná Jesus (Lata)',
    description: 'O sabor maranhense! 350ml.',
    price: 6.00,
    image: 'https://lh3.googleusercontent.com/d/1I0-1zJF59w94QzGJpMCyNS-wJJ3fBo-f',
    category: 'Bebidas'
  },
  {
    id: '22',
    name: 'Fanta Laranja (Lata)',
    description: 'Refrigerante 350ml bem gelado.',
    price: 6.00,
    image: 'https://lh3.googleusercontent.com/d/1Bx5YZI0Nt-O09BEimVloyhNMwpvle7Yr',
    category: 'Bebidas'
  },
  {
    id: '23',
    name: 'Fanta Uva (Lata)',
    description: 'Refrigerante 350ml bem gelado.',
    price: 6.00,
    image: 'https://lh3.googleusercontent.com/d/1gmSGIYVfrCkdNQWma95EZkoYvHBbKpZJ',
    category: 'Bebidas'
  }
];

const PROMOTIONS = [
  {
    id: 'p1',
    title: 'Combo Almoço Executivo',
    description: 'Frango Assado + Refrigerante 350ml por apenas R$ 35,00',
    discount: '15% OFF'
  },
  {
    id: 'p2',
    title: 'Fidelidade Nordestina',
    description: 'Peça 10 pratos e ganhe uma Carne de Sol Completa!',
    discount: 'CAMPANHA'
  }
];

// --- Components ---

export default function App() {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBenefits, setSelectedBenefits] = useState<MenuItem | null>(null);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = () => {
    const message = `Olá! Gostaria de fazer um pedido no Tempero Nordestino:\n\n` +
      cart.map(i => `- ${i.quantity}x ${i.name} (R$ ${(i.price * i.quantity).toFixed(2)})`).join('\n') +
      `\n\nTotal: R$ ${cartTotal.toFixed(2)}\n\nEndereço de entrega: `;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5598999999999?text=${encoded}`, '_blank');
  };

  const renderView = () => {
    switch (currentView) {
      case View.HOME:
        return <HomeView setView={setCurrentView} />;
      case View.MENU:
        return <MenuView onAdd={addToCart} onBack={() => setCurrentView(View.HOME)} onShowBenefits={(item) => setSelectedBenefits(item)} />;
      case View.ORDERS:
        return <OrdersView cart={cart} onAdd={addToCart} onRemove={removeFromCart} onCheckout={handleCheckout} onBack={() => setCurrentView(View.HOME)} />;
      case View.POPULAR:
        return <PopularView items={MENU_ITEMS.filter(i => i.isPopular)} onAdd={addToCart} onBack={() => setCurrentView(View.HOME)} onShowBenefits={(item) => setSelectedBenefits(item)} />;
      case View.PROMOS:
        return <PromosView promos={PROMOTIONS} onBack={() => setCurrentView(View.HOME)} />;
      case View.ABOUT:
        return <AboutView onBack={() => setCurrentView(View.HOME)} />;
      case View.LOCATION:
        return <LocationView onBack={() => setCurrentView(View.HOME)} />;
      case View.CONTACT:
        return <ContactView onBack={() => setCurrentView(View.HOME)} />;
      case View.DRINKS:
        return <DrinksView onAdd={addToCart} onBack={() => setCurrentView(View.HOME)} onShowBenefits={(item) => setSelectedBenefits(item)} />;
      default:
        return <HomeView setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto shadow-2xl relative overflow-hidden nordeste-pattern">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 max-w-md mx-auto bg-primary text-white z-40 heavy-border-bottom flex flex-col px-6 py-6 pb-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col cursor-pointer" onClick={() => setCurrentView(View.HOME)}>
            <h1 className="text-4xl text-white leading-[0.8] mb-1">
              Tempero<br />Nordestino
            </h1>
            <p className="text-[10px] font-bold opacity-80 letter-spacing-[0.05em]">Desde 2010 • Arari - MA</p>
          </div>
          
          <button 
            onClick={() => setCurrentView(View.ORDERS)}
            className="relative p-3 bg-accent text-white border-2 border-white hover:bg-gray-900 transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-white text-primary text-[10px] font-black w-5 h-5 border-2 border-primary flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
        </div>
        <div className="bg-black text-[10px] font-bold py-1 px-3 self-end inline-block uppercase tracking-widest text-white">
          Comida Caseira Legitima
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-44 pb-24 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.15 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Benefits Modal */}
      <AnimatePresence>
        {selectedBenefits && (
          <BenefitsModal 
            item={selectedBenefits} 
            onClose={() => setSelectedBenefits(null)} 
          />
        )}
      </AnimatePresence>

      {/* Credit Line */}
      <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto pointer-events-none z-30 flex justify-center px-6">
        <div className="bg-white/90 backdrop-blur-sm border border-accent/20 px-3 py-1 flex items-center gap-2 shadow-sm">
          <span className="text-[8px] font-black uppercase tracking-widest text-accent/50">Exclusive App • Created by Jonatas Eduardo</span>
        </div>
      </div>

      {/* Persistent Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-accent text-white border-t-4 border-primary flex justify-around py-3 px-6 z-40">
        <NavButton active={currentView === View.HOME} icon={<Utensils />} label="Início" onClick={() => setCurrentView(View.HOME)} />
        <NavButton active={currentView === View.MENU} icon={<Award />} label="Cardápio" onClick={() => setCurrentView(View.MENU)} />
        <NavButton active={currentView === View.ORDERS} icon={<ShoppingCart />} label="Pedidos" onClick={() => setCurrentView(View.ORDERS)} />
        <NavButton active={currentView === View.LOCATION} icon={<MapPin />} label="Onde" onClick={() => setCurrentView(View.LOCATION)} />
      </nav>
    </div>
  );
}

function NavButton({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-primary' : 'text-white/60 hover:text-white'}`}
    >
      {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
      <span className="text-[10px] font-black uppercase tracking-wider">{label}</span>
    </button>
  );
}

// --- View Helpers ---

function SectionHeader({ title, onBack }: { title: string, onBack: () => void }) {
  return (
    <div className="flex items-center gap-4 mb-8 bg-white border-2 border-accent p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
      <button onClick={onBack} className="p-1 hover:bg-gray-100 transition-colors">
        <ArrowLeft className="w-6 h-6 text-primary" />
      </button>
      <h2 className="text-2xl font-black text-gray-900 uppercase m-0">{title}</h2>
    </div>
  );
}

// --- Home View ---

function HomeView({ setView }: { setView: (v: View) => void }) {
  return (
    <div className="space-y-6">
      {/* Flyer Destaque - VERSÃO MAXIMIZADA */}
      <div className="px-6">
        <div className="bg-accent text-white overflow-hidden mb-4 border-2 border-primary py-1">
          <div className="whitespace-nowrap animate-marquee flex gap-8 font-black uppercase text-xs">
            <span>Aplicativo Exclusivo • Tempero Nordestino • Aplicativo Exclusivo • Tempero Nordestino • Aplicativo Exclusivo • Tempero Nordestino</span>
            <span>Aplicativo Exclusivo • Tempero Nordestino • Aplicativo Exclusivo • Tempero Nordestino • Aplicativo Exclusivo • Tempero Nordestino</span>
          </div>
        </div>

        {/* DELIVERY HIGHLIGHT */}
        <div className="bg-primary text-white p-4 border-4 border-accent shadow-[6px_6px_0_0_rgba(0,0,0,1)] mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Truck className="w-5 h-5" />
              <span className="font-black uppercase tracking-tighter text-sm">Delivery Aberto</span>
            </div>
            <p className="text-[10px] font-bold uppercase opacity-90">Peça agora no conforto da sua casa!</p>
          </div>
          <button 
            onClick={() => setView(View.MENU)}
            className="bg-white text-accent font-black text-xs px-3 py-2 border-2 border-accent shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all uppercase"
          >
            Fazer Pedido
          </button>
        </div>

        <motion.div 
          initial={{ rotate: -1, scale: 0.95 }}
          animate={{ rotate: 0, scale: 1 }}
          className="bg-white border-4 border-accent p-3 shadow-[12px_12px_0_0_rgba(211,47,47,1)] mb-6 overflow-hidden"
        >
          <div 
            className="aspect-[3/4] bg-white border-4 border-accent overflow-hidden relative"
          >
            <img 
              src="https://lh3.googleusercontent.com/d/1ndBUVNX6IZ8-MNxrApnYbXi07uAcUilq" 
              alt="Flyer Tempero Nordestino" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>

      {/* Featured Suggestion */}
      <div className="px-6">
        <div className="bg-white border-4 border-primary p-6 relative">
          <span className="bg-primary text-white px-3 py-1 text-[10px] font-black absolute -top-3 right-4 uppercase tracking-tighter">
            Sugestão de Hoje
          </span>
          <h2 className="text-2xl mb-2">Carne de Sol Completa</h2>
          <p className="text-gray-600 text-sm mb-4 font-medium">Acompanha: arroz, feijão, macarrão, purê, farofa e salada.</p>
          <div className="flex justify-between items-center">
             <span className="text-3xl font-black text-primary italic">R$ 20,00</span>
             <button onClick={() => setView(View.MENU)} className="btn-accent py-2 px-4 text-xs">Pedir Agora</button>
          </div>
        </div>
      </div>

      {/* Highlight Delivery Section */}
      <div className="px-6 mb-2">
        <button 
          onClick={() => setView(View.MENU)}
          className="w-full bg-primary text-white border-4 border-accent p-4 shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white text-primary p-2 border-2 border-accent group-hover:rotate-12 transition-transform">
              <Truck className="w-8 h-8" />
            </div>
            <div className="text-left">
              <h3 className="font-black text-xl uppercase italic leading-none">Peça Delivery</h3>
              <p className="text-[10px] font-bold uppercase opacity-80 mt-1 tracking-widest">Entrega rápida em toda região</p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Grid Menu */}
      <div className="px-6 grid grid-cols-2 gap-4">
        <GridButton 
          icon={<Utensils className="w-8 h-8" />} 
          label="Cardápio" 
          onClick={() => setView(View.MENU)} 
          isBlack
        />
        <GridButton 
          icon={<Coffee className="w-8 h-8" />} 
          label="Bebidas" 
          onClick={() => setView(View.DRINKS)} 
        />
        <GridButton 
          icon={<ShoppingCart className="w-8 h-8" />} 
          label="Pedidos" 
          onClick={() => setView(View.ORDERS)} 
        />
        <GridButton 
          icon={<Star className="w-8 h-8" />} 
          label="Favoritos" 
          onClick={() => setView(View.POPULAR)} 
        />
        <GridButton 
          icon={<Tag className="w-8 h-8" />} 
          label="Promoções" 
          onClick={() => setView(View.PROMOS)} 
        />
        <GridButton 
          icon={<MapPin className="w-8 h-8" />} 
          label="Onde Estamos" 
          onClick={() => setView(View.LOCATION)} 
        />
        <div className="col-span-2">
          <GridButton 
            icon={<Info className="w-8 h-8" />} 
            label="Sobre Nossa História" 
            onClick={() => setView(View.ABOUT)} 
          />
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-6 pb-6">
        <button 
          onClick={() => setView(View.CONTACT)}
          className="btn-primary w-full bg-[#25D366] border-black text-white hover:bg-[#128C7E]"
        >
          <MessageCircle className="w-6 h-6" />
          FALE CONOSCO NO WHATSAPP
        </button>
      </div>
    </div>
  );
}

function GridButton({ icon, label, onClick, isBlack = false }: { icon: React.ReactNode, label: string, onClick: () => void, isBlack?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`p-6 border-4 border-accent flex flex-col justify-between items-start h-32 transition-all hover:bg-primary group ${isBlack ? 'bg-accent text-white border-primary' : 'bg-white text-accent'}`}
    >
      <div className={`transition-colors ${isBlack ? 'text-white' : 'text-primary group-hover:text-white'}`}>{icon}</div>
      <span className={`font-black uppercase tracking-tighter text-sm transition-colors ${isBlack ? 'text-white' : 'text-accent group-hover:text-white'}`}>{label}</span>
    </button>
  );
}

// --- Menu View ---

function MenuView({ onAdd, onBack, onShowBenefits }: { onAdd: (item: MenuItem) => void, onBack: () => void, onShowBenefits: (item: MenuItem) => void }) {
  return (
    <div className="px-6 space-y-6 pb-12">
      <SectionHeader title="Cardápio" onBack={onBack} />
      <div className="space-y-6">
        {MENU_ITEMS.map(item => (
          <BrutalistFoodCard key={item.id} item={item} onAdd={() => onAdd(item)} onShowBenefits={() => onShowBenefits(item)} />
        ))}
      </div>
    </div>
  );
}

function BrutalistFoodCard({ item, onAdd, onShowBenefits }: { item: MenuItem, onAdd: () => void, onShowBenefits?: () => void, key?: React.Key }) {
  return (
    <div className="bg-white border-2 border-accent overflow-hidden relative shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
      <div 
        className={`h-40 bg-gray-100 overflow-hidden relative cursor-pointer ${item.benefits ? 'group' : ''}`}
        onClick={item.benefits ? onShowBenefits : undefined}
      >
        <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
        {item.benefits && (
          <div className="absolute top-2 left-2 bg-primary text-white p-1 shadow-[2px_2px_0_0_rgba(0,0,0,1)] animate-pulse">
            <Info className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="p-4 bg-white border-t-2 border-accent">
        <div className="flex justify-between items-start mb-2">
          <h3 
            className={`text-xl leading-none ${item.benefits ? 'cursor-pointer hover:text-primary transition-colors' : ''}`}
            onClick={item.benefits ? onShowBenefits : undefined}
          >
            {item.name}
          </h3>
          <span className="text-xl font-black text-primary italic">R$ {item.price.toFixed(2)}</span>
        </div>
        <p className="text-gray-500 text-xs mb-4 uppercase font-bold tracking-tight">{item.description}</p>
        <div className="flex flex-col gap-2">
          {item.benefits && (
            <button 
              onClick={onShowBenefits}
              className="w-full text-[10px] font-black p-1 mb-1 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all uppercase tracking-tighter"
            >
              {item.category === 'Principais' ? 'Clique para ver os acompanhamentos!' : 'Clique para ver os benefícios à saúde!'}
            </button>
          )}
          <button 
            onClick={onAdd}
            className="btn-accent w-full py-2 flex items-center justify-center gap-2 text-xs"
          >
            <Plus className="w-4 h-4" /> ADICIONAR AO PEDIDO
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Orders View ---

function OrdersView({ cart, onAdd, onRemove, onCheckout, onBack }: { cart: CartItem[], onAdd: (item: MenuItem) => void, onRemove: (id: string) => void, onCheckout: () => void, onBack: () => void }) {
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="px-6 space-y-6 flex flex-col">
      <SectionHeader title="Sua Cesta" onBack={onBack} />

      {cart.length === 0 ? (
        <div className="border-4 border-dashed border-gray-200 p-12 text-center flex flex-col items-center gap-4">
          <ShoppingCart className="w-12 h-12 text-gray-200" />
          <p className="font-black text-gray-300 uppercase italic">Vazio...</p>
          <button onClick={onBack} className="btn-outline w-full">VOLTAR AO CARDÁPIO</button>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="border-2 border-accent p-4 bg-white flex justify-between items-center shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <div>
                <h4 className="font-black uppercase text-sm">{item.name}</h4>
                <p className="text-primary font-black italic">R$ {(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-3 border-2 border-accent bg-gray-50 p-1">
                <button onClick={() => onRemove(item.id)} className="p-1 hover:bg-gray-200"><Minus className="w-4 h-4" /></button>
                <span className="font-black text-lg min-w-[30px] text-center">{item.quantity}</span>
                <button onClick={() => onAdd(item)} className="p-1 hover:bg-gray-200"><Plus className="w-4 h-4" /></button>
              </div>
            </div>
          ))}

          <div className="bg-accent text-white p-6 space-y-4 border-l-8 border-primary">
            <div className="flex justify-between items-center text-xs opacity-60 font-bold uppercase tracking-widest">
              <span>Subtotal</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <div className="h-px bg-white/20" />
            <div className="flex justify-between items-end">
              <span className="text-sm font-bold uppercase opacity-80">Total</span>
              <span className="text-4xl font-black italic">R$ {total.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-accent text-white p-4 space-y-2 border-l-8 border-primary shadow-[4px_4px_0_0_rgba(0,0,0,1)] mb-4">
             <div className="flex items-center gap-2 text-primary">
               <Truck className="w-4 h-4 animate-bounce" />
               <span className="text-[10px] font-black uppercase tracking-widest">Opção de Entrega Selecionada</span>
             </div>
             <h4 className="font-black text-lg uppercase italic">Delivery Tempero Nordestino</h4>
             <p className="text-[10px] opacity-70 uppercase font-bold">Rápido, Quente e no Capricho!</p>
          </div>

          <button onClick={onCheckout} className="btn-primary w-full py-5 text-lg shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
            <MessageCircle className="w-6 h-6" />
            ENVIAR PEDIDO AGORA
          </button>
        </div>
      )}
    </div>
  );
}

// --- Popular View ---

function PopularView({ items, onAdd, onBack, onShowBenefits }: { items: MenuItem[], onAdd: (item: MenuItem) => void, onBack: () => void, onShowBenefits: (item: MenuItem) => void }) {
  return (
    <div className="px-6 space-y-6 pb-12">
      <SectionHeader title="Mais Pedidos" onBack={onBack} />
      <div className="space-y-6">
        {items.map(item => (
          <BrutalistFoodCard key={item.id} item={item} onAdd={() => onAdd(item)} onShowBenefits={() => onShowBenefits(item)} />
        ))}
      </div>
    </div>
  );
}

// --- Promos View ---

function PromosView({ promos, onBack }: { promos: typeof PROMOTIONS, onBack: () => void }) {
  return (
    <div className="px-6 space-y-6 pb-12">
      <SectionHeader title="Promoções" onBack={onBack} />
      <div className="space-y-6">
        {promos.map(promo => (
          <div key={promo.id} className="bg-white border-4 border-primary p-6 relative">
            <div className="bg-accent text-white px-4 py-1 font-black absolute -top-4 left-4 uppercase tracking-tighter italic">
              {promo.discount}
            </div>
            <h4 className="text-2xl mb-2">{promo.title}</h4>
            <p className="text-gray-600 text-sm font-medium mb-4">{promo.description}</p>
            <button className="bg-primary text-white w-full py-3 font-bold uppercase tracking-widest text-xs border-2 border-accent">
              APROVEITAR AGORA
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- About View ---

function AboutView({ onBack }: { onBack: () => void }) {
  return (
    <div className="px-6 space-y-6 pb-12">
      <SectionHeader title="A Casa" onBack={onBack} />
      
      <div className="space-y-6">
        <div className="border-4 border-accent p-2 bg-white">
          <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=600" alt="Nossa história" className="w-full h-48 object-cover grayscale" />
        </div>
        
        <div className="space-y-6">
          <div className="bg-primary text-white p-4 italic font-black text-xl leading-tight">
            "A MAIOR TRADIÇÃO DE ARARI DESDE 2010. COMIDA RAIZ!"
          </div>
          <div className="space-y-4 text-gray-900 font-bold uppercase text-xs tracking-wider leading-relaxed">
            <p>
              O Tempero Nordestino não é apenas um restaurante. É um ponto de encontro para quem valoriza a culinária maranhense feita no capricho.
            </p>
            <p>
              Ingredientes frescos, tempero de casa e aquele carinho que você já conhece há mais de uma década.
            </p>
          </div>
          
          <div className="bg-accent text-white p-6 border-4 border-primary shadow-[8px_8px_0_0_rgba(0,0,0,1)] mt-8">
            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-70">Desenvolvimento</h5>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary flex items-center justify-center text-white font-black text-xl italic">JE</div>
              <div>
                <p className="text-sm font-black uppercase m-0 leading-none">Jonatas Eduardo</p>
                <p className="text-[8px] font-bold opacity-60 uppercase tracking-tighter">Creator & Developer</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20 text-[10px] font-medium leading-tight">
              ESTE APLICATIVO É UMA FERRAMENTA EXCLUSIVA DESENVOLVIDA PARA O TEMPERO NORDESTINO.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Location View ---

function LocationView({ onBack }: { onBack: () => void }) {
  return (
    <div className="px-6 space-y-6 pb-12">
      <SectionHeader title="Visite-nos" onBack={onBack} />
      
      <div className="border-4 border-accent bg-white p-6 space-y-6">
        <div>
          <h4 className="text-xl mb-1">Centro Arari</h4>
          <p className="text-gray-500 font-bold text-[10px] uppercase tracking-widest">Rua do Posto BR Mania, Centro, Arari - MA</p>
        </div>
        
        <div className="bg-gray-100 border-2 border-accent aspect-[4/3] flex items-center justify-center p-8 grayscale">
           <MapPin className="w-16 h-16 text-primary animate-bounce" />
        </div>
        
        <button 
          onClick={() => window.open('https://maps.google.com/?q=Rua+do+Posto+BR+Mania+Centro+Arari+MA', '_blank')}
          className="btn-accent w-full"
        >
          COMO CHEGAR
        </button>
      </div>
    </div>
  );
}

// --- Contact View ---

function ContactView({ onBack }: { onBack: () => void }) {
  return (
    <div className="px-6 space-y-6 pb-12">
      <SectionHeader title="Contatos" onBack={onBack} />
      <div className="grid grid-cols-1 gap-4">
        <ContactBox icon={<MessageCircle />} label="WhatsApp" value="(98) 99999-9999" href="https://wa.me/5598999999999" />
        <ContactBox icon={<Phone />} label="Telefone" value="(98) 3333-3333" href="tel:559833333333" />
        <ContactBox icon={<Instagram />} label="Instagram" value="@temperonordestino" href="https://instagram.com" />
      </div>
    </div>
  );
}

function ContactBox({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="flex items-center gap-4 border-2 border-accent p-4 bg-white hover:bg-primary hover:text-white transition-all group">
      <div className="bg-primary p-3 text-white group-hover:bg-white group-hover:text-primary transition-all">
        {icon}
      </div>
      <div>
        <h4 className="text-[10px] opacity-60 m-0">{label}</h4>
        <p className="text-lg font-black m-0">{value}</p>
      </div>
    </a>
  );
}

function DrinksView({ onAdd, onBack, onShowBenefits }: { onAdd: (item: MenuItem) => void, onBack: () => void, onShowBenefits: (item: MenuItem) => void }) {
  const drinks = MENU_ITEMS.filter(item => item.category === 'Bebidas');
  
  return (
    <div className="px-6 space-y-6 pb-12">
      <SectionHeader title="Bebidas" onBack={onBack} />
      <div className="space-y-6">
        {drinks.map(item => (
          <BrutalistFoodCard key={item.id} item={item} onAdd={() => onAdd(item)} onShowBenefits={() => onShowBenefits(item)} />
        ))}
      </div>
    </div>
  );
}

function BenefitsModal({ item, onClose }: { item: MenuItem, onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white border-4 border-primary p-6 max-w-sm w-full shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="bg-primary text-white p-2">
            <Award className="w-6 h-6" />
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 border-2 border-accent">
            <X className="w-6 h-6" />
          </button>
        </div>

        <h3 className="text-3xl font-black uppercase italic leading-none mb-2">{item.name}</h3>
        <div className="bg-accent text-white px-3 py-1 inline-block text-[10px] font-black uppercase tracking-widest mb-4">
          {item.category === 'Principais' ? 'Acompanhamentos do Prato' : 'Benefícios à Saúde'}
        </div>

        <div className="Nordeste-divider my-4" />

        <p className="text-gray-800 font-medium leading-relaxed italic border-l-4 border-primary pl-4 py-2">
          {item.category === 'Principais' ? item.benefits : `"${item.benefits}"`}
        </p>

        <button 
          onClick={onClose}
          className="btn-accent w-full mt-6 py-3 font-black"
        >
          {item.category === 'Principais' ? 'QUE DELÍCIA!' : 'MAIS SAÚDE, POR FAVOR!'}
        </button>
      </motion.div>
    </motion.div>
  );
}

