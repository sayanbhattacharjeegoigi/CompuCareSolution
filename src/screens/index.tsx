import ForgotPassword from "./auth/ForgotPassword";
import Login from "./auth/login";
import Registration from "./auth/registration";
import ResetPassword from "./auth/ResetPassword";
import Home from "./home";
import RepairFlowScreen from "./home/RepairFlow/RepairFlowScreen";
import NotificationDetails from "./notification/NotificationDetails";
import ContactInformation from "./profile/ContactInformation";
import Support from "./profile/Support";

import ScheduleScreen from "./service/CalendarSlotSelector";
import PaymentResultScreen from "./service/PaymentResultScreen";
import PaymentScreen from "./service/PaymentScreen";
import ScheduleServiceScreen from "./service/ScheduleServiceScreen";
import ServiceRequestDetails from "./service/ServiceRequestDetails";
export default {
  Login,
  Registration,
  Home,
  ServiceRequestDetails,
  NotificationDetails,
  RepairFlowScreen,
  ScheduleServiceScreen,
  ScheduleScreen,
  PaymentScreen,
  PaymentResultScreen,
  ContactInformation,
  Support,
  ForgotPassword,
  ResetPassword,
};
