

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

      </Route>
    </Routes>
  );
}
export default AppRouter;
