import React from "react";

import "../Assets/Conference.css";

const Conference = props => {
  let data = props.data || {};
  return (
      <div className="card">
        {data.imageURL && (
          <div className="image">
            <img src={data.imageURL} alt="Image" />
          </div>
        )}

        <div className="confDetails">
          {data.confName && <p><b>Event Title : </b>{data.confName}</p>}
          {data.date && <p><b>Date : </b>{data.date}</p>}
          {data.venue && <p><b>Venue : </b> {data.venue}</p>}
          {data.entryType && <p><b>Entry : </b> {data.entryType}</p>}
         {data.confUrl && <p><a href={data.confUrl} className="button">Link To Conf</a></p>}
        </div>
      </div>
  );
};

export default Conference;
