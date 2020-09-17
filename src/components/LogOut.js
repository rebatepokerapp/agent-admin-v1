import { signOut } from "../redux/AgentDucks";
import {useDispatch} from 'react-redux';

const LogOut = () => {

  console.log('LOGOUTTTTTTTTTTTTTT');

  const dispatch = useDispatch()

  dispatch(signOut())

}

export default LogOut
