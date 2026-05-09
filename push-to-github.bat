@echo off
chcp 65001
echo ========================================
echo   正在推送到 GitHub...
echo ========================================

cd /d "%~dp0"

git init
git remote add origin https://akai1995.github.io/medical-admin-system2/.git
git add .
git commit -m "更新项目功能"
git branch -M main
git push -u origin main

echo ========================================
echo   推送完成！
echo ========================================
pause
