This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

This repo is ready for Vercel out-of-the-box. We also include a `vercel.json` with sensible defaults.

Quick start:

1. Push this repository to GitHub/GitLab/Bitbucket. ✓
2. Go to https://vercel.com/new and import the repository. ✓
3. Framework preset: Next.js (auto-detected). No extra build commands needed.
   - Build Command: `npm run build` (auto)
   - Install Command: `npm install` (auto)
   - Output Directory: `.next` (auto)
4. Environment Variables (if needed): none required for this project by default. Add your own under Project Settings → Environment Variables. 
5. Click Deploy. Vercel will create a Preview URL for each branch and each pull request. ✓
6. To promote to Production, click Promote on a successful preview or set “Production Branch” to `main` and push to deploy. ✓

Local production test:

```bash
npm ci
npm run build
npm start
```

Project structure notes for Vercel:
- All static assets are under `public/` and are cached aggressively by the CDN.
- Routes are App Router-based under `app/`.
- The header is fixed-height and the layout accounts for it; no server-specific configuration required.

Advanced (optional):
- You can attach a custom domain in Vercel → Project → Domains.
- Rollbacks: open the Deployments tab, select a previous deployment, and click Promote to Production.
- Logs: use the Vercel dashboard (Functions/Build logs). No Edge Functions are defined in this repo.
- To restrict permissions/caching further, edit `vercel.json` headers.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

This repo is ready for Vercel out-of-the-box. We also include a `vercel.json` with sensible defaults.

Quick start:

1. Push this repository to GitHub/GitLab/Bitbucket. ✓
2. Go to https://vercel.com/new and import the repository. ✓
3. Framework preset: Next.js (auto-detected). No extra build commands needed.
   - Build Command: `npm run build` (auto)
   - Install Command: `npm install` (auto)
   - Output Directory: `.next` (auto)
4. Environment Variables (if needed): none required for this project by default. Add your own under Project Settings → Environment Variables. 
5. Click Deploy. Vercel will create a Preview URL for each branch and each pull request. ✓
6. To promote to Production, click Promote on a successful preview or set “Production Branch” to `main` and push to deploy. ✓

Local production test:

```bash
npm ci
npm run build
npm start
```

Project structure notes for Vercel:
- All static assets are under `public/` and are cached aggressively by the CDN.
- Routes are App Router-based under `app/`.
- The header is fixed-height and the layout accounts for it; no server-specific configuration required.

Advanced (optional):
- You can attach a custom domain in Vercel → Project → Domains.
- Rollbacks: open the Deployments tab, select a previous deployment, and click Promote to Production.
- Logs: use the Vercel dashboard (Functions/Build logs). No Edge Functions are defined in this repo.
- To restrict permissions/caching further, edit `vercel.json` headers.

---

## 한국어: Vercel 배포 가이드

이 저장소는 Vercel 배포를 바로 사용할 수 있도록 구성되어 있습니다. `vercel.json`도 포함되어 있어 기본 헤더/캐시 설정이 적용됩니다.

배포 절차:
1) 이 저장소를 GitHub 등에 푸시합니다.
2) https://vercel.com/new 에서 Import Project → 해당 리포지토리 선택.
3) Framework는 자동으로 Next.js로 인식됩니다.
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `.next`
4) (필요 시) Project Settings → Environment Variables에 환경변수 추가.
5) Deploy를 클릭하면 Preview URL이 생성됩니다.
6) Production으로 배포하려면 Preview에서 Promote 하거나, Production Branch(기본 main)에 푸시하세요.

로컬에서 프로덕션 빌드 테스트:
```bash
npm ci
npm run build
npm start
```

도메인 연결/롤백/로그는 Vercel 대시보드에서 관리 가능합니다.
