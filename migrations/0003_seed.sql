-- Demo seed. Figures are illustrative, not official statistics.
insert into authors (id, name, slug, bio, social, expertise, active) values
('desk', 'Konutevarsa Haber Merkezi', 'haber-merkezi',
$bio$Konutevarsa'nın editöryal masası. Örnek içerikler bu imzayla yayımlanır; ileride gerçek editörler aynı yazar modeline eklenir.$bio$,
'{"web":"https://konutevarsa.com"}'::jsonb,
array['konut','mevzuat','veri'], true)
on conflict (id) do nothing;
insert into categories (id, name, slug, description, nav_order) values
('konut', $c0$Konut$c0$, 'konut', $d0$Satış, stok ve alıcı davranışına dair haberler.$d0$, 1),
('gayrimenkul', $c1$Gayrimenkul$c1$, 'gayrimenkul', $d1$Sektörün genel gündemi ve piyasa notları.$d1$, 2),
('ekonomi', $c2$Ekonomi$c2$, 'ekonomi', $d2$Konutu etkileyen makro başlıklar.$d2$, 3),
('kira', $c3$Kira$c3$, 'kira', $d3$Kiralık konut, sözleşme ve bölgesel tempo.$d3$, 4),
('yatirim', $c4$Yatırım$c4$, 'yatirim', $d4$Getiri, amortisman ve portföy okumaları.$d4$, 5),
('mortgage', $c5$Mortgage$c5$, 'mortgage', $d5$Konut kredisi ve taksit dinamiği.$d5$, 6),
('toki', $c6$TOKİ$c6$, 'toki', $d6$Sosyal konut ve kamu projeleri.$d6$, 7),
('kentsel-donusum', $c7$Kentsel Dönüşüm$c7$, 'kentsel-donusum', $d7$Riskli yapı, hak sahipliği ve şantiye.$d7$, 8),
('eids', $c8$EİDS$c8$, 'eids', $d8$Elektronik ilan doğrulama süreci.$d8$, 9),
('mevzuat', $c9$Mevzuat$c9$, 'mevzuat', $d9$İmar, tapu ve düzenleme notları.$d9$, 10),
('yeni-projeler', $c10$Yeni Projeler$c10$, 'yeni-projeler', $d10$Proje lansmanları ve teslim takvimleri.$d10$, 11),
('proptech', $c11$PropTech$c11$, 'proptech', $d11$Gayrimenkul teknolojisi ve araçlar.$d11$, 12),
('dunya', $c12$Dünya$c12$, 'dunya', $d12$Sınır ötesi konut gündemi.$d12$, 13),
('analiz', $c13$Analiz$c13$, 'analiz', $d13$Veriyi yoran uzun okumalar.$d13$, 14)
on conflict (id) do nothing;
insert into sources (id, name, domain, source_type, trust_score, base_url, is_active, allow_auto_publish, last_checked_at) values
('tuik', $sn0$TÜİK$sn0$, 'tuik.gov.tr', 'public_institution', 92, 'https://www.tuik.gov.tr', true, false, '2026-10-05 18:00:00+03'),
('tcmb', $sn1$TCMB$sn1$, 'tcmb.gov.tr', 'public_institution', 94, 'https://www.tcmb.gov.tr', true, false, '2026-10-05 18:00:00+03'),
('ticaret', $sn2$Ticaret Bakanlığı$sn2$, 'ticaret.gov.tr', 'public_institution', 88, 'https://www.ticaret.gov.tr', true, false, '2026-10-05 18:00:00+03'),
('csb', $sn3$Çevre, Şehircilik ve İklim Değişikliği Bakanlığı$sn3$, 'csb.gov.tr', 'public_institution', 90, 'https://www.csb.gov.tr', true, false, '2026-10-05 18:00:00+03'),
('toki', $sn4$TOKİ$sn4$, 'toki.gov.tr', 'public_institution', 86, 'https://www.toki.gov.tr', true, false, '2026-10-05 18:00:00+03'),
('resmi', $sn5$Resmî Gazete$sn5$, 'resmigazete.gov.tr', 'official', 96, 'https://www.resmigazete.gov.tr', true, false, '2026-10-05 18:00:00+03'),
('bddk', $sn6$BDDK$sn6$, 'bddk.org.tr', 'public_institution', 90, 'https://www.bddk.org.tr', true, false, '2026-10-05 18:00:00+03')
on conflict (id) do nothing;
insert into editorial_agents (id, name, role, status, last_run_at, items_processed, notes) values
('radar', 'Radar İzleyici', 'Bölge tarama', 'idle', '2026-10-05 21:00:00+03', 18, 'Örnek ajan. Otomatik yayın kapalı; yalnızca kuyruğa not düşer.'),
('mevzuat', 'Mevzuat Tarayıcı', 'Resmî Gazete', 'paused', '2026-10-04 09:30:00+03', 7, 'Örnek ajan. Kaynaklar allow_auto_publish=false.'),
('dogrula', 'Doğrulama Masası', 'Kaynak kontrol', 'idle', '2026-10-05 16:10:00+03', 11, 'Örnek ajan. Güven skoru eşiğin altındaki kayıtlar incelemeye kalır.')
on conflict (id) do nothing;
insert into regions (id, slug, name, kind, parent_id, city_slug, district_slug, neighborhood_slug, summary, guide, search_text) values
('istanbul', 'istanbul', $rn0$İstanbul$rn0$, 'city', null, 'istanbul', null, null, $rs0$Türkiye konut gündeminin en geniş laboratuvarı. Bu sayfa örnek bir il özetidir.$rs0$, $rg0$İstanbul'u tek fiyatla anlatmak mümkün değil. İl sayfası, ilçe ve mahalle kırılımlarına inmek için iskelettir. Buradaki metrikler resmi istatistik değil, ürünü göstermek için üretilmiş örnek seridir.$rg0$, $rt0$istanbul istanbul turkiye konut gundeminin en genis laboratuvari. bu sayfa ornek bir il ozetidir.$rt0$),
('ankara', 'ankara', $rn1$Ankara$rn1$, 'city', null, 'ankara', null, null, $rs1$Kamu, memur talebi ve yeni konut stokunun birlikte izlendiği örnek il sayfası.$rs1$, $rg1$Ankara'da örnek okuma, merkez ilçeler ile yeni gelişen çeperi ayırır. Rakamlar demo serisindendir.$rg1$, $rt1$ankara ankara kamu, memur talebi ve yeni konut stokunun birlikte izlendigi ornek il sayfasi.$rt1$),
('izmir', 'izmir', $rn2$İzmir$rn2$, 'city', null, 'izmir', null, null, $rs2$Körfez hattı ve iç kesimler ayrı tempoda ilerler. Örnek il özeti.$rs2$, $rg2$İzmir sayfası, sahil ilçeleri ile iç kesimleri aynı sepete koymamak için hazırlandı. Veri örnektir.$rg2$, $rt2$izmir izmir korfez hatti ve ic kesimler ayri tempoda ilerler. ornek il ozeti.$rt2$),
('bursa', 'bursa', $rn3$Bursa$rn3$, 'city', null, 'bursa', null, null, $rs3$Sanayi kenti konut talebine örnek bir il girişi.$rs3$, $rg3$Bursa'da örnek rehber, istihdam aksına yakın ilçeleri ayrıca izlemeyi önerir.$rg3$, $rt3$bursa bursa sanayi kenti konut talebine ornek bir il girisi.$rt3$),
('istanbul-cekmekoy', 'cekmekoy', $rn4$Çekmeköy$rn4$, 'district', 'istanbul', 'istanbul', 'cekmekoy', null, $rs4$Anadolu yakasında aile konutu arayanların sık baktığı örnek ilçe.$rs4$, $rg4$Çekmeköy örneğinde alıcı, metrekare fiyatından çok site aidatı, ulaşım ve teslim yılına bakar. Mahalle kırılımı Taşdelen ile açıktır.$rg4$, $rt4$cekmekoy istanbul cekmekoy anadolu yakasinda aile konutu arayanlarin sik baktigi ornek ilce.$rt4$),
('istanbul-kadikoy', 'kadikoy', $rn5$Kadıköy$rn5$, 'district', 'istanbul', 'istanbul', 'kadikoy', null, $rs5$Kiralık ve ikinci elin iç içe geçtiği örnek merkez ilçe.$rs5$, $rg5$Kadıköy'de örnek okuma, moda ve çeper mahalleleri ayırır. Tek bir ilçe ortalaması yanıltır.$rg5$, $rt5$kadikoy istanbul kadikoy kiralik ve ikinci elin ic ice gectigi ornek merkez ilce.$rt5$),
('istanbul-besiktas', 'besiktas', $rn6$Beşiktaş$rn6$, 'district', 'istanbul', 'istanbul', 'besiktas', null, $rs6$Yüksek birim fiyatın yanında sınırlı stok. Örnek ilçe notu.$rs6$, $rg6$Beşiktaş örneğinde arz dardır. Yatırım hesabı kira çarpanından çok elde tutma süresine bakar.$rg6$, $rt6$besiktas istanbul besiktas yuksek birim fiyatin yaninda sinirli stok. ornek ilce notu.$rt6$),
('istanbul-uskudar', 'uskudar', $rn7$Üsküdar$rn7$, 'district', 'istanbul', 'istanbul', 'uskudar', null, $rs7$Tarihi doku ile yeni konutun yan yana durduğu örnek ilçe.$rs7$, $rg7$Üsküdar rehberi, sahil bandı ile yamaç mahallelerini ayrı izlemeyi önerir.$rg7$, $rt7$uskudar istanbul uskudar tarihi doku ile yeni konutun yan yana durdugu ornek ilce.$rt7$),
('ankara-cankaya', 'cankaya', $rn8$Çankaya$rn8$, 'district', 'ankara', 'ankara', 'cankaya', null, $rs8$Ankara'nın örnek merkez ilçesi.$rs8$, $rg8$Çankaya'da örnek talep, ofis aksına yakın konut ile güney mahalleleri arasında ayrışır.$rg8$, $rt8$cankaya ankara cankaya ankara'nin ornek merkez ilcesi.$rt8$),
('ankara-kecioren', 'kecioren', $rn9$Keçiören$rn9$, 'district', 'ankara', 'ankara', 'kecioren', null, $rs9$Daha erişilebilir fiyat bandının örneklendiği ilçe.$rs9$, $rg9$Keçiören notu, aile konutu arayanlar için stok derinliğine bakmayı önerir.$rg9$, $rt9$kecioren ankara kecioren daha erisilebilir fiyat bandinin orneklendigi ilce.$rt9$),
('izmir-karsiyaka', 'karsiyaka', $rn10$Karşıyaka$rn10$, 'district', 'izmir', 'izmir', 'karsiyaka', null, $rs10$İzmir körfezinin örnek kuzey kıyısı.$rs10$, $rg10$Karşıyaka'da örnek kira temposu, sahil ile istasyon arkası mahallelerde farklıdır.$rg10$, $rt10$karsiyaka izmir karsiyaka izmir korfezinin ornek kuzey kiyisi.$rt10$),
('bursa-nilufer', 'nilufer', $rn11$Nilüfer$rn11$, 'district', 'bursa', 'bursa', 'nilufer', null, $rs11$Bursa'da yeni konutun yoğunlaştığı örnek ilçe.$rs11$, $rg11$Nilüfer rehberi, site içi sosyal donatı vaadini teslim takvimiyle birlikte okumayı söyler.$rg11$, $rt11$nilufer bursa nilufer bursa'da yeni konutun yogunlastigi ornek ilce.$rt11$),
('istanbul-cekmekoy-tasdelen', 'tasdelen', $rn12$Taşdelen$rn12$, 'neighborhood', 'istanbul-cekmekoy', 'istanbul', 'cekmekoy', 'tasdelen', $rs12$Çekmeköy içinde örnek mahalle sayfası. Sistem mahalle kırılımına hazırdır.$rs12$, $rg12$Taşdelen örneği, il / ilçe / mahalle yolunun en alt basamağıdır. Aynı model diğer mahallelere veri geldikçe açılır.$rg12$, $rt12$tasdelen istanbul cekmekoy tasdelen cekmekoy icinde ornek mahalle sayfasi. sistem mahalle kirilimina hazirdir.$rt12$),
('istanbul-kadikoy-moda', 'moda', $rn13$Moda$rn13$, 'neighborhood', 'istanbul-kadikoy', 'istanbul', 'kadikoy', 'moda', $rs13$Kadıköy sahilinde örnek mahalle sayfası.$rs13$, $rg13$Moda gibi mikro pazarlarda ilçe ortalaması yeterince konuşmaz. Mahalle sayfası bu yüzden ayrı durur.$rg13$, $rt13$moda istanbul kadikoy moda kadikoy sahilinde ornek mahalle sayfasi.$rt13$)
on conflict (id) do nothing;
insert into region_metrics (region_id, avg_sqm_price, monthly_change, yearly_change, sales_count, rent_monthly, rent_trend, amortization_years, series, as_of, is_demo) values
('istanbul', 96400, 1.1, 18.4, 4200, 42000, 0.8, 22.4, $mxistanbul$[{"m": "2026-04", "price": 94173, "rent": 41496, "sales": 3612}, {"m": "2026-05", "price": 94544, "rent": 41580, "sales": 3696}, {"m": "2026-06", "price": 94915, "rent": 41664, "sales": 3780}, {"m": "2026-07", "price": 95286, "rent": 41748, "sales": 3863}, {"m": "2026-08", "price": 95657, "rent": 41832, "sales": 3948}, {"m": "2026-09", "price": 96028, "rent": 41916, "sales": 4032}, {"m": "2026-10", "price": 96400, "rent": 42000, "sales": 4116}]$mxistanbul$::jsonb, '2026-10-01', true),
('istanbul-cekmekoy', 78500, 0.6, 14.2, 310, 28000, 0.4, 23.4, $mxistanbulcekmekoy$[{"m": "2026-04", "price": 77510, "rent": 27832, "sales": 266}, {"m": "2026-05", "price": 77675, "rent": 27860, "sales": 272}, {"m": "2026-06", "price": 77840, "rent": 27888, "sales": 279}, {"m": "2026-07", "price": 78005, "rent": 27916, "sales": 285}, {"m": "2026-08", "price": 78170, "rent": 27944, "sales": 291}, {"m": "2026-09", "price": 78335, "rent": 27972, "sales": 297}, {"m": "2026-10", "price": 78500, "rent": 28000, "sales": 303}]$mxistanbulcekmekoy$::jsonb, '2026-10-01', true),
('istanbul-kadikoy', 142000, 0.3, 11.0, 240, 55000, 0.9, 21.5, $mxistanbulkadikoy$[{"m": "2026-04", "price": 141105, "rent": 54257, "sales": 206}, {"m": "2026-05", "price": 141254, "rent": 54381, "sales": 211}, {"m": "2026-06", "price": 141403, "rent": 54505, "sales": 216}, {"m": "2026-07", "price": 141552, "rent": 54628, "sales": 220}, {"m": "2026-08", "price": 141701, "rent": 54752, "sales": 225}, {"m": "2026-09", "price": 141850, "rent": 54876, "sales": 230}, {"m": "2026-10", "price": 142000, "rent": 55000, "sales": 235}]$mxistanbulkadikoy$::jsonb, '2026-10-01', true),
('istanbul-besiktas', 168000, -0.4, 8.6, 120, 72000, 0.2, 19.4, $mxistanbulbesiktas$[{"m": "2026-04", "price": 169411, "rent": 71784, "sales": 103}, {"m": "2026-05", "price": 169175, "rent": 71820, "sales": 105}, {"m": "2026-06", "price": 168940, "rent": 71856, "sales": 108}, {"m": "2026-07", "price": 168705, "rent": 71892, "sales": 110}, {"m": "2026-08", "price": 168470, "rent": 71928, "sales": 112}, {"m": "2026-09", "price": 168235, "rent": 71964, "sales": 115}, {"m": "2026-10", "price": 168000, "rent": 72000, "sales": 117}]$mxistanbulbesiktas$::jsonb, '2026-10-01', true),
('istanbul-uskudar', 99000, 0.8, 13.1, 260, 38000, 0.5, 21.7, $mxistanbuluskudar$[{"m": "2026-04", "price": 97336, "rent": 37715, "sales": 223}, {"m": "2026-05", "price": 97614, "rent": 37762, "sales": 228}, {"m": "2026-06", "price": 97891, "rent": 37810, "sales": 234}, {"m": "2026-07", "price": 98168, "rent": 37857, "sales": 239}, {"m": "2026-08", "price": 98445, "rent": 37905, "sales": 244}, {"m": "2026-09", "price": 98722, "rent": 37952, "sales": 249}, {"m": "2026-10", "price": 99000, "rent": 38000, "sales": 254}]$mxistanbuluskudar$::jsonb, '2026-10-01', true),
('ankara', 62000, 1.4, 16.8, 1800, 24000, 1.1, 21.5, $mxankara$[{"m": "2026-04", "price": 60177, "rent": 23604, "sales": 1548}, {"m": "2026-05", "price": 60481, "rent": 23670, "sales": 1584}, {"m": "2026-06", "price": 60784, "rent": 23736, "sales": 1620}, {"m": "2026-07", "price": 61088, "rent": 23802, "sales": 1655}, {"m": "2026-08", "price": 61392, "rent": 23868, "sales": 1692}, {"m": "2026-09", "price": 61696, "rent": 23934, "sales": 1728}, {"m": "2026-10", "price": 62000, "rent": 24000, "sales": 1764}]$mxankara$::jsonb, '2026-10-01', true),
('ankara-cankaya', 91000, 0.9, 12.4, 280, 36000, 0.7, 21.1, $mxankaracankaya$[{"m": "2026-04", "price": 89280, "rent": 35622, "sales": 240}, {"m": "2026-05", "price": 89566, "rent": 35685, "sales": 246}, {"m": "2026-06", "price": 89853, "rent": 35748, "sales": 252}, {"m": "2026-07", "price": 90140, "rent": 35811, "sales": 257}, {"m": "2026-08", "price": 90426, "rent": 35874, "sales": 263}, {"m": "2026-09", "price": 90713, "rent": 35937, "sales": 268}, {"m": "2026-10", "price": 91000, "rent": 36000, "sales": 274}]$mxankaracankaya$::jsonb, '2026-10-01', true),
('ankara-kecioren', 48000, 1.8, 19.2, 340, 18000, 1.3, 22.2, $mxankarakecioren$[{"m": "2026-04", "price": 46185, "rent": 17649, "sales": 292}, {"m": "2026-05", "price": 46488, "rent": 17707, "sales": 299}, {"m": "2026-06", "price": 46790, "rent": 17766, "sales": 306}, {"m": "2026-07", "price": 47092, "rent": 17824, "sales": 312}, {"m": "2026-08", "price": 47395, "rent": 17883, "sales": 319}, {"m": "2026-09", "price": 47697, "rent": 17941, "sales": 326}, {"m": "2026-10", "price": 48000, "rent": 18000, "sales": 333}]$mxankarakecioren$::jsonb, '2026-10-01', true),
('izmir', 74000, 0.7, 15.1, 1100, 30000, 0.6, 20.6, $mxizmir$[{"m": "2026-04", "price": 72912, "rent": 29730, "sales": 946}, {"m": "2026-05", "price": 73093, "rent": 29775, "sales": 968}, {"m": "2026-06", "price": 73274, "rent": 29820, "sales": 990}, {"m": "2026-07", "price": 73456, "rent": 29865, "sales": 1011}, {"m": "2026-08", "price": 73637, "rent": 29910, "sales": 1034}, {"m": "2026-09", "price": 73818, "rent": 29955, "sales": 1056}, {"m": "2026-10", "price": 74000, "rent": 30000, "sales": 1078}]$mxizmir$::jsonb, '2026-10-01', true),
('izmir-karsiyaka', 86000, 0.5, 12.8, 190, 34000, 0.8, 21.1, $mxizmirkarsiyaka$[{"m": "2026-04", "price": 85097, "rent": 33592, "sales": 163}, {"m": "2026-05", "price": 85247, "rent": 33660, "sales": 167}, {"m": "2026-06", "price": 85398, "rent": 33728, "sales": 171}, {"m": "2026-07", "price": 85548, "rent": 33796, "sales": 174}, {"m": "2026-08", "price": 85699, "rent": 33864, "sales": 178}, {"m": "2026-09", "price": 85849, "rent": 33932, "sales": 182}, {"m": "2026-10", "price": 86000, "rent": 34000, "sales": 186}]$mxizmirkarsiyaka$::jsonb, '2026-10-01', true),
('bursa', 51000, 1.2, 17.5, 760, 20000, 0.9, 21.3, $mxbursa$[{"m": "2026-04", "price": 49714, "rent": 19730, "sales": 653}, {"m": "2026-05", "price": 49929, "rent": 19775, "sales": 668}, {"m": "2026-06", "price": 50143, "rent": 19820, "sales": 684}, {"m": "2026-07", "price": 50357, "rent": 19865, "sales": 699}, {"m": "2026-08", "price": 50571, "rent": 19910, "sales": 714}, {"m": "2026-09", "price": 50785, "rent": 19955, "sales": 729}, {"m": "2026-10", "price": 51000, "rent": 20000, "sales": 744}]$mxbursa$::jsonb, '2026-10-01', true),
('bursa-nilufer', 64000, 1.0, 15.6, 220, 25000, 0.7, 21.3, $mxbursanilufer$[{"m": "2026-04", "price": 62656, "rent": 24737, "sales": 189}, {"m": "2026-05", "price": 62880, "rent": 24781, "sales": 193}, {"m": "2026-06", "price": 63104, "rent": 24825, "sales": 198}, {"m": "2026-07", "price": 63328, "rent": 24868, "sales": 202}, {"m": "2026-08", "price": 63552, "rent": 24912, "sales": 206}, {"m": "2026-09", "price": 63776, "rent": 24956, "sales": 211}, {"m": "2026-10", "price": 64000, "rent": 25000, "sales": 215}]$mxbursanilufer$::jsonb, '2026-10-01', true),
('istanbul-cekmekoy-tasdelen', 72000, 0.4, 13.0, 70, 26000, 0.3, 23.1, $mxistanbulcekmekoytasdelen$[{"m": "2026-04", "price": 71395, "rent": 25883, "sales": 60}, {"m": "2026-05", "price": 71496, "rent": 25902, "sales": 61}, {"m": "2026-06", "price": 71596, "rent": 25922, "sales": 63}, {"m": "2026-07", "price": 71697, "rent": 25941, "sales": 64}, {"m": "2026-08", "price": 71798, "rent": 25961, "sales": 65}, {"m": "2026-09", "price": 71899, "rent": 25980, "sales": 67}, {"m": "2026-10", "price": 72000, "rent": 26000, "sales": 68}]$mxistanbulcekmekoytasdelen$::jsonb, '2026-10-01', true),
('istanbul-kadikoy-moda', 155000, -0.2, 9.4, 40, 64000, 0.6, 20.2, $mxistanbulkadikoymoda$[{"m": "2026-04", "price": 155651, "rent": 63424, "sales": 34}, {"m": "2026-05", "price": 155542, "rent": 63520, "sales": 35}, {"m": "2026-06", "price": 155434, "rent": 63616, "sales": 36}, {"m": "2026-07", "price": 155325, "rent": 63712, "sales": 36}, {"m": "2026-08", "price": 155217, "rent": 63808, "sales": 37}, {"m": "2026-09", "price": 155108, "rent": 63904, "sales": 38}, {"m": "2026-10", "price": 155000, "rent": 64000, "sales": 39}]$mxistanbulkadikoymoda$::jsonb, '2026-10-01', true)
on conflict (region_id) do nothing;
insert into articles (id, title, slug, summary, content, category_id, tags, featured_image, image_alt, author_id, status, published_at, seo_title, seo_description, canonical_path, city_slug, district_slug, neighborhood_slug, importance_score, confidence_score, content_type, editorial_status, agent_id, discovered_at, takeaway, key_figures, reading_minutes, is_demo, search_text, updated_at) values
('a01', $ti0$Büyükşehirlerde konut satış temposu: ekim açılışına örnek bir okuma$ti0$, 'buyuksehirlerde-konut-satis-temposu', $su0$İstanbul, Ankara ve İzmir'de satış adedi örnek seride sınırlı toparlanırken alıcı hâlâ taksit konuşuyor. Rakamlar resmi bülten değildir.$su0$, $bo0$Konut piyasasını tek bir aya kilitlemek kolay, ama zayıf bir yöntemdir. Bu haber, ekim açılışını örnek bir veri serisi üzerinden okur. Rakamlar Konutevarsa demonstrasyon setindendir; TÜİK veya başka bir kurumun resmi açıklaması değildir.

## Tempo, fiyatın önüne geçti

Örnek seride üç büyükşehirde satış adedi eylülün sonuna göre biraz daha hareketlidir. Alıcı grupları ilanı fiyat etiketinden çok aylık taksite göre eler. Peşin alıcı ise teslim tarihi net olmayan stoku geriye atar.

## Kıyı ile iç kesim aynı sepet değil

Aynı örnek sette kıyı illeri daha seçicidir. İkinci konut arayanlar teslim yılı ve site işletmesini sorar. Bu ayrım, il ortalamasının neden tek başına yetmediğini gösterir.

- Karşılaştırma yalnızca demo serinin kendi ayları arasındadır.
- İlçe ve mahalle kırılımı Konut Radar'da ayrı durur.
- Karar için tapu, iskan ve ekspertiz gerekir.$bo0$, 'konut', '{"konut","satis","buyuksehir"}', '/editorial/bosphorus.jpg', $al0$İstanbul'da sabah ışığında konut dokusu ve boğaz$al0$, 'desk', 'published', '2026-10-06 01:10:00+03', $st0$Büyükşehirlerde konut satış temposu: ekim açılışına örnek bir okuma$st0$, $sd0$İstanbul, Ankara ve İzmir'de satış adedi örnek seride sınırlı toparlanırken alıcı hâlâ taksit konuşuyor. Rakamlar resmi bülten değildir.$sd0$, '/haber/buyuksehirlerde-konut-satis-temposu', 'istanbul', null, null, 96, 78, 'news', 'published', 'radar', '2026-10-05 11:00:00+03', $tw0$Tek bir ekim haftası yön tayin etmez. Örnek okumada asıl ayrım, krediye erişebilen alıcı ile peşin alıcı arasındadır.$tw0$, $kf0$[{"label": "Örnek tempo", "value": "Sınırlı toparlanma"}, {"label": "Odak", "value": "Taksit / gelir"}, {"label": "Kapsam", "value": "3 büyükşehir"}]$kf0$::jsonb, 4, true, $se0$buyuksehirlerde konut satis temposu: ekim acilisina ornek bir okuma istanbul, ankara ve izmir'de satis adedi ornek seride sinirli toparlanirken alici hâlâ taksit konusuyor. rakamlar resmi bulten degildir. konut istanbul  konut satis buyuksehir$se0$, '2026-10-06 01:20:00+03'),
('a02', $ti1$Kira sözleşmelerinde yeni denge: örnek bir piyasa notu$ti1$, 'kira-sozlesmelerinde-yeni-denge', $su1$Yenileme döneminde ev sahipleri ve kiracılar aynı ilanı farklı okuyor. Bu not, örnek bir haftanın davranışını anlatır.$su1$, $bo1$Kira piyasası, satıştan daha hızlı konuşulur ve daha kolay abartılır. Bu yazı, yenileme dönemine dair örnek bir gözlemdir. Herhangi bir ilçenin resmi kira endeksi değildir.

## İlan ile sözleşme ayrışıyor

Örnek gözlemde ilana çıkan bedel, birkaç hafta yayında kalan dairelerde aşağı çekiliyor. Hızlı kapanan daireler ise eşyalı ve ulaşımı net olanlar. Fotoğrafı zayıf ilanlar aynı bütçede daha uzun bekliyor.

## Yenilemede üç soru

Kiracı için soru, taşınma maliyetinin artıştan büyük olup olmadığıdır. Ev sahibi için soru, boşalacak dairenin kaç hafta boş kalacağıdır. Üçüncü soru ise depozito ve demirbaşın yazıldığı yerdir.

- Sözleşme maddeleri ilan metninden üstündür.
- Bu sayfadaki yönelim demo içeriktir.
- Uyuşmazlıkta güncel mevzuat ayrıca okunmalıdır.$bo1$, 'kira', '{"kira","sozlesme"}', '/editorial/interior.jpg', $al1$Boş, aydınlık bir dairenin içi$al1$, 'desk', 'published', '2026-10-05 09:00:00+03', $st1$Kira sözleşmelerinde yeni denge: örnek bir piyasa notu$st1$, $sd1$Yenileme döneminde ev sahipleri ve kiracılar aynı ilanı farklı okuyor. Bu not, örnek bir haftanın davranışını anlatır.$sd1$, '/haber/kira-sozlesmelerinde-yeni-denge', 'istanbul', 'uskudar', null, 84, 74, 'news', 'published', 'dogrula', '2026-10-04 15:00:00+03', $tw1$İlan fiyatı ile gerçekleşen kira aynı şey değildir. Örnek not, ilan süresini fiyat kadar ciddiye alır.$tw1$, $kf1$[{"label": "Dönem", "value": "Yenileme"}, {"label": "Taraflar", "value": "Kiracı ve ev sahibi"}, {"label": "Not", "value": "Örnek gözlem"}]$kf1$::jsonb, 4, true, $se1$kira sozlesmelerinde yeni denge: ornek bir piyasa notu yenileme doneminde ev sahipleri ve kiracilar ayni ilani farkli okuyor. bu not, ornek bir haftanin davranisini anlatir. kira istanbul uskudar kira sozlesme$se1$, '2026-10-06 01:20:00+03'),
('a03', $ti2$Konut kredisinde taksit konuşuluyor, fiyat ikinci planda$ti2$, 'konut-kredisinde-taksit-konusuluyor', $su2$Örnek senaryoda alıcılar satış etiketinden önce aylık ödemeyi soruyor. Faiz bandı tek başına talep yaratmıyor.$su2$, $bo2$Mortgage başlığı çoğu zaman tek bir faiz cümlesine indirgenir. Örnek masada konuşulan şey daha dar: taksit, gelirin neresine oturuyor?

## Bant yetmiyor

Örnek senaryoda faiz bandı bir miktar gerilese de dosya onay hızı aynı tempoda açılmıyor. Alıcı, ilanı kaydetmeden önce kendi taksitini hesaplıyor. Bu, vitrindeki indirimin her zaman talebe dönmemesinin nedenidir.

## Peşinat hâlâ eşik

Birikimi sınırlı olan alıcı, fiyatı uygun görünen ilanı da eleyebiliyor. Peşin alıcı ise pazarlığı teslim ve aidat üzerinden kuruyor. İki grup aynı ilan sayfasında duruyor, aynı kararı vermiyor.

- Bu metin kredi ürünü önermez.
- Banka koşulları kişiye göre değişir.
- Kaynaklar kurum ana sayfalarıdır; belirli bir tebliğ kopyası değildir.$bo2$, 'mortgage', '{"mortgage","faiz","kredi"}', '/editorial/keys.jpg', $al2$Meşe masada anahtar ve bulanık bir plan$al2$, 'desk', 'published', '2026-10-04 10:20:00+03', $st2$Konut kredisinde taksit konuşuluyor, fiyat ikinci planda$st2$, $sd2$Örnek senaryoda alıcılar satış etiketinden önce aylık ödemeyi soruyor. Faiz bandı tek başına talep yaratmıyor.$sd2$, '/haber/konut-kredisinde-taksit-konusuluyor', 'istanbul', null, null, 83, 80, 'analysis', 'published', 'dogrula', '2026-10-03 12:00:00+03', $tw2$Krediye erişim, fiyattan daha sert bir eşik. Örnek okuma, banka koşulunu ilan fiyatının önüne koyar.$tw2$, $kf2$[{"label": "İlk soru", "value": "Aylık taksit"}, {"label": "İkinci soru", "value": "Peşinat"}, {"label": "Veri", "value": "Örnek"}]$kf2$::jsonb, 4, true, $se2$konut kredisinde taksit konusuluyor, fiyat ikinci planda ornek senaryoda alicilar satis etiketinden once aylik odemeyi soruyor. faiz bandi tek basina talep yaratmiyor. mortgage istanbul  mortgage faiz kredi$se2$, '2026-10-06 01:20:00+03'),
('a04', $ti3$TOKİ başvurularında üç kontrol: örnek bir okur rehberi$ti3$, 'toki-basvurularinda-uc-kontrol', $su3$Sosyal konut duyurusu çıktığında ilk bakılacak üç başlık: şart, takvim ve proje yeri. Rehber örnektir, duyuru yerine geçmez.$su3$, $bo3$TOKİ başlığı hızla yayılır. Bu rehber, bir duyuruyu okurken nereden başlanacağını örnekler. Güncel bir başvuru ilanı değildir.

## Şart, takvim, yer

Birinci kontrol, kimin başvurabileceğidir. İkinci kontrol, son tarihtir. Üçüncü kontrol, konutun hangi ilçede durduğudur. Tanıtım cümlesi bu üçünü değiştirmez.

## Neyi bu sayfadan beklemeyin

Kura sonucu, güncel borç tablosu ve resmi şartname burada yoktur. Onlar kurumun kendi duyurusundadır. Konutevarsa, o metni haberleştirirken kaynağı açıkça gösterir.

- Örnek rehber karar yerine geçmez.
- Başvuru yalnızca kurum kanallarından yapılır.$bo3$, 'toki', '{"toki","sosyal-konut"}', '/editorial/ankara.jpg', $al3$Ankara'da uzak konut blokları$al3$, 'desk', 'published', '2026-10-03 08:40:00+03', $st3$TOKİ başvurularında üç kontrol: örnek bir okur rehberi$st3$, $sd3$Sosyal konut duyurusu çıktığında ilk bakılacak üç başlık: şart, takvim ve proje yeri. Rehber örnektir, duyuru yerine geçmez.$sd3$, '/haber/toki-basvurularinda-uc-kontrol', 'ankara', 'cankaya', null, 80, 84, 'guide', 'published', 'mevzuat', '2026-10-02 09:00:00+03', $tw3$Duyuru metni okunmadan özet yetmez. Örnek rehber, başvuru şartını proje tanıtımının önüne alır.$tw3$, $kf3$[{"label": "Kontrol", "value": "Şart, takvim, yer"}, {"label": "İmza", "value": "Haber Merkezi"}, {"label": "Tür", "value": "Rehber"}]$kf3$::jsonb, 3, true, $se3$toki basvurularinda uc kontrol: ornek bir okur rehberi sosyal konut duyurusu ciktiginda ilk bakilacak uc baslik: sart, takvim ve proje yeri. rehber ornektir, duyuru yerine gecmez. toki ankara cankaya toki sosyal-konut$se3$, '2026-10-06 01:20:00+03'),
('a05', $ti4$Riskli yapı tespitinde malikin ilk soruları$ti4$, 'riskli-yapi-tespitinde-ilk-sorular', $su4$Kentsel dönüşüm dosyası açılmadan önce sorulacaklar: tespit, çoğunluk ve tahliye takvimi. Örnek bir saha notu.$su4$, $bo4$Kentsel dönüşüm vaadi, şantiye fotoğrafından önce bir evrak işidir. Bu yazı, malikin ilk toplantıda sorabileceği başlıkları örneklendirir.

## Tespit olmadan proje olmaz

Örnek akışta riskli yapı kararı, müteahhit sunumundan önce gelir. Malik, tespit raporunun hangi kuruma dayandığını sorar. Sözlü vaat, kat karşılığı oranı kadar önemlidir; yazıya dökülmeden ilerlenmez.

## Çoğunluk ve tahliye

İkinci soru, karar nisabıdır. Üçüncü soru, tahliye ile kira yardımının takviminin çakışıp çakışmadığıdır. Bu üçü net değilse maket erken bir görüntüdür.

- Hukuki sonuç doğuran metin Resmî Gazete ve ilgili idare yazısıdır.
- Bu haber örnek bir okuma çerçevesidir.$bo4$, 'kentsel-donusum', '{"kentsel-donusum","riskli-yapi"}', '/editorial/construction.jpg', $al4$Konut inşaatında vinçler ve beton karkas$al4$, 'desk', 'published', '2026-10-02 13:15:00+03', $st4$Riskli yapı tespitinde malikin ilk soruları$st4$, $sd4$Kentsel dönüşüm dosyası açılmadan önce sorulacaklar: tespit, çoğunluk ve tahliye takvimi. Örnek bir saha notu.$sd4$, '/haber/riskli-yapi-tespitinde-ilk-sorular', 'istanbul', 'uskudar', null, 88, 76, 'guide', 'published', 'mevzuat', '2026-10-01 10:00:00+03', $tw4$Dönüşüm, tabela ile başlamaz. Örnek not, kararı resmi tespit ve malik iradesine bağlar.$tw4$, $kf4$[{"label": "İlk adım", "value": "Tespit"}, {"label": "İkinci", "value": "Çoğunluk"}, {"label": "Üçüncü", "value": "Takvim"}]$kf4$::jsonb, 5, true, $se4$riskli yapi tespitinde malikin ilk sorulari kentsel donusum dosyasi acilmadan once sorulacaklar: tespit, cogunluk ve tahliye takvimi. ornek bir saha notu. kentsel-donusum istanbul uskudar kentsel-donusum riskli-yapi$se4$, '2026-10-06 01:20:00+03'),
('a06', $ti5$EİDS ilan kontrol listesi: örnek bir doğrulama akışı$ti5$, 'eids-ilan-kontrol-listesi', $su5$İlan yayına çıkmadan önce yetki, taşınmaz kimliği ve iletişim adımı. Liste örnektir, sistem ekranı değildir.$su5$, $bo5$EİDS, ilan metninin süslü olmasından önce taşınmazın ve yetkinin eşleşmesini ister. Bu liste, bir ofisin sabah rutinini örnekler.

## Üç durak

Birinci durak, ilan veren kişinin yetkisidir. İkinci durak, taşınmaz bilgisi ile ilan başlığının çelişmemesidir. Üçüncü durak, iletişim kanalının ofise ait olmasıdır.

## Neden haber değeri var

Alıcı, doğrulanmış ilanı daha sakin okur. Emlakçı için ise hatalı kayıt, sonradan düzeltmekten pahalıdır. Konutevarsa bu başlığı mevzuat masasında tutar; otomatik yayın açmaz.

- Ekran görüntüsü paylaşılmamıştır.
- Güncel kural için Bakanlık duyurusu esastır.$bo5$, 'eids', '{"eids","ilan"}', '/editorial/keys.jpg', $al5$Anahtar ve masa üstü$al5$, 'desk', 'published', '2026-10-01 11:00:00+03', $st5$EİDS ilan kontrol listesi: örnek bir doğrulama akışı$st5$, $sd5$İlan yayına çıkmadan önce yetki, taşınmaz kimliği ve iletişim adımı. Liste örnektir, sistem ekranı değildir.$sd5$, '/haber/eids-ilan-kontrol-listesi', null, null, null, 77, 86, 'guide', 'published', 'dogrula', '2026-09-30 09:40:00+03', $tw5$Doğrulanmamış ilan, hızlı ilan değildir. Örnek liste, yayından önce yetkiyi kontrol eder.$tw5$, $kf5$[{"label": "Adım", "value": "Yetki"}, {"label": "Adım", "value": "Kimlik"}, {"label": "Adım", "value": "İletişim"}]$kf5$::jsonb, 3, true, $se5$eids ilan kontrol listesi: ornek bir dogrulama akisi ilan yayina cikmadan once yetki, tasinmaz kimligi ve iletisim adimi. liste ornektir, sistem ekrani degildir. eids   eids ilan$se5$, '2026-10-06 01:20:00+03'),
('a07', $ti6$İmar notu değişince mahallede ne değişir?$ti6$, 'imar-notu-mahalleyi-nasil-etkiler', $su6$Plan notundaki tek cümle, yapı yoğunluğunu ve sokak ritmini değiştirebilir. Örnek bir okuma.$su6$, $bo6$Mahalle değişimi çoğu zaman bir kule hikâyesiyle anlatılır. Oysa daha sık olan, plan notundaki küçük bir hükmün sokak ölçeğini değiştirmesidir.

## Ne okunur

Örnek okumada üç belge yan yana konur: yürürlükteki plan, askıdaki değişiklik ve plan notu. Yalnızca renkli lejant yetmez. Çekilen yol, çekme mesafesi ve emsal aynı sayfada aranır.

## Alıcı ne yapmalı

İlanı beğenen kişi, parselin güncel durumunu ilgili idareden teyit eder. Bu haber o teyidin yerine geçmez. Taşdelen sayfası, bu yüzden mahalle ölçeğini ayrıca tutar.

- Demo rehberdir.
- İmar durumu tapu işleminden önce ayrıca sorulur.$bo6$, 'mevzuat', '{"imar","plan-notu"}', '/editorial/street.jpg', $al6$Ağaçlı, sakin bir konut sokağı$al6$, 'desk', 'published', '2026-09-28 09:30:00+03', $st6$İmar notu değişince mahallede ne değişir?$st6$, $sd6$Plan notundaki tek cümle, yapı yoğunluğunu ve sokak ritmini değiştirebilir. Örnek bir okuma.$sd6$, '/haber/imar-notu-mahalleyi-nasil-etkiler', 'istanbul', 'cekmekoy', 'tasdelen', 74, 81, 'guide', 'published', 'mevzuat', '2026-09-27 14:00:00+03', $tw6$İlan fiyatı plan notunu geçersiz kılmaz. Örnek rehber, alıcıyı askı ve plan hükmüne gönderir.$tw6$, $kf6$[{"label": "Konu", "value": "Plan notu"}, {"label": "Ölçek", "value": "Mahalle"}, {"label": "Tür", "value": "Rehber"}]$kf6$::jsonb, 4, true, $se6$imar notu degisince mahallede ne degisir? plan notundaki tek cumle, yapi yogunlugunu ve sokak ritmini degistirebilir. ornek bir okuma. mevzuat istanbul cekmekoy imar plan-notu$se6$, '2026-10-06 01:20:00+03'),
('a08', $ti7$Yeni projede teslim tarihini okumanın örnek yöntemi$ti7$, 'yeni-projede-teslim-tarihini-okumak', $su7$Broşürdeki yıl, sözleşme yılıyla aynı olmayabilir. Örnek bir proje okuma disiplini.$su7$, $bo7$Yeni proje haberleri görselle başlar. Alıcının işi görselle bitmez. Bu yazı, teslim tarihini okurken kullanılacak örnek bir sırayı anlatır.

## Üç tarih

Birinci tarih, satış ofisinin söylediğidir. İkinci tarih, ön sözleşmedeki aralıktır. Üçüncü tarih, iskan hedefidir. Örnek disiplinde yalnızca üçüncüsü yaşamaya yakındır; o da garanti değildir, yazılır.

## Donatı cümleleri

Sosyal tesis vaadi, hangi etabın kapsamında olduğuna bakmadan fiyatın içine yazılırsa hikâye erken biter. Nilüfer'deki örnek proje kartları bu ayrımı göstermek için durur, satış ofisi değildir.

- Konutevarsa proje ilanı toplamaz.
- Tanıtım, haber ile sponsorluk diye ayrıca işaretlenir.$bo7$, 'yeni-projeler', '{"proje","teslim"}', '/editorial/courtyard.jpg', $al7$Avlulu yeni konut blokları$al7$, 'desk', 'published', '2026-09-27 16:00:00+03', $st7$Yeni projede teslim tarihini okumanın örnek yöntemi$st7$, $sd7$Broşürdeki yıl, sözleşme yılıyla aynı olmayabilir. Örnek bir proje okuma disiplini.$sd7$, '/haber/yeni-projede-teslim-tarihini-okumak', 'bursa', 'nilufer', null, 81, 73, 'guide', 'published', 'radar', '2026-09-26 11:20:00+03', $tw7$Maket, teslim tarihi değildir. Örnek yöntem, tarihi broşürden değil sözleşmeden okur.$tw7$, $kf7$[{"label": "Belge", "value": "Sözleşme"}, {"label": "Risk", "value": "Teslim yılı"}, {"label": "Yer", "value": "Örnek proje"}]$kf7$::jsonb, 4, true, $se7$yeni projede teslim tarihini okumanin ornek yontemi brosurdeki yil, sozlesme yiliyla ayni olmayabilir. ornek bir proje okuma disiplini. yeni-projeler bursa nilufer proje teslim$se7$, '2026-10-06 01:20:00+03'),
('a09', $ti8$Çekmeköy'de tempo: fiyat yerine stok ve süre$ti8$, 'cekmekoyde-tempo-fiyat-degil-stok', $su8$Örnek ilçe okuması, metrekare etiketini ikinci sıraya alır. Asıl soru, doğru dairenin kaç haftada bulunduğudur.$su8$, $bo8$Çekmeköy, tek bir fiyat cümlesiyle anlatılmaya uygundur ve bu yüzden sık yanılır. Bu analiz, örnek seride fiyatı değil tempoyu öne alır.

## Stok ile talep aynı haftada buluşmuyor

Örnek sette ilan adedi artarken kapanan iş adedi aynı hızda artmaz. Aile konutu arayanlar site yönetimini, bekâr profesyoneller ulaşımı sorar. İkisi de Çekmeköy der, aynı daireyi istemez.

## Mahalle neden ayrı sayfa

Taşdelen ile ilçenin başka bir mahallesi aynı ortalamaya yazıldığında ikisi de silinir. Konut Radar bu yüzden il, ilçe ve mahalle diye iner. Buradaki seri, o inişi göstermek için üretilmiş örnektir.

- Resmi endeks iddiası yoktur.
- Yatırım tavsiyesi değildir.$bo8$, 'analiz', '{"cekmekoy","analiz","stok"}', '/editorial/street.jpg', $al8$Konut sokağı$al8$, 'desk', 'published', '2026-10-05 12:30:00+03', $st8$Çekmeköy'de tempo: fiyat yerine stok ve süre$st8$, $sd8$Örnek ilçe okuması, metrekare etiketini ikinci sıraya alır. Asıl soru, doğru dairenin kaç haftada bulunduğudur.$sd8$, '/haber/cekmekoyde-tempo-fiyat-degil-stok', 'istanbul', 'cekmekoy', null, 91, 77, 'analysis', 'published', 'radar', '2026-10-04 18:00:00+03', $tw8$İlçe ortalaması karar değildir. Örnek analiz, Taşdelen gibi mahalleleri ayrı izlemeyi önerir.$tw8$, $kf8$[{"label": "İlçe", "value": "Çekmeköy"}, {"label": "Birinci ölçüt", "value": "Süre"}, {"label": "İkinci", "value": "Stok"}]$kf8$::jsonb, 5, true, $se8$cekmekoy'de tempo: fiyat yerine stok ve sure ornek ilce okumasi, metrekare etiketini ikinci siraya alir. asil soru, dogru dairenin kac haftada bulundugudur. analiz istanbul cekmekoy cekmekoy analiz stok$se8$, '2026-10-06 01:20:00+03'),
('a10', $ti9$Değerleme uygulamaları neyi ölçer, neyi ölçemez$ti9$, 'degerleme-uygulamalari-neyi-olcer', $su9$PropTech araçları hızlı bir aralık verir. Tapu, iskan ve sokak hâlâ ekranın dışındadır. Örnek bir sınır çizgisi.$su9$, $bo9$Bir uygulama saniyede fiyat aralığı gösterdiğinde iş bitmiş gibi durur. Bitmez. Bu yazı, aracın işe yaradığı yeri ve durduğu yeri ayırır.

## Aralık faydalıdır

Örnek kullanımda araç, bir sokağın komşu ilanlarından sapmayı gösterir. Editör için bu, haberi önceliklendiren bir işarettir. Alıcı için pazarlık öncesi bir çerçevedir.

## Aralık yetmez

Kat irtifakı, iskan, gizli ayıp ve imar notu uygulamada yoktur. Onlar belge işidir. Konutevarsa, otomatik değeri haber diye basmaz; güven skoru ve editör onayı arada durur.

- Ürün tavsiyesi yoktur.
- Örnek sınır çizgisidir.$bo9$, 'proptech', '{"proptech","degerleme"}', '/editorial/interior.jpg', $al9$Aydınlık boş daire$al9$, 'desk', 'published', '2026-09-22 10:00:00+03', $st9$Değerleme uygulamaları neyi ölçer, neyi ölçemez$st9$, $sd9$PropTech araçları hızlı bir aralık verir. Tapu, iskan ve sokak hâlâ ekranın dışındadır. Örnek bir sınır çizgisi.$sd9$, '/haber/degerleme-uygulamalari-neyi-olcer', null, null, null, 70, 82, 'analysis', 'published', 'dogrula', '2026-09-21 09:00:00+03', $tw9$Hızlı değer, ekspertiz değildir. Örnek yazı, aracı haber diye yüceltmez.$tw9$, $kf9$[{"label": "Ölçer", "value": "Aralık"}, {"label": "Ölçemez", "value": "Hukuki durum"}, {"label": "Not", "value": "Örnek"}]$kf9$::jsonb, 4, true, $se9$degerleme uygulamalari neyi olcer, neyi olcemez proptech araclari hizli bir aralik verir. tapu, iskan ve sokak hâlâ ekranin disindadir. ornek bir sinir cizgisi. proptech   proptech degerleme$se9$, '2026-10-06 01:20:00+03'),
('a11', $ti10$Yabancı alıcı ilgisi tek başına talep değildir$ti10$, 'yabanci-alici-ilgisi-talep-degildir', $su10$Sorgu artışı ile tapu işlemi aynı seri değildir. Örnek bir ayrım.$su10$, $bo10$Yabancı alıcı cümlesi manşete kolay yazılır. Ölçmesi zordur. Bu kısa analiz, sorgu ile gerçekleşen işlemi örnek olarak ayırır.

## Üç katman

Birinci katman, internet aramasıdır. İkinci katman, ofise bırakılan formdur. Üçüncü katman, tapuda biten iştir. Örnek seride birinci katman hareketliyken üçüncü katman sakin kalabilir.

## İzmir neden örnek

Karşıyaka gibi kıyı ilçelerinde ikinci konut ile oturum amacı aynı ilanda karışır. İl sayfası bu ikisini ayırmak için vardır. Rakam uydurulmamıştır; yön anlatılmıştır.

- Vatandaşlık veya teşvik vaadi yoktur.
- Demo içeriktir.$bo10$, 'gayrimenkul', '{"talep","yabanci-alici"}', '/editorial/izmir.jpg', $al10$İzmir kıyısında konutlar$al10$, 'desk', 'published', '2026-09-20 15:10:00+03', $st10$Yabancı alıcı ilgisi tek başına talep değildir$st10$, $sd10$Sorgu artışı ile tapu işlemi aynı seri değildir. Örnek bir ayrım.$sd10$, '/haber/yabanci-alici-ilgisi-talep-degildir', 'izmir', 'karsiyaka', null, 72, 75, 'analysis', 'published', 'radar', '2026-09-19 13:00:00+03', $tw10$İlgi, talep ve işlem üç ayrı kelimedir. Örnek analiz onları birleştirmez.$tw10$, $kf10$[{"label": "Sinyal", "value": "Sorgu"}, {"label": "İşlem", "value": "Ayrı seri"}, {"label": "İl", "value": "İzmir örneği"}]$kf10$::jsonb, 3, true, $se10$yabanci alici ilgisi tek basina talep degildir sorgu artisi ile tapu islemi ayni seri degildir. ornek bir ayrim. gayrimenkul izmir karsiyaka talep yabanci-alici$se10$, '2026-10-06 01:20:00+03'),
('a12', $ti11$Amortisman yılı neden tek başına yatırım kararı olmaz$ti11$, 'amortisman-yili-tek-basina-yetmez', $su11$Satış fiyatını yıllık kiraya bölmek bir başlangıçtır. Aidat, boşluk ve vergi yoksa hesap eksiktir.$su11$, $bo11$Amortisman yılı, konut yatırımının en çok paylaşılan ve en çabuk eskittiği sayıdır. Bu yazı, sayının neden tek başına karar olmadığını örnekler.

## Formülün dışı

Satış fiyatı bölü yıllık kira, boş geçecek ayları, aidatı, olası bakım ve vergiyi dışarıda bırakır. Örnek bir Kadıköy dairesinde bu kalemler yılı birden fazla değiştirir.

## Radar ne işe yarar

Konut Radar'daki amortisman tahmini, bölgeleri aynı örnek varsayımlarla yan yana koymak içindir. Resmi getiri tablosu değildir. Üzerinde örnek veri ibaresi durur.

- Yatırım tavsiyesi değildir.
- Kişisel bütçe bu hesabın dışındadır.$bo11$, 'yatirim', '{"yatirim","amortisman"}', '/editorial/keys.jpg', $al11$Anahtar ve masa$al11$, 'desk', 'published', '2026-09-18 09:00:00+03', $st11$Amortisman yılı neden tek başına yatırım kararı olmaz$st11$, $sd11$Satış fiyatını yıllık kiraya bölmek bir başlangıçtır. Aidat, boşluk ve vergi yoksa hesap eksiktir.$sd11$, '/haber/amortisman-yili-tek-basina-yetmez', 'istanbul', 'kadikoy', null, 85, 79, 'analysis', 'published', 'dogrula', '2026-09-17 17:30:00+03', $tw11$Konut Radar'daki amortisman alanı bir işarettir, teklif değildir. Örnek yazı, eksik bırakılan kalemleri sayar.$tw11$, $kf11$[{"label": "Formül", "value": "Eksik tek başına"}, {"label": "Ek", "value": "Boşluk süresi"}, {"label": "Ek", "value": "Aidat"}]$kf11$::jsonb, 4, true, $se11$amortisman yili neden tek basina yatirim karari olmaz satis fiyatini yillik kiraya bolmek bir baslangictir. aidat, bosluk ve vergi yoksa hesap eksiktir. yatirim istanbul kadikoy yatirim amortisman$se11$, '2026-10-06 01:20:00+03'),
('a13', $ti12$Kadıköy kiralıklarında seçicilik: örnek bir haftalık izlenim$ti12$, 'kadikoy-kiraliklarinda-secicilik', $su12$Aynı ilçede sahil bandı ile iç mahalleler farklı kapanıyor. Haftalık örnek izlenim.$su12$, $bo12$Bir hafta, kira piyasasını ölçmez. Yön hissettirir. Bu izlenim, Kadıköy örneğinde o hissi kayıt altına alır ve resmi seri olduğunu söylemez.

## İki tempo

Örnek haftada sahile yakın, eşyası düzgün daireler daha çabuk konuşulur. İç mahallelerde fiyat konuşması daha uzundur. İkisi de Kadıköy ilanıdır.

## Neden mahalle

Moda sayfası bu yüzden ilçe sayfasının altında durur. Aynı model, veri geldikçe başka mahallelere açılır. Şimdilik iskelet ve iki örnek mahalle yeter.

- Gözlem örnektir.
- İlan taraması otomatik yayınlanmaz.$bo12$, 'kira', '{"kira","kadikoy"}', '/editorial/street.jpg', $al12$Apartmanlı sokak$al12$, 'desk', 'published', '2026-10-04 18:40:00+03', $st12$Kadıköy kiralıklarında seçicilik: örnek bir haftalık izlenim$st12$, $sd12$Aynı ilçede sahil bandı ile iç mahalleler farklı kapanıyor. Haftalık örnek izlenim.$sd12$, '/haber/kadikoy-kiraliklarinda-secicilik', 'istanbul', 'kadikoy', 'moda', 79, 70, 'news', 'published', 'radar', '2026-10-04 08:00:00+03', $tw12$İlçe ortalaması Moda'yı anlatmaz. Örnek izlenim, mahalle sayfasına iner.$tw12$, $kf12$[{"label": "İlçe", "value": "Kadıköy"}, {"label": "Pencere", "value": "Bir hafta"}, {"label": "Ayrım", "value": "Sahil / iç"}]$kf12$::jsonb, 3, true, $se12$kadikoy kiraliklarinda secicilik: ornek bir haftalik izlenim ayni ilcede sahil bandi ile ic mahalleler farkli kapaniyor. haftalik ornek izlenim. kira istanbul kadikoy kira kadikoy$se12$, '2026-10-06 01:20:00+03'),
('a14', $ti13$Konut kredisi hacmi ve hane bütçesi$ti13$, 'konut-kredisi-hacmi-ve-hane-butcesi', $su13$İnceleme kuyruğundaki örnek ekonomi notu. Hacim artışı, her hanenin eriştiği anlamına gelmez.$su13$, $bo13$Bu metin kasıtlı olarak inceleme kuyruğundadır. Ekonomi notu, kredi hacmindeki örnek hareketi hane bütçesine bağlar. Yayın kararı editöre aittir.

## Neden bekliyor

Kaynak cümlesi henüz tek bir bültene kilitlenmedi. Güven skoru eşiğin üstünde olsa da editoryal statü review'dur. Otomatik yayın kapalıdır.

## Yayınlansa ne derdi

Hacim artışı, kredinin her gelir grubuna açıldığı anlamına gelmez. Bu cümle, onaydan sonra da örnek veri ibaresiyle yaşardı.$bo13$, 'ekonomi', '{"ekonomi","kredi"}', '/editorial/ankara.jpg', $al13$Ankara konut silueti$al13$, 'desk', 'review', null, $st13$Konut kredisi hacmi ve hane bütçesi$st13$, $sd13$İnceleme kuyruğundaki örnek ekonomi notu. Hacim artışı, her hanenin eriştiği anlamına gelmez.$sd13$, '/haber/konut-kredisi-hacmi-ve-hane-butcesi', 'ankara', null, null, 68, 64, 'analysis', 'review', 'dogrula', '2026-10-05 19:10:00+03', $tw13$Hacim, dağılım değildir. Not onaylanmadan manşete çıkmaz.$tw13$, $kf13$[{"label": "Durum", "value": "İncelemede"}, {"label": "Başlık", "value": "Hane bütçesi"}, {"label": "Not", "value": "Yayınlanmadı"}]$kf13$::jsonb, 3, true, $se13$konut kredisi hacmi ve hane butcesi inceleme kuyrugundaki ornek ekonomi notu. hacim artisi, her hanenin eristigi anlamina gelmez. ekonomi ankara  ekonomi kredi$se13$, '2026-10-06 01:20:00+03'),
('a15', $ti14$Plan notlarında emsal okuma taslağı$ti14$, 'plan-notlarinda-emsal-okuma-taslagi', $su14$Henüz yazım aşamasında bir mevzuat taslağı. Kaynak teyidi tamamlanmadı.$su14$, $bo14$Bu gövde bilerek kısadır. Emsal okuması için plan notu örneği henüz seçilmedi. Ajan notu düştü, editör araştırmayı sürdürüyor.

## Açık iş

Tek bir belediye meclis kararına bağlanmadan yayınlanmayacak. Reddedilmedi; olgunlaşmadı.$bo14$, 'mevzuat', '{"imar","taslak"}', '/editorial/street.jpg', $al14$Konut sokağı$al14$, 'desk', 'draft', null, $st14$Plan notlarında emsal okuma taslağı$st14$, $sd14$Henüz yazım aşamasında bir mevzuat taslağı. Kaynak teyidi tamamlanmadı.$sd14$, '/haber/plan-notlarinda-emsal-okuma-taslagi', 'ankara', 'cankaya', null, 55, 48, 'guide', 'researching', 'mevzuat', '2026-10-05 20:00:00+03', $tw14$Taslak, haber değildir.$tw14$, $kf14$[{"label": "Durum", "value": "Taslak"}, {"label": "Eksik", "value": "Kaynak teyidi"}]$kf14$::jsonb, 2, true, $se14$plan notlarinda emsal okuma taslagi henuz yazim asamasinda bir mevzuat taslagi. kaynak teyidi tamamlanmadi. mevzuat ankara cankaya imar taslak$se14$, '2026-10-06 01:20:00+03'),
('a16', $ti15$“Fiyatlar yarıya indi” başlığı neden yayında değil$ti15$, 'fiyatlar-yariya-indi-basligi-neden-yayinda-degil', $su15$Aşırı iddia taşıyan örnek kayıt reddedildi. Başlık, kaynağın söylemediği şeyi söylüyordu.$su15$, $bo15$Bu kayıt, editoryal standardı göstermek için reddedilmiş bir örnektir. Başlık yarı yarıya düşüş vaat ediyordu. Kaynak bunu söylemiyordu.

## Ret gerekçesi

Güven skoru düşük, iddia yüksek. Doğrulama masası yayınlamadı. Düzeltme politikası, bu eşiği sonradan da korur.$bo15$, 'konut', '{"standart","red"}', '/editorial/construction.jpg', $al15$Şantiye$al15$, 'desk', 'rejected', null, $st15$“Fiyatlar yarıya indi” başlığı neden yayında değil$st15$, $sd15$Aşırı iddia taşıyan örnek kayıt reddedildi. Başlık, kaynağın söylemediği şeyi söylüyordu.$sd15$, '/haber/fiyatlar-yariya-indi-basligi-neden-yayinda-degil', 'istanbul', null, null, 40, 22, 'news', 'review', 'dogrula', '2026-10-03 08:20:00+03', $tw15$Kaynağın cümlesinden büyük başlık yayınlanmaz.$tw15$, $kf15$[{"label": "Karar", "value": "Red"}, {"label": "Neden", "value": "İddia > kaynak"}]$kf15$::jsonb, 2, true, $se15$“fiyatlar yariya indi” basligi neden yayinda degil asiri iddia tasiyan ornek kayit reddedildi. baslik, kaynagin soylemedigi seyi soyluyordu. konut istanbul  standart red$se15$, '2026-10-06 01:20:00+03'),
('a17', $ti16$Nilüfer'de örnek bir kasım ajandası$ti16$, 'niluferde-kasim-ajandasi', $su16$Zamanlanmış örnek not. Kasım başında bölge sayfasına bağlanmak üzere bekliyor.$su16$, $bo16$Bu kayıt zamanlanmıştır. Kasım ajandası, Nilüfer proje kartlarıyla aynı haftaya denk gelsin diye ileri tarihe alındı.

## Neden şimdi yayında değil

Statü scheduled olduğu için kamu sayfalarında görünmez. Yayın saati gelince de demo ibaresini taşır.$bo16$, 'yeni-projeler', '{"nilufer","ajanda"}', '/editorial/courtyard.jpg', $al16$Avlulu konutlar$al16$, 'desk', 'scheduled', '2026-11-03 09:00:00+03', $st16$Nilüfer'de örnek bir kasım ajandası$st16$, $sd16$Zamanlanmış örnek not. Kasım başında bölge sayfasına bağlanmak üzere bekliyor.$sd16$, '/haber/niluferde-kasim-ajandasi', 'bursa', 'nilufer', null, 63, 71, 'news', 'approved', 'radar', '2026-10-05 12:00:00+03', $tw16$Onay, yayın saatinden önce gelir. Otomatik saat bu örnekte editörün elindedir.$tw16$, $kf16$[{"label": "Durum", "value": "Zamanlandı"}, {"label": "İlçe", "value": "Nilüfer"}]$kf16$::jsonb, 2, true, $se16$nilufer'de ornek bir kasim ajandasi zamanlanmis ornek not. kasim basinda bolge sayfasina baglanmak uzere bekliyor. yeni-projeler bursa nilufer nilufer ajanda$se16$, '2026-10-06 01:20:00+03')
on conflict (id) do nothing;
insert into article_sources (article_id, source_id, source_url, retrieved_at) values
('a01', 'tuik', 'https://www.tuik.gov.tr', '2026-10-05 12:00:00+03'),
('a01', 'tcmb', 'https://www.tcmb.gov.tr', '2026-10-05 12:00:00+03'),
('a02', 'tuik', 'https://www.tuik.gov.tr', '2026-10-05 12:00:00+03'),
('a02', 'csb', 'https://www.csb.gov.tr', '2026-10-05 12:00:00+03'),
('a03', 'tcmb', 'https://www.tcmb.gov.tr', '2026-10-05 12:00:00+03'),
('a03', 'bddk', 'https://www.bddk.org.tr', '2026-10-05 12:00:00+03'),
('a04', 'toki', 'https://www.toki.gov.tr', '2026-10-05 12:00:00+03'),
('a04', 'resmi', 'https://www.resmigazete.gov.tr', '2026-10-05 12:00:00+03'),
('a05', 'csb', 'https://www.csb.gov.tr', '2026-10-05 12:00:00+03'),
('a05', 'resmi', 'https://www.resmigazete.gov.tr', '2026-10-05 12:00:00+03'),
('a06', 'ticaret', 'https://www.ticaret.gov.tr', '2026-10-05 12:00:00+03'),
('a06', 'csb', 'https://www.csb.gov.tr', '2026-10-05 12:00:00+03'),
('a07', 'csb', 'https://www.csb.gov.tr', '2026-10-05 12:00:00+03'),
('a07', 'resmi', 'https://www.resmigazete.gov.tr', '2026-10-05 12:00:00+03'),
('a08', 'csb', 'https://www.csb.gov.tr', '2026-10-05 12:00:00+03'),
('a08', 'ticaret', 'https://www.ticaret.gov.tr', '2026-10-05 12:00:00+03'),
('a09', 'tuik', 'https://www.tuik.gov.tr', '2026-10-05 12:00:00+03'),
('a09', 'tcmb', 'https://www.tcmb.gov.tr', '2026-10-05 12:00:00+03'),
('a10', 'bddk', 'https://www.bddk.org.tr', '2026-10-05 12:00:00+03'),
('a10', 'ticaret', 'https://www.ticaret.gov.tr', '2026-10-05 12:00:00+03'),
('a11', 'tuik', 'https://www.tuik.gov.tr', '2026-10-05 12:00:00+03'),
('a11', 'ticaret', 'https://www.ticaret.gov.tr', '2026-10-05 12:00:00+03'),
('a12', 'tcmb', 'https://www.tcmb.gov.tr', '2026-10-05 12:00:00+03'),
('a12', 'tuik', 'https://www.tuik.gov.tr', '2026-10-05 12:00:00+03'),
('a13', 'tuik', 'https://www.tuik.gov.tr', '2026-10-05 12:00:00+03'),
('a14', 'bddk', 'https://www.bddk.org.tr', '2026-10-05 12:00:00+03'),
('a14', 'tcmb', 'https://www.tcmb.gov.tr', '2026-10-05 12:00:00+03'),
('a15', 'resmi', 'https://www.resmigazete.gov.tr', '2026-10-05 12:00:00+03'),
('a16', 'tuik', 'https://www.tuik.gov.tr', '2026-10-05 12:00:00+03'),
('a17', 'csb', 'https://www.csb.gov.tr', '2026-10-05 12:00:00+03')
on conflict do nothing;
insert into brokers (id, company_name, slug, monogram, description, city_slug, district_slug, neighborhoods, phone, email, website, instagram, verified, premium, featured, subscription_plan, is_demo, search_text) values
('b1', $bn0$Marmara Köşe Gayrimenkul$bn0$, 'marmara-kose', 'MK', $bd0$Çekmeköy ve Taşdelen hattında örnek bir butik ofis profili. İlan sitesi değildir; iletişim kartıdır.$bd0$, 'istanbul', 'cekmekoy', '{"Taşdelen","Alemdağ"}', '0216 000 00 11', 'ofis@marmara-kose.example', 'https://example.com', 'marmarakose', true, true, true, 'premium', true, $bs0$marmara kose gayrimenkul istanbul cekmekoy tasdelen alemdag$bs0$),
('b2', $bn1$Kadıköy Sahil Ofisi$bn1$, 'kadikoy-sahil-ofisi', 'KS', $bd1$Kadıköy ve Moda çevresinde kiralık ve ikinci el için örnek ofis kartı.$bd1$, 'istanbul', 'kadikoy', '{"Moda","Caferağa"}', '0216 000 00 22', 'masa@kadikoy-sahil.example', 'https://example.com', 'kadikoysahil', true, false, true, 'pro', true, $bs1$kadikoy sahil ofisi istanbul kadikoy moda caferaga$bs1$),
('b3', $bn2$Boğaz Hat Danışmanlık$bn2$, 'bogaz-hat', 'BH', $bd2$Beşiktaş odaklı örnek bölge ortağı profili. Sponsorluk modeli Region Partner planına bağlıdır.$bd2$, 'istanbul', 'besiktas', '{"Levent","Etiler"}', '0212 000 00 33', 'iletisim@bogaz-hat.example', 'https://example.com', 'bogazhat', true, true, true, 'region_partner', true, $bs2$bogaz hat danismanlik istanbul besiktas levent etiler$bs2$),
('b4', $bn3$Başkent Konut Masası$bn3$, 'baskent-konut-masasi', 'BK', $bd3$Çankaya'da örnek doğrulanmış ofis. Ücretsiz planda temel profil.$bd3$, 'ankara', 'cankaya', '{"Bahçelievler"}', '0312 000 00 44', 'masa@baskent-konut.example', null, null, true, false, false, 'free', true, $bs3$baskent konut masasi ankara cankaya bahcelievler$bs3$),
('b5', $bn4$Körfez Emlak Atölyesi$bn4$, 'korfez-emlak-atolyesi', 'KE', $bd4$Karşıyaka örneğinde Pro plan. Doğrulanmış rozet demo amaçlıdır.$bd4$, 'izmir', 'karsiyaka', '{"Bostanlı"}', '0232 000 00 55', 'atolye@korfez-emlak.example', 'https://example.com', 'korfezemlak', true, false, false, 'pro', true, $bs4$korfez emlak atolyesi izmir karsiyaka bostanli$bs4$),
('b6', $bn5$Nilüfer Yapı Rehberi$bn5$, 'nilufer-yapi-rehberi', 'NY', $bd5$Nilüfer yeni konut hattında örnek ofis. Öne çıkan listede durur.$bd5$, 'bursa', 'nilufer', '{"Özlüce"}', '0224 000 00 66', 'rehber@nilufer-yapi.example', null, 'niluferyapi', false, false, true, 'pro', true, $bs5$nilufer yapi rehberi bursa nilufer ozluce$bs5$)
on conflict (id) do nothing;
insert into projects (id, name, slug, developer, city_slug, district_slug, status, summary, unit_count, is_demo, search_text) values
('p1', $pn0$Koru Evleri Örnek$pn0$, 'koru-evleri-ornek', $pd0$Kuzey Yapı Demo$pd0$, 'istanbul', 'cekmekoy', 'construction', $ps0$Çekmeköy'de örnek bir aile konutu projesi. Satış ofisi değildir.$ps0$, 180, true, $pq0$koru evleri ornek kuzey yapi demo istanbul cekmekoy$pq0$),
('p2', $pn1$Moda Konutları Örnek$pn1$, 'moda-konutlari-ornek', $pd1$Sahil Atölye Demo$pd1$, 'istanbul', 'kadikoy', 'sales', $ps1$Moda çevresinde sınırlı daire sayılı örnek proje kartı.$ps1$, 24, true, $pq1$moda konutlari ornek sahil atolye demo istanbul kadikoy$pq1$),
('p3', $pn2$İncesu Rezidans Örnek$pn2$, 'incesu-rezidans-ornek', $pd2$Başkent Kalfa Demo$pd2$, 'ankara', 'cankaya', 'planning', $ps2$Çankaya'da henüz planlama aşamasında gösterilen örnek kart.$ps2$, 96, true, $pq2$incesu rezidans ornek baskent kalfa demo ankara cankaya$pq2$),
('p4', $pn3$Nilüfer Park Konut Örnek$pn3$, 'nilufer-park-konut-ornek', $pd3$Ova Yapı Demo$pd3$, 'bursa', 'nilufer', 'sales', $ps3$Nilüfer'de avlulu yerleşim iddiası taşıyan örnek proje.$ps3$, 240, true, $pq3$nilufer park konut ornek ova yapi demo bursa nilufer$pq3$)
on conflict (id) do nothing;
insert into subscription_plans (id, name, price_label, summary, features, sort_order) values
('free', 'Free', 'Ücretsiz', 'Temel profil. Ödeme yok.', array['Profil sayfası','İletişim kartı','Bölge etiketi'], 1),
('pro', 'Pro', 'Yakında', 'Liste içinde öne çıkma. Tahsilat bu fazda kapalı.', array['Öne çıkan liste','İlçe eşleşmesi','Lead görüntüleme'], 2),
('premium', 'Premium', 'Yakında', 'Ana sayfa vitrini. Tahsilat kapalı.', array['Ana sayfa vitrin','Öncelikli lead','Doğrulama rozeti incelemesi'], 3),
('region_partner', 'Region Partner', 'Yakında', 'Bir bölge sayfasında sponsorluk. Tahsilat kapalı.', array['Bölge sayfası sponsorluğu','Özel masa','Proje kartı'], 4)
on conflict (id) do nothing;
insert into ad_slots (id, placement, title, body, href, sponsor_name, active, is_demo) values
('ad-home-mid', 'homepage_middle', 'Bölgenizde örnek ofis vitrini', 'Bu kuşak bir reklam modeli göstergesidir. Gerçek kampanya bağlanmamıştır.', '/emlakci-ol', 'Konutevarsa Vitrin', true, true),
('ad-article', 'article_inline', 'Bu bölgede bir ofisle konuşun', 'Haberin içindeki ölçülü yönlendirme alanı.', '/emlakcilar', 'Konutevarsa Vitrin', true, true),
('ad-region', 'region_top', 'Bölge sayfası sponsorluğu', 'Region Partner planı açıldığında bu alan dolar.', '/emlakci-ol', 'Konutevarsa Vitrin', true, true),
('ad-side', 'article_sidebar', 'Kenar çubuğu', 'Kapalı örnek alan.', '/emlakci-ol', 'Konutevarsa Vitrin', false, true),
('ad-home-top', 'homepage_top', 'Üst bant', 'Tasarımı bölmemek için kapalı.', '/', 'Konutevarsa Vitrin', false, true)
on conflict (id) do nothing;
insert into settings (key, value) values
('publisher', '{"name":"Konutevarsa","desk":"Konutevarsa Haber Merkezi","locale":"tr-TR"}'::jsonb),
('analytics', '{"googleAnalyticsId":"","searchConsoleVerification":"","clarityId":"","metaPixelId":""}'::jsonb)
on conflict (key) do nothing;
