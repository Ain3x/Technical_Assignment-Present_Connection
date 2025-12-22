# 🪑 Shared Desk Booking System

A full-stack desk reservation application built with ASP.NET Core and React + TypeScript.

[![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?logo=dotnet)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.0-007FFF?logo=mui)](https://mui.com/)

---

## ✨ Features

- 📊 **View Desks** - Browse all desks with real-time availability
- 🎨 **Color-Coded Status** - Open (green), Reserved (red), Maintenance (orange)
- 📅 **Make Reservations** - Book desks with custom date ranges
- ❌ **Cancel Options** - Cancel today only OR entire reservation
- 👤 **User Profile** - View current and past reservations
- 🔍 **Date Filtering** - Filter desks by availability dates

---
### ⚙️ Environment Notes

This project was developed using:

- **.NET 9.0 SDK** (`dotnet --version 9.0.305`)
- **Node.js 22.11.0**
- **NPM 11.1.0**

> If you do not have .NET 9 installed, you can run this project with **.NET 8** by updating the backend `.csproj` file:

```xml
<TargetFramework>net8.0</TargetFramework>
```
You will also need to downgrade EF Core packages to versions compatible with .NET 8:
```xml
<PackageReference Include="Microsoft.EntityFrameworkCore.InMemory" Version="8.*" />
```
Other packages (AutoMapper, Swashbuckle) are mostly compatible with .NET 8, but verify versions if you encounter build errors.
## 🚀 Quick Start

### Prerequisites


### Backend Setup
```bash
cd BackendApi
dotnet restore
dotnet run
# API runs at https://localhost:5232
# Swagger at https://localhost:5232/swagger
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# App runs at http://localhost:5173
```

---

## 🛠 Tech Stack

### Backend
- **ASP.NET Core** - Web API framework
- **Entity Framework Core** - In-memory database
- **AutoMapper** - DTO mapping
- **Swagger** - API documentation

### Frontend
- **React** - UI framework
- **TypeScript** - Type safety
- **Material-UI** - Component library
- **Axios** - HTTP client
- **Vite** - Build tool

---

## 🏗 Architecture

### Backend - Clean Architecture
```
BackendApi/
├── Controllers/              # API endpoints
├── DeskBooking.Application/  # Business logic & DTOs
├── DeskBooking.Core/         # Domain entities & interfaces
└── DeskBooking.Infrastructure/ # Data access & repositories
```

**Design Patterns:**
- Repository Pattern - Data access abstraction
- Service Layer - Business logic separation
- Dependency Injection - Loose coupling
- DTO Pattern - API/domain separation

### Frontend - Component-Based
```
frontend/src/
├── components/  # Reusable UI components
├── pages/       # Page-level components
├── api/         # API client
├── types/       # TypeScript definitions
└── theme/       # Centralized styling
```

---

## 📡 API Endpoints

### Desks
- `GET /api/desks` - Get all desks with status

### Reservations
- `POST /api/reservations` - Create reservation
- `DELETE /api/reservations/{id}/today` - Cancel for today
- `DELETE /api/reservations/{id}` - Cancel entire reservation

### Users
- `GET /api/users/{id}/profile` - Get profile with reservations

Full API docs available at `/swagger` when running backend.

---

## 💡 Key Design Decisions

### Why Clean Architecture?
- ✅ Testable business logic
- ✅ Swappable infrastructure
- ✅ Clear separation of concerns


### Why Material-UI?
- ✅ Easy-to-use
- ✅ Extensive Documentation via MUI site
- ✅ Accessible by default

### Cancel Logic Decision
**Physical deletion** instead of soft delete (`IsCancelled` flag)
- ✅ Simpler data model
- ✅ Cleaner queries

---

## 📂 Project Structure
```
Technical_Assignment-Present_Connection/
├── BackendApi/                  # ASP.NET Core API
│   ├── Controllers/
│   ├── DeskBooking.Application/
│   ├── DeskBooking.Core/
│   ├── DeskBooking.Infrastructure/
│   └── Program.cs
│
└── frontend/                    # React + TypeScript
    ├── src/
    │   ├── components/
    │   ├── pages/
    |   ├── api/
    └── package.json
```

---

## 🧪 Testing

Testing via UnitTests was not done but functionality was tested by hand. 
Since the main functionality is reserve, cancel today and cancel the whole range, it was mainly bug catching.

---



**Built for Present Connection Technical Assignment** 🙂
