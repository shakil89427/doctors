import React, { useEffect, useState } from "react";
import useStore from "../Store/useStore";
import { doctorsStyles } from "../Styles/Styles";

const Doctors = () => {
  const { user, doctors } = useStore();
  const [show, setShow] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [active, setActive] = useState(false);

  const trigger = () => {
    if (active) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  const search = (e) => {
    e.preventDefault();
    const value = e.target[0].value;
    const matched = doctors.filter(
      (doctor) =>
        doctor.name.includes(value) || doctor.speciality.includes(value)
    );
    setShow(matched);
    e.target.reset();
  };

  const filter = (e) => {
    if (e.target.innerText === "All") {
      setShow(doctors);
      return setActive(false);
    }
    const filtered = doctors.filter(
      (doctor) => doctor.speciality === e.target.innerText
    );
    setShow(filtered);
    setActive(false);
  };

  useEffect(() => {
    setShow(doctors);
    const temp = [];
    doctors.forEach((doctor) => {
      if (!temp.includes(doctor.speciality)) {
        temp.push(doctor.speciality);
      }
    });
    setSpecialities(temp);
  }, [doctors]);

  return (
    <div className={doctorsStyles.main}>
      <h1 className={doctorsStyles.user}>Welcome {user?.displayName}</h1>
      <h1 className={doctorsStyles.site}>Doctors Portal</h1>
      <div className={doctorsStyles.headerMain}>
        <form className={doctorsStyles.form} onSubmit={search}>
          <input
            required
            placeholder="Type Doctor Name or Speciality"
            className={doctorsStyles.input}
            type="text"
          />
          <button className={doctorsStyles.btn}>Search</button>
        </form>
        <p className="font-bold">OR</p>
        <button className={doctorsStyles.btn}>
          <p onClick={trigger}>Filter By Speciality</p>
          {active && (
            <div className={doctorsStyles.filterMain}>
              <p onClick={filter} className={doctorsStyles.filterItem}>
                All
              </p>
              {specialities.map((speciality) => (
                <p
                  onClick={filter}
                  className={doctorsStyles.filterItem}
                  key={speciality}
                >
                  {speciality}
                </p>
              ))}
            </div>
          )}
        </button>
      </div>
      <div className={doctorsStyles.doctorsMain}>
        {show.map((doctor) => (
          <div key={Math.random()} className={doctorsStyles.doctor}>
            <img
              className={doctorsStyles.img}
              src={`https://avatars.dicebear.com/api/human/${doctor.name}.svg`}
              alt=""
            />
            <h5>Name: {doctor.name}</h5>
            <h5>Speciality: {doctor.speciality}</h5>
            <p>Age: {doctor.age}</p>
            <p>Phone: +1{Math.floor(Math.random() * 10000000000)}</p>
          </div>
        ))}
      </div>
      {!show?.length && (
        <div className={doctorsStyles.notFound}>
          <p>Sorry no result found</p>
          <p>Change Search keyword or Filter</p>
        </div>
      )}
    </div>
  );
};

export default Doctors;
