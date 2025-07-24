function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/round" element={<GeoRound />} />
        <Route path="/homepagefree" element={<HomePageFree />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Lobby" element={<Lobby />} />
        <Route path="/join/:roomCode" element={<Lobby />} />
        <Route path="gameplay" element={<Gameplay />} />
      </Route>
    </Routes>
  );
}
export default AppRouter;
