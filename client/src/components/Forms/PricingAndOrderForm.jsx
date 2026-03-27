import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap, Star, Crown, Clock, CheckCircle2, AlertCircle, Loader, X } from 'lucide-react';
import { MakeASiteLoader } from '../Loader/MakeASiteLoader';

/**
 * Pricing Plans Component for MakeASite
 * Displays different plan tiers for website building services
 */

const PRICING_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Perfect for getting started',
    price: 9999,
    icon: Zap,
    features: [
      'Up to 5 pages',
      'Responsive design',
      'Mobile optimized',
      'Basic SEO setup',
      '1 revision round',
      'SSL included'
    ],
    popular: false
  },
  {
    id: 'standard',
    name: 'Standard',
    description: 'Most popular choice',
    price: 24999,
    icon: Star,
    features: [
      'Up to 15 pages',
      'Advanced design',
      'E-commerce ready',
      'Advanced SEO',
      'Unlimited revisions',
      'Email support',
      '3 months free hosting',
      'Analytics dashboard'
    ],
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'For serious projects',
    price: 49999,
    icon: Crown,
    features: [
      'Unlimited pages',
      'Custom design',
      'Full e-commerce',
      'Advanced SEO',
      'Unlimited revisions',
      'Priority support',
      '1 year free hosting',
      'Advanced analytics',
      'Custom API integration',
      'Payment gateway setup'
    ],
    popular: false
  },
  {
    id: 'custom',
    name: 'Custom Quote',
    description: 'Build exactly what you need',
    price: null,
    icon: Clock,
    features: [
      'Unlimited pages',
      'Custom features',
      'API integration',
      'Advanced functionality',
      'Dedicated account manager',
      ' 24/7 priority support',
      'Free hosting (1 year)',
      'Custom maintenance plan'
    ],
    popular: false
  }
];

export const PricingPlans = ({ onSelectPlan, selectedPlan }) => {
  return (
    <div className="py-20 px-4 bg-gradient-to-b from-white to-blue-50 dark:from-slate-950 dark:to-blue-950/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose the perfect plan for your website. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_PLANS.map((plan, idx) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative rounded-2xl transition-all duration-300 ${
                  plan.popular
                    ? 'ring-2 ring-blue-600 border-2 border-blue-600 scale-105'
                    : 'border-2 border-gray-200 dark:border-white/10'
                } ${
                  isSelected ? 'shadow-2xl shadow-blue-600/30' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8 bg-white dark:bg-slate-900 rounded-2xl h-full flex flex-col">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    {plan.price ? (
                      <>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-black text-gray-900 dark:text-white">
                            ₹{(plan.price / 100).toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">/project</span>
                        </div>
                      </>
                    ) : (
                      <div className="text-xl font-bold text-blue-600">
                        Custom Pricing
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full py-3 px-6 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        : 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900/30'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Choose Plan'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="text-2xl font-black text-center mb-8 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h3>
          
          <div className="space-y-4">
            {[
              { q: 'Can I upgrade or downgrade my plan?', a: 'Yes! You can change your plan anytime. If you upgrade, we'll charge the difference. If you downgrade, we\'ll credit your account.' },
              { q: 'Do you offer refunds?', a: 'We offer a 30-day money-back guarantee if you\'re not satisfied with our services.' },
              { q: 'What if I need custom features?', a: 'Choose the Custom Quote plan, and our team will provide a personalized quote based on your requirements.' },
              { q: 'Is maintenance included?', a: 'Basic maintenance is included for 1 year. After that, optional maintenance packages are available.' }
            ].map((item, i) => (
              <details key={i} className="group bg-white dark:bg-slate-900 p-6 rounded-xl border-2 border-gray-200 dark:border-white/10 cursor-pointer">
                <summary className="flex items-center justify-between font-black text-gray-900 dark:text-white">
                  {item.q}
                </summary>
                <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Order Form Component
 * Collects detailed project requirements from users
 */

export const OrderForm = ({ plan, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    websiteType: 'ecommerce',
    numberOfPages: plan?.id === 'basic' ? '5' : plan?.id === 'standard' ? '15' : '',
    businessCategory: '',
    requiredFeatures: [],
    designStyle: 'modern',
    referenceWebsites: '',
    projectDescription: '',
    preferredDeadline: '',
    contactEmail: '',
    phoneNumber: '',
    attachedFiles: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const websiteTypes = [
    { value: 'ecommerce', label: 'E-Commerce Store' },
    { value: 'blog', label: 'Blog/Content Site' },
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'business', label: 'Business Website' },
    { value: 'landing', label: 'Landing Page' },
    { value: 'other', label: 'Other' }
  ];

  const categories = [
    'Technology', 'Fashion', 'Food & Beverage', 'Real Estate',
    'Healthcare', 'Travel', 'Finance', 'Education', 'Other'
  ];

  const features = [
    'Blog', 'Newsletter', 'User Accounts', 'Payment Gateway',
    'Contact Form', 'Gallery', 'Video Support', 'Live Chat',
    'Appointment Booking', 'Membership System'
  ];

  const designStyles = [
    { value: 'modern', label: 'Modern & Minimal' },
    { value: 'vibrant', label: 'Vibrant & Bold' },
    { value: 'elegant', label: 'Elegant & Corporate' },
    { value: 'playful', label: 'Playful & Creative' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.projectName.trim()) newErrors.projectName = 'Project name is required';
    if (!formData.numberOfPages) newErrors.numberOfPages = 'Number of pages is required';
    if (!formData.businessCategory) newErrors.businessCategory = 'Business category is required';
    if (!formData.projectDescription.trim()) newErrors.projectDescription = 'Project description is required';
    if (!formData.preferredDeadline) newErrors.preferredDeadline = 'Preferred deadline is required';
    if (!formData.contactEmail.includes('@')) newErrors.contactEmail = 'Valid email is required';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        requiredFeatures: checked
          ? [...prev.requiredFeatures, name]
          : prev.requiredFeatures.filter(f => f !== name)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit({
        ...formData,
        planId: plan?.id,
        planName: plan?.name,
        estimatedPrice: plan?.price
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      >
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadows-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-white dark:bg-slate-900 border-b-2 border-gray-200 dark:border-white/10">
            <div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                Create Your Project
              </h2>
              {plan && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Plan: <span className="font-bold text-blue-600">{plan.name}</span> - ₹{(plan.price / 100).toLocaleString()}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              <X size={24} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Project Name */}
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                Project Name *
              </label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                placeholder="e.g., Fashion Store Website"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                  errors.projectName
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800'
                } focus:outline-none focus:border-blue-600 dark:text-white`}
              />
              {errors.projectName && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle size={16} /> {errors.projectName}
                </p>
              )}
            </div>

            {/* Website Type */}
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                Website Type
              </label>
              <select
                name="websiteType"
                value={formData.websiteType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800 focus:outline-none focus:border-blue-600 dark:text-white"
              >
                {websiteTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Number of Pages */}
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                Number of Pages *
              </label>
              <input
                type="number"
                name="numberOfPages"
                value={formData.numberOfPages}
                onChange={handleChange}
                placeholder="e.g., 10"
                min="1"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                  errors.numberOfPages
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800'
                } focus:outline-none focus:border-blue-600 dark:text-white`}
              />
              {errors.numberOfPages && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle size={16} /> {errors.numberOfPages}
                </p>
              )}
            </div>

            {/* Business Category */}
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                Business Category *
              </label>
              <select
                name="businessCategory"
                value={formData.businessCategory}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                  errors.businessCategory
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800'
                } focus:outline-none focus:border-blue-600 dark:text-white`}
              >
                <option value="">Select a category...</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.businessCategory && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle size={16} /> {errors.businessCategory}
                </p>
              )}
            </div>

            {/* Required Features */}
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                Required Features
              </label>
              <div className="grid grid-cols-2 gap-3">
                {features.map(feature => (
                  <label key={feature} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name={feature}
                      checked={formData.requiredFeatures.includes(feature)}
                      onChange={handleChange}
                      className="w-4 h-4 border-2 border-gray-300 rounded cursor-pointer accent-blue-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Design Style */}
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                Design Style Preference
              </label>
              <div className="grid grid-cols-2 gap-3">
                {designStyles.map(style => (
                  <label key={style.value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="designStyle"
                      value={style.value}
                      checked={formData.designStyle === style.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`p-3 rounded-xl text-center font-bold border-2 transition-all ${
                      formData.designStyle === style.value
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-600'
                        : 'border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300'
                    }`}>
                      {style.label}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Reference Websites */}
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                Reference Websites (comma-separated URLs)
              </label>
              <textarea
                name="referenceWebsites"
                value={formData.referenceWebsites}
                onChange={handleChange}
                placeholder="https://example1.com, https://example2.com"
                rows="2"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800 focus:outline-none focus:border-blue-600 dark:text-white"
              />
            </div>

            {/* Project Description */}
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                Project Description *
              </label>
              <textarea
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                placeholder="Tell us about your project, your goals, target audience, and any specific requirements..."
                rows="4"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                  errors.projectDescription
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800'
                } focus:outline-none focus:border-blue-600 dark:text-white`}
              />
              {errors.projectDescription && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle size={16} /> {errors.projectDescription}
                </p>
              )}
            </div>

            {/* Preferred Deadline */}
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                Preferred Deadline *
              </label>
              <input
                type="date"
                name="preferredDeadline"
                value={formData.preferredDeadline}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                  errors.preferredDeadline
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800'
                } focus:outline-none focus:border-blue-600 dark:text-white`}
              />
              {errors.preferredDeadline && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle size={16} /> {errors.preferredDeadline}
                </p>
              )}
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                  Contact Email *
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                    errors.contactEmail
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800'
                  } focus:outline-none focus:border-blue-600 dark:text-white`}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800 focus:outline-none focus:border-blue-600 dark:text-white"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6 border-t-2 border-gray-200 dark:border-white/10">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 py-3 px-6 rounded-xl border-2 border-gray-200 dark:border-white/10 font-bold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-blue-600/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    Create Order
                    <ChevronRight size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PricingPlans;
