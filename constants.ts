import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Ramo Rosa Eterna',
    description: 'Un arreglo clásico de rosas rojo profundo, perfecto para expresar un amor apasionado.',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&q=80&w=400',
    category: 'flowers'
  },
  {
    id: '2',
    name: 'Orquídea Phalaenopsis',
    description: 'Elegante orquídea blanca en maceta de cerámica. Un símbolo de pureza y elegancia.',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1566938064504-a6ec270fb759?auto=format&fit=crop&q=80&w=400',
    category: 'plants'
  },
  {
    id: '3',
    name: 'Mezcla Sky Garden',
    description: 'Una mezcla vibrante de flores de temporada inspirada en los colores del Sky Garden de Londres.',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=400',
    category: 'flowers'
  },
  {
    id: '4',
    name: 'Girasoles Radiantes',
    description: 'Girasoles brillantes y alegres envueltos en papel rústico.',
    price: 60000,
    image: 'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&q=80&w=400',
    category: 'flowers'
  },
  {
    id: '5',
    name: 'Armonía Rosa',
    description: 'Rosas rosas suaves y lirios. Delicado y sentimental.',
    price: 90000,
    image: 'https://images.unsplash.com/photo-1582794543139-8ac92a9ab4d9?auto=format&fit=crop&q=80&w=400',
    category: 'flowers'
  },
  {
    id: '6',
    name: 'Trío de Suculentas',
    description: 'Tres suculentas de bajo mantenimiento en macetas geométricas.',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&q=80&w=400',
    category: 'plants'
  }
];

// Using an image that resembles a bright, glass-enclosed garden space
export const SKY_GARDEN_HERO_IMG = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1600';