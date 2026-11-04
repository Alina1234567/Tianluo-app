import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '灵凌同学｜让自媒体变得无限简单',
  description: '专为小红书自媒体创作者量身打造的 AI 创作与矩阵工作台。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* 原站 100% 原版设计系统与 CSS 样式集 */}
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/tokens.css?v=20260927-components-01" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/components.css?v=20260927-components-03" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/styles.css?v=20261019-story-ip-retire-01" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/creator-brand.css?v=20260926-design-tokens-01" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/portal.css?v=20261031-activity-16" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/result.css?v=20261012-mobile-bulk-01" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/login.css?v=20261027-entry-01" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/lingling-user-theme.css?v=20261031-activity-10" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/marketplace.css?v=20261021-store-card-ux-01" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/user-shell.css?v=20261031-activity-08" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/play-customizations.css?v=20261011-steps-02" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/personal-ip-reference.css?v=20261030-ip-reference-01" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/expired-account.css?v=20260815-expired-account-copy-01" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/user-guide.css?v=20261027-entry-01" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/user-theme-zhuqing.css?v=20261031-activity-10" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/announcement-reader.css?v=20261031-activity-16" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/ui-refinement.css?v=20261015-recharge-redesign-01" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/portal-workspace.css?v=20261031-ip-plan-layout-01" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
