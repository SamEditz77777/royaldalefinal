import { useEffect, useState } from 'react';

interface Quote {
  id: number;
  submittedAt: string;
  contact: {
    name: string;
    email: string;
    phone: string;
    company?: string;
  };
  selectedProducts: string[];
  doors: Array<{
    product: string;
    quantity: number;
    heightInch: number;
    widthInch: number;
    finish: string;
    customDesign?: string;
    notes?: string;
  }>;
  project: {
    type: string;
    timeline: string;
    notes?: string;
  };
}

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/quotes`);
        if (!response.ok) throw new Error('Failed to fetch quotes');
        const data = await response.json();
        setQuotes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load quotes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading quotes...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-primary-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-4xl font-bold text-secondary-900 mb-8">
          📊 Submitted Quotes ({quotes.length})
        </h1>

        {quotes.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center text-secondary-600">
            No quotes submitted yet.
          </div>
        ) : (
          <div className="space-y-6">
            {quotes.map((quote) => (
              <div key={quote.id} className="bg-white rounded-lg shadow p-6 border border-warm">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-secondary-800">{quote.contact.name}</h3>
                    <p className="text-sm text-secondary-600">{quote.contact.email}</p>
                    <p className="text-sm text-secondary-600">{quote.contact.phone}</p>
                    {quote.contact.company && (
                      <p className="text-sm text-secondary-600">{quote.contact.company}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-secondary-600">
                      {new Date(quote.submittedAt).toLocaleString()}
                    </p>
                    <p className="text-sm font-semibold text-secondary-800 mt-2">
                      Project: {quote.project.type}
                    </p>
                    <p className="text-sm text-secondary-600">Timeline: {quote.project.timeline}</p>
                  </div>
                </div>

                <div className="mb-4 pb-4 border-t border-warm">
                  <p className="font-semibold text-secondary-800 mb-2">Products:</p>
                  <p className="text-sm text-secondary-600">{quote.selectedProducts.join(', ')}</p>
                </div>

                <div className="mb-4 pb-4 border-t border-warm">
                  <p className="font-semibold text-secondary-800 mb-2">Items:</p>
                  <div className="space-y-2">
                    {quote.doors.map((door, i) => (
                      <div key={i} className="text-sm bg-primary-50 p-3 rounded">
                        <p className="font-medium">{door.product}</p>
                        <p className="text-secondary-600">
                          Qty: {door.quantity} | {door.heightInch}" H × {door.widthInch}" W | {door.finish}
                        </p>
                        {door.customDesign && (
                          <p className="text-secondary-600 text-xs">Design: {door.customDesign}</p>
                        )}
                        {door.notes && (
                          <p className="text-secondary-600 text-xs">Notes: {door.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {quote.project.notes && (
                  <div className="bg-primary-50 p-3 rounded text-sm">
                    <p className="font-semibold text-secondary-800">Additional Requirements:</p>
                    <p className="text-secondary-600">{quote.project.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
