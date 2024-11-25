<div align="center" width="100%">
    <img src="./Saasfly-logo.svg" width="128" alt="" />
</div>

# Saasfly </br>

[![Trạng thái quy trình làm việc GitHub Actions][check-workflow-badge]][check-workflow-badge-link] [![Giấy phép GitHub][github-license-badge]][github-license-badge-link]  [![Discord][discord-badge]][discord-badge-link] [![Saasfly][made-by-nextify-badge]][made-by-nextify-badge-link]
[![English](https://img.shields.io/badge/-English-grey.svg)](README.md)

Một nền tảng phân tích nhóm kỹ thuật dễ sử dụng, cấp doanh nghiệp.

Bạn không cần phải kết hợp nhiều công cụ phức tạp nữa; Saasfly cung cấp một giải pháp hoàn chỉnh để phân tích và tối ưu hóa hiệu suất nhóm kỹ thuật của bạn một cách nhanh chóng và dễ dàng.

> **[Nextify](https://nextify.ltd)** cung cấp giải pháp phân tích doanh nghiệp toàn diện. Nếu bạn quan tâm đến việc thảo luận về dự án của mình hoặc chỉ muốn trò chuyện với chúng tôi, vui lòng liên hệ với chúng tôi tại [contact@nextify.ltd] (mailto:contact@nextify.ltd).

> ❤️ Chúng tôi cung cấp **hỗ trợ kỹ thuật và triển khai miễn phí cho các tổ chức phi lợi nhuận**.
>
> 🙌 Tất cả lợi nhuận thu được từ các dự án nguồn mở của chúng tôi sẽ được sử dụng hoàn toàn để hỗ trợ các chương trình và hoạt động từ thiện nguồn mở.

## ⚡ Demo trực tuyến

Tự mình thử nó!

Máy chủ demo 1 (Địa điểm: Washington, Hoa Kỳ): <https://show.Saasfly.io>

Máy chủ demo 2 (Địa điểm: Tokyo, Nhật Bản): <https://demo.Saasfly.io>

Để xem thêm tài liệu, hãy truy cập <https://document.Saasfly.io>

## 🌟 Lịch sử Star

[![Biểu đồ lịch sử Star](https://api.star-history.com/svg?repos=Saasfly/Saasfly&type=Timeline)](https://star-history.com/#Saasfly/Saasfly&Timeline)

## 🚀 Bắt đầu

### 🖱 Mẫu một lần nhấp

[![Triển khai với Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSaasfly%2FSaasfly&env=NEXT_PUBLIC_APP_URL,NEXTAUTH_URL,NEXTAUTH_SECRET,STRIPE_API_KEY,STRIPE_WEBHOOK_SECRET,POSTGRES_URL,GITHUB_CLIENT_ID,GITHUB_CLIENT_SECRET,RESEND_API_KEY,RESEND_FROM&install-command=bun%20install&build-command=bun%20run%20build&root-directory=apps%2Fnextjs)

### 📋 Điều kiện tiên quyết

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt các thành phần sau:

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
    1. Bạn có thể sử dụng Vercel Postgres hoặc máy chủ PostgreSQL cục bộ (thêm biến môi trường POSTGRES_URL trong .env.local)
       ```bash
          POSTGRES_URL = ''
       ```

### Cài đặt

Để bắt đầu với boilerplate này, chúng tôi cung cấp hai tùy chọn:

1. Sử dụng lệnh `bun create` (🌟Khuyến nghị cao🌟):