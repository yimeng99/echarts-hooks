@echo off
cd /d %~dp0
echo 正在启动 ECharts Hooks 文档开发服务器...
echo 请确保已在项目根目录运行过 "pnpm install"
echo.
echo 访问地址: http://localhost:5173/echarts-hooks/
echo 按 Ctrl+C 停止服务器
echo.
pnpm dev
pause