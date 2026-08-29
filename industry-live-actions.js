(function () {
  var demo = document.querySelector('.journey-demo');
  if (!demo) return;

  var page = location.pathname.split('/').pop();
  var scenes = {
    'real-estate-agents.html': '<div class="agent-live"><div class="agent-search"><span>⌕</span><strong>homes for sale in Denver</strong><b>SEARCH</b></div><div class="agent-results"><div class="agent-map"><i></i><i></i><i></i><span>12 HOMES FOUND</span></div><div class="agent-listing"><div class="agent-house"></div><small>DENVER, CO</small><strong>3 BED · 2 BATH</strong><button>REQUEST A SHOWING</button></div></div><div class="agent-confirm">✓ SHOWING REQUEST SENT</div></div>',
    'real-estate-brokerages.html': '<div class="broker-live"><div class="broker-title"><small>MULTI-MARKET COVERAGE</small><strong>ONE INQUIRY. THE RIGHT AGENT.</strong></div><div class="broker-network"><div class="broker-market denver">DENVER<i></i></div><div class="broker-market boulder">BOULDER<i></i></div><div class="broker-market aurora">AURORA<i></i></div><div class="broker-hub">BROKERAGE</div><div class="broker-agent"><span></span><b>LOCAL AGENT</b><small>LEAD ROUTED</small></div></div></div>',
    'med-spas.html': '<div class="medspa-live"><div class="medspa-head"><small>TREATMENT TO CONSULTATION</small><strong>CHOOSE. REVIEW. BOOK.</strong></div><div class="medspa-flow"><div class="medspa-treatments"><b>CONCERN</b><button class="selected">FINE LINES</button><button>SKIN TEXTURE</button><button>VOLUME</button></div><div class="medspa-arrow">→</div><div class="medspa-times"><b>AVAILABLE TIMES</b><span>10:00</span><span class="selected">11:30</span><span>1:00</span><button>REQUEST CONSULTATION</button></div></div><div class="medspa-confirm">✓ CONSULTATION REQUEST READY</div></div>',
    'cosmetic-clinics.html': '<div class="clinic-live"><div class="clinic-head"><small>PROCEDURE RESEARCH</small><strong>COMPARE BEFORE CHOOSING.</strong></div><div class="clinic-compare"><div><b>PROCEDURE A</b><span>✓ Candidacy</span><span>✓ Recovery</span><span>✓ Expected process</span></div><div class="active"><b>PROCEDURE B</b><span>✓ Candidacy</span><span>✓ Recovery</span><span>✓ Expected process</span></div></div><div class="clinic-provider"><i></i><p><b>BOARD-CERTIFIED PROVIDER</b><span>Credentials · Experience · Consultation</span></p><button>REVIEW NEXT STEP</button></div></div>'
  };

  if (scenes[page]) demo.innerHTML = scenes[page];
}());
