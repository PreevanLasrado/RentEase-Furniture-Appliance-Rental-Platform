import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X } from 'lucide-react';

const RemoveModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-gray-100 relative z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-full transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Warning Icon Container */}
            <div className="flex flex-col items-center text-center space-y-4 pt-4">
              <div className="bg-red-50 text-primary p-4 rounded-full">
                <Trash2 className="w-8 h-8" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-black text-gray-900">
                  Remove item from cart?
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed px-4">
                  Are you sure you want to remove <span className="font-bold text-gray-800">"{itemName}"</span> from your rental cart?
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 w-full pt-4">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-6 rounded-full border border-gray-250/85 hover:bg-gray-50 text-gray-600 font-bold transition-all text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 py-3 px-6 rounded-full bg-primary hover:bg-primary-dark text-white font-bold transition-all text-sm cursor-pointer shadow-lg shadow-primary/20 hover:shadow-xl"
                >
                  Remove
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RemoveModal;
