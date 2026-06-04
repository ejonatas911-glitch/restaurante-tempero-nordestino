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
  },
  {
    id: '24',
    name: 'Coca-Cola (2L)',
    description: 'Refrigerante de 2L bem gelado para acompanhar seu pedido.',
    price: 10.00,
    image: 'https://lh3.googleusercontent.com/d/11yWL9ZzIU8YxwxHRqlmb7itB1uDrSQVG',
    category: 'Bebidas'
  },
  {
    id: '25',
    name: 'Coca-Cola Retornável (1L)',
    description: 'Refrigerante retornável de 1L bem gelado para acompanhar sua refeição.',
    price: 8.00,
    image: 'https://lh3.googleusercontent.com/d/1uCB1R90xe-VieYxV_hgdlVqwql7MUhcN',
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
  const [restaurantAddress, setRestaurantAddress] = useState<string>(() => {
    return localStorage.getItem('restaurant_address') || 'Rua do Posto BR Mania, Centro, Arari - MA';
  });

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
    window.open(`https://wa.me/5598981049475?text=${encoded}`, '_blank');
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
        return (
          <LocationView 
            address={restaurantAddress} 
            onAddressChange={(newAddr) => {
              setRestaurantAddress(newAddr);
              localStorage.setItem('restaurant_address', newAddr);
            }} 
            onBack={() => setCurrentView(View.HOME)} 
          />
        );
      case View.CONTACT:
        return <ContactView onBack={() => setCurrentView(View.HOME)} />;
      case View.DRINKS:
        return <DrinksView onAdd={addToCart} onBack={() => setCurrentView(View.HOME)} onShowBenefits={(item) => setSelectedBenefits(item)} />;
      default:
        return <HomeView setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-orange-50/10 flex flex-col max-w-md mx-auto shadow-2xl relative overflow-hidden nordeste-pattern pb-28 animate-fade-in">
      {/* Header - Modern curved premium food bar */}
      <header className="fixed top-0 left-0 right-0 max-w-md mx-auto bg-gradient-to-b from-primary to-primary-dark text-white z-40 rounded-b-3xl shadow-lg shadow-orange-900/20 flex flex-col px-6 py-5 pb-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView(View.HOME)}>
            <div className="w-11 h-11 rounded-xl bg-white overflow-hidden flex items-center justify-center border border-white/25 shadow-md">
              <img 
                src="https://lh3.googleusercontent.com/d/1ndBUVNX6IZ8-MNxrApnYbXi07uAcUilq" 
                alt="Logo Tempero Nordestino" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-display font-black tracking-tight text-white leading-tight">
                Tempero <span className="text-orange-300">Nordestino</span>
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <p className="text-[9px] font-bold tracking-wider text-orange-100 uppercase opacity-95">Comida Caseira • Desde 2010</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setCurrentView(View.ORDERS)}
            className="relative p-3.5 rounded-full bg-white text-slate-900 border border-orange-100 shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <ShoppingCart className="w-5 h-5 text-primary" />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-black w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shadow"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-32 pb-4 overflow-y-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full"
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
      <div className="fixed bottom-24 left-0 right-0 max-w-md mx-auto pointer-events-none z-30 flex justify-center px-6">
        <div className="bg-white/95 backdrop-blur-md border border-orange-100 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
          <span className="text-[9px] font-bold tracking-tight text-slate-500">App Exclusivo • Criado por Jonatas Eduardo</span>
        </div>
      </div>

      {/* Persistent Navigation - Glass-morphic Rounded Floating Tab Bar */}
      <nav className="fixed bottom-4 left-6 right-6 max-w-[calc(100vw-3rem)] md:max-w-[25rem] mx-auto bg-white/95 backdrop-blur-md rounded-2xl border border-orange-100/50 flex justify-around py-2 px-2 z-40 shadow-xl shadow-slate-900/10">
        <NavButton active={currentView === View.HOME} icon={<Utensils />} label="Início" onClick={() => setCurrentView(View.HOME)} />
        <NavButton active={currentView === View.MENU} icon={<Award />} label="Cardápio" onClick={() => setCurrentView(View.MENU)} />
        <NavButton active={currentView === View.DRINKS} icon={<Coffee />} label="Bebidas" onClick={() => setCurrentView(View.DRINKS)} />
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
      className={`flex flex-col items-center gap-1 transition-all duration-300 px-3 py-1.5 rounded-xl ${
        active 
          ? 'text-primary scale-105 font-semibold bg-orange-50/50' 
          : 'text-slate-400 hover:text-slate-600 hover:scale-105'
      }`}
    >
      {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5 transition-transform duration-300' })}
      <span className="text-[9px] font-bold tracking-tight uppercase">{label}</span>
    </button>
  );
}

// --- View Helpers ---

function SectionHeader({ title, onBack }: { title: string, onBack: () => void }) {
  return (
    <div className="flex items-center gap-4 mb-6 bg-white/70 backdrop-blur-md border border-orange-100/50 p-3.5 rounded-2xl shadow-sm">
      <button onClick={onBack} className="p-2.5 rounded-xl text-primary bg-orange-50/70 hover:bg-orange-100/70 transition-all duration-300">
        <ArrowLeft className="w-5 h-5" />
      </button>
      <h2 className="text-lg font-display font-black text-slate-800 m-0 uppercase tracking-tight">{title}</h2>
    </div>
  );
}

// --- Home View ---

function HomeView({ setView }: { setView: (v: View) => void }) {
  return (
    <div className="space-y-6 pb-12">
      {/* Modern Top Info Banner */}
      <div className="px-6">
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white overflow-hidden mb-5 rounded-2xl shadow-sm py-2 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-200 animate-ping"></span>
            <span className="font-display font-bold text-xs uppercase tracking-wider">DELIVERY FREE</span>
          </div>
          <span className="text-base bg-white/20 px-2.5 py-1 rounded-full flex items-center justify-center">🏍️</span>
        </div>

        {/* Premium Styled Flyer Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#FAF7F2] border border-orange-100 p-3.5 rounded-3xl shadow-lg mb-6 group relative overflow-hidden"
        >
          <div className="bg-white rounded-2xl overflow-hidden shadow-inner relative flex items-center justify-center p-1.5 border border-orange-50">
            <img 
              src="https://lh3.googleusercontent.com/d/1ndBUVNX6IZ8-MNxrApnYbXi07uAcUilq" 
              alt="Flyer Tempero Nordestino" 
              className="w-full h-auto object-contain max-h-[400px] rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>

      {/* Featured Suggestion Card */}
      <div className="px-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-850 text-white rounded-3xl p-6 relative shadow-xl overflow-hidden">
          {/* Subtle light leak decoration background */}
          <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-primary/20 blur-2xl"></div>
          
          <span className="bg-primary text-[10px] font-display font-extrabold px-3 py-1 rounded-full absolute top-5 right-5 uppercase tracking-wider">
            Recomendado
          </span>
          
          <p className="text-orange-400 font-display font-bold text-xs uppercase tracking-widest mb-1">Destaque da Casa</p>
          <h2 className="text-2xl font-display font-extrabold text-white mb-2 leading-snug">Carne de Sol Completa</h2>
          <p className="text-slate-300 text-xs mb-5 font-medium leading-relaxed max-w-[85%]">
            Deliciosa carne curada na casa com arroz soltinho, feijão cremoso, purê e farofa tradicional.
          </p>
          
          <div className="flex justify-between items-center pt-2 border-t border-white/10">
             <div className="flex flex-col">
               <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Preço Especial</span>
               <span className="text-2xl font-display font-black text-orange-200">R$ 20,00</span>
             </div>
             <button 
               onClick={() => setView(View.MENU)} 
               className="bg-white text-slate-900 font-display font-extrabold text-xs px-5 py-3 rounded-xl hover:bg-orange-50 active:scale-95 transition-all duration-300"
             >
               Adicionar
             </button>
          </div>
        </div>
      </div>

      {/* Grid Menu Section */}
      <div className="px-6 space-y-4">
        <h3 className="font-display font-black text-base text-slate-800 uppercase tracking-wider px-1">Navegar por Categorias</h3>
        <div className="grid grid-cols-2 gap-4">
          <GridButton 
            icon={<Utensils className="w-6 h-6" />} 
            label="Cardápio" 
            desc="Pratos quentes e caseiros"
            onClick={() => setView(View.MENU)} 
            isHighlight
          />
          <GridButton 
            icon={<Coffee className="w-6 h-6" />} 
            label="Bebidas" 
            desc="Sucos da fruta e refris"
            onClick={() => setView(View.DRINKS)} 
          />
          <GridButton 
            icon={<ShoppingCart className="w-6 h-6" />} 
            label="Seu Pedido" 
            desc="Ver itens da sacola"
            onClick={() => setView(View.ORDERS)} 
          />
          <GridButton 
            icon={<Star className="w-6 h-6" />} 
            label="Mais Pedidos" 
            desc="Os favoritos de Arari"
            onClick={() => setView(View.POPULAR)} 
          />
          <GridButton 
            icon={<Tag className="w-6 h-6" />} 
            label="Promoções" 
            desc="Combos imbatíveis"
            onClick={() => setView(View.PROMOS)} 
          />
          <GridButton 
            icon={<MapPin className="w-6 h-6" />} 
            label="Localização" 
            desc="Visite nosso restaurante"
            onClick={() => setView(View.LOCATION)} 
          />
        </div>
        
        <div className="pt-2">
          <button 
            onClick={() => setView(View.ABOUT)}
            className="w-full bg-white border border-orange-100 hover:border-orange-200 p-4 rounded-2xl shadow-sm transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="bg-orange-50 text-primary p-2.5 rounded-xl group-hover:rotate-6 transition-transform duration-300">
                <Info className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-display font-bold text-sm text-slate-800">Sobre Nossa História</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Tradição em Arari desde 2010</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Footer Contact Option */}
      <div className="px-6 pb-6">
        <button 
          onClick={() => window.open('https://wa.me/5598981049475', '_blank')}
          className="w-full bg-[#25D366] text-white hover:bg-[#1fbe54] p-4 rounded-2xl font-display font-bold text-sm tracking-wide shadow-lg shadow-green-600/10 hover:shadow-green-600/20 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          FALE CONOSCO NO WHATSAPP
        </button>
      </div>
    </div>
  );
}

function GridButton({ 
  icon, 
  label, 
  desc, 
  onClick, 
  isHighlight = false 
}: { 
  icon: React.ReactNode; 
  label: string; 
  desc: string; 
  onClick: () => void; 
  isHighlight?: boolean; 
}) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-2xl border text-left h-32 flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md group ${
        isHighlight 
          ? 'bg-gradient-to-br from-primary to-orange-700 text-white border-transparent' 
          : 'bg-white text-slate-800 border-orange-100/50 hover:border-orange-200'
      }`}
    >
      <div className={`p-2 rounded-xl w-fit ${
        isHighlight 
          ? 'bg-white/10 text-orange-200 shadow-inner' 
          : 'bg-orange-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300'
      }`}>
        {icon}
      </div>
      <div>
        <span className="font-display font-extrabold text-sm block leading-tight">{label}</span>
        <span className={`text-[9px] block mt-0.5 font-medium ${isHighlight ? 'text-orange-200/85' : 'text-slate-450 text-slate-400'}`}>{desc}</span>
      </div>
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
  const isBeverage = item.category === 'Bebidas';
  const isJuice = isBeverage && item.name.toLowerCase().includes('suco');
  const hasBenefits = item.benefits && (!isBeverage || isJuice);

  return (
    <div className="bg-white border border-orange-100/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
      <div 
        className="h-44 bg-slate-50 overflow-hidden relative cursor-pointer"
        onClick={hasBenefits ? onShowBenefits : undefined}
      >
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            if (item.category === 'Bebidas') {
              if (item.name.toLowerCase().includes('suco')) {
                e.currentTarget.src = "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&auto=format&fit=crop";
              } else {
                e.currentTarget.src = "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop";
              }
            } else {
              e.currentTarget.src = "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop";
            }
          }}
        />
        {/* Category Tag overlay */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-primary font-display font-black text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
          {item.category}
        </div>
        
        {hasBenefits && (
          <div className="absolute top-3 right-3 bg-primary/95 text-white p-2.5 rounded-full shadow-md animate-pulse">
            <Info className="w-3.5 h-3.5" />
          </div>
        )}
      </div>
      <div className="p-5 bg-white space-y-4">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h3 
              className={`text-lg font-display font-black text-slate-800 leading-tight ${hasBenefits ? 'cursor-pointer hover:text-primary transition-colors' : ''}`}
              onClick={hasBenefits ? onShowBenefits : undefined}
            >
              {item.name}
            </h3>
            <span className="text-lg font-display font-black text-primary whitespace-nowrap">R$ {item.price.toFixed(2)}</span>
          </div>
          <p className="text-slate-400 text-xs mt-1.5 font-medium leading-relaxed">{item.description}</p>
        </div>
        
        <div className="space-y-2 pt-1">
          {hasBenefits && (
            <button 
              onClick={onShowBenefits}
              className="w-full text-[9px] font-display font-bold p-2 bg-orange-50/50 text-primary border border-orange-100 hover:bg-orange-100/50 transition-all rounded-xl uppercase tracking-wider"
            >
              {item.category === 'Principais' ? '🔎 Ver Acompanhamentos inclusos' : '🌿 Saúde: Ver benefícios naturais'}
            </button>
          )}
          <button 
            onClick={onAdd}
            className="w-full py-3 rounded-xl bg-accent text-white font-display font-bold text-xs shadow-md shadow-slate-900/5 hover:bg-slate-800 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-1.5"
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
    <div className="px-6 space-y-6 flex flex-col pb-12">
      <SectionHeader title="Sua Cesta" onBack={onBack} />

      {cart.length === 0 ? (
        <div className="border border-dashed border-orange-100 bg-orange-50/10 p-12 rounded-3xl text-center flex flex-col items-center gap-4">
          <div className="p-4 bg-orange-50 text-primary rounded-full">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <p className="font-display font-bold text-slate-405 text-slate-400">Sua cesta está vazia</p>
          <button 
            onClick={onBack} 
            className="w-full mt-2 py-3 rounded-xl bg-primary text-white font-display font-bold text-xs hover:bg-primary-dark transition-colors uppercase"
          >
            VOLTAR AO CARDÁPIO
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Card list */}
          <div className="space-y-3">
            {cart.map(item => (
              <div key={item.id} className="border border-orange-100/55 p-3.5 bg-white rounded-2xl flex justify-between items-center shadow-sm">
                <div>
                  <h4 className="font-display font-black text-slate-800 text-sm">{item.name}</h4>
                  <p className="text-primary font-display font-extrabold text-xs mt-0.5">R$ {(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-3 border border-orange-100 bg-orange-50/30 rounded-xl p-1 shadow-inner">
                  <button onClick={() => onRemove(item.id)} className="p-1.5 hover:bg-orange-100/60 rounded-lg text-slate-500 hover:text-black transition-colors">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-display font-black text-sm min-w-[20px] text-slate-800 text-center">{item.quantity}</span>
                  <button onClick={() => onAdd(item)} className="p-1.5 hover:bg-orange-100/60 rounded-lg text-slate-500 hover:text-black transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery banner option status */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-850 text-white p-5 rounded-2xl space-y-2.5 shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
            <div className="flex items-center gap-2 text-orange-400">
               <Truck className="w-4 h-4 animate-bounce" />
               <span className="text-[10px] font-display font-bold uppercase tracking-wider">Serviço Escolhido</span>
            </div>
            <h4 className="font-display font-extrabold text-sm uppercase">Delivery Inteligente</h4>
            <p className="text-[10px] text-slate-400 font-medium uppercase mt-0.5">Faremos o envio no capricho direto para seu endereço cadastrado!</p>
          </div>

          {/* Subtotal summary card */}
          <div className="bg-white border border-orange-100/60 p-5 rounded-2xl space-y-4 shadow-sm">
            <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase tracking-wider">
              <span>Subtotal dos itens</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <div className="h-px bg-orange-50" />
            <div className="flex justify-between items-end">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Geral</span>
                <span className="text-3xl font-display font-black text-slate-800">R$ {total.toFixed(2)}</span>
              </div>
              <span className="text-[9px] bg-emerald-100/60 text-emerald-700 font-bold px-2 py-1 rounded-md uppercase tracking-wide">Sem taxa de entrega</span>
            </div>
          </div>

          <button 
            onClick={onCheckout} 
            className="w-full py-4 mt-2 rounded-2xl bg-[#25D366] text-white font-display font-extrabold text-sm tracking-wide shadow-lg shadow-green-600/10 hover:shadow-green-600/20 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            ENVIAR PEDIDO AGORA NO WHATSAPP
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
          <div key={promo.id} className="bg-white border border-orange-100/50 p-6 rounded-3xl relative shadow-md overflow-hidden">
            <div className="bg-primary text-white px-3 py-1 font-display font-bold text-[10px] absolute top-4 right-4 uppercase tracking-wider rounded-full shadow-sm">
              {promo.discount} OFF
            </div>
            <span className="text-orange-500 font-display font-extrabold text-[10px] uppercase tracking-widest block mb-1">Oferta do dia</span>
            <h4 className="text-lg font-display font-black text-slate-800 mb-2 leading-snug">{promo.title}</h4>
            <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-5">{promo.description}</p>
            <button className="bg-slate-900 text-white w-full py-3.5 rounded-xl font-display font-bold uppercase tracking-wider text-xs shadow-md hover:bg-slate-805 transition-all">
              Aproveitar Oferta
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
        <div className="border border-orange-100/60 p-2.5 bg-white rounded-3xl shadow-md overflow-hidden">
          <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=600" alt="Nossa história" className="w-full h-48 object-cover rounded-2xl" />
        </div>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-primary to-orange-850 text-white p-5 rounded-2xl shadow-sm text-center font-display font-extrabold italic text-lg leading-relaxed px-6">
            "A maior tradição caseira de Arari desde 2010. Comida feita com amor e raízes!"
          </div>
          <div className="space-y-4 text-slate-600 font-medium text-xs tracking-wide leading-relaxed bg-white/50 p-5 rounded-2xl border border-orange-100/30">
            <p>
              O <strong className="text-primary font-black">Tempero Nordestino</strong> não é apenas um restaurante. É um ponto de encontro tradicional na cidade de Arari - MA para quem valoriza a autêntica culinária regional feita com capricho e tempero familiar maranhense.
            </p>
            <p>
              Ingredientes frescos da região, acompanhamentos deliciosos e aquele carinho caloroso que você já conhece há mais de uma década.
            </p>
          </div>
          
          <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4">
            <h5 className="text-[10px] font-display font-black uppercase tracking-[0.2em] text-orange-400 opacity-90">Engenharia e Desenvolvimento</h5>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-orange-55 flex items-center justify-center text-white font-display font-black text-lg bg-orange-500 shadow-inner">
                JE
              </div>
              <div>
                <p className="text-sm font-display font-black tracking-tight text-white">Jonatas Eduardo</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Creator & Fullstack Developer</p>
              </div>
            </div>
            <div className="pt-3 border-t border-white/10 text-[10px] text-slate-350 leading-relaxed font-medium">
              ESTE APLICATIVO É UMA FERRAMENTA EXCLUSIVA E TOTALMENTE PERSONALIZADA DESENVOLVIDA PARA O RESTAURANTE TEMPERO NORDESTINO.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Location View ---
 
function LocationView({ 
  address, 
  onAddressChange, 
  onBack 
}: { 
  address: string; 
  onAddressChange: (newAddr: string) => void; 
  onBack: () => void; 
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const defaultAddr = 'Rua do Posto BR Mania, Centro, Arari - MA';

  const handleGetLocation = () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!navigator.geolocation) {
      setError('Geolocalização não é suportada por este navegador.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18`,
            {
              headers: {
                'Accept-Language': 'pt-BR,pt;q=0.9',
              }
            }
          );
          
          if (!response.ok) {
            throw new Error('Falha ao conectar com o serviço de mapas.');
          }
          
          const data = await response.json();
          
          if (data && data.address) {
            const addr = data.address;
            const street = addr.road || addr.pedestrian || addr.suburb || addr.construction || 'Rua Detectada';
            const houseNumber = addr.house_number ? `, ${addr.house_number}` : '';
            const neighborhood = addr.neighbourhood || addr.suburb || addr.quarter || 'Centro';
            const city = addr.city || addr.town || addr.village || 'Arari';
            const state = addr.state ? ` - ${addr.state}` : ' - MA';
            
            const newAddress = `${street}${houseNumber}, ${neighborhood}, ${city}${state}`;
            onAddressChange(newAddress);
            setSuccess(true);
          } else {
            setError('Não foi possível determinar de forma precisa o nome da rua para este local.');
          }
        } catch (err) {
          setError('Erro de conexão ou ao buscar endereço. Tente novamente.');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setError('Acesso negado. Ative a permissão de localização no seu navegador ou celular.');
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setError('Sinal de GPS fraco ou localização indisponível.');
        } else if (err.code === err.TIMEOUT) {
          setError('Tempo limite esgotado ao buscar localização.');
        } else {
          setError('Não foi possível obter a localização. Garanta que o GPS esteja ativado.');
        }
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 12000 }
    );
  };

  const handleReset = () => {
    onAddressChange(defaultAddr);
    setError(null);
    setSuccess(false);
  };

  return (
    <div className="px-6 space-y-6 pb-12">
      <SectionHeader title="Visite-nos" onBack={onBack} />
      
      <div className="bg-white border border-orange-100/50 p-5 rounded-3xl space-y-6 shadow-md">
        <div>
          <span className="text-orange-500 font-display font-extrabold text-[10px] uppercase tracking-widest block mb-1">Nosso endereço</span>
          <h4 className="text-xl font-display font-black text-slate-800 leading-none mb-3">Restaurante Físico</h4>
          
          <div className="text-slate-700 font-display font-bold text-xs border border-orange-100 bg-orange-50/20 p-4 rounded-2xl italic leading-relaxed">
            {address}
          </div>
        </div>
        
        {/* Map visualization panel */}
        <div className="bg-slate-50 border border-orange-100 aspect-[4/3] flex flex-col items-center justify-center p-8 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 to-transparent pointer-events-none"></div>
          <MapPin className={`w-12 h-12 text-primary ${loading ? 'animate-pulse' : 'animate-bounce'}`} />
          
          {loading && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-[1px] flex flex-col items-center justify-center p-4">
              <div className="animate-spin text-primary border-4 border-primary border-t-transparent w-7 h-7 rounded-full mb-3"></div>
              <p className="text-[10px] font-display font-black uppercase tracking-wider text-slate-800">Sincronizando coordenadas...</p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank')}
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-display font-bold text-xs rounded-xl shadow-md transition-all duration-300"
          >
            🗺️ VER NO GOOGLE MAPS
          </button>

          {/* Sincronização de Localização - Elegant Panel */}
          <div className="border border-orange-100 p-4 bg-orange-50/10 rounded-2xl space-y-3 mt-2">
            <h5 className="font-display font-extrabold uppercase text-[10px] tracking-wide text-primary">Sincronizar Localização</h5>
            <p className="text-[9px] font-bold leading-tight uppercase text-slate-500">
              Se você está na rua do seu restaurante agora, clique abaixo para salvar essa rua no aplicativo!
            </p>
            
            {error && (
              <p className="bg-red-50 border-l-4 border-red-500 p-2 text-[9px] font-bold text-red-600 rounded-r-lg uppercase leading-snug">
                {error}
              </p>
            )}

            {success && (
              <p className="bg-emerald-50 border-l-4 border-emerald-500 p-2 text-[9px] font-bold text-emerald-800 rounded-r-lg uppercase leading-snug animate-pulse">
                Salvo! Endereço atualizado com sucesso para sua rua atual.
              </p>
            )}

            <div className="flex gap-2">
              <button
                disabled={loading}
                onClick={handleGetLocation}
                className="flex-1 bg-primary text-white hover:bg-primary-dark p-2.5 rounded-lg font-display font-bold text-[9px] uppercase tracking-wide transition-all disabled:opacity-50"
              >
                {loading ? 'OBTENDO...' : '📍 CAPTURAR LOCAL ATUAL'}
              </button>
              
              {address !== defaultAddr && (
                <button
                  onClick={handleReset}
                  className="bg-white hover:bg-orange-50 text-slate-650 border border-orange-100 p-2.5 rounded-lg font-display font-bold text-[9px] uppercase tracking-wide transition-all"
                  title="Restaurar endereço inicial"
                >
                  RESTAURAR
                </button>
              )}
            </div>
          </div>
        </div>
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
        <ContactBox icon={<MessageCircle className="w-5 h-5 text-[#25D366]" />} label="WhatsApp" value="(98) 98104-9475" href="https://wa.me/5598981049475" />
        <ContactBox icon={<Phone className="w-5 h-5 text-primary" />} label="Telefone" value="(98) 3333-3333" href="tel:559833333333" />
        <ContactBox icon={<Instagram className="w-5 h-5 text-pink-650" />} label="Instagram" value="@temperonordestino" href="https://instagram.com" />
      </div>
    </div>
  );
}

function ContactBox({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="flex items-center gap-4 border border-orange-100/50 p-4 bg-white hover:border-orange-200 rounded-2xl shadow-sm transition-all duration-300 group">
      <div className="p-3 bg-orange-50/50 rounded-xl group-hover:bg-primary/10 transition-all duration-300">
        {icon}
      </div>
      <div>
        <h4 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{label}</h4>
        <p className="text-base font-display font-black text-slate-800 m-0">{value}</p>
      </div>
    </a>
  );
}

function DrinksView({ onAdd, onBack, onShowBenefits }: { onAdd: (item: MenuItem) => void, onBack: () => void, onShowBenefits: (item: MenuItem) => void }) {
  const [filter, setFilter] = useState<'todos' | 'sucos' | 'refrigerantes'>('todos');
  
  const drinks = MENU_ITEMS.filter(item => item.category === 'Bebidas');
  
  const filteredDrinks = drinks.filter(item => {
    const isJuice = item.name.toLowerCase().includes('suco');
    if (filter === 'sucos') return isJuice;
    if (filter === 'refrigerantes') return !isJuice;
    return true;
  });
  
  return (
    <div className="px-6 space-y-6 pb-12">
      <SectionHeader title="Bebidas" onBack={onBack} />
      
      {/* Filters (Juice / Soda / All) */}
      <div className="bg-orange-50/40 border border-orange-100/55 p-1 rounded-2xl grid grid-cols-3 gap-1">
        <button
          onClick={() => setFilter('todos')}
          className={`py-2.5 rounded-xl text-xs font-display font-bold uppercase transition-all duration-300 ${
            filter === 'todos'
              ? 'bg-primary text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFilter('sucos')}
          className={`py-2.5 rounded-xl text-xs font-display font-bold uppercase transition-all duration-300 ${
            filter === 'sucos'
              ? 'bg-primary text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Sucos
        </button>
        <button
          onClick={() => setFilter('refrigerantes')}
          className={`py-2.5 rounded-xl text-xs font-display font-bold uppercase transition-all duration-300 ${
            filter === 'refrigerantes'
              ? 'bg-primary text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Refri
        </button>
      </div>

      <div className="space-y-6">
        {filteredDrinks.map(item => (
          <BrutalistFoodCard key={item.id} item={item} onAdd={() => onAdd(item)} onShowBenefits={() => onShowBenefits(item)} />
        ))}
        {filteredDrinks.length === 0 && (
          <p className="text-slate-400 font-display font-medium text-center py-8">Nenhum item encontrado.</p>
        )}
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
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-[3px]"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 15 }}
        className="bg-white border border-orange-100 p-6 max-w-sm w-full rounded-2xl shadow-xl relative overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 bg-orange-50 text-primary rounded-xl">
            <Award className="w-5 h-5 animate-pulse" />
          </div>
          <button onClick={onClose} className="p-2 hover:bg-orange-50 rounded-xl transition-all border border-orange-50">
            <X className="w-5 h-5 text-slate-500 hover:text-black" />
          </button>
        </div>

        <h3 className="text-xl font-display font-black text-slate-800 leading-snug mb-1">{item.name}</h3>
        <span className="text-[10px] bg-orange-100/60 text-primary px-2.5 py-1 rounded-md font-display font-bold uppercase tracking-wider">
          {item.category === 'Principais' ? 'Ingredientes & Destaque' : 'Atributos & Saúde'}
        </span>

        <p className="text-slate-650 font-medium text-xs leading-relaxed italic border-l-4 border-primary pl-4 py-1.5 mt-5 bg-orange-50/20 rounded-r-lg">
          {item.category === 'Principais' ? item.benefits : `"${item.benefits}"`}
        </p>

        <button 
          onClick={onClose}
          className="w-full mt-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-display font-bold text-xs uppercase shadow-md transition-all active:scale-[0.98]"
        >
          {item.category === 'Principais' ? 'Adoro!' : 'Muito Bom!'}
        </button>
      </motion.div>
    </motion.div>
  );
}

