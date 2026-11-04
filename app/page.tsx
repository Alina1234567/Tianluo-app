'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Sparkles,
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
  Database,
  Upload,
  Image as ImageIcon,
  Check,
  Calendar,
  Settings,
  Filter,
  Trash2,
  Download,
  Share2,
  Eye,
  Edit3,
  Key,
  HelpCircle,
  Radio,
  Clock,
  Send
} from 'lucide-react'

// Mock Templates
const INITIAL_TEMPLATES = [
  {
    id: 1,
    title: '小红书情绪共鸣爆款标题',
    category: '爆款标题',
    description: '精准抓住读者痛点与焦虑，唤起强互动模型',
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
  const [activeTab, setActiveTab] = useState<
    | 'marketplace'
    | 'portal'
    | 'ip'
    | 'cartoon'
    | 'challenge'
    | 'history'
    | 'admin-users'
    | 'admin-orders'
    | 'admin-templates'
    | 'admin-models'
    | 'admin-settings'
  >('marketplace')

  const [selectedCategory, setSelectedCategory] = useState<string>('全部')

  // User State
  const [user, setUser] = useState({
    isLoggedIn: true,
    phone: '138****8888',
    nickname: '灵凌体验官',
    credits: 120,
    role: 'VIP创作者'
  })

  // Modals & Feedback
  const [showRechargeModal, setShowRechargeModal] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState<string | null>(null)

  // 1. Title/Copy AI Generator State
  const [inputTopic, setInputTopic] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedResults, setGeneratedResults] = useState<string[]>([])

  // 2. Full 3-Card Material Creation (userPortal) State
  const [portalStep, setPortalStep] = useState<1 | 2 | 3>(1)
  const [portalType, setPortalType] = useState('知识科普图文')
  const [accountNickname, setAccountNickname] = useState('早八护肤搭子')
  const [accountBio, setAccountBio] = useState('专注平价好物与敏感肌自救干货分享')
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80')
  const [portalGeneratedCards, setPortalGeneratedCards] = useState<any[] | null>(null)
  const [isPortalGenerating, setIsPortalGenerating] = useState(false)

  // 3. Cartoon Studio State
  const [cartoonStyle, setCartoonStyle] = useState('日系温暖水彩')
  const [cartoonPrompt, setCartoonPrompt] = useState('一个戴黑框眼镜的短发女孩，穿着米色毛衣抱着一只橘猫')
  const [isCartoonGenerating, setIsCartoonGenerating] = useState(false)
  const [cartoonGallery, setCartoonGallery] = useState([
    { id: 1, title: '初秋午后·治愈头像', style: '温暖水彩', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80' },
    { id: 2, title: '专注工作·桌面插画', style: '3D Q版', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80' }
  ])

  // 4. 60-Day Challenge State
  const [checkedDays, setCheckedDays] = useState<number[]>([1, 2, 3, 4, 5])
  const [currentDay, setCurrentDay] = useState(6)

  // 5. Tasks & Drafts State
  const [tasksFilter, setTasksFilter] = useState<'all' | 'completed' | 'queued' | 'drafts'>('all')
  const [taskHistory, setTaskHistory] = useState([
    { id: 'TASK-20261103-01', title: '敏感肌换季护肤全流程 3 张图卡片', type: '素材生成', status: '已完成', cost: 6, time: '10分钟前' },
    { id: 'TASK-20261103-02', title: '小红书新手起号避坑指南 10 条爆款标题', type: '爆款标题', status: '已完成', cost: 2, time: '2小时前' },
    { id: 'TASK-20261103-03', title: '治愈系自媒体拟人 IP 形象生图', type: '卡通工坊', status: '已完成', cost: 5, time: '昨天' }
  ])

  // 6. Admin State
  const [usersList, setUsersList] = useState([
    { id: 1, name: '灵凌体验官', phone: '138****8888', role: 'VIP创作者', credits: 120, tasks: 48, time: '2026-10-12', status: '正常' },
    { id: 2, name: '小红书种草达人', phone: '139****9999', role: '普通会员', credits: 15, tasks: 12, time: '2026-10-25', status: '正常' },
    { id: 3, name: '美妆测评李老师', phone: '186****1234', role: '企业学员', credits: 680, tasks: 310, time: '2026-10-29', status: '正常' }
  ])

  const [ordersList, setOrdersList] = useState([
    { id: 'ORD-20261103-8801', user: '美妆测评李老师', package: '年度创作者 Pro', amount: 299.0, credits: 4500, payType: '微信扫码', time: '2026-11-03 14:20', status: '支付成功' },
    { id: 'ORD-20261102-4412', user: '灵凌体验官', package: '月度畅享卡', amount: 49.0, credits: 600, payType: '支付宝扫码', time: '2026-11-02 09:15', status: '支付成功' },
    { id: 'ORD-20261101-1190', user: '小红书种草达人', package: '新手体验包', amount: 9.9, credits: 100, payType: '微信扫码', time: '2026-11-01 19:40', status: '支付成功' }
  ])

  const [channels, setChannels] = useState([
    { id: 1, name: 'DeepSeek-V3 高速文案通道', type: '文字模型', provider: 'DeepSeek 官方', status: '正常运行', latency: '420ms', priority: '主线 #1' },
    { id: 2, name: '通义千问 2.5 商业兜底', type: '文字模型', provider: '阿里云 DashScope', status: '备用待命', latency: '580ms', priority: '备用 #2' },
    { id: 3, name: 'Flux-1 极致画质生图引擎', type: '图片模型', provider: 'Black Forest Labs', status: '正常运行', latency: '1850ms', priority: '主线 #1' }
  ])

  const [announcements, setAnnouncements] = useState([
    { id: 1, title: '灵凌同学 V2.6 全新上线', content: '小红书爆款标题生成器与完整 3 张图素材工坊已正式开放！', date: '2026-11-01', pinned: true }
  ])

  const triggerToast = (msg: string) => {
    setShowSuccessToast(msg)
    setTimeout(() => setShowSuccessToast(null), 3000)
  }

  // Handle Title Generation
  const handleGenerateTitles = () => {
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
    }, 1000)
  }

  // Handle 3-Card Material Generation
  const handleGeneratePortalMaterials = () => {
    if (user.credits < 6) {
      setShowRechargeModal(true)
      return
    }
    setIsPortalGenerating(true)
    setTimeout(() => {
      setUser(prev => ({ ...prev, credits: prev.credits - 6 }))
      setPortalGeneratedCards([
        {
          num: '01',
          role: '封面图 (吸睛痛点)',
          title: `讲真！关于「${accountNickname}」的换季避坑指南`,
          subtitle: '90% 姐妹都踩雷的误区，今天一次性说透',
          tags: ['#敏感肌', '#换季护肤', '#自媒体干货'],
          visual: uploadedPhoto
        },
        {
          num: '02',
          role: '内页图 1 (步骤实操)',
          title: '保姆级 3 步精简护肤法则',
          subtitle: '第一步：温水洁面精简；第二步：舒缓屏障打底；第三步：锁水乳液封层。',
          tags: ['#实操步骤', '#护肤方法'],
          visual: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80'
        },
        {
          num: '03',
          role: '内页图 2 (金句总结与互动)',
          title: '护肤贵在坚持，不要跟风盲从',
          subtitle: '找到适合自己肤质的节奏最重要！评论区留下你的肤质，我来帮你搭～',
          tags: ['#互动求助', '#金句总结'],
          visual: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80'
        }
      ])
      setIsPortalGenerating(false)
      setPortalStep(3)
      triggerToast('完整 3 张图发布素材已生成！已扣除 6 积分')
    }, 1500)
  }

  // Handle Cartoon Generation
  const handleGenerateCartoon = () => {
    if (user.credits < 5) {
      setShowRechargeModal(true)
      return
    }
    setIsCartoonGenerating(true)
    setTimeout(() => {
      setUser(prev => ({ ...prev, credits: prev.credits - 5 }))
      const newArt = {
        id: Date.now(),
        title: `生成画像·${cartoonPrompt.slice(0, 10)}...`,
        style: cartoonStyle,
        url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80'
      }
      setCartoonGallery([newArt, ...cartoonGallery])
      setIsCartoonGenerating(false)
      triggerToast('卡通形象生成完成！已扣除 5 积分')
    }, 1800)
  }

  // Handle 60-Day Checkin
  const toggleCheckDay = (day: number) => {
    if (checkedDays.includes(day)) {
      setCheckedDays(checkedDays.filter(d => d !== day))
    } else {
      setCheckedDays([...checkedDays, day])
      setUser(prev => ({ ...prev, credits: prev.credits + 5 }))
      triggerToast(`打卡成功！获得坚持奖励 +5 积分`)
    }
  }

  const handleRecharge = (amount: number, credits: number) => {
    setUser(prev => ({ ...prev, credits: prev.credits + credits }))
    setShowRechargeModal(false)
    triggerToast(`充值成功！已到账 ${credits} 积分`)
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans">
      {/* Toast Alert */}
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

          {/* Navigation Items */}
          <div className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)]">
            {/* User Workbench Section */}
            <div>
              <div className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                创作者核心业务
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
                  onClick={() => setActiveTab('portal')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'portal'
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-900/40'
                      : 'hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <ImageIcon className="h-4 w-4" />
                  <span>整套素材生产 (3张图)</span>
                  <span className="ml-auto text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded">核心</span>
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
                  <span>爆款标题生成器</span>
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
                  <span>卡通形象工坊</span>
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
                  <span>60 天打卡挑战</span>
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
                  <span className="ml-auto text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded font-mono">{taskHistory.length}</span>
                </button>
              </nav>
            </div>

            {/* Admin CMS Section */}
            <div>
              <div className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>CMS 管理运营中心</span>
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
                  <span>套餐订单与充值流水</span>
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
                  <span>案例库与模板配置</span>
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
                  <span>AI 模型调度中枢</span>
                </button>

                <button
                  onClick={() => setActiveTab('admin-settings')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'admin-settings'
                      ? 'bg-slate-800 text-rose-400 border border-slate-700'
                      : 'hover:bg-slate-800/80 hover:text-white text-slate-400'
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  <span>系统设置与全站公告</span>
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
            <span>产品营销落地页入口</span>
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
              {activeTab === 'portal' && '做一套可以直接发的完整小红书素材 (三张图)'}
              {activeTab === 'ip' && '小红书情绪爆款标题制造机'}
              {activeTab === 'cartoon' && '卡通 IP 形象工坊'}
              {activeTab === 'challenge' && '60 天自媒体跃迁挑战打卡'}
              {activeTab === 'history' && '任务排期队列与草稿箱'}
              {activeTab === 'admin-users' && '系统管理 › 用户池与权限控制'}
              {activeTab === 'admin-orders' && '系统管理 › 服务套餐与充值流水'}
              {activeTab === 'admin-templates' && '系统管理 › 灵感案例库与模板配置'}
              {activeTab === 'admin-models' && '系统管理 › AI 模型调度与通道中枢'}
              {activeTab === 'admin-settings' && '系统管理 › 全站运行设置与公告发布'}
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
              onClick={() => triggerToast('系统通知：小红书 11 月最新算法推荐机制已适配！')}
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
                      onClick={() => setActiveTab('portal')}
                      className="bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-rose-900/50 flex items-center gap-2 transition-all hover:scale-105"
                    >
                      <span>做一套三张图完整素材</span>
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
                            if (t.category === '卡通工坊') {
                              setActiveTab('cartoon')
                            } else {
                              setActiveTab('portal')
                              setPortalType(t.title)
                            }
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

          {/* TAB 2: 整套素材生产 (三张图方案 - 原站 userPortal 核心) */}
          {activeTab === 'portal' && (
            <div className="max-w-5xl mx-auto space-y-8">
              {/* Stepper Header */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between max-w-2xl mx-auto">
                  <div className={`flex items-center gap-2 cursor-pointer ${portalStep >= 1 ? 'text-rose-600 font-bold' : 'text-slate-400'}`} onClick={() => setPortalStep(1)}>
                    <span className={`h-7 w-7 rounded-full flex items-center justify-center text-xs ${portalStep >= 1 ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-600'}`}>1</span>
                    <span>选择玩法模式</span>
                  </div>
                  <div className={`h-0.5 w-16 ${portalStep >= 2 ? 'bg-rose-500' : 'bg-slate-200'}`} />
                  <div className={`flex items-center gap-2 cursor-pointer ${portalStep >= 2 ? 'text-rose-600 font-bold' : 'text-slate-400'}`} onClick={() => setPortalStep(2)}>
                    <span className={`h-7 w-7 rounded-full flex items-center justify-center text-xs ${portalStep >= 2 ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
                    <span>填写人设与照片</span>
                  </div>
                  <div className={`h-0.5 w-16 ${portalStep === 3 ? 'bg-rose-500' : 'bg-slate-200'}`} />
                  <div className={`flex items-center gap-2 cursor-pointer ${portalStep === 3 ? 'text-rose-600 font-bold' : 'text-slate-400'}`} onClick={() => setPortalStep(3)}>
                    <span className={`h-7 w-7 rounded-full flex items-center justify-center text-xs ${portalStep === 3 ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-600'}`}>3</span>
                    <span>成果预览与导出</span>
                  </div>
                </div>
              </div>

              {/* Step 1: 选择玩法 */}
              {portalStep === 1 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
                  <h2 className="text-xl font-bold text-slate-900">第 1 步：选择你这次要做的小红书图文模式</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { name: '知识科普图文 (干货卡片)', desc: '封面提炼痛点 + 2张结构化步骤拆解，适合新手起号与技能分享', cost: '6 积分 / 套' },
                      { name: '个人 IP 拟人故事', desc: '手绘头像拟人插画 + 情绪共鸣文案，打造高粘性人设', cost: '8 积分 / 套' },
                      { name: '爆款好物种草评测', desc: '痛点对比 + 使用体验拆解 + 拔草避坑指南', cost: '6 积分 / 套' }
                    ].map((mode, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setPortalType(mode.name)
                          setPortalStep(2)
                        }}
                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                          portalType === mode.name
                            ? 'border-rose-500 bg-rose-50/30 shadow-md'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-sm font-bold text-slate-900">{mode.name}</div>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">{mode.desc}</p>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-rose-600">
                          <span>{mode.cost}</span>
                          <span className="flex items-center gap-1">下一步 <ChevronRight className="h-3 w-3" /></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: 填写人设与资料 */}
              {portalStep === 2 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">第 2 步：完善人设与素材参考</h2>
                      <p className="text-xs text-slate-500 mt-1">系统将基于你填写的人设与参考图，自动生成全套统一画风的 3 张图文</p>
                    </div>
                    <span className="text-xs text-rose-600 bg-rose-50 px-3 py-1 rounded-full font-semibold">当前玩法：{portalType}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          自媒体账号昵称
                        </label>
                        <input
                          type="text"
                          value={accountNickname}
                          onChange={e => setAccountNickname(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-rose-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          账号简介 / 垂直赛道
                        </label>
                        <textarea
                          rows={3}
                          value={accountBio}
                          onChange={e => setAccountBio(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 p-4 text-sm outline-none focus:border-rose-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        上传或选择人物/产品参考图 (支持 PNG, JPG, WebP)
                      </label>
                      <div className="h-44 rounded-2xl border-2 border-dashed border-slate-300 hover:border-rose-400 p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-50 transition">
                        {uploadedPhoto ? (
                          <div className="relative h-full w-full flex items-center justify-center">
                            <img src={uploadedPhoto} alt="Uploaded" className="h-32 w-32 object-cover rounded-xl shadow" />
                            <span className="absolute bottom-1 text-[11px] bg-slate-900/80 text-white px-2 py-0.5 rounded">点击更换参考图</span>
                          </div>
                        ) : (
                          <>
                            <Upload className="h-8 w-8 text-slate-400 mb-2" />
                            <p className="text-xs text-slate-600 font-medium">点击拖入或粘贴图片</p>
                            <p className="text-[10px] text-slate-400 mt-1">最大支持 8MB</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setPortalStep(1)}
                      className="text-xs text-slate-500 hover:text-slate-800"
                    >
                      ← 返回上一步修改玩法
                    </button>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => triggerToast('已存入草稿箱！')}
                        className="border border-slate-300 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-50"
                      >
                        存入草稿箱
                      </button>
                      <button
                        onClick={handleGeneratePortalMaterials}
                        disabled={isPortalGenerating}
                        className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-rose-900/30 flex items-center gap-2"
                      >
                        {isPortalGenerating ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span>正在生成 3 张图完整素材...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4" />
                            <span>开始生成全套素材 (扣 6 点)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: 成果预览与三张图确认 */}
              {portalStep === 3 && portalGeneratedCards && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">恭喜！全套小红书 3 张图素材已合成完毕</h2>
                      <p className="text-xs text-slate-500 mt-1">方案包含封面吸睛图、步骤拆解图及互动金句图，排版符合小红书官方推荐视觉规范</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => triggerToast('所有图片与文案大纲已打包下载！')}
                        className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        <span>一键打包下载全部卡片</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {portalGeneratedCards.map((card, idx) => (
                      <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
                        <div className="relative h-64 overflow-hidden bg-slate-100">
                          <img src={card.visual} alt={card.title} className="w-full h-full object-cover" />
                          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">
                            {card.role}
                          </div>
                          <div className="absolute top-3 right-3 bg-rose-500 text-white text-xs font-mono font-bold px-2 py-0.5 rounded-full">
                            P{idx + 1}
                          </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div>
                            <h3 className="font-bold text-slate-900 text-sm">{card.title}</h3>
                            <p className="text-xs text-slate-500 mt-2 leading-relaxed">{card.subtitle}</p>
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex gap-1">
                              {card.tags.map((t: string) => (
                                <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                                  {t}
                                </span>
                              ))}
                            </div>
                            <button
                              onClick={() => {
                                navigator.clipboard?.writeText(`${card.title}\n${card.subtitle}`)
                                triggerToast(`已复制 P${idx + 1} 文案到剪贴板！`)
                              }}
                              className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
                            >
                              <Copy className="h-3.5 w-3.5" />
                              <span>复制文案</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-4">
                    <button
                      onClick={() => setPortalStep(2)}
                      className="text-xs text-slate-500 hover:text-slate-800 underline"
                    >
                      重新调整参数并再次生成
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: 爆款标题制造机 */}
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
                      onClick={handleGenerateTitles}
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

          {/* TAB 4: 卡通工坊 (Cartoon Studio) */}
          {activeTab === 'cartoon' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">自媒体拟人卡通 IP 画风工坊</h2>
                  <p className="text-xs text-slate-500 mt-1">专属定制高辨识度自媒体头像、封面拟人插画与动态表情（每次扣除 5 积分）</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">选择画风预设</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {['日系温暖水彩', '3D 盲盒 Q版', '扁平马卡龙插画', '国潮复古手绘'].map(style => (
                        <div
                          key={style}
                          onClick={() => setCartoonStyle(style)}
                          className={`p-3 rounded-xl border text-center cursor-pointer text-xs font-semibold transition ${
                            cartoonStyle === style
                              ? 'border-rose-500 bg-rose-50 text-rose-600 ring-2 ring-rose-500/20'
                              : 'border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {style}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">角色特征与场景描述</label>
                    <input
                      type="text"
                      value={cartoonPrompt}
                      onChange={e => setCartoonPrompt(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-rose-500"
                    />
                  </div>

                  <div className="text-right pt-2">
                    <button
                      onClick={handleGenerateCartoon}
                      disabled={isCartoonGenerating}
                      className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-rose-900/30 flex items-center gap-2 ml-auto"
                    >
                      {isCartoonGenerating ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>正在绘制卡通画像...</span>
                        </>
                      ) : (
                        <>
                          <Palette className="h-4 w-4" />
                          <span>生成卡通形象 (扣 5 点)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-4">我的作品集库</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {cartoonGallery.map(item => (
                    <div key={item.id} className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50 group">
                      <div className="h-48 overflow-hidden">
                        <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-slate-900">{item.title}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{item.style}</div>
                        </div>
                        <button
                          onClick={() => triggerToast('已下载原图！')}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: 60天挑战 (Challenge) */}
          {activeTab === 'challenge' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-3 py-1 rounded-full font-bold mb-2">
                    <Trophy className="h-3.5 w-3.5" />
                    <span>自媒体万粉蜕变计划</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">60 天自媒体跃迁挑战打卡</h2>
                  <p className="text-xs text-slate-500 mt-1">每天坚持打卡发布 1 篇图文，完成每日任务即可领取 +5 积分奖励！</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-rose-500">{checkedDays.length} <span className="text-sm text-slate-400">/ 60 天</span></div>
                  <p className="text-[11px] text-slate-500 mt-1">打卡率 {Math.round((checkedDays.length / 60) * 100)}%</p>
                </div>
              </div>

              {/* Day Grid */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-4">打卡进度总览</h3>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
                  {Array.from({ length: 60 }, (_, i) => i + 1).map(day => {
                    const isChecked = checkedDays.includes(day)
                    return (
                      <div
                        key={day}
                        onClick={() => toggleCheckDay(day)}
                        className={`h-14 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition ${
                          isChecked
                            ? 'bg-rose-500 border-rose-500 text-white shadow-sm'
                            : 'border-slate-200 hover:border-rose-400 bg-slate-50 text-slate-600'
                        }`}
                      >
                        <span className="text-[10px] font-mono opacity-80">Day</span>
                        <span className="text-sm font-bold">{day}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: 任务与草稿箱 (Tasks & Drafts) */}
          {activeTab === 'history' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">任务排期队列与草稿箱</h2>
                  <p className="text-xs text-slate-500">查看所有已完成生成任务、排队中任务及本地草稿（保留 7 天）</p>
                </div>
                <div className="flex items-center gap-2">
                  {(['all', 'completed', 'drafts'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setTasksFilter(f)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${
                        tasksFilter === f ? 'bg-slate-900 text-white' : 'bg-white border text-slate-600'
                      }`}
                    >
                      {f === 'all' && '全部任务'}
                      {f === 'completed' && '已完成'}
                      {f === 'drafts' && '草稿箱'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3">任务编号 / 标题</th>
                      <th className="px-6 py-3">任务类型</th>
                      <th className="px-6 py-3">消耗积分</th>
                      <th className="px-6 py-3">状态</th>
                      <th className="px-6 py-3">生成时间</th>
                      <th className="px-6 py-3 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {taskHistory.map((t, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition">
                        <td className="px-6 py-4 font-medium text-slate-900">
                          <div>{t.title}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{t.id}</div>
                        </td>
                        <td className="px-6 py-4 text-xs">
                          <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded font-medium">
                            {t.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs font-bold text-rose-600">{t.cost} 点</td>
                        <td className="px-6 py-4">
                          <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-[11px] px-2 py-0.5 rounded-full font-medium">
                            {t.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-400">{t.time}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => triggerToast(`正在打开 ${t.id} 详细成果...`)}
                            className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
                          >
                            查看成果
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: 管理后台 - 用户与权限管理 */}
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
                    {usersList.map((row, idx) => (
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

          {/* TAB 8: 管理后台 - 套餐订单与充值流水 */}
          {activeTab === 'admin-orders' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">服务套餐订单与充值流水</h2>
                  <p className="text-xs text-slate-500">财务实时对账、套餐销售明细及第三方扫码支付状态</p>
                </div>
                <div className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-200">
                  累计充值流水：<strong>¥357.90</strong>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3">订单号</th>
                      <th className="px-6 py-3">付款用户</th>
                      <th className="px-6 py-3">购买套餐</th>
                      <th className="px-6 py-3">支付金额</th>
                      <th className="px-6 py-3">充值点数</th>
                      <th className="px-6 py-3">支付方式</th>
                      <th className="px-6 py-3">交易状态</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {ordersList.map((ord, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition">
                        <td className="px-6 py-4 font-mono text-xs text-slate-500">{ord.id}</td>
                        <td className="px-6 py-4 font-semibold text-slate-800">{ord.user}</td>
                        <td className="px-6 py-4 text-xs">{ord.package}</td>
                        <td className="px-6 py-4 font-bold text-slate-900">¥{ord.amount.toFixed(2)}</td>
                        <td className="px-6 py-4 text-xs font-bold text-rose-600">+{ord.credits}</td>
                        <td className="px-6 py-4 text-xs text-slate-500">{ord.payType}</td>
                        <td className="px-6 py-4">
                          <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs px-2 py-0.5 rounded-full font-medium">
                            {ord.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 9: 管理后台 - 案例库与模板配置 */}
          {activeTab === 'admin-templates' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">灵感案例库与模板内容管理</h2>
                  <p className="text-xs text-slate-500">审核小红书爆款案例、上架新模板、调整消耗积分与 Prompt</p>
                </div>
                <button
                  onClick={() => triggerToast('新增模板弹窗已唤起')}
                  className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>新增创作模板</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {INITIAL_TEMPLATES.map(t => (
                  <div key={t.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-start gap-4">
                    <img src={t.cover} alt={t.title} className="h-24 w-24 object-cover rounded-xl flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">{t.category}</span>
                        <span className="text-xs font-bold text-rose-600">{t.cost} 积分/次</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mt-1">{t.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{t.description}</p>
                      <div className="mt-3 flex items-center gap-2 text-xs">
                        <button onClick={() => triggerToast(`正在编辑 ${t.title}`)} className="text-blue-600 hover:underline">编辑</button>
                        <span className="text-slate-300">|</span>
                        <button onClick={() => triggerToast(`已暂停 ${t.title}`)} className="text-amber-600 hover:underline">暂停下架</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: 管理后台 - AI 模型通道 */}
          {activeTab === 'admin-models' && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">AI 模型调度与通道中枢</h2>
                  <p className="text-xs text-slate-500">配置文本模型、生图引擎、并发限制与故障自动切站</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {channels.map((m, i) => (
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

          {/* TAB 11: 管理后台 - 全站设置与公告 */}
          {activeTab === 'admin-settings' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">全站系统运行配置</h2>
                  <p className="text-xs text-slate-500 mt-1">各项配置独立保存并实时生效</p>
                </div>

                <div className="space-y-4 divide-y divide-slate-100">
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">开放新用户手机号注册</div>
                      <div className="text-xs text-slate-500">关闭后仅允许已有账号登录</div>
                    </div>
                    <input type="checkbox" defaultChecked className="h-5 w-5 accent-rose-500 cursor-pointer" />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">小红书违禁词强阻断拦截</div>
                      <div className="text-xs text-slate-500">生成内容包含敏感词时强制自动同义替换</div>
                    </div>
                    <input type="checkbox" defaultChecked className="h-5 w-5 accent-rose-500 cursor-pointer" />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">新用户注册赠送初始积分</div>
                      <div className="text-xs text-slate-500">当前设置：50 积分</div>
                    </div>
                    <input type="number" defaultValue={50} className="w-24 rounded-lg border px-3 py-1 text-sm text-right" />
                  </div>
                </div>
              </div>

              {/* Announcements Panel */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900">全站系统公告</h3>
                  <button onClick={() => triggerToast('已发布新公告')} className="text-xs text-rose-600 font-semibold">+ 发布公告</button>
                </div>
                {announcements.map(a => (
                  <div key={a.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{a.title}</div>
                      <p className="text-xs text-slate-600 mt-1">{a.content}</p>
                    </div>
                    <span className="text-[10px] text-slate-400">{a.date}</span>
                  </div>
                ))}
              </div>
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
