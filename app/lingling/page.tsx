import Link from 'next/link'
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  TrendingUp,
  Layout,
  Palette,
  Users,
  ChevronRight
} from 'lucide-react'

export default function LinglingLanding() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-rose-500 selection:text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center text-white shadow-lg shadow-rose-950/20">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <span className="font-bold text-xl text-slate-950 tracking-tight">灵凌同学</span>
              <span className="ml-2 text-xs text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full font-medium">小红书 AI</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-rose-600 transition-colors">核心功能</a>
            <a href="#cases" className="hover:text-rose-600 transition-colors">爆款案例</a>
            <a href="#pricing" className="hover:text-rose-600 transition-colors">套餐价格</a>
            <a href="#compliance" className="hover:text-rose-600 transition-colors">合规质检</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg"
            >
              进入工作台
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-28 px-6 bg-gradient-to-b from-rose-50/40 via-white to-white">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 border border-rose-200/80 px-4 py-1.5 text-xs font-semibold text-rose-600 shadow-sm">
            <Sparkles className="h-4 w-4" />
            <span>全新 2026 小红书全链路自媒体 AI 引擎</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tight leading-tight">
            让自媒体变得 <br />
            <span className="bg-gradient-to-r from-rose-600 via-rose-500 to-orange-500 bg-clip-text text-transparent">
              无限简单
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
            告别选题卡壳与排版焦虑。灵凌同学为你提供从爆款标题提炼、高转化图文卡片排版、拟人卡通 IP 插画到小红书违禁词检测的全闭环工作台。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/"
              className="w-full sm:w-auto bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-xl shadow-rose-900/20 flex items-center justify-center gap-3 transition-all hover:scale-105"
            >
              <span>立即免费开始创作</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="#pricing"
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-semibold text-base px-8 py-4 rounded-2xl transition-all"
            >
              查看套餐方案
            </a>
          </div>

          <div className="pt-8 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> 新人注册即赠 50 积分</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> 官方合规词库实时比对</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> 100% 独家提示词模型</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3">FEATURES</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">四大王牌模块，全面赋能创作者</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: TrendingUp,
              title: '爆款标题制造机',
              desc: '精准调用高点击率与情绪共鸣词库，针对美妆、数码、职场等多领域生成 10+ 候选标题。'
            },
            {
              icon: Layout,
              title: '极简干货图文排版',
              desc: '一键将散乱文字梳理为高点赞的 3 段式金句卡片与保姆级实操步骤清单。'
            },
            {
              icon: Palette,
              title: '拟人卡通 IP 工坊',
              desc: '无需复杂 Prompt，直接生成拥有高辨识度的自媒体拟人头像、插画与封面图。'
            },
            {
              icon: ShieldCheck,
              title: '发布前合规体检',
              desc: '实时过滤小红书最新违禁敏感词汇，自动标注风险词并提供安全同义替换词。'
            }
          ].map((feat, i) => (
            <div
              key={i}
              className="bg-slate-50 hover:bg-white rounded-3xl p-8 border border-slate-200/80 hover:border-rose-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center mb-6">
                <feat.icon className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">{feat.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-3">PRICING</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">透明定价，助力每一个自媒体梦想</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: '新手体验包',
                price: '9.9',
                original: '19.9',
                credits: '100 积分',
                desc: '适合新手尝鲜体验爆款生成流程',
                features: ['生成 50 篇爆款标题', '基础图文排版', '合规词检测']
              },
              {
                name: '月度畅享卡',
                price: '49',
                original: '99',
                credits: '600 积分',
                tag: '最受欢迎',
                highlight: true,
                desc: '高频创作博主的性价比首选',
                features: ['600 积分额度', '优先生成极速通道', '解锁卡通工坊生图', '专属社群与模板更新']
              },
              {
                name: '年度创作者 Pro',
                price: '299',
                original: '599',
                credits: '4500 积分',
                desc: '矩阵团队与自媒体工作室全功能配置',
                features: ['4500 积分超大额度', '所有新功能优先内测', '支持多账号并发调用', '1v1 专属自媒体指导']
              }
            ].map((pkg, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-3xl p-8 border flex flex-col justify-between shadow-sm hover:shadow-xl transition-all ${
                  pkg.highlight
                    ? 'border-rose-500 ring-2 ring-rose-500/20 relative'
                    : 'border-slate-200'
                }`}
              >
                {pkg.tag && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow">
                    {pkg.tag}
                  </div>
                )}
                <div>
                  <h4 className="text-xl font-bold text-slate-900">{pkg.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{pkg.desc}</p>
                  <div className="my-6">
                    <span className="text-4xl font-black text-slate-950">¥{pkg.price}</span>
                    <span className="text-xs text-slate-400 line-through ml-2">¥{pkg.original}</span>
                    <div className="text-xs font-semibold text-rose-600 mt-1">{pkg.credits}</div>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-600">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/"
                  className={`mt-8 w-full text-center py-3 rounded-xl font-bold text-sm transition-all ${
                    pkg.highlight
                      ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-900/20'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  立即订阅
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 bg-white text-center text-xs text-slate-400 space-y-3">
        <p>© 2026 灵凌同学 Lingling AI. All Rights Reserved.</p>
        <p>浙ICP备2026010294号-1 · 专注于小红书创作者的 AI 效能中枢</p>
      </footer>
    </div>
  )
}
