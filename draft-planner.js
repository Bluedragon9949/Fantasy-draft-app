(function(){
  const SETTINGS_KEY='fantasy-draft-planner-v1';
  const teamsEl=document.getElementById('leagueTeams');
  const slotEl=document.getElementById('draftSlot');
  const picksEl=document.getElementById('myPicks');
  if(!teamsEl||!slotEl||!picksEl)return;
  let saved={teams:10,slot:1};
  try{saved=Object.assign(saved,JSON.parse(localStorage.getItem(SETTINGS_KEY)||'{}'))}catch(e){}
  function fillSlots(){
    const n=Number(teamsEl.value)||10;
    const old=Math.min(Number(slotEl.value)||saved.slot||1,n);
    slotEl.innerHTML='';
    for(let i=1;i<=n;i++){
      const o=document.createElement('option');o.value=i;o.textContent='Pick '+i;slotEl.appendChild(o);
    }
    slotEl.value=old;
  }
  function renderPicks(){
    const n=Number(teamsEl.value)||10;
    const slot=Number(slotEl.value)||1;
    const picks=[];
    for(let r=1;r<=16;r++){
      const roundSlot=r%2===1?slot:(n-slot+1);
      const overall=(r-1)*n+roundSlot;
      picks.push('<span class="pickChip"><b>R'+r+'</b> #'+overall+'</span>');
    }
    picksEl.innerHTML=picks.join('');
    try{localStorage.setItem(SETTINGS_KEY,JSON.stringify({teams:n,slot:slot}))}catch(e){}
  }
  teamsEl.innerHTML=[8,10,12,14].map(n=>'<option value="'+n+'">'+n+' teams</option>').join('');
  teamsEl.value=String([8,10,12,14].includes(Number(saved.teams))?saved.teams:10);
  fillSlots();slotEl.value=String(Math.min(Number(saved.slot)||1,Number(teamsEl.value)));
  teamsEl.addEventListener('change',function(){fillSlots();renderPicks()});
  slotEl.addEventListener('change',renderPicks);
  renderPicks();
})();
