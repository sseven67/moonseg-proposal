document.getElementById('print')?.addEventListener('click',()=>window.print());
const dialog=document.getElementById('image-dialog');
for(const image of document.querySelectorAll('article img')){
  image.tabIndex=0;
  image.setAttribute('role','button');
  image.setAttribute('aria-label',image.alt+'，点击放大');
  const show=()=>{dialog.querySelector('img').src=image.src;dialog.querySelector('img').alt=image.alt;dialog.showModal()};
  image.addEventListener('click',show);
  image.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();show()}});
}
document.getElementById('close-image')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
const sections=document.querySelectorAll('article h2, article h3');
const observer=new IntersectionObserver(entries=>{
  const visible=entries.find(entry=>entry.isIntersecting);
  if(!visible)return;
  for(const link of document.querySelectorAll('.toc a'))link.classList.toggle('active',link.hash==='#'+visible.target.id);
},{rootMargin:'-80px 0px -65% 0px'});
for(const section of sections)observer.observe(section);
