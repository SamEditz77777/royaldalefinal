import { useState } from 'react';
import {
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  User,
  Building,
  Mail,
  Phone,
  Layers,
  Shield,
  Droplets,
  Leaf,
  Paintbrush,
  TreePine,
  Square,
  AlignJustify,
  MessageCircle,
} from 'lucide-react';
import { whatsappUrl } from '../constants';

const productOptions = [
  { id: 'laminate', label: 'Laminate Doors', icon: Layers },
  { id: 'lamination', label: 'Lamination Doors', icon: Paintbrush },
  { id: 'frp', label: 'FRP Doors', icon: Shield },
  { id: 'pvc', label: 'PVC Doors', icon: Droplets },
  { id: 'gelcoated', label: 'Gel Coated Doors', icon: Paintbrush },
  { id: 'wpc', label: 'WPC Doors', icon: Leaf },
  { id: 'plywood', label: 'Plywood', icon: TreePine },
  { id: 'laminates', label: 'Laminates', icon: Square },
  { id: 'lipping', label: 'Lipping Patti', icon: AlignJustify },
];

const finishOptions = ['Woodgrain', 'Matte', 'High Gloss', 'Texture', 'Plain', 'Custom'];
const gelCoatedFinishOptions = ['Woodgrain', 'Matte', 'Texture'];
const doorColorOptions = ['Brown', 'Golden Brown', 'Peak Wood', 'White', 'Off White', 'Ivory', 'Grey', 'Customize Color'];
const fractionOptions = ['', '1/8', '1/4', '3/8', '1/2', '5/8', '3/4', '7/8'];
const projectTypeOptions = ['Residential', 'Commercial', 'Industrial', 'Institutional', 'Other'];
const timelineOptions = ['Immediate (1-2 weeks)', 'Soon (2-4 weeks)', 'Planning (1-3 months)', 'Future (3+ months)'];

interface DoorItem {
  id: string;
  product: string;
  quantity: number;
  heightInch: number;
  heightFraction: string;
  widthInch: number;
  widthFraction: string;
  finish: string;
  color: string;
  customColor: string;
  customDesign: string;
  notes: string;
}

const emptyDoor = (): DoorItem => ({
  id: crypto.randomUUID(),
  product: '',
  quantity: 0,
  heightInch: 0,
  heightFraction: '',
  widthInch: 0,
  widthFraction: '',
  finish: '',
  color: '',
  customColor: '',
  customDesign: '',
  notes: '',
});

const validateDoorItems = (items: DoorItem[]): Record<string, string> => {
  const doorErrors: Record<string, string> = {};
  items.forEach((door) => {
    const key = (field: string) => `door-${door.id}-${field}`;
    if (!door.product.trim()) doorErrors[key('product')] = 'Product is required';
    if (!door.quantity || door.quantity < 1) doorErrors[key('quantity')] = 'Quantity is required (minimum 1)';
    const needsColor = door.product === 'FRP Doors' || door.product === 'PVC Doors' || door.product === 'Gel Coated Doors';
    if (needsColor) {
      if (!door.color.trim()) doorErrors[key('color')] = 'Color is required';
      if ((door.product === 'FRP Doors' || door.product === 'Gel Coated Doors') && door.color === 'Customize Color' && !door.customColor.trim()) {
        doorErrors[key('color')] = 'Custom color is required';
      }
      if (door.product === 'Gel Coated Doors' && !door.finish.trim()) {
        doorErrors[key('finish')] = 'Finish is required';
      }
    } else if (!door.finish.trim()) {
      doorErrors[key('finish')] = 'Finish is required';
    }
    if (!door.heightInch || door.heightInch <= 0) doorErrors[key('height')] = 'Height is required';
    if (!door.widthInch || door.widthInch <= 0) doorErrors[key('width')] = 'Width is required';
  });
  return doorErrors;
};

const stepLabels = ['Contact', 'Products', 'Dimensions', 'Project'];

export default function QuoteForm() {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const [contact, setContact] = useState({ name: '', company: '', email: '', phone: '' });
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [doors, setDoors] = useState<DoorItem[]>([emptyDoor()]);
  const [project, setProject] = useState({ type: '', timeline: '', notes: '' });

  const validateStep = (s: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (s === 0) {
      if (!contact.name.trim()) newErrors.name = 'Name is required';
      if (contact.email.trim() && !/\S+@\S+\.\S+/.test(contact.email)) newErrors.email = 'Valid email required';
      if (!contact.phone.trim()) newErrors.phone = 'Phone is required';
    }
    if (s === 1 && selectedProducts.length === 0) newErrors.products = 'Select at least one product';
    if (s === 2) Object.assign(newErrors, validateDoorItems(doors));
    if (s === 3) {
      if (!project.type) newErrors.type = 'Select project type';
      if (!project.timeline) newErrors.timeline = 'Select timeline';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!contact.name.trim()) newErrors.name = 'Name is required';
    if (contact.email.trim() && !/\S+@\S+\.\S+/.test(contact.email)) newErrors.email = 'Valid email required';
    if (!contact.phone.trim()) newErrors.phone = 'Phone is required';
    if (selectedProducts.length === 0) newErrors.products = 'Select at least one product';
    const doorErrors = validateDoorItems(doors);
    Object.assign(newErrors, doorErrors);
    if (!project.type) newErrors.type = 'Select project type';
    if (!project.timeline) newErrors.timeline = 'Select timeline';

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) return true;

    if (newErrors.name || newErrors.email || newErrors.phone) setStep(0);
    else if (newErrors.products) setStep(1);
    else if (Object.keys(doorErrors).length > 0) setStep(2);
    else if (newErrors.type || newErrors.timeline) setStep(3);
    return false;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 3));
  };
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const toggleProduct = (id: string) => {
    setSelectedProducts((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
    if (errors.products) setErrors((e) => ({ ...e, products: '' }));
  };

  const updateDoor = (id: string, field: keyof DoorItem, value: string | number) => {
    setDoors((prev) => prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
    const errorKey = `door-${id}-${field === 'heightInch' ? 'height' : field === 'widthInch' ? 'width' : field}`;
    if (errors[errorKey]) {
      setErrors((e) => {
        const next = { ...e };
        delete next[errorKey];
        return next;
      });
    }
  };

  const addDoor = () => setDoors((prev) => [...prev, emptyDoor()]);
  const removeDoor = (id: string) => setDoors((prev) => prev.filter((d) => d.id !== id));

  const generateWhatsAppMessage = (): string => {
    const lines: string[] = [];
    lines.push('*Custom Quote Request — ROYAL DALE*');
    lines.push('');
    lines.push('*Customer Details*');
    lines.push(`Name: ${contact.name}`);
    if (contact.company) lines.push(`Company: ${contact.company}`);
    lines.push(`Phone: ${contact.phone}`);
    lines.push(`Email: ${contact.email}`);
    lines.push('');
    lines.push('*Selected Products*');
    selectedProducts.forEach((id) => {
      const p = productOptions.find((x) => x.id === id);
      if (p) lines.push(`• ${p.label}`);
    });
    lines.push('');
    lines.push('*Specifications (all sizes in inches)*');
    doors.forEach((d, i) => {
      const heightLabel = `${d.heightInch}${d.heightFraction ? ` ${d.heightFraction}` : ''}"`;
      const widthLabel = `${d.widthInch}${d.widthFraction ? ` ${d.widthFraction}` : ''}"`;
      const needsColor = d.product === 'FRP Doors' || d.product === 'PVC Doors' || d.product === 'Gel Coated Doors';
      const customColorValue = (d.product === 'FRP Doors' || d.product === 'Gel Coated Doors') && d.color === 'Customize Color';

      lines.push(`${i + 1}. ${d.product}`);
      lines.push(`   Quantity: ${d.quantity}`);
      lines.push(`   Height: ${heightLabel}`);
      lines.push(`   Width: ${widthLabel}`);
      if (needsColor) {
        const colorLabel = customColorValue ? `Customize Color (${d.customColor})` : d.color;
        lines.push(`   Color: ${colorLabel}`);
        if (d.product === 'Gel Coated Doors') {
          lines.push(`   Finish: ${d.finish}`);
        }
      } else {
        lines.push(`   Finish: ${d.finish}`);
      }
      if (d.customDesign.trim() && d.product !== 'Laminate Doors') lines.push(`   Custom Design: ${d.customDesign}`);
      if (d.notes.trim()) lines.push(`   Notes: ${d.notes}`);
    });
    lines.push('');
    lines.push('*Project*');
    lines.push(`Type: ${project.type}`);
    lines.push(`Timeline: ${project.timeline}`);
    if (project.notes.trim()) lines.push(`Additional Requirements: ${project.notes}`);
    lines.push('');
    lines.push('Please share pricing and availability. Thank you!');
    return encodeURIComponent(lines.join('\n'));
  };

  const sendWhatsAppQuote = () => {
    if (!validateAll()) return;
    const message = generateWhatsAppMessage();
    window.open(whatsappUrl(message), '_blank');
  };


  const inputCls = (err?: string) =>
    `w-full bg-white border rounded-xl px-4 py-3 text-secondary-800 placeholder-secondary-600/50 text-sm focus:outline-none focus:border-secondary-400 focus:ring-1 focus:ring-secondary-400/30 transition-all ${
      err ? 'border-red-400' : 'border-warm'
    }`;

  const selectCls = (err?: string) =>
    `w-full bg-white border rounded-xl px-4 py-3 text-secondary-800 text-sm focus:outline-none focus:border-secondary-400 transition-all ${
      err ? 'border-red-400' : 'border-warm'
    }`;

  if (submitted) {
    return (
      <section id="quote" className="py-24 px-4 sm:px-6 lg:px-8 bg-primary-100">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl border border-warm shadow-soft p-8 sm:p-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-secondary-900 mb-3">Quote Request Submitted! ✅</h2>
              <p className="text-secondary-600 mb-4">
                Thank you, <strong>{contact.name}</strong>!
              </p>
            </div>

            <div className="space-y-4 mb-8 bg-primary-50 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="text-2xl">📧</div>
                <div>
                  <p className="font-semibold text-secondary-800">Email Confirmation Sent</p>
                  <p className="text-sm text-secondary-600">A confirmation email has been sent to <strong>{contact.email}</strong></p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">💾</div>
                <div>
                  <p className="font-semibold text-secondary-800">Quote Saved in Database</p>
                  <p className="text-sm text-secondary-600">Your quote details are securely stored in our system</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">📞</div>
                <div>
                  <p className="font-semibold text-secondary-800">We'll Contact You Soon</p>
                  <p className="text-sm text-secondary-600">Our team will reach out within <strong>24 hours</strong> at <strong>{contact.phone}</strong></p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-blue-800">
                <strong>Pro Tip:</strong> Use WhatsApp for immediate assistance at <strong>+91 9697830830</strong>.
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(0);
                  setContact({ name: '', company: '', email: '', phone: '' });
                  setSelectedProducts([]);
                  setDoors([emptyDoor()]);
                  setProject({ type: '', timeline: '', notes: '' });
                }}
                className="px-8 py-3 rounded-full font-semibold text-white gradient-secondary hover:opacity-90 transition-all"
              >
                Submit Another Quote
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="py-24 px-4 sm:px-6 lg:px-8 bg-primary-100">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-secondary-600 font-medium text-sm uppercase tracking-[0.2em] mb-4">Get a Quote</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-secondary-900 mb-5">
            Request Custom Quote
          </h2>
          <p className="text-secondary-600 text-lg leading-relaxed">
            Complete the form below and we&apos;ll respond within 24 hours.
          </p>
        </div>

        <div className="flex items-center justify-center mb-12 gap-1 sm:gap-2 overflow-x-auto pb-2">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex items-center flex-shrink-0">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                  i < step
                    ? 'bg-secondary-500 text-white'
                    : i === step
                      ? 'bg-secondary-500/15 text-secondary-700 border-2 border-secondary-400'
                      : 'bg-primary-200 text-secondary-600/50'
                }`}
              >
                {i < step ? <CheckCircle size={14} /> : i + 1}
              </div>
              <span className="ml-2 text-xs font-medium text-secondary-600 hidden sm:block">{label}</span>
              {i < 3 && (
                <div className={`w-6 sm:w-10 h-0.5 mx-1 sm:mx-2 ${i < step ? 'bg-secondary-500' : 'bg-primary-300'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-warm shadow-soft overflow-hidden">
          {step === 0 && (
            <div className="p-6 sm:p-10">
              <h3 className="font-serif text-xl font-bold text-secondary-900 mb-6">Contact Information</h3>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-secondary-600 uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary-600/40" />
                    <input
                      type="text"
                      placeholder="Your name"
                      value={contact.name}
                      onChange={(e) => {
                        setContact((c) => ({ ...c, name: e.target.value }));
                        setErrors((er) => ({ ...er, name: '' }));
                      }}
                      className={`${inputCls(errors.name)} pl-10`}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-secondary-600 uppercase tracking-wider mb-2">
                    Company
                  </label>
                  <div className="relative">
                    <Building size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary-600/40" />
                    <input
                      type="text"
                      placeholder="Company name"
                      value={contact.company}
                      onChange={(e) => setContact((c) => ({ ...c, company: e.target.value }))}
                      className={`${inputCls()} pl-10`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-secondary-600 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary-600/40" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={contact.email}
                      onChange={(e) => {
                        setContact((c) => ({ ...c, email: e.target.value }));
                        setErrors((er) => ({ ...er, email: '' }));
                      }}
                      className={`${inputCls(errors.email)} pl-10`}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-secondary-600 uppercase tracking-wider mb-2">
                    Phone *
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary-600/40" />
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      value={contact.phone}
                      onChange={(e) => {
                        setContact((c) => ({ ...c, phone: e.target.value }));
                        setErrors((er) => ({ ...er, phone: '' }));
                      }}
                      className={`${inputCls(errors.phone)} pl-10`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="p-6 sm:p-10">
              <h3 className="font-serif text-xl font-bold text-secondary-900 mb-6">Select Products</h3>
              {errors.products && <p className="text-red-500 text-sm mb-4">{errors.products}</p>}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {productOptions.map(({ id, label, icon: Icon }) => {
                  const selected = selectedProducts.includes(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggleProduct(id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all ${
                        selected
                          ? 'border-secondary-400 bg-secondary-400/10'
                          : 'border-warm bg-primary-50 hover:border-secondary-300'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${selected ? 'bg-secondary-500/20' : 'bg-primary-200'}`}
                      >
                        <Icon size={18} className={selected ? 'text-secondary-600' : 'text-secondary-600/50'} />
                      </div>
                      <span className={`text-xs font-medium ${selected ? 'text-secondary-700' : 'text-secondary-600'}`}>
                        {label}
                      </span>
                      {selected && (
                        <div className="w-5 h-5 rounded-full bg-secondary-500 flex items-center justify-center">
                          <CheckCircle size={12} className="text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-secondary-600 mt-4">{selectedProducts.length} product(s) selected</p>
            </div>
          )}

          {step === 2 && (
            <div className="p-6 sm:p-10">
              <h3 className="font-serif text-xl font-bold text-secondary-900 mb-2">Specifications</h3>
              <p className="text-sm text-secondary-600 mb-2">All dimensions in inches only (height × width).</p>
              <p className="text-xs text-secondary-600/80 mb-6">Fields marked with * are required.</p>

              {doors.map((door, idx) => (
                <div key={door.id} className="bg-primary-50 rounded-xl p-5 mb-4 border border-warm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-secondary-800">Item #{idx + 1}</span>
                    {doors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDoor(door.id)}
                        className="text-secondary-600/50 hover:text-red-500 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-secondary-600 mb-1.5">
                        Product <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={door.product}
                        onChange={(e) => updateDoor(door.id, 'product', e.target.value)}
                        className={selectCls(errors[`door-${door.id}-product`])}
                      >
                        <option value="">Select product</option>
                        {productOptions.map((p) => (
                          <option key={p.id} value={p.label}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                      {errors[`door-${door.id}-product`] && (
                        <p className="text-red-500 text-xs mt-1">{errors[`door-${door.id}-product`]}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-secondary-600 mb-1.5">
                        Quantity <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        inputMode="numeric"
                        placeholder="1"
                        value={door.quantity || ''}
                        onChange={(e) => {
                          const raw = e.target.value;
                          updateDoor(
                            door.id,
                            'quantity',
                            raw === '' ? 0 : Math.max(0, parseInt(raw, 10) || 0),
                          );
                        }}
                        className={inputCls(errors[`door-${door.id}-quantity`])}
                      />
                      {errors[`door-${door.id}-quantity`] && (
                        <p className="text-red-500 text-xs mt-1">{errors[`door-${door.id}-quantity`]}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-secondary-600 mb-1.5">
                        {door.product === 'FRP Doors' || door.product === 'PVC Doors' || door.product === 'Gel Coated Doors' ? 'Color' : 'Finish'} <span className="text-red-500">*</span>
                      </label>
                      {door.product === 'FRP Doors' || door.product === 'Gel Coated Doors' ? (
                        <>
                          <select
                            required
                            value={door.color}
                            onChange={(e) => {
                              updateDoor(door.id, 'color', e.target.value);
                              if (e.target.value !== 'Customize Color') {
                                updateDoor(door.id, 'customColor', '');
                              }
                            }}
                            className={selectCls(errors[`door-${door.id}-color`])}
                          >
                            <option value="">Select color</option>
                            {doorColorOptions.map((color) => (
                              <option key={color} value={color}>
                                {color}
                              </option>
                            ))}
                          </select>
                          {door.color === 'Customize Color' && (
                            <input
                              type="text"
                              placeholder="Specify custom color"
                              value={door.customColor}
                              onChange={(e) => updateDoor(door.id, 'customColor', e.target.value)}
                              className={`${inputCls(errors[`door-${door.id}-color`])} mt-3`}
                            />
                          )}
                          {door.product === 'Gel Coated Doors' && (
                            <div className="mt-4">
                              <label className="block text-xs font-medium text-secondary-600 mb-1.5">
                                Finish <span className="text-red-500">*</span>
                              </label>
                              <select
                                required
                                value={door.finish}
                                onChange={(e) => updateDoor(door.id, 'finish', e.target.value)}
                                className={selectCls(errors[`door-${door.id}-finish`])}
                              >
                                <option value="">Select finish</option>
                                {gelCoatedFinishOptions.map((f) => (
                                  <option key={f} value={f}>
                                    {f}
                                  </option>
                                ))}
                              </select>
                              {errors[`door-${door.id}-finish`] && (
                                <p className="text-red-500 text-xs mt-1">{errors[`door-${door.id}-finish`]}</p>
                              )}
                            </div>
                          )}
                        </>
                      ) : door.product === 'PVC Doors' ? (
                        <input
                          type="text"
                          placeholder="Enter color"
                          value={door.color}
                          onChange={(e) => updateDoor(door.id, 'color', e.target.value)}
                          className={inputCls(errors[`door-${door.id}-color`])}
                        />
                      ) : (
                        <select
                          required
                          value={door.finish}
                          onChange={(e) => updateDoor(door.id, 'finish', e.target.value)}
                          className={selectCls(errors[`door-${door.id}-finish`])}
                        >
                          <option value="">Select finish</option>
                          {finishOptions.map((f) => (
                            <option key={f} value={f}>
                              {f}
                            </option>
                          ))}
                        </select>
                      )}
                      {(door.product === 'FRP Doors' || door.product === 'PVC Doors' || door.product === 'Gel Coated Doors') ? errors[`door-${door.id}-color`] : errors[`door-${door.id}-finish`] ? (
                        <p className="text-red-500 text-xs mt-1">
                          {door.product === 'FRP Doors' || door.product === 'PVC Doors' || door.product === 'Gel Coated Doors'
                            ? errors[`door-${door.id}-color`]
                            : errors[`door-${door.id}-finish`]}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-secondary-600 mb-1.5">
                        Height (in) <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          required
                          min="0"
                          step="0.25"
                          inputMode="decimal"
                          placeholder="e.g. 80"
                          value={door.heightInch || ''}
                          onChange={(e) => {
                            const raw = e.target.value;
                            updateDoor(
                              door.id,
                              'heightInch',
                              raw === '' ? 0 : Math.max(0, parseFloat(raw) || 0),
                            );
                          }}
                          className={`${inputCls(errors[`door-${door.id}-height`])} flex-1`}
                        />
                        <select
                          value={door.heightFraction}
                          onChange={(e) => updateDoor(door.id, 'heightFraction', e.target.value)}
                          className="w-24 bg-white border border-warm rounded-xl px-3 py-3 text-secondary-800 text-sm focus:outline-none focus:border-secondary-400 transition-all"
                        >
                          {fractionOptions.map((value) => (
                            <option key={value} value={value}>
                              {value || '0'}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors[`door-${door.id}-height`] && (
                        <p className="text-red-500 text-xs mt-1">{errors[`door-${door.id}-height`]}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-secondary-600 mb-1.5">
                        Width (in) <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          required
                          min="0"
                          step="0.25"
                          inputMode="decimal"
                          placeholder="e.g. 32"
                          value={door.widthInch || ''}
                          onChange={(e) => {
                            const raw = e.target.value;
                            updateDoor(
                              door.id,
                              'widthInch',
                              raw === '' ? 0 : Math.max(0, parseFloat(raw) || 0),
                            );
                          }}
                          className={`${inputCls(errors[`door-${door.id}-width`])} flex-1`}
                        />
                        <select
                          value={door.widthFraction}
                          onChange={(e) => updateDoor(door.id, 'widthFraction', e.target.value)}
                          className="w-24 bg-white border border-warm rounded-xl px-3 py-3 text-secondary-800 text-sm focus:outline-none focus:border-secondary-400 transition-all"
                        >
                          {fractionOptions.map((value) => (
                            <option key={value} value={value}>
                              {value || '0'}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors[`door-${door.id}-width`] && (
                        <p className="text-red-500 text-xs mt-1">{errors[`door-${door.id}-width`]}</p>
                      )}
                    </div>
                    {!['Laminate Doors'].includes(door.product) && (
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-secondary-600 mb-1.5">Custom Design</label>
                        <input
                          type="text"
                          placeholder="Describe custom design, if any"
                          value={door.customDesign}
                          onChange={(e) => updateDoor(door.id, 'customDesign', e.target.value)}
                          className={inputCls()}
                        />
                      </div>
                    )}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-secondary-600 mb-1.5">Notes</label>
                      <input
                        type="text"
                        placeholder="Optional"
                        value={door.notes}
                        onChange={(e) => updateDoor(door.id, 'notes', e.target.value)}
                        className={inputCls()}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addDoor}
                className="flex items-center gap-2 text-sm font-medium text-secondary-600 hover:text-secondary-700 py-2.5 px-4 rounded-xl border border-secondary-300/50 bg-white hover:bg-primary-50 transition-all"
              >
                <Plus size={16} /> Add Another Item
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="p-6 sm:p-10">
              <h3 className="font-serif text-xl font-bold text-secondary-900 mb-6">Project Details</h3>

              <div className="mb-8">
                <label className="block text-xs font-semibold text-secondary-600 uppercase tracking-wider mb-3">
                  Project Type *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {projectTypeOptions.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setProject((p) => ({ ...p, type }));
                        setErrors((e) => ({ ...e, type: '' }));
                      }}
                      className={`py-2.5 px-4 rounded-xl border text-sm font-medium transition-all ${
                        project.type === type
                          ? 'border-secondary-400 bg-secondary-400/10 text-secondary-700'
                          : 'border-warm bg-primary-50 text-secondary-600 hover:border-secondary-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
              </div>

              <div className="mb-8">
                <label className="block text-xs font-semibold text-secondary-600 uppercase tracking-wider mb-3">
                  Timeline *
                </label>
                <div className="space-y-2">
                  {timelineOptions.map((tl) => (
                    <button
                      key={tl}
                      type="button"
                      onClick={() => {
                        setProject((p) => ({ ...p, timeline: tl }));
                        setErrors((e) => ({ ...e, timeline: '' }));
                      }}
                      className={`w-full text-left py-2.5 px-4 rounded-xl border text-sm transition-all ${
                        project.timeline === tl
                          ? 'border-secondary-400 bg-secondary-400/10 text-secondary-700'
                          : 'border-warm bg-primary-50 text-secondary-600 hover:border-secondary-300'
                      }`}
                    >
                      {tl}
                    </button>
                  ))}
                </div>
                {errors.timeline && <p className="text-red-500 text-xs mt-1">{errors.timeline}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary-600 uppercase tracking-wider mb-2">
                  Additional Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Any special requirements, delivery notes, or questions..."
                  value={project.notes}
                  onChange={(e) => setProject((p) => ({ ...p, notes: e.target.value }))}
                  className={`${inputCls()} resize-none`}
                />
              </div>
            </div>
          )}

          <div className="px-6 sm:px-10 pb-6 sm:pb-8 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 border-t border-warm pt-6">
            <button
              type="button"
              onClick={prev}
              disabled={step === 0}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-secondary-600 border border-warm bg-white hover:bg-primary-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} /> Back
            </button>
            {step < 3 ? (
              <button
                type="button"
                onClick={next}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white gradient-secondary hover:opacity-90 transition-all w-full sm:w-auto"
              >
                Continue <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={sendWhatsAppQuote}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition-all w-full sm:w-auto"
              >
                <MessageCircle size={16} /> Submit Quote on WhatsApp
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
