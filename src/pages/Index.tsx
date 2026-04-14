import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observers: Record<string, IntersectionObserver> = {};
    const sectionIds = ["hero", "features", "how", "pricing", "cta"];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      observers[id] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
            observers[id].unobserve(element);
          }
        },
        { threshold: 0.15 }
      );

      observers[id].observe(element);
    });

    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="font-display font-bold text-2xl tracking-tighter bg-gradient-to-r from-white via-accent to-accent/80 bg-clip-text text-transparent">
            AgentForge
          </div>
          <nav className="hidden md:flex gap-10 text-sm font-medium">
            <a href="#features" className="text-muted-foreground hover:text-white transition-colors">
              Возможности
            </a>
            <a href="#how" className="text-muted-foreground hover:text-white transition-colors">
              Как это работает
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-white transition-colors">
              Тарифы
            </a>
          </nav>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 text-sm font-medium border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all text-white">
              Войти
            </button>
            <button className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-accent via-accent to-accent/80 text-black rounded-full hover:shadow-lg hover:shadow-accent/40 transition-all font-semibold">
              Попробовать
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-32 px-6 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
          <img src="/images/black-hole-gif.gif" alt="Black hole animation" className="w-auto h-3/4 object-contain opacity-80" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-1000 ${visibleSections["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-medium tracking-widest text-accent uppercase">
                  AI-инфраструктура нового поколения
                </span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-display font-black leading-tight mb-8 tracking-tighter">
                <span className="bg-gradient-to-br from-white via-white to-accent/40 bg-clip-text text-transparent">
                  Создавай. Запускай.
                </span>
                <br />
                <span className="text-accent">Автоматизируй.</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-xl font-light">
                AgentForge позволяет создавать, разворачивать и масштабировать умных AI-агентов.
                От идеи до продакшена — за минуты, а не месяцы.
              </p>
              <div className="flex gap-4 mb-12 flex-col sm:flex-row">
                <button className="group px-8 py-4 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/50 transition-all font-semibold text-lg flex items-center gap-3 justify-center">
                  Запустить сейчас
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
                <button className="px-8 py-4 border border-white/30 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all font-medium text-lg text-white backdrop-blur-sm">
                  Смотреть демо
                </button>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                <div>
                  <div className="text-2xl font-bold text-accent mb-1">10 000+</div>
                  <p className="text-sm text-white/60">Активных агентов</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">500 000+</div>
                  <p className="text-sm text-white/60">Выполненных задач</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent mb-1">99.99%</div>
                  <p className="text-sm text-white/60">Аптайм</p>
                </div>
              </div>
            </div>

            <div
              className={`relative h-96 lg:h-[550px] transition-all duration-1000 flex items-center justify-center ${visibleSections["hero"] ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-transparent rounded-3xl blur-3xl animate-pulse" />
              <img
                src="/omnius-logo.png"
                alt="AgentForge"
                className="w-full max-w-sm lg:max-w-md drop-shadow-2xl animate-float relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["features"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Возможности</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4 mb-6">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Суперсилы встроены
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
              Всё необходимое для запуска AI-продукта — уже внутри. Без лишних интеграций.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "Zap",
                title: "Молниеносный деплой",
                desc: "Развертывание в продакшен одним кликом. Без DevOps-инженера и сложных настроек.",
              },
              {
                icon: "Cpu",
                title: "Умный AI-движок",
                desc: "Продвинутые возможности рассуждения, которые учатся и адаптируются под ваши задачи.",
              },
              {
                icon: "TrendingUp",
                title: "Автомасштабирование",
                desc: "Система сама увеличивает мощности при росте нагрузки — платите только за то, что используете.",
              },
              {
                icon: "Lock",
                title: "Корпоративная безопасность",
                desc: "Банковское шифрование и соответствие SOC2, GDPR, HIPAA — защита данных по умолчанию.",
              },
              {
                icon: "Settings",
                title: "Гибкие сценарии",
                desc: "Создавайте сложные цепочки автоматизации в визуальном редакторе без написания кода.",
              },
              {
                icon: "Cloud",
                title: "Мультиоблачность",
                desc: "AWS, Azure, GCP или своя инфраструктура — запускайте агентов там, где удобно вам.",
              },
            ].map((item, i) => {
              const isVisible = visibleSections["features"];
              return (
                <div
                  key={i}
                  className={`group p-8 border border-accent/10 hover:border-accent/40 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    <Icon name={item.icon} size={22} className="text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3 text-white">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["how"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Процесс</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                От нуля до героя
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light mt-6">
              Четыре шага — и ваш AI-агент уже в работе.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Проектируй", desc: "Определите возможности агента в интуитивном конструкторе без кода" },
              { num: "02", title: "Обучай", desc: "Загрузите данные и примеры — агент адаптируется под вашу задачу" },
              { num: "03", title: "Запускай", desc: "Один клик — и агент работает в боевом режиме" },
              { num: "04", title: "Масштабируй", desc: "Автомасштабирование обрабатывает миллионы запросов без вашего участия" },
            ].map((step, i) => {
              const isVisible = visibleSections["how"];
              return (
                <div
                  key={i}
                  className={`relative transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="group bg-accent/10 hover:bg-accent/20 border border-accent/20 hover:border-accent/40 rounded-2xl p-8 h-full flex flex-col justify-between transition-all backdrop-blur-sm cursor-pointer">
                    <div>
                      <div className="text-5xl font-display font-black text-accent mb-4 group-hover:scale-110 transition-transform origin-left">
                        {step.num}
                      </div>
                      <h3 className="font-display font-bold text-xl mb-3 text-white">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">{step.desc}</p>
                    </div>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-accent/40 to-transparent" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6 bg-accent/5">
        <div className="max-w-5xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["pricing"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Тарифы</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4 mb-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Простые цены
              </span>
            </h2>
            <p className="text-lg text-muted-foreground font-light">Без скрытых платежей. Отмена в любой момент.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Стартовый",
                price: "4 900 ₽/мес",
                desc: "Идеально для старта",
                features: [
                  "До 10 агентов",
                  "100 000 запросов/месяц",
                  "Поддержка сообщества",
                  "Базовая аналитика",
                ],
                highlight: false,
                cta: "Попробовать бесплатно",
              },
              {
                name: "Корпоративный",
                price: "По запросу",
                desc: "Для амбициозных команд",
                features: [
                  "Безлимитные агенты",
                  "Безлимитные запросы",
                  "Поддержка 24/7",
                  "Индивидуальные интеграции",
                ],
                highlight: true,
                cta: "Связаться с нами",
              },
            ].map((plan, i) => {
              const isVisible = visibleSections["pricing"];
              return (
                <div
                  key={i}
                  className={`group relative transition-all duration-700 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  } ${plan.highlight ? "md:scale-105" : ""}`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  {plan.highlight && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent to-accent/60 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition" />
                  )}
                  <div
                    className={`relative p-10 border rounded-2xl h-full flex flex-col justify-between backdrop-blur-sm transition-all ${
                      plan.highlight ? "border-accent/40 bg-accent/10" : "border-accent/10 bg-card/50 hover:bg-card/80"
                    }`}
                  >
                    {plan.highlight && (
                      <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-accent text-black text-xs font-bold tracking-wide">
                        Популярный
                      </div>
                    )}
                    <div>
                      <h3 className="font-display font-bold text-2xl mb-1 text-white">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{plan.desc}</p>
                      <p className="text-4xl font-black text-accent mb-8">{plan.price}</p>
                      <ul className="space-y-4 mb-10">
                        {plan.features.map((f, j) => (
                          <li key={j} className="flex gap-3 text-sm items-start">
                            <Icon name="Check" size={16} className="text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-foreground/80">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      className={`w-full px-6 py-4 rounded-xl font-semibold transition-all ${
                        plan.highlight
                          ? "bg-gradient-to-r from-accent to-accent/80 text-black hover:shadow-xl hover:shadow-accent/40"
                          : "border border-accent/20 hover:border-accent/40 hover:bg-accent/5 text-white"
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-accent blur-[120px]" />
        </div>
        <div
          className={`relative z-10 max-w-4xl mx-auto text-center transition-all duration-1000 ${visibleSections["cta"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="text-xs font-medium tracking-widest text-accent/60 uppercase mb-6 block">Начните сегодня</span>
          <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Готовы создавать?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 font-light max-w-2xl mx-auto">
            Присоединяйтесь к тысячам команд, которые уже строят будущее с AgentForge.
            Первые 14 дней — бесплатно.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-10 py-5 bg-gradient-to-r from-accent to-accent/90 text-black rounded-full hover:shadow-2xl hover:shadow-accent/40 transition-all font-bold text-lg flex items-center gap-3 justify-center">
              Начать бесплатно
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
            <button className="px-10 py-5 border border-white/20 rounded-full hover:border-accent/50 hover:bg-accent/5 transition-all font-medium text-lg text-white">
              Поговорить с командой
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-accent/10 py-12 px-6 bg-background/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <div>
            <div className="font-display font-bold text-lg text-white mb-1">AgentForge</div>
            <p>© 2025 — Создавайте умных агентов</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Конфиденциальность</a>
            <a href="#" className="hover:text-white transition-colors">Условия</a>
            <a href="#" className="hover:text-white transition-colors">Документация</a>
            <a href="#" className="hover:text-white transition-colors">Контакты</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
