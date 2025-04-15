# ✈️ Aero IQ

**Aero IQ** is an AI-powered sports betting dashboard that delivers precision betting insights, parlay tracking, and user-focused bet slip management. Designed for modern bettors, Aero IQ combines clean UI, smart features, and extensibility with a bold blue-gray aesthetic.

---

## 📸 Screenshot

![Aero IQ Dashboard](./screenshot.png)

---

## 🚀 Features

- 🧠 **Smart Bet Tracking**  
  View, track, and manage **parlay** and **straight** bets with detailed odds and payout breakdowns.

- 💰 **Interactive Bet Cards**  
  - Shows stake, payout, odds, and creation date  
  - Conditionally renders based on bet type (e.g., hides odds on parlays)  
  - Bold, clean visual hierarchy for financial figures

- 🗃️ **GraphQL Backend Integration**  
  Fully connected to a backend API with Apollo Client:
  - `GetAllBetSlips` query
  - `deleteBetSlip` mutation  
  - Re-fetches data on deletion for seamless updates

- 📅 **Date Filtering**  
  Dropdown menu to filter bet slips by creation date, improving user searchability and organization

- 🧹 **Responsive Design**  
  Built with React + CSS for a responsive and professional look across devices

---

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript  
- **API**: Apollo Client (GraphQL)  
- **Styling**: Custom CSS + modern UI principles  
- **State Management**: Apollo Query & Mutation hooks  
- **Backend (assumed)**: Node.js, GraphQL server, MongoDB (based on `_id` and `createdAt`)

---

## 📁 Folder Structure (Simplified)

