'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  LayoutDashboard,
  Layers,
  Palette,
  Trophy,
  History,
  Users,
  CreditCard,
  FileText,
  Cpu,
  Bell,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Copy,
  Zap,
  ArrowRight,
  Plus,
  RefreshCw,
  LogOut,
  Sliders,
  Database
} from 'lucide-react'

// Mock initial templates
const INITIAL_TEMPLATES = [
  {
    id: 1,
    title: '小红书情绪共鸣爆款标题',
    category: '爆款标题',
    description: '精准抓住读者焦虑与痛点，高点击率与互动率模型',
    cost: 1,
    heat: '9.8k',
    cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    tags: ['高点击', '情绪价值', '自媒体必备']
  },
  {
    id: 2,
    title: '极简干货科普卡片排版',
    category: '知识科普',
    description: '3段式论证结构，清晰视觉层级，涨粉极快',
    cost: 2,
    heat: '8.4k',
    cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    tags: ['结构清晰', '知识博主', '干货图文']
  },
  {
    id: 3,
    title: '治愈系手绘卡通头像与配图',
    category: '卡通工坊',
    description: '打造温暖有辨识度的自媒体拟人 IP',
    cost: 5,
    heat: '12.4k',
    cover: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    tags: ['视觉IP', '治愈画风', '高辨识度']
  },
  {
    id: 4,
    title: '3秒抓人种草脚本大纲',
    category: '自由创作',
    description: '黄金前3秒切入痛点，搭配分镜与引导下单金句',
    cost: 2,
    heat: '7.2k',
    cover: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
    tags: ['爆款脚本', '转化率', '电商好物']
  }
]

export default function Workbench() {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'ip' | 'cartoon' | 'challenge' | 'history' | 'admin-users' | 'admin-orders' | 'admin-models' | 'admin-templates'>('marketplace')
  const [selectedCategory, setSelectedCategory] = useState<string>('全部')
  
  // User state
  const [user, setUser] = useState({
    isLoggedIn: true,
    phone: '138****8888',
    nickname: '灵凌体验官',
    credits: 120,
    role: 'VIP创作者'
  })

  // Modals
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showRechargeModal, setShowRechargeModal] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState<string | null>(null)

  // AI Tool generator state
  const [inputTopic, setInputTopic] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedResults, setGeneratedResults] = useState<string[]>([])

  const triggerToast = (msg: string) => {
    setShowSuccessToast(msg)
    setTimeout(() => setShowSuccessToast(null), 3000)
  }

  const handleGenerate = () => {
    if (!inputTopic.trim()) {
      alert('请输入你要创作的主题或关键词！')
      return
    }
    if (user.credits < 2) {
      setShowRechargeModal(true)
      return
    }

    setIsGenerating(true)
    setTimeout(() => {
      setUser(prev => ({ ...prev, credits: prev.credits - 2 }))
      setGeneratedResults([
        `🔥 建议收藏！教你如何用 3 招搞定「${inputTopic}」`,
        `💡 讲真！关于「${inputTopic}」，90% 的自媒体人都做错了`,
        `✨ 亲测有效！这套「${inputTopic}」保姆级实操复盘，看完直接抄作业`,
        `📌 为什么聪明人都在默默做「${inputTopic}」？底层逻辑拆解给你看`,
        `⚡️ 别再瞎忙了！一份关于「${inputTopic}」的高效实战清单（附避坑指南）`
      ])
      setIsGenerating(false)
      triggerToast('生成完成，已扣除 2 积分！')
    }, 1200)
  }

  const handleRecharge = (amount: number, credits: number) => {
    setUser(prev => ({ ...prev, credits: prev.credits + credits }))
    setShowRechargeModal(false)
    triggerToast(`支付成功！已充值 ${credits} 积分`)
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans">
      {/* Toast Notification */}
      {showSuccessToast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-white shadow-xl animate-fade-in">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm font-medium">{showSuccessToast}</span>
        </div>
      )}

      {/* Left Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800">
        <div>
          {/* Brand Logo */}
          <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800/80 bg-slate-950/40">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center text-white shadow-lg shadow-rose-950/50">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white tracking-wide text-base">灵凌同学</span>
                <span className="text-[10px] bg-rose-500/20 text-rose-400 border border-rose-500/30 px-1.5 py-0.5 rounded font-mono font-medium">v2.6</span>
              </div>
              <p className="text-[11px] text-slate-400">让自媒体变得无限简单</p>
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)]">
            {/* User Workbench Section */}
            <div>
              <div className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                创作工作台
              </div>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('marketplace')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'marketplace'
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-900/40'
                      : 'hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <Layers className="h-4 w-4" />
                  <span>灵感广场</span>
                </button>

                <button
                  onClick={() => setActiveTab('ip')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'ip'
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-900/40'
                      : 'hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>IP 创作中心</span>
                  <span className="ml-auto text-[10px] bg-rose-950 text-rose-300 border border-rose-800 px-1.5 py-0.2 rounded">爆款</span>
                </button>

                <button
                  onClick={() => setActiveTab('cartoon')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'cartoon'
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-900/40'
                      : 'hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <Palette className="h-4 w-4" />
                  <span>卡通工坊</span>
                </button>

                <button
                  onClick={() => setActiveTab('challenge')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'challenge'
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-900/40'
                      : 'hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <Trophy className="h-4 w-4" />
                  <span>60 天挑战</span>
                </button>

                <button
                  onClick={() => setActiveTab('history')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'history'
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-900/40'
                      : 'hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <History className="h-4 w-4" />
                  <span>任务与草稿箱</span>
                </button>
              </nav>
            </div>

            {/* Admin CMS Section */}
            <div>
              <div className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>管理运营后台 (CMS)</span>
                <span className="text-[10px] text-emerald-400 font-mono">ADMIN</span>
              </div>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('admin-users')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'admin-users'
                      ? 'bg-slate-800 text-rose-400 border border-slate-700'
                      : 'hover:bg-slate-800/80 hover:text-white text-slate-400'
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span>用户与权限管理</span>
                </button>

                <button
                  onClick={() => setActiveTab('admin-orders')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'admin-orders'
                      ? 'bg-slate-800 text-rose-400 border border-slate-700'
                      : 'hover:bg-slate-800/80 hover:text-white text-slate-400'
                  }`}
                >
                  <CreditCard className="h-4 w-4" />
                  <span>套餐与充值流水</span>
                </button>

                <button
                  onClick={() => setActiveTab('admin-templates')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'admin-templates'
                      ? 'bg-slate-800 text-rose-400 border border-slate-700'
                      : 'hover:bg-slate-800/80 hover:text-white text-slate-400'
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  <span>模板与案例库配置</span>
                </button>

                <button
                  onClick={() => setActiveTab('admin-models')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'admin-models'
                      ? 'bg-slate-800 text-rose-400 border border-slate-700'
                      : 'hover:bg-slate-800/80 hover:text-white text-slate-400'
                  }`}
                >
                  <Cpu className="h-4 w-4" />
                  <span>AI 模型调度与通道</span>
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60">
          <Link
            href="/lingling"
            target="_blank"
            className="flex items-center justify-between text-xs text-slate-400 hover:text-rose-400 transition-colors py-1 mb-2"
          >
            <span>访问产品官网入口</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
            <div className="h-8 w-8 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center font-bold text-xs">
              灵
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{user.nickname}</p>
              <p className="text-[11px] text-slate-400 truncate">{user.role}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-slate-800">
              {activeTab === 'marketplace' && '灵感广场与精选模板'}
              {activeTab === 'ip' && '小红书 IP 创作中心'}
              {activeTab === 'cartoon' && '卡通形象工坊'}
              {activeTab === 'challenge' && '60 天自媒体跃迁挑战'}
              {activeTab === 'history' && '生成历史与任务记录'}
              {activeTab === 'admin-users' && '系统管理 › 用户与权限'}
              {activeTab === 'admin-orders' && '系统管理 › 套餐订单与充值记录'}
              {activeTab === 'admin-templates' && '系统管理 › 模板库与案例管理'}
              {activeTab === 'admin-models' && '系统管理 › AI 模型与通道配置'}
            </h1>
            <div className="hidden md:flex items-center gap-1 text-xs text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>小红书官方合规词库已加载</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Credit Balance Badge */}
            <div className="flex items-center gap-3 bg-rose-50 border border-rose-100 rounded-full pl-3 pr-1 py-1">
              <div className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-rose-500 fill-rose-500" />
                <span className="text-xs text-rose-900 font-semibold">{user.credits} 点</span>
              </div>
              <button
                onClick={() => setShowRechargeModal(true)}
                className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium px-3 py-1 rounded-full transition-colors shadow-sm"
              >
                充值
              </button>
            </div>

            <button
              onClick={() => triggerToast('暂无新系统通知')}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-rose-500 rounded-full ring-2 ring-white" />
            </button>
          </div>
        </header>

        {/* Scrollable Workspace Body */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* TAB 1: 灵感广场 */}
          {activeTab === 'marketplace' && (
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Banner */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 p-8 text-white shadow-xl">
                <div className="relative z-10 max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/20 px-3 py-1 text-xs font-medium text-rose-300 border border-rose-500/30 mb-4">
                    <Sparkles className="h-3.5 w-3.5" />
                    2026 小红书爆款排版与文案模型
                  </div>
                  <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                    从灵感到爆款，只要 <span className="text-rose-400">30 秒</span>
                  </h2>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                    精选千赞爆款模板，涵盖标题情绪价值激发、干货科普知识卡片、IP 拟人插画与种草脚本，一键生成。
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={() => setActiveTab('ip')}
                      className="bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-rose-900/50 flex items-center gap-2 transition-all hover:scale-105"
                    >
                      <span>立即开始创作</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2">
                  {['全部', '爆款标题', '知识科普', '卡通工坊', '自由创作'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        selectedCategory === cat
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-slate-500">
                  共展示 {INITIAL_TEMPLATES.length} 款自媒体模版
                </div>
              </div>

              {/* Template Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {INITIAL_TEMPLATES.filter(
                  t => selectedCategory === '全部' || t.category === selectedCategory
                ).map(t => (
                  <div
                    key={t.id}
                    className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    <div className="relative h-44 overflow-hidden bg-slate-100">
                      <img
                        src={t.cover}
                        alt={t.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                        {t.category}
                      </div>
                      <div className="absolute top-3 right-3 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                        <Zap className="h-3 w-3 fill-white" />
                        {t.cost} 积分
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base group-hover:text-rose-600 transition-colors">
                          {t.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                          {t.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {t.tags.map(tag => (
                            <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => {
                            setActiveTab('ip')
                            setInputTopic(t.title)
                          }}
                          className="bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                        >
                          使用
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: IP 创作中心 */}
          {activeTab === 'ip' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">爆款标题与小红书图文内容生成器</h2>
                    <p className="text-xs text-slate-500 mt-0.5">每次消耗 2 积分，支持情绪共鸣、干货结构与爆款词重构</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      你的创作主题 / 核心痛点 / 产品关键词
                    </label>
                    <textarea
                      value={inputTopic}
                      onChange={e => setInputTopic(e.target.value)}
                      placeholder="例如：自媒体新手如何起号、美白抗老护肤避坑、极简桌面改造好物..."
                      rows={3}
                      className="w-full rounded-xl border border-slate-300 p-4 text-sm text-slate-800 placeholder-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">快速示例：</span>
                      {['新手自媒体起号', '早C晚A实操', '平价好物合辑'].map(sample => (
                        <button
                          key={sample}
                          onClick={() => setInputTopic(sample)}
                          className="text-xs text-slate-600 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 px-2.5 py-1 rounded-md transition"
                        >
                          {sample}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-rose-900/30 flex items-center gap-2 transition"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>AI 正在思考生成中...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          <span>一键智能生成 (扣 2 点)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Generation Output Panel */}
              {generatedResults.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      已为你生成 5 个高点击小红书标题
                    </h3>
                    <span className="text-xs text-slate-400">点击任意一条即可复制</span>
                  </div>

                  <div className="space-y-2">
                    {generatedResults.map((res, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          navigator.clipboard?.writeText(res)
                          triggerToast('已成功复制标题到剪贴板！')
                        }}
                        className="group flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-rose-50/50 hover:border-rose-200 cursor-pointer transition"
                      >
                        <span className="text-sm font-medium text-slate-800 group-hover:text-rose-700">
                          {res}
                        </span>
                        <Copy className="h-4 w-4 text-slate-400 group-hover:text-rose-500 transition" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: 管理后台 - 用户管理 */}
          {activeTab === 'admin-users' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">平台用户与权限控制</h2>
                  <p className="text-xs text-slate-500">查看注册用户、剩余积分余额及角色权限</p>
                </div>
                <button
                  onClick={() => triggerToast('支持直接对接 Supabase 用户池')}
                  className="bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800"
                >
                  <Plus className="h-4 w-4" />
                  <span>添加测试用户</span>
                </button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3">用户昵称 / 手机号</th>
                      <th className="px-6 py-3">角色权限</th>
                      <th className="px-6 py-3">可用积分</th>
                      <th className="px-6 py-3">生成次数</th>
                      <th className="px-6 py-3">注册时间</th>
                      <th className="px-6 py-3 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { name: '灵凌体验官', phone: '138****8888', role: 'VIP创作者', credits: 120, tasks: 48, time: '2026-10-12' },
                      { name: '小红书种草达人', phone: '139****9999', role: '普通会员', credits: 15, tasks: 12, time: '2026-10-25' },
                      { name: '美妆测评李老师', phone: '186****1234', role: '企业学员', credits: 680, tasks: 310, time: '2026-10-29' }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition">
                        <td className="px-6 py-4 font-medium text-slate-900">
                          <div>{row.name}</div>
                          <div className="text-xs text-slate-400 font-mono">{row.phone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-rose-50 text-rose-600 border border-rose-200 text-xs px-2.5 py-0.5 rounded-full font-medium">
                            {row.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-800">{row.credits} 点</td>
                        <td className="px-6 py-4 text-slate-500">{row.tasks} 次</td>
                        <td className="px-6 py-4 text-xs text-slate-400">{row.time}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => triggerToast(`已为 ${row.name} 手动赠送 50 积分`)}
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                          >
                            加减积分
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: 管理后台 - AI 模型通道 */}
          {activeTab === 'admin-models' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">AI 模型调度与通道中枢</h2>
                  <p className="text-xs text-slate-500">配置文本模型、生图引擎、并发限制与故障自动切站</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'DeepSeek-V3 高速文案通道', type: '文字模型', provider: 'DeepSeek 官方', status: '正常运行', latency: '420ms', priority: '主线 #1' },
                  { name: '通义千问 2.5 商业兜底', type: '文字模型', provider: '阿里云 DashScope', status: '备用待命', latency: '580ms', priority: '备用 #2' },
                  { name: 'Flux-1 极致画质生图引擎', type: '图片模型', provider: 'Black Forest Labs', status: '正常运行', latency: '1850ms', priority: '主线 #1' },
                ].map((m, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                          {m.type}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          {m.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base">{m.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">供应商: {m.provider}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>平均延迟: <strong className="text-slate-700">{m.latency}</strong></span>
                      <span className="font-semibold text-rose-600">{m.priority}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: 其它页面占位 */}
          {['cartoon', 'challenge', 'history', 'admin-orders', 'admin-templates'].includes(activeTab) && (
            <div className="max-w-2xl mx-auto text-center py-20 space-y-4">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
                <Database className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">模块已就绪并绑定数据表</h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                该视图已在代码架构与 Supabase 数据表中完成规划，点击其他功能标签可随时切换。
              </p>
              <button
                onClick={() => setActiveTab('marketplace')}
                className="bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg"
              >
                返回灵感广场
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Recharge Modal */}
      {showRechargeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative animate-scale-up">
            <button
              onClick={() => setShowRechargeModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="h-12 w-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 fill-rose-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">选择充值套餐</h3>
              <p className="text-xs text-slate-500 mt-1">获取积分，解锁无限自媒体创作算力</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { name: '体验包', price: 9.9, credits: 100, tag: '新手必选' },
                { name: '月度畅享', price: 49.0, credits: 600, tag: '超值热卖', highlight: true },
                { name: '年度 Pro', price: 299.0, credits: 4500, tag: '企业首选' }
              ].map((pkg, idx) => (
                <div
                  key={idx}
                  onClick={() => handleRecharge(pkg.price, pkg.credits)}
                  className={`border rounded-2xl p-4 text-center cursor-pointer transition hover:border-rose-500 hover:shadow-md ${
                    pkg.highlight
                      ? 'border-rose-500 bg-rose-50/40 ring-2 ring-rose-500/20'
                      : 'border-slate-200'
                  }`}
                >
                  <span className="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-full font-medium">
                    {pkg.tag}
                  </span>
                  <div className="text-2xl font-black text-slate-900 mt-2">
                    ¥{pkg.price}
                  </div>
                  <div className="text-xs font-semibold text-rose-600 mt-1">
                    {pkg.credits} 积分
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">{pkg.name}</div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-xs text-slate-500 mb-2">点击套餐即刻模拟真实【微信 / 支付宝】支付并到账</p>
              <div className="text-[11px] text-slate-400">支持接入原生商户微信扫码与支付宝 Webhook 自动到账</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
