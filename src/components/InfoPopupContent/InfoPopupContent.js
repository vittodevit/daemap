import React from "react";
import "./InfoPopupContent.css";

function InfoPopupContent({ daeTitle, daeData, daeLatitude, daeLongitude }) {
  return (
    <table class="daeTable">
      <tbody>
        <tr>
          <td colspan="2" class="daeTableHeader">
            <b>{daeTitle}</b>
          </td>
        </tr>
        <tr>
          <td>Collocazione precisa</td>
          <td>
            <b>{daeData.exactLocation}</b>
          </td>
        </tr>
        <tr>
          <td>Indirizzo</td>
          <td>
            <b>{daeData.address}</b>
          </td>
        </tr>
        <tr>
          <td>Numero civico</td>
          <td>
            <b>{daeData.houseNumber}</b>
          </td>
        </tr>
        <tr>
          <td>CAP</td>
          <td>
            <b>{daeData.postalCode}</b>
          </td>
        </tr>
        <tr>
          <td>Comune</td>
          <td>
            <b>{daeData.city}</b>
          </td>
        </tr>
        <tr>
          <td>Provincia</td>
          <td>
            <b>{daeData.province}</b>
          </td>
        </tr>
        <tr>
          <td>Coordinate (lat,lon)</td>
          <td>
            <b>{daeLatitude}, {daeLongitude}</b>
          </td>
        </tr>
        <tr>
          <td>Orario Operatività</td>
          <td>
            <b>{daeData.operativeHours}</b>
          </td>
        </tr>
        <tr>
          <td>Annotazioni</td>
          <td>
            <b>{daeData.notes}</b>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default InfoPopupContent;
