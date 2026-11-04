import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '灵凌同学｜小红书自媒体创作工作台 - 让自媒体变得无限简单',
  description: '专为小红书创作者量身定制的一站式 AI 工作台，包含爆款标题生成、知识科普卡片排版、卡通工坊、案例库与团队管理系统。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-rose-500 selection:text-white">
        {children}
      </body>
    </html>
  )
}
