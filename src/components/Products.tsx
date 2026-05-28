const products = [
  {
    name: 'Laminate Doors',
    description: 'High-pressure laminate with premium woodgrain and solid finishes.',
    tag: 'Bestseller',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
  },
  {
    name: 'Lamination Doors',
    description: 'Factory-laminated doors with consistent color and flawless edges.',
    tag: 'Popular',
    image: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
  },
  {
    name: 'FRP Doors',
    description: 'Fiber reinforced polymer—waterproof, durable, and industrial-grade.',
    tag: 'Industrial',
    image: 'https://images.pexels.com/photos/8131623/pexels-photo-8131623.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
  },
  {
    name: 'PVC Doors',
    description: 'Lightweight, moisture-resistant—ideal for bathrooms and wet areas.',
    tag: 'Waterproof',
    image: 'https://images.pexels.com/photos/7134780/pexels-photo-7134780.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
  },
  {
    name: 'WPC Doors',
    description: 'Wood-plastic composite with natural look and lasting performance.',
    tag: 'Eco-Friendly',
    image: 'https://images.pexels.com/photos/5824512/pexels-photo-5824512.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
  },
  {
    name: 'Gel Coated Doors',
    description: 'High-gloss gel coat finish for a sleek, luxury appearance.',
    tag: 'Premium',
    image: 'https://images.pexels.com/photos/6444254/pexels-photo-6444254.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
  },
  {
    name: 'Laminates',
    description: 'Decorative laminates in woodgrain, marble, and contemporary solids.',
    tag: 'Decorative',
    image: 'https://images.pexels.com/photos/4061622/pexels-photo-4061622.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
  },
  {
    name: 'Plywood',
    description: 'Marine and commercial grade plywood for construction and interiors.',
    tag: 'Structural',
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
  },
  {
    name: 'Lipping Patti',
    description: 'Premium wooden edge banding strips for refined door finishing.',
    tag: 'Accessory',
    image: 'https://images.pexels.com/photos/159045/pexels-photo-159045.jpeg?auto=compress&cs=tinysrgb&w=600&q=80',
  },
];

const tagColors: Record<string, string> = {
  Bestseller: 'bg-bronze-500/15 text-bronze-700',
  Popular: 'bg-gold-400/15 text-gold-600',
  Industrial: 'bg-brown-600/10 text-brown-800',
  Waterproof: 'bg-bronze-400/10 text-bronze-700',
  Premium: 'bg-gold-400/15 text-gold-600',
  'Eco-Friendly': 'bg-bronze-300/20 text-bronze-700',
  Structural: 'bg-beige-300/50 text-brown-800',
  Decorative: 'bg-bronze-400/10 text-bronze-700',
  Accessory: 'bg-beige-300/50 text-brown-700',
};

export default function Products() {
  const scrollToQuote = () => {
    document.querySelector('#quote')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 bg-ivory-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-bronze-600 font-medium text-sm uppercase tracking-[0.2em] mb-4">Our Products</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-brown-900 mb-5">
            Crafted for Every Space
          </h2>
          <p className="text-brown-600 text-lg max-w-2xl mx-auto leading-relaxed">
            From residential homes to industrial facilities—premium doors and materials for every requirement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <article
              key={product.name}
              className="group bg-white rounded-2xl overflow-hidden border border-warm shadow-soft hover:shadow-bronze transition-all duration-400 cursor-pointer"
              onClick={scrollToQuote}
              onKeyDown={(e) => e.key === 'Enter' && scrollToQuote()}
              role="button"
              tabIndex={0}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-beige-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span
                  className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm ${tagColors[product.tag]}`}
                >
                  {product.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-brown-900 mb-2 group-hover:text-bronze-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-brown-600 leading-relaxed">{product.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-16">
          <button
            onClick={scrollToQuote}
            className="px-10 py-3.5 rounded-full font-semibold text-white gradient-gold shadow-bronze hover:opacity-90 transition-all"
          >
            Request Custom Quote
          </button>
        </div>
      </div>
    </section>
  );
}
