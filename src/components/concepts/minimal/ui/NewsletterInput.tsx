import React, { useState } from 'react';

export const NewsletterInput = () => {
  const [focused, setFocused] = useState(false);

  return (
    <form className="flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:gap-0 relative group" onSubmit={(e) => e.preventDefault()}>
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-[#E5E5E5] to-[#9B9B9B] opacity-0 blur transition duration-500 group-hover:opacity-20 ${focused ? 'opacity-50 blur-md' : ''}`} />
      <input 
        type="email" 
        placeholder="Email address"
        className="relative flex-1 border border-[#E5E5E5] bg-[#FFFFFF] px-4 py-3 text-[#050505] placeholder-[#9B9B9B] focus:outline-none focus:border-[#050505] rounded-none transition-colors"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required
      />
      <button 
        type="submit"
        className="relative bg-[#050505] text-[#FFFFFF] px-8 py-3 hover:bg-[#333333] transition-all motion-reduce:transition-none rounded-none active:scale-95"
      >
        Subscribe
      </button>
    </form>
  );
};
