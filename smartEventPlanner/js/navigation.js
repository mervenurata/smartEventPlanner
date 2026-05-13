/* ============================================================
   js/navigation.js
   Sayfa geçişleri, aktif menü yönetimi, sidebar aç/kapat
   ============================================================ */

var Navigation = (function () {

  /** Tüm bölümleri gizleyip yalnızca seçileni gösterir */
  function showSection(sectionId) {
    $('#eventsSection, #addSection, #statsSection').hide();
    $(sectionId).show();
  }

  /** Aktif nav linkini günceller */
  function setActiveMenu(menuId) {
    $('.sidebar-nav .nav-link').removeClass('active');
    $(menuId).addClass('active');
  }

  /** Mobil sidebar'ı kapatır */
  function closeSidebar() {
    $('#sidebar').removeClass('open');
    $('#sidebarOverlay').removeClass('open');
  }

  /** Tüm click event listener'larını bağlar */
  function init() {

    // Etkinliklerim
    $('#menuEvents').on('click', function (e) {
      e.preventDefault();
      setActiveMenu('#menuEvents');
      $('#pageTitle').text('Etkinliklerim');
      showSection('#eventsSection');
      Render.eventList();
      closeSidebar();
    });

    // Yeni Etkinlik Ekle
    $('#menuAdd').on('click', function (e) {
      e.preventDefault();
      setActiveMenu('#menuAdd');
      $('#pageTitle').text('Yeni Etkinlik Ekle');
      showSection('#addSection');
      closeSidebar();
    });

    // İstatistikler
    $('#menuStats').on('click', function (e) {
      e.preventDefault();
      setActiveMenu('#menuStats');
      $('#pageTitle').text('İstatistikler');
      showSection('#statsSection');
      Stats.render();
      closeSidebar();
    });

    // Boş durum "Ekle" linki
    $('#goAddLink').on('click', function (e) {
      e.preventDefault();
      $('#menuAdd').trigger('click');
    });

    // Kategori filtresi
    $('.cat-btn').on('click', function () {
      $('.cat-btn').removeClass('active');
      $(this).addClass('active');
      Render.setFilter($(this).data('cat'));
      setActiveMenu('#menuEvents');
      $('#pageTitle').text('Etkinliklerim');
      showSection('#eventsSection');
      Render.eventList();
      closeSidebar();
    });

    // Mobil sidebar toggle
    $('#sidebarToggle').on('click', function () {
      $('#sidebar').addClass('open');
      $('#sidebarOverlay').addClass('open');
    });
    $('#sidebarOverlay').on('click', closeSidebar);
  }

  return { init: init, showSection: showSection };
})();
