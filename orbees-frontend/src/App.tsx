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
  GroupUpload,
  GroupMembers,
} from './pages/Group';
import Education, {
  EducationCalculadoras,
  EducationIrpf,
  EducationGuias,
} from './pages/Education';
import Login from './pages/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
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
            <Route path="upload" element={<GroupUpload />} />
            <Route path="members" element={<GroupMembers />} />
          </Route>
          <Route path="/education" element={<Education />}>
            <Route index element={<Navigate to="calculadoras" replace />} />
            <Route path="calculadoras" element={<EducationCalculadoras />} />
            <Route path="irpf" element={<EducationIrpf />} />
            <Route path="guias" element={<EducationGuias />} />
          </Route>
          <Route path="/settings" element={<Navigate to="/individual/dashboard" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/individual/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}
