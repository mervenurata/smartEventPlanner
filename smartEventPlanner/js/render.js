/* ============================================================
   js/render.js
   Etkinlik kartlarını ve özet stat kartlarını DOM'a yazar
   ============================================================ */

var Render = (function () {

  /** Aktif kategori filtresi (Navigation modülü tarafından güncellenir) */
  var _activeFilter = 'Tümü';

  function setFilter(cat) { _activeFilter = cat; }
  function getFilter()    { return _activeFilter; }

  /** Etkinlik listesini yeniden çizer */
  function eventList() {
    var events   = Storage.load();
    var $list    = $('#eventList');
    $list.empty();

    // Filtreye göre süz
    var filtered = events.filter(function (ev) {
      return _activeFilter === 'Tümü' || ev.cat === _activeFilter;
    });

    // Tarihe göre sırala
    filtered.sort(function (a, b) { return new Date(a.date) - new Date(b.date); });

    if (filtered.length === 0) {
      $('#emptyState').show();
      $('#countdownSection').hide();
    } else {
      $('#emptyState').hide();
      filtered.forEach(function (ev) { $list.append(_buildCard(ev)); });
      Countdown.start(events);
    }

    _summaryCards(events);
  }

  /** Tek bir etkinlik kartı HTML'i oluşturur */
  function _buildCard(ev) {
    var descHtml       = ev.desc ? '<div class="event-desc">' + ev.desc + '</div>' : '';
    var completedClass = ev.done ? 'completed' : '';
    var doneLabel      = ev.done ? 'Tamamlandı ✓' : 'Tamamlandı';

    return (
      '<div class="event-card ' + completedClass + '" data-id="' + ev.id + '">' +
        '<div class="d-flex justify-content-between align-items-start flex-wrap gap-2">' +
          '<div class="flex-grow-1">' +
            '<div class="d-flex align-items-center gap-2 mb-2">' +
              '<span class="cat-badge ' + Helpers.catClass(ev.cat) + '">' + ev.cat + '</span>' +
              '<span class="event-date"><i class="bi bi-calendar3 me-1"></i>' + Helpers.formatDate(ev.date) + '</span>' +
            '</div>' +
            '<div class="event-title">' + ev.name + '</div>' +
            descHtml +
          '</div>' +
          '<div class="event-actions d-flex gap-2 flex-shrink-0">' +
            '<button class="btn btn-done btn-sm btn-complete" data-id="' + ev.id + '">' +
              '<i class="bi bi-check-lg me-1"></i>' + doneLabel +
            '</button>' +
            '<button class="btn btn-delete btn-sm btn-delete-ev" data-id="' + ev.id + '">' +
              '<i class="bi bi-trash3"></i>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /** Özet stat kartlarını günceller */
  function _summaryCards(events) {
    var total   = events.length;
    var done    = events.filter(function (e) { return e.done; }).length;
    var pending = total - done;
    var cats    = {};
    events.forEach(function (e) { cats[e.cat] = true; });

    $('#totalCount').text(total);
    $('#doneCount').text(done);
    $('#pendingCount').text(pending);
    $('#catCount').text(Object.keys(cats).length);
    $('#eventCountBadge').text(total + ' etkinlik');
  }

  // Dışa aç
  function summaryCards() {
    _summaryCards(Storage.load());
  }

  return { eventList: eventList, summaryCards: summaryCards, setFilter: setFilter, getFilter: getFilter };
})();
