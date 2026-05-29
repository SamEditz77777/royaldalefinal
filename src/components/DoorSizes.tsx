import { Ruler } from 'lucide-react';

const sizes = [
  { height: '80 in', width: '32 in', use: 'Standard Interior' },
  { height: '82 in', width: '34 in', use: 'Interior Plus' },
  { height: '78 in', width: '30 in', use: 'Compact Interior' },
  { height: '78 in', width: '32 in', use: 'Wide Compact' },
  { height: '82 in', width: '36 in', use: 'Entry / Commercial' },
];

export default function DoorSizes() {
  const scrollToQuote = () => {
    document.querySelector('#quote')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="door-sizes" className="py-24 px-4 sm:px-6 lg:px-8 bg-primary-200">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-secondary-600 font-medium text-sm uppercase tracking-[0.2em] mb-4">Specifications</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-secondary-900 mb-5">Common Door Sizes</h2>
          <p className="text-secondary-600 text-lg leading-relaxed">
            All sizes listed in inches. Custom dimensions available on request.
          </p>
        </div>

        <div className="sm:hidden space-y-4">
          {sizes.map((size) => (
            <div key={size.use} className="bg-white rounded-2xl p-5 border border-warm shadow-soft">
              <div className="flex items-center justify-between gap-3">
                <span className="font-serif text-lg font-bold text-secondary-600">
                  {size.height} × {size.width}
                </span>
                <span className="text-xs text-secondary-700 bg-secondary-400/10 px-2.5 py-1 rounded-full flex-shrink-0">
                  {size.use}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden sm:block rounded-2xl bg-white border border-warm shadow-soft overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-warm bg-primary-50">
                <th className="text-left px-6 py-4 text-secondary-700 font-semibold text-xs uppercase tracking-wider">
                  Height (in)
                </th>
                <th className="text-left px-6 py-4 text-secondary-700 font-semibold text-xs uppercase tracking-wider">
                  Width (in)
                </th>
                <th className="text-left px-6 py-4 text-secondary-700 font-semibold text-xs uppercase tracking-wider">
                  Typical Use
                </th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((size) => (
                <tr key={size.use} className="border-b border-warm last:border-0 hover:bg-primary-50/80 transition-colors">
                  <td className="px-6 py-4 font-semibold text-secondary-800">{size.height}</td>
                  <td className="px-6 py-4 font-semibold text-secondary-800">{size.width}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-secondary-700 bg-secondary-400/10 px-2.5 py-1 rounded-full">
                      {size.use}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-5 rounded-2xl bg-white border border-warm shadow-soft max-w-full">
            <Ruler size={20} className="text-secondary-600 flex-shrink-0" />
            <p className="text-secondary-700 text-sm">
              Need a custom size?{' '}
              <button
                onClick={scrollToQuote}
                className="text-secondary-600 font-semibold hover:text-secondary-700 underline"
              >
                Request a custom quote
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
