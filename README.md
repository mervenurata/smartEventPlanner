Smart Event Planner (Akıllı Etkinlik Planlayıcısı)
Bu proje, Gazi Üniversitesi BMT216 Web Arayüz Geliştirme dersi kapsamında geliştirilmiş; modern, duyarlı (responsive) ve tamamen istemci taraflı çalışan bir etkinlik yönetim uygulamasıdır.  

Teknik Özellikler
Modüler Mimari:JavaScript IIFE pattern kullanılarak ayrıştırılmış; Storage, Render, Countdown ve Stats modülleri ile yüksek okunabilirlik ve bakım kolaylığı sağlanmıştır.
Dinamik Geri Sayım: En yakın tarihli ve tamamlanmamış etkinliğe yönelik gerçek zamanlı geri sayım sistemi kurgulanmıştır.
Veri Kalıcılığı: Kullanıcı verilerinin tarayıcı belleğinde saklanması için localStorage API entegrasyonu yapılmıştır.
Görsel Analiz: Kategori bazlı etkinlik dağılımları ve tamamlanma oranları animasyonlu istatistik çubukları ile sunulmaktadır.

Kullanılan Teknolojiler
Arayüz: HTML5, CSS3 (Custom Properties), Bootstrap 5.3.  
Programlama: JavaScript (ES5+), jQuery 3.7.1.  
Veri Depolama: localStorage API.  
Tipografi ve İkonografi: Google Fonts (DM Serif Display & DM Sans), Bootstrap Icons 1.11.  

Proje Yapısı
index.html: Uygulamanın ana giriş noktasıdır.
css/: Bileşen bazlı (layout, sidebar, stats) stil dosyalarını içerir.
js/: Uygulama mantığını yöneten modüler script dosyalarını içerir (storage.js, render.js, countdown.js).
