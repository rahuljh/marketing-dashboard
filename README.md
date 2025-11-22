
# 📊 Marketing Performance Dashboard

A high-performance **React + TypeScript + Redux Toolkit** dashboard designed to handle large marketing datasets (~5,000+ records) with fast rendering, smart state management, and beautiful data visualization — all without using any UI/CSS libraries.


---

## 🚀 Features

✅ **Large Dataset Handling** (5,000+ rows)  
✅ **Paginated Table** with Sorting + Search  
✅ **Column-Level Filters** (Min/Max Spend, Min/Max CTR)  
✅ **Global Filters** (Channel, Region, Keyword Search)  
✅ **Dynamic Metrics** (Spend, Impressions, Clicks, Conversions, CTR%)  
✅ **Performance Insights Bar Chart** (Recharts)  
✅ **Redux Toolkit + Memoized Selectors** for top performance  
✅ **Custom UI** — No Tailwind, Bootstrap, MUI, AntD, etc.  
✅ **Lighthouse Score Target**: > 90  
✅ **Fully Typed with TypeScript**  
✅ **Vite-powered** ⚡ blazing-fast dev experience  

---


## 🏗️ Tech Stack

| Category | Technology |
|---------|------------|
| Framework | React 19 |
| Language | TypeScript |
| State Management | Redux Toolkit + React-Redux |
| Charts | Recharts |
| Build Tool | Vite |
| Styling | Custom CSS (no UI libraries) |

---

## 📁 Project Structure

```
marketing-dashboard/
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ FiltersBar.tsx
│  │  ├─ TotalsPanel.tsx
│  │  ├─ DataTable.tsx
│  │  └─ PerformanceChart.tsx
│  ├─ features/
│  │  └─ marketingSlice.ts
│  ├─ data/
│  │  └─ marketingData.json
│  ├─ store.ts
│  ├─ types.ts
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ styles.css
├─ package.json
├─ vite.config.ts
└─ README.md
```

---

## 🧠 Key Concepts & Performance Optimizations

⚡ **Memoized Selectors (`createSelector`)**  
Prevents unnecessary recalculations of filtered/sorted data.

⚡ **Pagination**  
Only renders 10–50 rows at a time for smooth UI.

⚡ **React.memo + useCallback + useMemo**  
Reduces re-renders and improves responsiveness.

⚡ **Pure Redux Slice**  
All filtering, sorting & aggregation stays predictable and testable.

---

## 📥 Dataset Format

Place your data file at:

```
src/data/marketingData.json
```

Each record should look like:

```json
{
  "id": 1,
  "channel": "Facebook",
  "region": "US",
  "spend": 1200.50,
  "impressions": 50000,
  "clicks": 2400,
  "conversions": 120
}
```

---

## 🛠️ Installation & Running

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/your-username/marketing-dashboard.git
cd marketing-dashboard
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start Dev Server

```bash
npm run dev
```

### 4️⃣ Build for Production

```bash
npm run build
npm run preview
```

---

## 🎨 UI & Theme

✅ Light dashboard theme  
✅ Clean typography  
✅ Alternating table rows  
✅ Highlighted totals  
✅ Color-coded bar charts:
- **Spend** = Blue
- **Conversions** = Orange

---

## 📈 Chart Visualization

Bar chart shows **Spend vs Conversions by Channel**, helping identify:

- Top-spending channels
- High-performance channels
- Conversion efficiency

---

## 🔧 Future Enhancements (Optional Ideas)

🟦 Line chart for CTR trend  
🟩 Region-wise heatmap  
🟨 Export to CSV / Excel  
🟪 User login + saved dashboards  
🟥 API-based data instead of static JSON  

---

## 🤝 Contributing

PRs are welcome!  
If you'd like to improve UI, UX, performance, or add visualizations — go for it!

---

## 📄 License

MIT License — free to use and modify.

---

## ⭐ Show Support

If you find this helpful:

✅ Star the repo ⭐  
✅ Share with your network  
✅ Fork & build your own version  

---

## 🙌 Author

**Your Name**  
Frontend Engineer | React | TypeScript | Redux  
💼 LinkedIn / GitHub links (optional)
