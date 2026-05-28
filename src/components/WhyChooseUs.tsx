import { Award, Ruler, Clock, Truck, Headphones, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Every door undergoes rigorous quality checks ensuring durability and finish consistency.',
  },
  {
    icon: Ruler,
    title: 'Custom Sizing',
    description: 'Made-to-measure doors in inches—any dimension, no standard-size compromises.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: 'Reliable production schedules ensure your project timeline is never disrupted.',
  },
  {
    icon: Truck,
    title: 'Pan-India Shipping',
    description: 'Safe delivery across India with protective packaging for large panels.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: 'Expert advisors to guide selection, specification, and installation.',
  },
  {
    icon: ShieldCheck,
    title: 'Warranty Backed',
    description: 'All products carry manufacturer warranties for your peace of mind.',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 px-4 sm:px-6 lg:px-8 bg-beige-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-bronze-600 font-medium text-sm uppercase tracking-[0.2em] mb-4">Why Royal Dale</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-brown-900 mb-6 leading-tight">
              Built Different.
              <br />
              Built Better.
            </h2>
            <p className="text-brown-600 text-lg leading-relaxed mb-8">
              Manufacturing premium doors since 2018, Royal Dale has become the trusted name for architects and
              builders across India. We combine industrial precision with artisanal attention to detail.
            </p>

            <span className="inline-flex px-5 py-2.5 rounded-full text-sm font-medium text-bronze-700 bg-bronze-400/10 border border-bronze-400/25">
              Proudly Made in India
            </span>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-warm aspect-[4/3]">
              <img
                src="https://images.pexels.com/photos/6444254/pexels-photo-6444254.jpeg?auto=compress&cs=tinysrgb&w=800&q=80"
                alt="Royal Dale manufacturing"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-soft px-6 py-4 border border-warm">
              <div className="font-serif text-3xl font-bold text-bronze-600">6+</div>
              <div className="text-xs text-brown-600">Years Experience</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-7 border border-warm shadow-soft hover:shadow-bronze transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-beige-200 flex items-center justify-center mb-5">
                <feature.icon size={22} className="text-bronze-600" />
              </div>
              <h3 className="font-serif text-lg font-bold text-brown-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-brown-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
