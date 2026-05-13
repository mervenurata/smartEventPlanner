/* ============================================================
   js/app.js
   Uygulama giriş noktası:
   - Modülleri başlatır
   - Form gönderimini ve olay delegasyonunu yönetir
   - Saat göstergesini çalıştırır
   ============================================================ */

$(document).ready(function () {

  /* ---- Navigasyonu başlat ---- */
  Navigation.init();

  /* ---- İlk yükleme: Etkinliklerim bölümü ---- */
  Navigation.showSection('#eventsSection');
  Render.eventList();

  /* ---- Saat göstergesi ---- */
  function updateClock() {
    var now = new Date();
    var p   = Helpers.pad;
    $('#currentTime').text(p(now.getHours()) + ':' + p(now.getMinutes()) + ':' + p(now.getSeconds()));
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ============================================================
     FORM: Yeni Etkinlik Ekleme
     ============================================================ */
  $('#eventForm').on('submit', function (e) {
    e.preventDefault();

    var name = $('#eventName').val().trim();
    var date = $('#eventDate').val();
    var cat  = $('#eventCat').val();
    var desc = $('#eventDesc').val().trim();

    // Doğrulama
    var valid = true;
    _validate('#eventName', !!name, valid);
    _validate('#eventDate', !!date, valid);
    _validate('#eventCat',  !!cat,  valid);

    // Herhangi bir alan geçersizse dur
    if (!name || !date || !cat) return;

    // Etkinliği kaydet
    Storage.add({
      id:        Helpers.genId(),
      name:      name,
      date:      date,
      cat:       cat,
      desc:      desc,
      done:      false,
      createdAt: new Date().toISOString()
    });

    // Başarı mesajı (DÜZELTİLMİŞ HALİ)
    $('#successAlert').stop(true, true).fadeIn(); // Eğer üst üste ekleme yaparsan animasyonun çakışmasını önler
    setTimeout(function () { 
    $('#successAlert').fadeOut(); 
    }, 3000);

    // Formu sıfırla
    $('#eventForm')[0].reset();

    // Özet kartları güncelle
    Render.summaryCards();
  });

  /** Doğrulama yardımcısı: geçerli değilse is-invalid sınıfı ekler */
  function _validate(selector, isValid) {
    if (isValid) {
      $(selector).removeClass('is-invalid');
    } else {
      $(selector).addClass('is-invalid');
    }
  }

  /* ============================================================
     OLAY DELEGASYONU: Sil ve Tamamlandı butonları
     ============================================================ */

  // Silme
  $('#eventList').on('click', '.btn-delete-ev', function () {
    var id = $(this).data('id');
    Storage.remove(id);
    $(this).closest('.event-card').fadeOut(300, function () {
      $(this).remove();
      Render.eventList();
    });
  });

  // Tamamlandı toggle
  $('#eventList').on('click', '.btn-complete', function () {
    var id     = $(this).data('id');
    var events = Storage.load();
    var ev     = events.find(function (e) { return e.id === id; });
    if (ev) Storage.update(id, { done: !ev.done });
    Render.eventList();
  });

});
