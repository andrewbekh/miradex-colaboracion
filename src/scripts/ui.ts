// Small UI helpers shared by all pages.

// Brand headings: the pattern must be exactly as wide as the longest line of the heading.
// CSS fit-content cannot shrink to wrapped lines, so measure line boxes and set the width.
function shrinkwrap() {
  document.querySelectorAll<HTMLElement>('[data-shrinkwrap]').forEach((block) => {
    const title = block.querySelector<HTMLElement>('h1, h2');
    if (!title) return;
    block.style.width = '';
    const range = document.createRange();
    range.selectNodeContents(title);
    const rects = [...range.getClientRects()];
    if (!rects.length) return;
    const left = Math.min(...rects.map((r) => r.left));
    const right = Math.max(...rects.map((r) => r.right));
    block.style.width = `${Math.ceil(right - left)}px`;
  });
}

let raf = 0;
const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(shrinkwrap); };
document.fonts?.ready.then(schedule);
schedule();
window.addEventListener('resize', schedule);
