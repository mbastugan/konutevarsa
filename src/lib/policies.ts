export type Policy = {
  path: string;
  title: string;
  lede: string;
  sections: { h: string; p: string[] }[];
};

export const policies: Policy[] = [
  {
    path: "/hakkimizda",
    title: "Hakkımızda",
    lede: "Konutevarsa, gayrimenkulün gündemini haber, veri, bölge ve emlak profesyoneli katmanlarında bir araya getirmek için kuruluyor.",
    sections: [
      {
        h: "Ne değiliz",
        p: [
          "Klasik bir ilan sitesi değiliz. İlk yayın katmanı, konut piyasası, kira, yatırım, mevzuat ve kentsel dönüşümü sakin bir dille izler.",
          "Şu an ekranda gördüğünüz haberler ve fiyat serileri örnektir. Resmi istatistik gibi sunulmaz.",
        ],
      },
      {
        h: "Nereye gidiyor",
        p: [
          "Sıra haberden veriye, veriden bölge sayfasına, bölgeden emlakçı profiline ve talebe ilerler.",
          "Yayıncı kimliği Konutevarsa Haber Merkezi'dir. Gerçek editörler aynı yazar modeline eklenecek.",
        ],
      },
    ],
  },
  {
    path: "/iletisim",
    title: "İletişim",
    lede: "Editoryal not, düzeltme ve ofis başvuruları form üzerinden alınır. Bu ortamda otomatik arama veya SMS yoktur.",
    sections: [
      {
        h: "Yazışma",
        p: [
          "Yayın kimliği: Konutevarsa Haber Merkezi.",
          "Okur düzeltmeleri Düzeltme Politikası'na tabidir. Ticari teklifler Emlakçı Ol sayfasından gelir.",
        ],
      },
    ],
  },
  {
    path: "/editoriyal-politika",
    title: "Editoryal politikamız",
    lede: "Manşet, kaynağın söylemediği cümleyi kurmaz. Otomatik yayın varsayılan olarak kapalıdır.",
    sections: [
      {
        h: "İmza",
        p: [
          "Yazılar Konutevarsa Haber Merkezi imzasıyla çıkar. Kişisel yazar eklenince biyografi, uzmanlık ve sosyal bağlantı aynı modelde durur.",
          "Anonim bir yapay zekâ imzası kullanılmaz. Makine notu ancak editör kuyruğuna düşer.",
        ],
      },
      {
        h: "Durumlar",
        p: [
          "Bir kayıt taslak, inceleme, zamanlanmış, yayında veya reddedilmiş olabilir.",
          "Editoryal statü ayrıca bulunur, araştırılır, doğrulanır, yazılır, incelenir, onaylanır ve yayınlanır diye ilerler.",
        ],
      },
    ],
  },
  {
    path: "/kaynak-politikasi",
    title: "Kaynak politikamız",
    lede: "Her haberde kaynak adı, bağlantı, tür ve erişim zamanı durur.",
    sections: [
      {
        h: "Türler",
        p: [
          "Kaynaklar resmi, kamu kurumu, şirket, haber, blog, araştırma veya diğer diye ayrılır.",
          "Güven skoru ve otomatik yayına izin ayrı alanlardır. Örnek sette otomatik yayın hiçbir kaynakta açık değildir.",
        ],
      },
      {
        h: "Örnek atıf",
        p: [
          "Demonstrasyon haberlerindeki bağlantılar kurum ana sayfalarıdır. Belirli bir bültenin birebir aktarımı değildir.",
          "Rakam örnek seriden geliyorsa metin bunu açıkça söyler.",
        ],
      },
    ],
  },
  {
    path: "/duzeltme-politikasi",
    title: "Düzeltme politikası",
    lede: "Yanlış cümle, yayından kaldırılmadan önce düzeltilir ve güncelleme zamanı görünür kalır.",
    sections: [
      {
        h: "Nasıl işler",
        p: [
          "Okur veya kurum, iletişim formundan düzeltme isteyebilir. İstek inceleme kuyruğuna düşer.",
          "Küçük düzeltmelerde haber yayında kalır, güncelleme tarihi değişir. İddia kaynağı aşıyorsa kayıt reddedilir.",
        ],
      },
    ],
  },
  {
    path: "/kvkk",
    title: "KVKK aydınlatma",
    lede: "Talep ve bülten formları ad, telefon ve e-posta ister. Onay kutusu işaretlenmeden kayıt açılmaz.",
    sections: [
      {
        h: "Amaç",
        p: [
          "Veriler, bıraktığınız talebi yayın masasının görmesi ve bülten kaydı için işlenir.",
          "Bu fazda lead'ler bir emlakçıya otomatik dağıtılmaz. Atama alanı boş durur.",
        ],
      },
      {
        h: "Haklar",
        p: [
          "Erişim, düzeltme ve silme talepleri iletişim formu üzerinden iletilir.",
          "Demo ortamındaki kayıtlar önizleme veritabanındadır; üretim duyurusu ayrıca yapılır.",
        ],
      },
    ],
  },
  {
    path: "/gizlilik",
    title: "Gizlilik",
    lede: "Hesap, yalnızca giriş yapan yayın ekibi içindir. Okur haberleri hesap açmadan okur.",
    sections: [
      {
        h: "Ne toplanır",
        p: [
          "Zorunlu oturum çerezi, bülten adresi ve talep formundaki alanlar.",
          "Analitik kimlikleri tanımlı değilse ölçüm kodu yüklenmez. Uydurma piksel yoktur.",
        ],
      },
    ],
  },
  {
    path: "/cerez-politikasi",
    title: "Çerez politikası",
    lede: "Çerezler oturum ve çerez bandını kapatma tercihi içindir.",
    sections: [
      {
        h: "Türler",
        p: [
          "Giriş yapan ekip için oturum çerezi kullanılır.",
          "Ölçüm çerezleri ancak gerçek bir ölçüm kimliği tanımlandığında eklenir. Şu an tanımlı değildir.",
        ],
      },
    ],
  },
];

export function policyByPath(path: string) {
  return policies.find((item) => item.path === path);
}
