import React, { useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';

const Alerts = () => {

    const alertContext = useContext(AlertContext);

    return (
        alertContext.alerts.length > 0 &&
        alertContext.alerts.map(alert => (
            <div key={alert.id} className={`container alert alert-${alert.type}`}>
                {alert.msg}
                <button type="button" onClick={() => alertContext.removeAlert(alert.id)}>
                    x
                </button>
            </div>
        ))
    );

}

export default Alerts;