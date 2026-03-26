import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Individual, {
  IndividualDashboard,
  IndividualTransactions,
  IndividualCategories,
  IndividualUpload,
} from './pages/Individual';
import Group, {
  GroupDashboard,
  GroupTransactions,
  GroupCategories,
  GroupMembers,
} from './pages/Group';
import Education, {
  EducationInicio,
  EducationFundamentos,
  EducationDireitos,
  EducationCalculadoras,
} from './pages/Education';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/individual" element={<Individual />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<IndividualDashboard />} />
            <Route path="transactions" element={<IndividualTransactions />} />
            <Route path="categories" element={<IndividualCategories />} />
            <Route path="upload" element={<IndividualUpload />} />
          </Route>
          <Route path="/group" element={<Group />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<GroupDashboard />} />
            <Route path="transactions" element={<GroupTransactions />} />
            <Route path="categories" element={<GroupCategories />} />
            <Route path="members" element={<GroupMembers />} />
          </Route>
          <Route path="/education" element={<Education />}>
            <Route index element={<Navigate to="inicio" replace />} />
            <Route path="inicio" element={<EducationInicio />} />
            <Route path="fundamentos" element={<EducationFundamentos />} />
            <Route path="direitos" element={<EducationDireitos />} />
            <Route path="calculadoras" element={<EducationCalculadoras />} />
            <Route path="vida-adulta" element={<Navigate to="/education/direitos" replace />} />
            <Route path="investimentos" element={<Navigate to="/education/calculadoras" replace />} />
            <Route path="irpf" element={<Navigate to="/education/direitos" replace />} />
            <Route path="guias" element={<Navigate to="/education/fundamentos" replace />} />
          </Route>
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/individual/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}
