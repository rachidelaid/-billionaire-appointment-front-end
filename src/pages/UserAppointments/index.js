import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import style from './style.module.css';
import { fetchAppointments, deleteAppointment } from '../../redux/appointments';
import ternaryFunction from './helper';

const UserAppointments = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const appointments = useSelector((state) => state.appointments.all);
  const billionaires = useSelector((state) => state.billionaires.all);

  useEffect(() => {
    if (user) {
      dispatch(fetchAppointments(user));
    }
  }, [user]);

  const handleDeleteAppointment = (id) => {
    const params = {
      id,
      user,
    };
    dispatch(deleteAppointment(params));
  };

  return (
    <div className={style.container}>
      <header className={style.header}>
        <h1 className={style.title}>
          {user ? (user.name).toUpperCase() : 'NO'}
          {' '}
          APPOINTMENTS
        </h1>
      </header>
      <div className={style.appointments}>
        {!user ? <p className={style.message}>You need to login in order to access this page.</p>
          : ternaryFunction(appointments.length, appointments.map((appointment) => (
            <div key={appointment.id} className={style.appointment}>
              <h2 className={style['billionaire-name']}>{billionaires[appointment.billionaire_id - 1].name}</h2>
              <img src={billionaires[appointment.billionaire_id - 1].image} alt={`${billionaires[appointment.billionaire_id - 1].name} logo`} className={style.img} />
              <p>
                Location:&#160;
                {appointment.city}
              </p>
              <p>
                Date:&#160;
                {appointment.date}
              </p>
              <button type="button" className={style.cancel} onClick={() => handleDeleteAppointment(appointment.id)}>Cancel</button>
            </div>
          )), <h3 className={style.message}>No appointments yet.</h3>) }

      </div>
    </div>
  );
};

export default UserAppointments;
