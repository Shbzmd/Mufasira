// Shared UI interactions and simple animations
document.addEventListener('DOMContentLoaded', () => {
  // mobile menu toggles
  document.querySelectorAll('.menu-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelector('.nav')?.classList.toggle('open');
      btn.classList.toggle('open');
    });
  });

  // smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if(href && href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // fill years on pages
  if(document.getElementById('yearHome')) document.getElementById('yearHome').textContent = new Date().getFullYear();
  if(document.getElementById('yearProducts')) document.getElementById('yearProducts').textContent = new Date().getFullYear();
  if(document.getElementById('yearAbout')) document.getElementById('yearAbout').textContent = new Date().getFullYear();
  if(document.getElementById('yearContact')) document.getElementById('yearContact').textContent = new Date().getFullYear();

  // contact forms (simulate)
  const forms = document.querySelectorAll('form');
  forms.forEach(f=>{
    f.addEventListener('submit', e=>{
      e.preventDefault();
      const status = f.querySelector('.form-status') || f.querySelector('#statusFull') || document.getElementById('statusFull');
      if(status) status.textContent = 'Sending...';
      setTimeout(()=> {
        if(status) status.textContent = 'Thanks — we received your message!';
        f.reset();
      }, 900);
    });
  });

  // product filters
  const chips = document.querySelectorAll('.chip');
  if(chips.length){
    chips.forEach(ch => ch.addEventListener('click', (ev)=>{
      chips.forEach(c=>c.classList.remove('active'));
      ch.classList.add('active');
      const filter = ch.dataset.filter;
      const items = document.querySelectorAll('#productGrid .p-card');
      items.forEach(it=>{
        if(filter === 'all') it.style.display = '';
        else {
          if(it.classList.contains(filter)) it.style.display = '';
          else it.style.display = 'none';
        }
      });
    }));
  }

  // GSAP animations (if available)
  if(window.gsap){
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero-left h2',{y:20,opacity:0,duration:0.9,delay:0.15});
    gsap.from('.device-card img',{scale:0.98,opacity:0,duration:0.9,delay:0.3});
    gsap.utils.toArray('.card, .p-card, .test').forEach((el,i)=>{
      gsap.from(el,{y:18,opacity:0,duration:0.8,delay:0.08*i, scrollTrigger:{trigger:el, start:'top 85%'}});
    });
  }
});
