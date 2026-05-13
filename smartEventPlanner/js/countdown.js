/* ============================================================
   js/countdown.js
   Geri sayım saati mantığı
   ============================================================ */

var Countdown = (function () {
  var _intervalId = null;

  /** Geri sayımı başlatır (events dizisi alır) */
  function start(events) {
    // Önceki interval varsa temizle
    if (_intervalId) {
      clearInterval(_intervalId);
      _intervalId = null;
    }

    var now = new Date();

    // Tamamlanmamış, gelecekteki etkinlikleri filtrele
    var upcoming = events.filter(function (e) {
      return !e.done && new Date(e.date) > now;
    });

    if (upcoming.length === 0) {
      $('#countdownSection').hide();
      return;
    }

    // En yakın tarihe göre sırala
    upcoming.sort(function (a, b) { return new Date(a.date) - new Date(b.date); });
    var next = upcoming[0];

    $('#cdEventName').text(next.name);
    $('#countdownSection').show();

    _intervalId = setInterval(function () {
      var diff = new Date(next.date) - new Date();

      if (diff <= 0) {
        clearInterval(_intervalId);
        _intervalId = null;
        _update(0, 0, 0, 0);
        return;
      }

      var days  = Math.floor(diff / 86400000);
      var hours = Math.floor((diff % 86400000) / 3600000);
      var mins  = Math.floor((diff % 3600000) / 60000);
      var secs  = Math.floor((diff % 60000) / 1000);
      _update(days, hours, mins, secs);
    }, 1000);
  }

  /** DOM'u günceller */
  function _update(d, h, m, s) {
    var p = Helpers.pad;
    $('#cdDays').text(p(d));
    $('#cdHours').text(p(h));
    $('#cdMins').text(p(m));
    $('#cdSecs').text(p(s));
  }

  return { start: start };
})();
