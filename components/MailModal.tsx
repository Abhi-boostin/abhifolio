"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconCopy, IconMail, IconX, IconCheck } from "@tabler/icons-react";

interface MailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MailModal({ isOpen, onClose }: MailModalProps) {
  const [copied, setCopied] = useState(false);
  const email = "abhimanyusinghworks@gmail.com";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const sendMail = () => {
    window.open(`mailto:${email}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-black border border-white/20 rounded-2xl p-6 max-w-md w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              <IconX size={20} />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <IconMail size={24} className="text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Get in Touch</h2>
              <p className="text-white/60 text-sm">Choose how you'd like to contact me</p>
            </div>

            {/* Email display */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
              <p className="text-white font-mono text-center break-all">{email}</p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={copyToClipboard}
                className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg py-3 px-4 transition-all duration-200 group"
              >
                {copied ? (
                  <>
                    <IconCheck size={18} className="text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <IconCopy size={18} className="text-white group-hover:text-white/80" />
                    <span className="text-white group-hover:text-white/80">Copy</span>
                  </>
                )}
              </button>

              <button
                onClick={sendMail}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 rounded-lg py-3 px-4 transition-colors duration-200"
              >
                <IconMail size={18} className="text-white" />
                <span className="text-white">Send Mail</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 