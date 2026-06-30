import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, CreditCard, Lock, Sparkles, Check, CheckCircle2, Loader, ChevronRight, HelpCircle, Calendar, Clock } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

// --- Premium Lazy Loading Image Wrapper with Placeholder ---
const PaymentLogoImage = ({ src, alt, className = "h-12 w-auto object-contain" }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative inline-flex items-center justify-center overflow-hidden flex-shrink-0">
      {!loaded && (
        <div className="absolute inset-0 bg-gray-100/60 animate-pulse rounded-md flex items-center justify-center w-full h-full">
          <span className="text-[8px] text-gray-400 font-extrabold uppercase tracking-widest scale-75">Loading</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

// --- Premium Online Brand Logo Components ---
const GPayLogo = () => (
  <PaymentLogoImage
    src="https://play-lh.googleusercontent.com/Wbik2RoUSGgWEg8ybAhFaMJO2fE7x9gqCXfwbmW0YPjh6TKcjKzecth8GaYkbUBYtLZXhyfVMpqkIuJgTM8p"
    alt="Google Pay"
    className="h-7 w-7 rounded-lg object-contain select-none pointer-events-none"
  />
);

const PhonePeLogo = () => (
  <PaymentLogoImage
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX1y9bRtwN4tkv5dwh33YdbbnJIBj-PRHmWg&s"
    alt="PhonePe"
    className="h-7 w-7 rounded-lg object-contain select-none pointer-events-none"
  />
);

const PaytmLogo = () => (
  <PaymentLogoImage
    src="https://play-lh.googleusercontent.com/WDGsMRuVENnZPEpV4DEaXw12qtMY3em85xpmZqcXzeh0iT_eXFtAU9VUj-Z7xNQQd5DMqrkKSs9D0qbI1rlt"
    alt="Paytm"
    className="h-7 w-7 rounded-lg object-contain select-none pointer-events-none"
  />
);

const BhimLogo = () => (
  <PaymentLogoImage
    src="https://pbs.twimg.com/profile_images/814869197025148928/sdmlM4R-_400x400.jpg"
    alt="BHIM UPI"
    className="h-7 w-7 rounded-lg object-contain select-none pointer-events-none"
  />
);

const VisaLogo = () => (
  <PaymentLogoImage
    src="https://img.icons8.com/color/1200/visa.jpg"
    alt="Visa"
    className="h-4.5 w-auto object-contain select-none pointer-events-none"
  />
);

const MastercardLogo = () => (
  <PaymentLogoImage
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1280px-MasterCard_Logo.svg.png"
    alt="Mastercard"
    className="h-4.5 w-auto object-contain select-none pointer-events-none"
  />
);

const RupayLogo = () => (
  <PaymentLogoImage
    src="https://upload.wikimedia.org/wikipedia/commons/d/d1/RuPay_logo.svg"
    alt="RuPay"
    className="h-3.5 w-auto object-contain select-none pointer-events-none"
  />
);

const AmexLogo = () => (
  <PaymentLogoImage
    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"
    alt="American Express"
    className="h-4.5 w-auto object-contain select-none pointer-events-none"
  />
);

const SbiLogo = () => (
  <PaymentLogoImage
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7sfS9jVnm4AVSxsIiDPeE3-5PUM0aVPSgd8vjtauJXQ&s=10"
    alt="State Bank of India"
    className="h-5 w-5 object-contain select-none pointer-events-none"
  />
);

const HdfcLogo = () => (
  <PaymentLogoImage
    src="https://images.seeklogo.com/logo-png/55/2/hdfc-bank-logo-png_seeklogo-556499.png"
    alt="HDFC Bank"
    className="h-4.5 w-auto object-contain select-none pointer-events-none"
  />
);

const IciciLogo = () => (
  <PaymentLogoImage
    src="https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg"
    alt="ICICI Bank"
    className="h-4.5 w-auto object-contain select-none pointer-events-none"
  />
);

const AxisLogo = () => (
  <PaymentLogoImage
    src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Axis_Bank_logo.svg"
    alt="Axis Bank"
    className="h-4.5 w-auto object-contain select-none pointer-events-none"
  />
);

const CodLogo = () => (
  <PaymentLogoImage
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnQPbG-w5ebyncbAkdm3bbPqkAlSVLpD-HA8GHWoiWd6aptFGK4UoWTbQ&s=10"
    alt="Cash on Delivery"
    className="h-6 w-6 object-contain select-none pointer-events-none"
  />
);

// --- Location Autocomplete Database ---
const LOCATION_DATABASE = [
  { city: 'Mumbai', state: 'Maharashtra', pincode: '400001', streets: ['Linking Road', 'Hill Road', 'Marine Drive', 'Colaba Causeway', 'MG Road'], areas: ['Bandra West', 'Colaba', 'Andheri West', 'Juhu', 'Worli'] },
  { city: 'Delhi', state: 'Delhi', pincode: '110001', streets: ['Connaught Place', 'Janpath', 'Rajpath', 'Chandni Chowk', 'Ring Road'], areas: ['Connaught Place', 'Karol Bagh', 'South Ext', 'Saket', 'Dwarka'] },
  { city: 'Bangalore', state: 'Karnataka', pincode: '560001', streets: ['Brigade Road', 'Commercial Street', '100 Feet Road', 'MG Road', 'Indiranagar Double Road'], areas: ['Indiranagar', 'Koramangala', 'Jayanagar', 'HSR Layout', 'Whitefield'] },
  { city: 'Pune', state: 'Maharashtra', pincode: '411001', streets: ['FC Road', 'JM Road', 'MG Road', 'Senapati Bapat Road', 'Viman Nagar Road'], areas: ['Kothrud', 'Viman Nagar', 'Koregaon Park', 'Shivajinagar', 'Hadapsar'] },
  { city: 'Hyderabad', state: 'Telangana', pincode: '500001', streets: ['Road No 36 Jubilee Hills', 'Banjara Hills Road', 'Gachibowli Road', 'Abids Road'], areas: ['Jubilee Hills', 'Banjara Hills', 'Gachibowli', 'Madhapur', 'Secunderabad'] },
  { city: 'Chennai', state: 'Tamil Nadu', pincode: '600001', streets: ['Anna Salai', 'Mount Road', 'OMR Road', 'Pondy Bazaar', 'Radhakrishnan Salai'], areas: ['T Nagar', 'Adyar', 'Mylapore', 'Velachery', 'Nungambakkam'] },
];

const CheckoutModal = ({ isOpen, onClose }) => {
  const { cart, clearCart, cartTotal, cartCount, refetchCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Address State
  const [addressForm, setAddressForm] = useState({
    fullName: '',
    phone: '',
    houseFlat: '',
    street: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
  });

  // Auto Suggestion State
  const [activeSugField, setActiveSugField] = useState(''); // 'street', 'area', 'city', 'state'
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('');

  // Fetch Bangalore address suggestions from Nominatim API (OpenStreetMap)
  const fetchAddressSuggestions = async (query, fieldName) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }
    setLoadingSuggestions(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}+Bangalore&format=json&addressdetails=1&limit=5&countrycodes=in`,
        {
          headers: {
            'Accept-Language': 'en',
            'User-Agent': 'RentEase-Rental-Platform/1.0',
          }
        }
      );
      const data = await response.json();

      const parsed = data.map(item => {
        const addr = item.address || {};
        const road = addr.road || '';
        const suburb = addr.suburb || addr.neighbourhood || addr.residential || addr.village || '';
        const city = addr.city || addr.town || addr.municipality || 'Bangalore';
        const state = addr.state || 'Karnataka';
        const postcode = addr.postcode || '560001';

        // Custom formulation for street and area
        const streetVal = road || item.name || '';
        const areaVal = suburb || road || item.name || '';

        return {
          displayName: item.display_name,
          name: item.name || streetVal,
          street: streetVal,
          area: areaVal,
          city: city,
          state: state,
          pincode: postcode,
        };
      });
      setSuggestions(parsed);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  useEffect(() => {
    if (!searchQuery || searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }
    const delayDebounce = setTimeout(() => {
      fetchAddressSuggestions(searchQuery, searchField);
    }, 450);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, searchField]);

  // Handler when a suggestion is clicked
  const handleSelectSuggestion = (sug) => {
    setAddressForm(prev => ({
      ...prev,
      street: sug.street,
      area: sug.area,
      city: sug.city === 'Bengaluru' ? 'Bangalore' : sug.city,
      state: sug.state,
      pincode: sug.pincode
    }));
    setSuggestions([]);
    setActiveSugField('');
    setSearchQuery('');
  };

  // Fallback handlers for local DB (city, state)
  const handleCityChange = (val) => {
    const match = LOCATION_DATABASE.find(l => l.city.toLowerCase() === val.toLowerCase());
    if (match) {
      setAddressForm(prev => ({
        ...prev,
        city: val,
        state: match.state,
        pincode: match.pincode
      }));
    } else {
      setAddressForm(prev => ({ ...prev, city: val }));
    }
  };

  const handleStateChange = (val) => {
    const match = LOCATION_DATABASE.find(l => l.state.toLowerCase() === val.toLowerCase());
    if (match) {
      setAddressForm(prev => ({
        ...prev,
        state: val,
        city: match.city,
        pincode: match.pincode
      }));
    } else {
      setAddressForm(prev => ({ ...prev, state: val }));
    }
  };

  const handleStreetChange = (val) => {
    setAddressForm(prev => ({ ...prev, street: val }));
    setSearchField('street');
    setSearchQuery(val);
  };

  const handleAreaChange = (val) => {
    setAddressForm(prev => ({ ...prev, area: val }));
    setSearchField('area');
    setSearchQuery(val);
  };

  const triggerCitySuggestions = (val) => {
    setAddressForm(prev => ({ ...prev, city: val }));
    if (!val) {
      setSuggestions([]);
      return;
    }
    const query = val.toLowerCase();
    const cities = LOCATION_DATABASE.map(l => l.city);
    const matched = [...new Set(cities)].filter(c => c.toLowerCase().includes(query));
    const mapped = matched.map(c => ({
      displayName: `${c}, India`,
      name: c,
      street: '',
      area: '',
      city: c,
      state: 'Karnataka',
      pincode: '560001'
    }));
    setSuggestions(mapped.slice(0, 5));
  };

  const triggerStateSuggestions = (val) => {
    setAddressForm(prev => ({ ...prev, state: val }));
    if (!val) {
      setSuggestions([]);
      return;
    }
    const query = val.toLowerCase();
    const states = LOCATION_DATABASE.map(l => l.state);
    const matched = [...new Set(states)].filter(s => s.toLowerCase().includes(query));
    const mapped = matched.map(s => ({
      displayName: `${s}, India`,
      name: s,
      street: '',
      area: '',
      city: 'Bangalore',
      state: s,
      pincode: '560001'
    }));
    setSuggestions(mapped.slice(0, 5));
  };
  const [saveAddress, setSaveAddress] = useState(true);
  const [useSavedAddress, setUseSavedAddress] = useState(true);
  const [errors, setErrors] = useState({});

  // Rental Setup State
  const [rentalDuration, setRentalDuration] = useState(12); // Kept for backend payload compatibility
  const [deliveryDate, setDeliveryDate] = useState(new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]); // Default to 2 days from now
  const [deliveryTime, setDeliveryTime] = useState('Morning');

  // Payment Setup State
  const [paymentMethod, setPaymentMethod] = useState('upi'); // upi, card, netbanking, cod, wallets
  const [upiId, setUpiId] = useState('');
  const [upiProvider, setUpiProvider] = useState(''); // gpay, phonepe, paytm
  const [cardForm, setCardForm] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');

  // Checkout Stages: 'details' -> 'processing' -> 'success'
  const [stage, setStage] = useState('details');
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  // Populate address details from user if available
  useEffect(() => {
    if (user) {
      setAddressForm((prev) => ({
        ...prev,
        fullName: user.fullName || '',
        phone: user.phone ? user.phone.replace(/\D/g, '').slice(-10) : '',
      }));
      if (user.address && user.address.street) {
        const parts = user.address.street.split(',').map((p) => p.trim());
        setAddressForm((prev) => ({
          ...prev,
          houseFlat: parts[0] || '',
          street: parts[1] || parts[0] || '',
          area: parts.slice(2).join(', ') || '',
          city: user.address.city || '',
          state: user.address.state || '',
          pincode: user.address.zipCode || '',
        }));
        setUseSavedAddress(true);
      } else {
        setUseSavedAddress(false);
      }
    }
  }, [user]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Validation
  const validateAddress = () => {
    const newErrors = {};
    if (!addressForm.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!addressForm.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(addressForm.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }
    if (!addressForm.houseFlat.trim()) newErrors.houseFlat = 'Flat/House number is required';
    if (!addressForm.street.trim()) newErrors.street = 'Street details are required';
    if (!addressForm.city.trim()) newErrors.city = 'City is required';
    if (!addressForm.state.trim()) newErrors.state = 'State is required';
    if (!addressForm.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(addressForm.pincode.trim())) {
      newErrors.pincode = 'Enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showValidationError = (msg) => {
    toast.error(msg, {
      id: 'checkout-validation-error',
      position: 'top-center',
      style: {
        background: '#EF4444',
        color: '#FFF',
        fontWeight: '600',
        borderRadius: '9999px',
        maxWidth: 'none',
      },
    });
  };

  const validatePayment = () => {
    if (paymentMethod === 'upi') {
      const trimmedUpi = upiId.trim();
      if (!trimmedUpi) {
        setErrors((prev) => ({ ...prev, upiId: 'UPI ID is required' }));
        return false;
      }
      
      let finalUpi = trimmedUpi;
      if (!finalUpi.includes('@')) {
        if (upiProvider === 'gpay') finalUpi += '@okaxis';
        else if (upiProvider === 'phonepe') finalUpi += '@ybl';
        else if (upiProvider === 'paytm') finalUpi += '@paytm';
        else if (upiProvider === 'bhim') finalUpi += '@upi';
        else {
          setErrors((prev) => ({ ...prev, upiId: 'Please enter a valid UPI ID or select an app' }));
          return false;
        }
      } else {
        const suffix = finalUpi.substring(finalUpi.indexOf('@')).toLowerCase();
        if (upiProvider === 'gpay' && suffix !== '@okaxis') {
          setErrors((prev) => ({ ...prev, upiId: 'UPI ID must end with @okaxis for Google Pay' }));
          return false;
        }
        if (upiProvider === 'phonepe' && suffix !== '@ybl') {
          setErrors((prev) => ({ ...prev, upiId: 'UPI ID must end with @ybl for PhonePe' }));
          return false;
        }
        if (upiProvider === 'paytm' && suffix !== '@paytm') {
          setErrors((prev) => ({ ...prev, upiId: 'UPI ID must end with @paytm for Paytm' }));
          return false;
        }
        if (upiProvider === 'bhim' && suffix !== '@upi') {
          setErrors((prev) => ({ ...prev, upiId: 'UPI ID must end with @upi for BHIM UPI' }));
          return false;
        }
      }
      
      if (!/^[a-zA-Z0-9.\-_]+@[a-zA-Z0-9.\-_]+$/.test(finalUpi)) {
        setErrors((prev) => ({ ...prev, upiId: 'Please enter a valid UPI ID (e.g. name@upi)' }));
        return false;
      }
      
      setErrors((prev) => {
        const { upiId, ...rest } = prev;
        return rest;
      });
      setUpiId(finalUpi);
    } else if (paymentMethod === 'card') {
      const cleanNum = cardForm.number.replace(/\s+/g, '');
      if (cleanNum.length < 15 || cleanNum.length > 16) {
        showValidationError('Please enter a valid Credit/Debit Card Number');
        return false;
      }
      if (!cardForm.name.trim()) {
        showValidationError('Card Holder Name is required');
        return false;
      }
      if (!/^\d{2}\/\d{2}$/.test(cardForm.expiry)) {
        showValidationError('Expiry Date must be in MM/YY format');
        return false;
      }
      
      const [monthStr, yearStr] = cardForm.expiry.split('/');
      const month = parseInt(monthStr, 10);
      const year = parseInt('20' + yearStr, 10);
      
      if (month < 1 || month > 12) {
        showValidationError('Invalid expiry month (must be 01-12)');
        return false;
      }
      
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();
      
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        showValidationError('Card has expired');
        return false;
      }
      
      if (cardForm.cvv.length < 3 || cardForm.cvv.length > 4) {
        showValidationError('Please enter a valid CVV code');
        return false;
      }
    } else if (paymentMethod === 'wallets' && !selectedWallet) {
      showValidationError('Please select your preferred Wallet');
      return false;
    }
    return true;
  };

  // Pricing Calculations
  const discount = cartCount >= 3 ? 200 : 0;
  const subtotal = cartTotal;
  const securityDeposit = cart.reduce(
    (total, item) => total + (item.product?.securityDeposit || item.monthlyRent) * item.quantity,
    0
  );
  const gstAmount = Math.round(subtotal * 0.18);
  const totalPayableToday = subtotal + securityDeposit + gstAmount - discount;
  const futureMonthlyRent = subtotal - discount;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Auto-detect Card Type Icon
  const getCardIcon = (num) => {
    const cleanNum = num.replace(/\s+/g, '');
    if (cleanNum.startsWith('4')) return <VisaLogo />;
    if (/^5[1-5]/.test(cleanNum)) return <MastercardLogo />;
    if (/^6(0|1|2|5)/.test(cleanNum)) return <RupayLogo />;
    if (/^3[47]/.test(cleanNum)) return <AmexLogo />;
    return null;
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    let formatted = value.match(/.{1,4}/g)?.join(' ') || '';
    setCardForm({ ...cardForm, number: formatted.substring(0, 19) });
  };

  const handleCardExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setCardForm({ ...cardForm, expiry: value.substring(0, 5) });
  };

  // Handle Checkout Click
  const handleProceedToPayment = async (e) => {
    e.preventDefault();

    if (!useSavedAddress && !validateAddress()) {
      showValidationError('Please fill in the checkout details to proceed to payment');
      return;
    }

    if (!deliveryDate) {
      showValidationError('Please pick a preferred delivery date');
      return;
    }
    const minDeliveryDate = new Date(Date.now() + 86400000 * 2);
    minDeliveryDate.setHours(0, 0, 0, 0);
    const chosenDate = new Date(deliveryDate);
    chosenDate.setHours(0, 0, 0, 0);
    if (chosenDate < minDeliveryDate) {
      showValidationError('Delivery date must be at least 2 days from today');
      return;
    }

    if (!validatePayment()) {
      return;
    }

    // Validate if any item in cart is Out of Stock or has insufficient stock
    const hasOutOfStock = cart.some(item => {
      const prod = item.product;
      return prod.stockStatus === 'Out of Stock' || prod.availability === false || prod.stock < item.quantity;
    });

    if (hasOutOfStock) {
      showValidationError('This product is no longer available.');
      return;
    }

    // Move to Processing stage
    setStage('processing');

    // Assemble payload
    const orderItems = cart.map((item) => ({
      product: item.product?._id || item.product?.id,
      quantity: item.quantity,
      rent: item.monthlyRent,
    }));

    const finalAddress = useSavedAddress
      ? {
        fullName: user.fullName,
        phone: user.phone || '9999999999',
        houseFlat: addressForm.houseFlat || 'Saved Flat',
        street: addressForm.street || 'Saved Street',
        area: addressForm.area || 'Saved Area',
        city: addressForm.city || 'Saved City',
        state: addressForm.state || 'Saved State',
        pincode: addressForm.pincode || '400001',
      }
      : addressForm;

    const payload = {
      products: orderItems,
      address: finalAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Paid',
      rentalDuration: Number(rentalDuration),
      deliveryDate: new Date(deliveryDate),
      deliveryTime,
      totalAmount: totalPayableToday,
      monthlyRent: futureMonthlyRent,
      securityDeposit,
      saveAddress: !useSavedAddress && saveAddress,
    };

    // Simulate Payment delay (2.5 seconds)
    setTimeout(async () => {
      try {
        const { data } = await api.post('/orders', payload);
        if (data.success) {
          setGeneratedOrderId(data.order.orderId);
          setStage('success');
          // Clear cart on success
          await clearCart();
          await refetchCart();
          toast.success('Order Placed Successfully', {
            id: 'checkout-success-toast',
            position: 'top-center',
            style: {
              background: '#10B981',
              color: '#FFF',
              fontWeight: '600',
              borderRadius: '9999px',
              maxWidth: 'none',
            },
          });
        }
      } catch (err) {
        console.error('Checkout API error:', err);
        setStage('details');
        toast.error(err.response?.data?.message || 'Payment Failed. Please try again.', {
          id: 'checkout-error-toast',
          position: 'top-center',
          style: {
            background: '#EF4444',
            color: '#FFF',
            fontWeight: '600',
            borderRadius: '9999px',
            maxWidth: 'none',
          },
        });
      }
    }, 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-hidden">
        {/* Backdrop glass blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={stage === 'details' ? onClose : undefined}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-5xl h-[90vh] md:h-[680px] overflow-hidden z-10 flex flex-col"
        >
          {/* Close button (only active during configuration) */}
          {stage === 'details' && (
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors z-20 cursor-pointer border border-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Checkout Configuration View */}
          {stage === 'details' && (
            <div className="flex-grow flex flex-col md:flex-row h-full overflow-hidden">
              {/* Left Side: Forms (65% width) */}
              <div className="w-full md:w-[65%] p-6 md:p-10 overflow-y-auto no-scrollbar border-b md:border-b-0 md:border-r border-gray-100 h-full">
                <div className="space-y-8">
                  {/* Header */}
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Checkout</h2>
                    <p className="text-sm text-gray-500 font-medium mt-1">Complete your rental order securely.</p>
                  </div>

                  {/* 1. Delivery Address Section */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">1. Delivery Address</h3>
                      {user?.address?.street && (
                        <button
                          type="button"
                          onClick={() => setUseSavedAddress(!useSavedAddress)}
                          className="text-xs font-bold text-[#E53935] hover:underline"
                        >
                          {useSavedAddress ? 'Edit / Enter New Address' : 'Use Saved Address'}
                        </button>
                      )}
                    </div>

                    {useSavedAddress && user?.address?.street ? (
                      /* Pre-saved address card */
                      <div className="p-5 rounded-2xl border-2 border-[#E53935] bg-red-50/10 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#E53935] flex-shrink-0">
                          <Check className="w-5 h-5" />
                        </div>
                        <div className="text-sm space-y-1">
                          <p className="font-extrabold text-gray-800">{user.fullName}</p>
                          <p className="text-gray-600 font-semibold">{user.address.street}</p>
                          <p className="text-gray-600 font-semibold">
                            {user.address.city}, {user.address.state} - {user.address.zipCode}
                          </p>
                          <p className="text-gray-500 font-medium text-xs pt-1">Tel: {user.phone}</p>
                        </div>
                      </div>
                    ) : (
                      /* Address Input Form */
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">Full Name</label>
                          <input
                            type="text"
                            placeholder="John Doe"
                            value={addressForm.fullName}
                            onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                            className={`w-full px-4 py-2.5 rounded-xl border bg-gray-50/30 text-sm font-semibold transition-all duration-200 focus:outline-none ${errors.fullName
                              ? 'border-red-300 bg-red-50/5 focus:border-red-500 focus:ring-2 focus:ring-red-500/10'
                              : 'border-gray-200 focus:border-[#E53935] focus:ring-2 focus:ring-red-500/10'
                              }`}
                          />
                          {errors.fullName && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-[11px] font-bold text-red-500 flex items-center gap-1 mt-1"
                            >
                              <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                              {errors.fullName}
                            </motion.p>
                          )}
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">Phone Number</label>
                          <div className={`flex items-center rounded-xl border bg-gray-50/30 overflow-hidden transition-all duration-200 focus-within:ring-2 focus-within:ring-red-500/10 ${errors.phone
                            ? 'border-red-300 bg-red-50/5 focus-within:border-red-500'
                            : 'border-gray-200 focus-within:border-[#E53935]'
                            }`}>
                            <span className="px-3 text-sm font-bold text-gray-400 border-r border-gray-200/65 bg-gray-100/50 py-2.5 select-none">+91</span>
                            <input
                              type="text"
                              placeholder="9999999999"
                              value={addressForm.phone}
                              maxLength={10}
                              onChange={(e) => {
                                const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                                setAddressForm({ ...addressForm, phone: digits });
                              }}
                              className="w-full px-3 bg-transparent text-sm font-semibold focus:outline-none"
                            />
                          </div>
                          {errors.phone && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-[11px] font-bold text-red-500 flex items-center gap-1 mt-1"
                            >
                              <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                              {errors.phone}
                            </motion.p>
                          )}
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">House / Flat No.</label>
                          <input
                            type="text"
                            placeholder="Flat 101, building A"
                            value={addressForm.houseFlat}
                            onChange={(e) => setAddressForm({ ...addressForm, houseFlat: e.target.value })}
                            className={`w-full px-4 py-2.5 rounded-xl border bg-gray-50/30 text-sm font-semibold transition-all duration-200 focus:outline-none ${errors.houseFlat
                              ? 'border-red-300 bg-red-50/5 focus:border-red-500 focus:ring-2 focus:ring-red-500/10'
                              : 'border-gray-200 focus:border-[#E53935] focus:ring-2 focus:ring-red-500/10'
                              }`}
                          />
                          {errors.houseFlat && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-[11px] font-bold text-red-500 flex items-center gap-1 mt-1"
                            >
                              <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                              {errors.houseFlat}
                            </motion.p>
                          )}
                        </div>

                        <div className="space-y-1 relative">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">Street Name</label>
                          <input
                            type="text"
                            placeholder="Linking Road"
                            value={addressForm.street}
                            onChange={(e) => handleStreetChange(e.target.value)}
                            onFocus={() => {
                              setActiveSugField('street');
                              handleStreetChange(addressForm.street);
                            }}
                            onBlur={() => setTimeout(() => setActiveSugField(''), 200)}
                            className={`w-full px-4 py-2.5 rounded-xl border bg-gray-50/30 text-sm font-semibold transition-all duration-200 focus:outline-none ${errors.street
                              ? 'border-red-300 bg-red-50/5 focus:border-red-500 focus:ring-2 focus:ring-red-500/10'
                              : 'border-gray-200 focus:border-[#E53935] focus:ring-2 focus:ring-red-500/10'
                              }`}
                          />
                          {activeSugField === 'street' && (suggestions.length > 0 || loadingSuggestions) && (
                            <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-150 rounded-xl shadow-lg z-30 max-h-48 overflow-y-auto no-scrollbar py-1">
                              {loadingSuggestions ? (
                                <div className="px-4 py-3 text-xs font-bold text-gray-400 flex items-center gap-2">
                                  <div className="w-3.5 h-3.5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                                  Searching places in Bangalore...
                                </div>
                              ) : (
                                suggestions.map((sug, i) => (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => handleSelectSuggestion(sug)}
                                    className="w-full text-left px-4 py-2 hover:bg-red-50/10 text-xs font-semibold text-gray-700 transition-colors cursor-pointer block border-b border-gray-50 last:border-0"
                                  >
                                    <span className="font-extrabold text-gray-900 block">{sug.street}</span>
                                    <span className="text-[10px] text-gray-400 block truncate">{sug.displayName}</span>
                                  </button>
                                ))
                              )}
                            </div>
                          )}
                          {errors.street && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-[11px] font-bold text-red-500 flex items-center gap-1 mt-1"
                            >
                              <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                              {errors.street}
                            </motion.p>
                          )}
                        </div>

                        <div className="space-y-1 relative">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">Area / Landmark</label>
                          <input
                            type="text"
                            placeholder="Opposite Metro Station"
                            value={addressForm.area}
                            onChange={(e) => handleAreaChange(e.target.value)}
                            onFocus={() => {
                              setActiveSugField('area');
                              handleAreaChange(addressForm.area);
                            }}
                            onBlur={() => setTimeout(() => setActiveSugField(''), 200)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 text-sm font-semibold transition-all duration-200 focus:outline-none focus:border-[#E53935] focus:ring-2 focus:ring-red-500/10"
                          />
                          {activeSugField === 'area' && (suggestions.length > 0 || loadingSuggestions) && (
                            <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-150 rounded-xl shadow-lg z-30 max-h-48 overflow-y-auto no-scrollbar py-1">
                              {loadingSuggestions ? (
                                <div className="px-4 py-3 text-xs font-bold text-gray-400 flex items-center gap-2">
                                  <div className="w-3.5 h-3.5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                                  Searching areas in Bangalore...
                                </div>
                              ) : (
                                suggestions.map((sug, i) => (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => handleSelectSuggestion(sug)}
                                    className="w-full text-left px-4 py-2 hover:bg-red-50/10 text-xs font-semibold text-gray-700 transition-colors cursor-pointer block border-b border-gray-50 last:border-0"
                                  >
                                    <span className="font-extrabold text-gray-900 block">{sug.area}</span>
                                    <span className="text-[10px] text-gray-400 block truncate">{sug.displayName}</span>
                                  </button>
                                ))
                              )}
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-3 gap-2 col-span-1 md:col-span-2">
                          <div className="space-y-1 relative">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">City</label>
                            <input
                              type="text"
                              placeholder="Mumbai"
                              value={addressForm.city}
                              onChange={(e) => triggerCitySuggestions(e.target.value)}
                              onFocus={() => {
                                setActiveSugField('city');
                                triggerCitySuggestions(addressForm.city);
                              }}
                              onBlur={() => setTimeout(() => setActiveSugField(''), 200)}
                              className={`w-full px-3 py-2.5 rounded-xl border bg-gray-50/30 text-sm font-semibold transition-all duration-200 focus:outline-none ${errors.city
                                ? 'border-red-300 bg-red-50/5 focus:border-red-500 focus:ring-2 focus:ring-red-500/10'
                                : 'border-gray-200 focus:border-[#E53935] focus:ring-2 focus:ring-red-500/10'
                                }`}
                            />
                            {activeSugField === 'city' && suggestions.length > 0 && (
                              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-150 rounded-xl shadow-lg z-30 max-h-40 overflow-y-auto no-scrollbar py-1">
                                {suggestions.map((sug, i) => (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => handleSelectSuggestion(sug)}
                                    className="w-full text-left px-4 py-2 hover:bg-red-50/10 text-xs font-bold text-gray-700 transition-colors cursor-pointer"
                                  >
                                    {sug.city}
                                  </button>
                                ))}
                              </div>
                            )}
                            {errors.city && (
                              <motion.p
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-[10px] font-bold text-red-500 flex items-center gap-1 mt-1"
                              >
                                <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                                {errors.city}
                              </motion.p>
                            )}
                          </div>
                          <div className="space-y-1 relative">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">State</label>
                            <input
                              type="text"
                              placeholder="Maharashtra"
                              value={addressForm.state}
                              onChange={(e) => triggerStateSuggestions(e.target.value)}
                              onFocus={() => {
                                setActiveSugField('state');
                                triggerStateSuggestions(addressForm.state);
                              }}
                              onBlur={() => setTimeout(() => setActiveSugField(''), 200)}
                              className={`w-full px-3 py-2.5 rounded-xl border bg-gray-50/30 text-sm font-semibold transition-all duration-200 focus:outline-none ${errors.state
                                ? 'border-red-300 bg-red-50/5 focus:border-red-500 focus:ring-2 focus:ring-red-500/10'
                                : 'border-gray-200 focus:border-[#E53935] focus:ring-2 focus:ring-red-500/10'
                                }`}
                            />
                            {activeSugField === 'state' && suggestions.length > 0 && (
                              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-150 rounded-xl shadow-lg z-30 max-h-40 overflow-y-auto no-scrollbar py-1">
                                {suggestions.map((sug, i) => (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => handleSelectSuggestion(sug)}
                                    className="w-full text-left px-4 py-2 hover:bg-red-50/10 text-xs font-bold text-gray-700 transition-colors cursor-pointer"
                                  >
                                    {sug.state}
                                  </button>
                                ))}
                              </div>
                            )}
                            {errors.state && (
                              <motion.p
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-[10px] font-bold text-red-500 flex items-center gap-1 mt-1"
                              >
                                <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                                {errors.state}
                              </motion.p>
                            )}
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">Pincode</label>
                            <input
                              type="text"
                              placeholder="Auto-filled"
                              value={addressForm.pincode}
                              readOnly
                              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 text-sm font-bold focus:outline-none cursor-not-allowed select-none"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 col-span-1 md:col-span-2 pt-1 select-none">
                          <input
                            type="checkbox"
                            id="saveAddress"
                            checked={saveAddress}
                            onChange={(e) => setSaveAddress(e.target.checked)}
                            className="rounded text-[#E53935] focus:ring-red-500 border-gray-300 w-4 h-4 cursor-pointer"
                          />
                          <label htmlFor="saveAddress" className="text-xs text-gray-500 font-semibold cursor-pointer">
                            Save address details for future checkouts
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 2. Rental details scheduling */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">2. Rental Schedule</h3>
                      <span className="text-[10px] font-black text-[#E53935] bg-red-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Fast Delivery (2+ Days)</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Delivery Date */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <label className="text-xs font-black text-gray-500 uppercase tracking-wider">Choose Delivery Date</label>
                        </div>
                        <input
                          type="date"
                          value={deliveryDate}
                          min={new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]} // Min 2 days from now
                          onChange={(e) => setDeliveryDate(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl border-2 border-gray-150 bg-white focus:outline-none focus:border-[#E53935] focus:ring-1 focus:ring-[#E53935]/10 text-sm font-bold text-gray-800 cursor-pointer transition-all duration-200 shadow-sm hover:border-gray-300"
                        />
                      </div>

                      {/* Time slot */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <label className="text-xs font-black text-gray-500 uppercase tracking-wider">Preferred Time Slot</label>
                        </div>
                        <select
                          value={deliveryTime}
                          onChange={(e) => setDeliveryTime(e.target.value)}
                          className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-150 bg-white focus:outline-none focus:border-[#E53935] focus:ring-1 focus:ring-[#E53935]/10 text-sm font-bold text-gray-800 cursor-pointer transition-all duration-200 shadow-sm hover:border-gray-300"
                        >
                          <option value="Morning">Morning (9 AM - 1 PM)</option>
                          <option value="Afternoon">Afternoon (1 PM - 5 PM)</option>
                          <option value="Evening">Evening (5 PM - 9 PM)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 3. Payment Methods */}
                  <div className="space-y-5">
                    <h3 className="text-lg font-black text-gray-800 uppercase tracking-widest">3. Payment Method</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* UPI selection card */}
                      <motion.button
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        whileHover={{ y: -4, shadow: "0 10px 20px -5px rgba(229, 57, 53, 0.08)" }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-5 rounded-2xl border-2 text-center bg-white transition-all duration-300 relative group cursor-pointer flex flex-col justify-between min-h-[155px] ${paymentMethod === 'upi'
                          ? 'border-[#E53935] bg-red-50/10 shadow-md shadow-red-100/40 ring-1 ring-red-500/10'
                          : 'border-gray-150 hover:border-gray-300 shadow-sm'
                          }`}
                      >
                        {paymentMethod === 'upi' && (
                          <div className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-[#E53935] text-white flex items-center justify-center animate-scale-in z-10">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                        <div className="h-12 flex items-center justify-center w-full">
                          <PaymentLogoImage
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt3SSwxEhPk3aQ89c5cEk7IyP_1TiB7o6sdPeumV8AKknDFbirbUZdpyiv&s=10"
                            alt="UPI"
                            className="h-11 w-auto object-contain transform scale-110"
                          />
                        </div>
                        <div className="mt-2 text-center">
                          <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider">UPI</h4>
                          <p className="text-[10px] text-gray-400 font-bold mt-1 leading-normal">Google Pay • PhonePe • Paytm • BHIM</p>
                        </div>
                      </motion.button>

                      {/* Card selection card */}
                      <motion.button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        whileHover={{ y: -4, shadow: "0 10px 20px -5px rgba(229, 57, 53, 0.08)" }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-5 rounded-2xl border-2 text-center transition-all duration-300 relative group cursor-pointer flex flex-col justify-between min-h-[155px] bg-white ${paymentMethod === 'card'
                          ? 'border-[#E53935] shadow-md shadow-red-100/40 ring-1 ring-red-500/10'
                          : 'border-gray-150 hover:border-gray-300 shadow-sm'
                          }`}
                      >
                        {paymentMethod === 'card' && (
                          <div className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-[#E53935] text-white flex items-center justify-center animate-scale-in z-10">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                        <div className="h-12 flex items-center gap-3 justify-center w-full">
                          <PaymentLogoImage
                            src="https://img.icons8.com/color/1200/visa.jpg"
                            alt="Visa"
                            className="h-8 w-auto object-contain"
                          />
                          <PaymentLogoImage
                            src="https://img.icons8.com/color/480/mastercard.png"
                            alt="Mastercard"
                            className="h-8 w-auto object-contain"
                          />
                        </div>
                        <div className="mt-2 text-center">
                          <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider">Debit / Credit Card</h4>
                          <p className="text-[10px] text-gray-400 font-bold mt-1 leading-normal">Visa • Mastercard • RuPay • Amex</p>
                        </div>
                      </motion.button>

                      {/* COD Card */}
                      <motion.button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        whileHover={{ y: -4, shadow: "0 10px 20px -5px rgba(229, 57, 53, 0.08)" }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-5 rounded-2xl border-2 text-center bg-white transition-all duration-300 relative group cursor-pointer flex flex-col justify-between min-h-[155px] ${paymentMethod === 'cod'
                          ? 'border-[#E53935] bg-red-50/10 shadow-md shadow-red-100/40 ring-1 ring-red-500/10'
                          : 'border-gray-150 hover:border-gray-300 shadow-sm'
                          }`}
                      >
                        {paymentMethod === 'cod' && (
                          <div className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-[#E53935] text-white flex items-center justify-center animate-scale-in z-10">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                        <div className="h-12 flex items-center justify-center w-full">
                          <PaymentLogoImage
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnQPbG-w5ebyncbAkdm3bbPqkAlSVLpD-HA8GHWoiWd6aptFGK4UoWTbQ&s=10"
                            alt="COD"
                            className="h-8.5 w-auto object-contain"
                          />
                        </div>
                        <div className="mt-2 text-center">
                          <h4 className="text-xs font-black text-gray-800 uppercase tracking-wider">Cash on Delivery</h4>
                          <p className="text-[10px] text-gray-400 font-bold mt-1 leading-normal">Cash / UPI at Delivery</p>
                        </div>
                      </motion.button>
                    </div>

                    {/* Payment Inputs Area */}
                    <div className="p-6 rounded-2xl bg-gray-50 border border-gray-150 mt-4 min-h-[140px] transition-all duration-300">
                      {paymentMethod === 'upi' && (
                        <div className="space-y-5 animate-fade-in">
                          <div className="space-y-2">
                            <span className="text-xs font-bold text-gray-500 uppercase">Pay Using App:</span>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {[
                                { name: 'Google Pay', val: 'gpay', logo: <GPayLogo /> },
                                { name: 'PhonePe', val: 'phonepe', logo: <PhonePeLogo /> },
                                { name: 'Paytm', val: 'paytm', logo: <PaytmLogo /> },
                                { name: 'BHIM UPI', val: 'bhim', logo: <BhimLogo /> }
                              ].map((app) => {
                                const isActive = upiProvider === app.val;
                                return (
                                  <button
                                    type="button"
                                    key={app.val}
                                    onClick={() => {
                                      setUpiProvider(app.val);
                                      setUpiId('');
                                      setErrors(prev => {
                                        const { upiId, ...rest } = prev;
                                        return rest;
                                      });
                                    }}
                                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border font-bold text-xs transition-all duration-200 cursor-pointer ${isActive
                                      ? 'border-[#E53935] text-[#E53935] bg-red-50/5 shadow-sm scale-[1.02]'
                                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                                      }`}
                                  >
                                    <div className="p-1 rounded bg-white flex items-center justify-center flex-shrink-0">
                                      {app.logo}
                                    </div>
                                    <span className="whitespace-nowrap">{app.name}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="space-y-1.5 max-w-md">
                            <label className="text-xs font-bold text-gray-600 uppercase">Enter UPI ID</label>
                            <input
                              type="text"
                              placeholder={
                                upiProvider === 'gpay' ? 'username@okaxis' :
                                upiProvider === 'phonepe' ? 'username@ybl' :
                                upiProvider === 'paytm' ? 'username@paytm' :
                                upiProvider === 'bhim' ? 'username@upi' :
                                'username@bank'
                              }
                              value={upiId}
                              onChange={(e) => {
                                setUpiId(e.target.value);
                                if (errors.upiId) {
                                  setErrors(prev => {
                                    const { upiId, ...rest } = prev;
                                    return rest;
                                  });
                                }
                              }}
                              className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold bg-white ${
                                errors.upiId ? 'border-[#E53935] focus:ring-red-500/20' : 'border-gray-200'
                              }`}
                            />
                            {errors.upiId && (
                              <p className="text-[#E53935] text-[10px] font-bold mt-1 animate-fade-in">{errors.upiId}</p>
                            )}
                            <p className="text-[10px] text-gray-400 font-medium">Your payment request will be sent to your selected UPI app.</p>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'card' && (
                        <div className="space-y-4 animate-fade-in">
                          <div className="relative">
                            <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Card Number</label>
                            <input
                              type="text"
                              placeholder="0000 0000 0000 0000"
                              value={cardForm.number}
                              onChange={handleCardNumberChange}
                              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold font-mono tracking-wider pl-12 bg-white"
                            />
                            <div className="absolute left-4 top-9 flex items-center justify-center h-5">
                              {getCardIcon(cardForm.number) ? (
                                getCardIcon(cardForm.number)
                              ) : (
                                <CreditCard className="text-gray-400 w-5 h-5" />
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="sm:col-span-1.5">
                              <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Card Holder Name</label>
                              <input
                                type="text"
                                placeholder="JOHN DOE"
                                value={cardForm.name}
                                onChange={(e) => setCardForm({ ...cardForm, name: e.target.value.toUpperCase() })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold bg-white"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Expiry Date</label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                value={cardForm.expiry}
                                onChange={handleCardExpiryChange}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold text-center bg-white"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">CVV</label>
                              <input
                                type="password"
                                placeholder="***"
                                maxLength="4"
                                value={cardForm.cvv}
                                onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value.replace(/\D/g, '') })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-bold text-center font-mono bg-white"
                              />
                            </div>
                          </div>
                        </div>
                      )}



                      {paymentMethod === 'cod' && (
                        <div className="p-4 rounded-xl bg-red-50/20 border border-red-100 flex items-start gap-4 animate-fade-in">
                          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E53935] flex items-center justify-center flex-shrink-0">
                            <CodLogo />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-sm font-extrabold text-gray-800">Cash on Delivery / UPI at Delivery Available</h4>
                            <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                              Our delivery executive will collect payment at the time of delivery. You can pay via cash or scan a dynamic UPI QR code on the spot.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Order Summary (35% width) */}
              <div className="w-full md:w-[35%] bg-gray-50 p-6 md:p-10 flex flex-col justify-between h-full overflow-y-auto no-scrollbar">
                <div className="space-y-6">
                  {/* Summary Header */}
                  <h3 className="text-3xl font-black text-gray-900 border-b border-gray-200 pb-3">Order Summary</h3>

                  {/* Summary Items list */}
                  <div className="space-y-3 max-h-[140px] overflow-y-auto no-scrollbar pr-1">
                    {cart.map((item) => (
                      <div key={item._id} className="flex justify-between items-start text-xs font-semibold gap-4">
                        <span className="text-gray-500 font-medium line-clamp-1 flex-1">{item.product?.name}</span>
                        <span className="text-gray-400 font-bold text-[10px] whitespace-nowrap">Qty: {item.quantity}</span>
                        <span className="text-gray-900 font-bold whitespace-nowrap">{formatCurrency(item.monthlyRent * item.quantity)}/mo</span>
                      </div>
                    ))}
                  </div>

                  {/* Price Calculations */}
                  <div className="border-t border-gray-200 pt-4 space-y-3.5 text-xs">
                    <div className="flex justify-between items-center text-gray-500">
                      <span>Monthly Rental Subtotal</span>
                      <span className="font-bold text-gray-800">{formatCurrency(subtotal)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between items-center text-emerald-600 font-semibold bg-emerald-50/50 px-2.5 py-1 rounded-lg border border-emerald-100">
                        <span>Multi-item discount</span>
                        <span>-{formatCurrency(discount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-gray-500">
                      <span>Refundable Security Deposit</span>
                      <span className="font-bold text-gray-800">{formatCurrency(securityDeposit)}</span>
                    </div>

                    <div className="flex justify-between items-center text-gray-500">
                      <span>GST Subscription Tax (18%)</span>
                      <span className="font-bold text-gray-800">{formatCurrency(gstAmount)}</span>
                    </div>

                    <div className="flex justify-between items-center text-gray-500">
                      <span>Delivery & Assembly Fees</span>
                      <span className="text-emerald-600 font-bold uppercase tracking-wider text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-150">
                        FREE
                      </span>
                    </div>

                    <div className="border-t border-dashed border-gray-200 pt-3.5 space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
                        <span>Total Payable Today</span>
                        <span>Subsequent Rent</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-2xl font-black text-[#E53935]">{formatCurrency(totalPayableToday)}</span>
                        <span className="text-sm font-black text-gray-800">{formatCurrency(futureMonthlyRent)}/mo</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer and Button */}
                <div className="mt-8 space-y-4">
                  {/* Checkout Button */}
                  <button
                    onClick={handleProceedToPayment}
                    className="w-full bg-gradient-to-r from-[#E53935] to-[#C62828] hover:from-[#C62828] hover:to-[#E53935] font-black text-white py-4 px-6 rounded-full shadow-lg shadow-red-500/20 hover:shadow-red-500/35 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    Proceed to Payment
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  {/* Trust details */}
                  <div className="space-y-2.5 pt-2 border-t border-gray-200/80">
                    <div className="flex justify-center items-center gap-4 text-gray-400">
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider">
                        <Lock className="w-3.5 h-3.5 text-emerald-600" />
                        SSL Secured
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        100% Safe Checkout
                      </div>
                    </div>
                    {/* Payment Cards logo row */}
                    <div className="flex justify-center items-center gap-2 opacity-30 text-[10px] font-black uppercase text-center text-gray-700 tracking-widest select-none">
                      <span>UPI</span> • <span>VISA</span> • <span>MASTERCARD</span> • <span>RUPAY</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Processing Loading Screen */}
          {stage === 'processing' && (
            <div className="flex-grow flex flex-col items-center justify-center p-10 space-y-6 text-center">
              <div className="w-20 h-20 rounded-3xl bg-red-50 border border-red-100 flex items-center justify-center relative animate-pulse shadow-md">
                <Loader className="w-10 h-10 text-[#E53935] animate-spin" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Processing Payment...</h3>
                <p className="text-sm text-gray-500 max-w-sm mx-auto font-medium">
                  Verifying transaction details securely with your banking gateway. Do not refresh or close window.
                </p>
              </div>
            </div>
          )}

          {/* Payment Success View */}
          {stage === 'success' && (
            <div className="flex-grow flex flex-col items-center justify-center p-10 text-center relative overflow-hidden bg-white">
              {/* Confetti particles Simulation */}
              <div className="absolute inset-0 pointer-events-none select-none opacity-80 overflow-hidden">
                <div className="absolute top-10 left-1/4 w-3.5 h-3.5 rounded bg-emerald-400 rotate-12 animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="absolute top-20 right-1/4 w-3.5 h-3.5 rounded-full bg-[#E53935] animate-bounce" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-24 left-1/3 w-3 h-3 rounded bg-amber-400 rotate-45 animate-bounce" style={{ animationDelay: '0.7s' }} />
                <div className="absolute top-12 right-1/3 w-2 h-4 rounded bg-blue-400 -rotate-12 animate-bounce" style={{ animationDelay: '0.1s' }} />
              </div>

              {/* Success Badge - Animated Checkmark drawing */}
              <div className="w-24 h-24 flex items-center justify-center bg-emerald-50/50 rounded-full border border-emerald-100 shadow-inner">
                <svg
                  className="w-16 h-16 text-emerald-500"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.circle
                    cx="26"
                    cy="26"
                    r="23"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <motion.path
                    d="M16 27l7 7 13-16"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.6 }}
                  />
                </svg>
              </div>

              <div className="mt-6 space-y-2 max-w-md">
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">Payment Successful</h3>
                <p className="text-sm text-gray-500 font-medium">
                  Thank you for choosing <span className="font-extrabold text-gray-800">RentEase</span>. Your rental order has been placed successfully.
                </p>
              </div>

              {/* Order reference tag */}
              <div className="mt-5 p-3 rounded-2xl bg-gray-50 border border-gray-150 text-xs font-semibold inline-flex items-center gap-2">
                <span className="text-gray-400 uppercase tracking-widest font-bold">Order ID</span>
                <span className="text-gray-800 font-extrabold">{generatedOrderId}</span>
              </div>

              {/* Success action buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-md">
                <button
                  onClick={() => {
                    onClose();
                    navigate('/my-orders');
                  }}
                  className="py-4 px-6 rounded-full bg-gray-900 hover:bg-gray-800 font-bold text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex-1"
                >
                  View My Orders
                </button>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/furniture-appliances');
                  }}
                  className="py-4 px-6 rounded-full border border-gray-250 hover:bg-gray-50 font-bold text-gray-600 hover:text-gray-950 transition-all cursor-pointer flex-1"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
