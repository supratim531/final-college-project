import React from 'react';
import Outlet from './component/Outlet';
import Navigation from './component/Navigation';

export default function App() {
  return (
    <Navigation RootComponent={Outlet} />
  );
}
