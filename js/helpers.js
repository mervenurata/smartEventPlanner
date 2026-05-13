/* ============================================================
   js/helpers.js
   Yardımcı / saf fonksiyonlar (yan etkisi olmayan)
   ============================================================ */

var Helpers = (function () {

  /** Benzersiz ID üretir */
  function genId() {
    return 'ev_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
  }

  /** Sayıyı 2 basamaklıya tamamlar */
  function pad(n) {
    return n < 10 ? '0' + n : '' + n;
  }

  /** Tarihi okunabilir formata çevirir */
  function formatDate(dateStr) {
    var d = new Date(dateStr);
    var opts = { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return d.toLocaleDateString('tr-TR', opts);
  }

  /** Kategoriye göre CSS sınıfı döndürür */
  function catClass(cat) {
    if (cat === 'İş')      return 'cat-is';
    if (cat === 'Sosyal')  return 'cat-sosyal';
    if (cat === 'Eğitim')  return 'cat-egitim';
    return 'cat-kisisel';
  }

  return { genId: genId, pad: pad, formatDate: formatDate, catClass: catClass };
})();
