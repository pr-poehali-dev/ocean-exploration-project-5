import { useState } from "react";
import Icon from "@/components/ui/icon";

type Platform = "telegram" | "vk" | "whatsapp" | "max";

const PLATFORMS: { id: Platform; label: string; color: string; bg: string; lightBg: string }[] = [
  { id: "telegram", label: "Telegram", color: "text-blue-600", bg: "bg-blue-600", lightBg: "bg-blue-50" },
  { id: "vk", label: "ВКонтакте", color: "text-blue-700", bg: "bg-blue-700", lightBg: "bg-blue-50" },
  { id: "whatsapp", label: "WhatsApp", color: "text-green-600", bg: "bg-green-600", lightBg: "bg-green-50" },
  { id: "max", label: "MAX Версия", color: "text-violet-600", bg: "bg-violet-600", lightBg: "bg-violet-50" },
];

const FEATURES: Record<Platform, { icon: string; title: string; desc: string; tags: string[] }[]> = {
  telegram: [
    { icon: "Send", title: "Массовые рассылки", desc: "Отправляйте сообщения тысячам подписчиков за секунды с персонализацией", tags: ["Быстро", "Персонализация"] },
    { icon: "Users", title: "Инвайтинг в группы", desc: "Автоматически приглашайте пользователей в ваши каналы и группы", tags: ["Безопасно", "Многопоточность"] },
    { icon: "MessageCircle", title: "Чат-бот авторассылка", desc: "Настройте автоответы и цепочки сообщений для ваших клиентов", tags: ["24/7", "Воронки"] },
    { icon: "BarChart2", title: "Аналитика доставки", desc: "Отслеживайте открытия, клики и конверсии по каждой рассылке", tags: ["Статистика", "Отчёты"] },
    { icon: "Filter", title: "Сегментация базы", desc: "Разбивайте аудиторию по интересам, активности и другим параметрам", tags: ["Точечно", "Умно"] },
    { icon: "Clock", title: "Отложенный постинг", desc: "Планируйте рассылки заранее — система отправит их в нужное время", tags: ["Расписание", "Автопилот"] },
  ],
  vk: [
    { icon: "Send", title: "Рассылка в сообщениях", desc: "Отправляйте персональные сообщения подписчикам вашего сообщества", tags: ["Личные сообщения", "VK"] },
    { icon: "Users", title: "Парсинг аудитории", desc: "Собирайте базы пользователей по группам, интересам и активности", tags: ["Парсер", "База"] },
    { icon: "Heart", title: "Накрутка активности", desc: "Лайки, репосты и комментарии для роста охватов ваших публикаций", tags: ["Охваты", "Алгоритмы"] },
    { icon: "UserPlus", title: "Приглашения в группы", desc: "Автоматически добавляйте целевую аудиторию в ваши сообщества", tags: ["Рост", "Авто"] },
    { icon: "Bell", title: "Уведомления подписчикам", desc: "Информируйте аудиторию о новых акциях, товарах и событиях", tags: ["Триггеры", "Сегменты"] },
    { icon: "BarChart2", title: "Статистика кампаний", desc: "Полная аналитика по каждой рассылке в реальном времени", tags: ["Дашборд", "Экспорт"] },
  ],
  whatsapp: [
    { icon: "MessageCircle", title: "Массовые рассылки WA", desc: "Отправляйте текст, фото и видео напрямую в WhatsApp вашей базе", tags: ["Медиа", "Доставка"] },
    { icon: "Zap", title: "Мгновенные уведомления", desc: "Триггерные сообщения при действиях клиента: заказ, оплата, статус", tags: ["Триггеры", "CRM"] },
    { icon: "RefreshCw", title: "Прогрев аккаунтов", desc: "Безопасный прогрев новых номеров для массовых рассылок", tags: ["Безопасно", "Антибан"] },
    { icon: "Users", title: "Групповые рассылки", desc: "Автодобавление в WhatsApp группы и рассылка по участникам", tags: ["Группы", "Массово"] },
    { icon: "Bot", title: "Автоответчик", desc: "Настройте умные ответы на типичные вопросы ваших клиентов", tags: ["ИИ", "24/7"] },
    { icon: "ShieldCheck", title: "Защита от банов", desc: "Умные задержки и ротация аккаунтов — работайте без блокировок", tags: ["Стабильно", "Надёжно"] },
  ],
  max: [
    { icon: "Cpu", title: "Мультиплатформенность", desc: "Управляйте рассылками во всех мессенджерах из единого интерфейса", tags: ["All-in-one", "Единый кабинет"] },
    { icon: "Sparkles", title: "AI-генерация текстов", desc: "Нейросеть пишет продающие сообщения под вашу аудиторию", tags: ["GPT-4", "Копирайтинг"] },
    { icon: "Network", title: "API интеграции", desc: "Подключайтесь к CRM, интернет-магазинам и любым сервисам по API", tags: ["REST API", "Webhook"] },
    { icon: "TrendingUp", title: "A/B тестирование", desc: "Тестируйте разные варианты текстов и выбирайте лучший автоматически", tags: ["Конверсия", "Тесты"] },
    { icon: "Globe", title: "Геотаргетинг", desc: "Отправляйте сообщения в зависимости от города и часового пояса", tags: ["Локализация", "Гео"] },
    { icon: "LifeBuoy", title: "Персональный менеджер", desc: "Выделенный специалист для настройки и поддержки 24/7", tags: ["VIP", "Поддержка"] },
  ],
};

const Index = () => {
  const [activePlatform, setActivePlatform] = useState<Platform>("telegram");
  const [menuOpen, setMenuOpen] = useState(false);

  const platform = PLATFORMS.find((p) => p.id === activePlatform)!;
  const features = FEATURES[activePlatform];

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-gray-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <Icon name="Bot" size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">BotSuite</span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: "Возможности", href: "#features" },
              { label: "Тарифы", href: "#pricing" },
              { label: "О нас", href: "#about" },
              { label: "Контакты", href: "#contacts" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden md:block px-5 py-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-full hover:border-gray-300 hover:bg-gray-50 transition-all">
              Войти
            </button>
            <button className="px-5 py-2 text-sm font-semibold bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-sm">
              Попробовать
            </button>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={20} className="text-gray-700" />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-1">
            {[
              { label: "Возможности", href: "#features" },
              { label: "Тарифы", href: "#pricing" },
              { label: "О нас", href: "#about" },
              { label: "Контакты", href: "#contacts" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-8 rounded-full bg-red-50 border border-red-100">
            <Icon name="Zap" size={13} className="text-red-500" />
            <span className="text-xs font-semibold text-red-600 tracking-wide">Версия 2.0 уже доступна</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-gray-900 leading-tight mb-6">
            Автоматизация рассылок
            <br />
            <span className="text-gray-400">для вашего бизнеса</span>
          </h1>

          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Единая платформа для рассылок в Telegram, ВКонтакте, WhatsApp и MAX.
            Запускайте кампании за минуты, получайте клиентов — автоматически.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePlatform(p.id)}
                className={`px-5 py-2.5 text-sm font-semibold rounded-full border transition-all ${
                  activePlatform === p.id
                    ? `${p.bg} text-white border-transparent shadow-md`
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-4 mb-10">
            <div className={`w-14 h-14 rounded-2xl ${platform.bg} flex items-center justify-center flex-shrink-0 shadow-md`}>
              <Icon name="Layers" size={26} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Возможности {platform.label}</h2>
              <p className="text-gray-500 text-base">Полный набор инструментов для профессиональных рассылок</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, i) => (
              <div
                key={`${activePlatform}-${i}`}
                className="group bg-white border border-gray-100 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-200 cursor-default"
              >
                <div className={`w-10 h-10 rounded-xl ${platform.lightBg} flex items-center justify-center mb-4`}>
                  <Icon name={feat.icon} size={20} className={platform.color} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-base">{feat.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{feat.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {feat.tags.map((tag, j) => (
                    <span key={j} className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-500 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-gray-900 mb-3">Простые цены</h2>
            <p className="text-gray-500">Без скрытых платежей. Отмена в любой момент.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-center">
            {[
              {
                name: "Старт",
                price: "990 ₽",
                period: "/мес",
                desc: "Для первых шагов",
                features: ["1 платформа", "5 000 сообщений/мес", "1 аккаунт", "Email поддержка"],
                highlight: false,
                cta: "Начать бесплатно",
              },
              {
                name: "Бизнес",
                price: "3 490 ₽",
                period: "/мес",
                desc: "Для активного роста",
                features: ["3 платформы", "50 000 сообщений/мес", "5 аккаунтов", "Приоритетная поддержка"],
                highlight: true,
                cta: "Попробовать 7 дней",
              },
              {
                name: "MAX",
                price: "По запросу",
                period: "",
                desc: "Для крупного бизнеса",
                features: ["Все платформы", "Безлимитно", "Неограниченно аккаунтов", "Персональный менеджер"],
                highlight: false,
                cta: "Связаться с нами",
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-8 flex flex-col justify-between transition-all ${
                  plan.highlight
                    ? "bg-red-500 text-white shadow-2xl shadow-red-100 md:scale-105"
                    : "bg-[#FAFAF9] border border-gray-100"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-full whitespace-nowrap">
                    Популярный
                  </div>
                )}
                <div>
                  <h3 className={`font-bold text-lg mb-1 ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-4 ${plan.highlight ? "text-red-100" : "text-gray-500"}`}>{plan.desc}</p>
                  <div className="mb-6">
                    <span className={`text-3xl font-black ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm font-medium ${plan.highlight ? "text-red-200" : "text-gray-400"}`}>
                      {plan.period}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-sm">
                        <Icon name="Check" size={15} className={plan.highlight ? "text-red-200" : "text-gray-400"} />
                        <span className={plan.highlight ? "text-white" : "text-gray-600"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.highlight
                      ? "bg-white text-red-500 hover:bg-red-50"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacts" className="py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-500 rounded-md flex items-center justify-center">
              <Icon name="Bot" size={13} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-700">BotSuite</span>
          </div>
          <p className="text-xs text-gray-400 text-center max-w-xl">
            © 2025 BotSuite. Сервис предназначен только для законных маркетинговых коммуникаций.
            Пользователь несёт ответственность за соблюдение правил мессенджеров и законодательства РФ.
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">Политика</a>
            <a href="#" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">Условия</a>
            <a href="#" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">Поддержка</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
