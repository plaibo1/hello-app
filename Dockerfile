### 1. Install dependencies only when needed
FROM node:16.19.0-alpine AS deps

WORKDIR /app

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

### 2. Rebuild the source code only when needed
FROM node:16.19.0-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

# .env will be copied on this layer
COPY . .

RUN yarn build

### 3. Production image, copy all the files and run next
FROM 16.19.0-alpine AS runner

WORKDIR /app

COPY --from=builder /app .

RUN yarn run build

# ENV NODE_ENV=development
# ENV NODE_ENV=production
ENV PORT 3000
EXPOSE 3000

CMD [ "yarn", "run", "start" ]
