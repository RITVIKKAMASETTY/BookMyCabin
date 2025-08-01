import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Checkin from "./pages/Checkin";
import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import Booking from "./pages/Booking";
import {Toaster} from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkmodeProvider } from "./context/Darkmodecontext";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:0,
    },
  },
})
function App() {
  return (
    <DarkmodeProvider>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
            <Route path="bookings/:bookingId" element={<Booking />} />
            <Route path="checkin/:bookingId" element={<Checkin/>}/>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} gutter={12} containerStyle={{margin: "8px"}} toastOptions={{ sucess:{duration: 3000,},error:{duration:5000},style:{fontSize:"16px",maxWidth:"500px",padding:"16px 24px",backgroundColor:"var(--color-grey-0)",color:"var(--color-grey-700)",} }}/>
      </QueryClientProvider>
      </DarkmodeProvider>
  );
}

export default App;
