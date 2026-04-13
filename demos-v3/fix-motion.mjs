/**
 * This script removes all motion entrance animations from the minimal page components.
 * It replaces motion.div/motion.h1/motion.p/motion.section/motion.li with plain HTML elements
 * and removes initial/animate/transition props that cause opacity:0 on SSR.
 * 
 * It keeps motion imports if the file still uses motion for whileHover or other interactive effects.
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join } from 'path'

const pagesDir = join(process.cwd(), 'src/components/concepts/minimal/pages')
const files = readdirSync(pagesDir).filter(f => f.endsWith('.tsx'))

for (const file of files) {
  const filePath = join(pagesDir, file)
  let content = readFileSync(filePath, 'utf-8')
  const original = content
  
  // Step 1: Replace <motion.TAG with <TAG and </motion.TAG> with </TAG>
  // But only for entrance animations (ones that have initial={{ opacity: 0 }})
  // Actually, let's just replace ALL motion.TAG with plain TAG since we want everything visible
  
  const motionTags = ['div', 'h1', 'h2', 'h3', 'p', 'section', 'li', 'span', 'ul', 'a', 'button', 'article', 'header', 'footer', 'nav', 'main', 'aside', 'figure', 'img']
  
  for (const tag of motionTags) {
    // Replace opening tags: <motion.div -> <div
    content = content.replace(new RegExp(`<motion\\.${tag}([\\s>])`, 'g'), `<${tag}$1`)
    content = content.replace(new RegExp(`<motion\\.${tag}$`, 'gm'), `<${tag}`)
    // Replace closing tags: </motion.div> -> </div>
    content = content.replace(new RegExp(`</motion\\.${tag}>`, 'g'), `</${tag}>`)
  }
  
  // Step 2: Remove initial={{ ... }} props (single line)
  content = content.replace(/\s+initial=\{\{[^}]*\}\}/g, '')
  
  // Step 3: Remove animate={{ ... }} props (single line)
  content = content.replace(/\s+animate=\{\{[^}]*\}\}/g, '')
  
  // Step 4: Remove transition={{ ... }} props (single and multi-line)
  // Single line
  content = content.replace(/\s+transition=\{\{[^}]*\}\}/g, '')
  // Multi-line (up to 3 lines)
  content = content.replace(/\s+transition=\{\{\s*\n[^}]*\}\}/g, '')
  
  // Step 5: Remove animate="visible" and initial="hidden"
  content = content.replace(/\s+animate="[^"]*"/g, '')
  content = content.replace(/\s+initial="[^"]*"/g, '')
  
  // Step 6: Remove custom={...} props used with variants
  content = content.replace(/\s+custom=\{[^}]*\}/g, '')
  
  // Step 7: Remove variants={...} props
  content = content.replace(/\s+variants=\{[^}]*\}/g, '')
  
  // Step 8: Clean up motion imports if motion is no longer used
  const stillUsesMotion = content.includes('motion.') || content.includes('useMotionValue') || content.includes('useSpring') || content.includes('useTransform') || content.includes('AnimatePresence') || content.includes('whileHover')
  
  if (!stillUsesMotion) {
    // Remove the motion import line
    content = content.replace(/import\s*\{[^}]*\}\s*from\s*['"]motion\/react['"]\s*\n?/g, '')
    // Also remove 'use client' if it was only there for motion
    // Actually keep 'use client' since we might have useState/useEffect
  }
  
  // Step 9: Clean up empty lines (max 2 consecutive)
  content = content.replace(/\n{3,}/g, '\n\n')
  
  if (content !== original) {
    writeFileSync(filePath, content)
    console.log(`Fixed: ${file}`)
  } else {
    console.log(`No changes: ${file}`)
  }
}

console.log('\nDone! All motion entrance animations removed.')
