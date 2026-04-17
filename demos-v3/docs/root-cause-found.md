# ROOT CAUSE FOUND

The server-rendered HTML contains `opacity:0;transform:translateX(40px)` etc. as inline styles.
This is from motion/react's `initial` prop — it sets the initial state as inline CSS during SSR.

The `animate` prop should then animate to opacity:1 on the CLIENT side.
But the client-side hydration/animation is NOT running.

This means motion/react's client-side JavaScript is either:
1. Not hydrating properly
2. Being blocked by something
3. The 'use client' directive isn't working correctly in this context

SOLUTION: Remove motion entirely from the hero and critical above-the-fold content.
Use plain HTML/CSS with no initial hidden state. Content should be visible by default.
Only use motion for hover effects and interactive elements, NOT for entrance animations.
