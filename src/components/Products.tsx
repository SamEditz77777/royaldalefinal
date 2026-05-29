const products = [
  {
    name: 'Laminate Doors',
    description: 'High-pressure laminate doors with premium woodgrain textures and durable surface coating.',
    tag: 'Bestseller',
    image: 'https://www.mikasadoors.com/wp-content/uploads/2022/04/Maintenance-tips-for-Designer-Laminated-door.jpg',
  },
  {
    name: 'Lamination Doors',
    description: 'Seamless factory-laminated doors for consistent color, edge finish, and long-lasting quality.',
    tag: 'Popular',
    image: 'https://images.jdmagicbox.com/quickquotes/images_main/-0elf5yqh.jpg',
  },
  {
    name: 'FRP Doors',
    description: 'Fiber reinforced polymer doors designed for moisture resistance, hygiene, and industrial use.',
    tag: 'Industrial',
    image: 'frp.jpeg',
  },
  {
    name: 'PVC Doors',
    description: 'Waterproof PVC doors ideal for bathrooms, kitchens and high-moisture spaces.',
    tag: 'Waterproof',
    image: 'https://images.jdmagicbox.com/quickquotes/images_main/pvc-door-374224911-a0gp5.jpg',
  },
  {
    name: 'WPC Doors',
    description: 'Wood-plastic composite doors with a natural wood look and excellent durability.',
    tag: 'Eco-Friendly',
    image: 'https://konarkdoors.com/wp-content/uploads/2024/07/wpc-doors-for-bedroom-colors-design.webp',
  },
  {
    name: 'Gel Coated Doors',
    description: 'High-gloss gel-coated doors with a sleek finish for premium interiors.',
    tag: 'Premium',
    image: 'image.png',
  },
  {
    name: 'Laminates',
    description: 'Decorative laminate sheets in woodgrain, stone, and solid finishes for panels and doors.',
    tag: 'Decorative',
    image: 'https://royaletouchewp.s3.ap-south-1.amazonaws.com/wp-content/uploads/2023/08/26103702/7053_HD_full_sheet.jpg',
  },
  {
    name: 'Plywood',
    description: 'Premium plywood boards for furniture, doors, and structural use.',
    tag: 'Structural',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJGRbSYR1qi6V3x42dDovJTVfCcaWMrVZdHA&s',
  },
  {
    name: 'Lipping Patti',
    description: 'Edge banding strips for clean, durable door edges and premium finish.',
    tag: 'Accessory',
    image: 'https://5.imimg.com/data5/XA/JR/MY-38965862/lipping-pattis-500x500.jpg',
  },
];

const tagColors: Record<string, string> = {
  Bestseller: 'bg-secondary-500/15 text-secondary-700',
  Popular: 'bg-secondary-100 text-secondary-700',
  Industrial: 'bg-secondary-50 text-secondary-800',
  Waterproof: 'bg-secondary-400/10 text-secondary-700',
  Premium: 'bg-secondary-100 text-secondary-700',
  'Eco-Friendly': 'bg-secondary-300/20 text-secondary-700',
  Structural: 'bg-primary-300/50 text-secondary-800',
  Decorative: 'bg-secondary-400/10 text-secondary-700',
  Accessory: 'bg-primary-300/50 text-secondary-700',
};

export default function Products() {
  const scrollToQuote = () => {
    document.querySelector('#quote')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 bg-primary-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-secondary-600 font-medium text-sm uppercase tracking-[0.2em] mb-4">Our Products</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-secondary-900 mb-5">
            Crafted for Every Space
          </h2>
          <p className="text-secondary-600 text-lg max-w-2xl mx-auto leading-relaxed">
            From residential homes to industrial facilities—premium doors and materials for every requirement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <article
              key={product.name}
              className="group bg-white rounded-2xl overflow-hidden border border-warm shadow-soft hover:shadow-secondary transition-all duration-400 cursor-pointer"
              onClick={scrollToQuote}
              onKeyDown={(e) => e.key === 'Enter' && scrollToQuote()}
              role="button"
              tabIndex={0}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-primary-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span
                  className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm ${tagColors[product.tag]}`}
                >
                  {product.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-secondary-900 mb-2 group-hover:text-secondary-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-secondary-600 leading-relaxed">{product.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-16">
          <button
            onClick={scrollToQuote}
            className="px-10 py-3.5 rounded-full font-semibold text-white gradient-secondary shadow-secondary hover:opacity-90 transition-all"
          >
            Request Custom Quote
          </button>
        </div>
      </div>
    </section>
  );
}
