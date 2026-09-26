(function(){
  const root=document.documentElement;
  const saved=localStorage.getItem('pinnacle-theme');
  const theme=saved||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  root.dataset.theme=theme;

  document.addEventListener('DOMContentLoaded',()=>{
    const button=document.querySelector('#themeToggle');
    const menu=document.querySelector('.menu-toggle');
    const nav=document.querySelector('.nav');

    const renderThemeToggle=()=>{
      if(!button) return;
      const current=root.dataset.theme;
      button.dataset.theme=current;
      button.setAttribute('aria-label',current==='dark'?'Switch to light mode':'Switch to dark mode');
      button.setAttribute('title',current==='dark'?'Light mode':'Dark mode');
      button.innerHTML=`
        <span class="toggle-icon sun-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg></span>
        <span class="toggle-icon moon-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 14.1A8.6 8.6 0 0 1 9.9 3a8.6 8.6 0 1 0 11.1 11.1Z"/></svg></span>
        <span class="toggle-knob" aria-hidden="true"></span>
        <span class="toggle-label">Theme</span>`;
    };

    renderThemeToggle();
    if(button){
      button.addEventListener('click',()=>{
        root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';
        localStorage.setItem('pinnacle-theme',root.dataset.theme);
        renderThemeToggle();
      });
    }
    if(menu&&nav){
      menu.addEventListener('click',()=>{
        nav.classList.toggle('open');
        menu.setAttribute('aria-expanded',nav.classList.contains('open'));
      });
      nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>nav.classList.remove('open')));
    }
  });
})();
