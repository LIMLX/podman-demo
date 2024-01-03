# 基于 Node.js 镜像构建
FROM node:18.16.0

# 设置工作目录
WORKDIR /usr/app/gateway

# 复制 package.json 和 package-lock.json 到工作目录
# COPY package*.json ./

# 将项目文件复制到工作目录
COPY . .

# 安装依赖pnpm
RUN npm install -g pnpm && \
        pnpm install && \
        pnpm build gateway

# 运行安装依赖
RUN pnpm install

# 启动 NestJS 应用
CMD ["node", "./dist/apps/gateway/main.js"]

# 暴露应用的端口
EXPOSE 3000
