# tez-ozet
https://tez.yok.gov.tr/UlusalTezMerkezi/giris.jsp sitesindeki verileri cypress ile çekip JSOn dosyasına yazar


## Kullanım Kılavuzu

### Gereksinimler: 
- nodejs (https://nodejs.org/)

1. "tez-ozet" klasörünü https://github.com/canbax/tez-ozet den indirin
2. `npm i` komutunu klasörün içinden çalıştırın. "ERROR" mesajı almadığınızdan emin olun.
3. `npm run cy` komutunu çalıştırın.  "ERROR" mesajı almadığınızdan emin olun. Bu (Cypress)[https://www.cypress.io/] ilk defa kullanmak için gerekli. Çıkan Cypress ekranını kapatın.
4. `npm run sum` komutunu çalıştırın. Bu komut sayesinde sonuçlar "table1.json", "table2.json" ... şeklinde listelenir. Excell dosyaları ise "cypress/downloads" klasörü içine listelenecektir.