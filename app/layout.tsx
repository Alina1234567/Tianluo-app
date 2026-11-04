// @ts-nocheck
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '田萝同学｜创作空间',
  description: '让自媒体变得无限简单 - 专为小红书创作者打造的一站式 AI 创作工作台。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="lingling-user-theme lingling-user-entry user-shell-mounted activity-center-mounted" style={{ ['--portal-viewport-height' as any]: '1054px' }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/tokens.css" media="all" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/components.css" media="all" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/styles.css" media="all" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/creator-brand.css" media="all" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/portal.css" media="all" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/result.css" media="all" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/login.css" media="all" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/lingling-user-theme.css" media="all" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/marketplace.css" media="all" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/user-shell.css" media="all" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/play-customizations.css" media="all" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/personal-ip-reference.css" media="all" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/expired-account.css" media="all" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/user-guide.css" media="all" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/user-theme-zhuqing.css" media="all" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/announcement-reader.css" media="all" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/ui-refinement.css" media="all" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/portal-workspace.css" media="all" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/service-redemption.css" media="all" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/activity-center.css" media="all" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/access-intro-dialog.css" media="all" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/earnings-cases.css" media="all" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/image-community.css" media="all" />
        <link rel="stylesheet" href="https://xhs.typoai.xin/static/article-reader.css" media="all" />
        <style dangerouslySetInnerHTML={{ __html: `
          body.auth-booting .role-gate,
          body.auth-booting .app-shell {
            visibility: hidden;
          }
        ` }} />
      </head>
      <body className="user-shell-page mode-user auth-required auth-logged-in auth-user portal-history-active">
        {children}
      </body>
    </html>
  )
}
