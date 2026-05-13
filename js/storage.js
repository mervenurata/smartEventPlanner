/* ============================================================
   js/storage.js
   LocalStorage CRUD işlemleri
   ============================================================ */

var Storage = (function () {
  var STORAGE_KEY = 'sep_events';

  /** Tüm etkinlikleri yükler */
  function load() {
    var data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  /** Etkinlikleri kaydeder */
  function save(events) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }

  /** Yeni bir etkinlik ekler */
  function add(event) {
    var events = load();
    events.push(event);
    save(events);
  }

  /** id'ye göre etkinliği siler */
  function remove(id) {
    var events = load().filter(function (e) { return e.id !== id; });
    save(events);
  }

  /** id'ye göre etkinliği günceller */
  function update(id, changes) {
    var events = load().map(function (e) {
      return e.id === id ? Object.assign({}, e, changes) : e;
    });
    save(events);
  }

  return { load: load, save: save, add: add, remove: remove, update: update };
})();
