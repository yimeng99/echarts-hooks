@echo off
cd /d %~dp0
echo 正在构建 ECharts Hooks 文档...
echo 请确保已在项目根目录运行过 "pnpm install"
echo.
pnpm build
echo.
echo 构建完成! 静态文件位于 .vitepress/dist 目录中
pause