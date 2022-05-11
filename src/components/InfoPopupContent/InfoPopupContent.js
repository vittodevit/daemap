import React, { useEffect, useState } from "react";
import "./InfoPopupContent.css";

function InfoPopupContent({ daeId }) {
  useEffect(() => {
    fetchDaeDetails();
  }, []);

  const H24Badge = <span style={{ color: "green" }}>H24</span>;
  const notH24Badge = <span style={{ color: "red" }}>NON-H24</span>;
  const imgBpath = "https://xpe.mrbackslash.it/daecms/api/images/";

  const [daeDetails, setdaeDetails] = useState([]);

  const fetchDaeDetails = async () => {
    const dae_details = await fetch(
      `https://xpe.mrbackslash.it/daecms/api/get_one.php?id=${daeId}`
    );
    const json_dae_details = await dae_details.json();
    setdaeDetails(json_dae_details);
  };

  let daeimg;

  if (daeDetails.imageId !== "" && daeDetails.imageId !== undefined) {
    daeimg = (
      <img
        src={imgBpath + daeDetails.imageId + ".webp"}
        alt={"Foto dae " + daeDetails.title}
        className="daeImage"
      ></img>
    );
  } else {
    daeimg = <div></div>;
  }

  return (
    <div>
      <table className="daeTable">
        <tbody>
          <tr>
            <td colSpan="2" className="daeTableHeader">
              <b>
                {daeDetails.title} -{" "}
                {daeDetails.h24 === "1" ? H24Badge : notH24Badge}
              </b>
            </td>
          </tr>

          {(daeDetails.exactLocation !== null ||
            daeDetails.exactLocation !== "") && (
            <tr>
              <td>Collocazione precisa</td>
              <td>
                <b>{daeDetails.exactLocation}</b>
              </td>
            </tr>
          )}

          {(daeDetails.address !== null || daeDetails.address !== "") && (
            <tr>
              <td>Indirizzo</td>
              <td>
                <b>{daeDetails.address}</b>
              </td>
            </tr>
          )}

          {(daeDetails.houseNumber !== null ||
            daeDetails.houseNumber !== "") && (
            <tr>
              <td>Numero civico</td>
              <td>
                <b>{daeDetails.houseNumber}</b>
              </td>
            </tr>
          )}

          {(daeDetails.postalCode !== null || daeDetails.postalCode !== "") && (
            <tr>
              <td>CAP</td>
              <td>
                <b>{daeDetails.postalCode}</b>
              </td>
            </tr>
          )}

          {(daeDetails.city !== null || daeDetails.city !== "") && (
            <tr>
              <td>Comune</td>
              <td>
                <b>{daeDetails.city}</b>
              </td>
            </tr>
          )}

          {(daeDetails.province !== null || daeDetails.province !== "") && (
            <tr>
              <td>Provincia</td>
              <td>
                <b>{daeDetails.province}</b>
              </td>
            </tr>
          )}

          <tr>
            <td>Coordinate (lat,lon)</td>
            <td>
              <b>
                {daeDetails.latitude}, {daeDetails.longitude}
              </b>
            </td>
          </tr>

          {(daeDetails.operativeHours !== null ||
            daeDetails.operativeHours !== "") && (
            <tr>
              <td>Orario Operatività</td>
              <td>
                <b>{daeDetails.operativeHours}</b>
              </td>
            </tr>
          )}

          {(daeDetails.operativeHours !== null ||
            daeDetails.operativeHours !== "") && (
            <tr>
              <td>Annotazioni</td>
              <td>
                <b>{daeDetails.notes}</b>
              </td>
            </tr>
          )}
          
        </tbody>
      </table>
      {daeimg}
    </div>
  );
}

export default InfoPopupContent;
