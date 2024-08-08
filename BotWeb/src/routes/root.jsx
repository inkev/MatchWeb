import React from 'react';
import Matches from "../components/Matches";
import { Outlet } from 'react-router-dom';

export default function Root() {
    return (
      <>
        <div id="sidebar">
          <div>
            <Matches />
          </div>
        </div>
        <div id="detail">
          <Outlet />
        </div>
      </>
    );
  }