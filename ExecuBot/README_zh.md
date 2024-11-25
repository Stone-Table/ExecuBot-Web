<div align="center" width="100%">
    <img src="./execubot.svg" width="128" alt="Execubot Logo" />
</div>

# Execubot </br>

[![GitHub Actions工作流状态][check-workflow-badge]][check-workflow-badge-link] [![GitHub许可证][github-license-badge]][github-license-badge-link]  [![Discord][discord-badge]][discord-badge-link] [![Execubot][made-by-nextify-badge]][made-by-nextify-badge-link]
[![English](https://img.shields.io/badge/-English-grey.svg)](README.md)

一个由AI驱动的执行决策工具，可以分析开发人员生产力和团队绩效。

您不再需要猜测团队表现如何；Execubot通过聚合来自Jira、GitHub、GitLab、AWS、Azure和GCP的数据，为高管提供全面的洞察，帮助他们做出明智的决策。

> **[Execubot](https://execubot.com)** 为您的工程团队绩效提供完整的可见性。如果您有兴趣讨论我们如何帮助优化您团队的生产力，请通过[contact@execubot.com](mailto:contact@execubot.com)与我们联系。

## ⚡ 在线演示

体验Execubot的强大功能！

演示服务器: <https://demo.execubot.com>

查看更多文档请访问 <https://docs.execubot.com>

## 🌟 Star历史

[![Star History Chart](https://api.star-history.com/svg?repos=execubot/execubot&type=Timeline)](https://star-history.com/#execubot/execubot&Timeline)

## 🚀 入门指南

### 🖱 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fexecubot%2Fexecubot&env=NEXT_PUBLIC_APP_URL,NEXTAUTH_URL,NEXTAUTH_SECRET,STRIPE_API_KEY,STRIPE_WEBHOOK_SECRET,POSTGRES_URL,GITHUB_CLIENT_ID,GITHUB_CLIENT_SECRET,RESEND_API_KEY,RESEND_FROM&install-command=bun%20install&build-command=bun%20run%20build&root-directory=apps%2Fnextjs)

### 📋 前提条件

开始之前,请确保您已安装以下内容:

1. [Bun](https://bun.sh/) & [Node.js](https://nodejs.org/) & [Git](https://git-scm.com/)

    1. Linux

    ```bash
      curl -sL https://gist.github.com/tianzx/874662fb204d32390bc2f2e9e4d2df0a/raw -o ~/downloaded_script.sh && chmod +x ~/downloaded_script.sh && source ~/downloaded_script.sh 
    ```

    2. MacOS

    ```bash
      /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"  
      brew install git
      brew install oven-sh/bun/bun
      brew install nvm
    ```

2. [PostgreSQL](https://www.postgresql.org/)
    1. 您可以使用Vercel Postgres或本地PostgreSQL服务器(在.env.local中添加POSTGRES_URL环境变量)
       ```bash
          POSTGRES_URL = ''
       ```

### 安装

要开始使用此平台,我们提供两个选项:

1. 使用`bun create`命令(🌟强烈推荐🌟):