---
layout: project-post
title: rz-list
tags: programming, blazor, web application, full stack, reading list, database, dotnet
keywords: C#, ASP.NET Core, Blazor, Entity Framework Core, SQLite, MS SQL Server, reading tracker, MudBlazor
date: 2025-08-11
description: ASP.NET Core Blazor web application for tracking your reading list of novels.
---

# rz-list

**rz-list** is an ASP.NET Core Blazor web application for tracking your reading list of novels. Easily add, update, and manage the books you want to read, are currently reading, or have finished.

<video src="https://github.com/user-attachments/assets/3ef7de3a-34d0-4bae-9850-bcffe4ae2c2b" controls></video>

## Features

- User authentication and admin controls
- Track your reading progress with novel entries
- Categorize novels as "Want to Read", "Currently Reading", "Finished", or "Did Not Finish"
- Update progress or give a rating to novel entries
- Clean, responsive UI powered by **MudBlazor**
- Supports **.NET 9 SDK**, **ASP.NET Core**, **Entity Framework Core**, **SQLite** or **MS SQL Server** for data storage

## Requirements

- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- ASP.NET Runtime SDK
- Modern web browser

```bash
# prerequisites installation for Arch Linux
sudo pacman -S --needed dotnet dotnet-sdk aspnet-runtime
```

## Getting Started

Clone the repository

```bash
git clone https://github.com/yourusername/rz-list.git
cd rz-list
```

Run the app

```bash
dotnet watch
```

Open your browser and navigate to `http://localhost:5040/` (or the URL shown in the console)

## Technologies Used

| Stack Layer          | Technologies                        |
| -------------------- | ----------------------------------- |
| Frontend             | Blazor (Server), MudBlazor          |
| Backend              | ASP.NET Core, Entity Framework Core |
| Database             | SQLite or MS SQL Server             |
| Language & Framework | C#, .NET 9                          |
