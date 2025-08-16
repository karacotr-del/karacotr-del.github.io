# KARA COMPANY — Apple Tarzı Final (Parallax + Dark/Light)
Bu paket, renk paletinize (E62440 & FFFCF2) uygun, Apple disiplininde **parallax**, **scroll reveal**, **3D tilt**, **dark/light** destekli çok sayfalı web şablonudur.

## Kurulum
- Dosyaları bir klasöre çıkarın ve `index.html`'i tarayıcıda açın.
- Kendi logonuzu `assets/icons/logo.svg` ile değiştirin.
- Görsellerinizi `assets/img/` içine ekleyin.

## Formun E-postaya Düşmesi (Formspree)
1. https://formspree.io/ ile endpoint oluşturun (örn: `https://formspree.io/f/XXXXYYYY`).
2. `contact.html` içindeki gizli input'a endpointi yapıştırın:
   ```html
   <input type="hidden" name="_formspree" value="https://formspree.io/f/XXXXYYYY">
   ```
3. JS otomatik POST atar; boş kalırsa `mailto:` fallback çalışır.

## Geliştirme İpuçları
- Performans için görselleri WebP/AVIF ve gerçek boyutlarda kullanın.
- `prefers-reduced-motion` destekli — yoğun animasyonları otomatik azaltır.
- Tema tercihi `localStorage`'da kalıcıdır.
