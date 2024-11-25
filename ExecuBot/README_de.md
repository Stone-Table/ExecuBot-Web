<div align="center" width="100%">
    <img src="./Saasfly-logo.svg" width="128" alt="" />
</div>

# Saasfly </br>

[![GitHub Actions Workflow Status][check-workflow-badge]][check-workflow-badge-link] [![GitHub License][github-license-badge]][github-license-badge-link]  [![Discord][discord-badge]][discord-badge-link] [![Saasfly][made-by-nextify-badge]][made-by-nextify-badge-link]
[![English](https://img.shields.io/badge/-English-grey.svg)](README.md)

Eine einfach zu verwendende und unternehmenstaugliche Plattform zur Analyse von Engineering-Teams.

Sie müssen keine komplexen Tools mehr kombinieren; Saasfly bietet eine vollständige Lösung zur schnellen und einfachen Analyse und Optimierung der Leistung Ihres Engineering-Teams.

> **[Nextify](https://nextify.ltd)** bietet eine komplette Enterprise-Analyse-Lösung an. Kontaktieren Sie uns unter [contact@nextify.ltd](mailto:contact@nextify.ltd), wenn Sie Interesse an einer Besprechung Ihres Projekts haben oder wenn Sie einfach ein Gespräch mit uns führen möchten. Zögern Sie bitte nicht, uns zu kontaktieren.

> ❤️ Wir bieten **kostenlose technische Unterstützung und Bereitstellungsdienste für gemeinnützige Organisationen** an.
>
> 🙌 Alle Gewinne aus unseren Open-Source-Projekten werden **ausschließlich zur Unterstützung von Open-Source-Initiativen und wohltätigen Zwecken verwendet**.

## ⚡ Live-Demo

Probieren Sie es selbst aus!

Demo-Server 1 (Standort: Washington, USA): <https://show.Saasfly.io>

Demo-Server 2 (Standort: Tokio, Japan): <https://demo.Saasfly.io>

Weitere Dokumentation finden Sie unter <https://document.Saasfly.io>.

## 🌟 Stern-Verlauf

[![Star History Chart](https://api.star-history.com/svg?repos=Saasfly/Saasfly&type=Timeline)](https://star-history.com/#Saasfly/Saasfly&Timeline)

## 🚀 Erste Schritte

### 🖱 One-Click-Vorlage

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSaasfly%2FSaasfly&env=NEXT_PUBLIC_APP_URL,NEXTAUTH_URL,NEXTAUTH_SECRET,STRIPE_API_KEY,STRIPE_WEBHOOK_SECRET,POSTGRES_URL,GITHUB_CLIENT_ID,GITHUB_CLIENT_SECRET,RESEND_API_KEY,RESEND_FROM&install-command=bun%20install&build-command=bun%20run%20build&root-directory=apps%2Fnextjs)

### 📋 Voraussetzungen

Stellen Sie vor dem Start sicher, dass Sie Folgendes installiert haben:

1. [Bun](https://bun.sh/), [Node.js](https://nodejs.org/) und [Git](https://git-scm.com/)

   1. Linux

    ```bash
      curl -sL https://gist.github.com/tianzx/874662fb204d32390bc2f2e9e4d2df0a/raw -o ~/downloaded_script.sh && chmod +x ~/downloaded_script.sh && source ~/downloaded_script.sh
    ```

   2. macOS

    ```bash
      /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
      brew install git
      brew install oven-sh/bun/bun
      brew install nvm
    ```

2. [PostgreSQL](https://www.postgresql.org/)
   1. Sie können entweder Vercel Postgres oder einen lokalen PostgreSQL-Server verwenden (fügen Sie die POSTGRES_URL-Umgebungsvariable in .env.local hinzu)
      ```bash
         POSTGRES_URL = ''
      ```

### Installation

Für den Einstieg mit dieser Vorlage bieten wir zwei Möglichkeiten an:

1. Verwenden Sie den Befehl `bun create` (🌟dringend empfohlen🌟):