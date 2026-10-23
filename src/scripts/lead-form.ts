// Lead form behaviour: popup, scenario and business-type preselect, ES phone mask, validation, tracking fields, submit.
import { ui } from '../data/ui';

const modal = document.getElementById('lead-modal') as HTMLDialogElement | null;
let lastTrigger: HTMLElement | null = null;

// Role-aware fields: [data-for="vender instalar ..."] is shown only for those roles.
// Hidden fields are disabled so they are not sent.
function applyRole(form: HTMLFormElement) {
  const role =
    form.querySelector<HTMLInputElement>('[data-scenario-radio]:checked')?.value ??
    form.querySelector<HTMLInputElement>('[data-scenario-fixed]')?.value ??
    'no-se';
  form.querySelectorAll<HTMLElement>('[data-for]').forEach((field) => {
    const show = field.dataset.for!.split(' ').includes(role);
    field.hidden = !show;
    field.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input, select, textarea').forEach((el) => (el.disabled = !show));
  });
}

function setScenario(form: HTMLFormElement, value: string | undefined) {
  const fallback = modal?.dataset.defaultScenario || 'no-se';
  const v = value || fallback;
  const radio = form.querySelector<HTMLInputElement>(`[data-scenario-radio][value="${v}"]`);
  if (radio) radio.checked = true;
  applyRole(form);
}

// Business type comes from the "Узнайте свой бизнес" block: preselect it if the option exists.
function setBusiness(form: HTMLFormElement, value: string | undefined) {
  if (!value) return;
  const select = form.querySelector<HTMLSelectElement>('[data-business-select]');
  if (select && [...select.options].some((o) => o.value === value || o.text === value)) select.value = value;
}

function openModal(scenario?: string, business?: string, quiz?: string) {
  if (!modal) return;
  const form = modal.querySelector<HTMLFormElement>('[data-lead-form]');
  if (form) {
    setScenario(form, scenario);
    setBusiness(form, business);
    // answers from the hub quiz travel with the lead
    const q = form.querySelector<HTMLInputElement>('[data-quiz-answers]');
    if (q) q.value = quiz ?? '';
  }
  modal.showModal();
  document.documentElement.style.overflow = 'hidden';
}

function closeModal() {
  modal?.close();
}

modal?.addEventListener('close', () => {
  document.documentElement.style.overflow = '';
  lastTrigger?.focus();
});
modal?.addEventListener('click', (e) => {
  if (e.target === modal) closeModal(); // click on backdrop
});

document.addEventListener('click', (e) => {
  const t = (e.target as HTMLElement).closest<HTMLElement>('[data-open-form]');
  if (t) {
    e.preventDefault();
    lastTrigger = t;
    openModal(t.dataset.scenario, t.dataset.business, t.dataset.quiz);
    return;
  }
  if ((e.target as HTMLElement).closest('[data-close-form]')) closeModal();
  const v = (e.target as HTMLElement).closest<HTMLElement>('[data-video]');
  if (v) {
    try { sessionStorage.setItem('mx_video', v.dataset.video ?? ''); } catch {}
    document.querySelectorAll<HTMLInputElement>('[data-video-watched]').forEach((i) => (i.value = v.dataset.video ?? ''));
  }
});

if (new URLSearchParams(location.search).get('form') === '1') openModal();

// ---- Spanish phone mask: +34 XXX XXX XXX ----
function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, '');
  if (d.startsWith('0034')) d = d.slice(4);
  else if (d.length > 9 && d.startsWith('34')) d = d.slice(2); // typed or pasted with country code
  d = d.slice(0, 9);
  return d.replace(/^(\d{3})(\d{1,3})?(\d{1,3})?$/, (_, a, b, c) => [a, b, c].filter(Boolean).join(' '));
}
document.querySelectorAll<HTMLInputElement>('[data-phone-es]').forEach((input) => {
  input.addEventListener('input', () => { input.value = formatPhone(input.value); });
});

// ---- Validation ----
const messages = ui.errors;

function fieldError(el: HTMLInputElement | HTMLSelectElement): string {
  if (el.type === 'checkbox') return (el as HTMLInputElement).checked ? '' : messages.consent;
  const v = el.value.trim();
  if (el.required && !v) return messages.required;
  if (el.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return messages.email;
  if (el.hasAttribute('data-phone-es') && v && !/^[6789]\d{8}$/.test(v.replace(/\s/g, ''))) return messages.phone;
  return '';
}

function showError(el: HTMLInputElement | HTMLSelectElement, msg: string) {
  el.setAttribute('aria-invalid', msg ? 'true' : 'false');
  const box = el.type === 'checkbox'
    ? el.closest('form')!.querySelector('.lf__err--consent')
    : el.closest('.lf__field')?.querySelector('.lf__err');
  if (box) box.textContent = msg;
}

const utm = [...new URLSearchParams(location.search)].filter(([k]) => k.startsWith('utm_')).map(([k, v]) => `${k}=${v}`).join('&');
let watched = '';
try { watched = sessionStorage.getItem('mx_video') ?? ''; } catch {}

document.querySelectorAll<HTMLFormElement>('[data-lead-form]').forEach((form) => {
  applyRole(form);
  form.addEventListener('change', (e) => {
    if ((e.target as HTMLElement).matches('[data-scenario-radio]')) applyRole(form);
  });
  const utmInput = form.querySelector<HTMLInputElement>('[data-utm]');
  if (utmInput) utmInput.value = utm;
  const vInput = form.querySelector<HTMLInputElement>('[data-video-watched]');
  if (vInput) vInput.value = watched;

  const required = [...form.querySelectorAll<HTMLInputElement | HTMLSelectElement>('[required]')];
  required.forEach((el) => {
    el.addEventListener('blur', () => { if (el.getAttribute('aria-invalid') || el.value) showError(el, fieldError(el)); });
    el.addEventListener('change', () => { if (el.getAttribute('aria-invalid') === 'true') showError(el, fieldError(el)); });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let first: HTMLElement | null = null;
    for (const el of required) {
      const msg = fieldError(el);
      showError(el, msg);
      if (msg && !first) first = el;
    }
    if (first) { first.focus(); return; }

    const data = new FormData(form);
    const payload: Record<string, string | string[]> = {};
    data.forEach((v, k) => {
      const val = String(v);
      payload[k] = k in payload ? ([] as string[]).concat(payload[k], val) : val;
    });
    if (payload.phone) payload.phone = '+34' + String(payload.phone).replace(/\s/g, '');

    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    btn?.setAttribute('disabled', '');
    try {
      const endpoint = form.getAttribute('action');
      if (endpoint && endpoint !== '#') {
        const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        console.info('[MIRADEX lead, demo mode]', JSON.stringify(payload)); // TODO: endpoint CRM
      }
      const done = form.querySelector<HTMLElement>('.lf__done');
      if (done) { done.hidden = false; done.focus(); }
    } catch {
      alert(ui.errors.send);
    } finally {
      btn?.removeAttribute('disabled');
    }
  });
});
