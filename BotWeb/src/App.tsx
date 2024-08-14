import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from "react-router-dom";
import Root from "./routes/root";
import MatchDetails from "./routes/details.jsx"
import PlayerDetails from "./components/PlayerDetails.jsx"

function App() {
    const router = createBrowserRouter(createRoutesFromElements (
        <Route path="/" element={<Root />}>
          <Route
            path="match/:matchId"
            element={<MatchDetails />}
          >
            <Route path=":playerId" element={<PlayerDetails />} />
          </Route>
        </Route>
    ))

    return <RouterProvider router = {router} />
}

export default App