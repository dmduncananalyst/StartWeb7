(function () {
  const industries = [
    { label: 'REAL ESTATE', query: 'real estate agent los angeles', old: '4. Oak & Key Realty' },
    { label: 'MED SPA', query: 'botox near me', old: '5. GlowMed Spa' },
    { label: 'COSMETIC CLINIC', query: 'cosmetic clinic beverly hills', old: '6. Radiance Clinic' }
  ];
  const industryDemo = document.querySelector('.sw7-proto-industries');
  if (industryDemo) {
    let index = 0;
    const icons = industryDemo.querySelectorAll('.proto-icon');
    const label = industryDemo.querySelector('.proto-industry-label');
    const query = industryDemo.querySelector('.proto-query');
    const old = industryDemo.querySelector('.proto-old');
    const result = industryDemo.querySelector('.proto-new');
    setInterval(function () {
      index = (index + 1) % industries.length;
      icons.forEach(function (icon, i) { icon.classList.toggle('active', i === index); });
      label.textContent = industries[index].label;
      query.textContent = '⌕  ' + industries[index].query;
      old.textContent = industries[index].old;
      result.classList.remove('snap');
      void result.offsetWidth;
      result.classList.add('snap');
    }, 3000);
  }

  const pack = document.querySelector('.sw7-proto-realestate .proto-pack');
  if (pack) {
    function moveYourListing() {
      const you = pack.querySelector('[data-id="you"]');
      const first = {};
      Array.from(pack.children).forEach(function (row) { first[row.dataset.id] = row.getBoundingClientRect().top; });
      pack.prepend(you);
      Array.from(pack.children).forEach(function (row) {
        const delta = first[row.dataset.id] - row.getBoundingClientRect().top;
        if (delta) {
          row.style.transform = 'translateY(' + delta + 'px)';
          row.style.transition = 'transform 0s';
          requestAnimationFrame(function () { row.style.transform = ''; row.style.transition = 'transform 450ms cubic-bezier(.2,.8,.2,1)'; });
        }
      });
      you.classList.add('highlight-pulse');
      setTimeout(function () { you.classList.remove('highlight-pulse'); pack.appendChild(you); }, 1250);
    }
    setTimeout(moveYourListing, 450);
    setInterval(moveYourListing, 3000);
  }

  const calendar = document.querySelector('.sw7-proto-medspa .proto-calendar');
  if (calendar) {
    const slots = calendar.querySelectorAll('i');
    const count = document.querySelector('.sw7-proto-medspa .proto-calendar-footer strong');
    function fill() {
      slots.forEach(function (slot) { slot.classList.remove('booked'); });
      count.textContent = '0';
      slots.forEach(function (slot, i) { setTimeout(function () { slot.classList.add('booked'); count.textContent = String(i + 1); }, i * 220); });
    }
    fill();
    setInterval(fill, slots.length * 220 + 2000);
  }

  const cosmetic = document.querySelector('.sw7-proto-cosmetic');
  if (cosmetic) {
    const stars = cosmetic.querySelectorAll('.proto-stars i');
    const reviews = cosmetic.querySelector('.proto-reviews strong');
    const call = cosmetic.querySelector('.proto-call');
    function trust() {
      stars.forEach(function (star) { star.classList.remove('filled'); });
      reviews.textContent = '0';
      stars.forEach(function (star, i) { setTimeout(function () { star.classList.add('filled'); }, i * 180); });
      setTimeout(function () {
        let value = 0;
        const tick = setInterval(function () {
          value = Math.min(128, value + 7);
          reviews.textContent = String(value);
          if (value >= 128) { clearInterval(tick); call.classList.add('pulse-once'); setTimeout(function () { call.classList.remove('pulse-once'); }, 700); }
        }, 40);
      }, 1000);
    }
    trust();
    setInterval(trust, 4200);
  }
})();
