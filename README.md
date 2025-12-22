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

## 🚀 Quick Start

### Prerequisites
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)

### Backend Setup
```bash
cd BackendApi
dotnet restore
dotnet run
# API runs at https://localhost:5001
# Swagger at https://localhost:5001/swagger
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
- **ASP.NET Core 8.0** - Web API framework
- **Entity Framework Core** - In-memory database
- **AutoMapper** - DTO mapping
- **Swagger** - API documentation

### Frontend
- **React 18** - UI framework
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
├── services/    # API client
├── types/       # TypeScript definitions
└── theme/       # Centralized styling
```

---

## 📡 API Endpoints

### Desks
- `GET /api/desks` - Get all desks with status
- `GET /api/desks/{id}` - Get specific desk

### Reservations
- `POST /api/reservations` - Create reservation
- `DELETE /api/reservations/{id}/today` - Cancel for today
- `DELETE /api/reservations/{id}` - Cancel entire reservation
- `GET /api/reservations/check-availability` - Check availability

### Users
- `GET /api/users/{id}/profile` - Get profile with reservations

Full API docs available at `/swagger` when running backend.

---

## 💡 Key Design Decisions

### Why Clean Architecture?
- ✅ Testable business logic
- ✅ Swappable infrastructure
- ✅ Clear separation of concerns
- ✅ Industry best practice

### Why In-Memory Database?
- ✅ No external dependencies
- ✅ Quick setup for demo
- ✅ Easy data reset/seeding
- 📝 Production would use SQL Server/PostgreSQL

### Why TypeScript?
- ✅ Catch errors at compile time
- ✅ Better IDE support
- ✅ Self-documenting code

### Why Material-UI?
- ✅ Professional design out-of-the-box
- ✅ Comprehensive components
- ✅ Accessible by default

### Cancel Logic Decision
**Physical deletion** instead of soft delete (`IsCancelled` flag)
- ✅ Simpler data model
- ✅ Cleaner queries
- ✅ Sufficient for assignment scope
- 📝 Production would likely use soft delete for audit trail

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
    │   ├── services/
    │   └── types/
    └── package.json
```

---

## 🧪 Testing

### Backend
```bash
cd BackendApi.Tests
dotnet test
```

**Test Coverage:**
- Business logic validation
- Repository operations
- API integration tests

---

## 🔮 Future Enhancements

- [ ] Authentication (JWT)
- [ ] Real database (SQL Server)
- [ ] Email notifications
- [ ] Calendar view
- [ ] Admin panel
- [ ] Dark mode

---

## 📧 Contact

**Author**: Ainis  
**GitHub**: [@Ain3x](https://github.com/Ain3x)  
**Repository**: [Technical Assignment](https://github.com/Ain3x/Technical_Assignment-Present_Connection)

---

**Built for Present Connection Technical Assignment** ❤️
