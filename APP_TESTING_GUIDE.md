# Complete App Testing Guide with Mock Data

## 🎯 Quickest Way to Test Everything

### **Method 1: Instant Mock Login (Recommended for quick testing)**

1. **Open the app** in your browser
2. **Go to Settings tab** (bottom right)
3. **Click "📱 Mock Login (Dev)"** button
4. ✅ **Instantly logged in** with test user
5. **Jump to step "Explore All Screens" below**

---

## 🔐 Method 2: Real Login/Signup Flow (Test auth screens)

### **Step 1: Access Auth Screen**

1. Open the app
2. If already logged in:
   - Go to Settings tab
   - Click "🔄 Reset App" or "🚪 Logout"
   - This clears your session and takes you back to login screen
3. You'll see the **Login screen**

### **Step 2A: Login (Test Login Screen)**

```
Email/Phone:    admin@derash.com (or any value)
Password:       password123 (or anything)
```

Then click **"Sign In"** button

**What happens:**

- ✅ Form validates inputs (Zod schemas)
- ✅ Makes API call to `/auth/login`
- ✅ Mock API returns user data in ~1 second
- ✅ Your token gets stored securely
- ✅ Redirects to **HOME screen**

### **Step 2B: Signup (Test Signup Screen)**

1. On Login screen, click **"Don't have an account?"**
2. Fill signup form:

```
Full Name:       John Doe
Phone Number:    +251911223344
Email:           john@derash.com
Password:        password123
Confirm Pass:    password123
```

3. Click **"Create Account"**

**What happens:**

- ✅ Form validates (name, phone, email, password strength)
- ✅ Makes API call to `/auth/signup`
- ✅ Mock API returns user data
- ✅ Redirects to **OTP screen**

### **Step 3: OTP Verification (If you did signup)**

1. You'll see **OTP screen**
2. Enter any **4 digits** (e.g., `1234`)
3. Click **"Verify OTP"**

**What happens:**

- ✅ Makes API call to `/auth/verify-otp`
- ✅ Mock API returns user + tokens
- ✅ Redirects to **HOME screen**

### **Step 4: Forgot Password Flow (Optional)**

1. On Login screen, click **"Forgot Password?"**
2. Enter email: `test@derash.com`
3. Click **"Send OTP"**
4. Enter any 4 digits (e.g., `5678`)
5. Enter new password
6. Click **"Reset Password"**

**What happens:**

- ✅ Step 1: API call to `/auth/forgot-password` (returns success)
- ✅ Step 2: API call to `/auth/verify-otp` (returns user + tokens)
- ✅ Redirects back to **HOME screen** (now logged in)

---

## 🏠 Explore All Screens with Mock Data

Once logged in, you'll see 5 tabs at the bottom:

### **1️⃣ HOME TAB** 🏠

**Purpose:** Shows nearby transport vehicles
**Mock data:** 3 vehicles (Bus, Minibus, Taxi)

**What you'll see:**

```
📍 Your current location: 9.032°N, 38.746°E
┌─────────────────────────────┐
│ 🚌 Route RT-101 (BUS)       │
│ 📍 Piazza · 0.5 km away    │
│ ⏱️  5 min ETA                │
│ 💺 35/50 occupied           │
│ ⭐ 4.5 rating · 50 ETB      │
└─────────────────────────────┘

┌─────────────────────────────┐
│ 🚐 Route RT-202 (MINIBUS)  │
│ 📍 Bole · 1.2 km away      │
│ ⏱️  8 min ETA                │
│ 💺 10/15 occupied           │
│ ⭐ 4.2 rating · 35 ETB      │
└─────────────────────────────┘

┌─────────────────────────────┐
│ 🚕 Route RT-303 (TAXI)      │
│ 📍 Kazanchis · 0.3 km      │
│ ⏱️  2 min ETA                │
│ 💺 2/4 occupied             │
│ ⭐ 4.7 rating · 100 ETB     │
└─────────────────────────────┘
```

**Test it:**

- Click any vehicle card → See full details
- Scroll down → See interactive map (shows location)
- Try different vehicles → All have mock data

---

### **2️⃣ SEARCH TAB** 🔍

**Purpose:** Search for destinations and get route recommendations
**Mock data:** 4 destination cities, 2 route options

**What to do:**

1. Click search bar
2. Type any text: `"pii"`, `"bole"`, `"kaza"`, etc.
3. **Auto-complete shows 4 cities:**
   - Piazza
   - Bole
   - Kazanchis
   - Meskel Square

**Click any destination → See route recommendations:**

```
ROUTE 1: Current Location → Piazza
├─ Distance: 5.2 km
├─ Duration: 25 minutes
├─ Modes: BUS or MINIBUS
├─ Fare: 150 ETB
├─ Transfers: 0
└─ Rating: 4.6⭐

ROUTE 2: Current Location → Bole
├─ Distance: 8.5 km
├─ Duration: 35 minutes
├─ Modes: MINIBUS or TAXI
├─ Fare: 200 ETB
├─ Transfers: 1
└─ Rating: 4.3⭐
```

**Test it:**

- Search for different letters
- Click different destinations
- See route options change

---

### **3️⃣ ROUTES TAB** 📍

**Purpose:** View your saved and recommended routes
**Mock data:** 2 route recommendations

**What you'll see:**

- Same routes as Search tab
- Can save routes (stored in Redux)
- Swipe to delete
- Click route → See full details

---

### **4️⃣ WALLET TAB** 💳

**Purpose:** View balance and transaction history
**Mock data:** 5000 ETB balance, 2 recent transactions

**What you'll see:**

```
┌─────────────────────────────┐
│ 💳 WALLET BALANCE          │
│                            │
│ 5000 ETB                   │
│                            │
│ Monthly Budget: 5000 ETB   │
│ Spent This Month: 2450 ETB │
│ Remaining: 2550 ETB        │
└─────────────────────────────┘

RECENT TRANSACTIONS:
1. 🔴 Bus fare - Route RT-101
   -150 ETB · 30 min ago
   Status: ✅ Completed

2. 🟢 Wallet top-up
   +1000 ETB · 2 hours ago
   Status: ✅ Completed
```

**Test it:**

- See balance changes
- View transaction history
- Check budget tracking

---

### **5️⃣ PROFILE TAB** 👤

**Purpose:** View user profile and settings
**Mock data:** Test user info

**What you'll see:**

```
╔═════════════════════════════╗
║ 👤 Test User               ║
║ +251911223344              ║
║ test@derash.com            ║
║                            ║
║ 🔘 Language: English       ║
╚═════════════════════════════╝

ACCOUNT SECTION:
- View Profile
- Edit Profile
- Change Password

SUPPORT SECTION:
- Help & Support
- Contact Us

ACTIONS:
🚪 Logout
```

Click **"Logout"** → Goes back to Login screen

---

### **NOTIFICATIONS TAB** 🔔 (Top menu)

**Purpose:** View in-app notifications
**Mock data:** 3 notifications

**What you'll see:**

```
┌─────────────────────────────┐
│ ℹ️  Your bus is arriving    │
│ Bus RT-101 is 2 min away   │
│ 5 minutes ago              │
└─────────────────────────────┘

┌─────────────────────────────┐
│ ✅ Payment successful       │
│ Your payment of 150 ETB ok │
│ 15 minutes ago             │
└─────────────────────────────┘

┌─────────────────────────────┐
│ ⚠️  Route delay             │
│ Bus RT-202 delayed 10 min  │
│ 1 hour ago                 │
└─────────────────────────────┘
```

---

### **SETTINGS TAB** ⚙️ (Top right)

**Purpose:** App settings and development tools
**Mock data:** Feature flags and dev buttons

**What you'll see:**

```
🌙 Theme Toggle (Light/Dark mode)

Amharic Support: ✓ (Disabled)
Realtime Tracking: ✓ (Prepared)

DEVELOPMENT TOOLS:
📱 Mock Login (Dev)
🚪 Logout
🔄 Reset App
```

**Use these buttons to:**

- **Mock Login**: Instantly log in with test user
- **Logout**: Clear auth and go to login
- **Reset App**: Clear everything (auth + state)

---

## 🧪 Complete Testing Checklist

### **Auth Flow Tests**

- [ ] Login with any credentials → Should succeed
- [ ] Signup with valid data → Should show OTP screen
- [ ] Verify OTP with any 4 digits → Should succeed
- [ ] Forgot password flow → Should work
- [ ] Logout → Should go to login screen
- [ ] Reset app → Should clear everything

### **Home Screen Tests**

- [ ] See 3 vehicles on map
- [ ] Click vehicle card → Show details
- [ ] Scroll map → See different areas
- [ ] Check vehicle info (distance, ETA, price)

### **Search Screen Tests**

- [ ] Type in search bar
- [ ] See 4 city auto-complete options
- [ ] Click destination
- [ ] See 2 route recommendations
- [ ] Check route details (fare, duration, transfers)

### **Wallet Screen Tests**

- [ ] See 5000 ETB balance
- [ ] Check monthly spent (2450 ETB)
- [ ] See 2 recent transactions
- [ ] Check budget remaining (2550 ETB)

### **Profile Screen Tests**

- [ ] See user info (Test User)
- [ ] See contact (+251911223344)
- [ ] Click logout → Go to login
- [ ] Check notification count

### **Settings Tests**

- [ ] Toggle theme (light/dark)
- [ ] Click mock login → Log in instantly
- [ ] Click logout → Go to login
- [ ] Click reset app → Clear everything

---

## 📱 Quick Commands

**To test different scenarios:**

1. **Test Login Flow:**
   - Reset app → Fill login form → Click sign in

2. **Test Signup Flow:**
   - Reset app → Click "create account" → Fill form → Verify OTP

3. **Test All Features:**
   - Click "Mock Login" → Browse all 5 tabs

4. **Test Logout:**
   - Go to Profile → Click logout

5. **Clear Everything:**
   - Go to Settings → Click "Reset App"

---

## 💡 Pro Tips

✅ **All form validation works** - Try entering invalid emails, short passwords, etc.
✅ **API delays are realistic** - You'll see ~1 second delay on login/signup
✅ **Redux state persists** - Close and reopen, you stay logged in
✅ **All screens are interactive** - Click every button to explore
✅ **Mock data looks real** - Vehicles, routes, prices, ratings are realistic
✅ **No internet needed** - Everything works offline with mock API

---

## 🎬 Full Testing Scenario (5 minutes)

1. Open app
2. Click "Reset App" (go to login)
3. Fill login form with random data
4. Click sign in
5. Explore Home screen (see 3 vehicles)
6. Go to Search tab → Search for a city
7. Click a route → See recommendations
8. Go to Wallet → Check balance
9. Go to Profile → Click logout
10. Go back to Settings → Click "Mock Login"
11. Explore all screens again to see mock data in different tabs

**Total time: ~5 minutes to see your whole app in action!** 🚀
