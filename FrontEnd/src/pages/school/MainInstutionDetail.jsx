import React, { useEffect, useState } from "react";
import SendCredentials from "./components/SendCredentials"
import SendNotification from "./components/SendNotification"
import { useParams } from 'react-router-dom';
import ChangePassword from "./components/ChangePassword"
import { useNavigate } from "react-router-dom";

function InstudionDetails({ value }) {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [activeButtons, setactiveButtons] = useState([])
  const { id } = useParams();

  const others = [
    {
      element: <>
        <button
          className="flex items-center bg-primary text-sm text-white font-semibold px-4 py-2 rounded-lg themeHover  duration-500"
          onClick={() => {
            setIsOpenModal(true);
          }}
        >
          Send Credentials
        </button>
      </>
    },
    {
      element: <>
        <button
          className="flex items-center bg-primary text-sm text-white font-semibold px-4 py-2 rounded-lg themeHover  duration-500"
          onClick={() => {
            setIsNotification(true);
          }}
        >
          Send Notification
        </button>
      </>
    },
    {
      element: <>
        <button
          className="flex items-center bg-primary text-sm text-white font-semibold px-4 py-2 rounded-lg themeHover  duration-500"
          onClick={() => {
            setChangePassword(true);
          }}
        >
          Change Password
        </button>
      </>
    },
    {
      element: <>
        <button
          className="flex items-center bg-primary text-sm text-white font-semibold px-4 py-2 rounded-lg themeHover  duration-500"
          onClick={() => navigate(`/logs/${id}`)}
        >
          Logs
        </button>
      </>
    }
  ]

  useEffect(() => {
    
     if (value == "Others") {
      setactiveButtons(others)
    }
  }, [value])

  return (
    <div>
      <div className="flex items-center gap-4">
        {
          activeButtons.length && activeButtons.map(item => {
            return item.element
          })
        }
      </div>
      <SendCredentials isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} id={id} />
      <SendNotification isNotification={isNotification} setIsNotification={setIsNotification} id={id} />
      <ChangePassword changePasswor={changePassword} setChangePassword={setChangePassword} id={id} />
    </div>
  )
}

export default InstudionDetails
