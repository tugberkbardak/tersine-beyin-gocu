"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChevronDown, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { FlipText } from "@/components/magicui/flip-text"

interface FAQItemProps {
  question: string
  answer: string
  index: number
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      className={cn(
        "group rounded-lg border-[0.5px] border-gray-200/50 dark:border-purple-900/30",
        "transition-all duration-200 ease-in-out",
        isOpen
          ? "bg-linear-to-br from-neutral-900 via-neutral-900/90 to-neutral-900 dark:from-white/5 dark:via-white/2 dark:to-white/5"
          : "hover:bg-neutral-900/80 dark:hover:bg-white/[0.02]",
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between gap-4"
      >
        <h3
          className={cn(
            "text-base font-medium transition-colors duration-200 text-left",
            "text-gray-300 dark:text-gray-300",
            isOpen && "text-white dark:text-white",
          )}
        >
          {question}
        </h3>
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.1 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={cn(
            "p-0.5 rounded-full shrink-0",
            "transition-colors duration-200",
            isOpen ? "text-purple-400" : "text-gray-400 dark:text-gray-500",
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: {
                  duration: 0.4,
                  ease: [0.04, 0.62, 0.23, 0.98],
                },
                opacity: {
                  duration: 0.25,
                  delay: 0.1,
                },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: 0.25,
                },
              },
            }}
          >
            <div className="px-6 pb-4 pt-2">
              <motion.p
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="text-sm text-gray-400 dark:text-gray-400 leading-relaxed"
              >
                {answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Faq02() {
  const faqs: Omit<FAQItemProps, "index">[] = [
    {
      question: "Tersine beyin göçü programına kimler başvurabilir?",
      answer:
        "Yurt dışında eğitim görmüş veya en az 2 yıl profesyonel deneyim sahibi olan Türk vatandaşları programımıza başvurabilir. Başvuru sahiplerinin kendi alanlarında uzmanlaşmış olmaları beklenmektedir.",
    },
    {
      question: "Program kapsamında ne tür destekler sunulmaktadır?",
      answer:
        "Programımız kapsamında kariyer fırsatları, araştırma destekleri, vergi avantajları, konaklama yardımı ve sosyal entegrasyon desteği gibi çeşitli teşvikler sunulmaktadır. Destekler, başvuru sahibinin uzmanlık alanına ve program türüne göre değişiklik gösterebilir.",
    },
    {
      question: "Başvuru süreci nasıl işlemektedir?",
      answer:
        "Başvuru süreci, online başvuru formunun doldurulması ile başlar. Ardından ön değerlendirme, mülakat ve nihai değerlendirme aşamaları gerçekleştirilir. Başvurunuz olumlu sonuçlanırsa, size özel bir program ve destek paketi hazırlanır.",
    },
    {
      question: "Programa katılmak için herhangi bir taahhüt vermem gerekiyor mu?",
      answer:
        "Evet, programa kabul edilen katılımcıların en az 3 yıl süreyle Türkiye'de çalışma taahhüdü vermesi gerekmektedir. Bu süre, programın türüne ve sağlanan desteklerin kapsamına göre değişiklik gösterebilir.",
    },
  ]

  return (
    <section className="py-16 w-full bg-neutral-950">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <FlipText
            as="h2"
            className="text-3xl font-semibold mb-3 text-white section-title"
            duration={0.7}
            staggerChildren={0.03}
          >
            Sıkça Sorulan Sorular
          </FlipText>
          <p className="text-sm text-gray-400">Programımız hakkında merak edilen her şey</p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={cn(
            "max-w-md mx-auto mt-12 p-6 rounded-lg text-center bg-neutral-900/80 border border-purple-900/20",
          )}
        >
          <div className="inline-flex items-center justify-center p-1.5 rounded-full mb-4 bg-purple-900/20">
            <Mail className="h-4 w-4 text-purple-300" />
          </div>
          <p className="text-sm font-medium text-white mb-1">Başka sorularınız mı var?</p>
          <p className="text-xs text-gray-400 mb-4">Size yardımcı olmaktan memnuniyet duyarız</p>
          <button
            type="button"
            className={cn(
              "px-4 py-2 text-sm rounded-md",
              "bg-purple-600 text-white",
              "hover:bg-purple-700",
              "transition-colors duration-200",
              "font-medium shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40",
            )}
          >
            Destek Ekibine Ulaşın
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Faq02
