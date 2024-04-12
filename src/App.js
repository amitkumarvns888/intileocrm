import './App.css';
import Register from './Auth/Register';
import Dashboard from './Component/Dashboard';
import Forgetmail from './Auth/Forgetmail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Resetpass from './Auth/Resetpass';
import UserPlan from './Auth/UserPlan';
import SigninCompo from './Auth/SigninCompo';
import QuestionForm1 from './Question/QuestionForm1';
import QuestionForm2 from './Question/QuestionForm2';
import QuestionForm3 from './Question/QuestionForm3';
import Sender from './Pages/Sender';
import AddSender from './Pages/AddSender';
import SenderVerifyemail from './Pages/SenderVerifyemail';
import ContactDetails from './Pages/ContactDetails';
import CopyPaste from './Pages/CopyPaste';
import UploadFile from './Pages/UploadFile';
import ImportExisting from './Pages/ImportExisting';
import CampaignDashboard from './Pages/CampaignDashboard';

function App() {
  return (
    <div class="wrapper">

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/plan' element={<UserPlan />} />
          <Route path='/signin' element={<SigninCompo />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/sender' element={<Sender />} />
          <Route path='/addsender' element={<AddSender />} />
          <Route path='/senderverify' element={<SenderVerifyemail />} />
          <Route path='/forgetmail' element={<Forgetmail />} />
          <Route path='/resetpass' element={<Resetpass />} />
          {/* <Route path='/form1' element={<QuestionForm1 />} /> */}
          <Route path='/onboarding' element={<QuestionForm1 />} />
          <Route path='/onboardQuestion2' element={<QuestionForm2 />} />
          <Route path='/onboardQuestion3' element={<QuestionForm3 />} />


          <Route path='/contactdetails' element={<ContactDetails />} />
          <Route path='/copy&paste' element={<CopyPaste />} />
          <Route path='/uploadfile' element={<UploadFile />} />
          <Route path='/importexisting' element={<ImportExisting />} />
          <Route path='/campaignDashboard' element={<CampaignDashboard />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;