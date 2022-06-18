import { getToken } from 'src/utils/auth'
export default function() {
  return {
    loggedIn: !!getToken(),
    userProfile: {},
    errorInAccountActivation: '',
    unreadMessagesCount: 0,
  }
}
