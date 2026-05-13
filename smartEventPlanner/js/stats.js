/* ============================================================
   js/stats.js
   İstatistikler sayfasını çizer
   ============================================================ */

var Stats = (function () {

  var CAT_COLORS = {
    'İş':     '#60a5fa',
    'Sosyal': '#fbbf24',
    'Eğitim': '#34d399',
    'Kişisel':'#a78bfa'
  };

  function render() {
    var events = Storage.load();
    var total  = events.length;
    var done   = events.filter(function (e) { return e.done; }).length;
    var pctD   = total > 0 ? Math.round((done / total) * 100) : 0;
    var pctP   = 100 - pctD;

    // Durum çubukları
    $('#pctDone').text(pctD + '%');
    $('#barDone').css('width', pctD + '%');
    $('#pctPending').text(pctP + '%');
    $('#barPending').css('width', pctP + '%');

    // Kategori dağılımı
    _renderCatBars(events, total);

    // Yaklaşan etkinlikler
    _renderUpcoming(events);
  }

  function _renderCatBars(events, total) {
    var counts = { 'İş': 0, 'Sosyal': 0, 'Eğitim': 0, 'Kişisel': 0 };
    events.forEach(function (e) {
      if (counts[e.cat] !== undefined) counts[e.cat]++;
    });

    var $catBars = $('#catBars').empty();

    $.each(counts, function (catName, count) {
      var pct = total > 0 ? Math.round((count / total) * 100) : 0;
      $catBars.append(
        '<div class="stat-bar-wrap">' +
          '<div class="stat-bar-label">' +
            '<span>' + catName + '</span>' +
            '<span>' + count + ' etkinlik (' + pct + '%)</span>' +
          '</div>' +
          '<div class="stat-bar-bg">' +
            '<div class="stat-bar-fill" style="width:' + pct + '%;background:' + CAT_COLORS[catName] + ';"></div>' +
          '</div>' +
        '</div>'
      );
    });
  }

  function _renderUpcoming(events) {
    var now = new Date();
    var upcoming = events
      .filter(function (e) { return !e.done && new Date(e.date) > now; })
      .sort(function (a, b) { return new Date(a.date) - new Date(b.date); })
      .slice(0, 5);

    var $list = $('#upcomingList').empty();

    if (upcoming.length === 0) {
      $list.html('<p style="color:var(--text-muted);font-size:.82rem;">Yaklaşan etkinlik yok.</p>');
      return;
    }

    upcoming.forEach(function (ev) {
      $list.append(
        '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);">' +
          '<span class="cat-badge ' + Helpers.catClass(ev.cat) + '">' + ev.cat + '</span>' +
          '<span style="flex:1;font-size:.82rem;">' + ev.name + '</span>' +
          '<span style="font-size:.75rem;color:var(--text-muted);">' + Helpers.formatDate(ev.date) + '</span>' +
        '</div>'
      );
    });
  }

  return { render: render };
})();
