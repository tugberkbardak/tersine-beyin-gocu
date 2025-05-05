"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { ArrowRight, Menu, Quote, Star, X } from "lucide-react"
import BeamsBackground from "@/components/kokonutui/beams-background"
import Faq02 from "@/components/faq"
import { FlipText } from "@/components/magicui/flip-text"
import GradientButton from "@/components/ui/gradient-button"
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import { Globe } from "@/components/magicui/globe"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  const testimonials = [
    {
      name: "Ayşe",
      role: "Biyoteknoloji Uzmanı",
      location: "ABD'den Türkiye'ye döndü",
      quote:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      rating: 5,
    },
    {
      name: "Mehmet Kaya",
      role: "Yazılım Mühendisi",
      location: "Almanya'dan Türkiye'ye döndü",
      quote:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      rating: 5,
    },
    {
      name: "Zeynep Demir",
      role: "Nöroloji Uzmanı",
      location: "İngiltere'den Türkiye'ye döndü",
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      rating: 4,
    },
    {
      name: "Ahmet Öztürk",
      role: "Finans Uzmanı",
      location: "Kanada'dan Türkiye'ye döndü",
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      rating: 5,
    },
    {
      name: "Elif Şahin",
      role: "Yapay Zeka Araştırmacısı",
      location: "Japonya'dan Türkiye'ye döndü",
      quote:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      rating: 5,
    },
  ]

  // Parallax effect for hero section
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const titleY = useTransform(scrollY, [0, 300], [0, 100])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen w-full">
      <BeamsBackground />
      <div className="relative">
        {/* Navigation */}

        <header
          className={`fixed top-0 z-50 w-full transition-all-smooth ${
            scrolled
              ? "bg-neutral-950/80 backdrop-blur-lg py-2 shadow-md shadow-purple-900/10"
              : "bg-transparent py-2"
          }`}
        >
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-between">
              <div className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="transition-all-smooth"
                >
                  <div className="font-bold text-xl md:text-2xl text-white">
                    Tersine <span className="text-purple-400">Beyin Göçü</span>
                  </div>
                </motion.div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2">
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              {/* Desktop menu */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="hidden md:flex items-center space-x-8"
              >
                <a
                  href="#hakkimizda"
                  className="text-white/80 hover:text-white hover:text-purple-300 transition-colors"
                >
                  Hakkımızda
                </a>
                <a href="#yorumlar" className="text-white/80 hover:text-white hover:text-purple-300 transition-colors">
                  Yorumlar
                </a>
                <a href="#program" className="text-white/80 hover:text-white hover:text-purple-300 transition-colors">
                  Program
                </a>
                <a href="#basvuru" className="text-white/80 hover:text-white hover:text-purple-300 transition-colors">
                  Başvuru
                </a>
                <a href="#sss" className="text-white/80 hover:text-white hover:text-purple-300 transition-colors">
                  SSS
                </a>
                <a href="#iletisim" className="text-white/80 hover:text-white hover:text-purple-300 transition-colors">
                  İletişim
                </a>
              </motion.div>

              {/* Mobile menu */}
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="absolute top-16 left-0 right-0 bg-neutral-900/95 backdrop-blur-lg z-20 md:hidden"
                >
                  <div className="flex flex-col space-y-4 p-4">
                    <a href="#hakkimizda" className="text-white/80 hover:text-purple-300 transition-colors py-2">
                      Hakkımızda
                    </a>
                    <a href="#yorumlar" className="text-white/80 hover:text-purple-300 transition-colors py-2">
                      Yorumlar
                    </a>
                    <a href="#program" className="text-white/80 hover:text-purple-300 transition-colors py-2">
                      Program
                    </a>
                    <a href="#basvuru" className="text-white/80 hover:text-purple-300 transition-colors py-2">
                      Başvuru
                    </a>
                    <a href="#sss" className="text-white/80 hover:text-purple-300 transition-colors py-2">
                      SSS
                    </a>
                    <a href="#iletisim" className="text-white/80 hover:text-purple-300 transition-colors py-2">
                      İletişim
                    </a>
                  </div>
                </motion.div>
              )}
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section ref={heroRef} className="relative z-10 flex min-h-screen w-full items-center justify-center pt-16 md:pt-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center gap-4 md:gap-6 px-4 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight flex flex-wrap justify-center items-center gap-2">
                Tersine{" "}
                <AnimatedGradientText
                  speed={2}
                  colorFrom="#c4b5fd"
                  colorTo="#a21caf"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight py-2"
                >
                  Beyin Göçü
                </AnimatedGradientText>
              </h1>
              <h2
                className="text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-purple-300 tracking-tighter"
                style={{ fontFamily: "Carattere, cursive" }}
              >
                Yeteneğinizi Ülkenize Taşıyın
              </h2>
              <p
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto px-4"
                style={{ fontWeight: 500, margin: 0 }}
              >
                Yurt dışında edindiğiniz deneyim ve bilgi birikimini Türkiye'ye taşıyarak ülkemizin gelişimine katkıda
                bulunun. Tersine beyin göçü programımız, yurt dışındaki yetenekli Türkleri ülkemize geri kazandırmayı
                hedefliyor.
              </p>
              <div
                className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto justify-center"
              >
                <a href="#basvuru" className="w-full sm:w-auto">
                  <GradientButton
                    label="Hemen Başvurun"
                    icon={<ArrowRight size={16} />}
                    className="font-medium rounded-lg shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 w-full sm:w-auto"
                  />
                </a>
                <a
                  href="#program"
                  className="w-full sm:w-auto h-10 px-4 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors border border-white/10 hover:border-purple-500/30 transition-all-smooth"
                >
                  Programı Keşfedin
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Globe Section */}
        <div className="relative z-10 my-12 flex flex-col items-center space-y-2 md:flex-row md:space-x-10 md:space-y-0 justify-center">
          <div className="text-white text-3xl font-bold">2880 Öğrenci</div>
          <Globe className="!static w-full max-w-[600px] aspect-square" />
          <div className="text-white text-3xl font-bold">84 Şirket</div>
        </div>

        {/* About Section */}
        <section id="hakkimizda" className="relative z-10 py-20 w-full bg-neutral-950">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <FlipText
                as="h2"
                className="text-3xl md:text-4xl font-bold text-white mb-6 section-title"
                duration={0.7}
                staggerChildren={0.03}
              >
                Tersine Beyin Göçü Nedir?
              </FlipText>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Tersine beyin göçü, yurt dışında eğitim görmüş veya çalışmış nitelikli Türk vatandaşlarının Türkiye'ye
                geri dönmesini teşvik eden bir programdır. Bu program, ülkemizin bilimsel, teknolojik ve ekonomik
                gelişimine katkıda bulunmak amacıyla yurt dışındaki yetenekli insanlarımızı ülkemize geri kazandırmayı
                hedeflemektedir.
              </p>
              <p className="text-white/70 text-lg leading-relaxed">
                Programımız, geri dönen yeteneklere kariyer fırsatları, araştırma destekleri, vergi avantajları ve
                sosyal entegrasyon desteği gibi çeşitli teşvikler sunmaktadır.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Kariyer Fırsatları",
                  description: "Türkiye'nin önde gelen kurum ve kuruluşlarında kariyer fırsatları sunuyoruz.",
                },
                {
                  title: "Araştırma Destekleri",
                  description:
                    "Bilimsel ve teknolojik araştırmalar için özel fonlar ve laboratuvar imkanları sağlıyoruz.",
                },
                {
                  title: "Sosyal Entegrasyon",
                  description:
                    "Türkiye'ye dönüş yapan profesyoneller için kapsamlı sosyal entegrasyon programları sunuyoruz.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-purple-900/80 p-6 rounded-lg border border-purple-900/20 hover:border-purple-500/30 shadow-md transition-all-smooth"
                >
                  <h3 className="text-xl font-semibold text-white mb-3 section-title-left purple-glow">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section - Updated */}
        <section id="yorumlar" className="relative z-10 py-20 w-full bg-neutral-950">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <FlipText
                as="h2"
                className="text-3xl md:text-4xl font-bold text-white mb-6 section-title"
                duration={0.7}
                staggerChildren={0.03}
              >
                Katılımcı Yorumları
              </FlipText>
              <p className="text-white/70 text-lg leading-relaxed">
                Programımıza katılan ve Türkiye'ye geri dönen profesyonellerin deneyimleri ve düşünceleri.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`testimonial-card p-6 bg-purple-900/80 border border-purple-900/20 rounded-lg shadow-md ${index === currentTestimonial ? "ring-2 ring-purple-500/50" : ""}`}
                >
                  <div className="text-purple-400 mb-2">
                    <Quote size={20} />
                  </div>
                  <div className="mb-4 flex items-center">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={16} className="text-purple-400 fill-purple-400" />
                    ))}
                  </div>
                  <p className="text-white/70 italic mb-6 text-sm md:text-base">"{testimonial.quote}"</p>
                  <div className="mt-auto">
                    <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-white/60 text-sm">{testimonial.role}</p>
                    <p className="text-purple-300/80 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Program Section */}
        <section id="program" className="relative z-10 py-20 w-full bg-neutral-950">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <FlipText
                as="h2"
                className="text-3xl md:text-4xl font-bold text-white mb-6 section-title"
                duration={0.7}
                staggerChildren={0.03}
              >
                Program Detayları
              </FlipText>
              <p className="text-white/70 text-lg leading-relaxed">
                Tersine beyin göçü programımız, farklı sektörlerde ve alanlarda uzmanlaşmış profesyoneller için çeşitli
                fırsatlar sunmaktadır.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Akademik Program",
                  description:
                    "Üniversitelerde öğretim üyeliği ve araştırma pozisyonları için özel imkanlar sunuyoruz.",
                },
                {
                  title: "Teknoloji Programı",
                  description: "Teknoloji şirketlerinde ve Ar-Ge merkezlerinde çalışma fırsatları sağlıyoruz.",
                },
                {
                  title: "Girişimcilik Programı",
                  description: "Kendi işini kurmak isteyen girişimciler için özel destekler ve teşvikler sunuyoruz.",
                },
                {
                  title: "Kamu Programı",
                  description: "Kamu kurumlarında uzman pozisyonlar için özel kariyer yolları oluşturuyoruz.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-purple-900/80 p-6 rounded-lg border border-purple-900/20 hover:border-purple-500/30 shadow-md transition-all-smooth"
                >
                  <h3 className="text-xl font-semibold text-white mb-3 section-title-left purple-glow">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Section */}
        <section id="basvuru" className="relative z-10 py-20 w-full bg-neutral-950">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <FlipText
                as="h2"
                className="text-3xl md:text-4xl font-bold text-white mb-6 section-title"
                duration={0.7}
                staggerChildren={0.03}
              >
                Başvuru
              </FlipText>
              <p className="text-white/70 text-lg leading-relaxed">
                Tersine beyin göçü programına başvurmak için aşağıdaki formu doldurabilir veya detaylı bilgi için
                bizimle iletişime geçebilirsiniz.
              </p>
            </div>
            <div
              className="max-w-md mx-auto bg-neutral-900/90 p-6 rounded-lg border border-purple-900/20 shadow-md"
            >
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 bg-neutral-800/80 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all-smooth"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                    E-posta
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 bg-neutral-800/80 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all-smooth"
                    placeholder="E-posta adresiniz"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 bg-neutral-800/80 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all-smooth"
                    placeholder="Telefon numaranız"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-white mb-1">
                    Bulunduğunuz Ülke
                  </label>
                  <input
                    type="text"
                    id="country"
                    className="w-full px-4 py-2 bg-neutral-800/80 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all-smooth"
                    placeholder="Şu anda bulunduğunuz ülke"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
                    Mesaj
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 bg-neutral-800/80 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all-smooth"
                    placeholder="Mesajınız veya sorularınız"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 transition-all-smooth"
                >
                  Gönder
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="sss" className="relative z-10 bg-neutral-950">
          <Faq02 />
        </section>

        {/* Footer */}
        <footer id="iletisim" className="relative z-10 py-12 w-full bg-neutral-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4 section-title-left">Tersine Beyin Göçü</h3>
                <p className="text-white/70">
                  Yurt dışındaki yetenekli Türkleri ülkemize geri kazandırmak için çalışıyoruz.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 section-title-left">Hızlı Bağlantılar</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#hakkimizda" className="text-white/70 hover:text-purple-300 transition-colors">
                      Hakkımızda
                    </a>
                  </li>
                  <li>
                    <a href="#program" className="text-white/70 hover:text-purple-300 transition-colors">
                      Program
                    </a>
                  </li>
                  <li>
                    <a href="#basvuru" className="text-white/70 hover:text-purple-300 transition-colors">
                      Başvuru
                    </a>
                  </li>
                  <li>
                    <a href="#yorumlar" className="text-white/70 hover:text-purple-300 transition-colors">
                      Yorumlar
                    </a>
                  </li>
                  <li>
                    <a href="#sss" className="text-white/70 hover:text-purple-300 transition-colors">
                      SSS
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 section-title-left">İletişim</h4>
                <ul className="space-y-2">
                  <li className="text-white/70">info@tersinebeyin.org</li>
                  <li className="text-white/70">+90 212 123 4567</li>
                  <li className="text-white/70">Ankara, Türkiye</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 section-title-left">Bizi Takip Edin</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-white/70 hover:text-purple-300 transition-colors">
                    Twitter
                  </a>
                  <a href="#" className="text-white/70 hover:text-purple-300 transition-colors">
                    LinkedIn
                  </a>
                  <a href="#" className="text-white/70 hover:text-purple-300 transition-colors">
                    Instagram
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 mt-8 pt-8 text-center">
              <p className="text-white/50">© 2025 Tersine Beyin Göçü Programı. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
