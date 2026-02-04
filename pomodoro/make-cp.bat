@echo off
setlocal enabledelayedexpansion

REM ===== 設定 =====
set WORK=archive-pomodoro_work.html
set OUTDIR=archive
set TOPIC=logs-pass

if not "%~1"=="" set TOPIC=%~1

REM ===== 作業ファイル確認 =====
if not exist "%WORK%" (
  echo Work file not found: %WORK%
  exit /b 1
)

REM ===== 出力先フォルダ作成 =====
if not exist "%OUTDIR%" (
  mkdir "%OUTDIR%"
)

REM ===== タイムスタンプ生成 =====
for /f "tokens=1-3 delims=/ " %%a in ("%date%") do (
  set yyyy=%%a
  set mm=%%b
  set dd=%%c
)
for /f "tokens=1-2 delims=: " %%a in ("%time%") do (
  set hh=%%a
  set mi=%%b
)

REM 1桁時のスペース対策
set hh=!hh: =0!
set ts=!yyyy!!mm!!dd!-!hh!!mi!

REM ===== コピー =====
set CP=%OUTDIR%\archive-pomodoro.cp-!ts!-!TOPIC!.html
copy "%WORK%" "!CP!" >nul

echo Checkpoint created: !CP!
endlocal
